import { useEffect, useReducer } from "react"

import { Ollama } from "ollama/browser"
import { v4 as uuid } from "uuid"

import { useSettings } from "../../contexts/SettingsContext"
import { useChat } from "../../contexts/ChatContext"

import ChatMessageList from "./MessageList"
import ChatMessageForm from "./MessageForm"
import ChatSettingsForm from "./SettingsForm"

const Chat = () => {
    const { settings, settingsDispatch } = useSettings()
    const { chat, chatDispatch } = useChat()

    const handleNewUserMessage = message => {
        chatDispatch( {
            type: 'upsertMessage',
            message
        } )
    }

    useEffect( () => {
        const fetchModels = async () => {
            const ollama = new Ollama( { host: settings.host } )
            const response = await ollama.list()

            settingsDispatch( {
                type: 'setModelOptions',
                models: response.models
            } )

            if( response.models.length ) {
                settingsDispatch( {
                    type: 'setModel',
                    model: response.models[ 0 ]
                } )
            }
        }

        fetchModels()
    }, [ settingsDispatch, settings.host ] )

    useEffect( () => {
        const isLatestMessageFromUser = () => (
            chat.messages[ chat.messages.length - 1 ]?.role === 'user'
        )

        const sendMessages = async () => {
            let responseStream;

            const message = {
                id: uuid(),
                role: 'assistant',
                content: '',
                status: 'WAITING'
            }

            chatDispatch( {
                type: 'upsertMessage',
                message
            } )

            try {
                const ollama = new Ollama( { host: settings.host } )

                responseStream = await ollama.chat( {
                    model: settings.model.name,
                    messages: chat.messages.map( message => ( {
                        role: message.role,
                        content: message.content
                    } ) ),
                    stream: true
                } )
            } catch( error ) {
                message.content = error.message
                message.status = 'ERROR'

                chatDispatch( {
                    type: 'upsertMessage',
                    message
                } )

                return
            }

            for await ( const part of responseStream ) {
                message.content += part.message.content
                message.status = part.done ? 'DONE' : 'PENDING'

                chatDispatch( {
                    type: 'upsertMessage',
                    message
                } )

                if( part.done === true ) {
                    break
                }
            }
        }

        if( chat.messages.length && isLatestMessageFromUser() ) {
            sendMessages()
        }
    }, [ settings, chat.messages ] )

    return (
        <section className="flex flex-col grow h-full">
            <ChatSettingsForm />

            <ChatMessageList
                messages={ chat.messages }
            />

            <ChatMessageForm
                onSubmit={ handleNewUserMessage }
            />
        </section>
    )
}

export default Chat