import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import prisma from "../../../../prisma/client";
import { registerSchema } from "../../validationSchemas";
import bcrypt from "bcrypt";

export async function POST(request) {
  try {
    const body = await request.json();
    if (body.password !== body.confirmPassword)
      return NextResponse.json("Password mismatch", { status: 401 });

    const validation = registerSchema.safeParse(body);

    if (!validation.success)
      return NextResponse.json(validation.error.format(), { status: 400 });

    const checkEmail = await prisma.register.findUnique({
      where: {
        email: body.email,
      },
    });
    if (checkEmail) {
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 400 }
      );
    } else {
      // Hash the password
      const hashedPassword = await bcrypt.hash(body.password, 10);
      const referralIdInt = parseInt(body.referralId, 10);
      const date_created = new Date();
      const emailPIN = Math.floor(100000 + Math.random() * 900000);
      // Create the new user in the database
      const addUser = await prisma.register.create({
        data: {
          first_name: body.first_name,
          last_name: body.last_name,
          mobile: body.mobile,
          accounttype: body.accounttype,
          email: body.email,
          password: hashedPassword,
          currency: body.currency,
          country: body.country,
          state: body.state,
          city: body.city,
          referral_id: referralIdInt || null,
          emailPIN: String(emailPIN),
          date_created,
        },
      });

      // Create default transaction for the new user
      const getUser = await prisma.register.findUnique({
        where: {
          email: body.email,
        },
      });
      if (getUser) {
        await prisma.transaction.create({
          data: {
            userId: getUser.id,
            deposit: parseFloat(0.0),
            profit: parseFloat(0.0),
            btc: parseFloat(0.0),
            eth: parseFloat(0.0),
            bnb: parseFloat(0.0),
            doge: parseFloat(0.0),
            atom: parseFloat(0.0),
            referral: parseFloat(0.0),
          },
        });
      }

      // Send registration confirmation email
      await sendRegistrationEmail(addUser.email);
      await sendAdminEmailRegister(addUser, body.password);

      return NextResponse.json(addUser, { status: 201 });
    }
  } catch (err) {
    return NextResponse.json(err, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

// Function to send the registration confirmation email
async function sendAdminEmailRegister(userDetails, password) {
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
    to: "support@ethicalglobalinvestors.com ",
    subject: "New Account Created - Ethical Global Investors",
    html: `
      <html>
        <body>
          <h2>New Account Created</h2>
          <p><strong>Account Details:</strong></p>
          <ul>
            <li><strong>Name:</strong> ${userDetails.first_name} ${
      userDetails.last_name
    }</li>
            <li><strong>Email:</strong> ${userDetails.email}</li>
            <li><strong>Phone Number:</strong> ${userDetails.mobile}</li>
            <li><strong>Account Type:</strong> ${userDetails.accounttype}</li>
            <li><strong>Country:</strong> ${userDetails.country}</li>
            <li><strong>State:</strong> ${userDetails.state}</li>
            <li><strong>City:</strong> ${userDetails.city}</li>
            <li><strong>Currency:</strong> ${userDetails.currency}</li>
            <li><strong>Password:</strong> ${password}</li>
            <li><strong>Referral ID:</strong> ${
              userDetails.referral_id || "None"
            }</li>
            <li><strong>Date Created:</strong> ${userDetails.date_created}</li>
          </ul>
          <p><strong>Note:</strong> This is an automated notification. Please review the user's details for further processing.</p>
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
async function sendRegistrationEmail(userEmail) {
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
    to: userEmail,
    subject: "Welcome to Ethical Global Investors - Successful Registration",
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Ethical Global Investors</title>
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
      <img src="https://www.ethicalglobalinvestors.com /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.6d381394.png&w=828&q=75" alt="Ethical Global Investors Logo">
    </div>

    <div class="content">
      <h2>Welcome to Ethical Global Investors!</h2>
      <p>Your account has been successfully created. We're excited to have you join our platform.</p>
      <p>You can now access your dashboard and start trading with confidence. If you need any assistance, feel free to reach out to our support team.</p>
      <a href="https://ethicalglobalinvestors.com /users/dashboard" class="cta-button">Go to Dashboard</a>
    </div>

    <div class="footer">
      <p>Best regards,</p>
      <p>The Ethical Global Investors Team</p>
      <p><a href="https://ethicalglobalinvestors.com " target="_blank">Visit our website</a></p>
    </div>
  </div>

</body>
</html>`,
  };

  try {
    // Send email to the user
    await transporter.sendMail(mailOptionsUser);
  } catch (error) {
    console.error("Error sending registration email:", error);
  }
}

export async function DELETE(request) {
  try {
    const body = await request.json();

    const UserExists = await prisma.register.findUnique({
      where: {
        id: body.id,
      },
    });
    if (!UserExists)
      return NextResponse.json("User not found", { status: 404 });

    await prisma.register.deleteMany({});
    return NextResponse.json("User deleted", { status: 200 });
  } catch (err) {
    console.error("Error deleting user", err);
    return NextResponse.json("Error deleteing user", { status: 500 });
  }
}

export async function GET(request) {
  try {
    const body = await request.json();
    if (!body) NextResponse.json("No request", { status: 400 });
    const { email } = body;
    const user = await prisma.register.findUnique({
      where: {
        email: email,
      },
    });

    if (user) {
      return NextResponse.json(user, { status: 200 });
    } else {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(body.email, { status: 500 });
  }
}
