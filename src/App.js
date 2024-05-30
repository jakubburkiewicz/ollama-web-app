import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Chat from './components/Chat';
import Sidebar from './components/Sidebar';

import { SettingsProvider } from './contexts/SettingsContext';
import Settings from './components/Settings';

const App = () => {
    return (
        <BrowserRouter>
            <SettingsProvider>
                <div className="flex h-screen">
                    <Sidebar />

                    <Routes>
                        <Route
                            path="/"
                            element={ <Chat /> }
                        />

                        <Route
                            path="/settings"
                            element={ <Settings /> }
                        />
                    </Routes>
                </div>
            </SettingsProvider>
        </BrowserRouter>
    )
}

export default App
