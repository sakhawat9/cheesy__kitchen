import nodemailer from "nodemailer";
import type { NextApiRequest, NextApiResponse } from "next";

/** Escapes user input before it goes into the notification email's HTML. */
function escapeHtml(value: string) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, message, phone } = req.body ?? {};

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res
      .status(400)
      .json({ message: "Name, email and message are all required" });
  }

  if (!process.env.USER_EMAIL || !process.env.APP_PASSWORD) {
    return res.status(503).json({
      message: "Email isn't configured on this server yet — please email us directly.",
    });
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user: process.env.USER_EMAIL, pass: process.env.APP_PASSWORD },
  });

  try {
    await transporter.sendMail({
      from: process.env.USER_EMAIL,
      // Gmail rejects a `from` it doesn't own, which is what the old handler
      // set to the visitor's own address. Reply-to gets the same behaviour
      // without the rejection.
      replyTo: email,
      to: "sakhawathossain7969@gmail.com",
      subject: `Website enquiry from ${name}`,
      html: `
        <p>New enquiry from the Cheesy_Kitchen contact form.</p>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone) || "—"}</p>
        <p><strong>Message:</strong><br>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
      `,
    });
  } catch (error: any) {
    // The old handler logged the failure and still answered 200, so the form
    // told every visitor their message had been sent even when none had.
    console.error("contact: sendMail failed", error?.message);
    return res
      .status(502)
      .json({ message: "We couldn't send your message. Please email us directly." });
  }

  return res.status(200).json({ message: "Message sent" });
}
