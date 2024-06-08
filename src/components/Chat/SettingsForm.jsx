import { useEffect } from "react"

import { useOllama } from "use-ollama"

import { useChat } from "../../contexts/ChatContext"


const ChatSettingsForm = () => {
    const { chatState, chatDispatch } = useChat()
    const { list, response, error } = useOllama()

    useEffect( () => {
        const fetchModels = async () => {
            await list()
        }

        fetchModels()
    }, [] )

    useEffect( () => {
        const setModelOptions = async models => {
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

        if( response ) {
            setModelOptions( response.models )
        }
    }, [ response ] )

    useEffect( () => {
        if( error ) {
            console.error( error )
        }
    }, [ error ] )

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
                    value={ chatState.model.name }
                    onChange={ handleModelChange }
                >
                    {
                        chatState?.modelOptions?.map( model => (
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