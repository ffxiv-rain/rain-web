import { Config, Environment, ProcessedConfig } from '../types/config';
import { CONFIG as LIVE_CONFIG } from './live';
import { CONFIG as LOCAL_CONFIG } from './local';

export const ENVIRONMENTS = {
    'localhost': Environment.LOCAL,
    'ffxiv-rain.xyz': Environment.LIVE,
}

export const ENVIRONMENT = ENVIRONMENTS[location.hostname];

if (!ENVIRONMENT) throw new Error(`Unknown environment! ${location.hostname}`);

export const CONFIGS: {
    [key: string]: Config;
} = {
    [Environment.LOCAL]: LOCAL_CONFIG,
    [Environment.LIVE]: LIVE_CONFIG,
};

const config = CONFIGS[ENVIRONMENT];

export const CONFIG: ProcessedConfig = {
    ...config,
    INVITE_LINK: `https://discord.com/api/oauth2/authorize?client_id=${config.CLIENT_ID}&permissions=8&scope=bot`
};