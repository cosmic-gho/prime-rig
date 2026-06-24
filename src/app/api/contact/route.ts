import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    
    const name = formData.get("name") as string;
    const company = formData.get("company") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const department = formData.get("department") as string;
    const description = formData.get("description") as string;
    const file = formData.get("file") as File | null;

    if (!name || !email || !department || !description) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    // Configure Nodemailer Transport
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT) || 465,
      secure: process.env.EMAIL_USE_SSL === "True" || process.env.EMAIL_PORT === "465",
      auth: {
        user: process.env.EMAIL_HOST_USER,
        pass: process.env.EMAIL_HOST_PASSWORD,
      },
    });

    // Prepare email attachments
    const attachments = [];
    if (file && file.size > 0) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      attachments.push({
        filename: file.name,
        content: buffer,
      });
    }

    const mailOptions = {
      from: `"${name}" <${process.env.DEFAULT_FROM_EMAIL}>`, // Hostinger might require the 'from' to match the authenticated user
      replyTo: email,
      to: process.env.ADMIN_EMAIL,
      subject: `New RFQ Inquiry: ${department} - ${company || name}`,
      text: `
You have received a new Official Inquiry via the website.

Details:
-----------------------------------------
Name: ${name}
Company: ${company || "N/A"}
Email: ${email}
Phone: ${phone || "N/A"}
Department: ${department}

Project Description:
-----------------------------------------
${description}
      `,
      html: `
        <h3>New Official Inquiry via Website</h3>
        <table border="1" cellpadding="10" cellspacing="0" style="border-collapse: collapse;">
          <tr><td><strong>Name</strong></td><td>${name}</td></tr>
          <tr><td><strong>Company</strong></td><td>${company || "N/A"}</td></tr>
          <tr><td><strong>Email</strong></td><td>${email}</td></tr>
          <tr><td><strong>Phone</strong></td><td>${phone || "N/A"}</td></tr>
          <tr><td><strong>Department</strong></td><td>${department}</td></tr>
        </table>
        <br/>
        <h4>Project Description:</h4>
        <p>${description.replace(/\n/g, '<br/>')}</p>
      `,
      attachments,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
