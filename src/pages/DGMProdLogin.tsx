import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginForm from '../LoginForm'

export default function DGMProdLogin() {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [selectedCard, setSelectedCard] = useState<string | null>(null)
  const [lpStatusTab, setLpStatusTab] = useState<'scaled' | 'non-scaled'>('scaled')
  const [lmStatusTab, setLmStatusTab] = useState<'scaled' | 'non-scaled'>('scaled')

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
    { id: 'stock-issued', title: 'Stock Issued', description: 'View stock issuance records and details', color: 'bg-blue-500' },
    { id: 'urgency', title: 'Urgency', description: 'Urgent items and priority tracking', color: 'bg-pink-500' },
    { id: 'lp-items', title: 'LP Status', description: 'Local Purchase status tracking', color: 'bg-indigo-500' },
    { id: 'lm-items', title: 'LM Status', description: 'Local Manufacture status tracking', color: 'bg-purple-500' },
    { id: 'dr-summary', title: 'DR Summary', description: 'Defect Report summary and analysis', color: 'bg-amber-500' },
    { id: 'misc', title: 'MISC', description: 'Miscellaneous items and information', color: 'bg-gray-500' }
  ]

  const handleAccess = (cardId: string) => {
    setSelectedCard(cardId)
  }

  const handleBack = () => {
    setSelectedCard(null)
  }

  if (selectedCard) {
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
          {selectedCard === 'stock-issued' ? (
            <div className="space-y-8">
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
              {(() => {
                const stockIssuedData = [
                  { serialNo: 1, component: 'Valve, Flow Control', section: 'VRD', itemsNotReceived: 5, itemsFaulty: 2, typeOfFault: 'Mechanical Failure' },
                  { serialNo: 2, component: 'Manifold Airline', section: 'ARD', itemsNotReceived: 3, itemsFaulty: 1, typeOfFault: 'Leakage' },
                  { serialNo: 3, component: 'Gear Spur', section: 'SRD', itemsNotReceived: 0, itemsFaulty: 4, typeOfFault: 'Wear & Tear' },
                  { serialNo: 4, component: 'Gear Assembly', section: 'ARD', itemsNotReceived: 2, itemsFaulty: 0, typeOfFault: '-' },
                  { serialNo: 5, component: 'Pedal Control', section: 'ETD', itemsNotReceived: 1, itemsFaulty: 3, typeOfFault: 'Material Defect' },
                  { serialNo: 6, component: 'Hydraulic Cylinder', section: 'VRD', itemsNotReceived: 4, itemsFaulty: 1, typeOfFault: 'Seal Damage' },
                  { serialNo: 7, component: 'Control Valve', section: 'TAR', itemsNotReceived: 0, itemsFaulty: 2, typeOfFault: 'Electrical Issue' },
                  { serialNo: 8, component: 'Bearing Assembly', section: 'SRD', itemsNotReceived: 2, itemsFaulty: 1, typeOfFault: 'Corrosion' }
                ];

                return (
                  <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Stock Issued</h2>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse text-xs">
                        <thead>
                          <tr className="bg-gray-200">
                            <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Serial Number</th>
                            <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Component</th>
                            <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Stock Issued to Section</th>
                            <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Items Not Received</th>
                            <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Items Faulty</th>
                            <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Type of Fault</th>
                          </tr>
                        </thead>
                        <tbody>
                          {stockIssuedData.map((item, index) => (
                            <tr key={item.serialNo} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}>
                              <td className="border border-gray-300 px-3 py-2 text-center">{item.serialNo}</td>
                              <td className="border border-gray-300 px-3 py-2 text-xs">{item.component}</td>
                              <td className="border border-gray-300 px-3 py-2 text-center font-semibold">{item.section}</td>
                              <td className="border border-gray-300 px-3 py-2 text-center">
                                {item.itemsNotReceived > 0 ? (
                                  <span className="px-2 py-1 rounded text-xs font-semibold bg-orange-100 text-orange-800">
                                    {item.itemsNotReceived}
                                  </span>
                                ) : (
                                  <span className="px-2 py-1 rounded text-xs font-semibold bg-green-100 text-green-800">
                                    0
                                  </span>
                                )}
                              </td>
                              <td className="border border-gray-300 px-3 py-2 text-center">
                                {item.itemsFaulty > 0 ? (
                                  <span className="px-2 py-1 rounded text-xs font-semibold bg-red-100 text-red-800">
                                    {item.itemsFaulty}
                                  </span>
                                ) : (
                                  <span className="px-2 py-1 rounded text-xs font-semibold bg-green-100 text-green-800">
                                    0
                                  </span>
                                )}
                              </td>
                              <td className="border border-gray-300 px-3 py-2 text-xs">
                                {item.typeOfFault !== '-' ? (
                                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                    item.typeOfFault === 'Mechanical Failure' ? 'bg-red-100 text-red-800' :
                                    item.typeOfFault === 'Material Defect' ? 'bg-yellow-100 text-yellow-800' :
                                    item.typeOfFault === 'Electrical Issue' ? 'bg-blue-100 text-blue-800' :
                                    item.typeOfFault === 'Wear & Tear' ? 'bg-orange-100 text-orange-800' :
                                    'bg-gray-100 text-gray-800'
                                  }`}>
                                    {item.typeOfFault}
                                  </span>
                                ) : (
                                  <span className="text-gray-400">-</span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              })()}
            </div>
          ) : selectedCard === 'urgency' ? (
            <div className="space-y-8">
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
              {(() => {
                const urgencyData = [
                  {
                    sNo: 1, ohsNoUni: 78, ohsNoOh2: 47, mtrlId: 10260116, sec: 'ARD', eqpt: 'UNI',
                    partNo: '4810-008054 (765-10-SB543)', nomenclature: 'Valve, Flow Control',
                    higherAssy: 'RADIATORS AND COOLERS & GROUP', noOff: 1, scale: 100, oh2Scale: 100,
                    bmpiiIik: 72, cmt: 15, oh2: 48, reqdQty: 135, issueCf111Uni: 111, issueCf25Oh2: 25,
                    fresh20Oh2: 20, totalIssue: 156, ossStk: 'NA', lm: '', lp: '', remarks: '9960246956'
                  },
                  {
                    sNo: 2, ohsNoUni: 689, ohsNoOh2: '', mtrlId: 10281681, sec: 'ARD', eqpt: 'UNI',
                    partNo: '4730-079556 (675-10-SB120)', nomenclature: 'Manifold Airline',
                    higherAssy: 'EJECTOR AND AIR CLEANER', noOff: 1, scale: 70, oh2Scale: '',
                    bmpiiIik: 50.4, cmt: 10.5, oh2: 0, reqdQty: 61, issueCf111Uni: 78, issueCf25Oh2: '',
                    fresh20Oh2: '', totalIssue: 78, ossStk: 'NA', lm: '', lp: '', remarks: 'DR RAISED FOR 79 QTY URGENCY, 9850092483'
                  },
                  {
                    sNo: 3, ohsNoUni: 835.03, ohsNoOh2: 582, mtrlId: 10261112, sec: 'ARD', eqpt: 'UNI',
                    partNo: '3020-002391 (765-12-198)', nomenclature: 'Gear Spur',
                    higherAssy: 'STOPPING BRAKES', noOff: 1, scale: 50, oh2Scale: 40,
                    bmpiiIik: 36, cmt: 7.5, oh2: 19.2, reqdQty: 63, issueCf111Uni: '', issueCf25Oh2: '',
                    fresh20Oh2: '', totalIssue: 66, ossStk: 'NA', lm: '', lp: '', remarks: '9168449606'
                  },
                  {
                    sNo: 4, ohsNoUni: 866, ohsNoOh2: 615, mtrlId: 10260808, sec: 'ARD', eqpt: 'UNI',
                    partNo: '3010-000581 (765-15-SB130)', nomenclature: 'Gear Assembly',
                    higherAssy: 'FINAL DRIVES', noOff: 1, scale: 50, oh2Scale: 70,
                    bmpiiIik: 36, cmt: 7.5, oh2: 33.6, reqdQty: 78, issueCf111Uni: 56, issueCf25Oh2: 18,
                    fresh20Oh2: 14, totalIssue: 88, ossStk: 'NA', lm: '', lp: '', remarks: 'DR RAISED FOR 91 QTY URGENCY, 9844527368'
                  },
                  {
                    sNo: 5, ohsNoUni: 924, ohsNoOh2: 688, mtrlId: 10275712, sec: 'ARD', eqpt: 'UNI',
                    partNo: '2520003186 (765-17-SB324)', nomenclature: 'Pedal Control',
                    higherAssy: 'CONTROL LINKAGES', noOff: 1, scale: 50, oh2Scale: 100,
                    bmpiiIik: 36, cmt: 7.5, oh2: 48, reqdQty: 92, issueCf111Uni: 48, issueCf25Oh2: 5,
                    fresh20Oh2: '', totalIssue: 53, ossStk: 'NA', lm: '', lp: '', remarks: 'DR RAISED FOR 03 QTY, 9326852507'
                  }
                ];
                const urgencyCount = urgencyData.length;
                const urgencyP1Count = 2;
                const urgencyP2Count = 2;
                const urgencyP3Count = 1;
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
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                      <h2 className="text-3xl font-bold text-gray-900 mb-6">Urgency Cases</h2>
                      <div className="mb-8">
                        <div className="bg-gradient-to-br from-pink-50 to-pink-100 border-2 border-pink-200 rounded-lg p-6 shadow-sm max-w-md">
                          <div className="text-pink-700 text-sm mb-1 font-semibold">Total Urgency Cases</div>
                          <div className="text-4xl font-bold text-pink-600">{urgencyCount}</div>
                        </div>
                      </div>
                    </div>

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
          ) : selectedCard === 'lp-items' ? (
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
                    onClick={() => setLpStatusTab('scaled')}
                    className={`px-6 py-3 font-semibold text-sm transition-all ${
                      lpStatusTab === 'scaled'
                        ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    Scaled
                  </button>
                  <button
                    onClick={() => setLpStatusTab('non-scaled')}
                    className={`px-6 py-3 font-semibold text-sm transition-all ${
                      lpStatusTab === 'non-scaled'
                        ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    Non Scaled
                  </button>
                </div>

                {/* Scaled Tab Content */}
                {lpStatusTab === 'scaled' && (
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
                                <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Awt Spare</th>
                                <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Can</th>
                                <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Comp</th>
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
                {lpStatusTab === 'non-scaled' && (
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

                {/* Summary Cards for LP Status */}
                <div className="mt-6 grid grid-cols-3 gap-4">
                  <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                    <div className="text-blue-700 text-sm font-semibold mb-1">AWT MTRL</div>
                    <div className="text-2xl font-bold text-blue-600">
                      {lpStatusTab === 'scaled' ? 17 : 68}
                    </div>
                  </div>
                  <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                    <div className="text-green-700 text-sm font-semibold mb-1">SO PLACED</div>
                    <div className="text-2xl font-bold text-green-600">
                      {lpStatusTab === 'scaled' ? 13 : 56}
                    </div>
                  </div>
                  <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
                    <div className="text-yellow-700 text-sm font-semibold mb-1">ENQ/U/ENQ</div>
                    <div className="text-2xl font-bold text-yellow-600">
                      {lpStatusTab === 'scaled' ? 36 : 19}
                    </div>
                  </div>
                </div>

                {/* Summary Cards Bar Graph */}
                <div className="mt-8 bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-10">Summary Cards Visualization</h4>
                  <div className="flex items-end justify-around h-80 border-l-2 border-b-2 border-gray-400 pl-4 pb-4 gap-4 mt-6">
                    {(() => {
                      const awtMtrl = lpStatusTab === 'scaled' ? 17 : 68;
                      const soPlaced = lpStatusTab === 'scaled' ? 13 : 56;
                      const enq = lpStatusTab === 'scaled' ? 36 : 19;
                      const maxValue = Math.max(awtMtrl, soPlaced, enq, 1);
                      
                      return (
                        <>
                          <div className="flex flex-col items-center gap-2 flex-1">
                            <div
                              className="w-full bg-gradient-to-t from-blue-600 to-blue-400 flex items-start justify-center text-white font-bold text-sm pt-2 rounded-t-lg hover:from-blue-700 hover:to-blue-500 transition-all"
                              style={{ height: `${(awtMtrl / maxValue) * 300}px`, minHeight: '30px' }}
                              title={`AWT MTRL: ${awtMtrl}`}
                            >
                              {awtMtrl}
                            </div>
                            <span className="text-xs font-semibold text-gray-700 mt-2 text-center">AWT MTRL</span>
                          </div>
                          <div className="flex flex-col items-center gap-2 flex-1">
                            <div
                              className="w-full bg-gradient-to-t from-green-600 to-green-400 flex items-start justify-center text-white font-bold text-sm pt-2 rounded-t-lg hover:from-green-700 hover:to-green-500 transition-all"
                              style={{ height: `${(soPlaced / maxValue) * 300}px`, minHeight: '30px' }}
                              title={`SO PLACED: ${soPlaced}`}
                            >
                              {soPlaced}
                            </div>
                            <span className="text-xs font-semibold text-gray-700 mt-2 text-center">SO PLACED</span>
                          </div>
                          <div className="flex flex-col items-center gap-2 flex-1">
                            <div
                              className="w-full bg-gradient-to-t from-yellow-600 to-yellow-400 flex items-start justify-center text-white font-bold text-sm pt-2 rounded-t-lg hover:from-yellow-700 hover:to-yellow-500 transition-all"
                              style={{ height: `${(enq / maxValue) * 300}px`, minHeight: '30px' }}
                              title={`ENQ/U/ENQ: ${enq}`}
                            >
                              {enq}
                            </div>
                            <span className="text-xs font-semibold text-gray-700 mt-2 text-center">ENQ/U/ENQ</span>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </div>

                {/* Graph - Section-wise Distribution */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mt-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Section-wise Grand Total Distribution</h3>
                  <div className="flex items-end justify-around h-96 border-l-2 border-b-2 border-gray-400 pl-4 pb-4 mt-4">
                    {(() => {
                      const scaledData = [
                        { sec: 'ARD', grandTotal: 23 },
                        { sec: 'ARMT', grandTotal: 10 },
                        { sec: 'ENG', grandTotal: 10 },
                        { sec: 'ETD', grandTotal: 11 },
                        { sec: 'INST', grandTotal: 5 },
                        { sec: 'SRD', grandTotal: 14 },
                        { sec: 'T&R', grandTotal: 12 },
                        { sec: 'VRD', grandTotal: 12 }
                      ];
                      const nonScaledData = [
                        { sec: 'ARD', grandTotal: 24 },
                        { sec: 'ARMT', grandTotal: 10 },
                        { sec: 'ENG', grandTotal: 20 },
                        { sec: 'ETD', grandTotal: 98 },
                        { sec: 'INST', grandTotal: 19 },
                        { sec: 'SRD', grandTotal: 18 },
                        { sec: 'T&R', grandTotal: 3 },
                        { sec: 'VRD', grandTotal: 34 }
                      ];
                      const data = lpStatusTab === 'scaled' ? scaledData : nonScaledData;
                      const maxValue = Math.max(...data.map(d => d.grandTotal));
                      const colors = ['bg-indigo-500', 'bg-blue-500', 'bg-green-500', 'bg-orange-500', 'bg-pink-500', 'bg-cyan-500', 'bg-yellow-500', 'bg-red-500'];
                      
                      return data.map((row, index) => {
                        const height = (row.grandTotal / maxValue) * 320;
                        return (
                          <div key={row.sec} className="flex flex-col items-center gap-2">
                            <div
                              className={`w-16 ${colors[index % colors.length]} flex items-start justify-center text-white font-bold text-xs pt-2 rounded-t-lg hover:opacity-80 transition-all`}
                              style={{ height: `${height}px`, minHeight: '30px' }}
                              title={`${row.sec}: ${row.grandTotal}`}
                            >
                              {row.grandTotal}
                            </div>
                            <span className="text-xs font-semibold text-gray-700 mt-2 text-center">{row.sec}</span>
                          </div>
                        );
                      });
                    })()}
                  </div>
                </div>
              </div>
            </div>
          ) : selectedCard === 'lm-items' ? (
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
                    onClick={() => setLmStatusTab('scaled')}
                    className={`px-6 py-3 font-semibold text-sm transition-all ${
                      lmStatusTab === 'scaled'
                        ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    Scaled
                  </button>
                  <button
                    onClick={() => setLmStatusTab('non-scaled')}
                    className={`px-6 py-3 font-semibold text-sm transition-all ${
                      lmStatusTab === 'non-scaled'
                        ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    Non Scaled
                  </button>
                </div>

                {/* Scaled Tab Content */}
                {lmStatusTab === 'scaled' && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Status</h3>
                    
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

                          {/* Summary Cards Bar Graph */}
                          <div className="mt-8 bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                            <h4 className="text-xl font-bold text-gray-900 mb-8">Summary Cards Visualization</h4>
                            <div className="flex items-end justify-around h-80 border-l-2 border-b-2 border-gray-400 pl-4 pb-4 gap-2 mt-6">
                              {(() => {
                                const maxValue = Math.max(grandTotals.awtMtrl, grandTotals.can, grandTotals.comp, grandTotals.oss, grandTotals.woRel, grandTotals.meCell, 1);
                                return (
                                  <>
                                    <div className="flex flex-col items-center gap-2 flex-1">
                                      <div
                                        className="w-full bg-gradient-to-t from-blue-600 to-blue-400 flex items-start justify-center text-white font-bold text-xs pt-2 rounded-t-lg hover:from-blue-700 hover:to-blue-500 transition-all"
                                        style={{ height: `${(grandTotals.awtMtrl / maxValue) * 300}px`, minHeight: '30px' }}
                                        title={`Awt Mtrl: ${grandTotals.awtMtrl}`}
                                      >
                                        {grandTotals.awtMtrl}
                                      </div>
                                      <span className="text-xs font-semibold text-gray-700 mt-2 text-center">Awt Mtrl</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2 flex-1">
                                      <div
                                        className="w-full bg-gradient-to-t from-green-600 to-green-400 flex items-start justify-center text-white font-bold text-xs pt-2 rounded-t-lg hover:from-green-700 hover:to-green-500 transition-all"
                                        style={{ height: `${(grandTotals.can / maxValue) * 300}px`, minHeight: '30px' }}
                                        title={`Can: ${grandTotals.can}`}
                                      >
                                        {grandTotals.can}
                                      </div>
                                      <span className="text-xs font-semibold text-gray-700 mt-2 text-center">Can</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2 flex-1">
                                      <div
                                        className="w-full bg-gradient-to-t from-purple-600 to-purple-400 flex items-start justify-center text-white font-bold text-xs pt-2 rounded-t-lg hover:from-purple-700 hover:to-purple-500 transition-all"
                                        style={{ height: `${(grandTotals.comp / maxValue) * 300}px`, minHeight: '30px' }}
                                        title={`Comp: ${grandTotals.comp}`}
                                      >
                                        {grandTotals.comp}
                                      </div>
                                      <span className="text-xs font-semibold text-gray-700 mt-2 text-center">Comp</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2 flex-1">
                                      <div
                                        className="w-full bg-gradient-to-t from-orange-600 to-orange-400 flex items-start justify-center text-white font-bold text-xs pt-2 rounded-t-lg hover:from-orange-700 hover:to-orange-500 transition-all"
                                        style={{ height: `${(grandTotals.oss / maxValue) * 300}px`, minHeight: '30px' }}
                                        title={`OSS: ${grandTotals.oss}`}
                                      >
                                        {grandTotals.oss}
                                      </div>
                                      <span className="text-xs font-semibold text-gray-700 mt-2 text-center">OSS</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2 flex-1">
                                      <div
                                        className="w-full bg-gradient-to-t from-teal-600 to-teal-400 flex items-start justify-center text-white font-bold text-xs pt-2 rounded-t-lg hover:from-teal-700 hover:to-teal-500 transition-all"
                                        style={{ height: `${(grandTotals.woRel / maxValue) * 300}px`, minHeight: '30px' }}
                                        title={`WO Rel: ${grandTotals.woRel}`}
                                      >
                                        {grandTotals.woRel}
                                      </div>
                                      <span className="text-xs font-semibold text-gray-700 mt-2 text-center">WO Rel</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2 flex-1">
                                      <div
                                        className="w-full bg-gradient-to-t from-pink-600 to-pink-400 flex items-start justify-center text-white font-bold text-xs pt-2 rounded-t-lg hover:from-pink-700 hover:to-pink-500 transition-all"
                                        style={{ height: `${(grandTotals.meCell / maxValue) * 300}px`, minHeight: '30px' }}
                                        title={`ME Cell: ${grandTotals.meCell}`}
                                      >
                                        {grandTotals.meCell}
                                      </div>
                                      <span className="text-xs font-semibold text-gray-700 mt-2 text-center">ME Cell</span>
                                    </div>
                                  </>
                                );
                              })()}
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}

                {/* Non Scaled Tab Content */}
                {lmStatusTab === 'non-scaled' && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Status</h3>
                    
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

                          {/* Summary Cards Bar Graph */}
                          <div className="mt-8 bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                            <h4 className="text-xl font-bold text-gray-900 mb-8">Summary Cards Visualization</h4>
                            <div className="flex items-end justify-around h-80 border-l-2 border-b-2 border-gray-400 pl-4 pb-4 gap-2 mt-6">
                              {(() => {
                                const maxValue = Math.max(grandTotals.awtMtrl, grandTotals.can, grandTotals.comp, grandTotals.ess, grandTotals.woRel, grandTotals.meCell, 1);
                                return (
                                  <>
                                    <div className="flex flex-col items-center gap-2 flex-1">
                                      <div
                                        className="w-full bg-gradient-to-t from-blue-600 to-blue-400 flex items-start justify-center text-white font-bold text-xs pt-2 rounded-t-lg hover:from-blue-700 hover:to-blue-500 transition-all"
                                        style={{ height: `${(grandTotals.awtMtrl / maxValue) * 300}px`, minHeight: '30px' }}
                                        title={`Awt Mtrl: ${grandTotals.awtMtrl}`}
                                      >
                                        {grandTotals.awtMtrl}
                                      </div>
                                      <span className="text-xs font-semibold text-gray-700 mt-2 text-center">Awt Mtrl</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2 flex-1">
                                      <div
                                        className="w-full bg-gradient-to-t from-green-600 to-green-400 flex items-start justify-center text-white font-bold text-xs pt-2 rounded-t-lg hover:from-green-700 hover:to-green-500 transition-all"
                                        style={{ height: `${(grandTotals.can / maxValue) * 300}px`, minHeight: '30px' }}
                                        title={`Can: ${grandTotals.can}`}
                                      >
                                        {grandTotals.can}
                                      </div>
                                      <span className="text-xs font-semibold text-gray-700 mt-2 text-center">Can</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2 flex-1">
                                      <div
                                        className="w-full bg-gradient-to-t from-purple-600 to-purple-400 flex items-start justify-center text-white font-bold text-xs pt-2 rounded-t-lg hover:from-purple-700 hover:to-purple-500 transition-all"
                                        style={{ height: `${(grandTotals.comp / maxValue) * 300}px`, minHeight: '30px' }}
                                        title={`Comp: ${grandTotals.comp}`}
                                      >
                                        {grandTotals.comp}
                                      </div>
                                      <span className="text-xs font-semibold text-gray-700 mt-2 text-center">Comp</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2 flex-1">
                                      <div
                                        className="w-full bg-gradient-to-t from-orange-600 to-orange-400 flex items-start justify-center text-white font-bold text-xs pt-2 rounded-t-lg hover:from-orange-700 hover:to-orange-500 transition-all"
                                        style={{ height: `${(grandTotals.ess / maxValue) * 300}px`, minHeight: '30px' }}
                                        title={`ESS: ${grandTotals.ess}`}
                                      >
                                        {grandTotals.ess}
                                      </div>
                                      <span className="text-xs font-semibold text-gray-700 mt-2 text-center">ESS</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2 flex-1">
                                      <div
                                        className="w-full bg-gradient-to-t from-teal-600 to-teal-400 flex items-start justify-center text-white font-bold text-xs pt-2 rounded-t-lg hover:from-teal-700 hover:to-teal-500 transition-all"
                                        style={{ height: `${(grandTotals.woRel / maxValue) * 300}px`, minHeight: '30px' }}
                                        title={`WO Rel: ${grandTotals.woRel}`}
                                      >
                                        {grandTotals.woRel}
                                      </div>
                                      <span className="text-xs font-semibold text-gray-700 mt-2 text-center">WO Rel</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2 flex-1">
                                      <div
                                        className="w-full bg-gradient-to-t from-pink-600 to-pink-400 flex items-start justify-center text-white font-bold text-xs pt-2 rounded-t-lg hover:from-pink-700 hover:to-pink-500 transition-all"
                                        style={{ height: `${(grandTotals.meCell / maxValue) * 300}px`, minHeight: '30px' }}
                                        title={`ME Cell: ${grandTotals.meCell}`}
                                      >
                                        {grandTotals.meCell}
                                      </div>
                                      <span className="text-xs font-semibold text-gray-700 mt-2 text-center">ME Cell</span>
                                    </div>
                                  </>
                                );
                              })()}
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}

                {/* Graph - Section-wise Distribution */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mt-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Section-wise Grand Total Distribution</h3>
                  <div className="flex items-end justify-around h-96 border-l-2 border-b-2 border-gray-400 pl-4 pb-4 mt-4">
                    {(() => {
                      const scaledData = [
                        { sec: 'ARD', grandTotal: 37 },
                        { sec: 'ARMT', grandTotal: 38 },
                        { sec: 'ETD', grandTotal: 2 },
                        { sec: 'SRD', grandTotal: 60 },
                        { sec: 'T&R', grandTotal: 14 },
                        { sec: 'VRD', grandTotal: 30 }
                      ];
                      const nonScaledData = [
                        { sec: 'ARD', grandTotal: 5 },
                        { sec: 'ARMT', grandTotal: 5 },
                        { sec: 'ENG', grandTotal: 17 },
                        { sec: 'ETD', grandTotal: 50 },
                        { sec: 'INST', grandTotal: 18 },
                        { sec: 'SRD', grandTotal: 46 },
                        { sec: 'T&R', grandTotal: 8 },
                        { sec: 'VRD', grandTotal: 26 }
                      ];
                      const data = lmStatusTab === 'scaled' ? scaledData : nonScaledData;
                      const maxValue = Math.max(...data.map(d => d.grandTotal));
                      const colors = ['bg-purple-500', 'bg-blue-500', 'bg-green-500', 'bg-orange-500', 'bg-pink-500', 'bg-cyan-500', 'bg-yellow-500', 'bg-red-500'];
                      
                      return data.map((row, index) => {
                        const height = (row.grandTotal / maxValue) * 320;
                        return (
                          <div key={row.sec} className="flex flex-col items-center gap-2">
                            <div
                              className={`w-16 ${colors[index % colors.length]} flex items-start justify-center text-white font-bold text-xs pt-2 rounded-t-lg hover:opacity-80 transition-all`}
                              style={{ height: `${height}px`, minHeight: '30px' }}
                              title={`${row.sec}: ${row.grandTotal}`}
                            >
                              {row.grandTotal}
                            </div>
                            <span className="text-xs font-semibold text-gray-700 mt-2 text-center">{row.sec}</span>
                          </div>
                        );
                      });
                    })()}
                  </div>
                </div>
              </div>
            </div>
          ) : selectedCard === 'dr-summary' ? (
            <div className="space-y-8">
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
              {(() => {
                const quarterlyDrData = [
                  { quarter: 'Q1 2024-25', count: 25 },
                  { quarter: 'Q2 2024-25', count: 32 },
                  { quarter: 'Q3 2024-25', count: 28 },
                  { quarter: 'Q4 2024-25', count: 35 }
                ];
                const sectionDrData = [
                  { section: 'VRD', count: 18, percentage: 15.0 },
                  { section: 'ARD', count: 25, percentage: 20.8 },
                  { section: 'SRD', count: 30, percentage: 25.0 },
                  { section: 'ETD', count: 22, percentage: 18.3 },
                  { section: 'T&R', count: 15, percentage: 12.5 },
                  { section: 'Others', count: 10, percentage: 8.3 }
                ];
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
                const defectTypeData = [
                  { type: 'Mechanical Failure', count: 45 },
                  { type: 'Material Defect', count: 28 },
                  { type: 'Electrical Issue', count: 22 },
                  { type: 'Wear & Tear', count: 18 },
                  { type: 'Corrosion', count: 7 }
                ];
                const maxQuarterlyCount = Math.max(...quarterlyDrData.map(d => d.count));
                const maxDefectTypeCount = Math.max(...defectTypeData.map(d => d.count));
                const totalSectionCount = sectionDrData.reduce((sum, item) => sum + item.count, 0);

                return (
                  <>
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

                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">Types of Defects Occurring</h3>
                      <div className="flex items-end justify-around h-96 border-l-2 border-b-2 border-gray-400 pl-4 pb-4 mt-4">
                        {defectTypeData.map((data) => (
                          <div key={data.type} className="flex flex-col items-center gap-2">
                            <div
                              className="w-28 bg-gradient-to-t from-orange-600 to-orange-400 flex items-start justify-center text-white font-bold text-xs pt-2 rounded-t-lg hover:from-orange-700 hover:to-orange-500 transition-all"
                              style={{ height: `${(data.count / maxDefectTypeCount) * 320}px`, minHeight: '30px' }}
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

