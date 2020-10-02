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
        allowBot?: boolean,
        allowDM?: boolean,
        typing?: boolean,
        ops?: any,
        prefix: string
    }
}