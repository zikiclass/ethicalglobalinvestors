import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"; // ✅ use default import here
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcrypt";
import prisma from "../../../../../prisma/client";
import nodemailer from "nodemailer";

const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password || !credentials?.role)
          return null;

        if (credentials.role === "user") {
          const user = await prisma.register.findUnique({
            where: { email: credentials.email },
          });
          if (!user) return null;

          const match = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!match) return null;

          await sendSignInEmail(user.email);
          return user;
        }

        if (credentials.role === "admin") {
          const admin = await prisma.admin.findUnique({
            where: { email: credentials.email },
          });
          if (!admin) return null;

          const match = await bcrypt.compare(
            credentials.password,
            admin.password
          );
          if (!match) return null;

          await prisma.admin.update({
            where: { email: credentials.email },
            data: { lastLogin: new Date() },
          });

          return admin;
        }

        return null;
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/signin",
    error: "/signin",
  },
};

async function sendSignInEmail(email) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT, 10),
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: "support@ethicalglobalinvestors.com ",
    to: email,
    subject: "Ethical Global Investors- Successful Sign-In",
    html: `<h3>Hi there!</h3><p>You successfully logged in.</p>`,
  };

  await transporter.sendMail(mailOptions);
}

// ✅ NextAuth handler setup for App Router
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
