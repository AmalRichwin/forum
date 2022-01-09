import React from 'react'

import ReactDOM from 'react-dom'

import App from './App'
import AuthContextProvider from './context/auth'

import './styles/tailwind.css'

ReactDOM.render(
    <AuthContextProvider>
        <App />
    </AuthContextProvider>,
    document.getElementById('root')
)
