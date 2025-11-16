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
    { id: 'bill-pending', title: 'Bill pending', description: 'Pending bill items', color: 'bg-sky-500' }
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
                    <div className="text-blue-700 text-sm mb-1 font-semibold">Total Budget</div>
                    <div className="text-3xl font-bold text-blue-600">₹{(totalBudget / 10000000).toFixed(2)} Cr</div>
                  </div>
                  <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
                    <div className="text-red-700 text-sm mb-1 font-semibold">Funds Used</div>
                    <div className="text-3xl font-bold text-red-600">₹{(usedFunds / 10000000).toFixed(2)} Cr</div>
                    <div className="text-sm text-red-500 mt-1">{usedPercentage.toFixed(1)}% utilized</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
                    <div className="text-green-700 text-sm mb-1 font-semibold">Remaining Funds</div>
                    <div className="text-3xl font-bold text-green-600">₹{(remainingFunds / 10000000).toFixed(2)} Cr</div>
                    <div className="text-sm text-green-500 mt-1">{remainingPercentage.toFixed(1)}% available</div>
                  </div>
                </div>
              </div>

              {/* Pie Chart - Fund Utilization */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Fund Utilization</h3>
                <div className="flex flex-col items-center">
                  <div className="relative w-80 h-80">
                    <svg viewBox="0 0 200 200" className="w-full h-full">
                      {(() => {
                        const colors = ['#ef4444', '#22c55e'];
                        const percentages = [usedPercentage, remainingPercentage];
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
                      <div className="w-4 h-4 bg-red-500 rounded"></div>
                      <div className="text-sm font-semibold">Used</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-500 rounded"></div>
                      <div className="text-sm font-semibold">Remaining</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bar Graph - Section-wise Fund Usage */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Section-wise Fund Usage</h3>
                <div className="flex items-end justify-around h-96 border-l-2 border-b-2 border-gray-400 pl-4 pb-4">
                  {sectionFundData.map((data) => (
                    <div key={data.section} className="flex flex-col items-center gap-2">
                      <div
                        className={`w-20 ${data.color} flex items-start justify-center text-white font-bold text-sm pt-2 rounded-t-lg hover:opacity-80 transition-all`}
                        style={{ height: `${(data.amount / maxAmount) * 300}px`, minHeight: '40px' }}
                      >
                        ₹{(data.amount / 1000000).toFixed(1)}M
                      </div>
                      <span className="text-sm font-semibold text-gray-700 mt-2">{data.section}</span>
                    </div>
                  ))}
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

                      {/* Bar Graph - IFA Cases per Quarter */}
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">IFA Cases by Quarter</h3>
                        <div className="flex items-end justify-around h-96 border-l-2 border-b-2 border-gray-400 pl-4 pb-4">
                          {ifaCasesData.map((data) => (
                            <div key={data.quarter} className="flex flex-col items-center gap-2">
                              <div
                                className="w-24 bg-gradient-to-t from-cyan-600 to-cyan-400 flex items-start justify-center text-white font-bold text-sm pt-2 rounded-t-lg hover:from-cyan-700 hover:to-cyan-500 transition-all"
                                style={{ height: `${(data.count / maxIfaCount) * 350}px`, minHeight: '30px' }}
                              >
                                {data.count}
                              </div>
                              <span className="text-sm font-semibold text-gray-700 mt-2 text-center">{data.quarter}</span>
                            </div>
                          ))}
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
