import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginForm from '../LoginForm'

export default function DGMMTRLLogin() {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [selectedCard, setSelectedCard] = useState<string | null>(null)
  const [lmWoPlacedTab, setLmWoPlacedTab] = useState<'scaled' | 'non-scaled'>('scaled')
  const [lpSoPlacedTab, setLpSoPlacedTab] = useState<'scaled' | 'non-scaled'>('scaled')
  const [vendorSearchTerm, setVendorSearchTerm] = useState<string>('')

  if (!isLoggedIn) {
  return (
    <LoginForm
        title="DGM WKS (MTRL)"
        subtitle="Deputy General Manager Workshop Material Dashboard"
        onLoginSuccess={() => setIsLoggedIn(true)}
      />
    )
  }

  const cards = [
    { id: 'ct-issue', title: 'CT Issue', description: 'Component tracking and issue management', color: 'bg-green-500' },
    { id: 'target', title: 'Target', description: 'View production targets and goals', color: 'bg-blue-500' },
    { id: 'fund-state', title: 'Fund State', description: 'Current fund allocation and status', color: 'bg-yellow-500' },
    { id: 'lp-so-placed', title: 'LP SO placed', description: 'Local Purchase Supply Orders placed', color: 'bg-indigo-500' },
    { id: 'lm-wo-placed', title: 'LM WO placed', description: 'Local Manufacture Work Orders placed', color: 'bg-purple-500' },
    { id: 'pds-lapse-lp', title: 'PDS lapse LP', description: 'Pending Delivery Status lapse for Local Purchase', color: 'bg-orange-500' },
    { id: 'pds-lapse-lm', title: 'PDS lapse LM', description: 'Pending Delivery Status lapse for Local Manufacture', color: 'bg-red-500' },
    { id: 'urgency', title: 'Urgency Cases', description: 'Urgent items and priority tracking', color: 'bg-pink-500' },
    { id: 'ifa-case-progress', title: 'IFA cases', description: 'Issue For Acknowledgement cases', color: 'bg-cyan-500' },
    { id: 'vendor-rating-contact', title: 'Vendor Rating and Contact', description: 'Vendor performance ratings and contact information', color: 'bg-teal-500' },
    { id: 'dr-summary', title: 'DR summary', description: 'Defect Report summary and analysis', color: 'bg-amber-500' }
  ]

  const handleAccess = (cardId: string) => {
    setSelectedCard(cardId)
  }

  const handleBack = () => {
    setSelectedCard(null)
  }

  if (selectedCard) {
    // CT Issue Data (same as GM Prod)
    const ctIssueData = [
      { serNo: 1, ohsSerNo: 1, compNo: 6435, mtrlNo: 10234632, cosSection: 'LV2/ICVS', partNo: '5330-390235 (675-10-29-01)', nomenclature: 'SEAL PLAIN (CUP)', noOff: 1, scale: 80, reqdQty: '', issueQty: '' },
      { serNo: 2, ohsSerNo: 2, compNo: 25189, mtrlNo: 10264521, cosSection: 'LV2/ICVS', partNo: '5330-390228 (675-10-20-03)', nomenclature: 'RETAINER PACKING', noOff: 1, scale: 80, reqdQty: '', issueQty: '' },
      { serNo: 3, ohsSerNo: 3, compNo: 6432, mtrlNo: 10257575, cosSection: 'LV2/ICVS', partNo: '4730-079089 (675-10-27)', nomenclature: 'ADAPTOR BUSHING', noOff: 1, scale: 50, reqdQty: '', issueQty: '' },
      { serNo: 4, ohsSerNo: 4, compNo: 6423, mtrlNo: 10255675, cosSection: 'LV2/ICVS', partNo: '5331-002747 (675-10-19) (5331720323423)', nomenclature: "'O' RING", noOff: 1, scale: 80, reqdQty: '', issueQty: '' },
      { serNo: 5, ohsSerNo: 5, compNo: 6431, mtrlNo: 10264534, cosSection: 'LV2/ICVS', partNo: '5330-390184 (675-10-26-01)', nomenclature: 'GASKET', noOff: 2, scale: 160, reqdQty: '', issueQty: '' }
    ];

    // Fund State Data (from GM WKS MTRL)
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
                  onClick={handleBack}
                  className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent hover:from-purple-700 hover:to-purple-900 transition-all"
                >
                  512 Army Base ERP
                </button>
                <div className="h-8 w-px bg-gray-300"></div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">DGM WKS (MTRL)</div>
                  <div className="text-xs text-gray-600">Deputy General Manager Workshop Material</div>
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
          {selectedCard === 'ct-issue' ? (
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
              {/* Table Section */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">CT Issue</h2>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-xs">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="border border-gray-400 px-2 py-2 font-semibold text-left">SER NO</th>
                        <th className="border border-gray-400 px-2 py-2 font-semibold text-left">OHS SER NO</th>
                        <th className="border border-gray-400 px-2 py-2 font-semibold text-left">COMP NO</th>
                        <th className="border border-gray-400 px-2 py-2 font-semibold text-left">MTRL NO</th>
                        <th className="border border-gray-400 px-2 py-2 font-semibold text-left">COS/SECTION</th>
                        <th className="border border-gray-400 px-2 py-2 font-semibold text-left">PART No</th>
                        <th className="border border-gray-400 px-2 py-2 font-semibold text-left">NOMENCLATURE</th>
                        <th className="border border-gray-400 px-2 py-2 font-semibold text-left">NO OFF</th>
                        <th className="border border-gray-400 px-2 py-2 font-semibold text-left">SCALE</th>
                        <th className="border border-gray-400 px-2 py-2 font-semibold text-left">REQD QTY</th>
                        <th className="border border-gray-400 px-2 py-2 font-semibold text-left">ISSUE QTY</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ctIssueData.map((item) => (
                        <tr key={item.serNo} className="hover:bg-gray-50">
                          <td className="border border-gray-300 px-2 py-2 text-center">{item.serNo}</td>
                          <td className="border border-gray-300 px-2 py-2 text-center">{item.ohsSerNo}</td>
                          <td className="border border-gray-300 px-2 py-2 text-center">{item.compNo}</td>
                          <td className="border border-gray-300 px-2 py-2 text-center font-mono">{item.mtrlNo}</td>
                          <td className="border border-gray-300 px-2 py-2 text-center">{item.cosSection}</td>
                          <td className="border border-gray-300 px-2 py-2 font-mono text-sm">{item.partNo}</td>
                          <td className="border border-gray-300 px-2 py-2">{item.nomenclature}</td>
                          <td className="border border-gray-300 px-2 py-2 text-center">{item.noOff}</td>
                          <td className="border border-gray-300 px-2 py-2 text-center">{item.scale}</td>
                          <td className="border border-gray-300 px-2 py-2 text-center">{item.reqdQty || '-'}</td>
                          <td className="border border-gray-300 px-2 py-2 text-center">{item.issueQty || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : selectedCard === 'target' ? (
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
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Target</h2>
                <div className="bg-gray-50 rounded-lg p-8 text-center">
                  <p className="text-gray-600">Target dashboard content will be added here.</p>
                </div>
              </div>
            </div>
          ) : selectedCard === 'fund-state' ? (
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
          ) : selectedCard === 'ifa-case-progress' ? (
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
                        <div className="mt-6 text-center">
                          <p className="text-xs text-gray-500">Y-axis: Number of IFA Cases | X-axis: Financial Year Quarters</p>
                        </div>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
          ) : selectedCard === 'dr-summary' ? (
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
              {/* DR Summary Content */}
              {(() => {
                // Quarterly DR Data
                const quarterlyDrData = [
                  { quarter: 'Q1 2024-25', count: 25 },
                  { quarter: 'Q2 2024-25', count: 32 },
                  { quarter: 'Q3 2024-25', count: 28 },
                  { quarter: 'Q4 2024-25', count: 35 }
                ];

                // Section-wise DR Data
                const sectionDrData = [
                  { section: 'VRD', count: 18, percentage: 15.0 },
                  { section: 'ARD', count: 25, percentage: 20.8 },
                  { section: 'SRD', count: 30, percentage: 25.0 },
                  { section: 'ETD', count: 22, percentage: 18.3 },
                  { section: 'T&R', count: 15, percentage: 12.5 },
                  { section: 'Others', count: 10, percentage: 8.3 }
                ];

                // DR Table Data
                const drTableData = [
                  { serNo: 1, drNumber: 'DR/2024/001', nomenclature: 'Hydraulic Pump Assembly', typeOfDefect: 'Mechanical Failure', remarks: 'Seal leakage detected' },
                  { serNo: 2, drNumber: 'DR/2024/002', nomenclature: 'Engine Gasket Set', typeOfDefect: 'Material Defect', remarks: 'Gasket quality issue' },
                  { serNo: 3, drNumber: 'DR/2024/003', nomenclature: 'Brake Pad Assembly', typeOfDefect: 'Wear & Tear', remarks: 'Premature wear observed' },
                  { serNo: 4, drNumber: 'DR/2024/004', nomenclature: 'Oil Filter Element', typeOfDefect: 'Material Defect', remarks: 'Filter efficiency below standard' },
                  { serNo: 5, drNumber: 'DR/2024/005', nomenclature: 'Clutch Plate Set', typeOfDefect: 'Mechanical Failure', remarks: 'Slipping detected' },
                  { serNo: 6, drNumber: 'DR/2024/006', nomenclature: 'Radiator Core', typeOfDefect: 'Corrosion', remarks: 'Corrosion in cooling fins' },
                  { serNo: 7, drNumber: 'DR/2024/007', nomenclature: 'Fuel Injection Pump', typeOfDefect: 'Mechanical Failure', remarks: 'Pressure irregularity' },
                  { serNo: 8, drNumber: 'DR/2024/008', nomenclature: 'Alternator Assembly', typeOfDefect: 'Electrical Issue', remarks: 'Voltage regulation problem' },
                  { serNo: 9, drNumber: 'DR/2024/009', nomenclature: 'Steering Box Assembly', typeOfDefect: 'Mechanical Failure', remarks: 'Play in steering mechanism' },
                  { serNo: 10, drNumber: 'DR/2024/010', nomenclature: 'Water Pump', typeOfDefect: 'Mechanical Failure', remarks: 'Bearing failure' }
                ];

                // Type of Defect Distribution
                const defectTypeData = [
                  { type: 'Mechanical Failure', count: 45 },
                  { type: 'Material Defect', count: 28 },
                  { type: 'Electrical Issue', count: 22 },
                  { type: 'Wear & Tear', count: 18 },
                  { type: 'Corrosion', count: 7 }
                ];

                const maxQuarterlyCount = Math.max(...quarterlyDrData.map(d => d.count));
                const maxDefectTypeCount = Math.max(...defectTypeData.map(d => d.count));
                const totalDrReports = drTableData.length;
                const totalSectionCount = sectionDrData.reduce((sum, item) => sum + item.count, 0);

                return (
                  <>
                    {/* Graph 1: Defect Reports per Quarter */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">Defect Reports Raised per Quarter</h3>
                      <div className="flex items-end justify-around h-96 border-l-2 border-b-2 border-gray-400 pl-4 pb-4">
                        {quarterlyDrData.map((data) => (
                          <div key={data.quarter} className="flex flex-col items-center gap-2">
                            <div
                              className="w-24 bg-gradient-to-t from-red-600 to-red-400 flex items-start justify-center text-white font-bold text-sm pt-2 rounded-t-lg hover:from-red-700 hover:to-red-500 transition-all"
                              style={{ height: `${(data.count / maxQuarterlyCount) * 350}px`, minHeight: '30px' }}
                            >
                              {data.count}
                            </div>
                            <span className="text-sm font-semibold text-gray-700 mt-2 text-center">{data.quarter}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 text-center">
                        <p className="text-xs text-gray-500">Y-axis: Number of Defect Reports | X-axis: Financial Year Quarters</p>
                      </div>
                    </div>

                    {/* Pie Chart: Defect Reports by Section */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">Defect Reports by Section</h3>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="flex flex-col items-center">
                          <div className="relative w-80 h-80">
                            <svg viewBox="0 0 200 200" className="w-full h-full">
                              {(() => {
                                const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];
                                let currentAngle = 0;
                                
                                return sectionDrData.map((data, index) => {
                                  const angle = (data.count / totalSectionCount) * 360;
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
                                      key={data.section}
                                      d={pathData}
                                      fill={colors[index % colors.length]}
                                      stroke="white"
                                      strokeWidth="2"
                                    />
                                  );
                                });
                              })()}
                              <circle cx="100" cy="100" r="50" fill="white" />
                            </svg>
                          </div>
                        </div>
                        <div className="space-y-4">
                          {sectionDrData.map((data, index) => {
                            const colors = ['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-red-500', 'bg-purple-500', 'bg-pink-500'];
                            return (
                              <div key={data.section} className="border-l-4 border-gray-300 pl-4">
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="font-bold text-lg">{data.section}</h4>
                                  <span className="text-2xl font-bold text-gray-700">{data.count}</span>
                                </div>
                                <div className="mb-2">
                                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                                    <span>Percentage</span>
                                    <span className="font-semibold">{data.percentage.toFixed(1)}%</span>
                                  </div>
                                  <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                      className={`h-2 rounded-full ${colors[index % colors.length]}`}
                                      style={{ width: `${data.percentage}%` }}
                                    ></div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Graph: Types of Defects */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">Types of Defects Occurring</h3>
                      <div className="flex items-end justify-around h-96 border-l-2 border-b-2 border-gray-400 pl-4 pb-4">
                        {defectTypeData.map((data) => (
                          <div key={data.type} className="flex flex-col items-center gap-2">
                            <div
                              className="w-28 bg-gradient-to-t from-orange-600 to-orange-400 flex items-start justify-center text-white font-bold text-xs pt-2 rounded-t-lg hover:from-orange-700 hover:to-orange-500 transition-all"
                              style={{ height: `${(data.count / maxDefectTypeCount) * 350}px`, minHeight: '30px' }}
                            >
                              {data.count}
                            </div>
                            <span className="text-xs font-semibold text-gray-700 mt-2 text-center break-words max-w-[100px]">{data.type}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 text-center">
                        <p className="text-xs text-gray-500">Y-axis: Number of Occurrences | X-axis: Defect Types</p>
                      </div>
                    </div>

                    {/* DR Progress Table */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">Defect Report Progress</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-sm">
                          <thead>
                            <tr className="bg-gray-200">
                              <th className="border border-gray-400 px-4 py-3 font-semibold text-left">Ser No</th>
                              <th className="border border-gray-400 px-4 py-3 font-semibold text-left">DR Number</th>
                              <th className="border border-gray-400 px-4 py-3 font-semibold text-left">Nomenclature</th>
                              <th className="border border-gray-400 px-4 py-3 font-semibold text-left">Type of Defect</th>
                              <th className="border border-gray-400 px-4 py-3 font-semibold text-left">Remarks</th>
                            </tr>
                          </thead>
                          <tbody>
                            {drTableData.map((item, index) => (
                              <tr key={item.serNo} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}>
                                <td className="border border-gray-300 px-4 py-2 text-center">{item.serNo}</td>
                                <td className="border border-gray-300 px-4 py-2 font-mono">{item.drNumber}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.nomenclature}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                    item.typeOfDefect === 'Mechanical Failure' ? 'bg-red-100 text-red-800' :
                                    item.typeOfDefect === 'Material Defect' ? 'bg-yellow-100 text-yellow-800' :
                                    item.typeOfDefect === 'Electrical Issue' ? 'bg-blue-100 text-blue-800' :
                                    item.typeOfDefect === 'Wear & Tear' ? 'bg-orange-100 text-orange-800' :
                                    'bg-gray-100 text-gray-800'
                                  }`}>
                                    {item.typeOfDefect}
                                  </span>
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-sm">{item.remarks}</td>
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
          ) : selectedCard === 'lm-wo-placed' ? (
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

              {/* Title */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">DETLS OF LM WK ORDERS :2025-26</h2>

                {/* Tabs */}
                <div className="flex border-b border-gray-300 mb-6">
                  <button
                    onClick={() => setLmWoPlacedTab('scaled')}
                    className={`px-6 py-3 font-semibold text-sm transition-all ${
                      lmWoPlacedTab === 'scaled'
                        ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    Scaled
                  </button>
                  <button
                    onClick={() => setLmWoPlacedTab('non-scaled')}
                    className={`px-6 py-3 font-semibold text-sm transition-all ${
                      lmWoPlacedTab === 'non-scaled'
                        ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    Non Scaled
                  </button>
                </div>

                {/* Scaled Tab Content */}
                {lmWoPlacedTab === 'scaled' && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">SCALED LM 2025-26 STATUS (15/10/25)</h3>
                    
                    {/* Scaled Table Data */}
                    {(() => {
                      const scaledData = [
                        { sec: 'ARD', awtMtrl: 5, can: 12, comp: 0, oss: 0, woRel: 20, meCell: 0, grandTotal: 37 },
                        { sec: 'ARMT', awtMtrl: 14, can: 5, comp: 1, oss: 3, woRel: 10, meCell: 5, grandTotal: 38 },
                        { sec: 'ETD', awtMtrl: 0, can: 0, comp: 2, oss: 0, woRel: 0, meCell: 0, grandTotal: 2 },
                        { sec: 'SRD', awtMtrl: 41, can: 2, comp: 1, oss: 0, woRel: 15, meCell: 1, grandTotal: 60 },
                        { sec: 'T&R', awtMtrl: 4, can: 1, comp: 5, oss: 0, woRel: 4, meCell: 0, grandTotal: 14 },
                        { sec: 'VRD', awtMtrl: 4, can: 8, comp: 0, oss: 0, woRel: 18, meCell: 0, grandTotal: 30 }
                      ];

                      const grandTotals = {
                        awtMtrl: 68,
                        can: 28,
                        comp: 9,
                        oss: 3,
                        woRel: 67,
                        meCell: 6,
                        grandTotal: 181
                      };

                      return (
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse text-sm">
                            <thead>
                              <tr className="bg-gray-200">
                                <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Sec</th>
                                <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Awt Mtrl</th>
                                <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Can</th>
                                <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Comp</th>
                                <th className="border border-gray-400 px-3 py-2 font-semibold text-left">OSS</th>
                                <th className="border border-gray-400 px-3 py-2 font-semibold text-left">WO Rel</th>
                                <th className="border border-gray-400 px-3 py-2 font-semibold text-left">ME Cell</th>
                                <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Grand Total</th>
                              </tr>
                            </thead>
                            <tbody>
                              {scaledData.map((row, index) => (
                                <tr key={row.sec} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}>
                                  <td className="border border-gray-300 px-3 py-2 font-semibold">{row.sec}</td>
                                  <td className="border border-gray-300 px-3 py-2 text-center">{row.awtMtrl || ''}</td>
                                  <td className="border border-gray-300 px-3 py-2 text-center">{row.can || ''}</td>
                                  <td className="border border-gray-300 px-3 py-2 text-center">{row.comp || ''}</td>
                                  <td className="border border-gray-300 px-3 py-2 text-center">{row.oss || ''}</td>
                                  <td className="border border-gray-300 px-3 py-2 text-center">{row.woRel || ''}</td>
                                  <td className="border border-gray-300 px-3 py-2 text-center">{row.meCell || ''}</td>
                                  <td className="border border-gray-300 px-3 py-2 text-center font-semibold">{row.grandTotal}</td>
                                </tr>
                              ))}
                              <tr className="bg-gray-300 font-bold">
                                <td className="border border-gray-400 px-3 py-2">Grand Total</td>
                                <td className="border border-gray-400 px-3 py-2 text-center">{grandTotals.awtMtrl}</td>
                                <td className="border border-gray-400 px-3 py-2 text-center">{grandTotals.can}</td>
                                <td className="border border-gray-400 px-3 py-2 text-center">{grandTotals.comp}</td>
                                <td className="border border-gray-400 px-3 py-2 text-center">{grandTotals.oss}</td>
                                <td className="border border-gray-400 px-3 py-2 text-center">{grandTotals.woRel}</td>
                                <td className="border border-gray-400 px-3 py-2 text-center">{grandTotals.meCell}</td>
                                <td className="border border-gray-400 px-3 py-2 text-center">{grandTotals.grandTotal}</td>
                              </tr>
                            </tbody>
                          </table>
                          
                          {/* Summary below table */}
                          <div className="mt-6 grid grid-cols-3 gap-4">
                            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                              <div className="text-blue-700 text-sm font-semibold mb-1">AWT MTRL</div>
                              <div className="text-2xl font-bold text-blue-600">68</div>
                            </div>
                            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                              <div className="text-green-700 text-sm font-semibold mb-1">SO PLACED</div>
                              <div className="text-2xl font-bold text-green-600">40</div>
                            </div>
                            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
                              <div className="text-yellow-700 text-sm font-semibold mb-1">ENQ</div>
                              <div className="text-2xl font-bold text-yellow-600">28</div>
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}

                {/* Non Scaled Tab Content */}
                {lmWoPlacedTab === 'non-scaled' && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">NON SCALED LM 2025-26 STATUS (15/10/25)</h3>
                    
                    {/* Non Scaled Table Data */}
                    {(() => {
                      const nonScaledData = [
                        { sec: 'ARD', awtMtrl: 0, can: 3, comp: 0, ess: 0, meCell: 0, woRel: 2, grandTotal: 5 },
                        { sec: 'ARMT', awtMtrl: 1, can: 0, comp: 1, ess: 0, meCell: 2, woRel: 1, grandTotal: 5 },
                        { sec: 'ENG', awtMtrl: 13, can: 0, comp: 0, ess: 0, meCell: 4, woRel: 0, grandTotal: 17 },
                        { sec: 'ETD', awtMtrl: 2, can: 0, comp: 2, ess: 3, meCell: 0, woRel: 43, grandTotal: 50 },
                        { sec: 'INST', awtMtrl: 2, can: 1, comp: 1, ess: 0, meCell: 0, woRel: 14, grandTotal: 18 },
                        { sec: 'SRD', awtMtrl: 18, can: 0, comp: 6, ess: 1, meCell: 0, woRel: 21, grandTotal: 46 },
                        { sec: 'T&R', awtMtrl: 1, can: 0, comp: 2, ess: 0, meCell: 3, woRel: 2, grandTotal: 8 },
                        { sec: 'VRD', awtMtrl: 7, can: 0, comp: 1, ess: 0, meCell: 3, woRel: 15, grandTotal: 26 }
                      ];

                      const grandTotals = {
                        awtMtrl: 44,
                        can: 4,
                        comp: 13,
                        ess: 4,
                        meCell: 12,
                        woRel: 98,
                        grandTotal: 175
                      };

                      return (
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse text-sm">
                            <thead>
                              <tr className="bg-gray-200">
                                <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Sec</th>
                                <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Awt Mtrl</th>
                                <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Can</th>
                                <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Comp</th>
                                <th className="border border-gray-400 px-3 py-2 font-semibold text-left">ESS</th>
                                <th className="border border-gray-400 px-3 py-2 font-semibold text-left">ME Cell</th>
                                <th className="border border-gray-400 px-3 py-2 font-semibold text-left">WO Rel</th>
                                <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Grand Total</th>
                              </tr>
                            </thead>
                            <tbody>
                              {nonScaledData.map((row, index) => (
                                <tr key={row.sec} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}>
                                  <td className="border border-gray-300 px-3 py-2 font-semibold">{row.sec}</td>
                                  <td className="border border-gray-300 px-3 py-2 text-center">{row.awtMtrl || ''}</td>
                                  <td className="border border-gray-300 px-3 py-2 text-center">{row.can || ''}</td>
                                  <td className="border border-gray-300 px-3 py-2 text-center">{row.comp || ''}</td>
                                  <td className="border border-gray-300 px-3 py-2 text-center">{row.ess || ''}</td>
                                  <td className="border border-gray-300 px-3 py-2 text-center">{row.meCell || ''}</td>
                                  <td className="border border-gray-300 px-3 py-2 text-center">{row.woRel || ''}</td>
                                  <td className="border border-gray-300 px-3 py-2 text-center font-semibold">{row.grandTotal}</td>
                                </tr>
                              ))}
                              <tr className="bg-gray-300 font-bold">
                                <td className="border border-gray-400 px-3 py-2">Grand Total</td>
                                <td className="border border-gray-400 px-3 py-2 text-center">{grandTotals.awtMtrl}</td>
                                <td className="border border-gray-400 px-3 py-2 text-center">{grandTotals.can}</td>
                                <td className="border border-gray-400 px-3 py-2 text-center">{grandTotals.comp}</td>
                                <td className="border border-gray-400 px-3 py-2 text-center">{grandTotals.ess}</td>
                                <td className="border border-gray-400 px-3 py-2 text-center">{grandTotals.meCell}</td>
                                <td className="border border-gray-400 px-3 py-2 text-center">{grandTotals.woRel}</td>
                                <td className="border border-gray-400 px-3 py-2 text-center">{grandTotals.grandTotal}</td>
                              </tr>
                            </tbody>
                          </table>
                          
                          {/* Summary below table */}
                          <div className="mt-6 grid grid-cols-3 gap-4">
                            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                              <div className="text-blue-700 text-sm font-semibold mb-1">AWT MTRL</div>
                              <div className="text-2xl font-bold text-blue-600">44</div>
                            </div>
                            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                              <div className="text-green-700 text-sm font-semibold mb-1">SO PLACED</div>
                              <div className="text-2xl font-bold text-green-600">15</div>
                            </div>
                            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
                              <div className="text-yellow-700 text-sm font-semibold mb-1">U/ENQ</div>
                              <div className="text-2xl font-bold text-yellow-600">29</div>
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}
              </div>
            </div>
          ) : selectedCard === 'lp-so-placed' ? (
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

              {/* Title */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">DETLS OF LPR's :2025-26</h2>

                {/* Tabs */}
                <div className="flex border-b border-gray-300 mb-6">
                  <button
                    onClick={() => setLpSoPlacedTab('scaled')}
                    className={`px-6 py-3 font-semibold text-sm transition-all ${
                      lpSoPlacedTab === 'scaled'
                        ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    Scaled
                  </button>
                  <button
                    onClick={() => setLpSoPlacedTab('non-scaled')}
                    className={`px-6 py-3 font-semibold text-sm transition-all ${
                      lpSoPlacedTab === 'non-scaled'
                        ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    Non Scaled
                  </button>
                </div>

                {/* Scaled Tab Content */}
                {lpSoPlacedTab === 'scaled' && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">SCALED LPR's 2025-26 STATUS (15/10/25)</h3>
                    
                    {/* Scaled Table Data */}
                    {(() => {
                      const scaledData = [
                        { sec: 'ARD', awtMtrl: 7, can: 3, comp: 5, hold: 0, ifaCase: 2, oss: 4, soPlaced: 2, storeRecd: 0, grandTotal: 23 },
                        { sec: 'ARMT', awtMtrl: 6, can: 2, comp: 2, hold: 0, ifaCase: 0, oss: 0, soPlaced: 0, storeRecd: 0, grandTotal: 10 },
                        { sec: 'ENG', awtMtrl: 0, can: 2, comp: 1, hold: 2, ifaCase: 2, oss: 0, soPlaced: 1, storeRecd: 2, grandTotal: 10 },
                        { sec: 'ETD', awtMtrl: 4, can: 3, comp: 0, hold: 0, ifaCase: 2, oss: 1, soPlaced: 1, storeRecd: 0, grandTotal: 11 },
                        { sec: 'INST', awtMtrl: 0, can: 1, comp: 1, hold: 1, ifaCase: 0, oss: 0, soPlaced: 1, storeRecd: 1, grandTotal: 5 },
                        { sec: 'SRD', awtMtrl: 1, can: 1, comp: 2, hold: 0, ifaCase: 0, oss: 7, soPlaced: 3, storeRecd: 0, grandTotal: 14 },
                        { sec: 'T&R', awtMtrl: 2, can: 0, comp: 1, hold: 0, ifaCase: 0, oss: 9, soPlaced: 0, storeRecd: 0, grandTotal: 12 },
                        { sec: 'VRD', awtMtrl: 1, can: 1, comp: 3, hold: 0, ifaCase: 1, oss: 1, soPlaced: 5, storeRecd: 0, grandTotal: 12 }
                      ];

                      const grandTotals = {
                        awtMtrl: 17,
                        can: 14,
                        comp: 18,
                        hold: 3,
                        ifaCase: 7,
                        oss: 22,
                        soPlaced: 13,
                        storeRecd: 3,
                        grandTotal: 97
                      };

                      return (
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse text-sm">
                            <thead>
                              <tr className="bg-gray-200">
                                <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Sec</th>
                                <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Awt Mtrl</th>
                                <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Can</th>
                                <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Comp</th>
                                <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Hold</th>
                                <th className="border border-gray-400 px-3 py-2 font-semibold text-left">IFA Case</th>
                                <th className="border border-gray-400 px-3 py-2 font-semibold text-left">OSS</th>
                                <th className="border border-gray-400 px-3 py-2 font-semibold text-left">SO Placed</th>
                                <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Store Recd</th>
                                <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Grand Total</th>
                              </tr>
                            </thead>
                            <tbody>
                              {scaledData.map((row, index) => (
                                <tr key={row.sec} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}>
                                  <td className="border border-gray-300 px-3 py-2 font-semibold">{row.sec}</td>
                                  <td className="border border-gray-300 px-3 py-2 text-center">{row.awtMtrl || ''}</td>
                                  <td className="border border-gray-300 px-3 py-2 text-center">{row.can || ''}</td>
                                  <td className="border border-gray-300 px-3 py-2 text-center">{row.comp || ''}</td>
                                  <td className="border border-gray-300 px-3 py-2 text-center">{row.hold || ''}</td>
                                  <td className="border border-gray-300 px-3 py-2 text-center">{row.ifaCase || ''}</td>
                                  <td className="border border-gray-300 px-3 py-2 text-center">{row.oss || ''}</td>
                                  <td className="border border-gray-300 px-3 py-2 text-center">{row.soPlaced || ''}</td>
                                  <td className="border border-gray-300 px-3 py-2 text-center">{row.storeRecd || ''}</td>
                                  <td className="border border-gray-300 px-3 py-2 text-center font-semibold">{row.grandTotal}</td>
                                </tr>
                              ))}
                              <tr className="bg-gray-300 font-bold">
                                <td className="border border-gray-400 px-3 py-2">Grand Total</td>
                                <td className="border border-gray-400 px-3 py-2 text-center">{grandTotals.awtMtrl}</td>
                                <td className="border border-gray-400 px-3 py-2 text-center">{grandTotals.can}</td>
                                <td className="border border-gray-400 px-3 py-2 text-center">{grandTotals.comp}</td>
                                <td className="border border-gray-400 px-3 py-2 text-center">{grandTotals.hold}</td>
                                <td className="border border-gray-400 px-3 py-2 text-center">{grandTotals.ifaCase}</td>
                                <td className="border border-gray-400 px-3 py-2 text-center">{grandTotals.oss}</td>
                                <td className="border border-gray-400 px-3 py-2 text-center">{grandTotals.soPlaced}</td>
                                <td className="border border-gray-400 px-3 py-2 text-center">{grandTotals.storeRecd}</td>
                                <td className="border border-gray-400 px-3 py-2 text-center">{grandTotals.grandTotal}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      );
                    })()}
                  </div>
                )}

                {/* Non Scaled Tab Content */}
                {lpSoPlacedTab === 'non-scaled' && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">NON SCALED LPR's 2025-26 STATUS (15/10/2025)</h3>
                    
                    {/* Non Scaled Table Data */}
                    {(() => {
                      const nonScaledData = [
                        { sec: 'ARD', awtMtrl: 3, can: 0, comp: 11, ifaCase: 2, partIssued: 0, soPlaced: 8, grandTotal: 24 },
                        { sec: 'ARMT', awtMtrl: 1, can: 2, comp: 6, ifaCase: 0, partIssued: 0, soPlaced: 1, grandTotal: 10 },
                        { sec: 'ENG', awtMtrl: 0, can: 0, comp: 3, ifaCase: 1, partIssued: 2, soPlaced: 14, grandTotal: 20 },
                        { sec: 'ETD', awtMtrl: 49, can: 15, comp: 15, ifaCase: 8, partIssued: 0, soPlaced: 11, grandTotal: 98 },
                        { sec: 'INST', awtMtrl: 0, can: 0, comp: 4, ifaCase: 11, partIssued: 0, soPlaced: 4, grandTotal: 19 },
                        { sec: 'SRD', awtMtrl: 2, can: 0, comp: 15, ifaCase: 1, partIssued: 0, soPlaced: 0, grandTotal: 18 },
                        { sec: 'T&R', awtMtrl: 0, can: 0, comp: 2, ifaCase: 0, partIssued: 0, soPlaced: 1, grandTotal: 3 },
                        { sec: 'VRD', awtMtrl: 13, can: 2, comp: 2, ifaCase: 0, partIssued: 0, soPlaced: 17, grandTotal: 34 }
                      ];

                      const grandTotals = {
                        awtMtrl: 68,
                        can: 19,
                        comp: 58,
                        ifaCase: 23,
                        partIssued: 2,
                        soPlaced: 56,
                        grandTotal: 226
                      };

                      return (
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse text-sm">
                            <thead>
                              <tr className="bg-gray-200">
                                <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Sec</th>
                                <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Awt Mtrl</th>
                                <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Can</th>
                                <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Comp</th>
                                <th className="border border-gray-400 px-3 py-2 font-semibold text-left">IFA Case</th>
                                <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Part Issued</th>
                                <th className="border border-gray-400 px-3 py-2 font-semibold text-left">So Placed</th>
                                <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Grand Total</th>
                              </tr>
                            </thead>
                            <tbody>
                              {nonScaledData.map((row, index) => (
                                <tr key={row.sec} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}>
                                  <td className="border border-gray-300 px-3 py-2 font-semibold">{row.sec}</td>
                                  <td className="border border-gray-300 px-3 py-2 text-center">{row.awtMtrl || ''}</td>
                                  <td className="border border-gray-300 px-3 py-2 text-center">{row.can || ''}</td>
                                  <td className="border border-gray-300 px-3 py-2 text-center">{row.comp || ''}</td>
                                  <td className="border border-gray-300 px-3 py-2 text-center">{row.ifaCase || ''}</td>
                                  <td className="border border-gray-300 px-3 py-2 text-center">{row.partIssued || ''}</td>
                                  <td className="border border-gray-300 px-3 py-2 text-center">{row.soPlaced || ''}</td>
                                  <td className="border border-gray-300 px-3 py-2 text-center font-semibold">{row.grandTotal}</td>
                                </tr>
                              ))}
                              <tr className="bg-gray-300 font-bold">
                                <td className="border border-gray-400 px-3 py-2">Grand Total</td>
                                <td className="border border-gray-400 px-3 py-2 text-center">{grandTotals.awtMtrl}</td>
                                <td className="border border-gray-400 px-3 py-2 text-center">{grandTotals.can}</td>
                                <td className="border border-gray-400 px-3 py-2 text-center">{grandTotals.comp}</td>
                                <td className="border border-gray-400 px-3 py-2 text-center">{grandTotals.ifaCase}</td>
                                <td className="border border-gray-400 px-3 py-2 text-center">{grandTotals.partIssued}</td>
                                <td className="border border-gray-400 px-3 py-2 text-center">{grandTotals.soPlaced}</td>
                                <td className="border border-gray-400 px-3 py-2 text-center">{grandTotals.grandTotal}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      );
                    })()}
                  </div>
                )}
              </div>
            </div>
          ) : selectedCard === 'pds-lapse-lp' ? (
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
              {/* PDS Lapse LP Content */}
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
          ) : selectedCard === 'pds-lapse-lm' ? (
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
              {/* PDS Lapse LM Content */}
              {(() => {
                // LM WO in PDS lapsed stage summary
                const lmWoSummary = {
                  total: 32,
                  critical: 8,
                  moderate: 15,
                  low: 9
                };

                // PDS lapse per quarter
                const quarterlyLmPdsLapseData = [
                  { quarter: 'Q1 2024-25', count: 6 },
                  { quarter: 'Q2 2024-25', count: 9 },
                  { quarter: 'Q3 2024-25', count: 11 },
                  { quarter: 'Q4 2024-25', count: 6 }
                ];

                const maxQuarterlyLmLapse = Math.max(...quarterlyLmPdsLapseData.map(q => q.count));

                return (
                  <>
                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                        <div className="text-red-600 text-sm mb-1 font-semibold">Total LM WO in PDS Lapsed</div>
                        <div className="text-3xl font-bold text-gray-900">{lmWoSummary.total}</div>
                      </div>
                      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                        <div className="text-red-600 text-sm mb-1 font-semibold">Critical</div>
                        <div className="text-3xl font-bold text-gray-900">{lmWoSummary.critical}</div>
                      </div>
                      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                        <div className="text-yellow-600 text-sm mb-1 font-semibold">Moderate</div>
                        <div className="text-3xl font-bold text-gray-900">{lmWoSummary.moderate}</div>
                      </div>
                      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                        <div className="text-green-600 text-sm mb-1 font-semibold">Low</div>
                        <div className="text-3xl font-bold text-gray-900">{lmWoSummary.low}</div>
                      </div>
                    </div>

                    {/* Graph: PDS Lapse per Quarter */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">PDS Lapse per Quarter</h3>
                      <div className="flex items-end justify-around h-96 border-l-2 border-b-2 border-gray-400 pl-4 pb-4">
                        {quarterlyLmPdsLapseData.map((data) => (
                          <div key={data.quarter} className="flex flex-col items-center gap-2 flex-1">
                            <div
                              className="w-full bg-gradient-to-t from-red-600 to-red-400 flex items-start justify-center text-white font-bold text-sm pt-2 rounded-t-lg hover:from-red-700 hover:to-red-500 transition-all"
                              style={{ height: `${(data.count / maxQuarterlyLmLapse) * 350}px`, minHeight: '30px' }}
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
          ) : selectedCard === 'urgency' ? (
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
              {/* Urgency Cases Content */}
              {(() => {
                // Urgency Cases Data
                const urgencyData = [
                  {
                    sNo: 1,
                    ohsNoUni: 78,
                    ohsNoOh2: 47,
                    mtrlId: 10260116,
                    sec: 'ARD',
                    eqpt: 'UNI',
                    partNo: '4810-008054 (765-10-SB543)',
                    nomenclature: 'Valve, Flow Control',
                    higherAssy: 'RADIATORS AND COOLERS & GROUP',
                    noOff: 1,
                    scale: 100,
                    oh2Scale: 100,
                    bmpiiIik: 72,
                    cmt: 15,
                    oh2: 48,
                    reqdQty: 135,
                    issueCf111Uni: 111,
                    issueCf25Oh2: 25,
                    fresh20Oh2: 20,
                    totalIssue: 156,
                    ossStk: 'NA',
                    lm: '',
                    lp: '',
                    remarks: '9960246956'
                  },
                  {
                    sNo: 2,
                    ohsNoUni: 689,
                    ohsNoOh2: '',
                    mtrlId: 10281681,
                    sec: 'ARD',
                    eqpt: 'UNI',
                    partNo: '4730-079556 (675-10-SB120)',
                    nomenclature: 'Manifold Airline',
                    higherAssy: 'EJECTOR AND AIR CLEANER',
                    noOff: 1,
                    scale: 70,
                    oh2Scale: '',
                    bmpiiIik: 50.4,
                    cmt: 10.5,
                    oh2: 0,
                    reqdQty: 61,
                    issueCf111Uni: 78,
                    issueCf25Oh2: '',
                    fresh20Oh2: '',
                    totalIssue: 78,
                    ossStk: 'NA',
                    lm: '',
                    lp: '',
                    remarks: 'DR RAISED FOR 79 QTY URGENCY, 9850092483'
                  },
                  {
                    sNo: 3,
                    ohsNoUni: 835.03,
                    ohsNoOh2: 582,
                    mtrlId: 10261112,
                    sec: 'ARD',
                    eqpt: 'UNI',
                    partNo: '3020-002391 (765-12-198)',
                    nomenclature: 'Gear Spur',
                    higherAssy: 'STOPPING BRAKES',
                    noOff: 1,
                    scale: 50,
                    oh2Scale: 40,
                    bmpiiIik: 36,
                    cmt: 7.5,
                    oh2: 19.2,
                    reqdQty: 63,
                    issueCf111Uni: '',
                    issueCf25Oh2: '',
                    fresh20Oh2: '',
                    totalIssue: 66,
                    ossStk: 'NA',
                    lm: '',
                    lp: '',
                    remarks: '9168449606'
                  },
                  {
                    sNo: 4,
                    ohsNoUni: 866,
                    ohsNoOh2: 615,
                    mtrlId: 10260808,
                    sec: 'ARD',
                    eqpt: 'UNI',
                    partNo: '3010-000581 (765-15-SB130)',
                    nomenclature: 'Gear Assembly',
                    higherAssy: 'FINAL DRIVES',
                    noOff: 1,
                    scale: 50,
                    oh2Scale: 70,
                    bmpiiIik: 36,
                    cmt: 7.5,
                    oh2: 33.6,
                    reqdQty: 78,
                    issueCf111Uni: 56,
                    issueCf25Oh2: 18,
                    fresh20Oh2: 14,
                    totalIssue: 88,
                    ossStk: 'NA',
                    lm: '',
                    lp: '',
                    remarks: 'DR RAISED FOR 91 QTY URGENCY, 9844527368'
                  },
                  {
                    sNo: 5,
                    ohsNoUni: 924,
                    ohsNoOh2: 688,
                    mtrlId: 10275712,
                    sec: 'ARD',
                    eqpt: 'UNI',
                    partNo: '2520003186 (765-17-SB324)',
                    nomenclature: 'Pedal Control',
                    higherAssy: 'CONTROL LINKAGES',
                    noOff: 1,
                    scale: 50,
                    oh2Scale: 100,
                    bmpiiIik: 36,
                    cmt: 7.5,
                    oh2: 48,
                    reqdQty: 92,
                    issueCf111Uni: 48,
                    issueCf25Oh2: 5,
                    fresh20Oh2: '',
                    totalIssue: 53,
                    ossStk: 'NA',
                    lm: '',
                    lp: '',
                    remarks: 'DR RAISED FOR 03 QTY, 9326852507'
                  }
                ];

                // Urgency Count Data
                const urgencyCount = urgencyData.length;
                const urgencyP1Count = 2; // Example: count of P1 urgency
                const urgencyP2Count = 2; // Example: count of P2 urgency
                const urgencyP3Count = 1; // Example: count of P3 urgency

                // Quarterly Urgency Data
                const quarterlyUrgencyData = [
                  { quarter: 'Q1 2024-25', count: 8 },
                  { quarter: 'Q2 2024-25', count: 12 },
                  { quarter: 'Q3 2024-25', count: 10 },
                  { quarter: 'Q4 2024-25', count: 15 }
                ];

                const maxQuarterlyUrgency = Math.max(...quarterlyUrgencyData.map(d => d.count));
                const maxPriorityCount = Math.max(urgencyP1Count, urgencyP2Count, urgencyP3Count);

                return (
                  <>
                    {/* Urgency Count Card */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                      <h2 className="text-3xl font-bold text-gray-900 mb-6">Urgency Cases</h2>
                      <div className="mb-8">
                        <div className="bg-gradient-to-br from-pink-50 to-pink-100 border-2 border-pink-200 rounded-lg p-6 shadow-sm max-w-md">
                          <div className="text-pink-700 text-sm mb-1 font-semibold">Total Urgency Cases</div>
                          <div className="text-4xl font-bold text-pink-600">{urgencyCount}</div>
                        </div>
                      </div>
                    </div>

                    {/* Graph: Urgency Count by Priority (P1, P2, P3) */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">Urgency Distribution by Priority</h3>
                      <div className="flex items-end justify-around h-96 border-l-2 border-b-2 border-gray-400 pl-4 pb-4">
                        <div className="flex flex-col items-center gap-2">
                          <div
                            className="w-24 bg-gradient-to-t from-red-600 to-red-400 flex items-start justify-center text-white font-bold text-sm pt-2 rounded-t-lg hover:from-red-700 hover:to-red-500 transition-all"
                            style={{ height: `${(urgencyP1Count / maxPriorityCount) * 350}px`, minHeight: '30px' }}
                          >
                            {urgencyP1Count}
                          </div>
                          <span className="text-sm font-semibold text-gray-700 mt-2 text-center">P1</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                          <div
                            className="w-24 bg-gradient-to-t from-yellow-600 to-yellow-400 flex items-start justify-center text-white font-bold text-sm pt-2 rounded-t-lg hover:from-yellow-700 hover:to-yellow-500 transition-all"
                            style={{ height: `${(urgencyP2Count / maxPriorityCount) * 350}px`, minHeight: '30px' }}
                          >
                            {urgencyP2Count}
                          </div>
                          <span className="text-sm font-semibold text-gray-700 mt-2 text-center">P2</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                          <div
                            className="w-24 bg-gradient-to-t from-green-600 to-green-400 flex items-start justify-center text-white font-bold text-sm pt-2 rounded-t-lg hover:from-green-700 hover:to-green-500 transition-all"
                            style={{ height: `${(urgencyP3Count / maxPriorityCount) * 350}px`, minHeight: '30px' }}
                          >
                            {urgencyP3Count}
                          </div>
                          <span className="text-sm font-semibold text-gray-700 mt-2 text-center">P3</span>
                        </div>
                      </div>
                      <div className="mt-6 text-center">
                        <p className="text-xs text-gray-500">Y-axis: Number of Urgency Cases | X-axis: Priority Levels</p>
                      </div>
                    </div>

                    {/* Graph: Urgencies Raised per Quarter */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">Urgencies Raised per Quarter</h3>
                      <div className="flex items-end justify-around h-96 border-l-2 border-b-2 border-gray-400 pl-4 pb-4">
                        {quarterlyUrgencyData.map((data) => (
                          <div key={data.quarter} className="flex flex-col items-center gap-2">
                            <div
                              className="w-24 bg-gradient-to-t from-purple-600 to-purple-400 flex items-start justify-center text-white font-bold text-sm pt-2 rounded-t-lg hover:from-purple-700 hover:to-purple-500 transition-all"
                              style={{ height: `${(data.count / maxQuarterlyUrgency) * 350}px`, minHeight: '30px' }}
                            >
                              {data.count}
                            </div>
                            <span className="text-sm font-semibold text-gray-700 mt-2 text-center">{data.quarter}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 text-center">
                        <p className="text-xs text-gray-500">Y-axis: Number of Urgency Cases | X-axis: Financial Year Quarters</p>
                      </div>
                    </div>

                    {/* Urgency Cases Table */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">Urgency Cases Details</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-xs">
                          <thead>
                            <tr className="bg-gray-200">
                              <th className="border border-gray-400 px-1 py-2 font-semibold text-left">S No</th>
                              <th className="border border-gray-400 px-1 py-2 font-semibold text-left">OHS No<br/>(UNI)</th>
                              <th className="border border-gray-400 px-1 py-2 font-semibold text-left">OHS No<br/>(OH-II)</th>
                              <th className="border border-gray-400 px-1 py-2 font-semibold text-left">Mtrl id</th>
                              <th className="border border-gray-400 px-1 py-2 font-semibold text-left">Sec</th>
                              <th className="border border-gray-400 px-1 py-2 font-semibold text-left">Eqpt</th>
                              <th className="border border-gray-400 px-1 py-2 font-semibold text-left">Part No</th>
                              <th className="border border-gray-400 px-1 py-2 font-semibold text-left">Nomenclature</th>
                              <th className="border border-gray-400 px-1 py-2 font-semibold text-left">Higher Assy</th>
                              <th className="border border-gray-400 px-1 py-2 font-semibold text-left">No Off</th>
                              <th className="border border-gray-400 px-1 py-2 font-semibold text-left">Scale</th>
                              <th className="border border-gray-400 px-1 py-2 font-semibold text-left">OH-II<br/>Scale</th>
                              <th className="border border-gray-400 px-1 py-2 font-semibold text-left">BMPII/IIK<br/>(72)</th>
                              <th className="border border-gray-400 px-1 py-2 font-semibold text-left">CMT<br/>(15)</th>
                              <th className="border border-gray-400 px-1 py-2 font-semibold text-left">OH-II<br/>(48)</th>
                              <th className="border border-gray-400 px-1 py-2 font-semibold text-left">REQD QTY<br/>FOR (135 VEHS)</th>
                              <th className="border border-gray-400 px-1 py-2 font-semibold text-left">ISSUE CF<br/>111 UNI</th>
                              <th className="border border-gray-400 px-1 py-2 font-semibold text-left">ISSUE CF<br/>25 OH-II</th>
                              <th className="border border-gray-400 px-1 py-2 font-semibold text-left">FRESH<br/>20 OH-II</th>
                              <th className="border border-gray-400 px-1 py-2 font-semibold text-left">TOTAL<br/>ISSUE</th>
                              <th className="border border-gray-400 px-1 py-2 font-semibold text-left">OSS<br/>STK</th>
                              <th className="border border-gray-400 px-1 py-2 font-semibold text-left">LM</th>
                              <th className="border border-gray-400 px-1 py-2 font-semibold text-left">LP</th>
                              <th className="border border-gray-400 px-1 py-2 font-semibold text-left">Remarks</th>
                            </tr>
                          </thead>
                          <tbody>
                            {urgencyData.map((item, index) => (
                              <tr key={item.sNo} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}>
                                <td className="border border-gray-300 px-1 py-1 text-center">{item.sNo}</td>
                                <td className="border border-gray-300 px-1 py-1 text-center">{item.ohsNoUni}</td>
                                <td className="border border-gray-300 px-1 py-1 text-center">{item.ohsNoOh2 || '-'}</td>
                                <td className="border border-gray-300 px-1 py-1 text-center font-mono">{item.mtrlId}</td>
                                <td className="border border-gray-300 px-1 py-1 text-center">{item.sec}</td>
                                <td className="border border-gray-300 px-1 py-1 text-center">{item.eqpt}</td>
                                <td className="border border-gray-300 px-1 py-1 text-xs font-mono">{item.partNo}</td>
                                <td className="border border-gray-300 px-1 py-1 text-xs">{item.nomenclature}</td>
                                <td className="border border-gray-300 px-1 py-1 text-xs">{item.higherAssy}</td>
                                <td className="border border-gray-300 px-1 py-1 text-center">{item.noOff}</td>
                                <td className="border border-gray-300 px-1 py-1 text-center">{item.scale}</td>
                                <td className="border border-gray-300 px-1 py-1 text-center">{item.oh2Scale || '-'}</td>
                                <td className="border border-gray-300 px-1 py-1 text-center">{item.bmpiiIik}</td>
                                <td className="border border-gray-300 px-1 py-1 text-center">{item.cmt}</td>
                                <td className="border border-gray-300 px-1 py-1 text-center">{item.oh2}</td>
                                <td className="border border-gray-300 px-1 py-1 text-center font-semibold">{item.reqdQty}</td>
                                <td className="border border-gray-300 px-1 py-1 text-center">{item.issueCf111Uni || '-'}</td>
                                <td className="border border-gray-300 px-1 py-1 text-center">{item.issueCf25Oh2 || '-'}</td>
                                <td className="border border-gray-300 px-1 py-1 text-center">{item.fresh20Oh2 || '-'}</td>
                                <td className="border border-gray-300 px-1 py-1 text-center font-semibold">{item.totalIssue}</td>
                                <td className="border border-gray-300 px-1 py-1 text-center">{item.ossStk}</td>
                                <td className="border border-gray-300 px-1 py-1 text-center">{item.lm || '-'}</td>
                                <td className="border border-gray-300 px-1 py-1 text-center">{item.lp || '-'}</td>
                                <td className="border border-gray-300 px-1 py-1 text-xs">{item.remarks}</td>
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
                    </>
                  );
                })()}
              </div>
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
                <div className="text-sm font-semibold text-gray-900">DGM WKS (MTRL)</div>
                <div className="text-xs text-gray-600">Deputy General Manager Workshop Material</div>
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
