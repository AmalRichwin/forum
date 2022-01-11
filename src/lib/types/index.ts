import { ReactSVGElement } from 'react'

export type CommentType = {
    _id: string
    comment: string
    createdAt: string
    updatedAt: string
    userId: UserType
}

export type UserType = {
    _id: string
    email: string
    username: string
    createdAt: string
    updatedAt: string
}

export type IssueType = {
    _id: string
    title: string
    description: string
    authorId: UserType
    createdAt: string
    updatedAt: string
    comments: CommentType[]
}

export type IconProps = {
    className?: string
    props?: ReactSVGElement
}
