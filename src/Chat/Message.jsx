import BouncingDots from "../icons/BouncingDots"

const ChatMessage = ( {
    message,
    role,
    status // WAITING, PENDING, DONE, ERROR
} ) => (
    <article className={ `flex flex-row gap-2 items-center ${ role === 'user' && 'justify-end' }` }>
        <div className={ `flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full ${ role === 'user' && 'order-2' }` }>
            { role === 'user' ? 'U' : 'A' }
        </div>

        <div className={ `p-2 rounded w-2/3 ${ role === 'user' && 'order-1' } ${ role === 'user' ? 'bg-gray-100' : 'bg-gray-50' } ${ status === 'ERROR' && 'bg-red-500 text-white' }` }>
            {
                status === 'WAITING'
                ? (
                    <BouncingDots />
                ) : (
                    message
                )
            }
        </div>
    </article>
)

export default ChatMessage