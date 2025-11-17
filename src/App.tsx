import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MasterDashboard from './MasterDashboard'
import ComdtMDDashboard from './ComdtMDDashboard'
import GMWKSMTRLDashboard from './GMWKSMTRLDashboard'
import DGMWKSMTRLDashboard from './DGMWKSMTRLDashboard'
import DGMPurchaseDashboard from './DGMPurchaseDashboard'
import SectionDashboard from './SectionDashboard'
import LoginPage from './pages/LoginPage'
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
import LPOLogin from './pages/LPOLogin'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MasterDashboard />} />
        <Route path="/login/:loginType" element={<LoginPage />} />
        <Route path="/comdt-md-dashboard" element={<ComdtMDDashboard />} />
        <Route path="/gm-wks-mtrl-dashboard" element={<GMWKSMTRLDashboard />} />
        <Route path="/dgm-wks-mtrl-dashboard" element={<DGMWKSMTRLDashboard />} />
        <Route path="/dgm-purchase-dashboard" element={<DGMPurchaseDashboard />} />
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
        <Route path="/lpo" element={<LPOLogin />} />
      </Routes>
    </BrowserRouter>
  )
}
