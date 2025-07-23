import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { first, last, attending } = await req.json();

  if (!first || !last) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  console.log(
    `RSVP: ${first} ${last} - ${attending ? "Attending" : "Not Attending"}`
  );

  // Use an app password or a real SMTP provider
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.RSVP_FROM, // e.g. wedding@gmail.com
      pass: process.env.RSVP_PASS, // Gmail App Password
    },
  });

  const text = [
    `Emri: ${first} ${last}`,
    `Pjesëmarrja: ${attending ? "Pranoj me Kënaqësi" : "Refuzoj me Keqardhje"}`,
    "Orari: 19:00",
  ].join("\n\n");

  // Build HTML body (bold name + line breaks)
  const html = `
  <p><strong>Emri:</strong> <strong>${first} ${last}</strong></p>
  <p><strong>Pjesëmarrja:</strong> ${
    attending ? "Pranoj me Kënaqësi" : "Refuzoj me Keqardhje"
  }</p>
  <p><strong>Orari:</strong> 19:00</p>
`;

  await transporter.sendMail({
    from: `"Wedding RSVP" <${process.env.RSVP_FROM}>`,
    to: "haxhirajpaliantia@gmail.com",
    subject: `RSVP - ${first} ${last}`,
    text,
    html,
  });

  return NextResponse.json({ ok: true });
}
