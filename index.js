const Discord = require('discord.js');
const fs = require('fs');
const ascii = require('ascii-table');
module.exports = {
    Bot: class extends Discord.Client {
        constructor (token, option, ...args) {
            super(...args);
            this.commands = new Discord.Collection();
            this.aliases = new Discord.Collection();
            this.token = token;
            if (option.allowBot) {
                this.allowBot = option.allowBot;
            } else {
                this.allowBot = false;
            }
            if (option.allowDM) {
                this.allowDM = option.allowDM; 
            } else {
                this.allowDM = false;
            }
            if (option.typing) {
                this.typing = option.typing; 
            } else {
                this.typing = false;
            }
            if (!option.prefix) throw new Error('Prefix excepted');
            this.prefix = option.prefix;
            if (option.ops) this.ops = option.ops;
        };
        config (dir) {
            const table = new ascii().setHeading('Commands', 'Load Status');
            if (!dir) {
                throw new Error('Commands file directory excepted');
            }
            fs.readdir(dir, (err, list) => {
                for (let file of list) {
                    try {
                        let pull = require(`../../${dir}${file}`);
                        if (pull.name && pull.run) {
                            this.commands.set(pull.name, pull);
                            if (pull.aliases) {
                                for (let alias of pull.aliases) {
                                    this.aliases.set(alias, pull.name);
                                }
                            }
                            table.addRow(file, '✅️');
                        } else {
                            table.addRow(file, `❌️ -> Name or run excepted`);
                            continue;
                        }
                    } catch (e) {
                        table.addRow(file, `❌️ -> ${e}`);
                        continue;
                    }
                }
                console.log(table.toString());
                if (this.token) {
                    this.login(this.token);
                }
                this.on('ready', () => {
                    console.log(`Login ${this.user.username}`);
                });
                this.on('message', message => {
                    if (message.author.bot && !this.allowBot) return;
                    if (message.channel.type != 'text' && !this.allowDM) return;
                    if (!message.content.startsWith(this.prefix)) return;
                    if (this.typing) message.channel.startTyping(1);
                    let args = message.content.substr(this.prefix.length).trim().split(' ');
                    let command = args[0].toLowerCase();
                    if (this.commands.get(command)) {
                        this.commands.get(command).run(this, message, args, this.ops);
                    } else if (this.aliases.get(command)) {
                        this.aliases.get(this.aliases.get(commands)).run(this, message, args, this.ops);
                    }
                    if (this.typing) message.channel.stopTyping(true);
                });
            });
        }
        reload (dir) {
            const table = new ascii().setHeading('Commands', 'Reload Status');
            return new Promise((res, rej) => {
                if (!dir) {
                    return rej('Commands file directory excepted');
                }
                fs.readdir(dir, (err, list) => {
                    for (let file of list) {
                        try {
                            delete require.cache[require.resolve(file)];
                            let pull = require(`../../${dir}${file}`);
                            if (pull.name && pull.run) {
                                this.commands.set(pull.name, pull);
                                if (pull.aliases) {
                                    for (let alias of pull.aliases) {
                                        this.aliases.set(alias, pull.name);
                                    }
                                }
                                table.addRow(file, '✅️');
                            } else {
                                table.addRow(file, `❌️ -> Name or run excepted`);
                                continue;
                            }
                        } catch (e) {
                            table.addRow(file, `❌️ -> ${e}`);
                            continue;
                        }
                    }
                    console.log(table.toString());
                    return res(this.commands.size);
                });
            }) 
        }
    }
}