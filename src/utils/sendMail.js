const transporter = require("../config/mail");

const sendEmail = async ({ to, subject, html }) => {
  await transporter.sendMail({
    from: `"VyzoBD" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
};

module.exports = sendEmail;
