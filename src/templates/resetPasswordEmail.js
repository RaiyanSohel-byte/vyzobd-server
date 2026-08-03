const resetPasswordEmail = (name, resetUrl) => {
  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;">
      <h2>Hello ${name},</h2>

      <p>We received a request to reset your password.</p>

      <a
        href="${resetUrl}"
        style="
          display:inline-block;
          padding:12px 24px;
          background:#dc2626;
          color:#fff;
          text-decoration:none;
          border-radius:6px;
        "
      >
        Reset Password
      </a>

      <p>This link expires in 1 hour.</p>

      <p>If you didn't request this, simply ignore this email.</p>

      <hr/>

      <small>VyzoBD Team</small>
    </div>
  `;
};

module.exports = resetPasswordEmail;
