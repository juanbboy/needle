import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbarr from '../components/ui/Navbar'
import Needle from '../components/needle/Needle'
import Needlelist from '../components/needle/Needlelist'
import Needleres from '../components/needle/Needleres'
import Needleentr from '../components/needle/Needleentr'
import Needleresentr from '../components/needle/Needleresentr'
import Needlelistentr from '../components/needle/Needlelistentr'

const DashboardRouter = () => {
    return (
        <>
            <Navbarr />
            <div className="px-3">
                <Routes>
                    <Route path="/" element={<Needle />} />
                    <Route path="/needle" element={<Needle />} />
                    <Route path="/needlelist" element={<Needlelist />} />
                    <Route path="/needleres" element={<Needleres />} />
                    <Route path="/needleentr" element={<Needleentr />} />
                    <Route path="/needleresentr" element={<Needleresentr />} />
                    <Route path="/needlelistentr" element={<Needlelistentr />} />
                </Routes>
            </div>
        </>
    )
}

export default DashboardRouter
