const verificationEmail = (name, verificationUrl) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
      <h2>Hello ${name},</h2>

      <p>
        Thank you for registering.
      </p>

      <p>
        Please verify your email by clicking the button below.
      </p>

      <a
        href="${verificationUrl}"
        style="
          display:inline-block;
          padding:12px 24px;
          background:#2563eb;
          color:white;
          text-decoration:none;
          border-radius:6px;
        "
      >
        Verify Email
      </a>

      <p style="margin-top:20px;">
        If you didn't create this account, you can safely ignore this email.
      </p>

      <p>
        This verification link expires in 24 hours.
      </p>

      <hr>

      <small>VyzoBD Team</small>
    </div>
  `;
};

module.exports = verificationEmail;
