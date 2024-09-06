import { Link, useLoaderData } from "react-router-dom";

const HeaderDash = () => {

    const { name } = useLoaderData().user

    return (
        <>
            <header className=" w-full bg-gradient-to-r from-violet-950 to-violet-800 text-white">
                <div className=" w-2/3 mx-auto">

                    <nav className="flex items-center justify-between flex-wrap p-2">
                        <div className="flex items-center flex-shrink-0 mr-6">
                            <span v="font-semibold text-xl tracking-tight">TCC</span>
                        </div>
                        <div className="block lg:hidden">
                            <button className="flex items-center px-3 py-2 border rounded  border-black  ">
                                <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
                            </button>
                        </div>
                        <div className="w-full flex-grow hidden lg:flex lg:items-center lg:w-auto sm:hidden md:hidden">
                            <div className="text-sm lg:flex-grow">

                                <Link to={'/Dashboard'} className="block mt-4 lg:inline-block lg:mt-0 hover:font-semibold mr-4">Dashboard</Link>
                            </div>
                            <div>
                                <div className="flex gap-2 items-center">
                                    <Link to={'/Profile'} className="p-2 rounded bg-opacity-40 bg-violet-950 inline-block">Hi, {name}</Link>
                                    <div className="w-[39px]">
                                        <img src="../images/user-4-xxl.png" className=" bg-slate-500 rounded-full w-[39px] h-[39px]" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </header>
        </>
    );
}

export default HeaderDash;