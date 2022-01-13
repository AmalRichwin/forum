import * as React from 'react'

import Footer from 'components/Footer'
import Loading from 'components/Loading'
import LoadingIcon from 'icons/LoadingIcon'

import Header from '../../components/Header'
import IssueList from '../../components/IssueList'
import Navbar from '../../components/Navbar'

export default function Homepage() {
    return (
        <>
            <Navbar />
            <Header />
            <React.Suspense fallback={<Loading />}>
                <IssueList />
            </React.Suspense>
            <Footer />
        </>
    )
}
