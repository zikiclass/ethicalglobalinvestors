import nodemailer from "nodemailer";

// Named export for POST method
export async function POST(req) {
  try {
    // Extract data from the request body
    const { to, subject, text } = await req.json();

    // Create a transporter using your custom email's SMTP configuration
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true, // Use true if using SSL
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Define email options
    const mailOptions = {
      from: "support@ethicalglobalinvestors.com ",
      to,
      subject,
      text, // Message body content
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    return new Response(
      JSON.stringify({ message: "Email sent successfully!" }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        message: "Failed to send email." + error.message,
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
