# djs-handler
Discord.js command handler

![npm bundle size](https://img.shields.io/bundlephobia/min/djs-handler)
![npm](https://img.shields.io/npm/dt/djs-handler)
![GitHub issues](https://img.shields.io/github/issues/mswgen/djs-handler)
![GitHub pull requests](https://img.shields.io/github/issues-pr/mswgen/djs-handler)
![NPM](https://img.shields.io/npm/l/djs-handler)
![npm](https://img.shields.io/npm/v/djs-handler)
![node-current](https://img.shields.io/node/v/djs-handler)

## Example
```js
const { Bot } = require('djs-handler'); // import module
const client = new Bot(/*your token here*/, { // constructor
    prefix: //your bot's prefix
    //you can add typing boolean to use typing for messages
    //you can add allowDM boolean to allow DM messages
    //you can add allowBot boolean to allow messaged from bot
});
client.config(/*path of command files*/); // config all the files and login with the given token
client.reload(/*path of command files*/); // reloads all the command files and resolve with the size of command files
```
## contributor
[mswgen](https://github.com/mswgen)