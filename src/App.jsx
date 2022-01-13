import React from 'react'

import Loading from 'components/Loading'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Homepage from './containers/Homepage'
import IssuePage from './containers/IssuePage'
import NotFound from './containers/NotFound'
import Signin from './containers/Signin'
import Signup from './containers/Signup'
import { AuthContext } from './context/auth'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            suspense: true,
        },
    },
})

function App() {
    const authCtx = React.useContext(AuthContext)

    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    {!authCtx.user ? (
                        <>
                            <Route path="/signin" element={<Signin />} />
                            <Route path="/signup" element={<Signup />} />
                        </>
                    ) : null}
                    <Route
                        path="/issue/:id"
                        element={
                            <React.Suspense fallback={<Loading />}>
                                <IssuePage />
                            </React.Suspense>
                        }
                    />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </QueryClientProvider>
    )
}

export default App
