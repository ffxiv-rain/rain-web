import { CONFIG } from './configs';

export function App() {
    return (
        <div>
            <h1>App</h1>
            <a href={CONFIG.INVITE_LINK} target="_blank">Add to Discord</a>
        </div>
    );
}