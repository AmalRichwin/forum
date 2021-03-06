import * as React from 'react'

import { Dialog, Transition } from '@headlessui/react'
import SearchListItem from 'components/ListItem/SearchListItem'
import { motion } from 'framer-motion'
import { SearchSolidIcon } from 'icons'
import LoadingIcon from 'icons/LoadingIcon'
import axiosInstance from 'lib/axiosInstance'
import { IssueType } from 'lib/types'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'

interface ISearchModalProps {
    isModalOpen: boolean
    closeModal: () => void
}

interface SearchQueryResults {
    status: boolean
    issues: IssueType[]
}

const fetchIssuesBySearchQuery = async (
    query: string,
    signal: AbortSignal | undefined
) => {
    try {
        const { data } = await axiosInstance.get<SearchQueryResults>(
            `/api/issue/search/all?query=${query}`,
            {
                signal,
            }
        )
        return data
    } catch (err: InstanceType<Error>) {
        throw new Error(err)
    }
}

const SearchModal: React.FunctionComponent<ISearchModalProps> = ({
    isModalOpen,
    closeModal,
}) => {
    const [searchQuery, setSearchQuery] = React.useState('')

    const cancelButtonRef = React.useRef(null)

    const { data, isLoading } = useQuery<SearchQueryResults, Error>(
        ['searchIssues', searchQuery],
        ({ signal }) => fetchIssuesBySearchQuery(searchQuery, signal),
        {
            enabled: searchQuery.length ? true : false,
            suspense: false,
            retry: false,
        }
    )

    return (
        <Transition.Root show={isModalOpen} as={motion.div}>
            <Dialog
                as="div"
                className="fixed inset-0 z-10 overflow-y-auto"
                initialFocus={cancelButtonRef}
                onClose={closeModal}
            >
                <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={React.Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span
                        className="hidden sm:inline-block sm:align-middle sm:h-screen"
                        aria-hidden="true"
                    >
                        &#8203;
                    </span>
                    <Transition.Child
                        as={React.Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="inline-block overflow-hidden text-left align-top transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:max-w-lg sm:w-full">
                            <div className="px-4 pt-5 pb-2 bg-white sm:p-6 sm:pb-2">
                                <div className="relative flex flex-wrap items-stretch w-full ">
                                    <span className="absolute z-10 flex items-center justify-center w-8 h-full pl-3 text-base font-normal leading-snug text-center bg-transparent rounded text-slate-400">
                                        <SearchSolidIcon />
                                    </span>
                                    <input
                                        type="text"
                                        placeholder="Search for issues"
                                        className="relative block w-full py-3 pl-10 text-base placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg text-neutral-600 bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                                        onKeyUp={(e) =>
                                            setSearchQuery(
                                                e.currentTarget.value
                                            )
                                        }
                                    />
                                </div>
                            </div>
                            <div className="flex justify-center my-5 font-poppins text-slate-400">
                                {isLoading ? (
                                    <LoadingIcon className="w-12 h-12 animate-spin" />
                                ) : (
                                    <>
                                        {!data ? (
                                            <p className="text-center">
                                                No issues found
                                            </p>
                                        ) : (
                                            data?.issues?.map(
                                                (issue: IssueType) => (
                                                    <Link
                                                        key={issue._id}
                                                        to={`/issue/${issue._id}`}
                                                    >
                                                        <SearchListItem
                                                            title={issue.title}
                                                            description={
                                                                issue.description
                                                            }
                                                        />
                                                    </Link>
                                                )
                                            )
                                        )}
                                    </>
                                )}
                            </div>
                            <div className="flex justify-end px-4 py-3 bg-gray-50 sm:px-6">
                                <h2 className="font-bold text-neutral-600 hover:text-neutral-800 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300 font-heading">
                                    Forum
                                </h2>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default SearchModal
