import React from 'react'

import ReactDOM from 'react-dom'
import { RecoilRoot } from 'recoil'

import App from './App'
import AuthContextProvider from './context/auth'

import './styles/tailwind.css'

ReactDOM.render(
    <RecoilRoot>
        <AuthContextProvider>
            <App />
        </AuthContextProvider>
    </RecoilRoot>,
    document.getElementById('root')
)
