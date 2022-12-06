import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from '../components/ui/Navbar'
import Needle from '../components/needle/Needle'
import Needlelist from '../components/needle/Needlelist'
import Needleres from '../components/needle/Needleres'

const DashboardRouter = () => {
    return (
        <>
            <Navbar />
            <div className="container mt-2">
                <Routes>
                    <Route path="/" element={<Needle />} />
                    <Route path="/needle" element={<Needle />} />
                    <Route path="/needlelist" element={<Needlelist />} />
                    <Route path="/needleres" element={<Needleres />} />
                </Routes>
            </div>
        </>
    )
}

export default DashboardRouter
