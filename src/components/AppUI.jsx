import { Route, Routes } from "react-router-dom"

import { OllamaProvider } from "use-ollama"
import { ChatProvider } from "../contexts/ChatContext"

import Chat from "./Chat"
import Sidebar from "./Sidebar"
import Settings from "./Settings"
import { useSettings } from "../contexts/SettingsContext"

const AppUI = () => {
    const { settings } = useSettings()

    return (
        <OllamaProvider host={ settings.host }>
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
        </OllamaProvider>
    )
}

export default AppUI