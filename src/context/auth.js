/* eslint-disable react/prop-types */
import React from 'react'

import axiosInstance from '../lib/axiosInstance'

export const AuthContext = React.createContext()

function AuthContextProvider(props) {
    const [user, setUser] = React.useState(null)

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
