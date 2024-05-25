const BouncingDots = () => (
    <svg
        width="40"
        height="15"
        viewBox="0 0 40 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <circle cx="5" cy="10" r="5" fill="currentColor" className="animate-bounce" />
        <circle cx="20" cy="10" r="5" fill="currentColor" className="animate-bounce animation-delay-[100ms]" />
        <circle cx="35" cy="10" r="5" fill="currentColor" className="animate-bounce animation-delay-[200ms]" />
    </svg>
)

export default BouncingDots