import * as React from 'react'

import Header from '../../components/Header'
import IssueList from '../../components/IssueList'
import Navbar from '../../components/Navbar'

export default function Homepage() {
    return (
        <>
            <Navbar />
            <Header />
            <IssueList />
        </>
    )
}
