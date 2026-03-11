export const forgetPasswordMail = (otpCode) => {
  return `
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f8;padding:20px 0;">
  <tr>
    <td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;font-family:Arial,Helvetica,sans-serif;">

        <!-- Header -->
        <tr>
          <td style="padding:24px 32px;font-size:26px;font-weight:bold;color:#000;">
            Hustle Ai
          </td>
        </tr>

        <!-- Title -->
        <tr>
          <td style="padding:0 32px 8px;font-size:22px;font-weight:bold;color:#111;">
            Verify Your Email
          </td>
        </tr>

        <!-- Description -->
        <tr>
          <td style="padding:0 32px 20px;font-size:14px;line-height:22px;color:#555;">
            Thank you for signing up! Please use the verification code below to complete your registration.
            This code will expire in <strong>5 minutes</strong>.
          </td>
        </tr>

        <!-- OTP Box -->
        <tr>
          <td align="center" style="padding:0 32px 24px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f2f8fc;border-radius:10px;">
              <tr>
                <td align="center" style="padding:20px 0 8px;font-size:12px;letter-spacing:2px;color:#666;">
                  YOUR VERIFICATION CODE
                </td>
              </tr>
              <tr>
                <td align="center" style="padding:0 0 20px;">
                  <span style="
                    display:inline-block;
                    background:#ffffff;
                    padding:14px 28px;
                    border-radius:8px;
                    font-size:32px;
                    letter-spacing:6px;
                    font-weight:bold;
                    color:#1d72b8;
                  ">
                    ${otpCode}
                  </span>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Security Tip -->
        <tr>
          <td style="padding:0 32px 20px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f7fbff;border-left:4px solid #1d72b8;">
              <tr>
                <td style="padding:12px 14px;font-size:13px;line-height:20px;color:#444;">
                  <strong>Security Tip:</strong> Never share this code with anyone. Hustle Ai will never ask
                  for your verification code via phone or email.
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Footer text -->
        <tr>
          <td style="padding:0 32px 24px;font-size:13px;line-height:20px;color:#777;">
            If you didn’t request this code, you can safely ignore this email. Someone may have entered your email address by mistake.
          </td>
        </tr>

        <!-- Divider -->
        <tr>
          <td style="border-top:1px solid #e5e7eb;"></td>
        </tr>

        <!-- Bottom footer -->
        <tr>
          <td align="center" style="padding:18px 32px;font-size:12px;color:#999;">
            © ${new Date().getFullYear()} Hustle Ai. All rights reserved.<br/>
            This is an automated email, please do not reply.
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
`;
};