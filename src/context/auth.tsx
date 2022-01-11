/* eslint-disable react/prop-types */
import React, { PropsWithChildren } from 'react'

import axiosInstance from '../lib/axiosInstance'

export const AuthContext = React.createContext<any | unknown>(null)

type AuthUser = {
    username: string
    email: string
    id: string
}

function AuthContextProvider(
    props: PropsWithChildren<{
        children: React.ReactNode
    }>
) {
    const [user, setUser] = React.useState<AuthUser | null>(null)

    React.useEffect(() => {
        axiosInstance
            .get('/api/user', {
                withCredentials: true,
            })
            .then((res) => setUser(res.data))
            .catch((err) => console.log(err))
    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
