import React from 'react'

import { Link, useNavigate } from 'react-router-dom'

import Navbar2 from '../../components/Navbar/Navbar2'
import axiosInstance from '../../lib/axiosInstance'
import { validationErrorMessage } from '../../lib/formValidation'

function Signup() {
    const [values, setValues] = React.useState({
        username: '',
        email: '',
        password: '',
        passwordToggle: false,
        errors: {
            username: '',
            email: '',
            password: '',
        },
        formSubmitted: false,
    })

    const navigate = useNavigate()

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
            username: '',
            password: '',
            email: '',
            errors: {
                username: '',
                email: '',
                password: '',
            },
            formSubmitted: false,
        })
    }

    const onSubmit = async (evt) => {
        evt.preventDefault()
        if (!values.formSubmitted) {
            setValues((prevValues) => ({
                ...prevValues,
                formSubmitted: true,
            }))
        }

        if (validateForm(values.errors)) {
            const { username, password, email } = values
            try {
                const { status } = await axiosInstance.post(
                    '/api/signup',
                    {
                        username,
                        password,
                        email,
                    },
                    {
                        withCredentials: true,
                    }
                )
                if (status === 201) {
                    resetForm()
                    return navigate('/signin')
                }
            } catch (error) {
                console.log(error)
                throw new Error(`Add issue failed: ${error}`)
            }
        }
    }
    return (
        <>
            <Navbar2 />
            <section className="text-blueGray-700">
                <div className="container items-center ">
                    <div className="flex flex-col w-full max-w-md p-10 mx-auto my-4 transition duration-500 ease-in-out transform bg-white rounded-lg md:mt-0">
                        <div className="my-6">
                            <div>
                                <h1 className="text-lg font-bold leading-none tracking-tighter text-center text-blueGray-600 md:text-xl lg:text-2xl font-heading">
                                    Create an account to join the forum
                                </h1>
                                <p className="mt-4 text-sm font-medium leading-none text-center text-gray-500 font-poppins focus:outline-none">
                                    Have account ?{' '}
                                    <Link
                                        to="/signin"
                                        className="text-sm font-medium leading-none text-gray-800 cursor-pointer hover:text-gray-500 focus:text-gray-500 focus:outline-none focus:underline hover:underline"
                                    >
                                        {' '}
                                        Sign in here
                                    </Link>
                                </p>
                            </div>
                            <div className="mt-10">
                                <form
                                    onSubmit={onSubmit}
                                    noValidate
                                    className="space-y-6"
                                >
                                    <div>
                                        <label
                                            htmlFor="name"
                                            className="block text-sm font-medium font-poppins text-neutral-600"
                                        >
                                            {' '}
                                            Username*{' '}
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                id="username"
                                                name="username"
                                                type="text"
                                                value={values.username}
                                                onChange={handleChange}
                                                onBlur={(evt) =>
                                                    validateField({
                                                        fieldName:
                                                            evt.target.name,
                                                        fieldValue:
                                                            evt.target.value,
                                                    })
                                                }
                                                autoComplete="name"
                                                required
                                                placeholder="Your Username"
                                                className="block w-full px-5 py-3 text-base placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg text-neutral-600 bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                                            />
                                            {values.errors.username.length ? (
                                                <span className="text-sm text-red-600 font-poppins">
                                                    {values.errors.username}
                                                </span>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block text-sm font-medium font-poppins text-neutral-600"
                                        >
                                            {' '}
                                            Email address*{' '}
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                value={values.email}
                                                onChange={handleChange}
                                                onBlur={(evt) =>
                                                    validateField({
                                                        fieldName:
                                                            evt.target.name,
                                                        fieldValue:
                                                            evt.target.value,
                                                    })
                                                }
                                                autoComplete="email"
                                                required
                                                placeholder="Your Email"
                                                className="block w-full px-5 py-3 text-base placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg text-neutral-600 bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                                            />
                                            {values.errors.email.length ? (
                                                <span className="text-sm text-red-600 font-poppins">
                                                    {values.errors.email}
                                                </span>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <label
                                            htmlFor="password"
                                            className="block text-sm font-medium font-poppins text-neutral-600"
                                        >
                                            {' '}
                                            Password*{' '}
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                id="password"
                                                name="password"
                                                type="password"
                                                value={values.password}
                                                onChange={handleChange}
                                                onBlur={(evt) =>
                                                    validateField({
                                                        fieldName:
                                                            evt.target.name,
                                                        fieldValue:
                                                            evt.target.value,
                                                    })
                                                }
                                                autoComplete="current-password"
                                                required
                                                placeholder="Your Password"
                                                className="block w-full px-5 py-3 text-base placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg text-neutral-600 bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                                            />
                                            {values.errors.password.length ? (
                                                <span className="text-sm text-red-600 font-poppins">
                                                    {values.errors.password}
                                                </span>
                                            ) : null}
                                            {!values.errors.password.length ? (
                                                <span className="text-xs text-gray-300 font-poppins">
                                                    Must be at least 8
                                                    characters, with at least
                                                    two number, one uppercase
                                                    letter and one lowercase and
                                                    one special character
                                                </span>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div>
                                        <button
                                            type="submit"
                                            className="flex items-center justify-center w-full px-10 py-4 text-base font-medium text-center text-white transition duration-500 ease-in-out transform shadow-lg bg-sky-500 shadow-sky-500/50 rounded-xl hover:bg-sky-600 focus:outline-none font-poppins"
                                        >
                                            {' '}
                                            Sign up{' '}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Signup
