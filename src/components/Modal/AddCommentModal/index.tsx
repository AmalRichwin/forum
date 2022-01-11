import * as React from 'react'

import { Dialog, Transition } from '@headlessui/react'
import { ValidationFieldParams } from 'containers/Signup'
import PropTypes from 'prop-types'
import { useMutation, UseMutationResult, useQueryClient } from 'react-query'

import { AuthContext } from '../../../context/auth'
import axiosInstance from '../../../lib/axiosInstance'
import { validationErrorMessage } from '../../../lib/formValidation'

interface IAddComment {
    issueId: string | undefined
    comment: string
    userId: string | null
}

const addCommentMutation = async ({
    issueId,
    comment,
    userId,
}: IAddComment): Promise<void> => {
    try {
        await axiosInstance.post('/api/issue/addcomment', {
            issueId,
            comment,
            userId,
        })
    } catch (error) {
        throw new Error(`Add issue failed: ${error}`)
    }
}

type AddCommentModalProps = {
    isOpen: boolean
    onClose: () => void
    issueId: string | undefined
}

function AddCommentModal({ issueId, isOpen, onClose }: AddCommentModalProps) {
    const cancelButtonRef = React.useRef(null)
    const [values, setValues] = React.useState({
        comment: '',
        errors: {
            comment: '',
        },
        formSubmitted: false,
    })

    const authCtx = React.useContext(AuthContext)

    const queryClient = useQueryClient()

    const mutation: UseMutationResult<void, Error, IAddComment> = useMutation(
        ({ issueId, comment, userId }) =>
            addCommentMutation({ issueId, comment, userId }),
        {
            onSuccess: () => {
                resetForm()
                queryClient.invalidateQueries(['issue', issueId])
                queryClient.invalidateQueries('issues')
                onClose()
            },
        }
    )

    const validateField = ({
        fieldName,
        fieldValue,
    }: ValidationFieldParams) => {
        const errMsg = validationErrorMessage({
            fieldName,
            fieldValue,
        })
        setValues((prevValues) => ({
            ...prevValues,
            errors: {
                ...prevValues.errors,
                [fieldName]: errMsg,
            },
        }))
    }

    const handleChange: React.ChangeEventHandler<
        HTMLInputElement | HTMLTextAreaElement
    > = (event) => {
        const { name, value } = event.target
        setValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }))

        if (values.formSubmitted) {
            validateField({ fieldName: name, fieldValue: value })
        }
    }

    const validateForm = (errors: typeof values.errors) => {
        let isValid = true

        Object.entries(errors).forEach((item) => {
            if (item[1].length) {
                isValid = false
            } else {
                const errMsg = validationErrorMessage({
                    fieldName: item[0],
                    fieldValue: values[item[0] as keyof typeof values.errors],
                })

                if (errMsg.length) {
                    setValues((prevValues) => ({
                        ...prevValues,
                        errors: { ...prevValues.errors, [item[0]]: errMsg },
                    }))
                    isValid = false
                }
            }
        })
        return isValid
    }

    const resetForm = () => {
        setValues({
            comment: '',
            errors: {
                comment: '',
            },
            formSubmitted: false,
        })
    }

    const onSubmit: React.FormEventHandler = (evt) => {
        evt.preventDefault()
        if (!values.formSubmitted) {
            setValues((prevValues) => ({
                ...prevValues,
                formSubmitted: true,
            }))
        }

        if (validateForm(values.errors)) {
            const { comment } = values
            const userId: string | null = authCtx.user.id
            try {
                mutation.mutate({ comment, issueId, userId })
            } catch (error) {
                console.log(error)
                throw new Error(`Add issue failed: ${error}`)
            }
        }
    }

    return (
        <Transition.Root show={isOpen} as={React.Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-10 overflow-y-auto"
                initialFocus={cancelButtonRef}
                onClose={onClose}
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
                        <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="">
                                <div className="flex items-center justify-center max-w-lg mx-auto shadow-lg">
                                    <form
                                        className="w-full max-w-xl px-4 pt-2 bg-white rounded-lg"
                                        noValidate
                                        onSubmit={onSubmit}
                                    >
                                        <div className="flex flex-wrap mb-6 -mx-3">
                                            <h2 className="px-4 pt-3 pb-2 text-lg font-medium text-gray-800 font-poppins">
                                                Add a new comment
                                            </h2>
                                            <div className="w-full px-3 mt-2 mb-2 md:w-full">
                                                <textarea
                                                    className="w-full h-20 px-3 py-2 font-medium leading-normal placeholder-gray-300 bg-gray-100 border border-gray-400 rounded resize-none focus:outline-none focus:bg-white font-poppins"
                                                    name="comment"
                                                    onChange={handleChange}
                                                    value={values.comment}
                                                    onBlur={(evt) =>
                                                        validateField({
                                                            fieldName:
                                                                evt.target.name,
                                                            fieldValue:
                                                                evt.target
                                                                    .value,
                                                        })
                                                    }
                                                    placeholder="Type Your Comment"
                                                    required
                                                />
                                                {values.errors.comment ? (
                                                    <span
                                                        className="text-xs font-poppins text-red-600/80"
                                                        id="description-error"
                                                    >
                                                        {values.errors.comment}
                                                    </span>
                                                ) : null}
                                            </div>
                                            <div className="flex justify-end w-full px-3 md:w-full">
                                                <div className="-mr-1">
                                                    <input
                                                        type="submit"
                                                        value="Post Comment"
                                                        className={
                                                            'text-white hover:bg-sky-700 shadow-lg shadow-sky-500/50  hover:text-gray-100 px-3 py-2 rounded-md text-sm font-medium font-poppins bg-sky-500'
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>{' '}
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default AddCommentModal

AddCommentModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    issueId: PropTypes.string.isRequired,
}
