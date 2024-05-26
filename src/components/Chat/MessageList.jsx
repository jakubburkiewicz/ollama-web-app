import ChatMessage from "./Message"

const ChatMessageList = ( {
    messages
} ) => (
    <section className="flex flex-col gap-2">
        { messages.length === 0 && (
            <p className="text-center text-gray-500">
                No messages yet
            </p>
        ) }

        { messages.map( message => (
            <ChatMessage
                key={ message.id }
                message={ message.content }
                role={ message.role }
                status={ message.status }
            />
        ) ) }
    </section>
)

export default ChatMessageList