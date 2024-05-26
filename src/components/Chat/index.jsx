import { useEffect, useReducer } from "react"

import ollama from "ollama/browser"
import { v4 as uuid } from "uuid"

import { useSettings } from "../../contexts/SettingsContext"

import ChatMessageList from "./MessageList"
import ChatMessageForm from "./MessageForm"
import ChatSettingsForm from "./SettingsForm"

const Chat = () => {
    const { settings, settingsDispatch } = useSettings()

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
        const fetchModels = async () => {
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
    }, [ settingsDispatch ] )

    useEffect( () => {
        const isLatestMessageFromUser = () => (
            messages[ messages.length - 1 ]?.role === 'user'
        )

        const sendMessages = async () => {
            let responseStream;

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

            try {
                responseStream = await ollama.chat( {
                    model: settings.model.name,
                    messages: messages.map( message => ( {
                        role: message.role,
                        content: message.content
                    } ) ),
                    stream: true
                } )
            } catch( error ) {
                message.content = error.message
                message.status = 'ERROR'

                dispatch( {
                    type: 'upsertMessage',
                    message
                } )

                return
            }

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
    }, [ settings, messages ] )

    return (
        <section className="flex flex-col grow h-full">
            <ChatSettingsForm />

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