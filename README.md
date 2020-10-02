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
for this file system:
```
commands directory
- command1.js
- command2.js
- command3.js
- command4.js
main file
shard file
package.json file
package-lock.json file
...
```
`main file`
```js
const { Bot } = require('djs-handler'); // import module
const client = new Bot(/*your token here*/, { // constructor
    prefix: // your bot's prefix
    // you can add typing boolean to use typing for messages
    // you can add allowAllDM boolean to allow DM messages from everyone
    // you can ass DMWhitelist array with Discord user IDs to allow DM messages from specific users
    // you can add allowAllBot boolean to allow messages from all bot
    // you can ass BotWhitelist array with Discord user IDs to allow messages from specific bots
});
client.config(/*path of command files*/); // config all the files and login with the given token
// client.configDir is also available. See the references for more information.
```
`command file`
```js
module.exports = {
    name: 'ping',
    aliases: ['latency'],
    run: async (client, message, args) => {
        message.channel.send(client.ws.ping);
    }
}
```
`reload command file`
```js
module.exports = {
    name: 'reload',
    run: async (client, message, args) => {
        if (message.author.id != 'dev_id') return message.channel.send('You aren\'t a developer'); // replace 'dev_id' with your id.
        client.reload().then(x => message.channel.send(`reloaded ${x} commands`)).catch(() => message.channel.send('there was an error while reloading'));
    }
}
```
Tip: you can use Bot.configDir(dir) and Bot.reloadDir() for this file system:
```
commands directory
- category1
- - command1.js
- - command2.js
- category2
- - command3.js
- - command4.js
main file
shard file
package.json
package-lock.json
...
```
## Bug report
Please use the [issue tracker](https://github.com/mswgen/djs-handler/issues).
## contributor
[mswgen](https://github.com/mswgen)
