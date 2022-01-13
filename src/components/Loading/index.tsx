import React from 'react'

import LoadingIcon from 'icons/LoadingIcon'

export default function Loading() {
    return (
        <div className="grid h-[calc(100vh_-_10rem)] place-items-center">
            <LoadingIcon className="w-12 h-12 text-sky-500 animate-spin" />
        </div>
    )
}
