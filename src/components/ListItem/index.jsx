import React from 'react'

import moment from 'moment'
import PropTypes from 'prop-types'

import ChatIcon from '../../icons/ChatIcon'

function ListItem({
    title,
    description,
    createdAt,
    commentsCount,
    authorName,
}) {
    return (
        <article className="flex items-start p-6 mt-1 space-x-6 hover:bg-gray-50">
            <img
                loading="lazy"
                src={`https://robohash.org/${Math.random()}`}
                alt=""
                width="60"
                height="88"
                className="flex-none bg-gray-100 rounded-md"
            />
            <div className="relative flex-auto min-w-0">
                <h2 className="pr-20 font-semibold text-gray-900 truncate font-poppins">
                    {title}?
                </h2>
                <dl className="flex flex-wrap mt-2 text-sm font-medium leading-6">
                    <div className="absolute top-0 right-0 flex items-center space-x-1">
                        <dt className="text-orange-500">
                            <span className="sr-only">comments</span>
                            <ChatIcon className="w-5 h-5" />
                        </dt>
                        <dd>{commentsCount}</dd>
                    </div>

                    <p className="font-thin truncate font-poppins">
                        {description}
                    </p>
                    <div className="flex-none w-full mt-2 font-normal">
                        <dd className="text-gray-400 font-poppins">
                            Posted By - {authorName} -{' '}
                            {moment(createdAt).fromNow()}
                        </dd>
                    </div>
                </dl>
            </div>
        </article>
    )
}

export default ListItem

ListItem.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    commentsCount: PropTypes.number.isRequired,
    authorName: PropTypes.string.isRequired,
}
