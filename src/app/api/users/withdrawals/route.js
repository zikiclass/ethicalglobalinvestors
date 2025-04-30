import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";
import nodemailer from "nodemailer";
export async function POST(req) {
  try {
    const body = await req.json();

    const getOTP = await prisma.register.findUnique({
      where: { id: body.id },
    });

    if (body.OTP !== getOTP.otp_code) {
      return NextResponse.json(
        {
          message:
            "Invalid OTP code, please contact support@ethicalglobalinvestors.com ",
        },
        { status: 400 }
      );
    }

    if (!body) {
      return NextResponse.json({ message: "Invalid details" }, { status: 400 });
    }

    const dep = await prisma.withdrawal.create({
      data: {
        userId: parseInt(body.id),
        amount: parseFloat(body.amount),
        method: body.type || "",
        from_account: body.fromAccount || "",
        account_number: body.accountNumber || "",
        account_name: body.accountName || "",
        bank_name: body.bank || "",
        crypto: body.crypto || "",
        wallet_address: body.wallet || "",
        paypal_email: body.paypalEmail || "",
        cash_tag: body.cashTag || "",
        date: new Date(),

        status: "Pending",
      },
    });

    const withDetails = {
      amount: parseFloat(body.amount),
      method: body.type || "",
    };
    const user = await prisma.register.findUnique({
      where: {
        id: parseInt(body.id),
      },
    });

    await sendDepositEmail(user, withDetails);

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

async function sendDepositEmail(user, withDetails) {
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
    from: "support@ethicalglobalinvestors.com ",
    to: user.email,
    subject: "Withdrawal Confirmation - MT5 Index Pro",
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Withdrawal Confirmation - MT5 Index Pro</title>
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
      <img src="https://www.ethicalglobalinvestors.com /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.6d381394.png&w=828&q=75" alt="MT5 Index Pro Logo">
    </div>

    <div class="content">
      <h2>Withdrawal Confirmation</h2>
      <p>Dear ${user.first_name} ${user.last_name},</p>
      <p>We are pleased to inform you that your withdrawal of <strong>${
        user.currency + withDetails.amount
      }</strong> via <strong>${
      withDetails.method
    }</strong> has been successfully initiated. Please note that it may take some time for the transaction to be fully processed and reflected in your account.</p>
      <p>If you have any questions or need further assistance, feel free to contact our support team.</p>
      <a href="https://ethicalglobalinvestors.com /users/dashboard" class="cta-button">Go to Dashboard</a>
    </div>

    <div class="footer">
      <p>Best regards,</p>
      <p>The MT5 Index Pro Team</p>
      <p><a href="https://ethicalglobalinvestors.com " target="_blank">Visit our website</a></p>
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
    console.error("Error sending registration email:", error);
  }
}

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const id = searchParams.get("id");
    if (!id)
      return NextResponse.json({ message: "Unathorized" }, { status: 404 });

    const withdrawal = await prisma.withdrawal.findMany({
      where: { userId: parseInt(id) },
      orderBy: [{ id: "desc" }],
    });
    if (withdrawal)
      return NextResponse.json({ data: withdrawal }, { status: 200 });
    return NextResponse.json({ message: "Error" }, { status: 404 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}
