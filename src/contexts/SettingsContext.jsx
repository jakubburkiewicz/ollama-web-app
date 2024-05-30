import { createContext, useContext, useReducer } from "react"

const SettingsContext = createContext()

const initialSettings = {
    host: 'localhost',
    model: '',
    modelOptions: []
}

const settingsReducer = ( state, action ) => {
    switch( action.type ) {
        case 'setHost': {
            return {
                ...state,
                host: action.host
            }
        }

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

        default: {
            return state
        }
    }
}

const SettingsProvider = ( { children } ) => {
    const [ settings, settingsDispatch ] = useReducer( settingsReducer, initialSettings )

    return (
        <SettingsContext.Provider value={ { settings, settingsDispatch } }>
            { children }
        </SettingsContext.Provider>
    )
}

const useSettings = () => {
    const context = useContext( SettingsContext )

    if ( !context ) {
        throw new Error( 'useSettings must be used within a SettingsProvider' )
    }

    return context
}

export {
    SettingsProvider,
    useSettings
}