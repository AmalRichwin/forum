import React from 'react'

import { CommentBox } from 'components/Comment'
import { CommentType } from 'lib/types'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

import { CommentListItem } from '../../components/Comment'
import AddCommentModal from '../../components/Modal/AddCommentModal'
import Navbar from '../../components/Navbar'
import { AuthContext } from '../../context/auth'
import axiosInstance from '../../lib/axiosInstance'

const fetchIssuePagebyId = async (id: string | undefined) => {
    try {
        const { data } = await axiosInstance.get(`/api/issue/${id}`)
        return data
    } catch (error) {
        throw new Error(`Fetch issue failed: ${error}`)
    }
}

const IssuePage = () => {
    const [openCommentModal, setOpenCommentModal] = React.useState(false)

    const authCtx = React.useContext(AuthContext)

    const { id } = useParams()

    const { data } = useQuery(['issue', id], () => fetchIssuePagebyId(id), {
        enabled: !!id,
        retry: false,
        onError: () => {
            window.location.href = '/404'
        },
    })
    return (
        <>
            <Navbar />
            {data && data.issue && (
                <section>
                    <div className="container flex flex-col items-center px-5 py-8 mx-auto border-2 max-w-7xl sm:px-6 lg:px-8 border-slate-400/20">
                        <div className="flex flex-col w-full max-w-3xl mx-auto prose text-left prose-blue">
                            <div className="w-full mx-auto">
                                <h1 className="mb-10 text-xl font-bold  md:text-2xl font-heading">
                                    {data.issue.title}?{' '}
                                    <span className="text-sm text-right text-gray-400 ">
                                        posted by {data.issue.authorId.username}
                                    </span>
                                </h1>
                                <pre className="whitespace-pre-line font-poppins">
                                    {data.issue.description}
                                </pre>
                                <div className="flex items-center justify-between mt-10 mb-5">
                                    <h2 className="text-xl font-medium font-poppins">
                                        Comments
                                    </h2>
                                    {authCtx.user ? (
                                        <button
                                            className={
                                                'text-white hover:bg-sky-700 shadow-lg shadow-sky-500/50  hover:text-gray-100 px-3 py-2 rounded-md text-sm font-medium font-poppins bg-sky-500'
                                            }
                                            onClick={() =>
                                                setOpenCommentModal(true)
                                            }
                                        >
                                            Add Comment
                                        </button>
                                    ) : null}
                                </div>
                                {data.issue.comments.map(
                                    (comment: CommentType) => (
                                        <CommentListItem
                                            key={comment._id}
                                            comment={comment.comment}
                                            commentDate={comment.createdAt}
                                            username={comment.userId.username}
                                        />
                                    )
                                )}
                                <CommentBox />
                            </div>
                        </div>
                    </div>
                </section>
            )}
            <AddCommentModal
                isOpen={openCommentModal}
                onClose={() => setOpenCommentModal(false)}
                issueId={id}
            />
        </>
    )
}

export default IssuePage
