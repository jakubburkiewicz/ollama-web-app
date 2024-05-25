import { v4 as uuid } from "uuid"

import { PaperAirplaneIcon } from "@heroicons/react/24/solid"

const ChatMessageForm = ( {
    onSubmit
} ) => {
    const handleMessageFormSubmit = event => {
        event.preventDefault()

        const message = {
            id: uuid(),
            role: 'user',
            content: event.target.message.value
        }

        onSubmit( message )

        event.target.reset()
    }

    return (
        <form
            onSubmit={ handleMessageFormSubmit }
            className="flex flex-row gap-2"
        >
            <input
                type="text"
                name="message"
                placeholder="Type a message..."
                className="flex-grow border border-gray-300 rounded p-2"
                autoFocus={ true }
            />

            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded"
            >
                <PaperAirplaneIcon className="h-6 w-6" />

                <span className="sr-only">Send</span>
            </button>
        </form>
    )
}

export default ChatMessageForm