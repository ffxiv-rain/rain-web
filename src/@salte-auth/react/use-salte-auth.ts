import {useState, useEffect} from 'react';
import { SalteAuth } from '@salte-auth/salte-auth';

let _auth: SalteAuth = null;
export function useSalteAuth(config: SalteAuth.Config): SalteAuth {
    const [auth, setAuth] = useState<SalteAuth>();

    useEffect(() => {
        if (!_auth) {
            _auth = new SalteAuth(config);
        }

        setAuth(_auth);
    }, []);

    return auth;
}