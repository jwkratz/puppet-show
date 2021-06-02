# puppet-show

Visits websites using puppeteer and sends emails and/or SMS texts when CSS selectors are found on the page.

## Setup

Add a `.env` file in the project root with the following values:

```
MAIL_HOST=smtp.example.com
MAIL_USER=smtp-username
MAIL_PASS=smtp-password
MAIL_TO=to@example.com
MAIL_FROM=from@example.com
TWILIO_ACCOUNT_SID=twilio-sid
TWILIO_AUTH_TOKEN=twilio-token
TWILIO_TO=5555555555
TWILIO_FROM=5555555555
```

Rename `config.example.json` to `config.json` and update the values with your target URLs and find text.

Run `npm start` in the project root to start the show!

## Running headlessly on a cron schedule

Update `puppeteer/config.json` and set `"headless": true`.

Run `crontab -e` and add:

```
*/5 * * * * cd /path/to/puppet-show && npm start
```

This will run the script every 5 minutes.
