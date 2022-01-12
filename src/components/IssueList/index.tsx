import * as React from 'react'

import SearchModal from 'components/Modal/SearchModal'
import { IssueType } from 'lib/types'
import { useInfiniteQuery } from 'react-query'
import { Link } from 'react-router-dom'

import { AuthContext } from '../../context/auth'
import LoadingIcon from '../../icons/LoadingIcon'
import axiosInstance from '../../lib/axiosInstance'
import ListItem from '../ListItem'
import AddPostModal from '../Modal/AddIssueModal'

const fetchIssues = async ({ pageParam = 1 }) => {
    try {
        const { data } = await axiosInstance.get(
            `/api/issue/?page=${pageParam}&limit=5`
        )
        return data
    } catch (error: InstanceType<Error>) {
        throw new Error(error)
    }
}

function IssueList() {
    const [open, setOpen] = React.useState(false)
    const [isSearchModalOpen, setSearchModalClose] = React.useState(true)

    const authCtx = React.useContext(AuthContext)

    const {
        data,
        fetchNextPage,
        isLoading,
        hasNextPage,
        isFetchingNextPage,
        isFetchedAfterMount,
    } = useInfiniteQuery('issues', fetchIssues, {
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: 'always',
        getNextPageParam: (lastPage) =>
            lastPage.hasMore ? lastPage.currentPage + 1 : false,
    })

    function closeModal() {
        setSearchModalClose(false)
    }

    function openModal() {
        setSearchModalClose(true)
    }

    return (
        <>
            <SearchModal
                isModalOpen={isSearchModalOpen}
                closeModal={closeModal}
            />
            <section>
                <div className="px-4 pt-2 pb-12 mx-auto ">
                    <div className="max-w-4xl pt-24 mx-auto">
                        <div className="relative">
                            <div
                                className="absolute inset-0 flex items-center"
                                aria-hidden="true"
                            >
                                <div className="w-full border-t border-black"></div>
                            </div>
                            <div className="relative flex justify-start">
                                <span className="pr-3 text-lg font-medium bg-white text-neutral-600">
                                    All Issues
                                </span>
                            </div>
                        </div>
                        <div className="space-y-8 lg:divide-y lg:divide-gray-100"></div>
                        <div className="relative flex justify-end my-5">
                            {authCtx.user ? (
                                <button
                                    onClick={() => setOpen(true)}
                                    className="px-3 py-2 text-sm font-medium text-white rounded-md shadow-lg hover:bg-sky-700 shadow-sky-500/50 hover:text-gray-100 font-poppins bg-sky-500 "
                                >
                                    Add Post
                                </button>
                            ) : null}
                        </div>
                        <AddPostModal
                            isOpen={open}
                            closeModal={() => setOpen(false)}
                        />
                        {isLoading && (
                            <div className="grid place-items-center">
                                <LoadingIcon className="w-12 h-12 text-sky-500 animate-spin" />
                            </div>
                        )}
                        {data &&
                            data.pages.map((page) => (
                                <React.Fragment key={page.currentPage}>
                                    {page.issues.map((issue: IssueType) => (
                                        <Link
                                            key={issue._id}
                                            to={`/issue/${issue._id}`}
                                        >
                                            <ListItem
                                                authorName={
                                                    issue.authorId
                                                        ? issue.authorId
                                                              .username
                                                        : 'Anonymous'
                                                }
                                                title={issue.title}
                                                description={issue.description}
                                                createdAt={issue.createdAt}
                                                commentsCount={
                                                    issue.comments.length
                                                }
                                            />
                                        </Link>
                                    ))}
                                </React.Fragment>
                            ))}
                        {isFetchedAfterMount && (
                            <div className="grid mt-10 place-items-center">
                                <button
                                    onClick={() => fetchNextPage()}
                                    disabled={isLoading || !hasNextPage}
                                    className="px-3 py-2 text-sm font-medium text-white rounded-md shadow-lg hover:bg-sky-700 shadow-sky-500/50 hover:text-gray-100 font-poppins bg-sky-500"
                                >
                                    {hasNextPage
                                        ? 'Load More'
                                        : 'No More Issues'}
                                    {isFetchingNextPage && (
                                        <LoadingIcon className="inline-block w-5 h-5 ml-3 text-white animate-spin" />
                                    )}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    )
}

export default IssueList
