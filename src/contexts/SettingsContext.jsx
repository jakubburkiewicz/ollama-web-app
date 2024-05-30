import { createContext, useContext, useEffect, useReducer } from "react"

const SettingsContext = createContext()

const initialSettings = {
    host: 'localhost'
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
    const [ settings, settingsDispatch ] = useReducer( settingsReducer, initialSettings, initial => {
        const storedSettings = localStorage.getItem( 'ollama-web-app__settings' )

        return storedSettings ? JSON.parse( storedSettings ) : initial
    } )

    useEffect( () => {
        localStorage.setItem( 'ollama-web-app__settings', JSON.stringify( settings ) )

        return () => {
            localStorage.removeItem( 'ollama-web-app__settings' )
        }
    }, [ settings ] )

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