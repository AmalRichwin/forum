import * as React from 'react'

interface ISearchListItemProps {
    title: string
    description: string
}

const SearchListItem: React.FunctionComponent<ISearchListItemProps> = ({
    title,
    description,
}) => {
    return (
        <article className="flex items-start max-w-xs p-6 mt-1 space-x-6 sm:max-w-sm md:max-w-md hover:bg-gray-50">
            <div className="relative flex-auto min-w-0">
                <h2 className="pr-20 font-semibold text-gray-900 truncate font-poppins">
                    {title}?
                </h2>
                <dl className="flex flex-wrap mt-2 text-sm font-medium leading-6">
                    <p className="font-thin truncate font-poppins">
                        {description}
                    </p>
                </dl>
            </div>
        </article>
    )
}

export default SearchListItem
