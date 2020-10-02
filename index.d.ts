declare module 'djs-handler' {
    import { Client, ClientOptions } from 'discord.js';
    export class Bot extends Client {
        constructor (token: string, option: HandlerConfigOption, discordOption: ClientOptions);
        config(dir: string): void;
        configDir(dir: string): void;
        reload(): number;
        reloadDir(): number;
    }
    type HandlerConfigOption = {
        allowAllBot?: boolean,
        BotWhitelist?: Array<string>,
        allowAllDM?: boolean,
        DMWhitelist?: Array<string>,
        typing?: boolean,
        ops?: any,
        prefix: string
    }
}