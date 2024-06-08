import { useEffect } from "react"

import { useOllama } from "use-ollama"
import { v4 as uuid } from "uuid"

import { useChat } from "../../contexts/ChatContext"

import ChatMessageList from "./MessageList"
import ChatMessageForm from "./MessageForm"
import ChatSettingsForm from "./SettingsForm"


const Chat = () => {
    const { chat, response, error } = useOllama()
    const { chatState, chatDispatch } = useChat()

    const handleNewUserMessage = message => {
        chatDispatch( {
            type: 'upsertMessage',
            message
        } )
    }

    useEffect( () => {
        const isLatestMessageFromUser = () => (
            chatState.messages[ chatState.messages.length - 1 ]?.role === 'user'
        )

        const sendMessages = async () => {
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

            await chat( {
                model: chatState.model,
                messages: chatState.messages.map( message => ( {
                    role: message.role,
                    content: message.content
                } ) ),
                stream: true
            } )
        }

        if( chatState.messages.length && isLatestMessageFromUser() ) {
            sendMessages()
        }
    }, [ chat, chatDispatch, chatState.messages, chatState.model ] )

    useEffect( () => {
        const collectResponseMessage = async response => {
            const message = chatState.messages[ chatState.messages.length - 1 ]

            for await ( const part of response ) {
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

        if( response ) {
            collectResponseMessage( response )
        }
    }, [ response, chatDispatch, chatState.messages ] )

    useEffect( () => {
        const handleErrorMessage = error => {
            const message = chatState.messages[ chatState.messages.length - 1 ]

            message.content = error.message
            message.status = 'ERROR'

            chatDispatch( {
                type: 'upsertMessage',
                message
            } )
        }

        if( error ) {
            handleErrorMessage( error )
        }
    }, [ error ] )

    return (
        <section className="flex flex-col grow h-full">
            <ChatSettingsForm />

            <ChatMessageList
                messages={ chatState.messages }
            />

            <ChatMessageForm
                onSubmit={ handleNewUserMessage }
            />
        </section>
    )
}

export default Chat