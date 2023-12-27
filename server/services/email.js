const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAILER_USER,
    pass: process.env.MAILER_PASS,
  },
});

sendMail = async (to, subject, content, html) => {
  try {
    const mailOptions = {
      from: process.env.MAILER_USER,
      to: to,
      subject: subject,
      text: html ? "" : content,
      html: html,
    };

    const info = await transport.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
    return { error: null, info };
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

module.exports = sendMail;
