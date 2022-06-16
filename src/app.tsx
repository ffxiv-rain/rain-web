import { CONFIG } from './configs';
import { useAuth } from './hooks/use-auth';
import { Button } from './common/Button';

export function App() {
    const auth = useAuth();
    
    return (
        <div>
            <h1>App</h1>
            <Button>Test</Button>
            <a href={CONFIG.INVITE_LINK} target="_blank">Add to Discord</a>
        </div>
    );
}