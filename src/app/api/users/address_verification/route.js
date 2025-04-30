import { put } from "@vercel/blob";
import prisma from "../../../../../prisma/client";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
export async function POST(request) {
  const formData = await request.formData();

  // Upload main image
  const bill = formData.get("bill");
  const email = formData.get("email");
  const uploadBill = await uploadToVercel(bill);

  await prisma.register.update({
    where: { email },
    data: {
      addressPix: uploadBill.url,
      addressVerify: "pend",
    },
  });
  sendPendingAddressVerification(email);
  return NextResponse.json(register, { status: 201 });
}

async function uploadToVercel(file) {
  const blob = await put(file.name, file.stream(), { access: "public" });
  return { url: blob.url }; // Return the URL of the uploaded blob
}
async function sendPendingAddressVerification(email) {
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
    from: "support@ethicalglobalinvestors.com ",
    to: email,
    subject: "New Deposit - Ethical Global Investors",
    html: `
       <html>
        <body>
          <h1>Address Verification in Progress</h1>
          <p>Your address verification is in progress. Please wait for further instructions.</p>
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
