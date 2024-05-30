import { useEffect } from "react"

import { Ollama } from "ollama/browser"

import { useChat } from "../../contexts/ChatContext"
import { useSettings } from "../../contexts/SettingsContext"

const ChatSettingsForm = () => {
    const { settings } = useSettings()
    const { chat, chatDispatch } = useChat()

    useEffect( () => {
        const fetchModels = async () => {
            const ollama = new Ollama( { host: settings.host } )
            const response = await ollama.list()

            chatDispatch( {
                type: 'setModelOptions',
                models: response.models
            } )

            if( response.models.length ) {
                chatDispatch( {
                    type: 'setModel',
                    model: response.models[ 0 ].name
                } )
            }
        }

        fetchModels()
    }, [ chatDispatch, settings.host ] )

    const handleModelChange = event => {
        chatDispatch( {
            type: 'setModel',
            model: event.target.value
        } )
    }

    return (
        <div className="flex gap-4 bg-stone-100 p-4">
            <label className="flex flex-col gap-2">
                <span className="text-sm">Model</span>

                <select
                    className="p-2 rounded border border-gray-300 w-48 h-10"
                    value={ chat.model.name }
                    onChange={ handleModelChange }
                >
                    {
                        chat?.modelOptions?.map( model => (
                            <option
                                key={ model.digest }
                                value={ model.name }
                            >{ model.name }</option>
                        ) )
                    }
                </select>
            </label>
        </div>
    )
}

export default ChatSettingsForm