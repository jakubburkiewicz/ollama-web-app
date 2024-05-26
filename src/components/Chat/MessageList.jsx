import ChatMessage from "./Message"

const ChatMessageList = ( {
    messages
} ) => (
    <section className="grow overflow-auto">
        <div className="flex flex-col gap-2 justify-end p-4">
            { messages.length === 0 && (
                <div className="flex justify-center items-center grow">
                    <p className="text-center text-gray-500">
                        No messages yet
                    </p>
                </div>
            ) }

            { messages.map( message => (
                <ChatMessage
                    key={ message.id }
                    message={ message.content }
                    role={ message.role }
                    status={ message.status }
                />
            ) ) }
        </div>
    </section>
)

export default ChatMessageList