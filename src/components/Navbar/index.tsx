import * as React from 'react'

import { Disclosure } from '@headlessui/react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

import { AuthContext } from '../../context/auth'
import { Xicon, MenuIcon } from '../../icons'
import axiosInstance from '../../lib/axiosInstance'

const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: '-100%' },
}

function Navbar() {
    const authContext = React.useContext(AuthContext)

    const handleLogout = async () => {
        try {
            const { status } = await axiosInstance.get('/api/logout', {
                withCredentials: true,
            })

            if (status === 200) {
                authContext.setUser(null)
            }
        } catch (error) {
            throw new Error(`Logout failed: ${error}`)
        }
    }
    return (
        <Disclosure as="nav" className="bg-gray-800">
            {({ open }) => (
                <>
                    <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="relative flex items-center justify-between h-16">
                            <div className="absolute right-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="sr-only ">
                                        Open main menu
                                    </span>
                                    {open ? (
                                        <Xicon
                                            className="block w-6 h-6"
                                            aria-hidden="true"
                                        />
                                    ) : (
                                        <MenuIcon
                                            className="block w-6 h-6"
                                            aria-hidden="true"
                                        />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <Link
                                to="/"
                                className="text-3xl font-extrabold text-white font-heading`"
                            >
                                Forum
                            </Link>
                            <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-end">
                                <div className="hidden sm:block sm:ml-6">
                                    <div className="flex space-x-4">
                                        {!authContext.user ? (
                                            <>
                                                <Link
                                                    to="/signin"
                                                    className={
                                                        'text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium font-poppins'
                                                    }
                                                >
                                                    Signin
                                                </Link>
                                                <Link
                                                    to="/signup"
                                                    className={
                                                        'text-white hover:bg-sky-700 shadow-lg shadow-sky-500/50  hover:text-gray-100 px-3 py-2 rounded-md text-sm font-medium font-poppins bg-sky-500'
                                                    }
                                                >
                                                    Signup
                                                </Link>
                                            </>
                                        ) : (
                                            <button
                                                onClick={handleLogout}
                                                className={
                                                    'text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium font-poppins'
                                                }
                                            >
                                                Logout
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {open && (
                        <Disclosure.Panel
                            static
                            as={motion.div}
                            initial={{
                                opacity: 0,
                                height: 0,
                                width: 0,
                            }}
                            animate={{
                                opacity: open ? 1 : 0,
                                height: open ? 'auto' : 0,
                                width: open ? 'auto' : 0,
                            }}
                            variants={{
                                open: {
                                    opacity: 1,
                                    height: 'auto',
                                    width: 'auto',
                                },
                                closed: {
                                    opacity: 0,
                                    height: 0,
                                    width: 0,
                                },
                            }}
                            className="sm:hidden"
                        >
                            <div className="px-2 pt-2 pb-3 space-y-1">
                                {!authContext.user ? (
                                    <>
                                        <Disclosure.Button
                                            as={Link}
                                            to="/signin"
                                            className={
                                                'text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-poppins font-medium'
                                            }
                                        >
                                            Signin
                                        </Disclosure.Button>
                                        <Disclosure.Button
                                            as={Link}
                                            to="/signup"
                                            className={
                                                'text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-poppins font-medium'
                                            }
                                        >
                                            Signup
                                        </Disclosure.Button>
                                    </>
                                ) : (
                                    <Disclosure.Button
                                        onClick={handleLogout}
                                        className={
                                            'text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-poppins font-medium'
                                        }
                                    >
                                        Logout
                                    </Disclosure.Button>
                                )}
                            </div>
                        </Disclosure.Panel>
                    )}
                </>
            )}
        </Disclosure>
    )
}

export default Navbar
