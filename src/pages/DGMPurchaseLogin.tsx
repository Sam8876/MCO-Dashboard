import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginForm from '../LoginForm'

export default function DGMPurchaseLogin() {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [selectedCard, setSelectedCard] = useState<string | null>(null)
  const [vendorSearchTerm, setVendorSearchTerm] = useState<string>('')

  if (!isLoggedIn) {
  return (
    <LoginForm
      title="DGM (PURCHASE)"
        subtitle="Deputy General Manager Purchase Dashboard"
        onLoginSuccess={() => setIsLoggedIn(true)}
      />
    )
  }

  const cards = [
    { id: 'enquiry', title: 'Enquiry', description: 'View and manage enquiries', color: 'bg-blue-500' },
    { id: 'quotation', title: 'Quotation (Open and pending)', description: 'Open and pending quotations', color: 'bg-green-500' },
    { id: 'cst', title: 'CST', description: 'CST management', color: 'bg-purple-500' },
    { id: 'sanction', title: 'Sanction', description: 'Sanction details and tracking', color: 'bg-yellow-500' },
    { id: 'so-placed', title: 'SO placed', description: 'Supply Orders placed', color: 'bg-indigo-500' },
    { id: 'fund-state', title: 'Fund State', description: 'Current fund allocation and status', color: 'bg-orange-500' },
    { id: 'ifa-cases', title: 'IFA cases', description: 'Issue For Acknowledgement cases', color: 'bg-cyan-500' },
    { id: 'pds-lapse', title: 'PDS Lapse', description: 'Pending Delivery Status lapse', color: 'bg-red-500' },
    { id: 'vendor-rating-contact', title: 'Vendor Rating and Contact', description: 'Vendor performance ratings and contact information', color: 'bg-teal-500' },
    { id: 'lp-store-details', title: 'LP store details', description: 'Local Purchase store details', color: 'bg-pink-500' },
    { id: 'store-receipt', title: 'Store receipt', description: 'Store receipt management', color: 'bg-slate-500' },
    { id: 'store-balance', title: 'Store balance', description: 'Current store balance', color: 'bg-amber-500' },
    { id: 'items-register', title: 'Items register', description: 'Items register and inventory', color: 'bg-lime-500' },
    { id: 'bill-count', title: 'Bill count', description: 'Bill count and statistics', color: 'bg-emerald-500' },
    { id: 'challan-pending', title: 'Challan pending', description: 'Pending challan items', color: 'bg-violet-500' },
    { id: 'crv-pending', title: 'CRV pending', description: 'Pending CRV items', color: 'bg-rose-500' },
    { id: 'bill-pending', title: 'Bill pending', description: 'Pending bill items', color: 'bg-sky-500' },
    { id: 'misc', title: 'MISC', description: 'Miscellaneous items and information', color: 'bg-gray-500' }
  ]

  const handleAccess = (cardId: string) => {
    setSelectedCard(cardId)
  }

  const handleBack = () => {
    setSelectedCard(null)
  }

  if (selectedCard) {
    // Fund State Data (same as DGM WKS MTRL)
    const totalBudget = 50000000; // ₹5 Crore
    const usedFunds = 32500000; // ₹3.25 Crore
    const remainingFunds = totalBudget - usedFunds;
    const usedPercentage = (usedFunds / totalBudget) * 100;
    const remainingPercentage = (remainingFunds / totalBudget) * 100;

    // Section-wise fund usage
    const sectionFundData = [
      { section: 'VRD', amount: 8500000, color: 'bg-blue-500' },
      { section: 'ARD', amount: 6200000, color: 'bg-green-500' },
      { section: 'SRD', amount: 5800000, color: 'bg-purple-500' },
      { section: 'ETD', amount: 4900000, color: 'bg-orange-500' },
      { section: 'TAR', amount: 3600000, color: 'bg-pink-500' },
      { section: 'Others', amount: 3500000, color: 'bg-cyan-500' }
    ];

    const maxAmount = Math.max(...sectionFundData.map(s => s.amount));

    // Fund State Grant Data
    const fundStateGrantData = [
      {
        serNo: 1,
        grantName: 'ORD Grant (415/01)',
        almt202526: 17359000,
        soPlacedGem: 12,
        soPlacedNonGem: 278,
        expdrGem: 713555,
        expdrNonGem: 11060706,
        totalExpdr: 11774261,
        billsSubmitted: 5365263,
        amtBooked: 4493190,
        amtBal: 5584739,
        remarks: ''
      },
      {
        serNo: 2,
        grantName: 'MT Grant (417/07)',
        almt202526: 16252000,
        soPlacedGem: 8,
        soPlacedNonGem: 139,
        expdrGem: 8731713,
        expdrNonGem: 11916599,
        totalExpdr: 20648312,
        billsSubmitted: 7604025,
        amtBooked: 7320152,
        amtBal: -4396312,
        remarks: 'Addl Rs 60 lakhs reqmt already fwd to HQ BWG'
      },
      {
        serNo: 3,
        grantName: 'IR&D Grant (438/00)',
        almt202526: 3500000,
        soPlacedGem: null,
        soPlacedNonGem: 3,
        expdrGem: 0,
        expdrNonGem: 244130,
        totalExpdr: 244130,
        billsSubmitted: 199998,
        amtBooked: null,
        amtBal: 3255870,
        remarks: 'Letter fwd to HQ BWG for surrender of Rs 28.75 Lakhs'
      }
    ];

    // Calculate totals for graph
    const totalAlmt = fundStateGrantData.reduce((sum, g) => sum + g.almt202526, 0);
    const totalExpdr = fundStateGrantData.reduce((sum, g) => sum + g.totalExpdr, 0);
    const maxGrantAmount = Math.max(...fundStateGrantData.map(g => g.almt202526));

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
        {/* Top Navigation Bar */}
        <div className="bg-white border-b border-gray-200 shadow-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate('/')}
                  className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent hover:from-purple-700 hover:to-purple-900 transition-all"
                >
                  512 Army Base ERP
                </button>
                <div className="h-8 w-px bg-gray-300"></div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">DGM (PURCHASE)</div>
                  <div className="text-xs text-gray-600">Deputy General Manager Purchase</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="px-4 py-2 bg-green-50 text-green-700 rounded-lg text-sm font-semibold flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  Online
                </div>
                <button
                  onClick={() => setIsLoggedIn(false)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          {selectedCard === 'fund-state' ? (
            <div className="space-y-8">
              {/* Back Button */}
              <div className="mb-4">
                <button
                  onClick={handleBack}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Dashboards
                </button>
              </div>
              {/* Summary Cards */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Fund State Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
                    <div className="text-blue-700 text-sm mb-1 font-semibold">ORD Grant (415/01)</div>
                    <div className="text-3xl font-bold text-blue-600">₹{fundStateGrantData[0].almt202526.toLocaleString('en-IN')}</div>
                  </div>
                  <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
                    <div className="text-red-700 text-sm mb-1 font-semibold">MT Grant (417/07)</div>
                    <div className="text-3xl font-bold text-red-600">₹{fundStateGrantData[1].almt202526.toLocaleString('en-IN')}</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
                    <div className="text-green-700 text-sm mb-1 font-semibold">IR&D Grant (438/00)</div>
                    <div className="text-3xl font-bold text-green-600">₹{fundStateGrantData[2].almt202526.toLocaleString('en-IN')}</div>
                  </div>
                </div>
              </div>

              {/* Fund State Table */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Fund State Report 2025-26</h2>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-xs">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="border border-gray-400 px-2 py-2 font-semibold text-left">Ser No</th>
                        <th className="border border-gray-400 px-2 py-2 font-semibold text-left">Name of Grant (Code Head)</th>
                        <th className="border border-gray-400 px-2 py-2 font-semibold text-left">Almt 2025-26</th>
                        <th className="border border-gray-400 px-2 py-2 font-semibold text-center" colSpan={2}>No of SO Placed</th>
                        <th className="border border-gray-400 px-2 py-2 font-semibold text-center" colSpan={3}>Expdr</th>
                        <th className="border border-gray-400 px-2 py-2 font-semibold text-left">Bills Submitted to CDA</th>
                        <th className="border border-gray-400 px-2 py-2 font-semibold text-left">Amt Booked by CDA</th>
                        <th className="border border-gray-400 px-2 py-2 font-semibold text-left">Amt Bal</th>
                        <th className="border border-gray-400 px-2 py-2 font-semibold text-left">Remarks</th>
                      </tr>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-400 px-2 py-1"></th>
                        <th className="border border-gray-400 px-2 py-1"></th>
                        <th className="border border-gray-400 px-2 py-1"></th>
                        <th className="border border-gray-400 px-2 py-1 font-semibold text-center">GeM</th>
                        <th className="border border-gray-400 px-2 py-1 font-semibold text-center">Non GeM</th>
                        <th className="border border-gray-400 px-2 py-1 font-semibold text-center">Cost / Expdr</th>
                        <th className="border border-gray-400 px-2 py-1 font-semibold text-center">Total Expdr</th>
                        <th className="border border-gray-400 px-2 py-1"></th>
                        <th className="border border-gray-400 px-2 py-1"></th>
                        <th className="border border-gray-400 px-2 py-1"></th>
                        <th className="border border-gray-400 px-2 py-1"></th>
                        <th className="border border-gray-400 px-2 py-1"></th>
                      </tr>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-400 px-2 py-1"></th>
                        <th className="border border-gray-400 px-2 py-1"></th>
                        <th className="border border-gray-400 px-2 py-1"></th>
                        <th className="border border-gray-400 px-2 py-1"></th>
                        <th className="border border-gray-400 px-2 py-1"></th>
                        <th className="border border-gray-400 px-2 py-1 font-semibold text-center">GeM</th>
                        <th className="border border-gray-400 px-2 py-1 font-semibold text-center">Non GeM</th>
                        <th className="border border-gray-400 px-2 py-1"></th>
                        <th className="border border-gray-400 px-2 py-1"></th>
                        <th className="border border-gray-400 px-2 py-1"></th>
                        <th className="border border-gray-400 px-2 py-1"></th>
                        <th className="border border-gray-400 px-2 py-1"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {fundStateGrantData.map((grant, index) => {
                        const expdrPercentage = ((grant.totalExpdr / grant.almt202526) * 100).toFixed(2);
                        const billsPercentage = grant.billsSubmitted ? ((grant.billsSubmitted / grant.almt202526) * 100).toFixed(2) : '-';
                        const bookedPercentage = grant.amtBooked ? ((grant.amtBooked / grant.almt202526) * 100).toFixed(2) : '-';
                        const balPercentage = ((grant.amtBal / grant.almt202526) * 100).toFixed(2);
                        
                        return (
                          <React.Fragment key={grant.serNo}>
                            <tr className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors`}>
                              <td className="border border-gray-300 px-2 py-2 text-center font-semibold">{grant.serNo}</td>
                              <td className="border border-gray-300 px-2 py-2 font-semibold">{grant.grantName}</td>
                              <td className="border border-gray-300 px-2 py-2 text-right">{grant.almt202526.toLocaleString('en-IN')}</td>
                              <td className="border border-gray-300 px-2 py-2 text-center">{grant.soPlacedGem ?? '-'}</td>
                              <td className="border border-gray-300 px-2 py-2 text-center">{grant.soPlacedNonGem}</td>
                              <td className="border border-gray-300 px-2 py-2 text-right">{grant.expdrGem.toLocaleString('en-IN')}</td>
                              <td className="border border-gray-300 px-2 py-2 text-right">{grant.expdrNonGem.toLocaleString('en-IN')}</td>
                              <td className="border border-gray-300 px-2 py-2 text-right font-semibold">{grant.totalExpdr.toLocaleString('en-IN')}</td>
                              <td className="border border-gray-300 px-2 py-2 text-right">{grant.billsSubmitted.toLocaleString('en-IN')}</td>
                              <td className="border border-gray-300 px-2 py-2 text-right">{grant.amtBooked ? grant.amtBooked.toLocaleString('en-IN') : '-'}</td>
                              <td className={`border border-gray-300 px-2 py-2 text-right font-semibold ${grant.amtBal < 0 ? 'text-red-600' : ''}`}>
                                {grant.amtBal.toLocaleString('en-IN')}
                              </td>
                              <td className="border border-gray-300 px-2 py-2 text-sm">{grant.remarks}</td>
                            </tr>
                            <tr className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} text-xs`}>
                              <td className="border border-gray-300 px-2 py-1"></td>
                              <td className="border border-gray-300 px-2 py-1"></td>
                              <td className="border border-gray-300 px-2 py-1"></td>
                              <td className="border border-gray-300 px-2 py-1"></td>
                              <td className="border border-gray-300 px-2 py-1"></td>
                              <td className="border border-gray-300 px-2 py-1"></td>
                              <td className="border border-gray-300 px-2 py-1 text-right font-semibold">{expdrPercentage}%</td>
                              <td className="border border-gray-300 px-2 py-1 text-right">{billsPercentage}%</td>
                              <td className="border border-gray-300 px-2 py-1 text-right">{bookedPercentage}%</td>
                              <td className="border border-gray-300 px-2 py-1 text-right font-semibold">{balPercentage}%</td>
                              <td className="border border-gray-300 px-2 py-1"></td>
                            </tr>
                          </React.Fragment>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Bar Graph - Grant Allocation vs Expenditure vs Bills Submitted */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Grant Allocation vs Expenditure vs Bills Submitted</h3>
                <div className="flex items-end justify-around h-96 border-l-2 border-b-2 border-gray-400 pl-4 pb-4 mt-4">
                  {fundStateGrantData.map((grant) => {
                    const grantShortName = grant.grantName.split(' ')[0]; // ORD, MT, IR&D
                    const almtHeight = (grant.almt202526 / maxGrantAmount) * 320;
                    const expdrHeight = (Math.abs(grant.totalExpdr) / maxGrantAmount) * 320;
                    const billsHeight = grant.billsSubmitted ? (grant.billsSubmitted / maxGrantAmount) * 320 : 0;
                    
                    return (
                      <div key={grant.serNo} className="flex flex-col items-center gap-2">
                        <div className="flex items-end gap-1">
                          <div
                            className="w-14 bg-blue-500 flex items-start justify-center text-white font-bold text-xs pt-2 rounded-t-lg hover:opacity-80 transition-all"
                            style={{ height: `${almtHeight}px`, minHeight: '30px' }}
                            title={`Allocation: ₹${(grant.almt202526 / 1000000).toFixed(2)}M`}
                          >
                            ₹{(grant.almt202526 / 1000000).toFixed(1)}M
                          </div>
                          <div
                            className={`w-14 ${grant.totalExpdr > grant.almt202526 ? 'bg-red-500' : 'bg-green-500'} flex items-start justify-center text-white font-bold text-xs pt-2 rounded-t-lg hover:opacity-80 transition-all`}
                            style={{ height: `${expdrHeight}px`, minHeight: '30px' }}
                            title={`Expenditure: ₹${(grant.totalExpdr / 1000000).toFixed(2)}M`}
                          >
                            ₹{(grant.totalExpdr / 1000000).toFixed(1)}M
                          </div>
                          {grant.billsSubmitted && (
                            <div
                              className="w-14 bg-orange-500 flex items-start justify-center text-white font-bold text-xs pt-2 rounded-t-lg hover:opacity-80 transition-all"
                              style={{ height: `${billsHeight}px`, minHeight: '30px' }}
                              title={`Bills Submitted: ₹${(grant.billsSubmitted / 1000000).toFixed(2)}M`}
                            >
                              ₹{(grant.billsSubmitted / 1000000).toFixed(1)}M
                            </div>
                          )}
                        </div>
                        <span className="text-xs font-semibold text-gray-700 mt-2 text-center">{grantShortName}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-6 flex justify-center gap-8 flex-wrap">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-500 rounded"></div>
                    <div className="text-sm font-semibold">Allocation</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <div className="text-sm font-semibold">Expenditure (Within Budget)</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded"></div>
                    <div className="text-sm font-semibold">Expenditure (Over Budget)</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-orange-500 rounded"></div>
                    <div className="text-sm font-semibold">Bills Submitted to CDA</div>
                  </div>
                </div>
              </div>
            </div>
          ) : selectedCard === 'ifa-cases' ? (
            <div className="space-y-8">
              {/* Back Button */}
              <div className="mb-4">
                <button
                  onClick={handleBack}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Dashboards
                </button>
              </div>
              {/* IFA Cases Count */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">IFA Cases</h2>
                {(() => {
                  const ifaCasesData = [
                    { quarter: 'Q1 2024-25', count: 12 },
                    { quarter: 'Q2 2024-25', count: 18 },
                    { quarter: 'Q3 2024-25', count: 15 },
                    { quarter: 'Q4 2024-25', count: 22 }
                  ];

                  const totalIfaCases = ifaCasesData.reduce((sum, item) => sum + item.count, 0);
                  const maxIfaCount = Math.max(...ifaCasesData.map(d => d.count));

                  return (
                    <>
                      {/* Count Card */}
                      <div className="mb-8">
                        <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 border-2 border-cyan-200 rounded-lg p-6 shadow-sm max-w-md">
                          <div className="text-cyan-700 text-sm mb-1 font-semibold">Total IFA Cases</div>
                          <div className="text-4xl font-bold text-cyan-600">{totalIfaCases}</div>
                        </div>
                      </div>

                      {/* IFA Cases Table */}
                      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">IFA Cases - Detailed List</h3>
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse text-sm">
                            <thead>
                              <tr className="bg-gray-200">
                                <th className="border border-gray-400 px-3 py-2 font-semibold text-left">S.No</th>
                                <th className="border border-gray-400 px-3 py-2 font-semibold text-left">IFA Case No</th>
                                <th className="border border-gray-400 px-3 py-2 font-semibold text-left">LPR/WO No</th>
                                <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Section</th>
                                <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Component</th>
                                <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Issue Date</th>
                                <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Status</th>
                                <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Remarks</th>
                              </tr>
                            </thead>
                            <tbody>
                              {[
                                { sNo: 1, ifaCaseNo: 'IFA/2024/001', lprWoNo: 'LPR/2024/001', section: 'ARD', component: 'Hydraulic Pump', issueDate: '15/01/2024', status: 'Pending', remarks: 'Awaiting vendor response' },
                                { sNo: 2, ifaCaseNo: 'IFA/2024/002', lprWoNo: 'WO/2024/001', section: 'VRD', component: 'Engine Gasket', issueDate: '20/01/2024', status: 'In Progress', remarks: 'Under review' },
                                { sNo: 3, ifaCaseNo: 'IFA/2024/003', lprWoNo: 'LPR/2024/002', section: 'SRD', component: 'Brake Assembly', issueDate: '25/01/2024', status: 'Resolved', remarks: 'Issue resolved' },
                                { sNo: 4, ifaCaseNo: 'IFA/2024/004', lprWoNo: 'WO/2024/002', section: 'ETD', component: 'Transmission Gear', issueDate: '01/02/2024', status: 'Pending', remarks: '' },
                                { sNo: 5, ifaCaseNo: 'IFA/2024/005', lprWoNo: 'LPR/2024/003', section: 'ARMT', component: 'Clutch Plate', issueDate: '05/02/2024', status: 'In Progress', remarks: 'Investigation ongoing' },
                                { sNo: 6, ifaCaseNo: 'IFA/2024/006', lprWoNo: 'WO/2024/003', section: 'T&R', component: 'Suspension Spring', issueDate: '10/02/2024', status: 'Resolved', remarks: 'Closed' },
                                { sNo: 7, ifaCaseNo: 'IFA/2024/007', lprWoNo: 'LPR/2024/004', section: 'ENG', component: 'Cylinder Head', issueDate: '15/02/2024', status: 'Pending', remarks: '' },
                                { sNo: 8, ifaCaseNo: 'IFA/2024/008', lprWoNo: 'WO/2024/004', section: 'INST', component: 'Electrical Harness', issueDate: '20/02/2024', status: 'In Progress', remarks: 'Awaiting parts' },
                                { sNo: 9, ifaCaseNo: 'IFA/2024/009', lprWoNo: 'LPR/2024/005', section: 'VRD', component: 'Oil Filter', issueDate: '25/02/2024', status: 'Resolved', remarks: 'Issue fixed' },
                                { sNo: 10, ifaCaseNo: 'IFA/2024/010', lprWoNo: 'WO/2024/005', section: 'ARD', component: 'Water Pump', issueDate: '01/03/2024', status: 'Pending', remarks: 'Follow up required' }
                              ].map((row, index) => (
                                <tr key={row.sNo} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}>
                                  <td className="border border-gray-300 px-3 py-2 text-center">{row.sNo}</td>
                                  <td className="border border-gray-300 px-3 py-2 font-mono">{row.ifaCaseNo}</td>
                                  <td className="border border-gray-300 px-3 py-2 font-mono">{row.lprWoNo}</td>
                                  <td className="border border-gray-300 px-3 py-2 font-semibold">{row.section}</td>
                                  <td className="border border-gray-300 px-3 py-2">{row.component}</td>
                                  <td className="border border-gray-300 px-3 py-2 text-center">{row.issueDate}</td>
                                  <td className="border border-gray-300 px-3 py-2 text-center">
                                    <span
                                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                                        row.status === 'Resolved'
                                          ? 'bg-green-100 text-green-800'
                                          : row.status === 'In Progress'
                                          ? 'bg-blue-100 text-blue-800'
                                          : 'bg-yellow-100 text-yellow-800'
                                      }`}
                                    >
                                      {row.status}
                                    </span>
                                  </td>
                                  <td className="border border-gray-300 px-3 py-2 text-sm">{row.remarks || '-'}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Pie Chart - IFA Cases by Status */}
                      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">IFA Cases by Status</h3>
                        <div className="flex flex-col items-center">
                          {(() => {
                            const ifaTableData = [
                              { sNo: 1, ifaCaseNo: 'IFA/2024/001', lprWoNo: 'LPR/2024/001', section: 'ARD', component: 'Hydraulic Pump', issueDate: '15/01/2024', status: 'Pending', remarks: 'Awaiting vendor response' },
                              { sNo: 2, ifaCaseNo: 'IFA/2024/002', lprWoNo: 'WO/2024/001', section: 'VRD', component: 'Engine Gasket', issueDate: '20/01/2024', status: 'In Progress', remarks: 'Under review' },
                              { sNo: 3, ifaCaseNo: 'IFA/2024/003', lprWoNo: 'LPR/2024/002', section: 'SRD', component: 'Brake Assembly', issueDate: '25/01/2024', status: 'Resolved', remarks: 'Issue resolved' },
                              { sNo: 4, ifaCaseNo: 'IFA/2024/004', lprWoNo: 'WO/2024/002', section: 'ETD', component: 'Transmission Gear', issueDate: '01/02/2024', status: 'Pending', remarks: '' },
                              { sNo: 5, ifaCaseNo: 'IFA/2024/005', lprWoNo: 'LPR/2024/003', section: 'ARMT', component: 'Clutch Plate', issueDate: '05/02/2024', status: 'In Progress', remarks: 'Investigation ongoing' },
                              { sNo: 6, ifaCaseNo: 'IFA/2024/006', lprWoNo: 'WO/2024/003', section: 'T&R', component: 'Suspension Spring', issueDate: '10/02/2024', status: 'Resolved', remarks: 'Closed' },
                              { sNo: 7, ifaCaseNo: 'IFA/2024/007', lprWoNo: 'LPR/2024/004', section: 'ENG', component: 'Cylinder Head', issueDate: '15/02/2024', status: 'Pending', remarks: '' },
                              { sNo: 8, ifaCaseNo: 'IFA/2024/008', lprWoNo: 'WO/2024/004', section: 'INST', component: 'Electrical Harness', issueDate: '20/02/2024', status: 'In Progress', remarks: 'Awaiting parts' },
                              { sNo: 9, ifaCaseNo: 'IFA/2024/009', lprWoNo: 'LPR/2024/005', section: 'VRD', component: 'Oil Filter', issueDate: '25/02/2024', status: 'Resolved', remarks: 'Issue fixed' },
                              { sNo: 10, ifaCaseNo: 'IFA/2024/010', lprWoNo: 'WO/2024/005', section: 'ARD', component: 'Water Pump', issueDate: '01/03/2024', status: 'Pending', remarks: 'Follow up required' }
                            ];
                            
                            const statusCounts = ifaTableData.reduce((acc: any, item) => {
                              acc[item.status] = (acc[item.status] || 0) + 1;
                              return acc;
                            }, {});
                            
                            const statusData = [
                              { status: 'Pending', count: statusCounts['Pending'] || 0, color: '#eab308' },
                              { status: 'In Progress', count: statusCounts['In Progress'] || 0, color: '#3b82f6' },
                              { status: 'Resolved', count: statusCounts['Resolved'] || 0, color: '#22c55e' }
                            ];
                            
                            const totalStatusCount = statusData.reduce((sum, item) => sum + item.count, 0);
                            const percentages = statusData.map(item => totalStatusCount > 0 ? (item.count / totalStatusCount) * 100 : 0);
                            
                            return (
                              <>
                                <div className="relative w-80 h-80">
                                  <svg viewBox="0 0 200 200" className="w-full h-full">
                                    {(() => {
                                      let currentAngle = 0;
                                      return percentages.map((percentage, index) => {
                                        if (percentage === 0) return null;
                                        const angle = (percentage / 100) * 360;
                                        const startAngle = currentAngle;
                                        const endAngle = currentAngle + angle;
                                        const startRad = (startAngle - 90) * (Math.PI / 180);
                                        const endRad = (endAngle - 90) * (Math.PI / 180);
                                        const x1 = 100 + 90 * Math.cos(startRad);
                                        const y1 = 100 + 90 * Math.sin(startRad);
                                        const x2 = 100 + 90 * Math.cos(endRad);
                                        const y2 = 100 + 90 * Math.sin(endRad);
                                        const largeArcFlag = angle > 180 ? 1 : 0;
                                        const pathData = [
                                          `M 100 100`,
                                          `L ${x1} ${y1}`,
                                          `A 90 90 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                                          'Z'
                                        ].join(' ');
                                        currentAngle = endAngle;
                                        return (
                                          <path
                                            key={index}
                                            d={pathData}
                                            fill={statusData[index].color}
                                            stroke="white"
                                            strokeWidth="2"
                                          />
                                        );
                                      });
                                    })()}
                                    <circle cx="100" cy="100" r="50" fill="white" />
                                    <text x="100" y="95" textAnchor="middle" className="text-2xl font-bold fill-gray-900">
                                      {totalStatusCount}
                                    </text>
                                    <text x="100" y="110" textAnchor="middle" className="text-sm fill-gray-600">
                                      Total Cases
                                    </text>
                                  </svg>
                                </div>
                                <div className="mt-6 flex flex-wrap justify-center gap-6">
                                  {statusData.map((item, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                      <div className="w-4 h-4 rounded" style={{ backgroundColor: item.color }}></div>
                                      <div className="text-sm">
                                        <span className="font-semibold">{item.status}</span>
                                        <span className="text-gray-600 ml-1">({item.count})</span>
                                        <span className="text-gray-500 ml-1">
                                          ({totalStatusCount > 0 ? ((item.count / totalStatusCount) * 100).toFixed(1) : 0}%)
                                        </span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </>
                            );
                          })()}
                        </div>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
          ) : selectedCard === 'enquiry' ? (
            <div className="space-y-8">
              {/* Back Button */}
              <div className="mb-4">
                <button
                  onClick={handleBack}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Dashboards
                </button>
              </div>
              {/* Enquiry Content */}
              {(() => {
                // LPR at Enquiry stage summary
                const enquirySummary = {
                  total: 58,
                  critical: 15,
                  moderate: 25,
                  low: 18
                };

                // Time taken for LPR to cross enquiry state (in days)
                const lprTimeData = [
                  { range: '0-5 days', count: 12 },
                  { range: '6-10 days', count: 20 },
                  { range: '11-15 days', count: 15 },
                  { range: '16-20 days', count: 8 },
                  { range: '21+ days', count: 3 }
                ];

                // Enquiry cases per quarter
                const quarterlyEnquiryData = [
                  { quarter: 'Q1 2024-25', count: 10 },
                  { quarter: 'Q2 2024-25', count: 15 },
                  { quarter: 'Q3 2024-25', count: 18 },
                  { quarter: 'Q4 2024-25', count: 15 }
                ];

                const maxTimeCount = Math.max(...lprTimeData.map(d => d.count));
                const maxQuarterlyEnquiry = Math.max(...quarterlyEnquiryData.map(q => q.count));

                return (
                  <>
                    {/* Summary Card */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                      <h2 className="text-3xl font-bold text-gray-900 mb-6">Enquiry Summary</h2>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
                          <div className="text-blue-700 text-sm mb-1 font-semibold">Total LPR in Enquiry</div>
                          <div className="text-3xl font-bold text-blue-600">{enquirySummary.total}</div>
                        </div>
                        <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
                          <div className="text-red-700 text-sm mb-1 font-semibold">Critical</div>
                          <div className="text-3xl font-bold text-red-600">{enquirySummary.critical}</div>
                        </div>
                        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
                          <div className="text-yellow-700 text-sm mb-1 font-semibold">Moderate</div>
                          <div className="text-3xl font-bold text-yellow-600">{enquirySummary.moderate}</div>
                        </div>
                        <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
                          <div className="text-green-700 text-sm mb-1 font-semibold">Low</div>
                          <div className="text-3xl font-bold text-green-600">{enquirySummary.low}</div>
                        </div>
                      </div>
                    </div>

                    {/* Graph: Time taken for LPR to cross enquiry state */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">Time Taken for LPR to Cross Enquiry State</h3>
                      <div className="flex items-end justify-around h-96 border-l-2 border-b-2 border-gray-400 pl-4 pb-4">
                        {lprTimeData.map((data) => (
                          <div key={data.range} className="flex flex-col items-center gap-2 flex-1">
                            <div
                              className="w-full bg-gradient-to-t from-blue-600 to-blue-400 flex items-start justify-center text-white font-bold text-sm pt-2 rounded-t-lg hover:from-blue-700 hover:to-blue-500 transition-all"
                              style={{ height: `${(data.count / maxTimeCount) * 350}px`, minHeight: '30px' }}
                            >
                              {data.count}
                            </div>
                            <span className="text-xs font-semibold text-gray-700 mt-2 text-center whitespace-normal">
                              {data.range}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 text-center">
                        <p className="text-xs text-gray-500">Y-axis: Number of LPR | X-axis: Time Range (Days)</p>
                      </div>
                    </div>

                    {/* Graph: Enquiry cases per quarter */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">Enquiry Cases per Quarter</h3>
                      <div className="flex items-end justify-around h-96 border-l-2 border-b-2 border-gray-400 pl-4 pb-4">
                        {quarterlyEnquiryData.map((data) => (
                          <div key={data.quarter} className="flex flex-col items-center gap-2 flex-1">
                            <div
                              className="w-full bg-gradient-to-t from-green-600 to-green-400 flex items-start justify-center text-white font-bold text-sm pt-2 rounded-t-lg hover:from-green-700 hover:to-green-500 transition-all"
                              style={{ height: `${(data.count / maxQuarterlyEnquiry) * 350}px`, minHeight: '30px' }}
                            >
                              {data.count}
                            </div>
                            <span className="text-sm font-semibold text-gray-700 mt-2 text-center">{data.quarter}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 text-center">
                        <p className="text-xs text-gray-500">Y-axis: Number of Enquiry Cases | X-axis: Financial Year Quarters</p>
                      </div>
                    </div>

                    {/* Enquiry Table */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">Enquiry Details</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-xs">
                          <thead>
                            <tr className="bg-gray-200">
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">S.No</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">LPR No</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Section</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Component</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Enquiry Date</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Days in Enquiry</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Priority</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Status</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Remarks</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              { sNo: 1, lprNo: 'LPR-2024-001', section: 'VRD', component: 'Hydraulic Cylinder', enquiryDate: '05/01/2024', daysInEnquiry: 12, priority: 'Critical', status: 'Open', remarks: '' },
                              { sNo: 2, lprNo: 'LPR-2024-002', section: 'ARD', component: 'Gear Assembly', enquiryDate: '08/01/2024', daysInEnquiry: 9, priority: 'Moderate', status: 'Open', remarks: '' },
                              { sNo: 3, lprNo: 'LPR-2024-003', section: 'SRD', component: 'Brake Pad Set', enquiryDate: '10/01/2024', daysInEnquiry: 7, priority: 'Low', status: 'Open', remarks: '' },
                              { sNo: 4, lprNo: 'LPR-2024-004', section: 'ETD', component: 'Control Valve', enquiryDate: '12/01/2024', daysInEnquiry: 5, priority: 'Critical', status: 'Open', remarks: 'Urgent' },
                              { sNo: 5, lprNo: 'LPR-2024-005', section: 'VRD', component: 'Manifold Airline', enquiryDate: '15/01/2024', daysInEnquiry: 2, priority: 'Moderate', status: 'Open', remarks: '' },
                              { sNo: 6, lprNo: 'LPR-2024-006', section: 'ARD', component: 'Pedal Control', enquiryDate: '18/01/2024', daysInEnquiry: 0, priority: 'Low', status: 'Open', remarks: '' },
                              { sNo: 7, lprNo: 'LPR-2024-007', section: 'SRD', component: 'Water Radiator', enquiryDate: '20/01/2024', daysInEnquiry: 0, priority: 'Moderate', status: 'Open', remarks: '' },
                              { sNo: 8, lprNo: 'LPR-2024-008', section: 'ETD', component: 'Engine Gasket', enquiryDate: '22/01/2024', daysInEnquiry: 0, priority: 'Critical', status: 'Open', remarks: '' }
                            ].map((item, index) => (
                              <tr key={item.sNo} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}>
                                <td className="border border-gray-300 px-3 py-2 text-center">{item.sNo}</td>
                                <td className="border border-gray-300 px-3 py-2 font-mono">{item.lprNo}</td>
                                <td className="border border-gray-300 px-3 py-2 text-center">{item.section}</td>
                                <td className="border border-gray-300 px-3 py-2 text-xs">{item.component}</td>
                                <td className="border border-gray-300 px-3 py-2 text-center">{item.enquiryDate}</td>
                                <td className="border border-gray-300 px-3 py-2 text-center">{item.daysInEnquiry}</td>
                                <td className="border border-gray-300 px-3 py-2 text-center">
                                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                    item.priority === 'Critical' ? 'bg-red-100 text-red-800' :
                                    item.priority === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-green-100 text-green-800'
                                  }`}>
                                    {item.priority}
                                  </span>
                                </td>
                                <td className="border border-gray-300 px-3 py-2 text-center">
                                  <span className="px-2 py-1 rounded text-xs font-semibold bg-blue-100 text-blue-800">
                                    {item.status}
                                  </span>
                                </td>
                                <td className="border border-gray-300 px-3 py-2 text-xs">{item.remarks || '-'}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          ) : selectedCard === 'quotation' ? (
            <div className="space-y-8">
              {/* Back Button */}
              <div className="mb-4">
                <button
                  onClick={handleBack}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Dashboards
                </button>
              </div>
              {/* Quotation Content */}
              {(() => {
                // LPR at Quotation stage summary
                const quotationSummary = {
                  total: 42,
                  open: 28,
                  pending: 14
                };

                const openPercentage = (quotationSummary.open / quotationSummary.total) * 100;
                const pendingPercentage = (quotationSummary.pending / quotationSummary.total) * 100;

                // Quarterly Quotation Data
                const quarterlyQuotationData = [
                  { quarter: 'Q1 2024-25', total: 8, open: 5, pending: 3 },
                  { quarter: 'Q2 2024-25', total: 12, open: 8, pending: 4 },
                  { quarter: 'Q3 2024-25', total: 14, open: 10, pending: 4 },
                  { quarter: 'Q4 2024-25', total: 8, open: 5, pending: 3 }
                ];

                const maxQuarterlyTotal = Math.max(...quarterlyQuotationData.map(q => q.total));

                return (
                  <>
                    {/* Summary Cards */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                      <h2 className="text-3xl font-bold text-gray-900 mb-6">Quotation Summary</h2>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
                          <div className="text-green-700 text-sm mb-1 font-semibold">Total LPR in Quotation</div>
                          <div className="text-3xl font-bold text-green-600">{quotationSummary.total}</div>
                        </div>
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
                          <div className="text-blue-700 text-sm mb-1 font-semibold">Open</div>
                          <div className="text-3xl font-bold text-blue-600">{quotationSummary.open}</div>
                          <div className="text-sm text-blue-500 mt-1">{openPercentage.toFixed(1)}%</div>
                        </div>
                        <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
                          <div className="text-orange-700 text-sm mb-1 font-semibold">Pending</div>
                          <div className="text-3xl font-bold text-orange-600">{quotationSummary.pending}</div>
                          <div className="text-sm text-orange-500 mt-1">{pendingPercentage.toFixed(1)}%</div>
                        </div>
                      </div>
                    </div>

                    {/* Pie Chart - Open vs Pending */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">Open vs Pending Quotations</h3>
                      <div className="flex flex-col items-center">
                        <div className="relative w-80 h-80">
                          <svg viewBox="0 0 200 200" className="w-full h-full">
                            {(() => {
                              const colors = ['#3b82f6', '#f97316']; // Blue for open, Orange for pending
                              const percentages = [openPercentage, pendingPercentage];
                              let currentAngle = 0;
                              
                              return percentages.map((percentage, index) => {
                                const angle = (percentage / 100) * 360;
                                const startAngle = currentAngle;
                                const endAngle = currentAngle + angle;
                                const startRad = (startAngle - 90) * (Math.PI / 180);
                                const endRad = (endAngle - 90) * (Math.PI / 180);
                                const x1 = 100 + 90 * Math.cos(startRad);
                                const y1 = 100 + 90 * Math.sin(startRad);
                                const x2 = 100 + 90 * Math.cos(endRad);
                                const y2 = 100 + 90 * Math.sin(endRad);
                                const largeArcFlag = angle > 180 ? 1 : 0;
                                const pathData = [
                                  `M 100 100`,
                                  `L ${x1} ${y1}`,
                                  `A 90 90 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                                  'Z'
                                ].join(' ');
                                currentAngle = endAngle;
                                return (
                                  <path
                                    key={index}
                                    d={pathData}
                                    fill={colors[index]}
                                    stroke="white"
                                    strokeWidth="2"
                                  />
                                );
                              })
                            })()}
                            <circle cx="100" cy="100" r="50" fill="white" />
                          </svg>
                        </div>
                        <div className="mt-6 flex gap-8">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-blue-500 rounded"></div>
                            <div className="text-sm font-semibold">Open: {quotationSummary.open} ({openPercentage.toFixed(1)}%)</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-orange-500 rounded"></div>
                            <div className="text-sm font-semibold">Pending: {quotationSummary.pending} ({pendingPercentage.toFixed(1)}%)</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bar Graph - Quarterly Quotation Analysis */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">Quotation Cases per Quarter</h3>
                      <div className="flex items-end justify-around h-96 border-l-2 border-b-2 border-gray-400 pl-4 pb-4 gap-2">
                        {quarterlyQuotationData.map((data) => (
                          <div key={data.quarter} className="flex flex-col items-center gap-1 flex-1">
                            {/* Pending Stack */}
                            <div
                              className="w-full bg-gradient-to-t from-orange-600 to-orange-400 flex items-start justify-center text-white font-bold text-xs pt-1 rounded-t-lg hover:from-orange-700 hover:to-orange-500 transition-all"
                              style={{ height: `${(data.pending / maxQuarterlyTotal) * 300}px`, minHeight: '20px' }}
                              title={`Pending: ${data.pending}`}
                            >
                              {data.pending}
                            </div>
                            {/* Open Stack */}
                            <div
                              className="w-full bg-gradient-to-t from-blue-600 to-blue-400 flex items-start justify-center text-white font-bold text-xs pt-1 hover:from-blue-700 hover:to-blue-500 transition-all"
                              style={{ height: `${(data.open / maxQuarterlyTotal) * 300}px`, minHeight: '20px' }}
                              title={`Open: ${data.open}`}
                            >
                              {data.open}
                            </div>
                            <span className="text-xs font-semibold text-gray-700 mt-2 text-center whitespace-normal">
                              {data.quarter}
                            </span>
                            <span className="text-xs text-gray-500 mt-1">Total: {data.total}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 text-center">
                        <p className="text-xs text-gray-500 mb-2">Y-axis: Number of Quotations | X-axis: Financial Year Quarters</p>
                        <div className="flex justify-center gap-6 mt-2">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-blue-500 rounded"></div>
                            <span className="text-xs text-gray-600">Open</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-orange-500 rounded"></div>
                            <span className="text-xs text-gray-600">Pending</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Quotation Table */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">Quotation Details</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-xs">
                          <thead>
                            <tr className="bg-gray-200">
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">S.No</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">LPR No</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Section</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Component</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Quotation Date</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Vendor</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Quoted Amount (₹)</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Status</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Remarks</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              { sNo: 1, lprNo: 'LPR-2024-001', section: 'VRD', component: 'Hydraulic Cylinder', quotationDate: '10/01/2024', vendor: 'ABC Engineering Ltd', quotedAmount: 125000, status: 'Open', remarks: '' },
                              { sNo: 2, lprNo: 'LPR-2024-002', section: 'ARD', component: 'Gear Assembly', quotationDate: '12/01/2024', vendor: 'XYZ Industries', quotedAmount: 98000, status: 'Open', remarks: '' },
                              { sNo: 3, lprNo: 'LPR-2024-003', section: 'SRD', component: 'Brake Pad Set', quotationDate: '15/01/2024', vendor: 'Precision Parts Co', quotedAmount: 156000, status: 'Pending', remarks: '' },
                              { sNo: 4, lprNo: 'LPR-2024-004', section: 'ETD', component: 'Control Valve', quotationDate: '18/01/2024', vendor: 'Metro Supplies', quotedAmount: 89000, status: 'Open', remarks: '' },
                              { sNo: 5, lprNo: 'LPR-2024-005', section: 'VRD', component: 'Manifold Airline', quotationDate: '20/01/2024', vendor: 'TechnoMech Solutions', quotedAmount: 112000, status: 'Pending', remarks: '' },
                              { sNo: 6, lprNo: 'LPR-2024-006', section: 'ARD', component: 'Pedal Control', quotationDate: '22/01/2024', vendor: 'Elite Parts Inc', quotedAmount: 134000, status: 'Open', remarks: '' }
                            ].map((item, index) => (
                              <tr key={item.sNo} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}>
                                <td className="border border-gray-300 px-3 py-2 text-center">{item.sNo}</td>
                                <td className="border border-gray-300 px-3 py-2 font-mono">{item.lprNo}</td>
                                <td className="border border-gray-300 px-3 py-2 text-center">{item.section}</td>
                                <td className="border border-gray-300 px-3 py-2 text-xs">{item.component}</td>
                                <td className="border border-gray-300 px-3 py-2 text-center">{item.quotationDate}</td>
                                <td className="border border-gray-300 px-3 py-2 text-xs">{item.vendor}</td>
                                <td className="border border-gray-300 px-3 py-2 text-right">₹{item.quotedAmount.toLocaleString('en-IN')}</td>
                                <td className="border border-gray-300 px-3 py-2 text-center">
                                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                    item.status === 'Open' ? 'bg-blue-100 text-blue-800' :
                                    'bg-orange-100 text-orange-800'
                                  }`}>
                                    {item.status}
                                  </span>
                                </td>
                                <td className="border border-gray-300 px-3 py-2 text-xs">{item.remarks || '-'}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          ) : selectedCard === 'cst' ? (
            <div className="space-y-8">
              {/* Back Button */}
              <div className="mb-4">
                <button
                  onClick={handleBack}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Dashboards
                </button>
              </div>
              {/* CST Content */}
              {(() => {
                // LPR at CST stage summary
                const cstSummary = {
                  total: 35,
                  critical: 10,
                  moderate: 15,
                  low: 10
                };

                // Time taken for LPR to cross CST state (in days)
                const cstTimeData = [
                  { range: '0-3 days', count: 8 },
                  { range: '4-6 days', count: 12 },
                  { range: '7-10 days', count: 10 },
                  { range: '11-15 days', count: 4 },
                  { range: '16+ days', count: 1 }
                ];

                // CST cases per quarter
                const quarterlyCstData = [
                  { quarter: 'Q1 2024-25', count: 7 },
                  { quarter: 'Q2 2024-25', count: 10 },
                  { quarter: 'Q3 2024-25', count: 12 },
                  { quarter: 'Q4 2024-25', count: 6 }
                ];

                const maxCstTimeCount = Math.max(...cstTimeData.map(d => d.count));
                const maxQuarterlyCst = Math.max(...quarterlyCstData.map(q => q.count));

                return (
                  <>
                    {/* Summary Card */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                      <h2 className="text-3xl font-bold text-gray-900 mb-6">CST Summary</h2>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
                          <div className="text-purple-700 text-sm mb-1 font-semibold">Total LPR in CST</div>
                          <div className="text-3xl font-bold text-purple-600">{cstSummary.total}</div>
                        </div>
                        <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
                          <div className="text-red-700 text-sm mb-1 font-semibold">Critical</div>
                          <div className="text-3xl font-bold text-red-600">{cstSummary.critical}</div>
                        </div>
                        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
                          <div className="text-yellow-700 text-sm mb-1 font-semibold">Moderate</div>
                          <div className="text-3xl font-bold text-yellow-600">{cstSummary.moderate}</div>
                        </div>
                        <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
                          <div className="text-green-700 text-sm mb-1 font-semibold">Low</div>
                          <div className="text-3xl font-bold text-green-600">{cstSummary.low}</div>
                        </div>
                      </div>
                    </div>

                    {/* Graph: Time taken for LPR to cross CST state */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">Time Taken for LPR to Cross CST State</h3>
                      <div className="flex items-end justify-around h-96 border-l-2 border-b-2 border-gray-400 pl-4 pb-4">
                        {cstTimeData.map((data) => (
                          <div key={data.range} className="flex flex-col items-center gap-2 flex-1">
                            <div
                              className="w-full bg-gradient-to-t from-purple-600 to-purple-400 flex items-start justify-center text-white font-bold text-sm pt-2 rounded-t-lg hover:from-purple-700 hover:to-purple-500 transition-all"
                              style={{ height: `${(data.count / maxCstTimeCount) * 350}px`, minHeight: '30px' }}
                            >
                              {data.count}
                            </div>
                            <span className="text-xs font-semibold text-gray-700 mt-2 text-center whitespace-normal">
                              {data.range}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 text-center">
                        <p className="text-xs text-gray-500">Y-axis: Number of LPR | X-axis: Time Range (Days)</p>
                      </div>
                    </div>

                    {/* Graph: CST cases per quarter */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">CST Cases per Quarter</h3>
                      <div className="flex items-end justify-around h-96 border-l-2 border-b-2 border-gray-400 pl-4 pb-4">
                        {quarterlyCstData.map((data) => (
                          <div key={data.quarter} className="flex flex-col items-center gap-2 flex-1">
                            <div
                              className="w-full bg-gradient-to-t from-purple-600 to-purple-400 flex items-start justify-center text-white font-bold text-sm pt-2 rounded-t-lg hover:from-purple-700 hover:to-purple-500 transition-all"
                              style={{ height: `${(data.count / maxQuarterlyCst) * 350}px`, minHeight: '30px' }}
                            >
                              {data.count}
                            </div>
                            <span className="text-sm font-semibold text-gray-700 mt-2 text-center">{data.quarter}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 text-center">
                        <p className="text-xs text-gray-500">Y-axis: Number of CST Cases | X-axis: Financial Year Quarters</p>
                      </div>
                    </div>

                    {/* CST Table */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">CST Details</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-xs">
                          <thead>
                            <tr className="bg-gray-200">
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">S.No</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">LPR No</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Section</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Component</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">CST Date</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Days in CST</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Priority</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Status</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Remarks</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              { sNo: 1, lprNo: 'LPR-2024-001', section: 'VRD', component: 'Hydraulic Cylinder', cstDate: '15/01/2024', daysInCst: 8, priority: 'Critical', status: 'Active', remarks: '' },
                              { sNo: 2, lprNo: 'LPR-2024-002', section: 'ARD', component: 'Gear Assembly', cstDate: '18/01/2024', daysInCst: 5, priority: 'Moderate', status: 'Active', remarks: '' },
                              { sNo: 3, lprNo: 'LPR-2024-003', section: 'SRD', component: 'Brake Pad Set', cstDate: '20/01/2024', daysInCst: 3, priority: 'Low', status: 'Active', remarks: '' },
                              { sNo: 4, lprNo: 'LPR-2024-004', section: 'ETD', component: 'Control Valve', cstDate: '22/01/2024', daysInCst: 1, priority: 'Critical', status: 'Active', remarks: 'Urgent' },
                              { sNo: 5, lprNo: 'LPR-2024-005', section: 'VRD', component: 'Manifold Airline', cstDate: '25/01/2024', daysInCst: 0, priority: 'Moderate', status: 'Active', remarks: '' }
                            ].map((item, index) => (
                              <tr key={item.sNo} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}>
                                <td className="border border-gray-300 px-3 py-2 text-center">{item.sNo}</td>
                                <td className="border border-gray-300 px-3 py-2 font-mono">{item.lprNo}</td>
                                <td className="border border-gray-300 px-3 py-2 text-center">{item.section}</td>
                                <td className="border border-gray-300 px-3 py-2 text-xs">{item.component}</td>
                                <td className="border border-gray-300 px-3 py-2 text-center">{item.cstDate}</td>
                                <td className="border border-gray-300 px-3 py-2 text-center">{item.daysInCst}</td>
                                <td className="border border-gray-300 px-3 py-2 text-center">
                                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                    item.priority === 'Critical' ? 'bg-red-100 text-red-800' :
                                    item.priority === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-green-100 text-green-800'
                                  }`}>
                                    {item.priority}
                                  </span>
                                </td>
                                <td className="border border-gray-300 px-3 py-2 text-center">
                                  <span className="px-2 py-1 rounded text-xs font-semibold bg-purple-100 text-purple-800">
                                    {item.status}
                                  </span>
                                </td>
                                <td className="border border-gray-300 px-3 py-2 text-xs">{item.remarks || '-'}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          ) : selectedCard === 'sanction' ? (
            <div className="space-y-8">
              {/* Back Button */}
              <div className="mb-4">
                <button
                  onClick={handleBack}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Dashboards
                </button>
              </div>
              {/* Sanction Content */}
              {(() => {
                // LPR at Sanction stage summary
                const sanctionSummary = {
                  total: 28,
                  critical: 8,
                  moderate: 12,
                  low: 8
                };

                // Time taken for LPR to cross Sanction state (in days)
                const sanctionTimeData = [
                  { range: '0-5 days', count: 5 },
                  { range: '6-10 days', count: 10 },
                  { range: '11-15 days', count: 8 },
                  { range: '16-20 days', count: 4 },
                  { range: '21+ days', count: 1 }
                ];

                // Sanction cases per quarter
                const quarterlySanctionData = [
                  { quarter: 'Q1 2024-25', count: 5 },
                  { quarter: 'Q2 2024-25', count: 8 },
                  { quarter: 'Q3 2024-25', count: 10 },
                  { quarter: 'Q4 2024-25', count: 5 }
                ];

                const maxSanctionTimeCount = Math.max(...sanctionTimeData.map(d => d.count));
                const maxQuarterlySanction = Math.max(...quarterlySanctionData.map(q => q.count));

                return (
                  <>
                    {/* Summary Card */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                      <h2 className="text-3xl font-bold text-gray-900 mb-6">Sanction Summary</h2>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
                          <div className="text-yellow-700 text-sm mb-1 font-semibold">Total LPR in Sanction</div>
                          <div className="text-3xl font-bold text-yellow-600">{sanctionSummary.total}</div>
                        </div>
                        <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
                          <div className="text-red-700 text-sm mb-1 font-semibold">Critical</div>
                          <div className="text-3xl font-bold text-red-600">{sanctionSummary.critical}</div>
                        </div>
                        <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
                          <div className="text-orange-700 text-sm mb-1 font-semibold">Moderate</div>
                          <div className="text-3xl font-bold text-orange-600">{sanctionSummary.moderate}</div>
                        </div>
                        <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
                          <div className="text-green-700 text-sm mb-1 font-semibold">Low</div>
                          <div className="text-3xl font-bold text-green-600">{sanctionSummary.low}</div>
                        </div>
                      </div>
                    </div>

                    {/* Graph: Time taken for LPR to cross Sanction state */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">Time Taken for LPR to Cross Sanction State</h3>
                      <div className="flex items-end justify-around h-96 border-l-2 border-b-2 border-gray-400 pl-4 pb-4">
                        {sanctionTimeData.map((data) => (
                          <div key={data.range} className="flex flex-col items-center gap-2 flex-1">
                            <div
                              className="w-full bg-gradient-to-t from-yellow-600 to-yellow-400 flex items-start justify-center text-white font-bold text-sm pt-2 rounded-t-lg hover:from-yellow-700 hover:to-yellow-500 transition-all"
                              style={{ height: `${(data.count / maxSanctionTimeCount) * 350}px`, minHeight: '30px' }}
                            >
                              {data.count}
                            </div>
                            <span className="text-xs font-semibold text-gray-700 mt-2 text-center whitespace-normal">
                              {data.range}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 text-center">
                        <p className="text-xs text-gray-500">Y-axis: Number of LPR | X-axis: Time Range (Days)</p>
                      </div>
                    </div>

                    {/* Graph: Sanction cases per quarter */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">Sanction Cases per Quarter</h3>
                      <div className="flex items-end justify-around h-96 border-l-2 border-b-2 border-gray-400 pl-4 pb-4">
                        {quarterlySanctionData.map((data) => (
                          <div key={data.quarter} className="flex flex-col items-center gap-2 flex-1">
                            <div
                              className="w-full bg-gradient-to-t from-yellow-600 to-yellow-400 flex items-start justify-center text-white font-bold text-sm pt-2 rounded-t-lg hover:from-yellow-700 hover:to-yellow-500 transition-all"
                              style={{ height: `${(data.count / maxQuarterlySanction) * 350}px`, minHeight: '30px' }}
                            >
                              {data.count}
                            </div>
                            <span className="text-sm font-semibold text-gray-700 mt-2 text-center">{data.quarter}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 text-center">
                        <p className="text-xs text-gray-500">Y-axis: Number of Sanction Cases | X-axis: Financial Year Quarters</p>
                      </div>
                    </div>

                    {/* Sanction Table */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">Sanction Details</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-xs">
                          <thead>
                            <tr className="bg-gray-200">
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">S.No</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">LPR No</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Section</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Component</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Sanction Date</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Sanctioned Amount (₹)</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Days in Sanction</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Priority</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Status</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Remarks</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              { sNo: 1, lprNo: 'LPR-2024-001', section: 'VRD', component: 'Hydraulic Cylinder', sanctionDate: '20/01/2024', sanctionedAmount: 125000, daysInSanction: 5, priority: 'Critical', status: 'Active', remarks: '' },
                              { sNo: 2, lprNo: 'LPR-2024-002', section: 'ARD', component: 'Gear Assembly', sanctionDate: '22/01/2024', sanctionedAmount: 98000, daysInSanction: 3, priority: 'Moderate', status: 'Active', remarks: '' },
                              { sNo: 3, lprNo: 'LPR-2024-003', section: 'SRD', component: 'Brake Pad Set', sanctionDate: '25/01/2024', sanctionedAmount: 156000, daysInSanction: 0, priority: 'Low', status: 'Active', remarks: '' },
                              { sNo: 4, lprNo: 'LPR-2024-004', section: 'ETD', component: 'Control Valve', sanctionDate: '28/01/2024', sanctionedAmount: 89000, daysInSanction: 0, priority: 'Critical', status: 'Active', remarks: 'Urgent' }
                            ].map((item, index) => (
                              <tr key={item.sNo} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}>
                                <td className="border border-gray-300 px-3 py-2 text-center">{item.sNo}</td>
                                <td className="border border-gray-300 px-3 py-2 font-mono">{item.lprNo}</td>
                                <td className="border border-gray-300 px-3 py-2 text-center">{item.section}</td>
                                <td className="border border-gray-300 px-3 py-2 text-xs">{item.component}</td>
                                <td className="border border-gray-300 px-3 py-2 text-center">{item.sanctionDate}</td>
                                <td className="border border-gray-300 px-3 py-2 text-right">₹{item.sanctionedAmount.toLocaleString('en-IN')}</td>
                                <td className="border border-gray-300 px-3 py-2 text-center">{item.daysInSanction}</td>
                                <td className="border border-gray-300 px-3 py-2 text-center">
                                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                    item.priority === 'Critical' ? 'bg-red-100 text-red-800' :
                                    item.priority === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-green-100 text-green-800'
                                  }`}>
                                    {item.priority}
                                  </span>
                                </td>
                                <td className="border border-gray-300 px-3 py-2 text-center">
                                  <span className="px-2 py-1 rounded text-xs font-semibold bg-yellow-100 text-yellow-800">
                                    {item.status}
                                  </span>
                                </td>
                                <td className="border border-gray-300 px-3 py-2 text-xs">{item.remarks || '-'}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          ) : selectedCard === 'so-placed' ? (
            <div className="space-y-8">
              {/* Back Button */}
              <div className="mb-4">
                <button
                  onClick={handleBack}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Dashboards
                </button>
              </div>
              {/* SO Placed Content */}
              {(() => {
                // LPR at SO placed stage summary
                const soPlacedSummary = {
                  total: 65,
                  critical: 18,
                  moderate: 28,
                  low: 19
                };

                // Time taken for LPR to cross SO placed state (in days)
                const soPlacedTimeData = [
                  { range: '0-3 days', count: 15 },
                  { range: '4-7 days', count: 22 },
                  { range: '8-12 days', count: 18 },
                  { range: '13-18 days', count: 7 },
                  { range: '19+ days', count: 3 }
                ];

                // SO placed cases per quarter
                const quarterlySoPlacedData = [
                  { quarter: 'Q1 2024-25', count: 12 },
                  { quarter: 'Q2 2024-25', count: 18 },
                  { quarter: 'Q3 2024-25', count: 22 },
                  { quarter: 'Q4 2024-25', count: 13 }
                ];

                const maxSoPlacedTimeCount = Math.max(...soPlacedTimeData.map(d => d.count));
                const maxQuarterlySoPlaced = Math.max(...quarterlySoPlacedData.map(q => q.count));

                return (
                  <>
                    {/* Summary Card */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                      <h2 className="text-3xl font-bold text-gray-900 mb-6">SO Placed Summary</h2>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 border-2 border-indigo-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
                          <div className="text-indigo-700 text-sm mb-1 font-semibold">Total LPR in SO Placed</div>
                          <div className="text-3xl font-bold text-indigo-600">{soPlacedSummary.total}</div>
                        </div>
                        <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
                          <div className="text-red-700 text-sm mb-1 font-semibold">Critical</div>
                          <div className="text-3xl font-bold text-red-600">{soPlacedSummary.critical}</div>
                        </div>
                        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
                          <div className="text-yellow-700 text-sm mb-1 font-semibold">Moderate</div>
                          <div className="text-3xl font-bold text-yellow-600">{soPlacedSummary.moderate}</div>
                        </div>
                        <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
                          <div className="text-green-700 text-sm mb-1 font-semibold">Low</div>
                          <div className="text-3xl font-bold text-green-600">{soPlacedSummary.low}</div>
                        </div>
                      </div>
                    </div>

                    {/* Graph: Time taken for LPR to cross SO placed state */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">Time Taken for LPR to Cross SO Placed State</h3>
                      <div className="flex items-end justify-around h-96 border-l-2 border-b-2 border-gray-400 pl-4 pb-4">
                        {soPlacedTimeData.map((data) => (
                          <div key={data.range} className="flex flex-col items-center gap-2 flex-1">
                            <div
                              className="w-full bg-gradient-to-t from-indigo-600 to-indigo-400 flex items-start justify-center text-white font-bold text-sm pt-2 rounded-t-lg hover:from-indigo-700 hover:to-indigo-500 transition-all"
                              style={{ height: `${(data.count / maxSoPlacedTimeCount) * 350}px`, minHeight: '30px' }}
                            >
                              {data.count}
                            </div>
                            <span className="text-xs font-semibold text-gray-700 mt-2 text-center whitespace-normal">
                              {data.range}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 text-center">
                        <p className="text-xs text-gray-500">Y-axis: Number of LPR | X-axis: Time Range (Days)</p>
                      </div>
                    </div>

                    {/* Graph: SO placed cases per quarter */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">SO Placed Cases per Quarter</h3>
                      <div className="flex items-end justify-around h-96 border-l-2 border-b-2 border-gray-400 pl-4 pb-4">
                        {quarterlySoPlacedData.map((data) => (
                          <div key={data.quarter} className="flex flex-col items-center gap-2 flex-1">
                            <div
                              className="w-full bg-gradient-to-t from-indigo-600 to-indigo-400 flex items-start justify-center text-white font-bold text-sm pt-2 rounded-t-lg hover:from-indigo-700 hover:to-indigo-500 transition-all"
                              style={{ height: `${(data.count / maxQuarterlySoPlaced) * 350}px`, minHeight: '30px' }}
                            >
                              {data.count}
                            </div>
                            <span className="text-sm font-semibold text-gray-700 mt-2 text-center">{data.quarter}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 text-center">
                        <p className="text-xs text-gray-500">Y-axis: Number of SO Placed Cases | X-axis: Financial Year Quarters</p>
                      </div>
                    </div>

                    {/* SO Placed Table */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">SO Placed Details</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-xs">
                          <thead>
                            <tr className="bg-gray-200">
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">S.No</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">LPR No</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">SO No</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Section</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Component</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Vendor</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">SO Date</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">SO Amount (₹)</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Priority</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Status</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Remarks</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              { sNo: 1, lprNo: 'LPR-2024-001', soNo: 'SO-2024-001', section: 'VRD', component: 'Hydraulic Cylinder', vendor: 'ABC Engineering Ltd', soDate: '25/01/2024', soAmount: 125000, priority: 'Critical', status: 'Active', remarks: '' },
                              { sNo: 2, lprNo: 'LPR-2024-002', soNo: 'SO-2024-002', section: 'ARD', component: 'Gear Assembly', vendor: 'XYZ Industries', soDate: '28/01/2024', soAmount: 98000, priority: 'Moderate', status: 'Active', remarks: '' },
                              { sNo: 3, lprNo: 'LPR-2024-003', soNo: 'SO-2024-003', section: 'SRD', component: 'Brake Pad Set', vendor: 'Precision Parts Co', soDate: '30/01/2024', soAmount: 156000, priority: 'Low', status: 'Active', remarks: '' },
                              { sNo: 4, lprNo: 'LPR-2024-004', soNo: 'SO-2024-004', section: 'ETD', component: 'Control Valve', vendor: 'Metro Supplies', soDate: '02/02/2024', soAmount: 89000, priority: 'Critical', status: 'Active', remarks: 'Urgent' },
                              { sNo: 5, lprNo: 'LPR-2024-005', soNo: 'SO-2024-005', section: 'VRD', component: 'Manifold Airline', vendor: 'TechnoMech Solutions', soDate: '05/02/2024', soAmount: 112000, priority: 'Moderate', status: 'Active', remarks: '' }
                            ].map((item, index) => (
                              <tr key={item.sNo} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}>
                                <td className="border border-gray-300 px-3 py-2 text-center">{item.sNo}</td>
                                <td className="border border-gray-300 px-3 py-2 font-mono">{item.lprNo}</td>
                                <td className="border border-gray-300 px-3 py-2 font-mono font-semibold">{item.soNo}</td>
                                <td className="border border-gray-300 px-3 py-2 text-center">{item.section}</td>
                                <td className="border border-gray-300 px-3 py-2 text-xs">{item.component}</td>
                                <td className="border border-gray-300 px-3 py-2 text-xs">{item.vendor}</td>
                                <td className="border border-gray-300 px-3 py-2 text-center">{item.soDate}</td>
                                <td className="border border-gray-300 px-3 py-2 text-right">₹{item.soAmount.toLocaleString('en-IN')}</td>
                                <td className="border border-gray-300 px-3 py-2 text-center">
                                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                    item.priority === 'Critical' ? 'bg-red-100 text-red-800' :
                                    item.priority === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-green-100 text-green-800'
                                  }`}>
                                    {item.priority}
                                  </span>
                                </td>
                                <td className="border border-gray-300 px-3 py-2 text-center">
                                  <span className="px-2 py-1 rounded text-xs font-semibold bg-indigo-100 text-indigo-800">
                                    {item.status}
                                  </span>
                                </td>
                                <td className="border border-gray-300 px-3 py-2 text-xs">{item.remarks || '-'}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          ) : selectedCard === 'vendor-rating-contact' ? (
            <div className="space-y-8">
              {/* Back Button */}
              <div className="mb-4">
                <button
                  onClick={handleBack}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Dashboards
                </button>
              </div>
              {/* Vendor Rating and Contact Content */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Vendor Rating and Contact</h2>
                
                {/* Search Bar */}
                <div className="mb-6">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search vendors by name, category, email, or contact..."
                      value={vendorSearchTerm}
                      onChange={(e) => setVendorSearchTerm(e.target.value)}
                      className="w-full px-4 py-3 pl-12 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                    />
                    <svg
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>

                {(() => {
                  const vendorData = [
                    {
                      name: 'ABC Engineering Ltd',
                      address: '123 Industrial Estate, Phase 2, Mumbai - 400070',
                      type: 'Manufacturer',
                      category: 'Hydraulic Components',
                      email: 'contact@abcengg.com',
                      contactNo: '+91-9876543210',
                      rating: 4.5
                    },
                    {
                      name: 'XYZ Industries',
                      address: '456 Manufacturing Zone, Pune - 411045',
                      type: 'Supplier',
                      category: 'Engine Parts',
                      email: 'info@xyzindustries.in',
                      contactNo: '+91-9876543211',
                      rating: 4.2
                    },
                    {
                      name: 'Precision Parts Co',
                      address: '789 Technology Park, Bangalore - 560066',
                      type: 'Manufacturer',
                      category: 'Brake Systems',
                      email: 'sales@precisionparts.co.in',
                      contactNo: '+91-9876543212',
                      rating: 4.8
                    },
                    {
                      name: 'Metro Supplies',
                      address: '321 Commercial Area, Delhi - 110001',
                      type: 'Supplier',
                      category: 'General Spares',
                      email: 'orders@metrosupplies.com',
                      contactNo: '+91-9876543213',
                      rating: 4.0
                    },
                    {
                      name: 'TechnoMech Solutions',
                      address: '654 Engineering Hub, Chennai - 600096',
                      type: 'Manufacturer',
                      category: 'Electrical Components',
                      email: 'support@technomech.in',
                      contactNo: '+91-9876543214',
                      rating: 4.7
                    },
                    {
                      name: 'Elite Parts Inc',
                      address: '987 Industrial Complex, Hyderabad - 500032',
                      type: 'Supplier',
                      category: 'Suspension Parts',
                      email: 'contact@eliteparts.com',
                      contactNo: '+91-9876543215',
                      rating: 4.3
                    }
                  ];

                  // Filter vendors based on search term
                  const filteredVendors = vendorData.filter((vendor) => {
                    const searchLower = vendorSearchTerm.toLowerCase();
                    return (
                      vendor.name.toLowerCase().includes(searchLower) ||
                      vendor.category.toLowerCase().includes(searchLower) ||
                      vendor.email.toLowerCase().includes(searchLower) ||
                      vendor.contactNo.includes(searchLower) ||
                      vendor.address.toLowerCase().includes(searchLower) ||
                      vendor.type.toLowerCase().includes(searchLower)
                    );
                  });

                  return (
                    <>
                      {filteredVendors.length === 0 ? (
                        <div className="text-center py-12">
                          <p className="text-gray-500 text-lg">No vendors found matching your search.</p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {filteredVendors.map((vendor, index) => (
                            <div key={index} className="bg-white rounded-xl shadow-lg border-2 border-gray-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                              <div className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                  <h3 className="text-xl font-bold text-gray-900 mb-2">{vendor.name}</h3>
                                  <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                    vendor.rating >= 4.5 ? 'bg-green-100 text-green-800' :
                                    vendor.rating >= 4.0 ? 'bg-blue-100 text-blue-800' :
                                    'bg-yellow-100 text-yellow-800'
                                  }`}>
                                    ⭐ {vendor.rating}
                                  </div>
                                </div>
                                
                                <div className="space-y-3">
                                  <div>
                                    <div className="text-xs font-semibold text-gray-500 mb-1">Type</div>
                                    <div className="text-sm font-medium text-gray-800">
                                      <span className={`px-2 py-1 rounded text-xs ${
                                        vendor.type === 'Manufacturer' ? 'bg-purple-100 text-purple-800' : 'bg-orange-100 text-orange-800'
                                      }`}>
                                        {vendor.type}
                                      </span>
                                    </div>
                                  </div>

                                  <div>
                                    <div className="text-xs font-semibold text-gray-500 mb-1">Address</div>
                                    <div className="text-sm text-gray-700">{vendor.address}</div>
                                  </div>

                                  <div>
                                    <div className="text-xs font-semibold text-gray-500 mb-1">Category of Dealing</div>
                                    <div className="text-sm text-gray-800 font-medium">{vendor.category}</div>
                                  </div>

                                  <div>
                                    <div className="text-xs font-semibold text-gray-500 mb-1">Email ID</div>
                                    <div className="text-sm text-blue-600 font-mono">{vendor.email}</div>
                                  </div>

                                  <div>
                                    <div className="text-xs font-semibold text-gray-500 mb-1">Contact No</div>
                                    <div className="text-sm text-gray-800 font-mono">{vendor.contactNo}</div>
                                  </div>

                                  <div>
                                    <div className="text-xs font-semibold text-gray-500 mb-1">Rating</div>
                                    <div className="flex items-center gap-2">
                                      <span className="text-lg font-bold text-gray-900">{vendor.rating}</span>
                                      <div className="flex gap-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                          <span key={star} className={`text-sm ${star <= Math.round(vendor.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                                            ★
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      {filteredVendors.length > 0 && (
                        <div className="mt-4 text-sm text-gray-600">
                          Showing {filteredVendors.length} of {vendorData.length} vendors
                        </div>
                      )}

                      {/* Vendor Rating Distribution Graph */}
                      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mt-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Vendor Rating Distribution</h3>
                        <div className="flex items-end justify-around h-96 border-l-2 border-b-2 border-gray-400 pl-4 pb-4 gap-2">
                          {vendorData.map((vendor, index) => {
                            const maxRating = 5;
                            const height = (vendor.rating / maxRating) * 350;
                            const colors = ['bg-purple-500', 'bg-blue-500', 'bg-green-500', 'bg-orange-500', 'bg-pink-500', 'bg-cyan-500'];
                            return (
                              <div key={vendor.name} className="flex flex-col items-center gap-2 flex-1 min-w-0">
                                <div
                                  className={`w-full ${colors[index % colors.length]} flex items-start justify-center text-white font-bold text-xs pt-2 rounded-t-lg hover:opacity-80 transition-all`}
                                  style={{ height: `${height}px`, minHeight: '30px' }}
                                  title={`${vendor.name}: ${vendor.rating}`}
                                >
                                  {vendor.rating.toFixed(1)}
                                </div>
                                <span className="text-xs font-semibold text-gray-700 mt-2 text-center break-words whitespace-normal">
                                  {vendor.name.split(' ')[0]}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                        <div className="mt-6 text-center">
                          <p className="text-xs text-gray-500">Y-axis: Rating (out of 5) | X-axis: Vendors</p>
                        </div>
                      </div>

                      {/* Vendor Category Distribution Graph */}
                      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mt-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Vendors by Category</h3>
                        <div className="flex items-end justify-around h-96 border-l-2 border-b-2 border-gray-400 pl-4 pb-4 gap-2">
                          {(() => {
                            const categoryData = [
                              { category: 'Hydraulic Components', count: 1 },
                              { category: 'Engine Parts', count: 1 },
                              { category: 'Brake Systems', count: 1 },
                              { category: 'General Spares', count: 1 },
                              { category: 'Electrical Components', count: 1 },
                              { category: 'Suspension Parts', count: 1 }
                            ];
                            const maxCount = Math.max(...categoryData.map(c => c.count));
                            return categoryData.map((data, index) => {
                              const colors = ['bg-purple-500', 'bg-blue-500', 'bg-green-500', 'bg-orange-500', 'bg-pink-500', 'bg-cyan-500'];
                              const height = (data.count / maxCount) * 350;
                              return (
                                <div key={data.category} className="flex flex-col items-center gap-2 flex-1 min-w-0">
                                  <div
                                    className={`w-full ${colors[index % colors.length]} flex items-start justify-center text-white font-bold text-xs pt-2 rounded-t-lg hover:opacity-80 transition-all`}
                                    style={{ height: `${height}px`, minHeight: '30px' }}
                                    title={`${data.category}: ${data.count}`}
                                  >
                                    {data.count}
                                  </div>
                                  <span className="text-xs font-semibold text-gray-700 mt-2 text-center break-words whitespace-normal">
                                    {data.category.split(' ')[0]}
                                  </span>
                                </div>
                              );
                            });
                          })()}
                        </div>
                        <div className="mt-6 text-center">
                          <p className="text-xs text-gray-500">Y-axis: Number of Vendors | X-axis: Categories</p>
                        </div>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
          ) : selectedCard === 'pds-lapse' ? (
            <div className="space-y-8">
              {/* Back Button */}
              <div className="mb-4">
                <button
                  onClick={handleBack}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Dashboards
                </button>
              </div>
              {/* PDS Lapse LP Content (Same as DGM WKS MTRL) */}
              {(() => {
                // LPR in PDS lapsed stage summary
                const lprSummary = {
                  total: 45,
                  critical: 12,
                  moderate: 20,
                  low: 13
                };

                // Per vendor PDS lapse count
                const vendorPdsLapseData = [
                  { vendor: 'ABC Engineering Ltd', count: 8 },
                  { vendor: 'XYZ Industries', count: 6 },
                  { vendor: 'Precision Parts Co', count: 4 },
                  { vendor: 'Metro Supplies', count: 10 },
                  { vendor: 'TechnoMech Solutions', count: 5 },
                  { vendor: 'Elite Parts Inc', count: 7 },
                  { vendor: 'Global Components', count: 5 }
                ];

                // PDS lapse per quarter
                const quarterlyPdsLapseData = [
                  { quarter: 'Q1 2024-25', count: 8 },
                  { quarter: 'Q2 2024-25', count: 12 },
                  { quarter: 'Q3 2024-25', count: 15 },
                  { quarter: 'Q4 2024-25', count: 10 }
                ];

                const maxVendorLapse = Math.max(...vendorPdsLapseData.map(v => v.count));
                const maxQuarterlyLapse = Math.max(...quarterlyPdsLapseData.map(q => q.count));

                return (
                  <>
                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                        <div className="text-orange-600 text-sm mb-1 font-semibold">Total LPR in PDS Lapsed</div>
                        <div className="text-3xl font-bold text-gray-900">{lprSummary.total}</div>
                      </div>
                      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                        <div className="text-red-600 text-sm mb-1 font-semibold">Critical</div>
                        <div className="text-3xl font-bold text-gray-900">{lprSummary.critical}</div>
                      </div>
                      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                        <div className="text-yellow-600 text-sm mb-1 font-semibold">Moderate</div>
                        <div className="text-3xl font-bold text-gray-900">{lprSummary.moderate}</div>
                      </div>
                      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                        <div className="text-green-600 text-sm mb-1 font-semibold">Low</div>
                        <div className="text-3xl font-bold text-gray-900">{lprSummary.low}</div>
                      </div>
                    </div>

                    {/* PDS Lapse Table */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">PDS Lapse - Detailed List</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-sm">
                          <thead>
                            <tr className="bg-gray-200">
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">S.No</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">LPR No</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Vendor</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Component</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">SO No</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">SO Date</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Delivery Date</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Days Lapsed</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Priority</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Remarks</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              { sNo: 1, lprNo: 'LPR/2024/001', vendor: 'ABC Engineering Ltd', component: 'Hydraulic Pump', soNo: 'SO/2024/001', soDate: '01/04/2024', deliveryDate: '15/04/2024', daysLapsed: 45, priority: 'Critical', remarks: 'Urgent requirement' },
                              { sNo: 2, lprNo: 'LPR/2024/002', vendor: 'XYZ Industries', component: 'Gasket Set', soNo: 'SO/2024/002', soDate: '05/04/2024', deliveryDate: '20/04/2024', daysLapsed: 38, priority: 'Moderate', remarks: 'Follow up required' },
                              { sNo: 3, lprNo: 'LPR/2024/003', vendor: 'Precision Parts Co', component: 'Brake Assembly', soNo: 'SO/2024/003', soDate: '10/04/2024', deliveryDate: '25/04/2024', daysLapsed: 32, priority: 'Moderate', remarks: '' },
                              { sNo: 4, lprNo: 'LPR/2024/004', vendor: 'Metro Supplies', component: 'Oil Filter', soNo: 'SO/2024/004', soDate: '15/04/2024', deliveryDate: '30/04/2024', daysLapsed: 28, priority: 'Low', remarks: '' },
                              { sNo: 5, lprNo: 'LPR/2024/005', vendor: 'TechnoMech Solutions', component: 'Clutch Plate', soNo: 'SO/2024/005', soDate: '20/04/2024', deliveryDate: '05/05/2024', daysLapsed: 42, priority: 'Critical', remarks: 'Production impact' },
                              { sNo: 6, lprNo: 'LPR/2024/006', vendor: 'Elite Parts Inc', component: 'Radiator Core', soNo: 'SO/2024/006', soDate: '25/04/2024', deliveryDate: '10/05/2024', daysLapsed: 35, priority: 'Moderate', remarks: '' },
                              { sNo: 7, lprNo: 'LPR/2024/007', vendor: 'Global Components', component: 'Fuel Pump', soNo: 'SO/2024/007', soDate: '01/05/2024', deliveryDate: '15/05/2024', daysLapsed: 40, priority: 'Critical', remarks: 'Critical item' },
                              { sNo: 8, lprNo: 'LPR/2024/008', vendor: 'ABC Engineering Ltd', component: 'Alternator', soNo: 'SO/2024/008', soDate: '05/05/2024', deliveryDate: '20/05/2024', daysLapsed: 30, priority: 'Moderate', remarks: '' },
                              { sNo: 9, lprNo: 'LPR/2024/009', vendor: 'XYZ Industries', component: 'Steering Box', soNo: 'SO/2024/009', soDate: '10/05/2024', deliveryDate: '25/05/2024', daysLapsed: 25, priority: 'Low', remarks: '' },
                              { sNo: 10, lprNo: 'LPR/2024/010', vendor: 'Precision Parts Co', component: 'Water Pump', soNo: 'SO/2024/010', soDate: '15/05/2024', deliveryDate: '30/05/2024', daysLapsed: 22, priority: 'Low', remarks: '' }
                            ].map((row, index) => (
                              <tr key={row.sNo} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}>
                                <td className="border border-gray-300 px-3 py-2 text-center">{row.sNo}</td>
                                <td className="border border-gray-300 px-3 py-2 font-mono">{row.lprNo}</td>
                                <td className="border border-gray-300 px-3 py-2">{row.vendor}</td>
                                <td className="border border-gray-300 px-3 py-2">{row.component}</td>
                                <td className="border border-gray-300 px-3 py-2 font-mono">{row.soNo}</td>
                                <td className="border border-gray-300 px-3 py-2 text-center">{row.soDate}</td>
                                <td className="border border-gray-300 px-3 py-2 text-center">{row.deliveryDate}</td>
                                <td className="border border-gray-300 px-3 py-2 text-center font-semibold">{row.daysLapsed}</td>
                                <td className="border border-gray-300 px-3 py-2 text-center">
                                  <span
                                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                                      row.priority === 'Critical'
                                        ? 'bg-red-100 text-red-800'
                                        : row.priority === 'Moderate'
                                        ? 'bg-yellow-100 text-yellow-800'
                                        : 'bg-green-100 text-green-800'
                                    }`}
                                  >
                                    {row.priority}
                                  </span>
                                </td>
                                <td className="border border-gray-300 px-3 py-2 text-sm">{row.remarks || '-'}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Graph: PDS Lapse per Vendor */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">PDS Lapse Count per Vendor</h3>
                      <div className="flex items-end justify-around h-96 border-l-2 border-b-2 border-gray-400 pl-4 pb-4 gap-2">
                        {vendorPdsLapseData.map((data) => (
                          <div key={data.vendor} className="flex flex-col items-center gap-2 flex-1 min-w-0">
                            <div
                              className="w-full bg-gradient-to-t from-orange-600 to-orange-400 flex items-start justify-center text-white font-bold text-xs pt-2 rounded-t-lg hover:from-orange-700 hover:to-orange-500 transition-all"
                              style={{ height: `${(data.count / maxVendorLapse) * 350}px`, minHeight: '30px' }}
                              title={`${data.vendor}: ${data.count} lapses`}
                            >
                              {data.count}
                            </div>
                            <span className="text-xs font-semibold text-gray-700 mt-2 text-center break-words whitespace-normal">
                              {data.vendor.split(' ')[0]}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 text-center">
                        <p className="text-xs text-gray-500">Y-axis: Number of PDS Lapses | X-axis: Vendors</p>
                      </div>
                    </div>

                    {/* Graph: PDS Lapse per Quarter */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">PDS Lapse per Quarter</h3>
                      <div className="flex items-end justify-around h-96 border-l-2 border-b-2 border-gray-400 pl-4 pb-4">
                        {quarterlyPdsLapseData.map((data) => (
                          <div key={data.quarter} className="flex flex-col items-center gap-2 flex-1">
                            <div
                              className="w-full bg-gradient-to-t from-red-600 to-red-400 flex items-start justify-center text-white font-bold text-sm pt-2 rounded-t-lg hover:from-red-700 hover:to-red-500 transition-all"
                              style={{ height: `${(data.count / maxQuarterlyLapse) * 350}px`, minHeight: '30px' }}
                            >
                              {data.count}
                            </div>
                            <span className="text-sm font-semibold text-gray-700 mt-2 text-center">{data.quarter}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 text-center">
                        <p className="text-xs text-gray-500">Y-axis: Number of PDS Lapses | X-axis: Financial Year Quarters</p>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          ) : selectedCard === 'lp-store-details' ? (
            <div className="space-y-8">
              {/* Back Button */}
              <div className="mb-4">
                <button
                  onClick={handleBack}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Dashboards
                </button>
              </div>
              {/* LP Store Details Content */}
              {(() => {
                // LP Store Details Table Data
                const lpStoreData = [
                  { serialNo: 1, mNumber: 'M-10234632', nomenclature: 'Valve, Flow Control', inspectionStatus: 'Accepted', vendor: 'ABC Engineering Ltd', awaitingReturn: '', awaitingPickup: 'VRD Section' },
                  { serialNo: 2, mNumber: 'M-10281681', nomenclature: 'Manifold Airline', inspectionStatus: 'Rejected', vendor: 'XYZ Industries', awaitingReturn: 'XYZ Industries', awaitingPickup: '' },
                  { serialNo: 3, mNumber: 'M-10261112', nomenclature: 'Gear Spur', inspectionStatus: 'Pending', vendor: 'Precision Parts Co', awaitingReturn: '', awaitingPickup: '' },
                  { serialNo: 4, mNumber: 'M-10260808', nomenclature: 'Gear Assembly', inspectionStatus: 'Accepted', vendor: 'Metro Supplies', awaitingReturn: '', awaitingPickup: 'ARD Section' },
                  { serialNo: 5, mNumber: 'M-10275712', nomenclature: 'Pedal Control', inspectionStatus: 'Rejected', vendor: 'TechnoMech Solutions', awaitingReturn: 'TechnoMech Solutions', awaitingPickup: '' },
                  { serialNo: 6, mNumber: 'M-10254567', nomenclature: 'Brake Pad Set', inspectionStatus: 'Accepted', vendor: 'Elite Parts Inc', awaitingReturn: '', awaitingPickup: 'SRD Section' },
                  { serialNo: 7, mNumber: 'M-10267890', nomenclature: 'Hydraulic Cylinder', inspectionStatus: 'Pending', vendor: 'Global Components', awaitingReturn: '', awaitingPickup: '' },
                  { serialNo: 8, mNumber: 'M-10278901', nomenclature: 'Control Valve', inspectionStatus: 'Rejected', vendor: 'ABC Engineering Ltd', awaitingReturn: 'ABC Engineering Ltd', awaitingPickup: '' }
                ];

                // Vendor acceptance rate data
                const vendorAcceptanceData = [
                  { vendor: 'ABC Engineering Ltd', accepted: 45, rejected: 8, pending: 5, acceptanceRate: 77.6 },
                  { vendor: 'XYZ Industries', accepted: 38, rejected: 12, pending: 6, acceptanceRate: 67.9 },
                  { vendor: 'Precision Parts Co', accepted: 52, rejected: 6, pending: 4, acceptanceRate: 83.9 },
                  { vendor: 'Metro Supplies', accepted: 42, rejected: 15, pending: 8, acceptanceRate: 64.6 },
                  { vendor: 'TechnoMech Solutions', accepted: 48, rejected: 10, pending: 5, acceptanceRate: 76.2 },
                  { vendor: 'Elite Parts Inc', accepted: 50, rejected: 8, pending: 3, acceptanceRate: 82.0 },
                  { vendor: 'Global Components', accepted: 35, rejected: 12, pending: 7, acceptanceRate: 64.8 }
                ];

                // Vendor timely delivery data
                const vendorTimelyDeliveryData = [
                  { vendor: 'ABC Engineering Ltd', onTime: 42, delayed: 16, onTimeRate: 72.4 },
                  { vendor: 'XYZ Industries', onTime: 35, delayed: 21, onTimeRate: 62.5 },
                  { vendor: 'Precision Parts Co', onTime: 55, delayed: 7, onTimeRate: 88.7 },
                  { vendor: 'Metro Supplies', onTime: 38, delayed: 27, onTimeRate: 58.5 },
                  { vendor: 'TechnoMech Solutions', onTime: 50, delayed: 13, onTimeRate: 79.4 },
                  { vendor: 'Elite Parts Inc', onTime: 52, delayed: 9, onTimeRate: 85.2 },
                  { vendor: 'Global Components', onTime: 32, delayed: 22, onTimeRate: 59.3 }
                ];

                // Inspection time by type
                const inspectionTimeData = [
                  { type: 'Visual Inspection', avgDays: 2.5, minDays: 1, maxDays: 4 },
                  { type: 'Dimensional Check', avgDays: 4.2, minDays: 2, maxDays: 7 },
                  { type: 'Functional Test', avgDays: 6.8, minDays: 3, maxDays: 12 },
                  { type: 'Quality Check', avgDays: 5.5, minDays: 2, maxDays: 10 },
                  { type: 'Material Testing', avgDays: 8.3, minDays: 5, maxDays: 15 }
                ];

                const maxAcceptanceRate = Math.max(...vendorAcceptanceData.map(v => v.acceptanceRate));
                const maxOnTimeRate = Math.max(...vendorTimelyDeliveryData.map(v => v.onTimeRate));
                const maxAvgDays = Math.max(...inspectionTimeData.map(i => i.avgDays));

                return (
                  <>
                    {/* LP Store Details Table */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                      <h2 className="text-3xl font-bold text-gray-900 mb-6">LP Store Details</h2>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-xs">
                          <thead>
                            <tr className="bg-gray-200">
                              <th className="border border-gray-400 px-2 py-2 font-semibold text-left">Serial No</th>
                              <th className="border border-gray-400 px-2 py-2 font-semibold text-left">M Number</th>
                              <th className="border border-gray-400 px-2 py-2 font-semibold text-left">Nomenclature</th>
                              <th className="border border-gray-400 px-2 py-2 font-semibold text-left">Inspection Status</th>
                              <th className="border border-gray-400 px-2 py-2 font-semibold text-left">Vendor</th>
                              <th className="border border-gray-400 px-2 py-2 font-semibold text-left">Awaiting for Return</th>
                              <th className="border border-gray-400 px-2 py-2 font-semibold text-left">Awaiting for Pick Up</th>
                            </tr>
                          </thead>
                          <tbody>
                            {lpStoreData.map((item, index) => (
                              <tr key={item.serialNo} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}>
                                <td className="border border-gray-300 px-2 py-2 text-center">{item.serialNo}</td>
                                <td className="border border-gray-300 px-2 py-2 text-center font-mono">{item.mNumber}</td>
                                <td className="border border-gray-300 px-2 py-2 text-xs">{item.nomenclature}</td>
                                <td className="border border-gray-300 px-2 py-2 text-center">
                                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                    item.inspectionStatus === 'Accepted' ? 'bg-green-100 text-green-800' :
                                    item.inspectionStatus === 'Rejected' ? 'bg-red-100 text-red-800' :
                                    'bg-yellow-100 text-yellow-800'
                                  }`}>
                                    {item.inspectionStatus}
                                  </span>
                                </td>
                                <td className="border border-gray-300 px-2 py-2 text-xs">{item.vendor}</td>
                                <td className="border border-gray-300 px-2 py-2 text-xs text-center">
                                  {item.awaitingReturn || '-'}
                                </td>
                                <td className="border border-gray-300 px-2 py-2 text-xs text-center">
                                  {item.awaitingPickup || '-'}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Graph: Vendor Acceptance Rate */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">Vendor Acceptance Rate (%)</h3>
                      <div className="flex items-end justify-around h-96 border-l-2 border-b-2 border-gray-400 pl-4 pb-4 gap-2">
                        {vendorAcceptanceData.map((data) => (
                          <div key={data.vendor} className="flex flex-col items-center gap-2 flex-1 min-w-0">
                            <div
                              className="w-full bg-gradient-to-t from-green-600 to-green-400 flex items-start justify-center text-white font-bold text-xs pt-2 rounded-t-lg hover:from-green-700 hover:to-green-500 transition-all"
                              style={{ height: `${(data.acceptanceRate / maxAcceptanceRate) * 350}px`, minHeight: '30px' }}
                              title={`${data.vendor}: ${data.acceptanceRate.toFixed(1)}%`}
                            >
                              {data.acceptanceRate.toFixed(0)}%
                            </div>
                            <span className="text-xs font-semibold text-gray-700 mt-2 text-center break-words whitespace-normal">
                              {data.vendor.split(' ')[0]}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 text-center">
                        <p className="text-xs text-gray-500">Y-axis: Acceptance Rate (%) | X-axis: Vendors</p>
                      </div>
                    </div>

                    {/* Graph: Vendor Timely Deliveries */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">Vendor Timely Delivery Rate (%)</h3>
                      <div className="flex items-end justify-around h-96 border-l-2 border-b-2 border-gray-400 pl-4 pb-4 gap-2">
                        {vendorTimelyDeliveryData.map((data) => (
                          <div key={data.vendor} className="flex flex-col items-center gap-2 flex-1 min-w-0">
                            <div
                              className="w-full bg-gradient-to-t from-blue-600 to-blue-400 flex items-start justify-center text-white font-bold text-xs pt-2 rounded-t-lg hover:from-blue-700 hover:to-blue-500 transition-all"
                              style={{ height: `${(data.onTimeRate / maxOnTimeRate) * 350}px`, minHeight: '30px' }}
                              title={`${data.vendor}: ${data.onTimeRate.toFixed(1)}%`}
                            >
                              {data.onTimeRate.toFixed(0)}%
                            </div>
                            <span className="text-xs font-semibold text-gray-700 mt-2 text-center break-words whitespace-normal">
                              {data.vendor.split(' ')[0]}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 text-center">
                        <p className="text-xs text-gray-500">Y-axis: On-Time Delivery Rate (%) | X-axis: Vendors</p>
                      </div>
                    </div>

                    {/* Graph: Time Taken for Inspection by Type */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">Average Time Taken for Inspection by Type (Days)</h3>
                      <div className="flex items-end justify-around h-96 border-l-2 border-b-2 border-gray-400 pl-4 pb-4 gap-2">
                        {inspectionTimeData.map((data) => (
                          <div key={data.type} className="flex flex-col items-center gap-2 flex-1 min-w-0">
                            <div
                              className="w-full bg-gradient-to-t from-purple-600 to-purple-400 flex items-start justify-center text-white font-bold text-xs pt-2 rounded-t-lg hover:from-purple-700 hover:to-purple-500 transition-all"
                              style={{ height: `${(data.avgDays / maxAvgDays) * 350}px`, minHeight: '30px' }}
                              title={`${data.type}: ${data.avgDays} days (Min: ${data.minDays}, Max: ${data.maxDays})`}
                            >
                              {data.avgDays.toFixed(1)}
                            </div>
                            <span className="text-xs font-semibold text-gray-700 mt-2 text-center break-words whitespace-normal">
                              {data.type.split(' ')[0]}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 text-center">
                        <p className="text-xs text-gray-500">Y-axis: Average Time (Days) | X-axis: Inspection Type</p>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          ) : selectedCard === 'store-receipt' ? (
            <div className="space-y-8">
              {/* Back Button */}
              <div className="mb-4">
                <button
                  onClick={handleBack}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Dashboards
                </button>
              </div>
              {/* Store Receipt Content */}
              {(() => {
                // Store Receipt Summary
                const receiptSummary = {
                  total: 125,
                  generated: 98,
                  toBeGenerated: 27
                };

                const generatedPercentage = (receiptSummary.generated / receiptSummary.total) * 100;
                const toBeGeneratedPercentage = (receiptSummary.toBeGenerated / receiptSummary.total) * 100;

                // Receipt count per quarter
                const quarterlyReceiptData = [
                  { quarter: 'Q1 2024-25', count: 25 },
                  { quarter: 'Q2 2024-25', count: 32 },
                  { quarter: 'Q3 2024-25', count: 38 },
                  { quarter: 'Q4 2024-25', count: 30 }
                ];

                const maxQuarterlyReceipt = Math.max(...quarterlyReceiptData.map(q => q.count));

                return (
                  <>
                    {/* Summary Cards */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                      <h2 className="text-3xl font-bold text-gray-900 mb-6">Store Receipt Summary</h2>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-gradient-to-br from-slate-50 to-slate-100 border-2 border-slate-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
                          <div className="text-slate-700 text-sm mb-1 font-semibold">Total Receipts</div>
                          <div className="text-3xl font-bold text-slate-600">{receiptSummary.total}</div>
                        </div>
                        <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
                          <div className="text-green-700 text-sm mb-1 font-semibold">Generated</div>
                          <div className="text-3xl font-bold text-green-600">{receiptSummary.generated}</div>
                          <div className="text-sm text-green-500 mt-1">{generatedPercentage.toFixed(1)}%</div>
                        </div>
                        <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
                          <div className="text-orange-700 text-sm mb-1 font-semibold">To Be Generated</div>
                          <div className="text-3xl font-bold text-orange-600">{receiptSummary.toBeGenerated}</div>
                          <div className="text-sm text-orange-500 mt-1">{toBeGeneratedPercentage.toFixed(1)}%</div>
                        </div>
                      </div>
                    </div>

                    {/* Pie Chart - Generated vs To Be Generated */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">Generated vs To Be Generated Receipts</h3>
                      <div className="flex flex-col items-center">
                        <div className="relative w-80 h-80">
                          <svg viewBox="0 0 200 200" className="w-full h-full">
                            {(() => {
                              const colors = ['#22c55e', '#f97316']; // Green for generated, Orange for to be generated
                              const percentages = [generatedPercentage, toBeGeneratedPercentage];
                              let currentAngle = 0;
                              
                              return percentages.map((percentage, index) => {
                                const angle = (percentage / 100) * 360;
                                const startAngle = currentAngle;
                                const endAngle = currentAngle + angle;
                                const startRad = (startAngle - 90) * (Math.PI / 180);
                                const endRad = (endAngle - 90) * (Math.PI / 180);
                                const x1 = 100 + 90 * Math.cos(startRad);
                                const y1 = 100 + 90 * Math.sin(startRad);
                                const x2 = 100 + 90 * Math.cos(endRad);
                                const y2 = 100 + 90 * Math.sin(endRad);
                                const largeArcFlag = angle > 180 ? 1 : 0;
                                const pathData = [
                                  `M 100 100`,
                                  `L ${x1} ${y1}`,
                                  `A 90 90 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                                  'Z'
                                ].join(' ');
                                currentAngle = endAngle;
                                return (
                                  <path
                                    key={index}
                                    d={pathData}
                                    fill={colors[index]}
                                    stroke="white"
                                    strokeWidth="2"
                                  />
                                );
                              })
                            })()}
                            <circle cx="100" cy="100" r="50" fill="white" />
                          </svg>
                        </div>
                        <div className="mt-6 flex gap-8">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-green-500 rounded"></div>
                            <div className="text-sm font-semibold">Generated: {receiptSummary.generated} ({generatedPercentage.toFixed(1)}%)</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-orange-500 rounded"></div>
                            <div className="text-sm font-semibold">To Be Generated: {receiptSummary.toBeGenerated} ({toBeGeneratedPercentage.toFixed(1)}%)</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Graph: Receipt count per quarter */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">Receipt Count per Quarter</h3>
                      <div className="flex items-end justify-around h-96 border-l-2 border-b-2 border-gray-400 pl-4 pb-4">
                        {quarterlyReceiptData.map((data) => (
                          <div key={data.quarter} className="flex flex-col items-center gap-2 flex-1">
                            <div
                              className="w-full bg-gradient-to-t from-slate-600 to-slate-400 flex items-start justify-center text-white font-bold text-sm pt-2 rounded-t-lg hover:from-slate-700 hover:to-slate-500 transition-all"
                              style={{ height: `${(data.count / maxQuarterlyReceipt) * 350}px`, minHeight: '30px' }}
                            >
                              {data.count}
                            </div>
                            <span className="text-sm font-semibold text-gray-700 mt-2 text-center">{data.quarter}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 text-center">
                        <p className="text-xs text-gray-500">Y-axis: Number of Receipts | X-axis: Financial Year Quarters</p>
                      </div>
                    </div>

                    {/* Store Receipt Table */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">Store Receipt Details</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-xs">
                          <thead>
                            <tr className="bg-gray-200">
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">S.No</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Receipt No</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Date</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Challan No</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Vendor</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Component</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Quantity</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Status</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Remarks</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              { sNo: 1, receiptNo: 'SR-2024-001', date: '10/01/2024', challanNo: 'CH-101', vendor: 'ABC Engineering Ltd', component: 'Hydraulic Cylinder', quantity: 5, status: 'Generated', remarks: '' },
                              { sNo: 2, receiptNo: 'SR-2024-002', date: '12/01/2024', challanNo: 'CH-102', vendor: 'XYZ Industries', component: 'Gear Assembly', quantity: 3, status: 'Generated', remarks: '' },
                              { sNo: 3, receiptNo: 'SR-2024-003', date: '15/01/2024', challanNo: 'CH-103', vendor: 'Precision Parts Co', component: 'Brake Pad Set', quantity: 10, status: 'To Be Generated', remarks: 'Pending' },
                              { sNo: 4, receiptNo: 'SR-2024-004', date: '18/01/2024', challanNo: 'CH-104', vendor: 'Metro Supplies', component: 'Control Valve', quantity: 8, status: 'Generated', remarks: '' },
                              { sNo: 5, receiptNo: 'SR-2024-005', date: '20/01/2024', challanNo: 'CH-105', vendor: 'TechnoMech Solutions', component: 'Manifold Airline', quantity: 6, status: 'To Be Generated', remarks: 'Pending' }
                            ].map((item, index) => (
                              <tr key={item.sNo} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}>
                                <td className="border border-gray-300 px-3 py-2 text-center">{item.sNo}</td>
                                <td className="border border-gray-300 px-3 py-2 font-mono">{item.receiptNo}</td>
                                <td className="border border-gray-300 px-3 py-2 text-center">{item.date}</td>
                                <td className="border border-gray-300 px-3 py-2 font-mono">{item.challanNo}</td>
                                <td className="border border-gray-300 px-3 py-2 text-xs">{item.vendor}</td>
                                <td className="border border-gray-300 px-3 py-2 text-xs">{item.component}</td>
                                <td className="border border-gray-300 px-3 py-2 text-center">{item.quantity}</td>
                                <td className="border border-gray-300 px-3 py-2 text-center">
                                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                    item.status === 'Generated' ? 'bg-green-100 text-green-800' :
                                    'bg-orange-100 text-orange-800'
                                  }`}>
                                    {item.status}
                                  </span>
                                </td>
                                <td className="border border-gray-300 px-3 py-2 text-xs">{item.remarks || '-'}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          ) : selectedCard === 'store-balance' ? (
            <div className="space-y-8">
              {/* Back Button */}
              <div className="mb-4">
                <button
                  onClick={handleBack}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Dashboards
                </button>
              </div>
              {/* Store Balance Content */}
              {(() => {
                // Store Balance Data
                const balanceAmount = 12500000; // ₹1.25 Crore
                const pendingPayments = 8500000; // ₹85 Lakh
                const completedPayments = 4000000; // ₹40 Lakh

                const pendingPercentage = (pendingPayments / (pendingPayments + completedPayments)) * 100;
                const completedPercentage = (completedPayments / (pendingPayments + completedPayments)) * 100;

                return (
                  <>
                    {/* Balance Amount Card */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                      <h2 className="text-3xl font-bold text-gray-900 mb-6">Store Balance</h2>
                      <div className="bg-gradient-to-br from-amber-50 to-amber-100 border-2 border-amber-200 rounded-lg p-8 shadow-sm max-w-md">
                        <div className="text-amber-700 text-sm mb-1 font-semibold">Balance Amount Left</div>
                        <div className="text-4xl font-bold text-amber-600">₹{(balanceAmount / 10000000).toFixed(2)} Cr</div>
                        <div className="text-lg font-semibold text-amber-700 mt-2">₹{balanceAmount.toLocaleString('en-IN')}</div>
                      </div>
                    </div>

                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
                        <div className="text-orange-700 text-sm mb-1 font-semibold">Pending Payments</div>
                        <div className="text-3xl font-bold text-orange-600">₹{(pendingPayments / 10000000).toFixed(2)} Cr</div>
                        <div className="text-sm text-orange-500 mt-1">₹{pendingPayments.toLocaleString('en-IN')}</div>
                      </div>
                      <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
                        <div className="text-green-700 text-sm mb-1 font-semibold">Completed Payments</div>
                        <div className="text-3xl font-bold text-green-600">₹{(completedPayments / 10000000).toFixed(2)} Cr</div>
                        <div className="text-sm text-green-500 mt-1">₹{completedPayments.toLocaleString('en-IN')}</div>
                      </div>
                    </div>

                    {/* Pie Chart - Pending vs Completed Payments */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">Pending vs Completed Payments</h3>
                      <div className="flex flex-col items-center">
                        <div className="relative w-80 h-80">
                          <svg viewBox="0 0 200 200" className="w-full h-full">
                            {(() => {
                              const colors = ['#f97316', '#22c55e']; // Orange for pending, Green for completed
                              const percentages = [pendingPercentage, completedPercentage];
                              let currentAngle = 0;
                              
                              return percentages.map((percentage, index) => {
                                const angle = (percentage / 100) * 360;
                                const startAngle = currentAngle;
                                const endAngle = currentAngle + angle;
                                const startRad = (startAngle - 90) * (Math.PI / 180);
                                const endRad = (endAngle - 90) * (Math.PI / 180);
                                const x1 = 100 + 90 * Math.cos(startRad);
                                const y1 = 100 + 90 * Math.sin(startRad);
                                const x2 = 100 + 90 * Math.cos(endRad);
                                const y2 = 100 + 90 * Math.sin(endRad);
                                const largeArcFlag = angle > 180 ? 1 : 0;
                                const pathData = [
                                  `M 100 100`,
                                  `L ${x1} ${y1}`,
                                  `A 90 90 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                                  'Z'
                                ].join(' ');
                                currentAngle = endAngle;
                                return (
                                  <path
                                    key={index}
                                    d={pathData}
                                    fill={colors[index]}
                                    stroke="white"
                                    strokeWidth="2"
                                  />
                                );
                              })
                            })()}
                            <circle cx="100" cy="100" r="50" fill="white" />
                          </svg>
                        </div>
                        <div className="mt-6 flex gap-8">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-orange-500 rounded"></div>
                            <div className="text-sm font-semibold">Pending: ₹{(pendingPayments / 10000000).toFixed(2)} Cr ({pendingPercentage.toFixed(1)}%)</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-green-500 rounded"></div>
                            <div className="text-sm font-semibold">Completed: ₹{(completedPayments / 10000000).toFixed(2)} Cr ({completedPercentage.toFixed(1)}%)</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Store Balance Table */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">Store Balance Details</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-xs">
                          <thead>
                            <tr className="bg-gray-200">
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">S.No</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Component</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">M Number</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Opening Balance</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Receipts</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Issues</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Current Balance</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Value (₹)</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Remarks</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              { sNo: 1, component: 'Hydraulic Cylinder', mNumber: 'M-10234632', openingBalance: 20, receipts: 5, issues: 3, currentBalance: 22, value: 275000, remarks: '' },
                              { sNo: 2, component: 'Gear Assembly', mNumber: 'M-10260808', openingBalance: 15, receipts: 3, issues: 2, currentBalance: 16, value: 156800, remarks: '' },
                              { sNo: 3, component: 'Brake Pad Set', mNumber: 'M-10254567', openingBalance: 30, receipts: 10, issues: 8, currentBalance: 32, value: 320000, remarks: '' },
                              { sNo: 4, component: 'Control Valve', mNumber: 'M-10278901', openingBalance: 12, receipts: 8, issues: 5, currentBalance: 15, value: 133500, remarks: '' },
                              { sNo: 5, component: 'Manifold Airline', mNumber: 'M-10281681', openingBalance: 18, receipts: 6, issues: 4, currentBalance: 20, value: 224000, remarks: '' }
                            ].map((item, index) => (
                              <tr key={item.sNo} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}>
                                <td className="border border-gray-300 px-3 py-2 text-center">{item.sNo}</td>
                                <td className="border border-gray-300 px-3 py-2 text-xs">{item.component}</td>
                                <td className="border border-gray-300 px-3 py-2 font-mono">{item.mNumber}</td>
                                <td className="border border-gray-300 px-3 py-2 text-center">{item.openingBalance}</td>
                                <td className="border border-gray-300 px-3 py-2 text-center text-green-600 font-semibold">+{item.receipts}</td>
                                <td className="border border-gray-300 px-3 py-2 text-center text-red-600 font-semibold">-{item.issues}</td>
                                <td className="border border-gray-300 px-3 py-2 text-center font-bold">{item.currentBalance}</td>
                                <td className="border border-gray-300 px-3 py-2 text-right">₹{item.value.toLocaleString('en-IN')}</td>
                                <td className="border border-gray-300 px-3 py-2 text-xs">{item.remarks || '-'}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          ) : selectedCard === 'items-register' ? (
            <div className="space-y-8">
              {/* Back Button */}
              <div className="mb-4">
                <button
                  onClick={handleBack}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Dashboards
                </button>
              </div>
              {/* Items Register Content */}
              {(() => {
                // Items in LP Store
                const itemsRegisterData = [
                  { serialNo: 1, mNumber: 'M-10234632', nomenclature: 'Valve, Flow Control', quantity: 15, location: 'Rack A-01', status: 'In Stock' },
                  { serialNo: 2, mNumber: 'M-10281681', nomenclature: 'Manifold Airline', quantity: 8, location: 'Rack A-02', status: 'In Stock' },
                  { serialNo: 3, mNumber: 'M-10261112', nomenclature: 'Gear Spur', quantity: 22, location: 'Rack B-01', status: 'In Stock' },
                  { serialNo: 4, mNumber: 'M-10260808', nomenclature: 'Gear Assembly', quantity: 12, location: 'Rack B-02', status: 'In Stock' },
                  { serialNo: 5, mNumber: 'M-10275712', nomenclature: 'Pedal Control', quantity: 18, location: 'Rack C-01', status: 'In Stock' },
                  { serialNo: 6, mNumber: 'M-10254567', nomenclature: 'Brake Pad Set', quantity: 25, location: 'Rack C-02', status: 'In Stock' },
                  { serialNo: 7, mNumber: 'M-10267890', nomenclature: 'Hydraulic Cylinder', quantity: 6, location: 'Rack D-01', status: 'In Stock' },
                  { serialNo: 8, mNumber: 'M-10278901', nomenclature: 'Control Valve', quantity: 14, location: 'Rack D-02', status: 'In Stock' },
                  { serialNo: 9, mNumber: 'M-10289012', nomenclature: 'Bearing Assembly', quantity: 30, location: 'Rack E-01', status: 'In Stock' },
                  { serialNo: 10, mNumber: 'M-10290123', nomenclature: 'Seal Kit', quantity: 20, location: 'Rack E-02', status: 'In Stock' }
                ];

                return (
                  <>
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                      <h2 className="text-3xl font-bold text-gray-900 mb-6">Items Register - LP Store</h2>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-xs">
                          <thead>
                            <tr className="bg-gray-200">
                              <th className="border border-gray-400 px-2 py-2 font-semibold text-left">Serial No</th>
                              <th className="border border-gray-400 px-2 py-2 font-semibold text-left">M Number</th>
                              <th className="border border-gray-400 px-2 py-2 font-semibold text-left">Nomenclature</th>
                              <th className="border border-gray-400 px-2 py-2 font-semibold text-left">Quantity</th>
                              <th className="border border-gray-400 px-2 py-2 font-semibold text-left">Location</th>
                              <th className="border border-gray-400 px-2 py-2 font-semibold text-left">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {itemsRegisterData.map((item, index) => (
                              <tr key={item.serialNo} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}>
                                <td className="border border-gray-300 px-2 py-2 text-center">{item.serialNo}</td>
                                <td className="border border-gray-300 px-2 py-2 text-center font-mono">{item.mNumber}</td>
                                <td className="border border-gray-300 px-2 py-2 text-xs">{item.nomenclature}</td>
                                <td className="border border-gray-300 px-2 py-2 text-center font-semibold">{item.quantity}</td>
                                <td className="border border-gray-300 px-2 py-2 text-center">{item.location}</td>
                                <td className="border border-gray-300 px-2 py-2 text-center">
                                  <span className="px-2 py-1 rounded text-xs font-semibold bg-green-100 text-green-800">
                                    {item.status}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Graph: Items Quantity Distribution */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">Items Quantity Distribution</h3>
                      <div className="flex items-end justify-around h-96 border-l-2 border-b-2 border-gray-400 pl-4 pb-4 gap-2">
                        {itemsRegisterData.map((item, index) => {
                          const maxQuantity = Math.max(...itemsRegisterData.map(i => i.quantity));
                          const height = (item.quantity / maxQuantity) * 350;
                          const colors = ['bg-lime-500', 'bg-blue-500', 'bg-green-500', 'bg-orange-500', 'bg-pink-500', 'bg-cyan-500', 'bg-yellow-500', 'bg-red-500', 'bg-purple-500', 'bg-indigo-500'];
                          return (
                            <div key={item.serialNo} className="flex flex-col items-center gap-2 flex-1 min-w-0">
                              <div
                                className={`w-full ${colors[index % colors.length]} flex items-start justify-center text-white font-bold text-xs pt-2 rounded-t-lg hover:opacity-80 transition-all`}
                                style={{ height: `${height}px`, minHeight: '30px' }}
                                title={`${item.nomenclature}: ${item.quantity}`}
                              >
                                {item.quantity}
                              </div>
                              <span className="text-xs font-semibold text-gray-700 mt-2 text-center break-words whitespace-normal">
                                {item.nomenclature.split(' ')[0]}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                      <div className="mt-6 text-center">
                        <p className="text-xs text-gray-500">Y-axis: Quantity | X-axis: Items</p>
                      </div>
                    </div>

                    {/* Graph: Items by Location */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">Items Distribution by Location</h3>
                      <div className="flex items-end justify-around h-96 border-l-2 border-b-2 border-gray-400 pl-4 pb-4 gap-2">
                        {(() => {
                          const locationData = [
                            { location: 'Rack A', count: 2 },
                            { location: 'Rack B', count: 2 },
                            { location: 'Rack C', count: 2 },
                            { location: 'Rack D', count: 2 },
                            { location: 'Rack E', count: 2 }
                          ];
                          const maxCount = Math.max(...locationData.map(l => l.count));
                          return locationData.map((data, index) => {
                            const colors = ['bg-lime-500', 'bg-blue-500', 'bg-green-500', 'bg-orange-500', 'bg-pink-500'];
                            const height = (data.count / maxCount) * 350;
                            return (
                              <div key={data.location} className="flex flex-col items-center gap-2 flex-1 min-w-0">
                                <div
                                  className={`w-full ${colors[index % colors.length]} flex items-start justify-center text-white font-bold text-xs pt-2 rounded-t-lg hover:opacity-80 transition-all`}
                                  style={{ height: `${height}px`, minHeight: '30px' }}
                                  title={`${data.location}: ${data.count} items`}
                                >
                                  {data.count}
                                </div>
                                <span className="text-xs font-semibold text-gray-700 mt-2 text-center">{data.location}</span>
                              </div>
                            );
                          });
                        })()}
                      </div>
                      <div className="mt-6 text-center">
                        <p className="text-xs text-gray-500">Y-axis: Number of Items | X-axis: Storage Locations</p>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          ) : selectedCard === 'bill-count' ? (
            <div className="space-y-8">
              {/* Back Button */}
              <div className="mb-4">
                <button
                  onClick={handleBack}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Dashboards
                </button>
              </div>
              {/* Bill Count Content */}
              {(() => {
                // Bill Count Data
                const billCountData = [
                  { category: 'Local Purchase', paid: 145, toBePaid: 28, inProcess: 12, total: 185 },
                  { category: 'Services', paid: 89, toBePaid: 15, inProcess: 8, total: 112 },
                  { category: 'Maintenance', paid: 67, toBePaid: 12, inProcess: 5, total: 84 },
                  { category: 'Supplies', paid: 112, toBePaid: 22, inProcess: 10, total: 144 }
                ];

                const grandTotal = {
                  paid: billCountData.reduce((sum, item) => sum + item.paid, 0),
                  toBePaid: billCountData.reduce((sum, item) => sum + item.toBePaid, 0),
                  inProcess: billCountData.reduce((sum, item) => sum + item.inProcess, 0),
                  total: billCountData.reduce((sum, item) => sum + item.total, 0)
                };

                return (
                  <>
                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-2 border-emerald-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
                        <div className="text-emerald-700 text-sm mb-1 font-semibold">Total Bills</div>
                        <div className="text-3xl font-bold text-emerald-600">{grandTotal.total}</div>
                      </div>
                      <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
                        <div className="text-green-700 text-sm mb-1 font-semibold">Bills Paid</div>
                        <div className="text-3xl font-bold text-green-600">{grandTotal.paid}</div>
                      </div>
                      <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
                        <div className="text-orange-700 text-sm mb-1 font-semibold">To Be Paid</div>
                        <div className="text-3xl font-bold text-orange-600">{grandTotal.toBePaid}</div>
                      </div>
                      <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
                        <div className="text-yellow-700 text-sm mb-1 font-semibold">Payment In Process</div>
                        <div className="text-3xl font-bold text-yellow-600">{grandTotal.inProcess}</div>
                      </div>
                    </div>

                    {/* Bills Table */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                      <h2 className="text-3xl font-bold text-gray-900 mb-6">Bill Count Details</h2>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-xs">
                          <thead>
                            <tr className="bg-gray-200">
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Category</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Bills Paid</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">To Be Paid</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Payment In Process</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            {billCountData.map((item, index) => (
                              <tr key={item.category} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}>
                                <td className="border border-gray-300 px-3 py-2 font-semibold">{item.category}</td>
                                <td className="border border-gray-300 px-3 py-2 text-center text-green-600 font-semibold">{item.paid}</td>
                                <td className="border border-gray-300 px-3 py-2 text-center text-orange-600 font-semibold">{item.toBePaid}</td>
                                <td className="border border-gray-300 px-3 py-2 text-center text-yellow-600 font-semibold">{item.inProcess}</td>
                                <td className="border border-gray-300 px-3 py-2 text-center font-bold">{item.total}</td>
                              </tr>
                            ))}
                            <tr className="bg-gray-300 font-bold">
                              <td className="border border-gray-400 px-3 py-2">Grand Total</td>
                              <td className="border border-gray-400 px-3 py-2 text-center text-green-700">{grandTotal.paid}</td>
                              <td className="border border-gray-400 px-3 py-2 text-center text-orange-700">{grandTotal.toBePaid}</td>
                              <td className="border border-gray-400 px-3 py-2 text-center text-yellow-700">{grandTotal.inProcess}</td>
                              <td className="border border-gray-400 px-3 py-2 text-center">{grandTotal.total}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Graph: Bill Count by Category */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">Bill Count by Category</h3>
                      <div className="flex items-end justify-around h-96 border-l-2 border-b-2 border-gray-400 pl-4 pb-4 gap-2">
                        {billCountData.map((item, index) => {
                          const maxTotal = Math.max(...billCountData.map(i => i.total));
                          const height = (item.total / maxTotal) * 350;
                          const colors = ['bg-emerald-500', 'bg-blue-500', 'bg-green-500', 'bg-orange-500'];
                          return (
                            <div key={item.category} className="flex flex-col items-center gap-1 flex-1 min-w-0">
                              {/* To Be Paid Stack */}
                              <div
                                className="w-full bg-gradient-to-t from-orange-600 to-orange-400 flex items-start justify-center text-white font-bold text-xs pt-1 rounded-t-lg hover:from-orange-700 hover:to-orange-500 transition-all"
                                style={{ height: `${(item.toBePaid / maxTotal) * 300}px`, minHeight: '20px' }}
                                title={`To Be Paid: ${item.toBePaid}`}
                              >
                                {item.toBePaid}
                              </div>
                              {/* In Process Stack */}
                              <div
                                className="w-full bg-gradient-to-t from-yellow-600 to-yellow-400 flex items-start justify-center text-white font-bold text-xs pt-1 hover:from-yellow-700 hover:to-yellow-500 transition-all"
                                style={{ height: `${(item.inProcess / maxTotal) * 300}px`, minHeight: '20px' }}
                                title={`In Process: ${item.inProcess}`}
                              >
                                {item.inProcess}
                              </div>
                              {/* Paid Stack */}
                              <div
                                className="w-full bg-gradient-to-t from-green-600 to-green-400 flex items-start justify-center text-white font-bold text-xs pt-1 hover:from-green-700 hover:to-green-500 transition-all"
                                style={{ height: `${(item.paid / maxTotal) * 300}px`, minHeight: '20px' }}
                                title={`Paid: ${item.paid}`}
                              >
                                {item.paid}
                              </div>
                              <span className="text-xs font-semibold text-gray-700 mt-2 text-center break-words whitespace-normal">
                                {item.category.split(' ')[0]}
                              </span>
                              <span className="text-xs text-gray-500 mt-1">Total: {item.total}</span>
                            </div>
                          );
                        })}
                      </div>
                      <div className="mt-6 text-center">
                        <p className="text-xs text-gray-500 mb-2">Y-axis: Number of Bills | X-axis: Categories</p>
                        <div className="flex justify-center gap-6 mt-2">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-green-500 rounded"></div>
                            <span className="text-xs text-gray-600">Paid</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                            <span className="text-xs text-gray-600">In Process</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-orange-500 rounded"></div>
                            <span className="text-xs text-gray-600">To Be Paid</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Graph: Bill Payment Status Distribution */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">Overall Bill Payment Status</h3>
                      <div className="flex flex-col items-center">
                        <div className="relative w-80 h-80">
                          <svg viewBox="0 0 200 200" className="w-full h-full">
                            {(() => {
                              const paidPercentage = (grandTotal.paid / grandTotal.total) * 100;
                              const toBePaidPercentage = (grandTotal.toBePaid / grandTotal.total) * 100;
                              const inProcessPercentage = (grandTotal.inProcess / grandTotal.total) * 100;
                              const colors = ['#22c55e', '#eab308', '#f97316']; // Green for paid, Yellow for in process, Orange for to be paid
                              const percentages = [paidPercentage, inProcessPercentage, toBePaidPercentage];
                              let currentAngle = 0;
                              
                              return percentages.map((percentage, index) => {
                                const angle = (percentage / 100) * 360;
                                const startAngle = currentAngle;
                                const endAngle = currentAngle + angle;
                                const startRad = (startAngle - 90) * (Math.PI / 180);
                                const endRad = (endAngle - 90) * (Math.PI / 180);
                                const x1 = 100 + 90 * Math.cos(startRad);
                                const y1 = 100 + 90 * Math.sin(startRad);
                                const x2 = 100 + 90 * Math.cos(endRad);
                                const y2 = 100 + 90 * Math.sin(endRad);
                                const largeArcFlag = angle > 180 ? 1 : 0;
                                const pathData = [
                                  `M 100 100`,
                                  `L ${x1} ${y1}`,
                                  `A 90 90 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                                  'Z'
                                ].join(' ');
                                currentAngle = endAngle;
                                return (
                                  <path
                                    key={index}
                                    d={pathData}
                                    fill={colors[index]}
                                    stroke="white"
                                    strokeWidth="2"
                                  />
                                );
                              })
                            })()}
                            <circle cx="100" cy="100" r="50" fill="white" />
                          </svg>
                        </div>
                        <div className="mt-6 flex gap-8">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-green-500 rounded"></div>
                            <div className="text-sm font-semibold">Paid: {grandTotal.paid} ({((grandTotal.paid / grandTotal.total) * 100).toFixed(1)}%)</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                            <div className="text-sm font-semibold">In Process: {grandTotal.inProcess} ({((grandTotal.inProcess / grandTotal.total) * 100).toFixed(1)}%)</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-orange-500 rounded"></div>
                            <div className="text-sm font-semibold">To Be Paid: {grandTotal.toBePaid} ({((grandTotal.toBePaid / grandTotal.total) * 100).toFixed(1)}%)</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          ) : selectedCard === 'challan-pending' ? (
            <div className="space-y-8">
              {/* Back Button */}
              <div className="mb-4">
                <button
                  onClick={handleBack}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Dashboards
                </button>
              </div>
              {/* Challan Pending Content */}
              {(() => {
                // Challan Pending Table Data
                const challanPendingData = [
                  { challanNo: 'CH-2024-001', vendor: 'ABC Engineering Ltd', date: '15/01/2024', amount: 125000, daysPending: 25 },
                  { challanNo: 'CH-2024-002', vendor: 'XYZ Industries', date: '18/01/2024', amount: 89000, daysPending: 22 },
                  { challanNo: 'CH-2024-003', vendor: 'Metro Supplies', date: '22/01/2024', amount: 156000, daysPending: 18 },
                  { challanNo: 'CH-2024-004', vendor: 'Precision Parts Co', date: '25/01/2024', amount: 98000, daysPending: 15 },
                  { challanNo: 'CH-2024-005', vendor: 'TechnoMech Solutions', date: '28/01/2024', amount: 112000, daysPending: 12 },
                  { challanNo: 'CH-2024-006', vendor: 'Elite Parts Inc', date: '02/02/2024', amount: 134000, daysPending: 8 },
                  { challanNo: 'CH-2024-007', vendor: 'Global Components', date: '05/02/2024', amount: 76000, daysPending: 5 },
                  { challanNo: 'CH-2024-008', vendor: 'ABC Engineering Ltd', date: '08/02/2024', amount: 145000, daysPending: 2 }
                ];

                // Payment time data (how long payments take in days)
                const paymentTimeData = [
                  { range: '0-5 days', count: 8 },
                  { range: '6-10 days', count: 15 },
                  { range: '11-15 days', count: 12 },
                  { range: '16-20 days', count: 10 },
                  { range: '21-30 days', count: 6 },
                  { range: '31+ days', count: 3 }
                ];

                // Challan count by month
                const monthlyChallanData = [
                  { month: 'Jan 2024', count: 45 },
                  { month: 'Feb 2024', count: 38 },
                  { month: 'Mar 2024', count: 52 },
                  { month: 'Apr 2024', count: 41 },
                  { month: 'May 2024', count: 48 },
                  { month: 'Jun 2024', count: 44 }
                ];

                const maxPaymentTimeCount = Math.max(...paymentTimeData.map(d => d.count));
                const maxMonthlyChallan = Math.max(...monthlyChallanData.map(m => m.count));

                return (
                  <>
                    {/* Challan Pending Table */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                      <h2 className="text-3xl font-bold text-gray-900 mb-6">Pending Challans</h2>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-xs">
                          <thead>
                            <tr className="bg-gray-200">
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Challan Number</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Vendor</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Date</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Amount (₹)</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Days Pending</th>
                            </tr>
                          </thead>
                          <tbody>
                            {challanPendingData.map((item, index) => (
                              <tr key={item.challanNo} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}>
                                <td className="border border-gray-300 px-3 py-2 font-mono font-semibold">{item.challanNo}</td>
                                <td className="border border-gray-300 px-3 py-2 text-xs">{item.vendor}</td>
                                <td className="border border-gray-300 px-3 py-2 text-center">{item.date}</td>
                                <td className="border border-gray-300 px-3 py-2 text-right font-semibold">₹{item.amount.toLocaleString('en-IN')}</td>
                                <td className="border border-gray-300 px-3 py-2 text-center">
                                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                    item.daysPending <= 5 ? 'bg-green-100 text-green-800' :
                                    item.daysPending <= 15 ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-red-100 text-red-800'
                                  }`}>
                                    {item.daysPending} days
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Graph: How long payments take */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">Payment Processing Time</h3>
                      <div className="flex items-end justify-around h-96 border-l-2 border-b-2 border-gray-400 pl-4 pb-4 gap-2">
                        {paymentTimeData.map((data) => (
                          <div key={data.range} className="flex flex-col items-center gap-2 flex-1 min-w-0">
                            <div
                              className="w-full bg-gradient-to-t from-violet-600 to-violet-400 flex items-start justify-center text-white font-bold text-xs pt-2 rounded-t-lg hover:from-violet-700 hover:to-violet-500 transition-all"
                              style={{ height: `${(data.count / maxPaymentTimeCount) * 350}px`, minHeight: '30px' }}
                            >
                              {data.count}
                            </div>
                            <span className="text-xs font-semibold text-gray-700 mt-2 text-center break-words whitespace-normal">
                              {data.range}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 text-center">
                        <p className="text-xs text-gray-500">Y-axis: Number of Payments | X-axis: Time Range (Days)</p>
                      </div>
                    </div>

                    {/* Graph: Challan count by month */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">Challan Count by Month</h3>
                      <div className="flex items-end justify-around h-96 border-l-2 border-b-2 border-gray-400 pl-4 pb-4 gap-2">
                        {monthlyChallanData.map((data) => (
                          <div key={data.month} className="flex flex-col items-center gap-2 flex-1 min-w-0">
                            <div
                              className="w-full bg-gradient-to-t from-violet-600 to-violet-400 flex items-start justify-center text-white font-bold text-xs pt-2 rounded-t-lg hover:from-violet-700 hover:to-violet-500 transition-all"
                              style={{ height: `${(data.count / maxMonthlyChallan) * 350}px`, minHeight: '30px' }}
                            >
                              {data.count}
                            </div>
                            <span className="text-xs font-semibold text-gray-700 mt-2 text-center break-words whitespace-normal">
                              {data.month}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 text-center">
                        <p className="text-xs text-gray-500">Y-axis: Number of Challans | X-axis: Months</p>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          ) : selectedCard === 'crv-pending' ? (
            <div className="space-y-8">
              {/* Back Button */}
              <div className="mb-4">
                <button
                  onClick={handleBack}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Dashboards
                </button>
              </div>
              {/* CRV Pending Content */}
              {(() => {
                // CRV Pending Table Data
                const crvPendingData = [
                  { crvNo: 'CRV-2024-001', vendor: 'ABC Engineering Ltd', date: '12/01/2024', amount: 234000, status: 'Pending' },
                  { crvNo: 'CRV-2024-002', vendor: 'XYZ Industries', date: '15/01/2024', amount: 189000, status: 'Pending' },
                  { crvNo: 'CRV-2024-003', vendor: 'Metro Supplies', date: '18/01/2024', amount: 267000, status: 'Pending' },
                  { crvNo: 'CRV-2024-004', vendor: 'Precision Parts Co', date: '22/01/2024', amount: 156000, status: 'Pending' },
                  { crvNo: 'CRV-2024-005', vendor: 'TechnoMech Solutions', date: '25/01/2024', amount: 198000, status: 'Pending' },
                  { crvNo: 'CRV-2024-006', vendor: 'Elite Parts Inc', date: '28/01/2024', amount: 223000, status: 'Pending' },
                  { crvNo: 'CRV-2024-007', vendor: 'Global Components', date: '02/02/2024', amount: 145000, status: 'Pending' },
                  { crvNo: 'CRV-2024-008', vendor: 'ABC Engineering Ltd', date: '05/02/2024', amount: 178000, status: 'Pending' }
                ];

                // CRV Summary
                const crvSummary = {
                  total: 156,
                  pending: 42,
                  completed: 114
                };

                const pendingPercentage = (crvSummary.pending / crvSummary.total) * 100;
                const completedPercentage = (crvSummary.completed / crvSummary.total) * 100;

                return (
                  <>
                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-gradient-to-br from-rose-50 to-rose-100 border-2 border-rose-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
                        <div className="text-rose-700 text-sm mb-1 font-semibold">Total CRVs</div>
                        <div className="text-3xl font-bold text-rose-600">{crvSummary.total}</div>
                      </div>
                      <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
                        <div className="text-orange-700 text-sm mb-1 font-semibold">Pending</div>
                        <div className="text-3xl font-bold text-orange-600">{crvSummary.pending}</div>
                        <div className="text-sm text-orange-500 mt-1">{pendingPercentage.toFixed(1)}%</div>
                      </div>
                      <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
                        <div className="text-green-700 text-sm mb-1 font-semibold">Completed</div>
                        <div className="text-3xl font-bold text-green-600">{crvSummary.completed}</div>
                        <div className="text-sm text-green-500 mt-1">{completedPercentage.toFixed(1)}%</div>
                      </div>
                    </div>

                    {/* CRV Pending Table */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                      <h2 className="text-3xl font-bold text-gray-900 mb-6">Pending CRVs</h2>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-xs">
                          <thead>
                            <tr className="bg-gray-200">
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">CRV Number</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Vendor</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Date</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Amount (₹)</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {crvPendingData.map((item, index) => (
                              <tr key={item.crvNo} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}>
                                <td className="border border-gray-300 px-3 py-2 font-mono font-semibold">{item.crvNo}</td>
                                <td className="border border-gray-300 px-3 py-2 text-xs">{item.vendor}</td>
                                <td className="border border-gray-300 px-3 py-2 text-center">{item.date}</td>
                                <td className="border border-gray-300 px-3 py-2 text-right font-semibold">₹{item.amount.toLocaleString('en-IN')}</td>
                                <td className="border border-gray-300 px-3 py-2 text-center">
                                  <span className="px-2 py-1 rounded text-xs font-semibold bg-orange-100 text-orange-800">
                                    {item.status}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Pie Chart - Pending vs Completed CRVs */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">Pending vs Completed CRVs</h3>
                      <div className="flex flex-col items-center">
                        <div className="relative w-80 h-80">
                          <svg viewBox="0 0 200 200" className="w-full h-full">
                            {(() => {
                              const colors = ['#f97316', '#22c55e']; // Orange for pending, Green for completed
                              const percentages = [pendingPercentage, completedPercentage];
                              let currentAngle = 0;
                              
                              return percentages.map((percentage, index) => {
                                const angle = (percentage / 100) * 360;
                                const startAngle = currentAngle;
                                const endAngle = currentAngle + angle;
                                const startRad = (startAngle - 90) * (Math.PI / 180);
                                const endRad = (endAngle - 90) * (Math.PI / 180);
                                const x1 = 100 + 90 * Math.cos(startRad);
                                const y1 = 100 + 90 * Math.sin(startRad);
                                const x2 = 100 + 90 * Math.cos(endRad);
                                const y2 = 100 + 90 * Math.sin(endRad);
                                const largeArcFlag = angle > 180 ? 1 : 0;
                                const pathData = [
                                  `M 100 100`,
                                  `L ${x1} ${y1}`,
                                  `A 90 90 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                                  'Z'
                                ].join(' ');
                                currentAngle = endAngle;
                                return (
                                  <path
                                    key={index}
                                    d={pathData}
                                    fill={colors[index]}
                                    stroke="white"
                                    strokeWidth="2"
                                  />
                                );
                              })
                            })()}
                            <circle cx="100" cy="100" r="50" fill="white" />
                          </svg>
                        </div>
                        <div className="mt-6 flex gap-8">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-orange-500 rounded"></div>
                            <div className="text-sm font-semibold">Pending: {crvSummary.pending} ({pendingPercentage.toFixed(1)}%)</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-green-500 rounded"></div>
                            <div className="text-sm font-semibold">Completed: {crvSummary.completed} ({completedPercentage.toFixed(1)}%)</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          ) : selectedCard === 'bill-pending' ? (
            <div className="space-y-8">
              {/* Back Button */}
              <div className="mb-4">
                <button
                  onClick={handleBack}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Dashboards
                </button>
              </div>
              {/* Bill Pending Content */}
              {(() => {
                // Bill Pending Table Data
                const billPendingData = [
                  { billNo: 'BILL-2024-001', vendor: 'ABC Engineering Ltd', amount: 245000, reason: 'Documentation Incomplete' },
                  { billNo: 'BILL-2024-002', vendor: 'XYZ Industries', amount: 189000, reason: 'Verification Pending' },
                  { billNo: 'BILL-2024-003', vendor: 'Metro Supplies', amount: 312000, reason: 'Approval Pending' },
                  { billNo: 'BILL-2024-004', vendor: 'Precision Parts Co', amount: 178000, reason: 'Quality Issue' },
                  { billNo: 'BILL-2024-005', vendor: 'TechnoMech Solutions', amount: 223000, reason: 'Documentation Incomplete' },
                  { billNo: 'BILL-2024-006', vendor: 'Elite Parts Inc', amount: 267000, reason: 'Verification Pending' },
                  { billNo: 'BILL-2024-007', vendor: 'Global Components', amount: 156000, reason: 'Approval Pending' },
                  { billNo: 'BILL-2024-008', vendor: 'ABC Engineering Ltd', amount: 198000, reason: 'Dispute Resolution' },
                  { billNo: 'BILL-2024-009', vendor: 'Metro Supplies', amount: 234000, reason: 'Documentation Incomplete' },
                  { billNo: 'BILL-2024-010', vendor: 'TechnoMech Solutions', amount: 189000, reason: 'Quality Issue' }
                ];

                // Reasons for no payment
                const reasonsData = [
                  { reason: 'Documentation Incomplete', count: 24, amount: 2450000 },
                  { reason: 'Verification Pending', count: 18, amount: 1890000 },
                  { reason: 'Approval Pending', count: 15, amount: 3120000 },
                  { reason: 'Quality Issue', count: 12, amount: 1450000 },
                  { reason: 'Dispute Resolution', count: 8, amount: 890000 }
                ];

                const maxReasonCount = Math.max(...reasonsData.map(r => r.count));

                const totalPendingAmount = billPendingData.reduce((sum, bill) => sum + bill.amount, 0);

                return (
                  <>
                    {/* Summary Card */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                      <h2 className="text-3xl font-bold text-gray-900 mb-6">Pending Bills Summary</h2>
                      <div className="bg-gradient-to-br from-sky-50 to-sky-100 border-2 border-sky-200 rounded-lg p-6 shadow-sm max-w-md">
                        <div className="text-sky-700 text-sm mb-1 font-semibold">Total Pending Bills Amount</div>
                        <div className="text-4xl font-bold text-sky-600">₹{(totalPendingAmount / 1000000).toFixed(2)} Lakh</div>
                        <div className="text-lg font-semibold text-sky-700 mt-2">₹{totalPendingAmount.toLocaleString('en-IN')}</div>
                        <div className="text-sm text-sky-600 mt-1">Total Bills: {billPendingData.length}</div>
                      </div>
                    </div>

                    {/* Bill Pending Table */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                      <h2 className="text-3xl font-bold text-gray-900 mb-6">Pending Bills</h2>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-xs">
                          <thead>
                            <tr className="bg-gray-200">
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Bill Number</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Vendor (To Whom Payment is Due)</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Reason for Non-Payment</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Amount (₹)</th>
                            </tr>
                          </thead>
                          <tbody>
                            {billPendingData.map((item, index) => (
                              <tr key={item.billNo} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}>
                                <td className="border border-gray-300 px-3 py-2 font-mono font-semibold">{item.billNo}</td>
                                <td className="border border-gray-300 px-3 py-2 text-xs">{item.vendor}</td>
                                <td className="border border-gray-300 px-3 py-2 text-xs">
                                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                    item.reason === 'Documentation Incomplete' ? 'bg-red-100 text-red-800' :
                                    item.reason === 'Verification Pending' ? 'bg-yellow-100 text-yellow-800' :
                                    item.reason === 'Approval Pending' ? 'bg-orange-100 text-orange-800' :
                                    item.reason === 'Quality Issue' ? 'bg-pink-100 text-pink-800' :
                                    'bg-purple-100 text-purple-800'
                                  }`}>
                                    {item.reason}
                                  </span>
                                </td>
                                <td className="border border-gray-300 px-3 py-2 text-right font-semibold">₹{item.amount.toLocaleString('en-IN')}</td>
                              </tr>
                            ))}
                          </tbody>
                          <tfoot>
                            <tr className="bg-gray-300 font-bold">
                              <td colSpan={3} className="border border-gray-400 px-3 py-2 text-right">Grand Total</td>
                              <td className="border border-gray-400 px-3 py-2 text-right">₹{totalPendingAmount.toLocaleString('en-IN')}</td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    </div>

                    {/* Graph: Pending Bills by Reason */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">Pending Bills Count by Reason</h3>
                      <div className="flex items-end justify-around h-96 border-l-2 border-b-2 border-gray-400 pl-4 pb-4 gap-2">
                        {reasonsData.map((data) => (
                          <div key={data.reason} className="flex flex-col items-center gap-2 flex-1 min-w-0">
                            <div
                              className="w-full bg-gradient-to-t from-sky-600 to-sky-400 flex items-start justify-center text-white font-bold text-xs pt-2 rounded-t-lg hover:from-sky-700 hover:to-sky-500 transition-all"
                              style={{ height: `${(data.count / maxReasonCount) * 350}px`, minHeight: '30px' }}
                              title={`${data.reason}: ${data.count} bills`}
                            >
                              {data.count}
                            </div>
                            <span className="text-xs font-semibold text-gray-700 mt-2 text-center break-words whitespace-normal">
                              {data.reason.split(' ')[0]}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 text-center">
                        <p className="text-xs text-gray-500">Y-axis: Number of Pending Bills | X-axis: Reasons for Non-Payment</p>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          ) : (
            <div className="space-y-8">
              {/* Back Button */}
              <div className="mb-4">
                <button
                  onClick={handleBack}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Dashboards
                </button>
              </div>
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4 capitalize">
                  {cards.find(c => c.id === selectedCard)?.title}
                </h2>
                <p className="text-gray-600 mb-6">
                  {cards.find(c => c.id === selectedCard)?.description}
                </p>
                <div className="border-t pt-6">
                  <p className="text-gray-500 italic">Content for {cards.find(c => c.id === selectedCard)?.title} will be displayed here.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-gray-200 shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/')}
                className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent hover:from-purple-700 hover:to-purple-900 transition-all"
              >
                512 Army Base ERP
              </button>
              <div className="h-8 w-px bg-gray-300"></div>
              <div>
                <div className="text-sm font-semibold text-gray-900">DGM (PURCHASE)</div>
                <div className="text-xs text-gray-600">Deputy General Manager Purchase</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 bg-green-50 text-green-700 rounded-lg text-sm font-semibold flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Online
              </div>
              <button
                onClick={() => setIsLoggedIn(false)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/dgm-purchase-dashboard')}
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back</span>
          </button>
        </div>
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Select Dashboard</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {cards.map((card) => (
              <div
                key={card.id}
                onClick={() => handleAccess(card.id)}
                className="bg-white rounded-xl shadow-lg border-2 border-gray-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
              >
                <div className={`${card.color} h-32 rounded-t-xl flex items-center justify-center`}>
                  <h3 className="text-xl font-bold text-white text-center px-4">{card.title}</h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 text-sm mb-4 h-12">{card.description}</p>
                  <button
                    className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition font-semibold"
                  >
                    Access
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
