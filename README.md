# puppet-show

Visits pages using puppeteer and sends an email when text is found.

## Setup

Add a `.env` file in the project root with the following values:

```
MAIL_HOST=smtp.example.com
MAIL_USER=smtp-username
MAIL_PASS=smtp-password
MAIL_TO=to@example.com
MAIL_FROM=from@example.com
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
