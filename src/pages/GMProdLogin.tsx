import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginForm from '../LoginForm'

export default function GMProdLogin() {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [selectedCard, setSelectedCard] = useState<string | null>(null)
  const [selectedYear, setSelectedYear] = useState<string>('')

  if (!isLoggedIn) {
    return (
      <LoginForm
        title="GM Prod"
        subtitle="General Manager Production Dashboard"
        onLoginSuccess={() => setIsLoggedIn(true)}
      />
    )
  }

  const cards = [
    { id: 'target', title: 'Target', description: 'View production targets and goals', color: 'bg-blue-500' },
    { id: 'ct-issue', title: 'CT Issue', description: 'Component tracking and issue management', color: 'bg-green-500' },
    { id: 'critical-items', title: 'Critical Items', description: 'Monitor critical inventory items', color: 'bg-red-500' },
    { id: 'misc', title: 'MISC', description: 'Miscellaneous items and information', color: 'bg-gray-500' }
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
    const [criticalItemsActions, setCriticalItemsActions] = useState<Record<number, string>>({});
    const [notificationSent, setNotificationSent] = useState<Record<number, boolean>>({});

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

    const handleActionChange = (serial: number, action: string) => {
      setCriticalItemsActions(prev => ({ ...prev, [serial]: action }));
    };

    const handleSendNotification = (serial: number) => {
      const action = criticalItemsActions[serial] || '';
      if (!action.trim()) {
        alert('Please enter action taken before sending notification.');
        return;
      }
      // Simulate sending notification
      setNotificationSent(prev => ({ ...prev, [serial]: true }));
      alert(`Notification sent for item ${serial}: ${criticalItemsData.find(item => item.serial === serial)?.nomenclature}`);
    };

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
                  className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-rose-800 bg-clip-text text-transparent hover:from-rose-700 hover:to-rose-900 transition-all"
                >
                  512 Army Base ERP
                </button>
                <div className="h-8 w-px bg-gray-300"></div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">GM Prod</div>
                  <div className="text-xs text-gray-600">General Manager Production</div>
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
              
              {/* Year Selection Dropdown */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <label htmlFor="year-select-ct" className="block text-sm font-semibold text-gray-700 mb-2">
                  Select Financial Year
                </label>
                <div className="flex items-center gap-3">
                  <select
                    id="year-select-ct"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="w-full md:w-64 px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm font-semibold"
                  >
                    <option value="">-- Select a Year --</option>
                    <option value="PY-2023-24">PY-2023-24</option>
                    <option value="PY-2024-25">PY-2024-25</option>
                    <option value="PY-2025-26">PY-2025-26</option>
                    <option value="PY-2026-27">PY-2026-27</option>
                  </select>
                  {selectedYear && (
                    <button
                      onClick={() => setSelectedYear('')}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition-colors text-sm"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {/* Content based on selected year */}
              {!selectedYear ? (
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
              ) : selectedYear === 'PY-2024-25' ? (
                <div className="space-y-8">
                  {(() => {
                    // PY-2024-25 Data: CT ISSUED IN 2024-25
                    const ctIssuedData = {
                      veh: {
                        total: 208,
                        cfCt: { total: 143, bmpII: 33, iik: 101, cmt: 4, ohII: 5 },
                        freshCt: { total: 65, bmpII: 15, iik: 10, cmt: 15, ohII: 25 },
                        output: { total: 72, bmpII: 12, iik: 41, cmt: 8, ohII: 5 }
                      },
                      eng: {
                        total: 223,
                        cfCt: { total: 123, utd20: 123 },
                        freshCt: { total: 100, utd20: 100 },
                        output: { total: 183, utd20: 183 }
                      }
                    };
                    const carryFwdVehicles = 136;
                    const carryFwdEngs = 40;

                    return (
                      <>
                        {/* CT Issued VEH Table */}
                        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                          <h2 className="text-3xl font-bold text-gray-900 mb-6">CT ISSUED IN 2024-25 - VEH (Vehicles)</h2>
                          <div className="overflow-x-auto">
                            <table className="w-full border-collapse text-xs">
                              <thead>
                                <tr className="bg-gray-200">
                                  <th className="border border-gray-400 px-3 py-2 font-semibold text-left" rowSpan={2}>Category</th>
                                  <th className="border border-gray-400 px-3 py-2 font-semibold text-left" colSpan={4}>Breakdown</th>
                                  <th className="border border-gray-400 px-3 py-2 font-semibold text-left" rowSpan={2}>Total</th>
                                </tr>
                                <tr className="bg-gray-200">
                                  <th className="border border-gray-400 px-3 py-2 font-semibold text-left">BMP II</th>
                                  <th className="border border-gray-400 px-3 py-2 font-semibold text-left">IIK</th>
                                  <th className="border border-gray-400 px-3 py-2 font-semibold text-left">CMT</th>
                                  <th className="border border-gray-400 px-3 py-2 font-semibold text-left">OH-II</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="bg-gray-50">
                                  <td className="border border-gray-300 px-3 py-2 font-semibold">CF CT</td>
                                  <td className="border border-gray-300 px-3 py-2 text-center">{ctIssuedData.veh.cfCt.bmpII}</td>
                                  <td className="border border-gray-300 px-3 py-2 text-center">{ctIssuedData.veh.cfCt.iik}</td>
                                  <td className="border border-gray-300 px-3 py-2 text-center">{ctIssuedData.veh.cfCt.cmt}</td>
                                  <td className="border border-gray-300 px-3 py-2 text-center">{ctIssuedData.veh.cfCt.ohII}</td>
                                  <td className="border border-gray-300 px-3 py-2 text-center font-bold">{ctIssuedData.veh.cfCt.total}</td>
                                </tr>
                                <tr className="bg-white">
                                  <td className="border border-gray-300 px-3 py-2 font-semibold">Fresh CT</td>
                                  <td className="border border-gray-300 px-3 py-2 text-center">{ctIssuedData.veh.freshCt.bmpII}</td>
                                  <td className="border border-gray-300 px-3 py-2 text-center">{ctIssuedData.veh.freshCt.iik}</td>
                                  <td className="border border-gray-300 px-3 py-2 text-center">{ctIssuedData.veh.freshCt.cmt}</td>
                                  <td className="border border-gray-300 px-3 py-2 text-center">{ctIssuedData.veh.freshCt.ohII}</td>
                                  <td className="border border-gray-300 px-3 py-2 text-center font-bold">{ctIssuedData.veh.freshCt.total}</td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="border border-gray-300 px-3 py-2 font-semibold">Output</td>
                                  <td className="border border-gray-300 px-3 py-2 text-center">{ctIssuedData.veh.output.bmpII}</td>
                                  <td className="border border-gray-300 px-3 py-2 text-center">{ctIssuedData.veh.output.iik}</td>
                                  <td className="border border-gray-300 px-3 py-2 text-center">{ctIssuedData.veh.output.cmt}</td>
                                  <td className="border border-gray-300 px-3 py-2 text-center">{ctIssuedData.veh.output.ohII}</td>
                                  <td className="border border-gray-300 px-3 py-2 text-center font-bold">{ctIssuedData.veh.output.total}</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div className="mt-4 text-sm text-gray-600">
                            <p><strong>Carry Forward in 2025-26:</strong> {carryFwdVehicles} VEHs</p>
                          </div>
                        </div>

                        {/* CT Issued ENG Table */}
                        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                          <h2 className="text-3xl font-bold text-gray-900 mb-6">CT ISSUED IN 2024-25 - ENGs (Engines)</h2>
                          <div className="overflow-x-auto">
                            <table className="w-full border-collapse text-xs">
                              <thead>
                                <tr className="bg-gray-200">
                                  <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Category</th>
                                  <th className="border border-gray-400 px-3 py-2 font-semibold text-left">UTD-20</th>
                                  <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Total</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="bg-gray-50">
                                  <td className="border border-gray-300 px-3 py-2 font-semibold">CF CT</td>
                                  <td className="border border-gray-300 px-3 py-2 text-center">{ctIssuedData.eng.cfCt.utd20}</td>
                                  <td className="border border-gray-300 px-3 py-2 text-center font-bold">{ctIssuedData.eng.cfCt.total}</td>
                                </tr>
                                <tr className="bg-white">
                                  <td className="border border-gray-300 px-3 py-2 font-semibold">Fresh CT</td>
                                  <td className="border border-gray-300 px-3 py-2 text-center">{ctIssuedData.eng.freshCt.utd20}</td>
                                  <td className="border border-gray-300 px-3 py-2 text-center font-bold">{ctIssuedData.eng.freshCt.total}</td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="border border-gray-300 px-3 py-2 font-semibold">Output</td>
                                  <td className="border border-gray-300 px-3 py-2 text-center">{ctIssuedData.eng.output.utd20}</td>
                                  <td className="border border-gray-300 px-3 py-2 text-center font-bold">{ctIssuedData.eng.output.total}</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div className="mt-4 text-sm text-gray-600">
                            <p><strong>Carry Forward in 2025-26:</strong> {carryFwdEngs} ENGs</p>
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </div>
              ) : selectedYear === 'PY-2025-26' ? (
                <div className="space-y-8">
                  {(() => {
                    // PY-2025-26 Data: CT ISSUED IN PY 2025-26
                    const ctIssuedData = {
                      veh: {
                        cfCt: { total: 136, bmpII: 36, iik: 64, cmt: 11, ohII: 25 },
                        freshCt: { cmt: 10, ohII: 20, ohI: 15, gun30mm: 10 }
                      },
                      eng: {
                        cfCt: { utd20: 40 },
                        freshCt: { utd20: 95, baz: 5 }
                      }
                    };

                    return (
                      <>
                        {/* CT Issued Table */}
                        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                          <h2 className="text-3xl font-bold text-gray-900 mb-6">CT ISSUED IN PY 2025-26</h2>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                              <h3 className="text-xl font-bold text-gray-800 mb-4">VEH (Vehicles)</h3>
                              <div className="overflow-x-auto">
                                <table className="w-full border-collapse text-xs">
                                  <thead>
                                    <tr className="bg-gray-200">
                                      <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Category</th>
                                      <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Type</th>
                                      <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Quantity</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr className="bg-gray-50">
                                      <td className="border border-gray-300 px-3 py-2 font-semibold" rowSpan={4}>CF CT</td>
                                      <td className="border border-gray-300 px-3 py-2">BMP II</td>
                                      <td className="border border-gray-300 px-3 py-2 text-center">{ctIssuedData.veh.cfCt.bmpII}</td>
                                    </tr>
                                    <tr className="bg-gray-50">
                                      <td className="border border-gray-300 px-3 py-2">IIK</td>
                                      <td className="border border-gray-300 px-3 py-2 text-center">{ctIssuedData.veh.cfCt.iik}</td>
                                    </tr>
                                    <tr className="bg-gray-50">
                                      <td className="border border-gray-300 px-3 py-2">CMT</td>
                                      <td className="border border-gray-300 px-3 py-2 text-center">{ctIssuedData.veh.cfCt.cmt}</td>
                                    </tr>
                                    <tr className="bg-gray-50">
                                      <td className="border border-gray-300 px-3 py-2">OH-II</td>
                                      <td className="border border-gray-300 px-3 py-2 text-center">{ctIssuedData.veh.cfCt.ohII}</td>
                                    </tr>
                                    <tr className="bg-white">
                                      <td className="border border-gray-300 px-3 py-2 font-semibold" rowSpan={4}>Fresh CT</td>
                                      <td className="border border-gray-300 px-3 py-2">CMT</td>
                                      <td className="border border-gray-300 px-3 py-2 text-center">{ctIssuedData.veh.freshCt.cmt}</td>
                                    </tr>
                                    <tr className="bg-white">
                                      <td className="border border-gray-300 px-3 py-2">OH-II (BMP II)</td>
                                      <td className="border border-gray-300 px-3 py-2 text-center">{ctIssuedData.veh.freshCt.ohII}</td>
                                    </tr>
                                    <tr className="bg-white">
                                      <td className="border border-gray-300 px-3 py-2">OH-I (BMP II)</td>
                                      <td className="border border-gray-300 px-3 py-2 text-center">{ctIssuedData.veh.freshCt.ohI}</td>
                                    </tr>
                                    <tr className="bg-white">
                                      <td className="border border-gray-300 px-3 py-2">30mm Gun</td>
                                      <td className="border border-gray-300 px-3 py-2 text-center">{ctIssuedData.veh.freshCt.gun30mm}</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-gray-800 mb-4">ENGs (Engines)</h3>
                              <div className="overflow-x-auto">
                                <table className="w-full border-collapse text-xs">
                                  <thead>
                                    <tr className="bg-gray-200">
                                      <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Category</th>
                                      <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Type</th>
                                      <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Quantity</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr className="bg-gray-50">
                                      <td className="border border-gray-300 px-3 py-2 font-semibold">CF CT</td>
                                      <td className="border border-gray-300 px-3 py-2">UTD-20</td>
                                      <td className="border border-gray-300 px-3 py-2 text-center">{ctIssuedData.eng.cfCt.utd20} ENGs</td>
                                    </tr>
                                    <tr className="bg-white">
                                      <td className="border border-gray-300 px-3 py-2 font-semibold" rowSpan={2}>Fresh CT</td>
                                      <td className="border border-gray-300 px-3 py-2">UTD-20</td>
                                      <td className="border border-gray-300 px-3 py-2 text-center">{ctIssuedData.eng.freshCt.utd20} ENGs</td>
                                    </tr>
                                    <tr className="bg-white">
                                      <td className="border border-gray-300 px-3 py-2">BAZ</td>
                                      <td className="border border-gray-300 px-3 py-2 text-center">{ctIssuedData.eng.freshCt.baz} ENGs</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </div>
              ) : null}
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
                        <th className="border border-gray-400 px-4 py-3 font-semibold text-left">Action Taken</th>
                        <th className="border border-gray-400 px-4 py-3 font-semibold text-left">Action</th>
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
                          <td className="border border-gray-300 px-4 py-2">
                            <textarea
                              value={criticalItemsActions[item.serial] || ''}
                              onChange={(e) => handleActionChange(item.serial, e.target.value)}
                              placeholder="Enter action taken..."
                              className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                              rows={2}
                            />
                          </td>
                          <td className="border border-gray-300 px-4 py-2 text-center">
                            <button
                              onClick={() => handleSendNotification(item.serial)}
                              disabled={notificationSent[item.serial]}
                              className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                                notificationSent[item.serial]
                                  ? 'bg-green-100 text-green-700 cursor-not-allowed'
                                  : 'bg-blue-500 text-white hover:bg-blue-600'
                              }`}
                            >
                              {notificationSent[item.serial] ? (
                                <span className="flex items-center gap-1">
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                  Sent
                                </span>
                              ) : (
                                'Send Notification'
                              )}
                            </button>
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
              
              {/* Year Selection Dropdown */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <label htmlFor="year-select" className="block text-sm font-semibold text-gray-700 mb-2">
                  Select Financial Year
                </label>
                <div className="flex items-center gap-3">
                  <select
                    id="year-select"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="w-full md:w-64 px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm font-semibold"
                  >
                    <option value="">-- Select a Year --</option>
                    <option value="PY-2023-24">PY-2023-24</option>
                    <option value="PY-2024-25">PY-2024-25</option>
                    <option value="PY-2025-26">PY-2025-26</option>
                    <option value="PY-2026-27">PY-2026-27</option>
                  </select>
                  {selectedYear && (
                    <button
                      onClick={() => setSelectedYear('')}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition-colors text-sm"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {/* Content based on selected year - Imported from GM WKS MTRL */}
              {selectedYear === 'PY-2023-24' ? (
                <div className="space-y-8">
                  {(() => {
                    // PY-2023-24 Data: CT ISSUE IN 2023-24
                    const vehData = {
                      total: 189,
                      cfCt: { total: 144, bmpII: 11, bmpIIK: 133 },
                      freshCt: { total: 45, bmpII: 25, cmt: 15, ohII: 5 },
                      output: { total: 46, bmpII: 3, bmpIIK: 32, cmt: 11, ohII: 0 }
                    };
                    const engData = {
                      total: 283,
                      cfCt: { total: 57, utd20: 47, slkEng: 10 },
                      freshCt: { total: 226, utd20: 226 },
                      output: { total: 150 },
                      carryFwd: 123
                    };
                    const carryFwdVehicles = 143;

                    return (
                      <>
                        {/* VEH Summary Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-lg p-6 shadow-sm">
                            <div className="text-blue-700 text-sm mb-1 font-semibold">Total VEH CT</div>
                            <div className="text-3xl font-bold text-blue-600">{vehData.total}</div>
                          </div>
                          <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-lg p-6 shadow-sm">
                            <div className="text-green-700 text-sm mb-1 font-semibold">CF CT</div>
                            <div className="text-3xl font-bold text-green-600">{vehData.cfCt.total}</div>
                          </div>
                          <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 rounded-lg p-6 shadow-sm">
                            <div className="text-purple-700 text-sm mb-1 font-semibold">Fresh CT</div>
                            <div className="text-3xl font-bold text-purple-600">{vehData.freshCt.total}</div>
                          </div>
                          <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200 rounded-lg p-6 shadow-sm">
                            <div className="text-orange-700 text-sm mb-1 font-semibold">Output</div>
                            <div className="text-3xl font-bold text-orange-600">{vehData.output.total}</div>
                          </div>
                        </div>

                        {/* ENG Summary Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                          <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 border-2 border-indigo-200 rounded-lg p-6 shadow-sm">
                            <div className="text-indigo-700 text-sm mb-1 font-semibold">Total ENG CT</div>
                            <div className="text-3xl font-bold text-indigo-600">{engData.total}</div>
                          </div>
                          <div className="bg-gradient-to-br from-teal-50 to-teal-100 border-2 border-teal-200 rounded-lg p-6 shadow-sm">
                            <div className="text-teal-700 text-sm mb-1 font-semibold">CF CT ENGs</div>
                            <div className="text-3xl font-bold text-teal-600">{engData.cfCt.total}</div>
                          </div>
                          <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 border-2 border-cyan-200 rounded-lg p-6 shadow-sm">
                            <div className="text-cyan-700 text-sm mb-1 font-semibold">Fresh CT ENGs</div>
                            <div className="text-3xl font-bold text-cyan-600">{engData.freshCt.total}</div>
                          </div>
                          <div className="bg-gradient-to-br from-rose-50 to-rose-100 border-2 border-rose-200 rounded-lg p-6 shadow-sm">
                            <div className="text-rose-700 text-sm mb-1 font-semibold">Output ENGs</div>
                            <div className="text-3xl font-bold text-rose-600">{engData.output.total}</div>
                          </div>
                        </div>

                        {/* VEH Table */}
                        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                          <h2 className="text-3xl font-bold text-gray-900 mb-6">CT ISSUE IN 2023-24 - VEH (Vehicles)</h2>
                          <div className="overflow-x-auto">
                            <table className="w-full border-collapse text-xs">
                              <thead>
                                <tr className="bg-gray-200">
                                  <th className="border border-gray-400 px-3 py-2 font-semibold text-left" rowSpan={2}>Category</th>
                                  <th className="border border-gray-400 px-3 py-2 font-semibold text-left" colSpan={4}>Breakdown</th>
                                  <th className="border border-gray-400 px-3 py-2 font-semibold text-left" rowSpan={2}>Total</th>
                                </tr>
                                <tr className="bg-gray-200">
                                  <th className="border border-gray-400 px-3 py-2 font-semibold text-left">BMP II</th>
                                  <th className="border border-gray-400 px-3 py-2 font-semibold text-left">BMP IIK</th>
                                  <th className="border border-gray-400 px-3 py-2 font-semibold text-left">CMT</th>
                                  <th className="border border-gray-400 px-3 py-2 font-semibold text-left">OH-II</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="bg-gray-50">
                                  <td className="border border-gray-300 px-3 py-2 font-semibold">CF CT</td>
                                  <td className="border border-gray-300 px-3 py-2 text-center">{vehData.cfCt.bmpII}</td>
                                  <td className="border border-gray-300 px-3 py-2 text-center">{vehData.cfCt.bmpIIK}</td>
                                  <td className="border border-gray-300 px-3 py-2 text-center">-</td>
                                  <td className="border border-gray-300 px-3 py-2 text-center">-</td>
                                  <td className="border border-gray-300 px-3 py-2 text-center font-bold">{vehData.cfCt.total}</td>
                                </tr>
                                <tr className="bg-white">
                                  <td className="border border-gray-300 px-3 py-2 font-semibold">Fresh CT</td>
                                  <td className="border border-gray-300 px-3 py-2 text-center">{vehData.freshCt.bmpII}</td>
                                  <td className="border border-gray-300 px-3 py-2 text-center">-</td>
                                  <td className="border border-gray-300 px-3 py-2 text-center">{vehData.freshCt.cmt}</td>
                                  <td className="border border-gray-300 px-3 py-2 text-center">{vehData.freshCt.ohII}</td>
                                  <td className="border border-gray-300 px-3 py-2 text-center font-bold">{vehData.freshCt.total}</td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="border border-gray-300 px-3 py-2 font-semibold">Output</td>
                                  <td className="border border-gray-300 px-3 py-2 text-center">{vehData.output.bmpII}</td>
                                  <td className="border border-gray-300 px-3 py-2 text-center">{vehData.output.bmpIIK}</td>
                                  <td className="border border-gray-300 px-3 py-2 text-center">{vehData.output.cmt}</td>
                                  <td className="border border-gray-300 px-3 py-2 text-center">{vehData.output.ohII}</td>
                                  <td className="border border-gray-300 px-3 py-2 text-center font-bold">{vehData.output.total}</td>
                                </tr>
                                <tr className="bg-gray-300 font-bold">
                                  <td className="border border-gray-400 px-3 py-2">Grand Total</td>
                                  <td className="border border-gray-400 px-3 py-2 text-center">{vehData.cfCt.bmpII + vehData.freshCt.bmpII + vehData.output.bmpII}</td>
                                  <td className="border border-gray-400 px-3 py-2 text-center">{vehData.cfCt.bmpIIK + vehData.output.bmpIIK}</td>
                                  <td className="border border-gray-400 px-3 py-2 text-center">{vehData.freshCt.cmt + vehData.output.cmt}</td>
                                  <td className="border border-gray-400 px-3 py-2 text-center">{vehData.freshCt.ohII + vehData.output.ohII}</td>
                                  <td className="border border-gray-400 px-3 py-2 text-center">{vehData.total + vehData.output.total}</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div className="mt-4 text-sm text-gray-600">
                            <p><strong>Carry Forward in 2024-25:</strong> {carryFwdVehicles} VEHs</p>
                          </div>
                        </div>

                        {/* ENG Table */}
                        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                          <h2 className="text-3xl font-bold text-gray-900 mb-6">CT ISSUE IN 2023-24 - ENGs (Engines)</h2>
                          <div className="overflow-x-auto">
                            <table className="w-full border-collapse text-xs">
                              <thead>
                                <tr className="bg-gray-200">
                                  <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Category</th>
                                  <th className="border border-gray-400 px-3 py-2 font-semibold text-left">UTD-20</th>
                                  <th className="border border-gray-400 px-3 py-2 font-semibold text-left">SLK ENG</th>
                                  <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Total</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="bg-gray-50">
                                  <td className="border border-gray-300 px-3 py-2 font-semibold">CF CT</td>
                                  <td className="border border-gray-300 px-3 py-2 text-center">{engData.cfCt.utd20}</td>
                                  <td className="border border-gray-300 px-3 py-2 text-center">{engData.cfCt.slkEng}</td>
                                  <td className="border border-gray-300 px-3 py-2 text-center font-bold">{engData.cfCt.total}</td>
                                </tr>
                                <tr className="bg-white">
                                  <td className="border border-gray-300 px-3 py-2 font-semibold">Fresh CT</td>
                                  <td className="border border-gray-300 px-3 py-2 text-center">{engData.freshCt.utd20}</td>
                                  <td className="border border-gray-300 px-3 py-2 text-center">-</td>
                                  <td className="border border-gray-300 px-3 py-2 text-center font-bold">{engData.freshCt.total}</td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="border border-gray-300 px-3 py-2 font-semibold">Output</td>
                                  <td className="border border-gray-300 px-3 py-2 text-center">{engData.output.total}</td>
                                  <td className="border border-gray-300 px-3 py-2 text-center">-</td>
                                  <td className="border border-gray-300 px-3 py-2 text-center font-bold">{engData.output.total}</td>
                                </tr>
                                <tr className="bg-gray-300 font-bold">
                                  <td className="border border-gray-400 px-3 py-2">Total</td>
                                  <td className="border border-gray-400 px-3 py-2 text-center">{engData.cfCt.utd20 + engData.freshCt.utd20}</td>
                                  <td className="border border-gray-400 px-3 py-2 text-center">{engData.cfCt.slkEng}</td>
                                  <td className="border border-gray-400 px-3 py-2 text-center">{engData.total}</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div className="mt-4 text-sm text-gray-600">
                            <p><strong>Carry Forward:</strong> {engData.carryFwd} ENGs</p>
                          </div>
                        </div>

                        {/* Graphs */}
                        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                          <h3 className="text-2xl font-bold text-gray-900 mb-6">VEH Distribution by Category</h3>
                          <div className="flex items-end justify-around h-96 border-l-2 border-b-2 border-gray-400 pl-4 pb-4">
                            <div className="flex flex-col items-center gap-2">
                              <div
                                className="w-24 bg-gradient-to-t from-blue-600 to-blue-400 flex items-start justify-center text-white font-bold text-sm pt-2 rounded-t-lg"
                                style={{ height: `${(vehData.cfCt.total / 200) * 350}px`, minHeight: '30px' }}
                              >
                                {vehData.cfCt.total}
                              </div>
                              <span className="text-sm font-semibold text-gray-700 mt-2 text-center">CF CT</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                              <div
                                className="w-24 bg-gradient-to-t from-purple-600 to-purple-400 flex items-start justify-center text-white font-bold text-sm pt-2 rounded-t-lg"
                                style={{ height: `${(vehData.freshCt.total / 200) * 350}px`, minHeight: '30px' }}
                              >
                                {vehData.freshCt.total}
                              </div>
                              <span className="text-sm font-semibold text-gray-700 mt-2 text-center">Fresh CT</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                              <div
                                className="w-24 bg-gradient-to-t from-orange-600 to-orange-400 flex items-start justify-center text-white font-bold text-sm pt-2 rounded-t-lg"
                                style={{ height: `${(vehData.output.total / 200) * 350}px`, minHeight: '30px' }}
                              >
                                {vehData.output.total}
                              </div>
                              <span className="text-sm font-semibold text-gray-700 mt-2 text-center">Output</span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                          <h3 className="text-2xl font-bold text-gray-900 mb-6">ENG Distribution by Category</h3>
                          <div className="flex items-end justify-around h-96 border-l-2 border-b-2 border-gray-400 pl-4 pb-4">
                            <div className="flex flex-col items-center gap-2">
                              <div
                                className="w-24 bg-gradient-to-t from-teal-600 to-teal-400 flex items-start justify-center text-white font-bold text-sm pt-2 rounded-t-lg"
                                style={{ height: `${(engData.cfCt.total / 300) * 350}px`, minHeight: '30px' }}
                              >
                                {engData.cfCt.total}
                              </div>
                              <span className="text-sm font-semibold text-gray-700 mt-2 text-center">CF CT</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                              <div
                                className="w-24 bg-gradient-to-t from-cyan-600 to-cyan-400 flex items-start justify-center text-white font-bold text-sm pt-2 rounded-t-lg"
                                style={{ height: `${(engData.freshCt.total / 300) * 350}px`, minHeight: '30px' }}
                              >
                                {engData.freshCt.total}
                              </div>
                              <span className="text-sm font-semibold text-gray-700 mt-2 text-center">Fresh CT</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                              <div
                                className="w-24 bg-gradient-to-t from-rose-600 to-rose-400 flex items-start justify-center text-white font-bold text-sm pt-2 rounded-t-lg"
                                style={{ height: `${(engData.output.total / 300) * 350}px`, minHeight: '30px' }}
                              >
                                {engData.output.total}
                              </div>
                              <span className="text-sm font-semibold text-gray-700 mt-2 text-center">Output</span>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </div>
              ) : selectedYear === 'PY-2024-25' ? (
                <div className="space-y-8">
                  {(() => {
                    // PY-2024-25 Data: CT ISSUED IN 2024-25 and TARGET FOR 2024-25
                    const ctIssuedData = {
                      veh: {
                        total: 208,
                        cfCt: { total: 143, bmpII: 33, iik: 101, cmt: 4, ohII: 5 },
                        freshCt: { total: 65, bmpII: 15, iik: 10, cmt: 15, ohII: 25 },
                        output: { total: 72, bmpII: 12, iik: 41, cmt: 8, ohII: 5 }
                      },
                      eng: {
                        total: 223,
                        cfCt: { total: 123, utd20: 123 },
                        freshCt: { total: 100, utd20: 100 },
                        output: { total: 183, utd20: 183 }
                      }
                    };
                    const targetData = {
                      veh: {
                        ohI: { bmpII: 21, iik: 10 },
                        ohII: 89,
                        cmt: 15,
                        vt72b: 2
                      },
                      eng: {
                        utd20: 300,
                        slk: 5
                      }
                    };
                    const carryFwdVehicles = 136;
                    const carryFwdEngs = 40;

                    return (
                      <>
                        {/* Summary Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 rounded-lg p-6 shadow-sm">
                            <div className="text-purple-700 text-sm mb-1 font-semibold">Target VEH</div>
                            <div className="text-3xl font-bold text-purple-600">{targetData.veh.ohI.bmpII + targetData.veh.ohI.iik + targetData.veh.ohII + targetData.veh.cmt + targetData.veh.vt72b}</div>
                          </div>
                          <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200 rounded-lg p-6 shadow-sm">
                            <div className="text-orange-700 text-sm mb-1 font-semibold">Target ENG</div>
                            <div className="text-3xl font-bold text-orange-600">{targetData.eng.utd20 + targetData.eng.slk}</div>
                          </div>
                        </div>

                        {/* Target Table */}
                        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                          <h2 className="text-3xl font-bold text-gray-900 mb-6">TARGET FOR 2024-25</h2>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                              <h3 className="text-xl font-bold text-gray-800 mb-4">VEH (Vehicles)</h3>
                              <div className="overflow-x-auto">
                                <table className="w-full border-collapse text-xs">
                                  <thead>
                                    <tr className="bg-gray-200">
                                      <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Type</th>
                                      <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Quantity</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr className="bg-gray-50">
                                      <td className="border border-gray-300 px-3 py-2">OH-I - BMP II</td>
                                      <td className="border border-gray-300 px-3 py-2 text-center font-bold">{targetData.veh.ohI.bmpII}</td>
                                    </tr>
                                    <tr className="bg-white">
                                      <td className="border border-gray-300 px-3 py-2">OH-I - BMP IIK</td>
                                      <td className="border border-gray-300 px-3 py-2 text-center font-bold">{targetData.veh.ohI.iik}</td>
                                    </tr>
                                    <tr className="bg-gray-50">
                                      <td className="border border-gray-300 px-3 py-2">OH-II</td>
                                      <td className="border border-gray-300 px-3 py-2 text-center font-bold">{targetData.veh.ohII}</td>
                                    </tr>
                                    <tr className="bg-white">
                                      <td className="border border-gray-300 px-3 py-2">CMT</td>
                                      <td className="border border-gray-300 px-3 py-2 text-center font-bold">{targetData.veh.cmt}</td>
                                    </tr>
                                    <tr className="bg-gray-50">
                                      <td className="border border-gray-300 px-3 py-2">VT-72B</td>
                                      <td className="border border-gray-300 px-3 py-2 text-center font-bold">{targetData.veh.vt72b}</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-gray-800 mb-4">ENGs (Engines)</h3>
                              <div className="overflow-x-auto">
                                <table className="w-full border-collapse text-xs">
                                  <thead>
                                    <tr className="bg-gray-200">
                                      <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Type</th>
                                      <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Quantity</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr className="bg-gray-50">
                                      <td className="border border-gray-300 px-3 py-2">UTD-20 ENG</td>
                                      <td className="border border-gray-300 px-3 py-2 text-center font-bold">{targetData.eng.utd20}</td>
                                    </tr>
                                    <tr className="bg-white">
                                      <td className="border border-gray-300 px-3 py-2">SLK ENG</td>
                                      <td className="border border-gray-300 px-3 py-2 text-center font-bold">{targetData.eng.slk}</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Bar Graph: Target Values from Table */}
                        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                          <h3 className="text-2xl font-bold text-gray-900 mb-6">Target Values - VEH</h3>
                          <div className="flex items-end justify-around h-96 border-l-2 border-b-2 border-gray-400 pl-4 pb-4 gap-2">
                            {(() => {
                              const vehTargets = [
                                { label: 'OH-I\nBMP II', value: targetData.veh.ohI.bmpII, color: 'from-blue-600 to-blue-400' },
                                { label: 'OH-I\nBMP IIK', value: targetData.veh.ohI.iik, color: 'from-purple-600 to-purple-400' },
                                { label: 'OH-II', value: targetData.veh.ohII, color: 'from-green-600 to-green-400' },
                                { label: 'CMT', value: targetData.veh.cmt, color: 'from-orange-600 to-orange-400' },
                                { label: 'VT-72B', value: targetData.veh.vt72b, color: 'from-red-600 to-red-400' }
                              ];
                              const maxVehValue = Math.max(...vehTargets.map(t => t.value), 1);
                              return vehTargets.map((target, index) => (
                                <div key={index} className="flex flex-col items-center gap-2 flex-1">
                                  <div
                                    className={`w-full bg-gradient-to-t ${target.color} flex items-start justify-center text-white font-bold text-xs pt-2 rounded-t-lg`}
                                    style={{ height: `${(target.value / maxVehValue) * 350}px`, minHeight: '30px' }}
                                  >
                                    {target.value}
                                  </div>
                                  <span className="text-xs font-semibold text-gray-700 mt-2 text-center whitespace-pre-line">{target.label}</span>
                                </div>
                              ));
                            })()}
                          </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                          <h3 className="text-2xl font-bold text-gray-900 mb-6">Target Values - ENG</h3>
                          <div className="flex items-end justify-around h-96 border-l-2 border-b-2 border-gray-400 pl-4 pb-4 gap-2">
                            {(() => {
                              const engTargets = [
                                { label: 'UTD-20 ENG', value: targetData.eng.utd20, color: 'from-indigo-600 to-indigo-400' },
                                { label: 'SLK ENG', value: targetData.eng.slk, color: 'from-teal-600 to-teal-400' }
                              ];
                              const maxEngValue = Math.max(...engTargets.map(t => t.value), 1);
                              return engTargets.map((target, index) => (
                                <div key={index} className="flex flex-col items-center gap-2 flex-1">
                                  <div
                                    className={`w-full bg-gradient-to-t ${target.color} flex items-start justify-center text-white font-bold text-sm pt-2 rounded-t-lg`}
                                    style={{ height: `${(target.value / maxEngValue) * 350}px`, minHeight: '30px' }}
                                  >
                                    {target.value}
                                  </div>
                                  <span className="text-sm font-semibold text-gray-700 mt-2 text-center">{target.label}</span>
                                </div>
                              ));
                            })()}
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </div>
              ) : selectedYear === 'PY-2025-26' ? (
                <div className="space-y-8">
                  {(() => {
                    // PY-2025-26 Data: TARGET FOR 2025-26 and CT ISSUED IN PY 2025-26
                    const targetData = {
                      veh: {
                        ohI: { bmpII: 72, iik: 0 },
                        ohII: { bmpII: 48 },
                        cmt: 15,
                        vt72b: 2,
                        gun30mm: 20
                      },
                      eng: {
                        utd20: 280,
                        baz: 6,
                        slk: 8
                      }
                    };
                    const ctIssuedData = {
                      veh: {
                        cfCt: { total: 136, bmpII: 36, iik: 64, cmt: 11, ohII: 25 },
                        freshCt: { cmt: 10, ohII: 20, ohI: 15, gun30mm: 10 }
                      },
                      eng: {
                        cfCt: { utd20: 40 },
                        freshCt: { utd20: 95, baz: 5 }
                      }
                    };

                    return (
                      <>
                        {/* Summary Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-lg p-6 shadow-sm">
                            <div className="text-blue-700 text-sm mb-1 font-semibold">Target VEH</div>
                            <div className="text-3xl font-bold text-blue-600">{targetData.veh.ohI.bmpII + targetData.veh.ohII.bmpII + targetData.veh.cmt + targetData.veh.vt72b + targetData.veh.gun30mm}</div>
                          </div>
                          <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-lg p-6 shadow-sm">
                            <div className="text-green-700 text-sm mb-1 font-semibold">Target ENG</div>
                            <div className="text-3xl font-bold text-green-600">{targetData.eng.utd20 + targetData.eng.baz + targetData.eng.slk}</div>
                          </div>
                        </div>

                        {/* Target Table */}
                        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                          <h2 className="text-3xl font-bold text-gray-900 mb-6">TARGET FOR 2025-26</h2>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                              <h3 className="text-xl font-bold text-gray-800 mb-4">VEH (Vehicles)</h3>
                              <div className="overflow-x-auto">
                                <table className="w-full border-collapse text-xs">
                                  <thead>
                                    <tr className="bg-gray-200">
                                      <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Type</th>
                                      <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Quantity</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr className="bg-gray-50">
                                      <td className="border border-gray-300 px-3 py-2">OH-I - BMP II</td>
                                      <td className="border border-gray-300 px-3 py-2 text-center font-bold">{targetData.veh.ohI.bmpII}</td>
                                    </tr>
                                    <tr className="bg-white">
                                      <td className="border border-gray-300 px-3 py-2">OH-II - BMP II</td>
                                      <td className="border border-gray-300 px-3 py-2 text-center font-bold">{targetData.veh.ohII.bmpII}</td>
                                    </tr>
                                    <tr className="bg-gray-50">
                                      <td className="border border-gray-300 px-3 py-2">CMT</td>
                                      <td className="border border-gray-300 px-3 py-2 text-center font-bold">{targetData.veh.cmt}</td>
                                    </tr>
                                    <tr className="bg-white">
                                      <td className="border border-gray-300 px-3 py-2">VT-72B</td>
                                      <td className="border border-gray-300 px-3 py-2 text-center font-bold">{targetData.veh.vt72b}</td>
                                    </tr>
                                    <tr className="bg-gray-50">
                                      <td className="border border-gray-300 px-3 py-2">30 MM Gun</td>
                                      <td className="border border-gray-300 px-3 py-2 text-center font-bold">{targetData.veh.gun30mm}</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-gray-800 mb-4">ENGs (Engines)</h3>
                              <div className="overflow-x-auto">
                                <table className="w-full border-collapse text-xs">
                                  <thead>
                                    <tr className="bg-gray-200">
                                      <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Type</th>
                                      <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Quantity</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr className="bg-gray-50">
                                      <td className="border border-gray-300 px-3 py-2">UTD-20 ENG</td>
                                      <td className="border border-gray-300 px-3 py-2 text-center font-bold">{targetData.eng.utd20}</td>
                                    </tr>
                                    <tr className="bg-white">
                                      <td className="border border-gray-300 px-3 py-2">BAZ ENG</td>
                                      <td className="border border-gray-300 px-3 py-2 text-center font-bold">{targetData.eng.baz}</td>
                                    </tr>
                                    <tr className="bg-gray-50">
                                      <td className="border border-gray-300 px-3 py-2">SLK ENG</td>
                                      <td className="border border-gray-300 px-3 py-2 text-center font-bold">{targetData.eng.slk}</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>

                      </>
                    );
                  })()}
                </div>
              ) : selectedYear === 'PY-2026-27' ? (
                <div className="space-y-8">
                  {(() => {
                    // PY-2026-27 Data: TARGET FOR PY 2026-27
                    const targetData = {
                      veh: {
                        ohI: { bmpII: 25, iik: 30 },
                        ohII: { bmpII: 65 },
                        cmt: 15,
                        vt72b: 3
                      },
                      eng: {
                        utd20: 280,
                        slk: 4
                      }
                    };

                    return (
                      <>
                        {/* Summary Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-lg p-6 shadow-sm">
                            <div className="text-blue-700 text-sm mb-1 font-semibold">Target VEH</div>
                            <div className="text-3xl font-bold text-blue-600">{targetData.veh.ohI.bmpII + targetData.veh.ohI.iik + targetData.veh.ohII.bmpII + targetData.veh.cmt + targetData.veh.vt72b}</div>
                          </div>
                          <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-lg p-6 shadow-sm">
                            <div className="text-green-700 text-sm mb-1 font-semibold">Target ENG</div>
                            <div className="text-3xl font-bold text-green-600">{targetData.eng.utd20 + targetData.eng.slk}</div>
                          </div>
                        </div>

                        {/* Target Table */}
                        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                          <h2 className="text-3xl font-bold text-gray-900 mb-6">TARGET FOR PY 2026-27</h2>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                              <h3 className="text-xl font-bold text-gray-800 mb-4">VEH (Vehicles)</h3>
                              <div className="overflow-x-auto">
                                <table className="w-full border-collapse text-xs">
                                  <thead>
                                    <tr className="bg-gray-200">
                                      <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Type</th>
                                      <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Quantity</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr className="bg-gray-50">
                                      <td className="border border-gray-300 px-3 py-2">OH-I - BMP II</td>
                                      <td className="border border-gray-300 px-3 py-2 text-center font-bold">{targetData.veh.ohI.bmpII}</td>
                                    </tr>
                                    <tr className="bg-white">
                                      <td className="border border-gray-300 px-3 py-2">OH-I - BMP IIK</td>
                                      <td className="border border-gray-300 px-3 py-2 text-center font-bold">{targetData.veh.ohI.iik}</td>
                                    </tr>
                                    <tr className="bg-gray-50">
                                      <td className="border border-gray-300 px-3 py-2">OH-II - BMP II</td>
                                      <td className="border border-gray-300 px-3 py-2 text-center font-bold">{targetData.veh.ohII.bmpII}</td>
                                    </tr>
                                    <tr className="bg-white">
                                      <td className="border border-gray-300 px-3 py-2">CMT</td>
                                      <td className="border border-gray-300 px-3 py-2 text-center font-bold">{targetData.veh.cmt}</td>
                                    </tr>
                                    <tr className="bg-gray-50">
                                      <td className="border border-gray-300 px-3 py-2">VT-72B</td>
                                      <td className="border border-gray-300 px-3 py-2 text-center font-bold">{targetData.veh.vt72b}</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-gray-800 mb-4">ENGs (Engines)</h3>
                              <div className="overflow-x-auto">
                                <table className="w-full border-collapse text-xs">
                                  <thead>
                                    <tr className="bg-gray-200">
                                      <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Type</th>
                                      <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Quantity</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr className="bg-gray-50">
                                      <td className="border border-gray-300 px-3 py-2">UTD-20 ENG</td>
                                      <td className="border border-gray-300 px-3 py-2 text-center font-bold">{targetData.eng.utd20}</td>
                                    </tr>
                                    <tr className="bg-white">
                                      <td className="border border-gray-300 px-3 py-2">SLK ENG</td>
                                      <td className="border border-gray-300 px-3 py-2 text-center font-bold">{targetData.eng.slk}</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Bar Graph: Target Values from Table */}
                        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                          <h3 className="text-2xl font-bold text-gray-900 mb-6">Target Values - VEH</h3>
                          <div className="flex items-end justify-around h-96 border-l-2 border-b-2 border-gray-400 pl-4 pb-4 gap-2">
                            {(() => {
                              const vehTargets = [
                                { label: 'OH-I\nBMP II', value: targetData.veh.ohI.bmpII, color: 'from-blue-600 to-blue-400' },
                                { label: 'OH-I\nBMP IIK', value: targetData.veh.ohI.iik, color: 'from-purple-600 to-purple-400' },
                                { label: 'OH-II\nBMP II', value: targetData.veh.ohII.bmpII, color: 'from-green-600 to-green-400' },
                                { label: 'CMT', value: targetData.veh.cmt, color: 'from-orange-600 to-orange-400' },
                                { label: 'VT-72B', value: targetData.veh.vt72b, color: 'from-red-600 to-red-400' },
                                ...(targetData.veh.gun30mm ? [{ label: '30 MM\nGun', value: targetData.veh.gun30mm, color: 'from-pink-600 to-pink-400' }] : [])
                              ];
                              const maxVehValue = Math.max(...vehTargets.map(t => t.value), 1);
                              return vehTargets.map((target, index) => (
                                <div key={index} className="flex flex-col items-center gap-2 flex-1">
                                  <div
                                    className={`w-full bg-gradient-to-t ${target.color} flex items-start justify-center text-white font-bold text-xs pt-2 rounded-t-lg`}
                                    style={{ height: `${(target.value / maxVehValue) * 350}px`, minHeight: '30px' }}
                                  >
                                    {target.value}
                                  </div>
                                  <span className="text-xs font-semibold text-gray-700 mt-2 text-center whitespace-pre-line">{target.label}</span>
                                </div>
                              ));
                            })()}
                          </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                          <h3 className="text-2xl font-bold text-gray-900 mb-6">Target Values - ENG</h3>
                          <div className="flex items-end justify-around h-96 border-l-2 border-b-2 border-gray-400 pl-4 pb-4 gap-2">
                            {(() => {
                              const engTargets = [
                                { label: 'UTD-20 ENG', value: targetData.eng.utd20, color: 'from-indigo-600 to-indigo-400' },
                                ...(targetData.eng.baz ? [{ label: 'BAZ ENG', value: targetData.eng.baz, color: 'from-cyan-600 to-cyan-400' }] : []),
                                { label: 'SLK ENG', value: targetData.eng.slk, color: 'from-teal-600 to-teal-400' }
                              ];
                              const maxEngValue = Math.max(...engTargets.map(t => t.value), 1);
                              return engTargets.map((target, index) => (
                                <div key={index} className="flex flex-col items-center gap-2 flex-1">
                                  <div
                                    className={`w-full bg-gradient-to-t ${target.color} flex items-start justify-center text-white font-bold text-sm pt-2 rounded-t-lg`}
                                    style={{ height: `${(target.value / maxEngValue) * 350}px`, minHeight: '30px' }}
                                  >
                                    {target.value}
                                  </div>
                                  <span className="text-sm font-semibold text-gray-700 mt-2 text-center">{target.label}</span>
                                </div>
                              ));
                            })()}
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </div>
              ) : null}
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
                className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-rose-800 bg-clip-text text-transparent hover:from-rose-700 hover:to-rose-900 transition-all"
              >
                512 Army Base ERP
              </button>
              <div className="h-8 w-px bg-gray-300"></div>
              <div>
                <div className="text-sm font-semibold text-gray-900">GM Prod</div>
                <div className="text-xs text-gray-600">General Manager Production</div>
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

