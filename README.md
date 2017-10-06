# sample-bot-botbuilder-qna
Sample bot using Microsoft BotBuilder and Botfuel QnA

## To install and setup

### Install it
```
npm install
```

### Create your (free) QnA bot on Botfuel's portal

- Create an account [here](https://app.botfuel.io/signup);

- Once logged, create an app, select your plan and option `Botfuel QnA`;

- Once on the App dashboard, copy your app credentials and set them in `app.js`:
```
// Botfuel App credentials
const appId = '<YOUR_APP_ID>';
const appKey = '<YOUR_APP_KEY>';
```

- Scroll down to services and click QnA button to reach the QnA back office.

## To run

To run it, you need a server (your bot, you can see the implementation in [app.js](./app.js)) and a chat interface.

### The bot

Run it with:
```
node app.js
```

### The test interface

You can use [Microsoft Bot Framework channel emulator](https://github.com/Microsoft/BotFramework-Emulator):

- Download, install and run it;
- Enter your bot endpoint: `http://localhost:3978/api/messages`;
- You don't need Microsoft credentials to run it locally, so just click `Connect`.

You should now be able to talk to your bot on this interface. If not, don't hesitate to create an [issue](./issues), we'll do our best to help.
