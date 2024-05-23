import { v4 as uuid } from 'uuid'

import './App.css';
import { useReducer } from 'react';

const App = () => {
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

    const handleMessageFormSubmit = event => {
        event.preventDefault()

        const message = {
            id: uuid(),
            role: 'user',
            content: event.target.content.value
        }

        dispatch( {
            type: 'upsertMessage',
            message
        } )

        event.target.reset()
    }

    return (
        <>
            <section>
                <h1>Messages</h1>

                <ul>
                    { messages.map( message => (
                        <li key={ message.id }>
                            <strong>{ message.role }</strong>: { message.content }
                        </li>
                    ) ) }
                </ul>
            </section>

            <form onSubmit={ handleMessageFormSubmit }>
                <label>
                    <span>Message</span>
                    <input type="text" name="content" />
                </label>

                <button type="submit">Send</button>
            </form>
        </>
    )
}

export default App
