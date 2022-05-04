export type Config = {
    CLIENT_ID: string;
}

export type ProcessedConfig = {
    CLIENT_ID: string;
    INVITE_LINK: string;
}

export enum Environment {
    LIVE = 'live',
    LOCAL = 'local',
}