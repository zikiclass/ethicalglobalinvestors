import prisma from "../../../../../prisma/client";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function PUT(req) {
  try {
    const searchParams = req.nextUrl.searchParams; // Corrected line to get query params
    const email = searchParams.get("email");

    const updateEmailVerification = await prisma.register.update({
      where: { email },
      data: { emailVerify: "yes" },
    });

    sendPendingEmailVerification(email);
    return NextResponse.json({ updateEmailVerification }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update email verification", details: error.message },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    const searchParams = req.nextUrl.searchParams; // Corrected line to get query params
    const email = searchParams.get("email");

    const emailPIN = Math.floor(100000 + Math.random() * 900000);

    const updateEmailVerification = await prisma.register.update({
      where: { email },
      data: { emailPIN: String(emailPIN) },
    });

    if (updateEmailVerification) {
      sendEmailVerification(email, emailPIN);
      return NextResponse.json({ updateEmailVerification }, { status: 200 });
    } else {
      return NextResponse.json("User not found", { status: 404 });
    }
  } catch (error) {
    console.error("Internal server error:", error);
    return NextResponse.json("Internal server error", { status: 500 });
  }
}

async function sendEmailVerification(email, pin) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true, // Set true if using SSL (port 465)
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Email content for the support team
  const mailOptionsSupport = {
    from: "support@mt5indexpro.com",
    to: email,
    subject: "New Deposit - MT5 Index Pro",
    html: `
       <html>
        <body>
          <h1>Verify Your Email Address</h1>
          <p>Your verification PIN is: <strong>${pin}</strong></p>
          <p>Please use this pin to verify your email address.</p>
          <p>If you did not request this verification, please ignore this email.</p>
        </body>
      </html>
    `,
  };

  try {
    // Send email to the support team with user details
    await transporter.sendMail(mailOptionsSupport);
  } catch (error) {
    console.error("Error sending registration email:", error);
  }
}
async function sendPendingEmailVerification(email) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true, // Set true if using SSL (port 465)
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Email content for the support team
  const mailOptionsSupport = {
    from: "support@mt5indexpro.com",
    to: email,
    subject: "New Deposit - MT5 Index Pro",
    html: `
       <html>
        <body>
          <h1>Email Verification Successful</h1>
          <p>Your email verification was successful. Please proceed to the ID verification.</p>
          <p>If you did not initiate this process, please ignore this email.</p>
        </body>
      </html>
    `,
  };

  try {
    // Send email to the support team with user details
    await transporter.sendMail(mailOptionsSupport);
  } catch (error) {
    console.error("Error sending registration email:", error);
  }
}
