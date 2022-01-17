import React from 'react'

import { Link } from 'react-router-dom'

function Header() {
    return (
        <section className="w-full bg-white">
            <div className="relative items-center w-full px-5 py-10 mx-auto md:px-12 lg:px-16 max-w-7xl lg:pt-24 lg:pb-12">
                <div className="flex w-full mx-auto text-left">
                    <div className="relative inline-flex items-center mx-auto align-middle">
                        <div className="text-center">
                            <h1 className="max-w-5xl text-2xl font-bold leading-none tracking-tighter font-heading text-neutral-600 md:text-5xl lg:text-6xl lg:max-w-7xl">
                                {' '}
                                Welcome to discussion forum
                            </h1>
                            <p className="max-w-xl mx-auto mt-8 text-base leading-relaxed text-gray-500 font-poppins ">
                                Forum is a place to share knowledge and discuss
                                new web technologies.
                            </p>
                            <div className="flex justify-center w-full max-w-2xl gap-2 mx-auto mt-6">
                                <Link
                                    to="/signup"
                                    className="items-center block px-5 py-4 text-base font-medium text-center text-white transition duration-500 ease-in-out transform rounded-lg shadow-lg font-poppins bg-sky-500 shadow-sky-500/50 lg:px-10 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                                >
                                    Signup to join the forum
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <section id="intro"></section>
            </div>
        </section>
    )
}

export default Header
