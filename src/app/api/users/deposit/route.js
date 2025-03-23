import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";
import { getServerSession } from "next-auth";
import nodemailer from "nodemailer";
export async function POST(req) {
  try {
    const body = await req.json();

    if (!body || !body.amount || !body.account_ || !body.dep_method) {
      return NextResponse.json({ message: "Invalid details" }, { status: 400 });
    }

    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const dep = await prisma.deposit.create({
      data: {
        userId: parseInt(body.userId),
        amount: parseFloat(body.amount),
        account_: body.account_,
        dep_method: body.dep_method,
        date_deposited: new Date(),
        status: "Pending",
      },
    });

    const depDetails = {
      amount: parseFloat(body.amount),
      depMethod: body.dep_method,
    };

    const user = await prisma.register.findUnique({
      where: {
        id: parseInt(body.userId),
      },
    });

    await sendDepositEmail(user, depDetails);
    return NextResponse.json(
      { message: "Success", data: dep },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating deposit:", error); // Log error details for debugging
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}

async function sendDepositEmail(user, depDetails) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true, // Set true if using SSL (port 465)
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Email content for the user
  const mailOptionsUser = {
    from: "support@mt5indexpro.com",
    to: user.email,
    subject: "Deposit Confirmation - MT5 Index Pro",
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Deposit Confirmation - MT5 Index Pro</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f9;
      margin: 0;
      padding: 0;
    }
    .container {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      padding: 20px;
    }
    .header {
      text-align: center;
      padding-bottom: 20px;
    }
    .header img {
      max-width: 150px;
    }
    .content {
      text-align: center;
      font-size: 16px;
      color: #333333;
      line-height: 1.5;
      padding-bottom: 20px;
    }
    .cta-button {
      background-color: #1a73e8;
      color: #ffffff;
      padding: 15px 25px;
      border-radius: 5px;
      text-decoration: none;
      font-weight: bold;
    }
    .footer {
      text-align: center;
      font-size: 14px;
      color: #888888;
      margin-top: 30px;
    }
    .footer a {
      color: #1a73e8;
      text-decoration: none;
    }
  </style>
</head>
<body>

  <div class="container">
    <div class="header">
      <img src="https://www.mt5indexpro.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.6d381394.png&w=828&q=75" alt="MT5 Index Pro Logo">
    </div>

    <div class="content">
      <h2>Deposit Confirmation</h2>
      <p>Dear ${user.first_name} ${user.last_name},</p>
      <p>We're happy to inform you that your deposit of <strong>${
        user.currency + depDetails.amount
      }</strong> via <strong>${
      depDetails.depMethod
    }</strong> has been successfully received and is currently being processed. Your transaction will be updated shortly.</p>
      <p>We appreciate your trust in MT5 Index Pro, and we are excited to continue supporting your trading journey. If you have any questions or need assistance, please don’t hesitate to reach out to our support team.</p>
      <a href="https://mt5indexpro.com/users/dashboard" class="cta-button">Go to Dashboard</a>
    </div>

    <div class="footer">
      <p>Best regards,</p>
      <p>The MT5 Index Pro Team</p>
      <p><a href="https://mt5indexpro.com" target="_blank">Visit our website</a></p>
    </div>
  </div>

</body>
</html>
`,
  };

  // Email content for the support team

  try {
    // Send email to the user
    await transporter.sendMail(mailOptionsUser);
  } catch (error) {
    console.error("Error sending deposit email:", error);
  }
}

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const id = searchParams.get("id");
    if (!id)
      return NextResponse.json({ message: "Unathorized" }, { status: 404 });

    const deposits = await prisma.deposit.findMany({
      where: { userId: parseInt(id) },
      orderBy: [{ id: "desc" }],
    });
    if (deposits) return NextResponse.json({ data: deposits }, { status: 200 });
    return NextResponse.json({ message: "Error" }, { status: 404 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}
