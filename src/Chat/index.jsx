import { useEffect, useReducer } from "react"

import ollama from "ollama/browser"
import { v4 as uuid } from "uuid"

import ChatMessageList from "./MessageList"
import ChatMessageForm from "./MessageForm"

const Chat = () => {
    const [ messages, dispatch ] = useReducer( ( state, action ) => {
        switch ( action.type ) {
            case 'upsertMessage': {
                return state.some( message => message.id === action.message.id )
                    ? state.map( message => message.id === action.message.id ? action.message : message )
                    : [ ...state, action.message ]
            }
            default: {
                return state
            }
        }
    }, [] )

    const handleNewUserMessage = message => {
        dispatch( {
            type: 'upsertMessage',
            message
        } )
    }

    useEffect( () => {
        const isLatestMessageFromUser = () => (
            messages[ messages.length - 1 ]?.role === 'user'
        )

        const sendMessages = async () => {
            const message = {
                id: uuid(),
                role: 'assistant',
                content: '',
                status: 'WAITING'
            }

            dispatch( {
                type: 'upsertMessage',
                message
            } )

            const responseStream = await ollama.chat( {
                model: 'llama3',
                messages: messages.map( message => ( {
                    role: message.role,
                    content: message.content
                } ) ),
                stream: true
            } )

            for await ( const part of responseStream ) {
                message.content += part.message.content
                message.status = part.done ? 'DONE' : 'PENDING'

                dispatch( {
                    type: 'upsertMessage',
                    message
                } )

                if( part.done === true ) {
                    break
                }
            }
        }

        if( messages.length && isLatestMessageFromUser() ) {
            sendMessages()
        }
    }, [ messages ] )

    return (
        <section className="flex flex-col gap-4">
            <ChatMessageList
                messages={ messages }
            />

            <ChatMessageForm
                onSubmit={ handleNewUserMessage }
            />
        </section>
    )
}

export default Chat