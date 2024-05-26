import Chat from './components/Chat';
import { SettingsProvider } from './contexts/SettingsContext';

const App = () => {
    return (
        <>
            <SettingsProvider>
                <Chat />
            </SettingsProvider>
        </>
    )
}

export default App
