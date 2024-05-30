import { NavLink } from "react-router-dom"

import {
    ChatBubbleLeftRightIcon,
    Cog6ToothIcon
} from "@heroicons/react/24/solid"
import LeftTriangleArrow from "../icons/LeftTriangleArrow"

const Sidebar = () => (
    <nav className="flex flex-col gap-2 w-20 h-full py-4 bg-gray-200">
        <NavLink
            to="/"
            className="w-full h-12 text-gray-700 flex items-center justify-center relative"
        >
            { ( { isActive } ) => (
                <>
                    <ChatBubbleLeftRightIcon className="w-8 h-8" />

                    <span className="sr-only">Chat</span>

                    { isActive && (
                        <span className="absolute right-0">
                            <LeftTriangleArrow  />
                        </span>
                    ) }
                </>
            ) }
        </NavLink>

        <div className="flex-grow" />

        <NavLink
            to="/settings"
            className="w-full h-12 text-gray-700 flex items-center justify-center relative"
        >
            { ( { isActive } ) => (
                <>
                    <Cog6ToothIcon className="w-8 h-8" />

                    <span className="sr-only">Settings</span>

                    { isActive && (
                        <span className="absolute right-0">
                            <LeftTriangleArrow />
                        </span>
                    ) }
                </>
            ) }
        </NavLink>
    </nav>
)

export default Sidebar