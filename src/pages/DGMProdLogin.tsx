import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginForm from '../LoginForm'

export default function DGMProdLogin() {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [selectedCard, setSelectedCard] = useState<string | null>(null)

  if (!isLoggedIn) {
    return (
      <LoginForm
        title="DGM Prod"
        subtitle="Deputy General Manager Production Dashboard"
        onLoginSuccess={() => setIsLoggedIn(true)}
      />
    )
  }

  const cards = [
    { id: 'target', title: 'Target', description: 'View production targets and goals', color: 'bg-blue-500' },
    { id: 'ct-issue', title: 'CT Issue', description: 'Component tracking and issue management', color: 'bg-green-500' },
    { id: 'critical-items', title: 'Critical Items', description: 'Monitor critical inventory items', color: 'bg-red-500' }
  ]

  const handleAccess = (cardId: string) => {
    setSelectedCard(cardId)
  }

  const handleBack = () => {
    setSelectedCard(null)
  }

  if (selectedCard) {
    // CT Issue Data (from GM WKS MTRL)
    const ctIssueData = [
      { serNo: 1, ohsSerNo: 1, compNo: 6435, mtrlNo: 10234632, cosSection: 'LV2/ICVS', partNo: '5330-390235 (675-10-29-01)', nomenclature: 'SEAL PLAIN (CUP)', noOff: 1, scale: 80, reqdQty: '', issueQty: '' },
      { serNo: 2, ohsSerNo: 2, compNo: 25189, mtrlNo: 10264521, cosSection: 'LV2/ICVS', partNo: '5330-390228 (675-10-20-03)', nomenclature: 'RETAINER PACKING', noOff: 1, scale: 80, reqdQty: '', issueQty: '' },
      { serNo: 3, ohsSerNo: 3, compNo: 6432, mtrlNo: 10257575, cosSection: 'LV2/ICVS', partNo: '4730-079089 (675-10-27)', nomenclature: 'ADAPTOR BUSHING', noOff: 1, scale: 50, reqdQty: '', issueQty: '' },
      { serNo: 4, ohsSerNo: 4, compNo: 6423, mtrlNo: 10255675, cosSection: 'LV2/ICVS', partNo: '5331-002747 (675-10-19) (5331720323423)', nomenclature: "'O' RING", noOff: 1, scale: 80, reqdQty: '', issueQty: '' },
      { serNo: 5, ohsSerNo: 5, compNo: 6431, mtrlNo: 10264534, cosSection: 'LV2/ICVS', partNo: '5330-390184 (675-10-26-01)', nomenclature: 'GASKET', noOff: 2, scale: 160, reqdQty: '', issueQty: '' }
    ];

    // Critical Items Data (from GM WKS MTRL)
    const criticalItemsData = [
      { serial: 1, partNumber: 'PT-2401', ohsScale: '1:50', nomenclature: 'Hydraulic Pump Assembly', section: 'VRD', criticalityStatus: 'P1' },
      { serial: 2, partNumber: 'PT-2402', ohsScale: '1:75', nomenclature: 'Engine Gasket Set', section: 'ARD', criticalityStatus: 'P2' },
      { serial: 3, partNumber: 'PT-2403', ohsScale: '1:30', nomenclature: 'Brake Pad Assembly', section: 'SRD', criticalityStatus: 'P1' },
      { serial: 4, partNumber: 'PT-2404', ohsScale: '1:100', nomenclature: 'Oil Filter Element', section: 'VRD', criticalityStatus: 'P3' },
      { serial: 5, partNumber: 'PT-2405', ohsScale: '1:40', nomenclature: 'Clutch Plate Set', section: 'ARD', criticalityStatus: 'P1' },
      { serial: 6, partNumber: 'PT-2406', ohsScale: '1:60', nomenclature: 'Radiator Core', section: 'ETD', criticalityStatus: 'P2' },
      { serial: 7, partNumber: 'PT-2407', ohsScale: '1:25', nomenclature: 'Fuel Injection Pump', section: 'VRD', criticalityStatus: 'P1' },
      { serial: 8, partNumber: 'PT-2408', ohsScale: '1:80', nomenclature: 'Alternator Assembly', section: 'TAR', criticalityStatus: 'P2' },
      { serial: 9, partNumber: 'PT-2409', ohsScale: '1:35', nomenclature: 'Steering Box Assembly', section: 'SRD', criticalityStatus: 'P1' },
      { serial: 10, partNumber: 'PT-2410', ohsScale: '1:90', nomenclature: 'Water Pump', section: 'ARD', criticalityStatus: 'P3' },
      { serial: 11, partNumber: 'PT-2411', ohsScale: '1:45', nomenclature: 'Suspension Spring', section: 'ETD', criticalityStatus: 'P2' },
      { serial: 12, partNumber: 'PT-2412', ohsScale: '1:55', nomenclature: 'Transmission Gear Set', section: 'TAR', criticalityStatus: 'P1' }
    ];

    // Graph 1 Data: Items by Section and Criticality
    const sectionCriticalityData = [
      { section: 'VRD', p1: 2, p2: 0, p3: 1 },
      { section: 'ARD', p1: 1, p2: 1, p3: 1 },
      { section: 'SRD', p1: 2, p2: 0, p3: 0 },
      { section: 'ETD', p1: 0, p2: 2, p3: 0 },
      { section: 'TAR', p1: 1, p2: 1, p3: 0 }
    ];

    // Graph 2 Data: Critical Items Count by Quarter
    const quarterlyData = [
      { quarter: 'Q1 2024-25', count: 15 },
      { quarter: 'Q2 2024-25', count: 18 },
      { quarter: 'Q3 2024-25', count: 22 },
      { quarter: 'Q4 2024-25', count: 12 }
    ];

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
        {/* Top Navigation Bar */}
        <div className="bg-white border-b border-gray-200 shadow-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={handleBack}
                  className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-cyan-800 bg-clip-text text-transparent hover:from-cyan-700 hover:to-cyan-900 transition-all"
                >
                  512 Army Base ERP
                </button>
                <div className="h-8 w-px bg-gray-300"></div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">DGM Prod</div>
                  <div className="text-xs text-gray-600">Deputy General Manager Production</div>
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
          ) : selectedCard === 'critical-items' ? (
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
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Critical Items Status</h2>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="border border-gray-400 px-4 py-3 font-semibold text-left">Serial Number</th>
                        <th className="border border-gray-400 px-4 py-3 font-semibold text-left">Part Number</th>
                        <th className="border border-gray-400 px-4 py-3 font-semibold text-left">OHS Scale</th>
                        <th className="border border-gray-400 px-4 py-3 font-semibold text-left">Nomenclature</th>
                        <th className="border border-gray-400 px-4 py-3 font-semibold text-left">Section</th>
                        <th className="border border-gray-400 px-4 py-3 font-semibold text-left">Criticality Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {criticalItemsData.map((item) => (
                        <tr key={item.serial} className="hover:bg-gray-50">
                          <td className="border border-gray-300 px-4 py-2 text-center">{item.serial}</td>
                          <td className="border border-gray-300 px-4 py-2 font-mono">{item.partNumber}</td>
                          <td className="border border-gray-300 px-4 py-2 text-center">{item.ohsScale}</td>
                          <td className="border border-gray-300 px-4 py-2">{item.nomenclature}</td>
                          <td className="border border-gray-300 px-4 py-2 text-center font-semibold">{item.section}</td>
                          <td className="border border-gray-300 px-4 py-2 text-center">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-bold ${
                                item.criticalityStatus === 'P1'
                                  ? 'bg-red-100 text-red-800'
                                  : item.criticalityStatus === 'P2'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-green-100 text-green-800'
                              }`}
                            >
                              {item.criticalityStatus}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Graph 1: Items by Section and Criticality */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Graph 1: Critical Items by Section</h3>
                <p className="text-gray-600 mb-6 text-sm">Distribution of items across different sections by criticality level</p>
                <div className="flex items-end justify-around h-80 border-l-2 border-b-2 border-gray-400 pl-4 pb-4">
                  {sectionCriticalityData.map((data) => (
                    <div key={data.section} className="flex flex-col items-center gap-2">
                      <div className="flex flex-col items-center gap-1">
                        {/* P1 */}
                        {data.p1 > 0 && (
                          <div
                            className="w-16 bg-red-500 flex items-end justify-center text-white font-bold text-xs pb-1"
                            style={{ height: `${data.p1 * 30}px` }}
                          >
                            {data.p1}
                          </div>
                        )}
                        {/* P2 */}
                        {data.p2 > 0 && (
                          <div
                            className="w-16 bg-yellow-500 flex items-end justify-center text-white font-bold text-xs pb-1"
                            style={{ height: `${data.p2 * 30}px` }}
                          >
                            {data.p2}
                          </div>
                        )}
                        {/* P3 */}
                        {data.p3 > 0 && (
                          <div
                            className="w-16 bg-green-500 flex items-end justify-center text-white font-bold text-xs pb-1"
                            style={{ height: `${data.p3 * 30}px` }}
                          >
                            {data.p3}
                          </div>
                        )}
                      </div>
                      <span className="text-sm font-semibold text-gray-700 mt-2">{data.section}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center gap-6 mt-6">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded"></div>
                    <span className="text-sm">P1</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                    <span className="text-sm">P2</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span className="text-sm">P3</span>
                  </div>
                </div>
              </div>

              {/* Graph 2: Critical Items Count by Quarter */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Graph 2: Critical Items Count by Quarter</h3>
                <p className="text-gray-600 mb-6 text-sm">Quarterly trend of critical items identified</p>
                <div className="flex items-end justify-around h-80 border-l-2 border-b-2 border-gray-400 pl-4 pb-4">
                  {quarterlyData.map((data) => (
                    <div key={data.quarter} className="flex flex-col items-center gap-2">
                      <div
                        className="w-24 bg-gradient-to-t from-blue-600 to-blue-400 flex items-start justify-center text-white font-bold text-sm pt-2 rounded-t-lg hover:from-blue-700 hover:to-blue-500 transition-all"
                        style={{ height: `${data.count * 12}px` }}
                      >
                        {data.count}
                      </div>
                      <span className="text-sm font-semibold text-gray-700 mt-2 text-center">{data.quarter}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <p className="text-xs text-gray-500">Y-axis: Count of Critical Items | X-axis: Financial Year Quarters</p>
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
          ) : null}
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
                className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-cyan-800 bg-clip-text text-transparent hover:from-cyan-700 hover:to-cyan-900 transition-all"
              >
                512 Army Base ERP
              </button>
              <div className="h-8 w-px bg-gray-300"></div>
              <div>
                <div className="text-sm font-semibold text-gray-900">DGM Prod</div>
                <div className="text-xs text-gray-600">Deputy General Manager Production</div>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cards.map((card) => (
              <div
                key={card.id}
                onClick={() => handleAccess(card.id)}
                className="bg-white rounded-xl shadow-lg border-2 border-gray-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
              >
                <div className={`${card.color} h-32 rounded-t-xl flex items-center justify-center`}>
                  <h3 className="text-2xl font-bold text-white text-center px-4">{card.title}</h3>
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

