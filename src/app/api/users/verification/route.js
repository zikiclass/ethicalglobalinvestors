import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";
import nodemailer from "nodemailer";
export async function PUT(req) {
  try {
    const body = await req.json();
    if (!body.userId || !body.action)
      return NextResponse.json({ message: "Invalid ID" }, { status: 404 });

    if (body.action === "approveID") {
      const approveID = await prisma.register.update({
        where: { id: parseInt(body.userId) },
        data: {
          idVerify: "yes",
        },
      });
      sendVerificationStatusEmail(approveID.email, "ID", "approved");
      if (approveID) {
        return NextResponse.json({ message: "success" }, { status: 200 });
      } else {
        return NextResponse.json({ message: "error" }, { status: 404 });
      }
    } else if (body.action === "declineID") {
      const declineID = await prisma.register.update({
        where: { id: parseInt(body.userId) },
        data: {
          idVerify: "rej",
        },
      });
      sendVerificationStatusEmail(declineID.email, "ID", "declined");
      if (declineID) {
        return NextResponse.json({ message: "success" }, { status: 200 });
      } else {
        return NextResponse.json({ message: "error" }, { status: 404 });
      }
    } else if (body.action === "approveAddress") {
      const approveAddress = await prisma.register.update({
        where: { id: parseInt(body.userId) },
        data: {
          addressVerify: "yes",
        },
      });
      sendVerificationStatusEmail(approveAddress.email, "Address", "approved");
      if (approveAddress) {
        return NextResponse.json({ message: "success" }, { status: 200 });
      } else {
        return NextResponse.json({ message: "error" }, { status: 404 });
      }
    } else if (body.action === "declineAddress") {
      const declineAddress = await prisma.register.update({
        where: { id: parseInt(body.userId) },
        data: {
          addressVerify: "rej",
        },
      });
      sendVerificationStatusEmail(declineAddress.email, "Address", "declined");
      if (declineAddress) {
        return NextResponse.json({ message: "success" }, { status: 200 });
      } else {
        return NextResponse.json({ message: "error" }, { status: 404 });
      }
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}

async function sendVerificationStatusEmail(email, type, status) {
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
          <h1>${type} verification ${status}</h1>
          <p>Your ${type} verification was ${status}. Please contact support@ethicalglobalinvestors.com  for further assistance.</p>
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
