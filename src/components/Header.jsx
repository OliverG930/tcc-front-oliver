import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useAuthStore } from "../store/authStore"

const LoginRegisterLinks = () => {
    return (
        <>
            <Link to={"/Login"} className="inline-block text-sm px-4 py-2 leading-none border rounded border-white hover:bg-black hover:text-white hover:border-transparent  ">Login</Link>
            <Link to={"/Register"} className="inline-block text-sm px-4 py-2 leading-none ">Register</Link>

        </>
    )
}

const LoggedLinks = ({ to, children }) => {
    return (
        <Link to={to} className="inline-block text-sm px-4 py-2 leading-none border rounded border-white hover:bg-black hover:text-white hover:border-transparent lg:mt-0">
            {children}
        </Link>
    )
}


const Header = ({ handle }) => {

    const { session, isLoggin } = useAuthStore()

    const openSidebar = () => {
        handle()
    }

    return (
        <>
            <header className=" w-full p-2 bg-gradient-to-r from-violet-950 to-violet-800 text-white ">
                <div className=" lg:w-2/3 mx-auto">

                    <nav className="flex items-center justify-between flex-wrap p-2">
                        <div className="flex items-center flex-shrink-0 mr-6">
                            <Link to={"/"}>
                                <span v="font-semibold text-xl tracking-tight">TCC</span>
                            </Link>
                        </div>
                        {
                            isLoggin
                            && <div className="block lg:hidden">
                                <button onClick={(e) => openSidebar()} className="flex items-center px-3 py-2 border rounded  border-black  ">
                                    <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
                                </button>
                            </div>
                        }
                        <div className="w-full flex-grow hidden lg:flex lg:items-center lg:w-auto sm:hidden md:hidden">
                            <div className="text-sm lg:flex-grow">
                                <Link to={"/"} className="block lg:inline-block hover:font-semibold mr-4">Home</Link>
                            </div>

                        </div>

                        <div>
                            {isLoggin ?
                                session.type === 1
                                    ? <LoggedLinks to={"/Dashboard/Home"}>Dashboard</LoggedLinks>
                                    : session.type === 2
                                        ? <LoggedLinks to={"/Teacher/Home"}>Teacher</LoggedLinks>
                                        : session.type === 3
                                            ? <LoggedLinks to={"/Admin/Home"}>Admin</LoggedLinks>
                                            : ''
                                : <LoginRegisterLinks />
                            }

                        </div>
                    </nav>



                </div>
            </header>
        </>
    )
}

export default Header