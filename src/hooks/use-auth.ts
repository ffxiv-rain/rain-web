import {SalteAuth} from '@salte-auth/salte-auth';
import {Discord} from '@salte-auth/discord';
import {Redirect} from '@salte-auth/redirect';
import {useSalteAuth} from '../@salte-auth/react';
import {CONFIG} from '../configs';

export function useAuth(): SalteAuth {
    return useSalteAuth({
        handlers: [
            new Redirect({
                default: true,
            }),
        ],

        providers: [
            new Discord({
                clientID: CONFIG.CLIENT_ID,
                responseType: 'code',
                routes: true,
                scope: 'identify guilds guilds.members.read'
            }),
        ]
    });
}