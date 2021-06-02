exports.send = async (message) => {
  if (!process.env.TWILIO_ACCOUNT_SID) {
    return;
  }

  const client = require("twilio")(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN,
    {
      lazyLoading: true,
    }
  );

  return client.messages.create({
    from: process.env.TWILIO_FROM,
    to: process.env.TWILIO_TO,
    body: message,
  });
};
