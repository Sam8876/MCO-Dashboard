import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function MPOLogin() {
  const navigate = useNavigate()
  const [selectedSection, setSelectedSection] = useState('target')
  const [selectedTargetYear, setSelectedTargetYear] = useState('PY-2025-26')
  const [selectedCTCategory, setSelectedCTCategory] = useState('')
  const [selectedCTType, setSelectedCTType] = useState('')

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
      {/* Back Button */}
      <div className="mb-6">
        <button
          onClick={() => navigate('/dgm-wks-mtrl-dashboard')}
          className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back</span>
        </button>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-6">MPO - Material Provisioning Office</h3>

      {/* Main Section Selection Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="flex space-x-1 overflow-x-auto">
          <button
            onClick={() => {
              setSelectedSection('target')
            }}
            className={`px-6 py-3 font-semibold text-sm transition-all whitespace-nowrap ${
              selectedSection === 'target'
                ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            Target
          </button>
          <button
            onClick={() => {
              setSelectedSection('ct-details')
            setSelectedCTCategory('')
            setSelectedCTType('')
          }}
            className={`px-6 py-3 font-semibold text-sm transition-all whitespace-nowrap ${
              selectedSection === 'ct-details'
                ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            CT Details
          </button>
          <button
            onClick={() => setSelectedSection('issue-details')}
            className={`px-6 py-3 font-semibold text-sm transition-all whitespace-nowrap ${
              selectedSection === 'issue-details'
                ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            Issue Details
          </button>
          <button
            onClick={() => setSelectedSection('lm-summary')}
            className={`px-6 py-3 font-semibold text-sm transition-all whitespace-nowrap ${
              selectedSection === 'lm-summary'
                ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            LM Summary
          </button>
          <button
            onClick={() => setSelectedSection('lp-summary')}
            className={`px-6 py-3 font-semibold text-sm transition-all whitespace-nowrap ${
              selectedSection === 'lp-summary'
                ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            LP Summary
          </button>
          <button
            onClick={() => setSelectedSection('srb')}
            className={`px-6 py-3 font-semibold text-sm transition-all whitespace-nowrap ${
              selectedSection === 'srb'
                ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            SRB
          </button>
        </nav>
      </div>

      {/* Target Section - Imported from GM WKS MTRL */}
      {selectedSection === 'target' && (
        <div className="space-y-8">
          {/* Year Selection Dropdown */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <label htmlFor="year-select" className="block text-sm font-semibold text-gray-700 mb-2">
              Select Financial Year
            </label>
            <div className="flex items-center gap-3">
            <select
                id="year-select"
              value={selectedTargetYear}
              onChange={(e) => setSelectedTargetYear(e.target.value)}
                className="w-full md:w-64 px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm font-semibold"
              >
                <option value="">-- Select a Year --</option>
                <option value="PY-2023-24">PY-2023-24</option>
                <option value="PY-2024-25">PY-2024-25</option>
                <option value="PY-2025-26">PY-2025-26</option>
                <option value="PY-2026-27">PY-2026-27</option>
            </select>
              {selectedTargetYear && (
                <button
                  onClick={() => setSelectedTargetYear('')}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition-colors text-sm"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Content based on selected year */}
          {selectedTargetYear === 'PY-2023-24' ? (
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
          ) : selectedTargetYear === 'PY-2024-25' ? (
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

                    {/* Graph: Output vs Target */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">Output vs Target - VEH</h3>
                      <div className="flex items-end justify-around h-96 border-l-2 border-b-2 border-gray-400 pl-4 pb-4">
                        <div className="flex flex-col items-center gap-2">
                          <div
                            className="w-24 bg-gradient-to-t from-green-600 to-green-400 flex items-start justify-center text-white font-bold text-sm pt-2 rounded-t-lg"
                            style={{ height: `${(ctIssuedData.veh.output.total / 250) * 350}px`, minHeight: '30px' }}
                          >
                            {ctIssuedData.veh.output.total}
                          </div>
                          <span className="text-sm font-semibold text-gray-700 mt-2 text-center">Output</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                          <div
                            className="w-24 bg-gradient-to-t from-purple-600 to-purple-400 flex items-start justify-center text-white font-bold text-sm pt-2 rounded-t-lg"
                            style={{ height: `${((targetData.veh.ohI.bmpII + targetData.veh.ohI.iik + targetData.veh.ohII + targetData.veh.cmt + targetData.veh.vt72b) / 250) * 350}px`, minHeight: '30px' }}
                          >
                            {targetData.veh.ohI.bmpII + targetData.veh.ohI.iik + targetData.veh.ohII + targetData.veh.cmt + targetData.veh.vt72b}
                          </div>
                          <span className="text-sm font-semibold text-gray-700 mt-2 text-center">Target</span>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          ) : selectedTargetYear === 'PY-2025-26' ? (
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
          ) : selectedTargetYear === 'PY-2026-27' ? (
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

                    {/* Graph: Target Distribution */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">Target Distribution - VEH</h3>
                      <div className="flex items-end justify-around h-96 border-l-2 border-b-2 border-gray-400 pl-4 pb-4">
                        <div className="flex flex-col items-center gap-2">
                          <div
                            className="w-20 bg-gradient-to-t from-blue-600 to-blue-400 flex items-start justify-center text-white font-bold text-xs pt-2 rounded-t-lg"
                            style={{ height: `${(targetData.veh.ohI.bmpII / 100) * 350}px`, minHeight: '30px' }}
                          >
                            {targetData.veh.ohI.bmpII}
                          </div>
                          <span className="text-xs font-semibold text-gray-700 mt-2 text-center">OH-I<br/>BMP II</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                          <div
                            className="w-20 bg-gradient-to-t from-purple-600 to-purple-400 flex items-start justify-center text-white font-bold text-xs pt-2 rounded-t-lg"
                            style={{ height: `${(targetData.veh.ohI.iik / 100) * 350}px`, minHeight: '30px' }}
                          >
                            {targetData.veh.ohI.iik}
                          </div>
                          <span className="text-xs font-semibold text-gray-700 mt-2 text-center">OH-I<br/>BMP IIK</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                          <div
                            className="w-20 bg-gradient-to-t from-green-600 to-green-400 flex items-start justify-center text-white font-bold text-xs pt-2 rounded-t-lg"
                            style={{ height: `${(targetData.veh.ohII.bmpII / 100) * 350}px`, minHeight: '30px' }}
                          >
                            {targetData.veh.ohII.bmpII}
                          </div>
                          <span className="text-xs font-semibold text-gray-700 mt-2 text-center">OH-II<br/>BMP II</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                          <div
                            className="w-20 bg-gradient-to-t from-orange-600 to-orange-400 flex items-start justify-center text-white font-bold text-xs pt-2 rounded-t-lg"
                            style={{ height: `${(targetData.veh.cmt / 100) * 350}px`, minHeight: '30px' }}
                          >
                            {targetData.veh.cmt}
                          </div>
                          <span className="text-xs font-semibold text-gray-700 mt-2 text-center">CMT</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                          <div
                            className="w-20 bg-gradient-to-t from-red-600 to-red-400 flex items-start justify-center text-white font-bold text-xs pt-2 rounded-t-lg"
                            style={{ height: `${(targetData.veh.vt72b / 100) * 350}px`, minHeight: '30px' }}
                          >
                            {targetData.veh.vt72b}
                          </div>
                          <span className="text-xs font-semibold text-gray-700 mt-2 text-center">VT-72B</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">Target Distribution - ENG</h3>
                      <div className="flex items-end justify-around h-96 border-l-2 border-b-2 border-gray-400 pl-4 pb-4">
                        <div className="flex flex-col items-center gap-2">
                          <div
                            className="w-24 bg-gradient-to-t from-indigo-600 to-indigo-400 flex items-start justify-center text-white font-bold text-sm pt-2 rounded-t-lg"
                            style={{ height: `${(targetData.eng.utd20 / 300) * 350}px`, minHeight: '30px' }}
                          >
                            {targetData.eng.utd20}
                          </div>
                          <span className="text-sm font-semibold text-gray-700 mt-2 text-center">UTD-20 ENG</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                          <div
                            className="w-24 bg-gradient-to-t from-teal-600 to-teal-400 flex items-start justify-center text-white font-bold text-sm pt-2 rounded-t-lg"
                            style={{ height: `${(targetData.eng.slk / 300) * 350}px`, minHeight: '30px' }}
                          >
                            {targetData.eng.slk}
                          </div>
                          <span className="text-sm font-semibold text-gray-700 mt-2 text-center">SLK ENG</span>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          ) : null}
        </div>
      )}

      {/* CT Details Section */}
      {selectedSection === 'ct-details' && (
        <div>
          <h4 className="text-xl font-bold text-gray-900 mb-4">CT Details</h4>
          
          {/* CT Category Selection */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Select CT Category
            </label>
            <select
              value={selectedCTCategory}
              onChange={(e) => {
                setSelectedCTCategory(e.target.value)
                setSelectedCTType('')
              }}
              className="w-full max-w-md px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white text-gray-900 font-medium"
            >
              <option value="">-- Select CT Category --</option>
              <option value="cf-ct-2024-25">CF CT details PY-2024-25</option>
              <option value="ct-issued-2025-26">CT issued PY 2025-26</option>
            </select>
          </div>

          {/* CT Type Selection */}
          {selectedCTCategory && (
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Select CT Type
              </label>
              <select
                value={selectedCTType}
                onChange={(e) => setSelectedCTType(e.target.value)}
                className="w-full max-w-md px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white text-gray-900 font-medium"
              >
                <option value="">-- Select CT Type --</option>
                <option value="oh1-unified">OH-I unified</option>
                <option value="bmp-pec">BMP-II PEC</option>
                <option value="cmt-pec">CMT PEC</option>
                <option value="udt-20">UDT-20 ENGs</option>
                <option value="vt-72">VT-72 B</option>
              </select>
            </div>
          )}

          {/* CT Details Tables */}
          {selectedCTCategory && selectedCTType && (
            <>
              <div className="mb-4 flex justify-end">
                <button
                  onClick={() => {
                    setSelectedCTCategory('')
                    setSelectedCTType('')
                  }}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Clear
                </button>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-sm font-semibold mb-1">Total CTs</p>
                      <p className="text-3xl font-bold">5</p>
                    </div>
                    <div className="bg-white bg-opacity-20 rounded-full p-3">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100 text-sm font-semibold mb-1">Total OHS Scale</p>
                      <p className="text-3xl font-bold">3,860</p>
                    </div>
                    <div className="bg-white bg-opacity-20 rounded-full p-3">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100 text-sm font-semibold mb-1">Total NA Items</p>
                      <p className="text-3xl font-bold">223</p>
                    </div>
                    <div className="bg-white bg-opacity-20 rounded-full p-3">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100 text-sm font-semibold mb-1">Total Available Items</p>
                      <p className="text-3xl font-bold">3,637</p>
                    </div>
                    <div className="bg-white bg-opacity-20 rounded-full p-3">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* CT Summary Table */}
              <div className="mb-8">
                <h5 className="text-lg font-bold text-gray-900 mb-4">CT Summary</h5>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="border border-gray-400 px-3 py-2 font-semibold">Serial Number</th>
                        <th className="border border-gray-400 px-3 py-2 font-semibold">CT</th>
                        <th className="border border-gray-400 px-3 py-2 font-semibold">OHS Scale</th>
                        <th className="border border-gray-400 px-3 py-2 font-semibold">NA/A Items</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-3 py-2 text-center">1</td>
                        <td className="border border-gray-300 px-3 py-2">CT-2025-001</td>
                        <td className="border border-gray-300 px-3 py-2 text-center">850</td>
                        <td className="border border-gray-300 px-3 py-2 text-center">45 NA / 805 A</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-3 py-2 text-center">2</td>
                        <td className="border border-gray-300 px-3 py-2">CT-2025-002</td>
                        <td className="border border-gray-300 px-3 py-2 text-center">620</td>
                        <td className="border border-gray-300 px-3 py-2 text-center">38 NA / 582 A</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-3 py-2 text-center">3</td>
                        <td className="border border-gray-300 px-3 py-2">CT-2025-003</td>
                        <td className="border border-gray-300 px-3 py-2 text-center">1120</td>
                        <td className="border border-gray-300 px-3 py-2 text-center">67 NA / 1053 A</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-3 py-2 text-center">4</td>
                        <td className="border border-gray-300 px-3 py-2">CT-2025-004</td>
                        <td className="border border-gray-300 px-3 py-2 text-center">490</td>
                        <td className="border border-gray-300 px-3 py-2 text-center">22 NA / 468 A</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-3 py-2 text-center">5</td>
                        <td className="border border-gray-300 px-3 py-2">CT-2025-005</td>
                        <td className="border border-gray-300 px-3 py-2 text-center">780</td>
                        <td className="border border-gray-300 px-3 py-2 text-center">51 NA / 729 A</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* NA Items Detail Table */}
              <div>
                <h5 className="text-lg font-bold text-gray-900 mb-4">Carry Forward CT - Action Taken</h5>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="border border-gray-400 px-3 py-2 font-semibold">S.No</th>
                        <th className="border border-gray-400 px-3 py-2 font-semibold">Item Code</th>
                        <th className="border border-gray-400 px-3 py-2 font-semibold">Nomenclature</th>
                        <th className="border border-gray-400 px-3 py-2 font-semibold">Priority</th>
                        <th className="border border-gray-400 px-3 py-2 font-semibold">Action Taken</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-3 py-2 text-center">1</td>
                        <td className="border border-gray-300 px-3 py-2">25493</td>
                        <td className="border border-gray-300 px-3 py-2">ROTATING SOCKET ASSY</td>
                        <td className="border border-gray-300 px-3 py-2 text-center"><span className="px-2 py-1 bg-red-100 text-red-800 rounded font-semibold text-xs">P1</span></td>
                        <td className="border border-gray-300 px-3 py-2 text-center"><span className="px-2 py-1 bg-blue-100 text-blue-800 rounded font-semibold text-xs">LM</span></td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-3 py-2 text-center">2</td>
                        <td className="border border-gray-300 px-3 py-2">25318</td>
                        <td className="border border-gray-300 px-3 py-2">HANDLE RECESS</td>
                        <td className="border border-gray-300 px-3 py-2 text-center"><span className="px-2 py-1 bg-orange-100 text-orange-800 rounded font-semibold text-xs">P2</span></td>
                        <td className="border border-gray-300 px-3 py-2 text-center"><span className="px-2 py-1 bg-green-100 text-green-800 rounded font-semibold text-xs">LP</span></td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-3 py-2 text-center">3</td>
                        <td className="border border-gray-300 px-3 py-2">25319</td>
                        <td className="border border-gray-300 px-3 py-2">PIN SHOULDERD HEADED</td>
                        <td className="border border-gray-300 px-3 py-2 text-center"><span className="px-2 py-1 bg-red-100 text-red-800 rounded font-semibold text-xs">P1</span></td>
                        <td className="border border-gray-300 px-3 py-2 text-center"><span className="px-2 py-1 bg-blue-100 text-blue-800 rounded font-semibold text-xs">LM</span></td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-3 py-2 text-center">4</td>
                        <td className="border border-gray-300 px-3 py-2">25320</td>
                        <td className="border border-gray-300 px-3 py-2">SPRING HELICAL COMPRESSION</td>
                        <td className="border border-gray-300 px-3 py-2 text-center"><span className="px-2 py-1 bg-orange-100 text-orange-800 rounded font-semibold text-xs">P2</span></td>
                        <td className="border border-gray-300 px-3 py-2 text-center"><span className="px-2 py-1 bg-green-100 text-green-800 rounded font-semibold text-xs">LP</span></td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-3 py-2 text-center">5</td>
                        <td className="border border-gray-300 px-3 py-2">25321</td>
                        <td className="border border-gray-300 px-3 py-2">HANDLE RECESS</td>
                        <td className="border border-gray-300 px-3 py-2 text-center"><span className="px-2 py-1 bg-red-100 text-red-800 rounded font-semibold text-xs">P1</span></td>
                        <td className="border border-gray-300 px-3 py-2 text-center"><span className="px-2 py-1 bg-blue-100 text-blue-800 rounded font-semibold text-xs">LM</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Issue Details Section */}
      {selectedSection === 'issue-details' && (
        <div>
          <h4 className="text-xl font-bold text-gray-900 mb-6">Issue Details</h4>
          <div className="overflow-x-auto">
            <div className="mb-4 text-center font-semibold text-base">ISSUE DETAILS 2025-26 : CMT PEC (ARMT)</div>
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-400 px-2 py-2 font-semibold" rowSpan={2}>SER<br/>NO</th>
                  <th className="border border-gray-400 px-2 py-2 font-semibold" rowSpan={2}>OHS<br/>SER No</th>
                  <th className="border border-gray-400 px-2 py-2 font-semibold" rowSpan={2}>COMP<br/>NO</th>
                  <th className="border border-gray-400 px-2 py-2 font-semibold" rowSpan={2}>Mtrl No</th>
                  <th className="border border-gray-400 px-2 py-2 font-semibold" rowSpan={2}>COS/<br/>SECTION</th>
                  <th className="border border-gray-400 px-2 py-2 font-semibold" rowSpan={2}>PART No</th>
                  <th className="border border-gray-400 px-2 py-2 font-semibold" rowSpan={2}>NOMENCLATURE</th>
                  <th className="border border-gray-400 px-2 py-2 font-semibold" rowSpan={2}>NO OFF</th>
                  <th className="border border-gray-400 px-2 py-2 font-semibold" rowSpan={2}>SCALE</th>
                  <th className="border border-gray-400 px-2 py-2 font-semibold" colSpan={3}>CF ISSUE VOUCHER<br/>(11 VEHs)</th>
                  <th className="border border-gray-400 px-2 py-2 font-semibold" colSpan={3}>CF @NA CT<br/>(11 VEHs)</th>
                </tr>
                <tr className="bg-gray-100">
                  <th className="border border-gray-400 px-2 py-1 font-semibold text-xs">REQD<br/>QTY</th>
                  <th className="border border-gray-400 px-2 py-1 font-semibold text-xs">ISSUE<br/>QTY</th>
                  <th className="border border-gray-400 px-2 py-1 font-semibold text-xs">NA NO</th>
                  <th className="border border-gray-400 px-2 py-1 font-semibold text-xs">REQD<br/>QTY</th>
                  <th className="border border-gray-400 px-2 py-1 font-semibold text-xs">ISSUE<br/>QTY</th>
                  <th className="border border-gray-400 px-2 py-1 font-semibold text-xs">NA NO</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-2 py-2 text-center">1</td>
                  <td className="border border-gray-300 px-2 py-2 text-center">77</td>
                  <td className="border border-gray-300 px-2 py-2 text-center">25493</td>
                  <td className="border border-gray-300 px-2 py-2 text-center">25493</td>
                  <td className="border border-gray-300 px-2 py-2">LV2/ICVs</td>
                  <td className="border border-gray-300 px-2 py-2 text-xs">AMG-72089</td>
                  <td className="border border-gray-300 px-2 py-2">ROTATING SOCKET ASSY</td>
                  <td className="border border-gray-300 px-2 py-2 text-center">1</td>
                  <td className="border border-gray-300 px-2 py-2 text-center">100</td>
                  <td className="border border-gray-300 px-2 py-2 text-center"></td>
                  <td className="border border-gray-300 px-2 py-2 text-center"></td>
                  <td className="border border-gray-300 px-2 py-2 text-center"></td>
                  <td className="border border-gray-300 px-2 py-2 text-center">11</td>
                  <td className="border border-gray-300 px-2 py-2 text-center">NA</td>
                  <td className="border border-gray-300 px-2 py-2 text-center">251007999</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-2 py-2 text-center">2</td>
                  <td className="border border-gray-300 px-2 py-2 text-center">174</td>
                  <td className="border border-gray-300 px-2 py-2 text-center">25318</td>
                  <td className="border border-gray-300 px-2 py-2 text-center">25318</td>
                  <td className="border border-gray-300 px-2 py-2">LV2/ICVs</td>
                  <td className="border border-gray-300 px-2 py-2 text-xs">5340-185387 (6745-130-2014)</td>
                  <td className="border border-gray-300 px-2 py-2">HANDLE RECESS</td>
                  <td className="border border-gray-300 px-2 py-2 text-center">7</td>
                  <td className="border border-gray-300 px-2 py-2 text-center">140</td>
                  <td className="border border-gray-300 px-2 py-2 text-center">16</td>
                  <td className="border border-gray-300 px-2 py-2 text-center">16</td>
                  <td className="border border-gray-300 px-2 py-2 text-center">251002206</td>
                  <td className="border border-gray-300 px-2 py-2 text-center"></td>
                  <td className="border border-gray-300 px-2 py-2 text-center"></td>
                  <td className="border border-gray-300 px-2 py-2 text-center"></td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-2 py-2 text-center">3</td>
                  <td className="border border-gray-300 px-2 py-2 text-center">175</td>
                  <td className="border border-gray-300 px-2 py-2 text-center">25319</td>
                  <td className="border border-gray-300 px-2 py-2 text-center">25319</td>
                  <td className="border border-gray-300 px-2 py-2">LV2/ICVs</td>
                  <td className="border border-gray-300 px-2 py-2 text-xs">5315-053170(6745-130-2015)</td>
                  <td className="border border-gray-300 px-2 py-2">PIN SHOULDERD HEADED</td>
                  <td className="border border-gray-300 px-2 py-2 text-center">7</td>
                  <td className="border border-gray-300 px-2 py-2 text-center">140</td>
                  <td className="border border-gray-300 px-2 py-2 text-center"></td>
                  <td className="border border-gray-300 px-2 py-2 text-center"></td>
                  <td className="border border-gray-300 px-2 py-2 text-center"></td>
                  <td className="border border-gray-300 px-2 py-2 text-center">27</td>
                  <td className="border border-gray-300 px-2 py-2 text-center">NR</td>
                  <td className="border border-gray-300 px-2 py-2 text-center"></td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-2 py-2 text-center">4</td>
                  <td className="border border-gray-300 px-2 py-2 text-center">176</td>
                  <td className="border border-gray-300 px-2 py-2 text-center">25320</td>
                  <td className="border border-gray-300 px-2 py-2 text-center">25320</td>
                  <td className="border border-gray-300 px-2 py-2">LV2/ICVs</td>
                  <td className="border border-gray-300 px-2 py-2 text-xs">5360-042773 (6745-130-2016)</td>
                  <td className="border border-gray-300 px-2 py-2">SPRING HELICAL COMPRESSION</td>
                  <td className="border border-gray-300 px-2 py-2 text-center">7</td>
                  <td className="border border-gray-300 px-2 py-2 text-center">700</td>
                  <td className="border border-gray-300 px-2 py-2 text-center">77</td>
                  <td className="border border-gray-300 px-2 py-2 text-center">77</td>
                  <td className="border border-gray-300 px-2 py-2 text-center">251002207</td>
                  <td className="border border-gray-300 px-2 py-2 text-center"></td>
                  <td className="border border-gray-300 px-2 py-2 text-center"></td>
                  <td className="border border-gray-300 px-2 py-2 text-center"></td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-2 py-2 text-center">5</td>
                  <td className="border border-gray-300 px-2 py-2 text-center">177</td>
                  <td className="border border-gray-300 px-2 py-2 text-center">25321</td>
                  <td className="border border-gray-300 px-2 py-2 text-center">25321</td>
                  <td className="border border-gray-300 px-2 py-2">LV2/ICVs</td>
                  <td className="border border-gray-300 px-2 py-2 text-xs">5340-184952 (6745-130-2041)</td>
                  <td className="border border-gray-300 px-2 py-2">HANDLE RECESS</td>
                  <td className="border border-gray-300 px-2 py-2 text-center">16</td>
                  <td className="border border-gray-300 px-2 py-2 text-center">200</td>
                  <td className="border border-gray-300 px-2 py-2 text-center">22</td>
                  <td className="border border-gray-300 px-2 py-2 text-center">22</td>
                  <td className="border border-gray-300 px-2 py-2 text-center">251002208</td>
                  <td className="border border-gray-300 px-2 py-2 text-center"></td>
                  <td className="border border-gray-300 px-2 py-2 text-center"></td>
                  <td className="border border-gray-300 px-2 py-2 text-center"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* LM Summary Section */}
      {selectedSection === 'lm-summary' && (
        <div>
          <h4 className="text-xl font-bold text-gray-900 mb-6">LM Summary</h4>
          
          {/* LM Summary Data */}
          {(() => {
            const lmSummaryData = [
              {
                serNo: 1,
                eqpt: 'CMT',
                lmWoNo: 'LM/OH/CMT/SRD/B/MCO',
                date: '10-05-2023',
                sec: 'SRD',
                partNo: 'KG/CMT/NBC (6745-71-SB6502)',
                ohsNo: 95,
                oh1Ohs: '',
                oh2Ohs: '',
                cat: 'PEC',
                depot: 'CAFVD KIRKEE',
                nomen: 'PIPE',
                noOff: 1,
                scale: 70,
                oh2Scale: '',
                qty: 11,
                meCellFwdDt: '26-05-2023',
                meCellIndexNo: 9505,
                essReceiptDt: '21-06-2023',
                mtrlAvbl: '',
                lprDtByEss: '71 & 72 DT 22/06/23',
                lprByMco: '',
                lpoFolderNo: '',
                soNo: '316, 333',
                soDt: '21-07-2023, 26/7/23',
                wcnNoDtByRi: '',
                mfrSparesIssuedToRespSec: 'SRD',
                stage: 'Wo Rel',
                status: 'WO REL',
                statusDt: '29-02-2024',
                year: '2023-24',
                remarks: ''
              },
              {
                serNo: 2,
                eqpt: 'CMT',
                lmWoNo: 'LM/OH/CMT/SRD/9/MCO',
                date: '10-05-2023',
                sec: 'SRD',
                partNo: 'KG/CMT/NBC (6745-71-SB6503)',
                ohsNo: 96,
                oh1Ohs: '',
                oh2Ohs: '',
                cat: 'PEC',
                depot: 'CAFVD KIRKEE',
                nomen: 'PIPE',
                noOff: 1,
                scale: 70,
                oh2Scale: '',
                qty: 11,
                meCellFwdDt: '26-05-2023',
                meCellIndexNo: 9506,
                essReceiptDt: '21-06-2023',
                mtrlAvbl: '',
                lprDtByEss: '71 & 72 DT 22/06/23',
                lprByMco: '',
                lpoFolderNo: '',
                soNo: '',
                soDt: '',
                wcnNoDtByRi: '',
                mfrSparesIssuedToRespSec: 'SRD',
                stage: 'Wo Rel',
                status: 'WO REL',
                statusDt: '',
                year: '2023-24',
                remarks: ''
              },
              {
                serNo: 3,
                eqpt: 'CMT',
                lmWoNo: 'LM/OH/CMT/SRD/11/MCO',
                date: '10-05-2023',
                sec: 'SRD',
                partNo: 'KG/CMT/NBC (6745-71-SB6505)',
                ohsNo: 98,
                oh1Ohs: '',
                oh2Ohs: '',
                cat: 'PEC',
                depot: 'CAFVD KIRKEE',
                nomen: 'PIPE',
                noOff: 1,
                scale: 70,
                oh2Scale: '',
                qty: 11,
                meCellFwdDt: '26-05-2023',
                meCellIndexNo: 9508,
                essReceiptDt: '21-06-2023',
                mtrlAvbl: '',
                lprDtByEss: '71 & 72 DT 22/06/23',
                lprByMco: '',
                lpoFolderNo: '',
                soNo: '',
                soDt: '',
                wcnNoDtByRi: '',
                mfrSparesIssuedToRespSec: 'SRD',
                stage: 'Wo Rel',
                status: 'WO REL',
                statusDt: '',
                year: '2023-24',
                remarks: ''
              },
              {
                serNo: 4,
                eqpt: 'BMPIIK',
                lmWoNo: 'LM/OH/BMPK/108/SRD/MCO',
                date: '08-07-2023',
                sec: 'SRD',
                partNo: 'LV2/CVs, 675-08-SB123',
                ohsNo: 596,
                oh1Ohs: '',
                oh2Ohs: '',
                cat: 'UNIFIED',
                depot: 'CAFVD KIRKEE',
                nomen: 'TUBE',
                noOff: 1,
                scale: 60,
                oh2Scale: '',
                qty: 69,
                meCellFwdDt: '22-08-2023',
                meCellIndexNo: 9683,
                essReceiptDt: '20-10-2023',
                mtrlAvbl: 'Part Mtrl Avbl 221 222 223 224 DT 15/01/24',
                lprDtByEss: '',
                lprByMco: '',
                lpoFolderNo: '6114, 6115, 6116, 6127',
                soNo: '221-, 842/841, 222-836/, 224-831, 223-829',
                soDt: '17-02-2024/, 14-02-2024, 10-02-2024, 10-2-2024',
                wcnNoDtByRi: '',
                mfrSparesIssuedToRespSec: '',
                stage: 'Wo Rel',
                status: 'WO REL',
                statusDt: '12-06-2024',
                year: '2023-24',
                remarks: ''
              }
            ];

            // Calculate LM Summary statistics
            const totalLMWOs = lmSummaryData.length;
            const totalQty = lmSummaryData.reduce((sum, item) => sum + (item.qty || 0), 0);
            const woRelCount = lmSummaryData.filter(item => item.status === 'WO REL').length;
            const pendingCount = lmSummaryData.filter(item => item.status !== 'WO REL').length;

            return (
              <>
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-100 text-sm font-semibold mb-1">Total LM WOs</p>
                        <p className="text-3xl font-bold">{totalLMWOs}</p>
                      </div>
                      <div className="bg-white bg-opacity-20 rounded-full p-3">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-100 text-sm font-semibold mb-1">Total Quantity</p>
                        <p className="text-3xl font-bold">{totalQty}</p>
                      </div>
                      <div className="bg-white bg-opacity-20 rounded-full p-3">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-orange-100 text-sm font-semibold mb-1">WO Released</p>
                        <p className="text-3xl font-bold">{woRelCount}</p>
                      </div>
                      <div className="bg-white bg-opacity-20 rounded-full p-3">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-100 text-sm font-semibold mb-1">Pending</p>
                        <p className="text-3xl font-bold">{pendingCount}</p>
                      </div>
                      <div className="bg-white bg-opacity-20 rounded-full p-3">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <div className="mb-4 text-center">
                    <div className="font-bold text-lg mb-2">SCALED LM 2025-26 WITH CARRY FWD</div>
                  </div>
                  <table className="w-full border-collapse text-xs">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border border-gray-400 px-1 py-2 font-semibold text-left">SER<br/>NO</th>
                      <th className="border border-gray-400 px-1 py-2 font-semibold text-left">EQPT</th>
                      <th className="border border-gray-400 px-1 py-2 font-semibold text-left">LM WO<br/>NO</th>
                      <th className="border border-gray-400 px-1 py-2 font-semibold text-left">DATE</th>
                      <th className="border border-gray-400 px-1 py-2 font-semibold text-left">SEC</th>
                      <th className="border border-gray-400 px-1 py-2 font-semibold text-left">PART<br/>NO</th>
                      <th className="border border-gray-400 px-1 py-2 font-semibold text-left">OHS<br/>NO</th>
                      <th className="border border-gray-400 px-1 py-2 font-semibold text-left">OHS-I</th>
                      <th className="border border-gray-400 px-1 py-2 font-semibold text-left">OHS-II</th>
                      <th className="border border-gray-400 px-1 py-2 font-semibold text-left">CAT</th>
                      <th className="border border-gray-400 px-1 py-2 font-semibold text-left">DEPOT</th>
                      <th className="border border-gray-400 px-1 py-2 font-semibold text-left">NOMEN</th>
                      <th className="border border-gray-400 px-1 py-2 font-semibold text-left">NO<br/>OFF</th>
                      <th className="border border-gray-400 px-1 py-2 font-semibold text-left">SCALE</th>
                      <th className="border border-gray-400 px-1 py-2 font-semibold text-left">OH-II<br/>SCALE</th>
                      <th className="border border-gray-400 px-1 py-2 font-semibold text-left">QTY</th>
                      <th className="border border-gray-400 px-1 py-2 font-semibold text-left">ME CELL<br/>FWD DT</th>
                      <th className="border border-gray-400 px-1 py-2 font-semibold text-left">ME CELL<br/>INDEX NO</th>
                      <th className="border border-gray-400 px-1 py-2 font-semibold text-left">ESS<br/>RECEIPT DT</th>
                      <th className="border border-gray-400 px-1 py-2 font-semibold text-left">MTRL<br/>AVBL</th>
                      <th className="border border-gray-400 px-1 py-2 font-semibold text-left">LPR DT<br/>BY ESS</th>
                      <th className="border border-gray-400 px-1 py-2 font-semibold text-left">LPR<br/>BY MCO</th>
                      <th className="border border-gray-400 px-1 py-2 font-semibold text-left">LPO<br/>FOLDER NO</th>
                      <th className="border border-gray-400 px-1 py-2 font-semibold text-left">SO No</th>
                      <th className="border border-gray-400 px-1 py-2 font-semibold text-left">SO DT</th>
                      <th className="border border-gray-400 px-1 py-2 font-semibold text-left">WCN No &<br/>DT by R&I</th>
                      <th className="border border-gray-400 px-1 py-2 font-semibold text-left">MFR SPARES<br/>ISSUED TO<br/>RESP SEC</th>
                      <th className="border border-gray-400 px-1 py-2 font-semibold text-left">STAGE</th>
                      <th className="border border-gray-400 px-1 py-2 font-semibold text-left">STATUS</th>
                      <th className="border border-gray-400 px-1 py-2 font-semibold text-left">STATUS<br/>DT</th>
                      <th className="border border-gray-400 px-1 py-2 font-semibold text-left">YEAR</th>
                      <th className="border border-gray-400 px-1 py-2 font-semibold text-left">REMARKS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lmSummaryData.map((item, index) => (
                      <tr 
                        key={item.serNo}
                        className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}
                      >
                        <td className="border border-gray-300 px-1 py-1 text-center">{item.serNo}</td>
                        <td className="border border-gray-300 px-1 py-1 text-center">{item.eqpt}</td>
                        <td className="border border-gray-300 px-1 py-1 text-xs">{item.lmWoNo}</td>
                        <td className="border border-gray-300 px-1 py-1 text-center">{item.date}</td>
                        <td className="border border-gray-300 px-1 py-1 text-center">{item.sec}</td>
                        <td className="border border-gray-300 px-1 py-1 text-xs font-mono">{item.partNo}</td>
                        <td className="border border-gray-300 px-1 py-1 text-center">{item.ohsNo}</td>
                        <td className="border border-gray-300 px-1 py-1 text-center">{item.oh1Ohs || '-'}</td>
                        <td className="border border-gray-300 px-1 py-1 text-center">{item.oh2Ohs || '-'}</td>
                        <td className="border border-gray-300 px-1 py-1 text-center">{item.cat}</td>
                        <td className="border border-gray-300 px-1 py-1 text-xs">{item.depot}</td>
                        <td className="border border-gray-300 px-1 py-1">{item.nomen}</td>
                        <td className="border border-gray-300 px-1 py-1 text-center">{item.noOff}</td>
                        <td className="border border-gray-300 px-1 py-1 text-center">{item.scale}</td>
                        <td className="border border-gray-300 px-1 py-1 text-center">{item.oh2Scale || '-'}</td>
                        <td className="border border-gray-300 px-1 py-1 text-center">{item.qty}</td>
                        <td className="border border-gray-300 px-1 py-1 text-center">{item.meCellFwdDt}</td>
                        <td className="border border-gray-300 px-1 py-1 text-center">{item.meCellIndexNo}</td>
                        <td className="border border-gray-300 px-1 py-1 text-center">{item.essReceiptDt}</td>
                        <td className="border border-gray-300 px-1 py-1 text-xs">{item.mtrlAvbl || '-'}</td>
                        <td className="border border-gray-300 px-1 py-1 text-xs">{item.lprDtByEss || '-'}</td>
                        <td className="border border-gray-300 px-1 py-1 text-center">{item.lprByMco || '-'}</td>
                        <td className="border border-gray-300 px-1 py-1 text-xs">{item.lpoFolderNo || '-'}</td>
                        <td className="border border-gray-300 px-1 py-1 text-xs">{item.soNo || '-'}</td>
                        <td className="border border-gray-300 px-1 py-1 text-xs">{item.soDt || '-'}</td>
                        <td className="border border-gray-300 px-1 py-1 text-xs">{item.wcnNoDtByRi || '-'}</td>
                        <td className="border border-gray-300 px-1 py-1 text-xs">{item.mfrSparesIssuedToRespSec || '-'}</td>
                        <td className="border border-gray-300 px-1 py-1 text-center">{item.stage}</td>
                        <td className="border border-gray-300 px-1 py-1 text-center">{item.status}</td>
                        <td className="border border-gray-300 px-1 py-1 text-center">{item.statusDt || '-'}</td>
                        <td className="border border-gray-300 px-1 py-1 text-center">{item.year}</td>
                        <td className="border border-gray-300 px-1 py-1 text-xs">{item.remarks || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                </div>
              </>
            );
          })()}
        </div>
      )}

      {/* SRB (Spares Requirement Book) Section */}
      {selectedSection === 'srb' && (
        <div>
          <h4 className="text-xl font-bold text-gray-900 mb-6">SRB (Spares Requirement Book)</h4>
          
          {/* SRB Data */}
          {(() => {
            const srbData = [
              {
                serNo: 1, ohsNo: 1, partNo: '5330-390235 (675-10-29-01)', nomenclature: 'SEAL PLAIN', aU: 'Nos', noOff: 1, scale: 80,
                ohOutput: 59, depthReqd: 48,
                virUnsv: 0, virDefi: 0, virRepairable: 0, virSer: 0, virTotal: 0,
                newOrdRange: 0, newOrdDepth: 0,
                newLPRange: 0, newLPDepth: 0,
                newLMRange: 0, newLMDepth: 0,
                newLRCRange: 0, newLRCDepth: 0,
                retrievedRange: 0, retrievedDepth: 0,
                repairedRange: 0, repairedDepth: 0,
                reclaimedRange: 0, reclaimedDepth: 0,
                rolloverRange: 0, rolloverDepth: 0,
                totalRange: 48, totalDepth: 48,
                reqmtVsIssue: 0,
                percIncrDecr: 0,
                changeInScaleAuth: 'No Change',
                remarks: '-'
              },
              {
                serNo: 2, ohsNo: 2, partNo: '5330-390228 (675-10-20-03)', nomenclature: 'RETAINER PACKING', aU: 'Nos', noOff: 1, scale: 80,
                ohOutput: 59, depthReqd: 48,
                virUnsv: 0, virDefi: 0, virRepairable: 0, virSer: 0, virTotal: 0,
                newOrdRange: 0, newOrdDepth: 0,
                newLPRange: 0, newLPDepth: 0,
                newLMRange: 0, newLMDepth: 0,
                newLRCRange: 0, newLRCDepth: 0,
                retrievedRange: 0, retrievedDepth: 0,
                repairedRange: 0, repairedDepth: 0,
                reclaimedRange: 0, reclaimedDepth: 0,
                rolloverRange: 0, rolloverDepth: 0,
                totalRange: 48, totalDepth: 48,
                reqmtVsIssue: 0,
                percIncrDecr: 0,
                changeInScaleAuth: 'No Change',
                remarks: '-'
              },
              {
                serNo: 3, ohsNo: 3, partNo: '4730-079089 (675-10-27)', nomenclature: 'ADAPTOR BUSHING', aU: 'Nos', noOff: 1, scale: 50,
                ohOutput: 59, depthReqd: 30,
                virUnsv: 0, virDefi: 0, virRepairable: 0, virSer: 0, virTotal: 0,
                newOrdRange: 0, newOrdDepth: 0,
                newLPRange: 12, newLPDepth: 12,
                newLMRange: 0, newLMDepth: 0,
                newLRCRange: 0, newLRCDepth: 0,
                retrievedRange: 0, retrievedDepth: 0,
                repairedRange: 0, repairedDepth: 0,
                reclaimedRange: 0, reclaimedDepth: 0,
                rolloverRange: 0, rolloverDepth: 0,
                totalRange: 30, totalDepth: 30,
                reqmtVsIssue: 0,
                percIncrDecr: 0,
                changeInScaleAuth: 'No Change',
                remarks: '-'
              }
            ];

            // Calculate summary statistics
            const totalItems = srbData.length;
            const totalDepthReqd = srbData.reduce((sum, item) => sum + item.depthReqd, 0);
            const totalIssueDepth = srbData.reduce((sum, item) => sum + item.totalDepth, 0);
            const totalVirItems = srbData.filter(item => item.virTotal > 0).length;
            const totalNewLP = srbData.reduce((sum, item) => sum + item.newLPDepth, 0);
            const totalNewLM = srbData.reduce((sum, item) => sum + item.newLMDepth, 0);
            const totalRepaired = srbData.reduce((sum, item) => sum + item.repairedDepth, 0);
            const totalReclaimed = srbData.reduce((sum, item) => sum + item.reclaimedDepth, 0);
            const avgScale = totalItems > 0 ? Math.round(srbData.reduce((sum, item) => sum + item.scale, 0) / totalItems) : 0;

            return (
              <>
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-rose-500 to-rose-600 rounded-xl shadow-lg p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-rose-100 text-sm font-semibold mb-1">Total Items</p>
                        <p className="text-3xl font-bold">{totalItems}</p>
                      </div>
                      <div className="bg-white bg-opacity-20 rounded-full p-3">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-100 text-sm font-semibold mb-1">Total Depth Required</p>
                        <p className="text-3xl font-bold">{totalDepthReqd}</p>
                      </div>
                      <div className="bg-white bg-opacity-20 rounded-full p-3">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-100 text-sm font-semibold mb-1">Total Issue Depth</p>
                        <p className="text-3xl font-bold">{totalIssueDepth}</p>
                      </div>
                      <div className="bg-white bg-opacity-20 rounded-full p-3">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-100 text-sm font-semibold mb-1">Avg Scale</p>
                        <p className="text-3xl font-bold">{avgScale}</p>
                      </div>
                      <div className="bg-white bg-opacity-20 rounded-full p-3">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-orange-100 text-sm font-semibold mb-1">Total VIR Items</p>
                        <p className="text-3xl font-bold">{totalVirItems}</p>
                      </div>
                      <div className="bg-white bg-opacity-20 rounded-full p-3">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl shadow-lg p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-cyan-100 text-sm font-semibold mb-1">New LP Depth</p>
                        <p className="text-3xl font-bold">{totalNewLP}</p>
                      </div>
                      <div className="bg-white bg-opacity-20 rounded-full p-3">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl shadow-lg p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-teal-100 text-sm font-semibold mb-1">New LM Depth</p>
                        <p className="text-3xl font-bold">{totalNewLM}</p>
                      </div>
                      <div className="bg-white bg-opacity-20 rounded-full p-3">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl shadow-lg p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-indigo-100 text-sm font-semibold mb-1">Repaired Depth</p>
                        <p className="text-3xl font-bold">{totalRepaired}</p>
                      </div>
                      <div className="bg-white bg-opacity-20 rounded-full p-3">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <div className="mb-4">
                    <div className="text-center font-bold text-lg mb-2">Spares Requirement Book</div>
                    <div className="text-sm text-gray-600 mb-4 text-center">OH Output (59) : PY 2024-25 - ARD SEC</div>
                  </div>
                  <table className="w-full border-collapse text-xs">
                  <thead>
                    {/* First Row - Main Headers */}
                    <tr className="bg-gray-200">
                      <th className="border border-gray-400 px-1 py-2 font-semibold" rowSpan={3}>Ser<br/>No</th>
                      <th className="border border-gray-400 px-1 py-2 font-semibold" rowSpan={3}>OHS<br/>No</th>
                      <th className="border border-gray-400 px-1 py-2 font-semibold" rowSpan={3}>Part<br/>No</th>
                      <th className="border border-gray-400 px-1 py-2 font-semibold" rowSpan={3}>Nomenclature</th>
                      <th className="border border-gray-400 px-1 py-2 font-semibold" rowSpan={3}>A/U</th>
                      <th className="border border-gray-400 px-1 py-2 font-semibold" rowSpan={3}>No<br/>off</th>
                      <th className="border border-gray-400 px-1 py-2 font-semibold" rowSpan={3}>Scale</th>
                      <th className="border border-gray-400 px-1 py-2 font-semibold" rowSpan={3}>OH Output<br/>(No of VEHS<br/>OH in PY)</th>
                      <th className="border border-gray-400 px-1 py-2 font-semibold" rowSpan={3}>Depth reqd<br/>for Tgt as<br/>per Scale</th>
                      <th className="border border-gray-400 px-1 py-2 font-semibold" colSpan={5}>VIR</th>
                      <th className="border border-gray-400 px-1 py-2 font-semibold" colSpan={18}>Issue Detl</th>
                      <th className="border border-gray-400 px-1 py-2 font-semibold" colSpan={3}>Revised Scale<br/>Recommendation</th>
                      <th className="border border-gray-400 px-1 py-2 font-semibold" rowSpan={3}>Remarks</th>
                    </tr>
                    {/* Second Row - VIR and Issue Detl Sub-headers */}
                    <tr className="bg-gray-100">
                      <th className="border border-gray-400 px-1 py-1 font-semibold text-xs">Unsv</th>
                      <th className="border border-gray-400 px-1 py-1 font-semibold text-xs">Defi</th>
                      <th className="border border-gray-400 px-1 py-1 font-semibold text-xs">Repairable</th>
                      <th className="border border-gray-400 px-1 py-1 font-semibold text-xs">Ser</th>
                      <th className="border border-gray-400 px-1 py-1 font-semibold text-xs">Total</th>
                      <th className="border border-gray-400 px-1 py-1 font-semibold text-xs" colSpan={2}>New(Ord)</th>
                      <th className="border border-gray-400 px-1 py-1 font-semibold text-xs" colSpan={2}>New(LP)</th>
                      <th className="border border-gray-400 px-1 py-1 font-semibold text-xs" colSpan={2}>New(LM)</th>
                      <th className="border border-gray-400 px-1 py-1 font-semibold text-xs" colSpan={2}>New(LRC)</th>
                      <th className="border border-gray-400 px-1 py-1 font-semibold text-xs" colSpan={2}>Retrieved &<br/>Cannibalised</th>
                      <th className="border border-gray-400 px-1 py-1 font-semibold text-xs" colSpan={2}>Repaired</th>
                      <th className="border border-gray-400 px-1 py-1 font-semibold text-xs" colSpan={2}>Reclaimed</th>
                      <th className="border border-gray-400 px-1 py-1 font-semibold text-xs" colSpan={2}>Rollover</th>
                      <th className="border border-gray-400 px-1 py-1 font-semibold text-xs" colSpan={2}>Total</th>
                      <th className="border border-gray-400 px-1 py-1 font-semibold text-xs">Reqmt Vs<br/>Issue Details</th>
                      <th className="border border-gray-400 px-1 py-1 font-semibold text-xs">% Incr/Decr<br/>in Scale= AF/H *100</th>
                      <th className="border border-gray-400 px-1 py-1 font-semibold text-xs">Change in<br/>Scale Auth</th>
                    </tr>
                    {/* Third Row - Range/Depth sub-columns */}
                    <tr className="bg-gray-100">
                      <th className="border border-gray-400 px-1 py-1"></th>
                      <th className="border border-gray-400 px-1 py-1"></th>
                      <th className="border border-gray-400 px-1 py-1"></th>
                      <th className="border border-gray-400 px-1 py-1"></th>
                      <th className="border border-gray-400 px-1 py-1"></th>
                      <th className="border border-gray-400 px-1 py-1 font-semibold text-xs">Range</th>
                      <th className="border border-gray-400 px-1 py-1 font-semibold text-xs">Depth</th>
                      <th className="border border-gray-400 px-1 py-1 font-semibold text-xs">Range</th>
                      <th className="border border-gray-400 px-1 py-1 font-semibold text-xs">Depth</th>
                      <th className="border border-gray-400 px-1 py-1 font-semibold text-xs">Range</th>
                      <th className="border border-gray-400 px-1 py-1 font-semibold text-xs">Depth</th>
                      <th className="border border-gray-400 px-1 py-1 font-semibold text-xs">Range</th>
                      <th className="border border-gray-400 px-1 py-1 font-semibold text-xs">Depth</th>
                      <th className="border border-gray-400 px-1 py-1 font-semibold text-xs">Range</th>
                      <th className="border border-gray-400 px-1 py-1 font-semibold text-xs">Depth</th>
                      <th className="border border-gray-400 px-1 py-1 font-semibold text-xs">Range</th>
                      <th className="border border-gray-400 px-1 py-1 font-semibold text-xs">Depth</th>
                      <th className="border border-gray-400 px-1 py-1 font-semibold text-xs">Range</th>
                      <th className="border border-gray-400 px-1 py-1 font-semibold text-xs">Depth</th>
                      <th className="border border-gray-400 px-1 py-1 font-semibold text-xs">Range</th>
                      <th className="border border-gray-400 px-1 py-1 font-semibold text-xs">Depth</th>
                      <th className="border border-gray-400 px-1 py-1 font-semibold text-xs">Range</th>
                      <th className="border border-gray-400 px-1 py-1 font-semibold text-xs">Depth</th>
                      <th className="border border-gray-400 px-1 py-1 font-semibold text-xs">Range</th>
                      <th className="border border-gray-400 px-1 py-1 font-semibold text-xs">Depth</th>
                      <th className="border border-gray-400 px-1 py-1"></th>
                      <th className="border border-gray-400 px-1 py-1"></th>
                      <th className="border border-gray-400 px-1 py-1"></th>
                      <th className="border border-gray-400 px-1 py-1"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {srbData.map((item, index) => (
                      <tr 
                        key={item.serNo}
                        className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}
                      >
                        <td className="border border-gray-300 px-1 py-1 text-center">{item.serNo}</td>
                        <td className="border border-gray-300 px-1 py-1 text-center">{item.ohsNo}</td>
                        <td className="border border-gray-300 px-1 py-1 font-mono text-xs">{item.partNo}</td>
                        <td className="border border-gray-300 px-1 py-1 text-xs">{item.nomenclature}</td>
                        <td className="border border-gray-300 px-1 py-1 text-center">{item.aU}</td>
                        <td className="border border-gray-300 px-1 py-1 text-center">{item.noOff}</td>
                        <td className="border border-gray-300 px-1 py-1 text-center">{item.scale}</td>
                        <td className="border border-gray-300 px-1 py-1 text-center">{item.ohOutput}</td>
                        <td className="border border-gray-300 px-1 py-1 text-center">{item.depthReqd}</td>
                        <td className="border border-gray-300 px-1 py-1 text-center">{item.virUnsv}</td>
                        <td className="border border-gray-300 px-1 py-1 text-center">{item.virDefi}</td>
                        <td className="border border-gray-300 px-1 py-1 text-center">{item.virRepairable}</td>
                        <td className="border border-gray-300 px-1 py-1 text-center">{item.virSer}</td>
                        <td className="border border-gray-300 px-1 py-1 text-center">{item.virTotal}</td>
                        <td className="border border-gray-300 px-1 py-1 text-center">{item.newOrdRange}</td>
                        <td className="border border-gray-300 px-1 py-1 text-center">{item.newOrdDepth}</td>
                        <td className="border border-gray-300 px-1 py-1 text-center">{item.newLPRange}</td>
                        <td className="border border-gray-300 px-1 py-1 text-center">{item.newLPDepth}</td>
                        <td className="border border-gray-300 px-1 py-1 text-center">{item.newLMRange}</td>
                        <td className="border border-gray-300 px-1 py-1 text-center">{item.newLMDepth}</td>
                        <td className="border border-gray-300 px-1 py-1 text-center">{item.newLRCRange}</td>
                        <td className="border border-gray-300 px-1 py-1 text-center">{item.newLRCDepth}</td>
                        <td className="border border-gray-300 px-1 py-1 text-center">{item.retrievedRange}</td>
                        <td className="border border-gray-300 px-1 py-1 text-center">{item.retrievedDepth}</td>
                        <td className="border border-gray-300 px-1 py-1 text-center">{item.repairedRange}</td>
                        <td className="border border-gray-300 px-1 py-1 text-center">{item.repairedDepth}</td>
                        <td className="border border-gray-300 px-1 py-1 text-center">{item.reclaimedRange}</td>
                        <td className="border border-gray-300 px-1 py-1 text-center">{item.reclaimedDepth}</td>
                        <td className="border border-gray-300 px-1 py-1 text-center">{item.rolloverRange}</td>
                        <td className="border border-gray-300 px-1 py-1 text-center">{item.rolloverDepth}</td>
                        <td className="border border-gray-300 px-1 py-1 text-center">{item.totalRange}</td>
                        <td className="border border-gray-300 px-1 py-1 text-center">{item.totalDepth}</td>
                        <td className="border border-gray-300 px-1 py-1 text-center">{item.reqmtVsIssue}</td>
                        <td className="border border-gray-300 px-1 py-1 text-center">{item.percIncrDecr}</td>
                        <td className="border border-gray-300 px-1 py-1 text-xs">{item.changeInScaleAuth}</td>
                        <td className="border border-gray-300 px-1 py-1 text-xs">{item.remarks}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                </div>
              </>
            );
          })()}
        </div>
      )}

      {/* LP Summary Section */}
      {selectedSection === 'lp-summary' && (
        <div>
          <h4 className="text-xl font-bold text-gray-900 mb-6">LP Summary</h4>
          
          {/* LP Summary Data */}
          {(() => {
            // Sample LP Summary data for calculations
            const lpSummaryData = [
              { serNo: 1, qty: 14, status: 'Under AON' },
              { serNo: 2, qty: 24, status: 'SO PLACED' },
              { serNo: 3, qty: 23, status: 'Cancelled' },
              { serNo: 4, qty: 5, status: 'Cancelled' },
              { serNo: 5, qty: 43, status: 'IFA CASE' }
            ];

            // Calculate LP Summary statistics
            const totalLPRs = lpSummaryData.length;
            const totalQty = lpSummaryData.reduce((sum, item) => sum + (item.qty || 0), 0);
            const soPlacedCount = lpSummaryData.filter(item => item.status === 'SO PLACED').length;
            const pendingCount = lpSummaryData.filter(item => item.status !== 'SO PLACED' && item.status !== 'Cancelled').length;

            return (
              <>
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-100 text-sm font-semibold mb-1">Total LPRs</p>
                        <p className="text-3xl font-bold">{totalLPRs}</p>
                      </div>
                      <div className="bg-white bg-opacity-20 rounded-full p-3">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-100 text-sm font-semibold mb-1">Total Quantity</p>
                        <p className="text-3xl font-bold">{totalQty}</p>
                      </div>
                      <div className="bg-white bg-opacity-20 rounded-full p-3">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-orange-100 text-sm font-semibold mb-1">SO Placed</p>
                        <p className="text-3xl font-bold">{soPlacedCount}</p>
                      </div>
                      <div className="bg-white bg-opacity-20 rounded-full p-3">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-100 text-sm font-semibold mb-1">Pending</p>
                        <p className="text-3xl font-bold">{pendingCount}</p>
                      </div>
                      <div className="bg-white bg-opacity-20 rounded-full p-3">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <div className="mb-4 text-center font-semibold text-base">SCALED LPR's FOR PY : 2025-26</div>
                  <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-400 px-2 py-2 font-semibold">Ser No</th>
                  <th className="border border-gray-400 px-2 py-2 font-semibold">Eqpt</th>
                  <th className="border border-gray-400 px-2 py-2 font-semibold">LPR No</th>
                  <th className="border border-gray-400 px-2 py-2 font-semibold">Date</th>
                  <th className="border border-gray-400 px-2 py-2 font-semibold">Sec</th>
                  <th className="border border-gray-400 px-2 py-2 font-semibold">PART NO</th>
                  <th className="border border-gray-400 px-2 py-2 font-semibold">OHS</th>
                  <th className="border border-gray-400 px-2 py-2 font-semibold">OHS-I</th>
                  <th className="border border-gray-400 px-2 py-2 font-semibold">OHS-II</th>
                  <th className="border border-gray-400 px-2 py-2 font-semibold">CAT</th>
                  <th className="border border-gray-400 px-2 py-2 font-semibold">DEPOT</th>
                  <th className="border border-gray-400 px-2 py-2 font-semibold">Item</th>
                  <th className="border border-gray-400 px-2 py-2 font-semibold">Nos<br/>OF</th>
                  <th className="border border-gray-400 px-2 py-2 font-semibold">Scale</th>
                  <th className="border border-gray-400 px-2 py-2 font-semibold">OH-II<br/>SCALE</th>
                  <th className="border border-gray-400 px-2 py-2 font-semibold">Qty</th>
                  <th className="border border-gray-400 px-2 py-2 font-semibold">UNIT</th>
                  <th className="border border-gray-400 px-2 py-2 font-semibold">Folder<br/>No</th>
                  <th className="border border-gray-400 px-2 py-2 font-semibold">ENG</th>
                  <th className="border border-gray-400 px-2 py-2 font-semibold">CST</th>
                  <th className="border border-gray-400 px-2 py-2 font-semibold">SANC</th>
                  <th className="border border-gray-400 px-2 py-2 font-semibold">SO NO</th>
                  <th className="border border-gray-400 px-2 py-2 font-semibold">SO Dt</th>
                  <th className="border border-gray-400 px-2 py-2 font-semibold">PDS</th>
                  <th className="border border-gray-400 px-2 py-2 font-semibold">Vendor</th>
                  <th className="border border-gray-400 px-2 py-2 font-semibold">Price Per<br/>Item</th>
                  <th className="border border-gray-400 px-2 py-2 font-semibold">GST%</th>
                  <th className="border border-gray-400 px-2 py-2 font-semibold">Store Recd</th>
                  <th className="border border-gray-400 px-2 py-2 font-semibold">Bill<br/>Submitted to<br/>CDA</th>
                  <th className="border border-gray-400 px-2 py-2 font-semibold">MPO<br/>STATUS</th>
                  <th className="border border-gray-400 px-2 py-2 font-semibold">MPO<br/>STATUS DT</th>
                  <th className="border border-gray-400 px-2 py-2 font-semibold">YEAR</th>
                  <th className="border border-gray-400 px-2 py-2 font-semibold">REMARKS</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-2 py-2 text-center">1</td>
                  <td className="border border-gray-300 px-2 py-2">BMPIIK</td>
                  <td className="border border-gray-300 px-2 py-2">LP/CH/BMPIIK/639/VRD/MCO</td>
                  <td className="border border-gray-300 px-2 py-2">28-02-2023</td>
                  <td className="border border-gray-300 px-2 py-2">VRD</td>
                  <td className="border border-gray-300 px-2 py-2 text-xs">LV2I/CVS (675-35-SB 123)</td>
                  <td className="border border-gray-300 px-2 py-2 text-center">1358</td>
                  <td className="border border-gray-300 px-2 py-2"></td>
                  <td className="border border-gray-300 px-2 py-2"></td>
                  <td className="border border-gray-300 px-2 py-2">UNIFIED</td>
                  <td className="border border-gray-300 px-2 py-2">CAF/VD<br/>KIRKEE</td>
                  <td className="border border-gray-300 px-2 py-2">TRACK</td>
                  <td className="border border-gray-300 px-2 py-2 text-center">2</td>
                  <td className="border border-gray-300 px-2 py-2 text-center">200</td>
                  <td className="border border-gray-300 px-2 py-2"></td>
                  <td className="border border-gray-300 px-2 py-2 text-center">14</td>
                  <td className="border border-gray-300 px-2 py-2"></td>
                  <td className="border border-gray-300 px-2 py-2">500T/25</td>
                  <td className="border border-gray-300 px-2 py-2"></td>
                  <td className="border border-gray-300 px-2 py-2"></td>
                  <td className="border border-gray-300 px-2 py-2"></td>
                  <td className="border border-gray-300 px-2 py-2"></td>
                  <td className="border border-gray-300 px-2 py-2"></td>
                  <td className="border border-gray-300 px-2 py-2"></td>
                  <td className="border border-gray-300 px-2 py-2"></td>
                  <td className="border border-gray-300 px-2 py-2"></td>
                  <td className="border border-gray-300 px-2 py-2"></td>
                  <td className="border border-gray-300 px-2 py-2">Under AON</td>
                  <td className="border border-gray-300 px-2 py-2"></td>
                  <td className="border border-gray-300 px-2 py-2">IFA CASE</td>
                  <td className="border border-gray-300 px-2 py-2"></td>
                  <td className="border border-gray-300 px-2 py-2">2022-23</td>
                  <td className="border border-gray-300 px-2 py-2"></td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-2 py-2 text-center">2</td>
                  <td className="border border-gray-300 px-2 py-2">BMPIIK</td>
                  <td className="border border-gray-300 px-2 py-2">LP/327/CH/SRD/ICV<br/>BMPIIK/MCO</td>
                  <td className="border border-gray-300 px-2 py-2">09-01-2024</td>
                  <td className="border border-gray-300 px-2 py-2">SRD</td>
                  <td className="border border-gray-300 px-2 py-2 text-xs">LV2I/CVS (765-03-SB179)</td>
                  <td className="border border-gray-300 px-2 py-2 text-center">46</td>
                  <td className="border border-gray-300 px-2 py-2"></td>
                  <td className="border border-gray-300 px-2 py-2"></td>
                  <td className="border border-gray-300 px-2 py-2">UNIFIED</td>
                  <td className="border border-gray-300 px-2 py-2">CAF/VD<br/>KIRKEE</td>
                  <td className="border border-gray-300 px-2 py-2">WATER RADIATOR</td>
                  <td className="border border-gray-300 px-2 py-2 text-center">1</td>
                  <td className="border border-gray-300 px-2 py-2 text-center">100</td>
                  <td className="border border-gray-300 px-2 py-2"></td>
                  <td className="border border-gray-300 px-2 py-2 text-center">24</td>
                  <td className="border border-gray-300 px-2 py-2"></td>
                  <td className="border border-gray-300 px-2 py-2">1035(B)<br/>(IFA)</td>
                  <td className="border border-gray-300 px-2 py-2">18-01-2025<br/>IFA</td>
                  <td className="border border-gray-300 px-2 py-2"></td>
                  <td className="border border-gray-300 px-2 py-2"></td>
                  <td className="border border-gray-300 px-2 py-2">24-09-1900</td>
                  <td className="border border-gray-300 px-2 py-2">03-10-2025</td>
                  <td className="border border-gray-300 px-2 py-2">31-01-2026</td>
                  <td className="border border-gray-300 px-2 py-2">PUNJ CO<br/>LTD</td>
                  <td className="border border-gray-300 px-2 py-2">177000</td>
                  <td className="border border-gray-300 px-2 py-2 text-center">12</td>
                  <td className="border border-gray-300 px-2 py-2"></td>
                  <td className="border border-gray-300 px-2 py-2"></td>
                  <td className="border border-gray-300 px-2 py-2">SO PLACED</td>
                  <td className="border border-gray-300 px-2 py-2"></td>
                  <td className="border border-gray-300 px-2 py-2">2023-24</td>
                  <td className="border border-gray-300 px-2 py-2"></td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-2 py-2 text-center">3</td>
                  <td className="border border-gray-300 px-2 py-2">BMPII</td>
                  <td className="border border-gray-300 px-2 py-2">LP/BMPII/295/ARD/MCO</td>
                  <td className="border border-gray-300 px-2 py-2">21-02-2024</td>
                  <td className="border border-gray-300 px-2 py-2">ARD</td>
                  <td className="border border-gray-300 px-2 py-2 text-xs">LV2I/CVS<br/>2815/GVSET 028<br/>CONNECTING O</td>
                  <td className="border border-gray-300 px-2 py-2 text-center">4833</td>
                  <td className="border border-gray-300 px-2 py-2"></td>
                  <td className="border border-gray-300 px-2 py-2"></td>
                  <td className="border border-gray-300 px-2 py-2">UNIFIED</td>
                  <td className="border border-gray-300 px-2 py-2">CAF/VD<br/>KIRKEE</td>
                  <td className="border border-gray-300 px-2 py-2">MOD KIT VEH EQPT<br/>COMPONENTS</td>
                  <td className="border border-gray-300 px-2 py-2 text-center">1</td>
                  <td className="border border-gray-300 px-2 py-2 text-center">90</td>
                  <td className="border border-gray-300 px-2 py-2"></td>
                  <td className="border border-gray-300 px-2 py-2 text-center">23 (SET)</td>
                  <td className="border border-gray-300 px-2 py-2"></td>
                  <td className="border border-gray-300 px-2 py-2">1033(A)<br/>(IFA)</td>
                  <td className="border border-gray-300 px-2 py-2">13-04-2024<br/>Sec</td>
                  <td className="border border-gray-300 px-2 py-2"></td>
                  <td className="border border-gray-300 px-2 py-2"></td>
                  <td className="border border-gray-300 px-2 py-2"></td>
                  <td className="border border-gray-300 px-2 py-2"></td>
                  <td className="border border-gray-300 px-2 py-2"></td>
                  <td className="border border-gray-300 px-2 py-2"></td>
                  <td className="border border-gray-300 px-2 py-2"></td>
                  <td className="border border-gray-300 px-2 py-2"></td>
                  <td className="border border-gray-300 px-2 py-2"></td>
                  <td className="border border-gray-300 px-2 py-2"></td>
                  <td className="border border-gray-300 px-2 py-2">Cancelled</td>
                  <td className="border border-gray-300 px-2 py-2"></td>
                  <td className="border border-gray-300 px-2 py-2">2023-24</td>
                  <td className="border border-gray-300 px-2 py-2"></td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-2 py-2 text-center">4</td>
                  <td className="border border-gray-300 px-2 py-2">BMPIIK</td>
                  <td className="border border-gray-300 px-2 py-2">LP/BMPIIK/358/SRD/MCO</td>
                  <td className="border border-gray-300 px-2 py-2">12-03-2024</td>
                  <td className="border border-gray-300 px-2 py-2">SRD</td>
                  <td className="border border-gray-300 px-2 py-2 text-xs">765-08-SB276</td>
                  <td className="border border-gray-300 px-2 py-2 text-center">316</td>
                  <td className="border border-gray-300 px-2 py-2"></td>
                  <td className="border border-gray-300 px-2 py-2"></td>
                  <td className="border border-gray-300 px-2 py-2">UNIFIED</td>
                  <td className="border border-gray-300 px-2 py-2">CAF/VD<br/>KIRKEE</td>
                  <td className="border border-gray-300 px-2 py-2">PIPE</td>
                  <td className="border border-gray-300 px-2 py-2 text-center">1</td>
                  <td className="border border-gray-300 px-2 py-2 text-center">20</td>
                  <td className="border border-gray-300 px-2 py-2"></td>
                  <td className="border border-gray-300 px-2 py-2 text-center">5</td>
                  <td className="border border-gray-300 px-2 py-2"></td>
                  <td className="border border-gray-300 px-2 py-2">Not recd</td>
                  <td className="border border-gray-300 px-2 py-2"></td>
                  <td className="border border-gray-300 px-2 py-2"></td>
                  <td className="border border-gray-300 px-2 py-2"></td>
                  <td className="border border-gray-300 px-2 py-2"></td>
                  <td className="border border-gray-300 px-2 py-2"></td>
                  <td className="border border-gray-300 px-2 py-2"></td>
                  <td className="border border-gray-300 px-2 py-2"></td>
                  <td className="border border-gray-300 px-2 py-2"></td>
                  <td className="border border-gray-300 px-2 py-2"></td>
                  <td className="border border-gray-300 px-2 py-2"></td>
                  <td className="border border-gray-300 px-2 py-2"></td>
                  <td className="border border-gray-300 px-2 py-2">Cancelled</td>
                  <td className="border border-gray-300 px-2 py-2"></td>
                  <td className="border border-gray-300 px-2 py-2">2023-24</td>
                  <td className="border border-gray-300 px-2 py-2"></td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-2 py-2 text-center">5</td>
                  <td className="border border-gray-300 px-2 py-2">BMPIIIK</td>
                  <td className="border border-gray-300 px-2 py-2">LP/BMPIIIK/10/ETD/MCO</td>
                  <td className="border border-gray-300 px-2 py-2">29-06-2024</td>
                  <td className="border border-gray-300 px-2 py-2">ETD</td>
                  <td className="border border-gray-300 px-2 py-2 text-xs">26-2020-001908</td>
                  <td className="border border-gray-300 px-2 py-2 text-center">5305</td>
                  <td className="border border-gray-300 px-2 py-2"></td>
                  <td className="border border-gray-300 px-2 py-2"></td>
                  <td className="border border-gray-300 px-2 py-2">UNIFIED</td>
                  <td className="border border-gray-300 px-2 py-2">COD AGRA</td>
                  <td className="border border-gray-300 px-2 py-2">CUT OUT RELAY<br/>ENG GEN 28V DC<br/>1A</td>
                  <td className="border border-gray-300 px-2 py-2 text-center">1</td>
                  <td className="border border-gray-300 px-2 py-2 text-center">100</td>
                  <td className="border border-gray-300 px-2 py-2"></td>
                  <td className="border border-gray-300 px-2 py-2 text-center">43</td>
                  <td className="border border-gray-300 px-2 py-2">Nos</td>
                  <td className="border border-gray-300 px-2 py-2">2055</td>
                  <td className="border border-gray-300 px-2 py-2">26-07-2024</td>
                  <td className="border border-gray-300 px-2 py-2"></td>
                  <td className="border border-gray-300 px-2 py-2"></td>
                  <td className="border border-gray-300 px-2 py-2"></td>
                  <td className="border border-gray-300 px-2 py-2"></td>
                  <td className="border border-gray-300 px-2 py-2"></td>
                  <td className="border border-gray-300 px-2 py-2"></td>
                  <td className="border border-gray-300 px-2 py-2"></td>
                  <td className="border border-gray-300 px-2 py-2"></td>
                  <td className="border border-gray-300 px-2 py-2"></td>
                  <td className="border border-gray-300 px-2 py-2"></td>
                  <td className="border border-gray-300 px-2 py-2">IFA CASE</td>
                  <td className="border border-gray-300 px-2 py-2"></td>
                  <td className="border border-gray-300 px-2 py-2">2024-25</td>
                  <td className="border border-gray-300 px-2 py-2"></td>
                </tr>
              </tbody>
            </table>
                </div>
              </>
            );
          })()}
        </div>
      )}
    </div>
  )
}
