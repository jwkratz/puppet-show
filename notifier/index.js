const nodemailer = require("../nodemailer");
const twilio = require("../twilio");

exports.send = async ({ subject, message }) => {
  // Send email
  await nodemailer.send({ subject: subject, messageText: message });

  // Send SMS text
  await twilio.send(message);
};
