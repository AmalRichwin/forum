import React from 'react'

import { Link } from 'react-router-dom'

import Navbar from '../../components/Navbar'

const NotFound = () => {
    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center justify-center gap-16 px-6 lg:flex-row py-28 md:px-24 md:py-20 lg:py-32 lg:gap-28">
                <div className="w-full lg:w-1/2">
                    <img
                        className="hidden lg:block"
                        src="https://i.ibb.co/v30JLYr/Group-192-2.png"
                        alt=""
                    />
                    <img
                        className="hidden md:block lg:hidden"
                        src="https://i.ibb.co/c1ggfn2/Group-193.png"
                        alt=""
                    />
                    <img
                        className="md:hidden"
                        src="https://i.ibb.co/8gTVH2Y/Group-198.png"
                        alt=""
                    />
                </div>
                <div className="w-full lg:w-1/2">
                    <h1 className="py-4 text-3xl font-extrabold text-gray-800 font-heading lg:text-4xl">
                        Looks like you&apos;ve found the doorway to the great
                        nothing
                    </h1>
                    <p className="py-4 text-base text-gray-800 font-poppins">
                        The content you’re looking for doesn’t exist. Either it
                        was removed, or you mistyped the link.
                    </p>
                    <p className="py-2 text-base text-gray-800 font-poppins">
                        Sorry about that! Please visit our hompage to get where
                        you need to go.
                    </p>
                    <div className="mt-10">
                        <Link
                            to="/"
                            className="w-full px-1 py-5 my-4 font-normal text-white border rounded-md shadow-lg font-poppins shadow-sky-500/50 bg-sky-400 lg:w-auto sm:px-16 hover:bg-sky-600 focus:outline-none "
                        >
                            Go back to Homepage
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NotFound
