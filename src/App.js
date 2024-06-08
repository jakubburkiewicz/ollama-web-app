import { BrowserRouter } from 'react-router-dom';

import { SettingsProvider } from './contexts/SettingsContext';

import AppUI from './components/AppUI';

const App = () => {
    return (
        <BrowserRouter>
            <SettingsProvider>
                <AppUI />
            </SettingsProvider>
        </BrowserRouter>
    )
}

export default App
