import './App.css';

const App = () => {
    const handleMessageFormSubmit = event => {
        event.preventDefault()

        const messageInput = event.target.querySelector( 'input' )
        const message = messageInput.value

        console.log( message )

        messageInput.value = ''
    }

    return (
        <>
            <section>
                <h1>Messages</h1>

                <ul>
                    <li>Message 1</li>
                    <li>Message 2</li>
                    <li>Message 3</li>
                </ul>
            </section>

            <form onSubmit={ handleMessageFormSubmit }>
                <label>
                    <span>Message</span>
                    <input type="text" />
                </label>

                <button type="submit">Send</button>
            </form>
        </>
    )
}

export default App
