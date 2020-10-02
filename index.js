const Discord = require('discord.js');
const fs = require('fs');
const ascii = require('ascii-table');
module.exports = {
    Bot: class extends Discord.Client {
        constructor (token, option, discordOption) {
            super(discordOption);
            this.commands = new Discord.Collection();
            this.aliases = new Discord.Collection();
            this.token = token;
            if (option.allowAllBot) {
                this.allowAllBot = option.allowAllBot;
            } else {
                this.allowAllBot = false;
            }

            if (option.allowAllDM) {
                this.allowAllDM = option.allowAllDM; 
            } else {
                this.allowAllDM = false;
            }
            if (option.typing) {
                this.typing = option.typing; 
            } else {
                this.typing = false;
            }
            if (!option.prefix) throw new Error('Prefix excepted');
            this.prefix = option.prefix;
            this.botWhiteList = option.botWhiteList;
            this.DMWhiteList = option.DMWhiteList;
            if (option.ops) this.ops = option.ops;
        };
        config (dir) {
            const table = new ascii().setHeading('Commands', 'Load Status');
            if (!dir) {
                throw new Error('Commands file directory excepted');
            }
            this.dir = dir;
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
                    if (message.author.bot && !this.allowAllBot && !this.botWhiteList.includes(message.author.id)) return;
                    if (message.channel.type != 'text' && !this.allowAllDM && !this.DMWhiteList.includes(message.author.id)) return;
                    if (!message.content.startsWith(this.prefix)) return;
                    if (this.typing) message.channel.startTyping(1);
                    let args = message.content.substr(this.prefix.length).trim().split(' ');
                    let command = args[0].toLowerCase();
                    if (this.commands.get(command)) {
                        this.commands.get(command).run(this, message, args, this.ops);
                    } else if (this.aliases.get(command)) {
                        this.commands.get(this.aliases.get(command)).run(this, message, args, this.ops);
                    }
                    if (this.typing) message.channel.stopTyping(true);
                });
            });
        }
        configDir (dir) {
            const table = new ascii().setHeading('Commands', 'Load Status');
            if (!dir) {
                throw new Error('Commands file directory excepted');
            }
            this.dir = dir;
            let d = fs.readdirSync(this.dir);
            let list = new Array();
            for (let a of d) {
                let e = fs.readdirSync(`${this.dir}${a}/`)
                for (let b of e) {
                    list.push({
                        d: `../../${this.dir}${a}/${b}`,
                        n: b
                    });
                }
            }
                for (let file of list) {
                    try {
                        let pull = require(file.d);
                        if (pull.name && pull.run) {
                            this.commands.set(pull.name, pull);
                            if (pull.aliases) {
                                for (let alias of pull.aliases) {
                                    this.aliases.set(alias, pull.name);
                                }
                            }
                            table.addRow(file.n, '✅️');
                        } else {
                            table.addRow(file.n, `❌️ -> Name or run excepted`);
                            continue;
                        }
                    } catch (e) {
                        table.addRow(file.n, `❌️ -> ${e}`);
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
                        this.commands.get(this.aliases.get(command)).run(this, message, args, this.ops);
                    }
                    if (this.typing) message.channel.stopTyping(true);
                });
            
        }
        reload () {
            const table = new ascii().setHeading('Commands', 'Reload Status');
            return new Promise((res, rej) => {
                fs.readdir(this.dir, (err, list) => {
                    for (let file of list) {
                        try {
                            delete require.cache[require.resolve(`../../${this.dir}${file}`)];
                            let pull = require(`../../${this.dir}${file}`);
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
        reloadDir () {
            return new Promise((res, rej) => {
                const table = new ascii().setHeading('Commands', 'Reload Status');
                let d = fs.readdirSync(this.dir);
                let list = new Array();
                for (let a of d) {
                    let e = fs.readdirSync(`${this.dir}${a}/`)
                    for (let b of e) {
                        list.push({
                            d: `../../${this.dir}${a}/${b}`,
                            n: b
                        });
                    }
                }
                for (let file of list) {
                    try {
                    	 delete require.cache[require.resolve(file.d)]
                    	 let pull = require(file.d);
                        if (pull.name && pull.run) {
                            this.commands.set(pull.name, pull);
                            if (pull.aliases) {
                                for (let alias of pull.aliases) {
                                    this.aliases.set(alias, pull.name);
                                }
                            }
                            table.addRow(file.n, '✅️');
                        } else {
                            table.addRow(file.n, `❌️ -> Name or run excepted`);
                            continue;
                        }
                    } catch (e) {
                        table.addRow(file.n, `❌️ -> ${e}`);
                        continue;
                    }
                }
                console.log(table.toString());
                return res(this.commands.size);
            });
        }
    }
}
