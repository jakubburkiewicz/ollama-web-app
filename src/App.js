import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Chat from './components/Chat';
import Sidebar from './components/Sidebar';
import Settings from './components/Settings';

import { SettingsProvider } from './contexts/SettingsContext';
import { ChatProvider } from './contexts/ChatContext';

const App = () => {
    return (
        <BrowserRouter>
            <SettingsProvider>
                <div className="flex h-screen">
                    <Sidebar />

                    <Routes>
                        <Route
                            path="/"
                            element={
                                <ChatProvider>
                                    <Chat />
                                </ChatProvider>
                            }
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
