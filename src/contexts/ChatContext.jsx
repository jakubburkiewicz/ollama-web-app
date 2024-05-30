import { createContext, useContext, useReducer } from "react"

const ChatContext = createContext()

const initialChat = {
    messages: []
}

const chatReducer = ( state, action ) => {
    switch( action.type ) {
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
    const [ chat, chatDispatch ] = useReducer( chatReducer, initialChat )

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