import { createContext, useContext, useEffect, useReducer } from "react"

const ChatContext = createContext()

const initialChat = {
    model: '',
    modelOptions: [],
    messages: []
}

const chatReducer = ( state, action ) => {
    switch( action.type ) {
        case 'setModel': {
            return {
                ...state,
                model: action.model
            }
        }

        case 'setModelOptions': {
            return {
                ...state,
                modelOptions: action.models
            }
        }

        case 'upsertMessage': {
            return {
                ...state,
                messages: state.messages.some( message => message.id === action.message.id )
                    ? state.messages.map( message => message.id === action.message.id ? action.message : message )
                    : [ ...state.messages, action.message ]
            }
        }

        default: {
            return state
        }
    }
}

const ChatProvider = ( { children } ) => {
    const [ chat, chatDispatch ] = useReducer( chatReducer, initialChat, initial => {
        const storedChat = localStorage.getItem( 'ollama-web-app__chat' )

        return storedChat ? JSON.parse( storedChat ) : initial
    } )

    useEffect( () => {
        localStorage.setItem( 'ollama-web-app__chat', JSON.stringify( chat ) )
    }, [ chat ] )

    return (
        <ChatContext.Provider value={ { chat, chatDispatch } }>
            { children }
        </ChatContext.Provider>
    )
}

const useChat = () => {
    const context = useContext( ChatContext )

    if ( !context ) {
        throw new Error( 'useChat must be used within a ChatProvider' )
    }

    return context
}

export {
    ChatProvider,
    useChat
}