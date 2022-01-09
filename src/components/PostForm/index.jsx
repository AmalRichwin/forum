/* eslint-disable react/prop-types */
import * as React from 'react'

import { useMutation, useQueryClient } from 'react-query'

import { AuthContext } from '../../context/auth'
import axiosInstance from '../../lib/axiosInstance'
import { validationErrorMessage } from '../../lib/formValidation'

const addIssueMutation = async (title, description, authorId) => {
    try {
        const { data } = await axiosInstance.post('/api/issue/create', {
            title,
            description,
            authorId,
        })
        return data
    } catch (error) {
        throw new Error(`Add issue failed: ${error}`)
    }
}

export default function PostForm({ closeModal }) {
    const [values, setValues] = React.useState({
        title: '',
        description: '',
        errors: {
            title: '',
            description: '',
        },
        formSubmitted: false,
    })

    const authCtx = React.useContext(AuthContext)

    const queryClient = useQueryClient()

    const mutation = useMutation(
        ({ title, description, authorId }) =>
            addIssueMutation(title, description, authorId),
        {
            onSuccess: () => {
                resetForm()
                queryClient.invalidateQueries('issues')
                closeModal()
            },
        }
    )

    const validateField = ({ fieldName, fieldValue }) => {
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

    const handleChange = (event) => {
        const { name, value } = event.target
        setValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }))

        if (values.formSubmitted) {
            validateField({ fieldName: name, fieldValue: value })
        }
    }

    const validateForm = (errors) => {
        let isValid = true

        Object.entries(errors).forEach((item) => {
            if (item[1].length) {
                isValid = false
            } else {
                const errMsg = validationErrorMessage({
                    fieldName: item[0],
                    fieldValue: values[item[0]],
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
            title: '',
            description: '',
            errors: {
                title: '',
                description: '',
            },
            formSubmitted: false,
        })
    }

    const onSubmit = (evt) => {
        evt.preventDefault()
        if (!values.formSubmitted) {
            setValues((prevValues) => ({
                ...prevValues,
                formSubmitted: true,
            }))
        }

        if (validateForm(values.errors)) {
            const { title, description } = values

            const authorId = authCtx.user.id
            try {
                mutation.mutate({ title, description, authorId })
            } catch (error) {
                console.log(error)
                throw new Error(`Add issue failed: ${error}`)
            }
        }
    }
    return (
        <>
            <div>
                <div className="md:grid md:grid-cols-3 md:gap-6">
                    <div className="mt-5 md:mt-0 md:col-span-3">
                        <form noValidate onSubmit={onSubmit}>
                            <div className="shadow sm:rounded-md sm:overflow-hidden">
                                <div className="px-4 py-5 space-y-6 bg-white sm:p-6">
                                    <div className="grid grid-cols-3 gap-6"></div>

                                    <div>
                                        <label
                                            htmlFor="title"
                                            className="block text-sm font-medium text-gray-700 font-poppins"
                                        >
                                            Title
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                id="title"
                                                name="title"
                                                onChange={handleChange}
                                                value={values.title}
                                                onBlur={(evt) =>
                                                    validateField({
                                                        fieldName:
                                                            evt.target.name,
                                                        fieldValue:
                                                            evt.target.value,
                                                    })
                                                }
                                                className="block w-full px-5 py-3 text-base placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg text-neutral-600 bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                                                placeholder="Title of the issue"
                                            />
                                            {values.errors.title.length ? (
                                                <span
                                                    className="text-xs font-poppins text-red-600/80"
                                                    id="title-error"
                                                >
                                                    {values.errors.title}
                                                </span>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="description"
                                            className="block text-sm font-medium text-gray-700 font-poppins"
                                        >
                                            Description of the issue
                                        </label>
                                        <div className="mt-1">
                                            <textarea
                                                id="description"
                                                name="description"
                                                onChange={handleChange}
                                                value={values.description}
                                                onBlur={(evt) =>
                                                    validateField({
                                                        fieldName:
                                                            evt.target.name,
                                                        fieldValue:
                                                            evt.target.value,
                                                    })
                                                }
                                                rows={4}
                                                className="block w-full px-5 py-3 text-base placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg text-neutral-600 bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                                                placeholder="Description about your issue"
                                            />
                                            {values.errors.description
                                                .length ? (
                                                <span
                                                    className="text-xs font-poppins text-red-600/80"
                                                    id="description-error"
                                                >
                                                    {values.errors.description}
                                                </span>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                                <div className="px-4 py-3 text-center bg-gray-50 sm:px-6">
                                    <button
                                        type="submit"
                                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-lg shadow-sky-500/50 bg-sky-500 font-poppins hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                                    >
                                        Publish Issue
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
