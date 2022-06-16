import {useState, useEffect} from 'react';
import { OAuth2Provider, OpenIDProvider, Provider, SalteAuth } from '@salte-auth/salte-auth';

export interface User {
    accessToken: string;
}

export interface OpenIDUser extends User {
    uid: string;
    idToken: string;
}

export interface OAuth2User extends User {
    code: string;
}

type Users = {
    [provider: string]: User;
}

export function getUser(provider: OAuth2Provider): OAuth2User|null;
export function getUser(provider: OpenIDProvider): OpenIDUser|null;
export function getUser(provider: Provider): OpenIDUser|OAuth2User|null;
export function getUser(provider: Provider): OpenIDUser|OAuth2User|null {
    if (!provider) return null;

    if (provider instanceof OpenIDProvider) {
        return {
            uid: provider.idToken?.user.sub,
            idToken: provider.idToken?.raw,
            accessToken: provider.accessToken?.raw,
        }
    } else if (provider instanceof OAuth2Provider) {
        return {
            accessToken: provider.accessToken?.raw,
            code: provider.code,
        }
    }

    return null;
}

export function useSalteAuthUser(auth: SalteAuth): Users|null;
export function useSalteAuthUser(auth: SalteAuth, provider: string): User|null;
export function useSalteAuthUser(auth: SalteAuth, provider?: string): Users|User|null {
    const [user, setUser] = useState<Users|User>(null);

    useEffect(() => {
        if (!auth) return;

        if (provider) {
            setUser(getUser(auth.provider(provider)));
    
            auth.provider(provider).on('login', (error, user) => {
                debugger;
            });
        } else {
            setUser(auth.config.providers.reduce((output, provider) => ({
                ...output,
                [provider.$name]: getUser(provider)
            }), {}));
    
            auth.on('login', (error, user) => {
                debugger;
            });
        }
    }, [auth]);
    
    return user;
}

export function useSalteAuthOpenIDUser(auth: SalteAuth, provider): OpenIDUser|null {
    return useSalteAuthUser(auth, provider) as OpenIDUser|null;
}

export function useSalteAuthOAuth2User(auth: SalteAuth, provider): OAuth2User|null {
    return useSalteAuthUser(auth, provider) as OAuth2User|null;
}