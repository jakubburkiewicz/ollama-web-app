import { useState } from "react"

import { v4 as uuid } from "uuid"

import { PaperAirplaneIcon } from "@heroicons/react/24/solid"

const ChatMessageForm = ( {
    onSubmit
} ) => {
    const [ messageContent, setMessageContent ] = useState( '' )

    const isMessageEmpty = messageContent.trim() === ''

    const handleMessageContentChange = event => {
        setMessageContent( event.target.value )
    }

    const handleMessageFormSubmit = event => {
        event.preventDefault()

        const message = {
            id: uuid(),
            role: 'user',
            content: messageContent
        }

        onSubmit( message )

        setMessageContent( '' )
    }

    const handleSubmitShortcut = event => {
        if( event.key === 'Enter' && ( event.ctrlKey || event.metaKey ) ) {
            event.preventDefault()

            if ( !isMessageEmpty ) {
                event.target.form.requestSubmit()
            }
        } else if( event.key === 'Enter' ) {
            event.preventDefault()
        }
    }

    return (
        <form
            onSubmit={ handleMessageFormSubmit }
            onKeyDown={ handleSubmitShortcut }
            className="flex flex-row gap-2 bg-stone-100 p-4"
        >
            <input
                type="text"
                name="message"
                placeholder="Type a message... (Cmd/Ctrl + Enter to send)"
                className="flex-grow border border-gray-300 rounded p-2"
                autoFocus={ true }
                value={ messageContent }
                onChange={ handleMessageContentChange }
            />

            <button
                type="button"
                className={ `text-white font-bold p-2 rounded ${ isMessageEmpty ? 'bg-gray-300' : 'bg-blue-500 hover:bg-blue-700' }` }
                disabled={ isMessageEmpty }
            >
                <PaperAirplaneIcon className="h-6 w-6" />

                <span className="sr-only">Send</span>
            </button>
        </form>
    )
}

export default ChatMessageForm