import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SectionDashboard from './SectionDashboard'
import ComdtMDLogin from './pages/ComdtMDLogin'
import GMWKSLogin from './pages/GMWKSLogin'
import DGMMTRLLogin from './pages/DGMMTRLLogin'
import DGMPurchaseLogin from './pages/DGMPurchaseLogin'
import DGMProdLogin from './pages/DGMProdLogin'
import GMProdLogin from './pages/GMProdLogin'
import MCOLogin from './pages/MCOLogin'
import ESSLogin from './pages/ESSLogin'
import LPSLogin from './pages/LPSLogin'
import MPOLogin from './pages/MPOLogin'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SectionDashboard />} />
        <Route path="/comdt-md" element={<ComdtMDLogin />} />
        <Route path="/gm-wks" element={<GMWKSLogin />} />
        <Route path="/dgm-mtrl" element={<DGMMTRLLogin />} />
        <Route path="/dgm-purchase" element={<DGMPurchaseLogin />} />
        <Route path="/dgm-prod" element={<DGMProdLogin />} />
        <Route path="/gm-prod" element={<GMProdLogin />} />
        <Route path="/mco" element={<MCOLogin />} />
        <Route path="/ess" element={<ESSLogin />} />
        <Route path="/lps" element={<LPSLogin />} />
        <Route path="/mpo" element={<MPOLogin />} />
      </Routes>
    </BrowserRouter>
  )
}
