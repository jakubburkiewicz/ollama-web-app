import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Prism } from "react-syntax-highlighter"

import BouncingDots from "../../icons/BouncingDots"

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
                    <Markdown
                        className="prose max-w-full w-full"
                        remarkPlugins={ [ remarkGfm ] }
                        components={ {
                            code( props ) {
                                const { children, className, node, ...rest } = props
                                const match = /language-(\w+)/.exec( className || '' )

                                return match
                                    ? (
                                        <Prism
                                            { ...rest }
                                            PreTag="div"
                                            children={ String( children ).replace( /\n$/, '' ) }
                                            language={ match[ 1 ] }
                                        >{ children }</Prism>
                                    ) : (
                                        <code
                                            { ...rest }
                                            className={ className }
                                        >{ children }</code>
                                    )
                            }
                        } }
                    >
                        { message }
                    </Markdown>
                )
            }
        </div>
    </article>
)

export default ChatMessage