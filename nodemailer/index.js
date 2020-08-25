const nodemailer = require("nodemailer");

exports.send = async ({ subject, messageText }) => {
  if (!process.env.MAIL_HOST) {
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const message = {
    to: process.env.MAIL_TO,
    from: process.env.MAIL_FROM,
    subject: subject,
    text: messageText,
  };

  return transporter.sendMail(message);
};
