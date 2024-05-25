import ChatMessage from "./Message"

const ChatMessageList = ( {
    messages
} ) => (
    <section className="flex flex-col gap-2">
        { messages.map( message => (
            <ChatMessage
                key={ message.id }
                message={ message.content }
                role={ message.role }
            />
        ) ) }
    </section>
)

export default ChatMessageList