import * as React from 'react'

import Footer from 'components/Footer'
import Loading from 'components/Loading'
import { AuthContext } from 'context/auth'

import Header from '../../components/Header'
import IssueList from '../../components/IssueList'
import Navbar from '../../components/Navbar'

export default function Homepage() {
    const authCtx = React.useContext(AuthContext)
    return (
        <>
            <React.Suspense fallback={<Loading />}>
                <Navbar />
                {!authCtx.user ? <Header /> : null}
                <IssueList />
                <Footer />
            </React.Suspense>
        </>
    )
}
