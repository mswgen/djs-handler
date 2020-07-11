declare module 'djs-handler' {
    import { Client } from 'discord.js';
    export class Bot extends Client {
        constructor (token: string, option: HandlerConfigOption);
        config(dir: string): void;
        reload(dir: string): number
    }
    type HandlerConfigOption = {
        allowBot?: boolean,
        allowDM?: boolean,
        typing?: boolean,
        ops?: object,
        prefix: string
    }
}