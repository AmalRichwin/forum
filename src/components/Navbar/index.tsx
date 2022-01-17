import * as React from 'react'

import { Disclosure } from '@headlessui/react'
import SearchModal from 'components/Modal/SearchModal'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

import { AuthContext } from '../../context/auth'
import { Xicon, MenuIcon, SearchSolidIcon } from '../../icons'
import axiosInstance from '../../lib/axiosInstance'

function Navbar() {
    const [isSearchModalOpen, setSearchModalOpen] = React.useState(false)
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

    function closeModal() {
        setSearchModalOpen(false)
    }

    function openModal() {
        setSearchModalOpen(true)
    }

    React.useEffect(() => {
        window.addEventListener('keydown', (e) => {
            if (e.key === 'k' && e.ctrlKey) {
                openModal()
            }
        })
        return () => {
            window.removeEventListener('keydown', () => {
                closeModal()
            })
        }
    }, [])

    return (
        <>
            <Disclosure as="nav" className="bg-gray-800">
                {({ open }) => (
                    <>
                        <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
                            <div className="relative grid items-center h-16 grid-cols-4 grid-rows-1">
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

                                <motion.div
                                    className={` ${
                                        isSearchModalOpen ? 'hidden' : ''
                                    } flex justify-center self-center col-span-2 `}
                                >
                                    <button
                                        onClick={openModal}
                                        className="px-1 py-1 text-sm font-medium bg-white border-2 border-gray-200 rounded-md shadow-lg sm:px-3 sm:py-2 text-gray-500/80 hover:border-gray-300/30 hover:text-gray-400/60 font-poppins"
                                    >
                                        Search for Issues
                                        <span className="hidden ml-5 lg:inline">
                                            <kbd className="inline-flex items-center justify-center p-1 mr-1 text-xs font-normal text-center align-middle transition duration-150 ease-in-out bg-gray-100 border border-gray-300 rounded font-poppins group-hover:border-gray-300 ">
                                                ⌘
                                            </kbd>
                                            <kbd className="inline-flex items-center justify-center p-1 ml-auto mr-0 text-xs text-center align-middle transition duration-150 ease-in-out bg-gray-100 border border-gray-300 rounded font-poppins group-hover:border-gray-300 ">
                                                K
                                            </kbd>
                                        </span>
                                        <span className="inline-block ml-2 align-middle">
                                            <SearchSolidIcon />
                                        </span>
                                    </button>
                                </motion.div>

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
            <SearchModal
                isModalOpen={isSearchModalOpen}
                closeModal={closeModal}
            />
        </>
    )
}

export default Navbar
