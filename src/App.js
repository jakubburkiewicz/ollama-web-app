import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Chat from './components/Chat';
import Sidebar from './components/Sidebar';

import { SettingsProvider } from './contexts/SettingsContext';

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
                    </Routes>
                </div>
            </SettingsProvider>
        </BrowserRouter>
    )
}

export default App
