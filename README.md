
<h1 align="center"> TANISHA 𝐌𝐃 </h1>
______
    
</a>
</p>

## Runtime

This repository contains a provider-neutral command engine for TANISHA-MD. It discovers every module under `commands/`, parses the configured prefix, and dispatches messages through a normalized context.

```bash
npm install
npm test
npm start
```

The default prefix is `.`. Configuration is read from `.env`:

```text
PREFIX=.
BOT_NAME=TANISHA-MD
OWNER=
PORT=3000
```

To integrate a messaging provider, pass inbound messages to the dispatcher returned by `require('./index').createBot()`:

```js
const bot = require('./index').createBot();
const result = await bot.dispatch({
    text: '.ping',
    chatId: 'chat-id',
    senderId: 'user-id',
    reply: text => provider.sendMessage('chat-id', text)
});
```

Each command receives `text`, `args`, `chatId`, `senderId`, `raw`, and `reply` in its context. Commands that need external services can be connected at this boundary without changing the dispatcher.
<p align="center">
<a href="https://github.com/Blaq-boy"><img title="Author" src="https://img.shields.io/badge/SKYPER-MD?style=for-the-badge&logo=whatsapp"></a>
<p/>

<p align="center">
    <strong>1. FORK REPOSITORY</strong>
  <br>
    <a href="https://github.com/shiny-chainsaw/SKYPER-MD/fork" target="_blank">
        <img alt="Fork Repo" src="https://img.shields.io/badge/Fork%20Repo-100000?style=for-the-badge&logo=scan&logoColor=white&labelColor=darkblue&color=darkblue"/>
    </a>
</p>

<p align="center">
    <strong>2. GET SESSION ID</strong>
    <br>
    <a href="https://www.skyper-md.skyper/" target="_blank">
        <img alt="WEBSITE" src="https://img.shields.io/badge/Pair-100000?style=for-the-badge&logo=scan&logoColor=white&labelColor=darkred&color=darkred"/>
    </a>
</p>

<p align="center">
    <strong>3. DEPLOY TO HEROKU</strong>
    <br>
    <a href="https://dashboard.heroku.com/new?template=https://github.com/2005101/SKYPER-MD" target="_blank">
        <img alt="Deploy to heroku" src="https://img.shields.io/badge/Deploy-100000?style=for-the-badge&logo=scan&logoColor=white&labelColor=purple&color=purple"/>
    </a>
</p>

<p align="center">
    <strong>4. DOWNLOAD BOT ZIP</strong>
    <br>
    <a href="https://codeload.github.com/2005101/SKYPER-MD/zip/refs/heads/main" target="_blank">
        <img alt="Download zip" src="https://img.shields.io/badge/Download-100000?style=for-the-badge&logo=scan&logoColor=white&labelColor=darkblue&color=darkorange"/>
    </a>
</p>
