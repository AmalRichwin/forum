import React from 'react'

import moment from 'moment'

type CommentListItemProps = {
    username: string
    comment: string
    commentDate: string
}

function CommentListItem({
    username,
    comment,
    commentDate,
}: CommentListItemProps) {
    return (
        <div className="flex flex-col mt-10">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-xs font-bold tracking-wider text-left text-gray-500 font-poppins"
                                    >
                                        {username}{' '}
                                        <span className="ml-2 font-normal text-gray-500/60">
                                            commented{' '}
                                            {moment(commentDate).fromNow()}
                                        </span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                <tr>
                                    <td className="px-6 py-4 leading-6">
                                        <div className="flex items-center">
                                            <div className="text-sm font-normal text-gray-900 font-poppins">
                                                <pre className="whitespace-pre font-poppins">
                                                    {comment}
                                                </pre>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CommentListItem
