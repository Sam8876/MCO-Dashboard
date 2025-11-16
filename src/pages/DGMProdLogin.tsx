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
    { id: 'stock-issued', title: 'Stock Issued', description: 'View stock issuance records and details', color: 'bg-blue-500' },
    { id: 'urgency', title: 'Urgency', description: 'Urgent items and priority tracking', color: 'bg-pink-500' },
    { id: 'lp-items', title: 'LP Items', description: 'Local Purchase items tracking', color: 'bg-indigo-500' },
    { id: 'lm-items', title: 'LM Items', description: 'Local Manufacture items tracking', color: 'bg-purple-500' },
    { id: 'dr-summary', title: 'DR Summary', description: 'Defect Report summary and analysis', color: 'bg-amber-500' }
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
                const lpItemsData = [
                  { serialNo: 1, component: 'Valve, Flow Control', soNumber: 'SO-2024-001', expectedDateOfArrival: '15/03/2024', billPaymentStatus: 'Paid', supplyOrderDate: '01/02/2024' },
                  { serialNo: 2, component: 'Manifold Airline', soNumber: 'SO-2024-002', expectedDateOfArrival: '22/03/2024', billPaymentStatus: 'Pending', supplyOrderDate: '05/02/2024' },
                  { serialNo: 3, component: 'Gear Spur', soNumber: 'SO-2024-003', expectedDateOfArrival: '18/03/2024', billPaymentStatus: 'Paid', supplyOrderDate: '08/02/2024' },
                  { serialNo: 4, component: 'Gear Assembly', soNumber: 'SO-2024-004', expectedDateOfArrival: '25/03/2024', billPaymentStatus: 'In Process', supplyOrderDate: '10/02/2024' },
                  { serialNo: 5, component: 'Pedal Control', soNumber: 'SO-2024-005', expectedDateOfArrival: '20/03/2024', billPaymentStatus: 'Paid', supplyOrderDate: '12/02/2024' },
                  { serialNo: 6, component: 'Hydraulic Cylinder', soNumber: 'SO-2024-006', expectedDateOfArrival: '28/03/2024', billPaymentStatus: 'Pending', supplyOrderDate: '15/02/2024' },
                  { serialNo: 7, component: 'Control Valve', soNumber: 'SO-2024-007', expectedDateOfArrival: '16/03/2024', billPaymentStatus: 'Paid', supplyOrderDate: '18/02/2024' },
                  { serialNo: 8, component: 'Bearing Assembly', soNumber: 'SO-2024-008', expectedDateOfArrival: '24/03/2024', billPaymentStatus: 'In Process', supplyOrderDate: '20/02/2024' }
                ];

                // Payment Status Summary
                const paidCount = lpItemsData.filter(item => item.billPaymentStatus === 'Paid').length;
                const pendingCount = lpItemsData.filter(item => item.billPaymentStatus === 'Pending').length;
                const inProcessCount = lpItemsData.filter(item => item.billPaymentStatus === 'In Process').length;
                const totalCount = lpItemsData.length;
                const paidPercentage = (paidCount / totalCount) * 100;
                const pendingPercentage = (pendingCount / totalCount) * 100;
                const inProcessPercentage = (inProcessCount / totalCount) * 100;

                // Expected arrivals per month
                const monthlyArrivals = [
                  { month: 'Mar 2024', count: 5 },
                  { month: 'Apr 2024', count: 2 },
                  { month: 'May 2024', count: 1 }
                ];
                const maxMonthlyArrivals = Math.max(...monthlyArrivals.map(m => m.count));

                return (
                  <>
                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 border-2 border-indigo-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
                        <div className="text-indigo-700 text-sm mb-1 font-semibold">Total LP Items</div>
                        <div className="text-3xl font-bold text-indigo-600">{totalCount}</div>
                      </div>
                      <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
                        <div className="text-green-700 text-sm mb-1 font-semibold">Paid</div>
                        <div className="text-3xl font-bold text-green-600">{paidCount}</div>
                        <div className="text-sm text-green-500 mt-1">{paidPercentage.toFixed(1)}%</div>
                      </div>
                      <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
                        <div className="text-orange-700 text-sm mb-1 font-semibold">Pending</div>
                        <div className="text-3xl font-bold text-orange-600">{pendingCount}</div>
                        <div className="text-sm text-orange-500 mt-1">{pendingPercentage.toFixed(1)}%</div>
                      </div>
                      <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
                        <div className="text-yellow-700 text-sm mb-1 font-semibold">In Process</div>
                        <div className="text-3xl font-bold text-yellow-600">{inProcessCount}</div>
                        <div className="text-sm text-yellow-500 mt-1">{inProcessPercentage.toFixed(1)}%</div>
                      </div>
                    </div>

                    {/* Pie Chart - Payment Status Distribution */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">Bill Payment Status Distribution</h3>
                      <div className="flex flex-col items-center">
                        <div className="relative w-80 h-80">
                          <svg viewBox="0 0 200 200" className="w-full h-full">
                            {(() => {
                              const colors = ['#22c55e', '#f97316', '#eab308']; // Green for Paid, Orange for Pending, Yellow for In Process
                              const percentages = [paidPercentage, pendingPercentage, inProcessPercentage];
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
                            <div className="text-sm font-semibold">Paid: {paidCount} ({paidPercentage.toFixed(1)}%)</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-orange-500 rounded"></div>
                            <div className="text-sm font-semibold">Pending: {pendingCount} ({pendingPercentage.toFixed(1)}%)</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                            <div className="text-sm font-semibold">In Process: {inProcessCount} ({inProcessPercentage.toFixed(1)}%)</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Graph: Expected Arrivals per Month */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">Expected Arrivals per Month</h3>
                      <div className="flex items-end justify-around h-96 border-l-2 border-b-2 border-gray-400 pl-4 pb-4">
                        {monthlyArrivals.map((data) => (
                          <div key={data.month} className="flex flex-col items-center gap-2 flex-1">
                            <div
                              className="w-full bg-gradient-to-t from-indigo-600 to-indigo-400 flex items-start justify-center text-white font-bold text-sm pt-2 rounded-t-lg hover:from-indigo-700 hover:to-indigo-500 transition-all"
                              style={{ height: `${(data.count / maxMonthlyArrivals) * 350}px`, minHeight: '30px' }}
                            >
                              {data.count}
                            </div>
                            <span className="text-sm font-semibold text-gray-700 mt-2 text-center">{data.month}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 text-center">
                        <p className="text-xs text-gray-500">Y-axis: Number of Items | X-axis: Months</p>
                      </div>
                    </div>

                    {/* LP Items Table */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                      <h2 className="text-3xl font-bold text-gray-900 mb-6">LP Items</h2>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-xs">
                          <thead>
                            <tr className="bg-gray-200">
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Serial Number</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Component</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">SO Number</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Expected Date of Arrival</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Bill Payment Status</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Supply Order Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {lpItemsData.map((item, index) => (
                              <tr key={item.serialNo} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}>
                                <td className="border border-gray-300 px-3 py-2 text-center">{item.serialNo}</td>
                                <td className="border border-gray-300 px-3 py-2 text-xs">{item.component}</td>
                                <td className="border border-gray-300 px-3 py-2 text-center font-mono font-semibold">{item.soNumber}</td>
                                <td className="border border-gray-300 px-3 py-2 text-center">{item.expectedDateOfArrival}</td>
                                <td className="border border-gray-300 px-3 py-2 text-center">
                                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                    item.billPaymentStatus === 'Paid' ? 'bg-green-100 text-green-800' :
                                    item.billPaymentStatus === 'Pending' ? 'bg-orange-100 text-orange-800' :
                                    'bg-yellow-100 text-yellow-800'
                                  }`}>
                                    {item.billPaymentStatus}
                                  </span>
                                </td>
                                <td className="border border-gray-300 px-3 py-2 text-center">{item.supplyOrderDate}</td>
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
          ) : selectedCard === 'lm-items' ? (
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
                const lmItemsData = [
                  { serialNo: 1, component: 'Gear Assembly', woNumber: 'WO-2024-001', expectedDateOfCompletion: '15/04/2024', status: 'In Progress', workOrderDate: '01/03/2024' },
                  { serialNo: 2, component: 'Hydraulic Pump', woNumber: 'WO-2024-002', expectedDateOfCompletion: '22/04/2024', status: 'Completed', workOrderDate: '05/03/2024' },
                  { serialNo: 3, component: 'Brake Pad Set', woNumber: 'WO-2024-003', expectedDateOfCompletion: '18/04/2024', status: 'In Progress', workOrderDate: '08/03/2024' },
                  { serialNo: 4, component: 'Engine Gasket', woNumber: 'WO-2024-004', expectedDateOfCompletion: '25/04/2024', status: 'Pending', workOrderDate: '10/03/2024' },
                  { serialNo: 5, component: 'Control Valve', woNumber: 'WO-2024-005', expectedDateOfCompletion: '20/04/2024', status: 'In Progress', workOrderDate: '12/03/2024' },
                  { serialNo: 6, component: 'Clutch Plate', woNumber: 'WO-2024-006', expectedDateOfCompletion: '28/04/2024', status: 'Completed', workOrderDate: '15/03/2024' },
                  { serialNo: 7, component: 'Radiator Core', woNumber: 'WO-2024-007', expectedDateOfCompletion: '16/04/2024', status: 'In Progress', workOrderDate: '18/03/2024' },
                  { serialNo: 8, component: 'Alternator Assembly', woNumber: 'WO-2024-008', expectedDateOfCompletion: '24/04/2024', status: 'Pending', workOrderDate: '20/03/2024' }
                ];

                // Status Summary
                const completedCount = lmItemsData.filter(item => item.status === 'Completed').length;
                const inProgressCount = lmItemsData.filter(item => item.status === 'In Progress').length;
                const pendingCount = lmItemsData.filter(item => item.status === 'Pending').length;
                const totalCount = lmItemsData.length;
                const completedPercentage = (completedCount / totalCount) * 100;
                const inProgressPercentage = (inProgressCount / totalCount) * 100;
                const pendingPercentage = (pendingCount / totalCount) * 100;

                // Expected completions per month
                const monthlyCompletions = [
                  { month: 'Apr 2024', count: 6 },
                  { month: 'May 2024', count: 2 }
                ];
                const maxMonthlyCompletions = Math.max(...monthlyCompletions.map(m => m.count));

                return (
                  <>
                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
                        <div className="text-purple-700 text-sm mb-1 font-semibold">Total LM Items</div>
                        <div className="text-3xl font-bold text-purple-600">{totalCount}</div>
                      </div>
                      <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
                        <div className="text-green-700 text-sm mb-1 font-semibold">Completed</div>
                        <div className="text-3xl font-bold text-green-600">{completedCount}</div>
                        <div className="text-sm text-green-500 mt-1">{completedPercentage.toFixed(1)}%</div>
                      </div>
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
                        <div className="text-blue-700 text-sm mb-1 font-semibold">In Progress</div>
                        <div className="text-3xl font-bold text-blue-600">{inProgressCount}</div>
                        <div className="text-sm text-blue-500 mt-1">{inProgressPercentage.toFixed(1)}%</div>
                      </div>
                      <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
                        <div className="text-orange-700 text-sm mb-1 font-semibold">Pending</div>
                        <div className="text-3xl font-bold text-orange-600">{pendingCount}</div>
                        <div className="text-sm text-orange-500 mt-1">{pendingPercentage.toFixed(1)}%</div>
                      </div>
                    </div>

                    {/* Pie Chart - Work Order Status Distribution */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">Work Order Status Distribution</h3>
                      <div className="flex flex-col items-center">
                        <div className="relative w-80 h-80">
                          <svg viewBox="0 0 200 200" className="w-full h-full">
                            {(() => {
                              const colors = ['#22c55e', '#3b82f6', '#f97316']; // Green for Completed, Blue for In Progress, Orange for Pending
                              const percentages = [completedPercentage, inProgressPercentage, pendingPercentage];
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
                            <div className="text-sm font-semibold">Completed: {completedCount} ({completedPercentage.toFixed(1)}%)</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-blue-500 rounded"></div>
                            <div className="text-sm font-semibold">In Progress: {inProgressCount} ({inProgressPercentage.toFixed(1)}%)</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-orange-500 rounded"></div>
                            <div className="text-sm font-semibold">Pending: {pendingCount} ({pendingPercentage.toFixed(1)}%)</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Graph: Expected Completions per Month */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">Expected Completions per Month</h3>
                      <div className="flex items-end justify-around h-96 border-l-2 border-b-2 border-gray-400 pl-4 pb-4">
                        {monthlyCompletions.map((data) => (
                          <div key={data.month} className="flex flex-col items-center gap-2 flex-1">
                            <div
                              className="w-full bg-gradient-to-t from-purple-600 to-purple-400 flex items-start justify-center text-white font-bold text-sm pt-2 rounded-t-lg hover:from-purple-700 hover:to-purple-500 transition-all"
                              style={{ height: `${(data.count / maxMonthlyCompletions) * 350}px`, minHeight: '30px' }}
                            >
                              {data.count}
                            </div>
                            <span className="text-sm font-semibold text-gray-700 mt-2 text-center">{data.month}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 text-center">
                        <p className="text-xs text-gray-500">Y-axis: Number of Items | X-axis: Months</p>
                      </div>
                    </div>

                    {/* LM Items Table */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                      <h2 className="text-3xl font-bold text-gray-900 mb-6">LM Items</h2>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-xs">
                          <thead>
                            <tr className="bg-gray-200">
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Serial Number</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Component</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">WO Number</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Expected Date of Completion</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Status</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Work Order Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {lmItemsData.map((item, index) => (
                              <tr key={item.serialNo} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}>
                                <td className="border border-gray-300 px-3 py-2 text-center">{item.serialNo}</td>
                                <td className="border border-gray-300 px-3 py-2 text-xs">{item.component}</td>
                                <td className="border border-gray-300 px-3 py-2 text-center font-mono font-semibold">{item.woNumber}</td>
                                <td className="border border-gray-300 px-3 py-2 text-center">{item.expectedDateOfCompletion}</td>
                                <td className="border border-gray-300 px-3 py-2 text-center">
                                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                    item.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                    item.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                                    'bg-orange-100 text-orange-800'
                                  }`}>
                                    {item.status}
                                  </span>
                                </td>
                                <td className="border border-gray-300 px-3 py-2 text-center">{item.workOrderDate}</td>
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

