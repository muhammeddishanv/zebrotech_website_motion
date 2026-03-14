import { NextResponse } from 'next/server';
import * as nodemailer from 'nodemailer';

export async function POST(req: Request) {
    try {
        const { name, email, phone, interest, budget, message } = await req.json();

        console.log("Attempting to send email via Zoho...");
        console.log("ZOHO_USER:", process.env.ZOHO_USER);
        
        if (!process.env.ZOHO_USER || !process.env.ZOHO_PASS) {
            throw new Error("ZOHO_USER or ZOHO_PASS environment variables are not set");
        }

        const transporter = nodemailer.createTransport({
            host: 'smtp.zoho.in',
            port: 465,
            secure: true,
            auth: {
                user: process.env.ZOHO_USER,
                pass: process.env.ZOHO_PASS,
            },
        });

        await transporter.sendMail({
            from: `"Zybrotech Website" <${process.env.ZOHO_USER}>`,
            to: process.env.ZOHO_USER,
            replyTo: email,
            subject: `New Inquiry: ${interest} — ${name}`,
            html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>New Collaboration Inquiry</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:#000000;padding:32px 40px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;letter-spacing:-0.5px;">Zybrotech</h1>
              <p style="margin:6px 0 0;color:#a1a1aa;font-size:13px;letter-spacing:1px;text-transform:uppercase;">New Collaboration Inquiry</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px;">

              <p style="margin:0 0 24px;color:#3f3f46;font-size:15px;line-height:1.6;">
                You have received a new inquiry through the Zybrotech website contact form. Here are the details:
              </p>

              <!-- Info Table -->
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">

                <tr>
                  <td style="padding:14px 16px;background:#f9f9fb;border-radius:8px 8px 0 0;border-bottom:1px solid #e4e4e7;">
                    <p style="margin:0;font-size:11px;color:#a1a1aa;text-transform:uppercase;letter-spacing:0.8px;font-weight:600;">Full Name</p>
                    <p style="margin:4px 0 0;font-size:15px;color:#18181b;font-weight:600;">${name}</p>
                  </td>
                </tr>

                <tr>
                  <td style="padding:14px 16px;background:#ffffff;border-bottom:1px solid #e4e4e7;">
                    <p style="margin:0;font-size:11px;color:#a1a1aa;text-transform:uppercase;letter-spacing:0.8px;font-weight:600;">Email Address</p>
                    <p style="margin:4px 0 0;font-size:15px;color:#18181b;">
                      <a href="mailto:${email}" style="color:#2563eb;text-decoration:none;">${email}</a>
                    </p>
                  </td>
                </tr>

                <tr>
                  <td style="padding:14px 16px;background:#f9f9fb;border-bottom:1px solid #e4e4e7;">
                    <p style="margin:0;font-size:11px;color:#a1a1aa;text-transform:uppercase;letter-spacing:0.8px;font-weight:600;">Mobile Number</p>
                    <p style="margin:4px 0 0;font-size:15px;color:#18181b;font-weight:600;">${phone}</p>
                  </td>
                </tr>

                <tr>
                  <td style="padding:14px 16px;background:#ffffff;border-bottom:1px solid #e4e4e7;">
                    <p style="margin:0;font-size:11px;color:#a1a1aa;text-transform:uppercase;letter-spacing:0.8px;font-weight:600;">Interested In</p>
                    <p style="margin:4px 0 0;">
                      <span style="display:inline-block;background:#000000;color:#ffffff;font-size:13px;font-weight:600;padding:4px 14px;border-radius:999px;">${interest}</span>
                    </p>
                  </td>
                </tr>

                <tr>
                  <td style="padding:14px 16px;background:#f9f9fb;border-bottom:1px solid #e4e4e7;">
                    <p style="margin:0;font-size:11px;color:#a1a1aa;text-transform:uppercase;letter-spacing:0.8px;font-weight:600;">Project Budget</p>
                    <p style="margin:4px 0 0;font-size:15px;color:#18181b;font-weight:700;">${budget}</p>
                  </td>
                </tr>

                <tr>
                  <td style="padding:14px 16px;background:#ffffff;border-radius:0 0 8px 8px;">
                    <p style="margin:0;font-size:11px;color:#a1a1aa;text-transform:uppercase;letter-spacing:0.8px;font-weight:600;">Message</p>
                    <p style="margin:8px 0 0;font-size:15px;color:#3f3f46;line-height:1.7;background:#f4f4f5;padding:16px;border-radius:8px;">${message}</p>
                  </td>
                </tr>

              </table>

              <!-- Reply CTA -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:32px;">
                <tr>
                  <td align="center">
                    <a href="mailto:${email}" style="display:inline-block;background:#000000;color:#ffffff;font-size:14px;font-weight:600;padding:14px 32px;border-radius:999px;text-decoration:none;">
                      Reply to ${name}
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f9f9fb;padding:24px 40px;text-align:center;border-top:1px solid #e4e4e7;">
              <p style="margin:0;color:#a1a1aa;font-size:12px;">
                This email was automatically generated by the Zybrotech website contact form.<br/>
                © ${new Date().getFullYear()} Zybrotech. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
        });


        return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
    } catch (error: any) {
        console.error("Nodemailer error details:", {
            message: error.message,
            code: error.code,
            command: error.command,
            responseCode: error.responseCode,
            response: error.response,
        });
        return NextResponse.json({ message: "Failed to send email", error: error.message || String(error) }, { status: 500 });
    }
}