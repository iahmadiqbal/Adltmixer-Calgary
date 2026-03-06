import { Resend } from "resend";
import { env } from "../../config/env";

// Initialize Resend only if API key exists
const resend = env.RESEND_API_KEY ? new Resend(env.RESEND_API_KEY) : null;

export class EmailService {
  static async sendVerificationEmail(
    email: string,
    firstName: string,
    token: string,
  ) {
    // Skip email sending if no API key (development mode)
    if (!env.RESEND_API_KEY || !resend) {
      console.log("⚠️  RESEND_API_KEY not set - Skipping email send");
      console.log(
        `📧 Verification link: ${env.FRONTEND_URL}/verify-email?token=${token}`,
      );
      return { id: "dev-mode-skip" };
    }

    const verificationUrl = `${env.FRONTEND_URL}/verify-email?token=${token}`;

    try {
      const { data, error } = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Verify Your Email - AdultMixer Calgary",
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Verify Your Email</title>
            </head>
            <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9fafb;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; padding: 40px 0;">
                <tr>
                  <td align="center">
                    <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                      <!-- Header -->
                      <tr>
                        <td style="background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%); padding: 40px; text-align: center; border-radius: 12px 12px 0 0;">
                          <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">
                            💕 AdultMixer Calgary
                          </h1>
                        </td>
                      </tr>
                      
                      <!-- Content -->
                      <tr>
                        <td style="padding: 40px;">
                          <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 24px;">
                            Hi ${firstName}! 👋
                          </h2>
                          
                          <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                            Welcome to AdultMixer Calgary! We're excited to have you join our community.
                          </p>
                          
                          <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                            To get started, please verify your email address by clicking the button below:
                          </p>
                          
                          <!-- Button -->
                          <table width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td align="center" style="padding: 20px 0;">
                                <a href="${verificationUrl}" 
                                   style="background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%); 
                                          color: #ffffff; 
                                          text-decoration: none; 
                                          padding: 16px 40px; 
                                          border-radius: 8px; 
                                          font-size: 16px; 
                                          font-weight: bold; 
                                          display: inline-block;">
                                  Verify Email Address
                                </a>
                              </td>
                            </tr>
                          </table>
                          
                          <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin: 30px 0 0 0;">
                            Or copy and paste this link into your browser:
                          </p>
                          
                          <p style="color: #8b5cf6; font-size: 14px; word-break: break-all; margin: 10px 0 0 0;">
                            ${verificationUrl}
                          </p>
                          
                          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
                          
                          <p style="color: #9ca3af; font-size: 12px; line-height: 1.6; margin: 0;">
                            This link will expire in 24 hours. If you didn't create an account with AdultMixer Calgary, 
                            you can safely ignore this email.
                          </p>
                        </td>
                      </tr>
                      
                      <!-- Footer -->
                      <tr>
                        <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-radius: 0 0 12px 12px;">
                          <p style="color: #6b7280; font-size: 14px; margin: 0 0 10px 0;">
                            © 2026 AdultMixer Calgary. All rights reserved.
                          </p>
                          <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                            Made with ❤️ in Calgary
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

      if (error) {
        console.error("Resend email error:", error);

        // Special handling for domain verification error
        if (
          error.statusCode === 403 &&
          error.message?.includes("verify a domain")
        ) {
          throw new Error(
            `Resend requires domain verification. You can only send to ${email} if it matches your Resend account email. ` +
              `To send to any email, verify a domain at resend.com/domains`,
          );
        }

        throw new Error(`Failed to send verification email: ${error.message}`);
      }

      console.log("Verification email sent:", data);
      return data;
    } catch (error) {
      console.error("Email service error:", error);
      throw error;
    }
  }
}
