import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function MCODashboard() {
  const navigate = useNavigate()
  const [selectedSection, setSelectedSection] = useState('iil')
  const [selectedYear, setSelectedYear] = useState('')
  const [selectedOffice, setSelectedOffice] = useState('')
  const [showImportModal, setShowImportModal] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  
  // Report & Return states
  const [selectedReportType, setSelectedReportType] = useState('')
  const [selectedReportYear, setSelectedReportYear] = useState('')
  const [selectedReportMonth, setSelectedReportMonth] = useState('')
  const [selectedOHSType, setSelectedOHSType] = useState('')

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleImport = () => {
    if (selectedFile) {
      console.log('Importing file:', selectedFile.name)
      alert(`File "${selectedFile.name}" imported successfully!`)
      setSelectedFile(null)
      setShowImportModal(false)
    }
  }

  const handleCancelImport = () => {
    setSelectedFile(null)
    setShowImportModal(false)
  }

  // Data mapping based on year and office combinations
  const dataMap: Record<string, Record<string, any[]>> = {
    'PY--2025-26': {
      'CAFVD': [
        { serial: 1, MTRL: 'CT-001', nrr: 'NR', iilReceived: 'Yes', nomenclature: 'Generator Set 5KVA', ohsScale: '1:100' },
        { serial: 2, MTRL: 'CT-002', nrr: 'R', iilReceived: 'No', nomenclature: 'Battery Charger 24V', ohsScale: '1:50' },
        { serial: 3, MTRL: 'CT-003', nrr: 'NR', iilReceived: 'Yes', nomenclature: 'Tool Kit Complete', ohsScale: '1:75' },
        { serial: 4, MTRL: 'CT-004', nrr: 'R', iilReceived: 'Yes', nomenclature: 'Spare Parts Set A', ohsScale: '1:200' },
        { serial: 5, MTRL: 'CT-005', nrr: 'NR', iilReceived: 'No', nomenclature: 'Maintenance Kit Type B', ohsScale: '1:150' }
      ],
      'AGD': [
        { serial: 1, MTRL: 'CT-101', nrr: 'R', iilReceived: 'Yes', nomenclature: 'Ammunition Storage Unit', ohsScale: '1:120' },
        { serial: 2, MTRL: 'CT-102', nrr: 'NR', iilReceived: 'Yes', nomenclature: 'Weapon Cleaning Kit', ohsScale: '1:80' },
        { serial: 3, MTRL: 'CT-103', nrr: 'R', iilReceived: 'No', nomenclature: 'Sight Assembly', ohsScale: '1:60' },
        { serial: 4, MTRL: 'CT-104', nrr: 'NR', iilReceived: 'Yes', nomenclature: 'Barrel Cleaning Rod', ohsScale: '1:100' },
        { serial: 5, MTRL: 'CT-105', nrr: 'R', iilReceived: 'Yes', nomenclature: 'Magazine Set', ohsScale: '1:250' }
      ],
      'DLD': [
        { serial: 1, MTRL: 'CT-201', nrr: 'NR', iilReceived: 'No', nomenclature: 'Vehicle Spare Parts', ohsScale: '1:90' },
        { serial: 2, MTRL: 'CT-202', nrr: 'R', iilReceived: 'Yes', nomenclature: 'Tire Set (4 Units)', ohsScale: '1:40' },
        { serial: 3, MTRL: 'CT-203', nrr: 'NR', iilReceived: 'Yes', nomenclature: 'Engine Oil Filter', ohsScale: '1:180' },
        { serial: 4, MTRL: 'CT-204', nrr: 'R', iilReceived: 'No', nomenclature: 'Brake Pad Assembly', ohsScale: '1:110' },
        { serial: 5, MTRL: 'CT-205', nrr: 'NR', iilReceived: 'Yes', nomenclature: 'Hydraulic Fluid', ohsScale: '1:160' }
      ],
      '223 ABOD': [
        { serial: 1, MTRL: 'CT-301', nrr: 'R', iilReceived: 'Yes', nomenclature: 'Ordnance Testing Kit', ohsScale: '1:70' },
        { serial: 2, MTRL: 'CT-302', nrr: 'NR', iilReceived: 'No', nomenclature: 'Safety Equipment Set', ohsScale: '1:95' },
        { serial: 3, MTRL: 'CT-303', nrr: 'R', iilReceived: 'Yes', nomenclature: 'Explosive Detector', ohsScale: '1:30' },
        { serial: 4, MTRL: 'CT-304', nrr: 'NR', iilReceived: 'Yes', nomenclature: 'Disposal Tools', ohsScale: '1:85' },
        { serial: 5, MTRL: 'CT-305', nrr: 'R', iilReceived: 'No', nomenclature: 'Protective Gear', ohsScale: '1:120' }
      ],
      'JOD': [
        { serial: 1, MTRL: 'CT-401', nrr: 'NR', iilReceived: 'Yes', nomenclature: 'Welding Equipment', ohsScale: '1:55' },
        { serial: 2, MTRL: 'CT-402', nrr: 'R', iilReceived: 'Yes', nomenclature: 'Cutting Tools Set', ohsScale: '1:140' },
        { serial: 3, MTRL: 'CT-403', nrr: 'NR', iilReceived: 'No', nomenclature: 'Hydraulic Press', ohsScale: '1:25' },
        { serial: 4, MTRL: 'CT-404', nrr: 'R', iilReceived: 'Yes', nomenclature: 'Grinding Machine', ohsScale: '1:65' },
        { serial: 5, MTRL: 'CT-405', nrr: 'NR', iilReceived: 'Yes', nomenclature: 'Measuring Instruments', ohsScale: '1:190' }
      ]
    },
    'PY--2026-27': {
      'CAFVD': [
        { serial: 1, MTRL: 'CT-501', nrr: 'R', iilReceived: 'No', nomenclature: 'Advanced Generator 10KVA', ohsScale: '1:105' },
        { serial: 2, MTRL: 'CT-502', nrr: 'NR', iilReceived: 'Yes', nomenclature: 'Solar Panel Array', ohsScale: '1:45' },
        { serial: 3, MTRL: 'CT-503', nrr: 'R', iilReceived: 'Yes', nomenclature: 'Power Inverter System', ohsScale: '1:70' },
        { serial: 4, MTRL: 'CT-504', nrr: 'NR', iilReceived: 'No', nomenclature: 'Voltage Stabilizer', ohsScale: '1:130' },
        { serial: 5, MTRL: 'CT-505', nrr: 'R', iilReceived: 'Yes', nomenclature: 'Emergency Lighting', ohsScale: '1:220' }
      ],
      'AGD': [
        { serial: 1, MTRL: 'CT-601', nrr: 'NR', iilReceived: 'Yes', nomenclature: 'Modern Weapon System', ohsScale: '1:115' },
        { serial: 2, MTRL: 'CT-602', nrr: 'R', iilReceived: 'No', nomenclature: 'Night Vision Equipment', ohsScale: '1:75' },
        { serial: 3, MTRL: 'CT-603', nrr: 'NR', iilReceived: 'Yes', nomenclature: 'Tactical Gear Set', ohsScale: '1:95' },
        { serial: 4, MTRL: 'CT-604', nrr: 'R', iilReceived: 'Yes', nomenclature: 'Communication Device', ohsScale: '1:140' },
        { serial: 5, MTRL: 'CT-605', nrr: 'NR', iilReceived: 'No', nomenclature: 'Protective Armor', ohsScale: '1:85' }
      ],
      'DLD': [
        { serial: 1, MTRL: 'CT-701', nrr: 'R', iilReceived: 'Yes', nomenclature: 'Electric Vehicle Parts', ohsScale: '1:88' },
        { serial: 2, MTRL: 'CT-702', nrr: 'NR', iilReceived: 'Yes', nomenclature: 'Battery Pack System', ohsScale: '1:42' },
        { serial: 3, MTRL: 'CT-703', nrr: 'R', iilReceived: 'No', nomenclature: 'Charging Station', ohsScale: '1:35' },
        { serial: 4, MTRL: 'CT-704', nrr: 'NR', iilReceived: 'Yes', nomenclature: 'Motor Controller', ohsScale: '1:125' },
        { serial: 5, MTRL: 'CT-705', nrr: 'R', iilReceived: 'Yes', nomenclature: 'Suspension System', ohsScale: '1:170' }
      ],
      '223 ABOD': [
        { serial: 1, MTRL: 'CT-801', nrr: 'NR', iilReceived: 'No', nomenclature: 'Digital Testing Device', ohsScale: '1:68' },
        { serial: 2, MTRL: 'CT-802', nrr: 'R', iilReceived: 'Yes', nomenclature: 'Automated Scanner', ohsScale: '1:92' },
        { serial: 3, MTRL: 'CT-803', nrr: 'NR', iilReceived: 'Yes', nomenclature: 'Sensor Array', ohsScale: '1:28' },
        { serial: 4, MTRL: 'CT-804', nrr: 'R', iilReceived: 'No', nomenclature: 'Control Panel', ohsScale: '1:82' },
        { serial: 5, MTRL: 'CT-805', nrr: 'NR', iilReceived: 'Yes', nomenclature: 'Safety Monitoring System', ohsScale: '1:115' }
      ],
      'JOD': [
        { serial: 1, MTRL: 'CT-901', nrr: 'R', iilReceived: 'Yes', nomenclature: 'CNC Machine Parts', ohsScale: '1:52' },
        { serial: 2, MTRL: 'CT-902', nrr: 'NR', iilReceived: 'No', nomenclature: 'Laser Cutting System', ohsScale: '1:38' },
        { serial: 3, MTRL: 'CT-903', nrr: 'R', iilReceived: 'Yes', nomenclature: '3D Printer Industrial', ohsScale: '1:22' },
        { serial: 4, MTRL: 'CT-904', nrr: 'NR', iilReceived: 'Yes', nomenclature: 'Robotic Arm', ohsScale: '1:62' },
        { serial: 5, MTRL: 'CT-905', nrr: 'R', iilReceived: 'No', nomenclature: 'Precision Tools', ohsScale: '1:185' }
      ]
    }
  }

  const tableData = selectedYear && selectedOffice ? (dataMap[selectedYear]?.[selectedOffice] || []) : []

  const [selectedYearCVIL, setSelectedYearCVIL] = useState('')
  const [selectedOfficeCVIL, setSelectedOfficeCVIL] = useState('')

  // CVIL Data (items marked as "No" from IIL)
  const cvilDataMap: Record<string, Record<string, any[]>> = {
    'PY--2025-26': {
      'CAFVD': [
        { serial: 1, MTRL: 'CT-002', nomenclature: 'Battery Charger 24V', ohsScale: '1:50' },
        { serial: 2, MTRL: 'CT-005', nomenclature: 'Maintenance Kit Type B', ohsScale: '1:150' }
      ],
      'AGD': [
        { serial: 1, MTRL: 'CT-103', nomenclature: 'Sight Assembly', ohsScale: '1:60' }
      ],
      'DLD': [
        { serial: 1, MTRL: 'CT-201', nomenclature: 'Vehicle Spare Parts', ohsScale: '1:90' },
        { serial: 2, MTRL: 'CT-204', nomenclature: 'Brake Pad Assembly', ohsScale: '1:110' }
      ],
      '223 ABOD': [
        { serial: 1, MTRL: 'CT-302', nomenclature: 'Safety Equipment Set', ohsScale: '1:95' },
        { serial: 2, MTRL: 'CT-305', nomenclature: 'Protective Gear', ohsScale: '1:120' }
      ],
      'JOD': [
        { serial: 1, MTRL: 'CT-403', nomenclature: 'Hydraulic Press', ohsScale: '1:25' }
      ]
    },
    'PY--2026-27': {
      'CAFVD': [
        { serial: 1, MTRL: 'CT-501', nomenclature: 'Advanced Generator 10KVA', ohsScale: '1:105' },
        { serial: 2, MTRL: 'CT-504', nomenclature: 'Voltage Stabilizer', ohsScale: '1:130' }
      ],
      'AGD': [
        { serial: 1, MTRL: 'CT-602', nomenclature: 'Night Vision Equipment', ohsScale: '1:75' },
        { serial: 2, MTRL: 'CT-605', nomenclature: 'Protective Armor', ohsScale: '1:85' }
      ],
      'DLD': [
        { serial: 1, MTRL: 'CT-703', nomenclature: 'Charging Station', ohsScale: '1:35' }
      ],
      '223 ABOD': [
        { serial: 1, MTRL: 'CT-801', nomenclature: 'Digital Testing Device', ohsScale: '1:68' },
        { serial: 2, MTRL: 'CT-804', nomenclature: 'Control Panel', ohsScale: '1:82' }
      ],
      'JOD': [
        { serial: 1, MTRL: 'CT-902', nomenclature: 'Laser Cutting System', ohsScale: '1:38' },
        { serial: 2, MTRL: 'CT-905', nomenclature: 'Precision Tools', ohsScale: '1:185' }
      ]
    }
  }

  const cvilTableData = selectedYearCVIL && selectedOfficeCVIL ? (cvilDataMap[selectedYearCVIL]?.[selectedOfficeCVIL] || []) : []

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
      <h2 className="text-2xl font-bold text-gray-900 mb-6">MCO Dashboard</h2>

      {/* Section Selection Tabs */}
      <div className="mb-8 border-b border-gray-200">
        <nav className="flex space-x-1 overflow-x-auto">
          <button
            onClick={() => {
              setSelectedSection('iil')
              setSelectedYear('')
              setSelectedOffice('')
            }}
            className={`px-6 py-3 font-semibold text-sm transition-all whitespace-nowrap ${
              selectedSection === 'iil'
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            IIL Management
          </button>
          <button
            onClick={() => {
              setSelectedSection('cvil')
              setSelectedYearCVIL('')
              setSelectedOfficeCVIL('')
            }}
            className={`px-6 py-3 font-semibold text-sm transition-all whitespace-nowrap ${
              selectedSection === 'cvil'
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            CVIL Management
          </button>
          <button
            onClick={() => {
              setSelectedSection('ohs')
              setSelectedOHSType('')
            }}
            className={`px-6 py-3 font-semibold text-sm transition-all whitespace-nowrap ${
              selectedSection === 'ohs'
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            OHS
          </button>
          <button
            onClick={() => {
              setSelectedSection('return')
              setSelectedReportType('')
              setSelectedReportYear('')
              setSelectedReportMonth('')
            }}
            className={`px-6 py-3 font-semibold text-sm transition-all whitespace-nowrap ${
              selectedSection === 'return'
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            Report & Return
          </button>
          <button
            onClick={() => setSelectedSection('defect')}
            className={`px-6 py-3 font-semibold text-sm transition-all whitespace-nowrap ${
              selectedSection === 'defect'
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            Defect Report
          </button>
          <button
            onClick={() => setSelectedSection('vir')}
            className={`px-6 py-3 font-semibold text-sm transition-all whitespace-nowrap ${
              selectedSection === 'vir'
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            VIR
          </button>
        </nav>
      </div>

      {/* IIL Management Section */}
      {selectedSection === 'iil' && (
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-6">IIL Management</h3>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-semibold mb-1">Total Items</p>
                  <p className="text-3xl font-bold">28</p>
                </div>
                <div className="bg-white bg-opacity-20 rounded-full p-3">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-semibold mb-1">IIL Received</p>
                  <p className="text-3xl font-bold">22</p>
                </div>
                <div className="bg-white bg-opacity-20 rounded-full p-3">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-100 text-sm font-semibold mb-1">Pending</p>
                  <p className="text-3xl font-bold">6</p>
                </div>
                <div className="bg-white bg-opacity-20 rounded-full p-3">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-semibold mb-1">Offices</p>
                  <p className="text-3xl font-bold">5</p>
                </div>
                <div className="bg-white bg-opacity-20 rounded-full p-3">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Filters Section */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            {/* Year Dropdown */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Planning Year
              </label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white text-gray-900 font-medium"
              >
                <option value="">-- Select Planning Year --</option>
                <option value="PY--2025-26">PY--2025-26</option>
                <option value="PY--2026-27">PY--2026-27</option>
              </select>
            </div>

            {/* Office Dropdown */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Office
              </label>
              <select
                value={selectedOffice}
                onChange={(e) => setSelectedOffice(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white text-gray-900 font-medium"
              >
                <option value="">-- Select Office --</option>
                <option value="CAFVD">CAFVD</option>
                <option value="AGD">AGD</option>
                <option value="DLD">DLD</option>
                <option value="223 ABOD">223 ABOD</option>
                <option value="JOD">JOD</option>
              </select>
            </div>
          </div>

          {/* Table Section - Only show when both filters are selected */}
          {selectedYear && selectedOffice && (
            <>
              <div className="mb-4 flex justify-end">
                <button
                  onClick={() => {
                    setSelectedYear('')
                    setSelectedOffice('')
                  }}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Clear
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                      <th className="px-4 py-3 text-left text-sm font-semibold border border-blue-700">S.No</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold border border-blue-700">CT</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold border border-blue-700">NR/R</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold border border-blue-700">IIL Received</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold border border-blue-700">Nomenclature</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold border border-blue-700">OHS Scale</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((row, index) => (
                      <tr 
                        key={row.serial}
                        className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}
                      >
                        <td className="px-4 py-2.5 text-sm text-gray-900 border border-gray-200">{row.serial}</td>
                        <td className="px-4 py-2.5 text-sm text-gray-900 border border-gray-200 font-medium">{row.MTRL}</td>
                        <td className="px-4 py-2.5 text-sm border border-gray-200">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${row.nrr === 'NR' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                            {row.nrr}
                          </span>
                        </td>
                        <td className="px-4 py-2.5 text-sm border border-gray-200">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${row.iilReceived === 'Yes' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {row.iilReceived}
                          </span>
                        </td>
                        <td className="px-4 py-2.5 text-sm text-gray-900 border border-gray-200">{row.nomenclature}</td>
                        <td className="px-4 py-2.5 text-sm text-gray-900 border border-gray-200 text-center font-medium">{row.ohsScale}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Summary Info */}
              <div className="mt-6 flex items-center justify-between text-sm text-gray-600">
                <span>Showing {tableData.length} entries</span>
                <span>Selected: {selectedYear} | {selectedOffice}</span>
              </div>
            </>
          )}
        </div>
      )}

      {/* CVIL Management Section */}
      {selectedSection === 'cvil' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-900">CVIL Management</h3>
            <button
              onClick={() => setShowImportModal(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              Import
            </button>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-cyan-100 text-sm font-semibold mb-1">Total CVIL Items</p>
                  <p className="text-3xl font-bold">18</p>
                </div>
                <div className="bg-white bg-opacity-20 rounded-full p-3">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-teal-100 text-sm font-semibold mb-1">Active Offices</p>
                  <p className="text-3xl font-bold">5</p>
                </div>
                <div className="bg-white bg-opacity-20 rounded-full p-3">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm font-semibold mb-1">Planning Years</p>
                  <p className="text-3xl font-bold">2</p>
                </div>
                <div className="bg-white bg-opacity-20 rounded-full p-3">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

        {/* CVIL Filters Section */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          {/* Year Dropdown */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Planning Year
            </label>
            <select
              value={selectedYearCVIL}
              onChange={(e) => setSelectedYearCVIL(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white text-gray-900 font-medium"
            >
              <option value="">-- Select Planning Year --</option>
              <option value="PY--2025-26">PY--2025-26</option>
              <option value="PY--2026-27">PY--2026-27</option>
            </select>
          </div>

          {/* Office Dropdown */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Office
            </label>
            <select
              value={selectedOfficeCVIL}
              onChange={(e) => setSelectedOfficeCVIL(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white text-gray-900 font-medium"
            >
              <option value="">-- Select Office --</option>
              <option value="CAFVD">CAFVD</option>
              <option value="AGD">AGD</option>
              <option value="DLD">DLD</option>
              <option value="223 ABOD">223 ABOD</option>
              <option value="JOD">JOD</option>
            </select>
          </div>
        </div>

        {/* CVIL Table Section - Only show when both filters are selected */}
        {selectedYearCVIL && selectedOfficeCVIL && (
          <>
            <div className="mb-4 flex justify-end">
              <button
                onClick={() => {
                  setSelectedYearCVIL('')
                  setSelectedOfficeCVIL('')
                }}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Clear
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-red-600 to-red-700 text-white">
                    <th className="px-4 py-3 text-left text-sm font-semibold border border-red-700">S.No</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold border border-red-700">CT</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold border border-red-700">Nomenclature</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold border border-red-700">OHS Scale</th>
                  </tr>
                </thead>
                <tbody>
                  {cvilTableData.length > 0 ? (
                    cvilTableData.map((row, index) => (
                      <tr 
                        key={row.serial}
                        className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-red-50 transition-colors`}
                      >
                        <td className="px-4 py-2.5 text-sm text-gray-900 border border-gray-200">{row.serial}</td>
                        <td className="px-4 py-2.5 text-sm text-gray-900 border border-gray-200 font-medium">{row.MTRL}</td>
                        <td className="px-4 py-2.5 text-sm text-gray-900 border border-gray-200">{row.nomenclature}</td>
                        <td className="px-4 py-2.5 text-sm text-gray-900 border border-gray-200 text-center font-medium">{row.ohsScale}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-4 py-8 text-center text-gray-500 border border-gray-200">
                        No items pending in CVIL for this selection
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* CVIL Summary Info */}
            <div className="mt-6 flex items-center justify-between text-sm text-gray-600">
              <span>Showing {cvilTableData.length} pending item{cvilTableData.length !== 1 ? 's' : ''}</span>
              <span>Selected: {selectedYearCVIL} | {selectedOfficeCVIL}</span>
            </div>
          </>
        )}
        </div>
      )}

      {/* OHS Section */}
      {selectedSection === 'ohs' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-900">OHS</h3>
            <button
              onClick={() => setShowImportModal(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              Import
            </button>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100 text-sm font-semibold mb-1">Total OHS Items</p>
                  <p className="text-3xl font-bold">35</p>
                </div>
                <div className="bg-white bg-opacity-20 rounded-full p-3">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-lime-500 to-lime-600 rounded-xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lime-100 text-sm font-semibold mb-1">OH-I Items</p>
                  <p className="text-3xl font-bold">18</p>
                </div>
                <div className="bg-white bg-opacity-20 rounded-full p-3">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-amber-100 text-sm font-semibold mb-1">OH-II Items</p>
                  <p className="text-3xl font-bold">17</p>
                </div>
                <div className="bg-white bg-opacity-20 rounded-full p-3">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          {/* OHS Type Selection */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Select OHS Type
            </label>
            <select
              value={selectedOHSType}
              onChange={(e) => setSelectedOHSType(e.target.value)}
              className="w-full max-w-md px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white text-gray-900 font-medium"
            >
              <option value="">-- Select OHS Type --</option>
              <option value="ohs-2014">BMP-II-K/CMT(OHS-I)2014 scale</option>
              <option value="ohs-2023">BMP-II-K/CMT(OHS-I)2023 scale</option>
              <option value="bmp-pec">BMP-II K PEC</option>
              <option value="cmt-pec">CMT PEC</option>
              <option value="bmp-oh2">BMP II OH 2</option>
            </select>
          </div>

          {/* Display selected OHS table */}
          {selectedOHSType && (
            <>
              <div className="mb-4 flex justify-end">
                <button
                  onClick={() => setSelectedOHSType('')}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Clear
                </button>
              </div>

              {/* BMP-II-K/CMT(OHS-I)2023 scale Table */}
              {selectedOHSType === 'ohs-2023' && (
                <div className="overflow-x-auto">
                  <div className="mb-4">
                    <div className="text-center font-bold text-lg mb-2">ELECTRONICS AND MECHANICAL ENGINEERING REGULATIONS</div>
                    <div className="text-center font-bold text-lg mb-2">OH-I NEW SCALE 2023</div>
                    <div className="text-right text-sm font-semibold mb-4">TRACKED VEHICLESVT/E 715 OS NO 3</div>
                  </div>
                  <table className="w-full border-collapse text-xs">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="border border-gray-400 px-2 py-2 font-semibold">SER<br/>NO</th>
                        <th className="border border-gray-400 px-2 py-2 font-semibold">NEW<br/>OHS NO</th>
                        <th className="border border-gray-400 px-2 py-2 font-semibold">KIT<br/>SUB<br/>SER<br/>NO</th>
                        <th className="border border-gray-400 px-2 py-2 font-semibold">OLD<br/>OHS NO</th>
                        <th className="border border-gray-400 px-2 py-2 font-semibold">COMP<br/>NO</th>
                        <th className="border border-gray-400 px-2 py-2 font-semibold">MTRL NO</th>
                        <th className="border border-gray-400 px-2 py-2 font-semibold">COS/SEC</th>
                        <th className="border border-gray-400 px-2 py-2 font-semibold">PART NO</th>
                        <th className="border border-gray-400 px-2 py-2 font-semibold">NOMENCLATURE</th>
                        <th className="border border-gray-400 px-2 py-2 font-semibold">NO OFF</th>
                        <th className="border border-gray-400 px-2 py-2 font-semibold">OH-I<br/>SCALE</th>
                        <th className="border border-gray-400 px-2 py-2 font-semibold">COMMANALITY</th>
                        <th className="border border-gray-400 px-2 py-2 font-semibold">SEC</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-2 py-2">1</td>
                        <td className="border border-gray-300 px-2 py-2">101</td>
                        <td className="border border-gray-300 px-2 py-2"></td>
                        <td className="border border-gray-300 px-2 py-2">1.00</td>
                        <td className="border border-gray-300 px-2 py-2">1234</td>
                        <td className="border border-gray-300 px-2 py-2">20345678</td>
                        <td className="border border-gray-300 px-2 py-2">LV1/ABC</td>
                        <td className="border border-gray-300 px-2 py-2 text-xs">1234-56789(123-45-67)</td>
                        <td className="border border-gray-300 px-2 py-2">SAMPLE PART A</td>
                        <td className="border border-gray-300 px-2 py-2 text-center">2</td>
                        <td className="border border-gray-300 px-2 py-2 text-center">100</td>
                        <td className="border border-gray-300 px-2 py-2">BMP-II, IIK</td>
                        <td className="border border-gray-300 px-2 py-2">ARD</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-2 py-2">2</td>
                        <td className="border border-gray-300 px-2 py-2">102</td>
                        <td className="border border-gray-300 px-2 py-2"></td>
                        <td className="border border-gray-300 px-2 py-2">2.00</td>
                        <td className="border border-gray-300 px-2 py-2">2345</td>
                        <td className="border border-gray-300 px-2 py-2">30456789</td>
                        <td className="border border-gray-300 px-2 py-2">LV2/DEF</td>
                        <td className="border border-gray-300 px-2 py-2 text-xs">2345-67890(234-56-78)</td>
                        <td className="border border-gray-300 px-2 py-2">SAMPLE PART B</td>
                        <td className="border border-gray-300 px-2 py-2 text-center">1</td>
                        <td className="border border-gray-300 px-2 py-2 text-center">75</td>
                        <td className="border border-gray-300 px-2 py-2">CMT</td>
                        <td className="border border-gray-300 px-2 py-2">VRD</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-2 py-2">3</td>
                        <td className="border border-gray-300 px-2 py-2">103</td>
                        <td className="border border-gray-300 px-2 py-2"></td>
                        <td className="border border-gray-300 px-2 py-2">3.00</td>
                        <td className="border border-gray-300 px-2 py-2">3456</td>
                        <td className="border border-gray-300 px-2 py-2">40567890</td>
                        <td className="border border-gray-300 px-2 py-2">LV3/GHI</td>
                        <td className="border border-gray-300 px-2 py-2 text-xs">3456-78901(345-67-89)</td>
                        <td className="border border-gray-300 px-2 py-2">SAMPLE PART C</td>
                        <td className="border border-gray-300 px-2 py-2 text-center">3</td>
                        <td className="border border-gray-300 px-2 py-2 text-center">120</td>
                        <td className="border border-gray-300 px-2 py-2">BMP-II</td>
                        <td className="border border-gray-300 px-2 py-2">SRD</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-2 py-2">4</td>
                        <td className="border border-gray-300 px-2 py-2">104</td>
                        <td className="border border-gray-300 px-2 py-2"></td>
                        <td className="border border-gray-300 px-2 py-2">4.00</td>
                        <td className="border border-gray-300 px-2 py-2">4567</td>
                        <td className="border border-gray-300 px-2 py-2">50678901</td>
                        <td className="border border-gray-300 px-2 py-2">LV4/JKL</td>
                        <td className="border border-gray-300 px-2 py-2 text-xs">4567-89012(456-78-90)</td>
                        <td className="border border-gray-300 px-2 py-2">SAMPLE PART D</td>
                        <td className="border border-gray-300 px-2 py-2 text-center">2</td>
                        <td className="border border-gray-300 px-2 py-2 text-center">90</td>
                        <td className="border border-gray-300 px-2 py-2">IIK and CMT</td>
                        <td className="border border-gray-300 px-2 py-2">ARD</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-2 py-2">5</td>
                        <td className="border border-gray-300 px-2 py-2">105</td>
                        <td className="border border-gray-300 px-2 py-2"></td>
                        <td className="border border-gray-300 px-2 py-2">5.00</td>
                        <td className="border border-gray-300 px-2 py-2">5678</td>
                        <td className="border border-gray-300 px-2 py-2">60789012</td>
                        <td className="border border-gray-300 px-2 py-2">LV5/MNO</td>
                        <td className="border border-gray-300 px-2 py-2 text-xs">5678-90123(567-89-01)</td>
                        <td className="border border-gray-300 px-2 py-2">SAMPLE PART E</td>
                        <td className="border border-gray-300 px-2 py-2 text-center">1</td>
                        <td className="border border-gray-300 px-2 py-2 text-center">60</td>
                        <td className="border border-gray-300 px-2 py-2">BMP-II, CMT</td>
                        <td className="border border-gray-300 px-2 py-2">VRD</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="mt-4 text-sm">
                    <div className="font-semibold">RESTRICTED</div>
                    <div className="text-right">Page</div>
                    <div className="text-left">Issue 5, Jan 2023</div>
                  </div>
                </div>
              )}

              {/* Placeholder sections for other OHS types */}
              {selectedOHSType === 'ohs-2014' && (
                <div className="bg-gray-50 rounded-lg p-8 text-center">
                  <p className="text-gray-600">BMP-II-K/CMT(OHS-I)2014 scale data coming soon...</p>
                </div>
              )}

              {selectedOHSType === 'bmp-pec' && (
                <div className="bg-gray-50 rounded-lg p-8 text-center">
                  <p className="text-gray-600">BMP-II K PEC data coming soon...</p>
                </div>
              )}

              {selectedOHSType === 'cmt-pec' && (
                <div className="bg-gray-50 rounded-lg p-8 text-center">
                  <p className="text-gray-600">CMT PEC data coming soon...</p>
                </div>
              )}

              {selectedOHSType === 'bmp-oh2' && (
                <div className="bg-gray-50 rounded-lg p-8 text-center">
                  <p className="text-gray-600">BMP II OH 2 data coming soon...</p>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* Report & Return Section */}
      {selectedSection === 'return' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-900">Report & Return</h3>
            <button
              onClick={() => setShowImportModal(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              Import
            </button>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-br from-slate-500 to-slate-600 rounded-xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-100 text-sm font-semibold mb-1">Total Reports</p>
                  <p className="text-3xl font-bold">24</p>
                </div>
                <div className="bg-white bg-opacity-20 rounded-full p-3">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-stone-500 to-stone-600 rounded-xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-stone-100 text-sm font-semibold mb-1">Pending Returns</p>
                  <p className="text-3xl font-bold">8</p>
                </div>
                <div className="bg-white bg-opacity-20 rounded-full p-3">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-neutral-500 to-neutral-600 rounded-xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-neutral-100 text-sm font-semibold mb-1">Completed</p>
                  <p className="text-3xl font-bold">16</p>
                </div>
                <div className="bg-white bg-opacity-20 rounded-full p-3">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          {/* Report Type Selection */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Select Report Type
            </label>
            <select
              value={selectedReportType}
              onChange={(e) => {
                setSelectedReportType(e.target.value)
                setSelectedReportYear('')
                setSelectedReportMonth('')
              }}
              className="w-full max-w-md px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white text-gray-900 font-medium"
            >
              <option value="">-- Select Report Type --</option>
              <option value="avbl-spares">AVBL OF SPARES</option>
              <option value="avbl-ap-demands">AVBL OF SPARES AGAINST AP DEMANDS</option>
              <option value="pds-analysis">PDS ANALYSIS</option>
            </select>
          </div>

          {/* Year and Month Selection - Only show when report type is selected */}
          {selectedReportType && (
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Planning Year
                </label>
                <select
                  value={selectedReportYear}
                  onChange={(e) => {
                    setSelectedReportYear(e.target.value)
                    setSelectedReportMonth('')
                  }}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white text-gray-900 font-medium"
                >
                  <option value="">-- Select Year --</option>
                  <option value="2025-26">PY--2025-26</option>
                  <option value="2026-27">PY--2026-27</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Month
                </label>
                <select
                  value={selectedReportMonth}
                  onChange={(e) => setSelectedReportMonth(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white text-gray-900 font-medium"
                >
                  <option value="">-- Select Month --</option>
                  <option value="apr">April</option>
                  <option value="may">May</option>
                  <option value="jun">June</option>
                  <option value="jul">July</option>
                  <option value="aug">August</option>
                  <option value="sep">September</option>
                  <option value="oct">October</option>
                  <option value="nov">November</option>
                  <option value="dec">December</option>
                  <option value="jan">January</option>
                  <option value="feb">February</option>
                  <option value="mar">March</option>
                </select>
              </div>
            </div>
          )}

          {/* Display selected report table */}
          {selectedReportType && selectedReportYear && selectedReportMonth && (
            <>
              <div className="mb-4 flex justify-end">
                <button
                  onClick={() => {
                    setSelectedReportType('')
                    setSelectedReportYear('')
                    setSelectedReportMonth('')
                  }}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Clear
                </button>
              </div>

              {/* AVBL OF SPARES Table */}
              {selectedReportType === 'avbl-spares' && (
                <div className="overflow-x-auto">
                  <div className="mb-4 text-center font-bold text-lg">AVBL OF SPARES AGAINST AP DEMANDS : {selectedReportYear.toUpperCase()} FORTHRIGHTLY/MONTHLY</div>
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="border border-gray-400 px-2 py-2 font-semibold">S No</th>
                        <th className="border border-gray-400 px-2 py-2 font-semibold">Eqpt/Eng</th>
                        <th className="border border-gray-400 px-2 py-2 font-semibold">Ord Depot</th>
                        <th className="border border-gray-400 px-2 py-2 font-semibold">Total Items in OHS less ZS & NR</th>
                        <th className="border border-gray-400 px-2 py-2 font-semibold">Items avbl in stock before demand</th>
                        <th className="border border-gray-400 px-2 py-2 font-semibold">No of Items demanded (AP+Sup dmds)</th>
                        <th className="border border-gray-400 px-2 py-2 font-semibold">No of Items controlled</th>
                        <th className="border border-gray-400 px-2 py-2 font-semibold">No of items deleted / not controlled with reasons @</th>
                        <th className="border border-gray-400 px-2 py-2 font-semibold" colSpan={2}>LM/LP Spares decided at dmd stage</th>
                        <th className="border border-gray-400 px-2 py-2 font-semibold" colSpan={2}>No of items recd against AP dmd</th>
                        <th className="border border-gray-400 px-2 py-2 font-semibold">IIL (QTY)</th>
                        <th className="border border-gray-400 px-2 py-2 font-semibold">CVIL (QTY)</th>
                        <th className="border border-gray-400 px-2 py-2 font-semibold">Total Spares Avblas on dt</th>
                        <th className="border border-gray-400 px-2 py-2 font-semibold" colSpan={2}>% Avbl as on dt</th>
                      </tr>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-400 px-2 py-1"></th>
                        <th className="border border-gray-400 px-2 py-1"></th>
                        <th className="border border-gray-400 px-2 py-1"></th>
                        <th className="border border-gray-400 px-2 py-1">(a)</th>
                        <th className="border border-gray-400 px-2 py-1">(b)</th>
                        <th className="border border-gray-400 px-2 py-1">(c)</th>
                        <th className="border border-gray-400 px-2 py-1">(d)</th>
                        <th className="border border-gray-400 px-2 py-1">(e)</th>
                        <th className="border border-gray-400 px-2 py-1">LM</th>
                        <th className="border border-gray-400 px-2 py-1">LP</th>
                        <th className="border border-gray-400 px-2 py-1">Full 100%</th>
                        <th className="border border-gray-400 px-2 py-1">Part &lt;100</th>
                        <th className="border border-gray-400 px-2 py-1">(i)</th>
                        <th className="border border-gray-400 px-2 py-1">(k)</th>
                        <th className="border border-gray-400 px-2 py-1">l=(b+f+g)</th>
                        <th className="border border-gray-400 px-2 py-1">m=(g/c)x100</th>
                        <th className="border border-gray-400 px-2 py-1">n=(l/a)x100</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-2 py-2" rowSpan={6}>1</td>
                        <td className="border border-gray-300 px-2 py-2" rowSpan={6}>UNIFIED</td>
                        <td className="border border-gray-300 px-2 py-2 font-medium">KVD</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">3338</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">2255</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">1083</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">955</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">128</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">0</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">0</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">376</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">80</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">536</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">437</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">2631</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">34.72</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">78.82</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-2 py-2 font-medium">AGD</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">388</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">89</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">299</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">199</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">100</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">0</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">0</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">73</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">28</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">70</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">0</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">162</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">24.41</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">41.75</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-2 py-2 font-medium">JOD</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">388</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">185</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">203</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">200</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">3</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">0</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">0</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">59</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">10</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">137</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">105</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">244</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">29.06</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">62.89</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-2 py-2 font-medium">223 ABOD</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">40</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">29</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">11</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">11</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">0</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">0</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">0</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">8</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">0</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">3</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">0</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">37</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">72.73</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">92.50</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-2 py-2 font-medium">DLD</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">90</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">61</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">29</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">29</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">1</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">0</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">0</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">14</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">1</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">18</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">0</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">75</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">48.28</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">83.33</td>
                      </tr>
                      <tr className="hover:bg-gray-50 bg-gray-100 font-semibold">
                        <td className="border border-gray-300 px-2 py-2">TOTAL</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">4244</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">2619</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">1625</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">1394</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">232</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">0</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">0</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">530</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">119</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">764</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">542</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">3149</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">32.62</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">74.20</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {/* AVBL OF SPARES AGAINST AP DEMANDS Table */}
              {selectedReportType === 'avbl-ap-demands' && (
                <div className="overflow-x-auto">
                  <div className="mb-4 text-center font-bold text-lg">AVBL OF SPARES AGAINST AP DEMAND PY {selectedReportYear.toUpperCase()} : SEP 2025</div>
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="border border-gray-400 px-2 py-2 font-semibold">Ser No</th>
                        <th className="border border-gray-400 px-2 py-2 font-semibold">Eqpt</th>
                        <th className="border border-gray-400 px-2 py-2 font-semibold">Ord Depot</th>
                        <th className="border border-gray-400 px-2 py-2 font-semibold">Total items in OHS less ZS & NR</th>
                        <th className="border border-gray-400 px-2 py-2 font-semibold">Items avbl in stock before demand</th>
                        <th className="border border-gray-400 px-2 py-2 font-semibold">No of items demanded</th>
                        <th className="border border-gray-400 px-2 py-2 font-semibold">No of items deleted/no controlled</th>
                        <th className="border border-gray-400 px-2 py-2 font-semibold">No of items controlled</th>
                        <th className="border border-gray-400 px-2 py-2 font-semibold" colSpan={2}>No of items recd against AP Dmd</th>
                        <th className="border border-gray-400 px-2 py-2 font-semibold" colSpan={2}>IIL</th>
                        <th className="border border-gray-400 px-2 py-2 font-semibold" colSpan={2}>CVIL</th>
                        <th className="border border-gray-400 px-2 py-2 font-semibold" colSpan={2}>% Avbl as on date</th>
                      </tr>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-400 px-2 py-1">(a)</th>
                        <th className="border border-gray-400 px-2 py-1">(b)</th>
                        <th className="border border-gray-400 px-2 py-1">(c)</th>
                        <th className="border border-gray-400 px-2 py-1">(d)</th>
                        <th className="border border-gray-400 px-2 py-1">(e)</th>
                        <th className="border border-gray-400 px-2 py-1">(f)</th>
                        <th className="border border-gray-400 px-2 py-1">(g)</th>
                        <th className="border border-gray-400 px-2 py-1">(h)=(f-g)</th>
                        <th className="border border-gray-400 px-2 py-1">Full</th>
                        <th className="border border-gray-400 px-2 py-1">Part</th>
                        <th className="border border-gray-400 px-2 py-1">Dt</th>
                        <th className="border border-gray-400 px-2 py-1">Qty</th>
                        <th className="border border-gray-400 px-2 py-1">Dt</th>
                        <th className="border border-gray-400 px-2 py-1">Qty</th>
                        <th className="border border-gray-400 px-2 py-1">Against Demand</th>
                        <th className="border border-gray-400 px-2 py-1">Overall % (Full Avl %)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-2 py-2" rowSpan={6}>1</td>
                        <td className="border border-gray-300 px-2 py-2" rowSpan={6}>ICV BMP-II (Unified)</td>
                        <td className="border border-gray-300 px-2 py-2 font-medium">KVD</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">3338</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">2255</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">929</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">32</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">897</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">643</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">84</td>
                        <td className="border border-gray-300 px-2 py-2">07-12-2024</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">536</td>
                        <td className="border border-gray-300 px-2 py-2">05-Feb-25</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">1064</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">69.21</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">86.82</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-2 py-2 font-medium">AGD</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">388</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">89</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">269</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">68</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">201</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">210</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">31</td>
                        <td className="border border-gray-300 px-2 py-2">06-Feb-25</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">70</td>
                        <td className="border border-gray-300 px-2 py-2">06-Feb-25</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">296</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">78.07</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">77.06</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-2 py-2 font-medium">JOD</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">388</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">185</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">177</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">3</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">174</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">105</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">8</td>
                        <td className="border border-gray-300 px-2 py-2">07-11-2024</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">137</td>
                        <td className="border border-gray-300 px-2 py-2">13-Dec-24</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">203</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">59.32</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">74.74</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-2 py-2 font-medium">223 ABOD</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">40</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">29</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">11</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">0</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">11</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">7</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">3</td>
                        <td className="border border-gray-300 px-2 py-2">23-11-2024</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">11</td>
                        <td className="border border-gray-300 px-2 py-2">23-Nov-24</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">10</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">63.64</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">90.00</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-2 py-2 font-medium">DLD</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">90</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">61</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">26</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">0</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">26</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">22</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">0</td>
                        <td className="border border-gray-300 px-2 py-2">13-08-2024</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">18</td>
                        <td className="border border-gray-300 px-2 py-2">04-Dec-24</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">28</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">84.62</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">92.22</td>
                      </tr>
                      <tr className="hover:bg-gray-50 bg-gray-100 font-semibold">
                        <td className="border border-gray-300 px-2 py-2">TOTAL</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">4244</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">2619</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">1412</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">103</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">1309</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">987</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">126</td>
                        <td className="border border-gray-300 px-2 py-2"></td>
                        <td className="border border-gray-300 px-2 py-2 text-right"></td>
                        <td className="border border-gray-300 px-2 py-2"></td>
                        <td className="border border-gray-300 px-2 py-2 text-right">1601</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">69.90</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">84.97</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {/* PDS ANALYSIS Table */}
              {selectedReportType === 'pds-analysis' && (
                <div className="overflow-x-auto">
                  <div className="mb-4 text-center font-bold text-lg">PDS ANALYSIS : {selectedReportYear.toUpperCase()}</div>
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="border border-gray-400 px-2 py-2 font-semibold">S No</th>
                        <th className="border border-gray-400 px-2 py-2 font-semibold">Eqpt</th>
                        <th className="border border-gray-400 px-2 py-2 font-semibold">Depot</th>
                        <th className="border border-gray-400 px-2 py-2 font-semibold" colSpan={2}>Inability List</th>
                        <th className="border border-gray-400 px-2 py-2 font-semibold" colSpan={8}>PDS and Receipt of items issued against stated PDS</th>
                        <th className="border border-gray-400 px-2 py-2 font-semibold">Bal PDS NA items</th>
                      </tr>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-400 px-2 py-1"></th>
                        <th className="border border-gray-400 px-2 py-1"></th>
                        <th className="border border-gray-400 px-2 py-1"></th>
                        <th className="border border-gray-400 px-2 py-1">Dt Recd</th>
                        <th className="border border-gray-400 px-2 py-1">NA</th>
                        <th className="border border-gray-400 px-2 py-1" colSpan={2}>Q1</th>
                        <th className="border border-gray-400 px-2 py-1" colSpan={2}>Q2</th>
                        <th className="border border-gray-400 px-2 py-1" colSpan={2}>Q3</th>
                        <th className="border border-gray-400 px-2 py-1" colSpan={2}>Q4</th>
                        <th className="border border-gray-400 px-2 py-1"></th>
                      </tr>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-400 px-2 py-1">(a)</th>
                        <th className="border border-gray-400 px-2 py-1">(b)</th>
                        <th className="border border-gray-400 px-2 py-1">(c)</th>
                        <th className="border border-gray-400 px-2 py-1">(d)</th>
                        <th className="border border-gray-400 px-2 py-1">(e)</th>
                        <th className="border border-gray-400 px-2 py-1">PDS</th>
                        <th className="border border-gray-400 px-2 py-1">RECD</th>
                        <th className="border border-gray-400 px-2 py-1">PDS</th>
                        <th className="border border-gray-400 px-2 py-1">RECD</th>
                        <th className="border border-gray-400 px-2 py-1">PDS</th>
                        <th className="border border-gray-400 px-2 py-1">RECD</th>
                        <th className="border border-gray-400 px-2 py-1">PDS</th>
                        <th className="border border-gray-400 px-2 py-1">RECD</th>
                        <th className="border border-gray-400 px-2 py-1">(k)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-2 py-2" rowSpan={6}>1</td>
                        <td className="border border-gray-300 px-2 py-2" rowSpan={6}>UNIFIED</td>
                        <td className="border border-gray-300 px-2 py-2 font-medium">KVD</td>
                        <td className="border border-gray-300 px-2 py-2">05-02-2025</td>
                        <td className="border border-gray-300 px-2 py-2 text-center">-</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">0</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">0</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">0</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">0</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">0</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">0</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">0</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">0</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">1011</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-2 py-2 font-medium">AGD</td>
                        <td className="border border-gray-300 px-2 py-2">06-02-2025</td>
                        <td className="border border-gray-300 px-2 py-2 text-center">-</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">0</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">0</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">0</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">0</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">0</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">0</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">0</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">0</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">269</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-2 py-2 font-medium">JOD</td>
                        <td className="border border-gray-300 px-2 py-2">13-12-2024</td>
                        <td className="border border-gray-300 px-2 py-2 text-center">-</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">0</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">0</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">0</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">0</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">0</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">0</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">0</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">0</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">177</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-2 py-2 font-medium">223 ABOD</td>
                        <td className="border border-gray-300 px-2 py-2">23-11-2024</td>
                        <td className="border border-gray-300 px-2 py-2 text-center">-</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">0</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">0</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">0</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">0</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">0</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">0</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">0</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">0</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">11</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-2 py-2 font-medium">DLD</td>
                        <td className="border border-gray-300 px-2 py-2">04-12-2024</td>
                        <td className="border border-gray-300 px-2 py-2 text-center">-</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">3</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">0</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">4</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">0</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">0</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">0</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">3</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">0</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">16</td>
                      </tr>
                      <tr className="hover:bg-gray-50 bg-gray-100 font-semibold">
                        <td className="border border-gray-300 px-2 py-2">TOTAL</td>
                        <td className="border border-gray-300 px-2 py-2"></td>
                        <td className="border border-gray-300 px-2 py-2 text-center">-</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">3</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">0</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">4</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">0</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">0</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">0</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">3</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">0</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">1484</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* VIR (Visual Inspection Report) Section */}
      {selectedSection === 'vir' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-900">VIR (Visual Inspection Report)</h3>
            <button
              onClick={() => setShowImportModal(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              Import
            </button>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-br from-violet-500 to-violet-600 rounded-xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-violet-100 text-sm font-semibold mb-1">Total VIRs</p>
                  <p className="text-3xl font-bold">32</p>
                </div>
                <div className="bg-white bg-opacity-20 rounded-full p-3">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-fuchsia-500 to-fuchsia-600 rounded-xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-fuchsia-100 text-sm font-semibold mb-1">This Month</p>
                  <p className="text-3xl font-bold">12</p>
                </div>
                <div className="bg-white bg-opacity-20 rounded-full p-3">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-rose-500 to-rose-600 rounded-xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-rose-100 text-sm font-semibold mb-1">Pending Review</p>
                  <p className="text-3xl font-bold">5</p>
                </div>
                <div className="bg-white bg-opacity-20 rounded-full p-3">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          {/* VIR Data */}
          {(() => {
            const virData = [
              { serNo: 1, ohsNo: '', partNo: '765-46-Sb207', nomenclature: 'Bulk head Plate', noPerVeh: 1, scale: 10, def: 0, rep: 0, reqd: '', remark: '' },
              { serNo: 2, ohsNo: '', partNo: '675-33-SB104', nomenclature: 'Re-rubberisation of Bogie Wheel', noPerVeh: 1, scale: 50, def: 0, rep: 0, reqd: '', remark: '' },
              { serNo: 3, ohsNo: '', partNo: '5330-390184', nomenclature: 'Gasket Assembly', noPerVeh: 2, scale: 160, def: 1, rep: 0, reqd: 2, remark: 'Replacement required' },
              { serNo: 4, ohsNo: '', partNo: '4730-079089', nomenclature: 'Adaptor Bushing', noPerVeh: 1, scale: 50, def: 0, rep: 1, reqd: '', remark: 'Repaired and functional' },
              { serNo: 5, ohsNo: '', partNo: '5331-002747', nomenclature: "'O' Ring Seal", noPerVeh: 1, scale: 80, def: 1, rep: 0, reqd: 1, remark: 'Leak detected' }
            ];

            return (
              <div className="overflow-x-auto">
                <div className="mb-4">
                  <div className="text-center font-bold text-lg mb-2">VIEWERS INSPECTION REPORT</div>
                  <div className="text-sm text-gray-600 mb-4 text-center">Vehicle / Equipment: ICV BMP-OH-2 | Section: ICV/I.V2</div>
                  <div className="text-sm text-gray-600 mb-4 text-center">Classification: The Following Items are reqd as replacement of old/Damage fitted on ICV BMP/OH2/ vehs</div>
                </div>
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border border-gray-400 px-2 py-2 font-semibold text-left">SER. NO</th>
                      <th className="border border-gray-400 px-2 py-2 font-semibold text-left">OHS NO</th>
                      <th className="border border-gray-400 px-2 py-2 font-semibold text-left">Part NO</th>
                      <th className="border border-gray-400 px-2 py-2 font-semibold text-left">Nomenclature</th>
                      <th className="border border-gray-400 px-2 py-2 font-semibold text-left">NO per vehicle</th>
                      <th className="border border-gray-400 px-2 py-2 font-semibold text-left">Scale</th>
                      <th className="border border-gray-400 px-2 py-2 font-semibold text-left">Def</th>
                      <th className="border border-gray-400 px-2 py-2 font-semibold text-left">Rep</th>
                      <th className="border border-gray-400 px-2 py-2 font-semibold text-left">REQD</th>
                      <th className="border border-gray-400 px-2 py-2 font-semibold text-left">Remark</th>
                    </tr>
                  </thead>
                  <tbody>
                    {virData.map((item, index) => (
                      <tr 
                        key={item.serNo}
                        className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}
                      >
                        <td className="border border-gray-300 px-2 py-2 text-center">{item.serNo}</td>
                        <td className="border border-gray-300 px-2 py-2 text-center">{item.ohsNo || '-'}</td>
                        <td className="border border-gray-300 px-2 py-2 font-mono text-xs">{item.partNo}</td>
                        <td className="border border-gray-300 px-2 py-2">{item.nomenclature}</td>
                        <td className="border border-gray-300 px-2 py-2 text-center">{item.noPerVeh}</td>
                        <td className="border border-gray-300 px-2 py-2 text-center">{item.scale}</td>
                        <td className="border border-gray-300 px-2 py-2 text-center">{item.def}</td>
                        <td className="border border-gray-300 px-2 py-2 text-center">{item.rep}</td>
                        <td className="border border-gray-300 px-2 py-2 text-center">{item.reqd || '-'}</td>
                        <td className="border border-gray-300 px-2 py-2 text-sm">{item.remark || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-4 text-center text-sm text-gray-600">
                  (Total five items only)
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* Defect Report Section */}
      {selectedSection === 'defect' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-900">Defect Report</h3>
            <button
              onClick={() => setShowImportModal(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              Import
            </button>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-100 text-sm font-semibold mb-1">Total Defect Reports</p>
                  <p className="text-3xl font-bold">18</p>
                </div>
                <div className="bg-white bg-opacity-20 rounded-full p-3">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm font-semibold mb-1">Critical Defects</p>
                  <p className="text-3xl font-bold">6</p>
                </div>
                <div className="bg-white bg-opacity-20 rounded-full p-3">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-100 text-sm font-semibold mb-1">Resolved</p>
                  <p className="text-3xl font-bold">12</p>
                </div>
                <div className="bg-white bg-opacity-20 rounded-full p-3">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <div className="mb-4 text-center font-bold text-lg">Status of Backloading of Stores against DR/ FDR List for Year 2025-26 CQA (I) : 31 Oct 2025</div>
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-400 px-3 py-3 font-semibold" rowSpan={2}>Sr<br/>No</th>
                  <th className="border border-gray-400 px-3 py-3 font-semibold" rowSpan={2}>Defect Report<br/>No & Date</th>
                  <th className="border border-gray-400 px-3 py-3 font-semibold" rowSpan={2}>Part No/<br/>nomenclatur<br/>e</th>
                  <th className="border border-gray-400 px-3 py-3 font-semibold" rowSpan={2}>Def<br/>Qty</th>
                  <th className="border border-gray-400 px-3 py-3 font-semibold" rowSpan={2}>AHSP</th>
                  <th className="border border-gray-400 px-3 py-3 font-semibold" rowSpan={2}>Sec</th>
                  <th className="border border-gray-400 px-3 py-3 font-semibold" colSpan={2}>Auth for B/L</th>
                  <th className="border border-gray-400 px-3 py-3 font-semibold" rowSpan={2}>Remarks from<br/>QA</th>
                  <th className="border border-gray-400 px-3 py-3 font-semibold" rowSpan={2}>Remarks<br/>from MCO</th>
                </tr>
                <tr className="bg-gray-200">
                  <th className="border border-gray-400 px-3 py-2 font-semibold">JDI /<br/>inspection<br/>conducted by<br/>and date</th>
                  <th className="border border-gray-400 px-3 py-2 font-semibold">Closure<br/>Letter No<br/>& date</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-3 py-3">1</td>
                  <td className="border border-gray-300 px-3 py-3">07/DR/512<br/>ABW(QA) /INST<br/>(BMP)/2025-26<br/><br/>dt 23 Jul 2025</td>
                  <td className="border border-gray-300 px-3 py-3">(1240-002391)<br/>Periscope,<br/>AV, TNP-<br/>165A</td>
                  <td className="border border-gray-300 px-3 py-3 text-center">12</td>
                  <td className="border border-gray-300 px-3 py-3 text-center">CQA<br/>(I)</td>
                  <td className="border border-gray-300 px-3 py-3 text-center">INST</td>
                  <td className="border border-gray-300 px-3 py-3">Already<br/>investigated</td>
                  <td className="border border-gray-300 px-3 py-3"></td>
                  <td className="border border-gray-300 px-3 py-3">Periscope<br/>rejected due to<br/>Dust, scratches<br/>Pits, Bubbles &<br/>Fungal<br/>identified/on the<br/>glass.</td>
                  <td className="border border-gray-300 px-3 py-3">Closer report<br/>awaited.</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-3 py-3">2</td>
                  <td className="border border-gray-300 px-3 py-3">08/DR/512<br/>ABW(QA) /INST<br/>(BMP)/2025-26<br/><br/>dt 15 Aug 2025</td>
                  <td className="border border-gray-300 px-3 py-3">(2350-003456)<br/>Gun Barrel,<br/>Main, 30mm</td>
                  <td className="border border-gray-300 px-3 py-3 text-center">8</td>
                  <td className="border border-gray-300 px-3 py-3 text-center">CQA<br/>(II)</td>
                  <td className="border border-gray-300 px-3 py-3 text-center">ARM</td>
                  <td className="border border-gray-300 px-3 py-3">Inspection<br/>completed<br/>on 20 Aug 2025</td>
                  <td className="border border-gray-300 px-3 py-3">Closure letter<br/>dt 25 Aug 2025</td>
                  <td className="border border-gray-300 px-3 py-3">Surface defects<br/>identified during<br/>quality check.</td>
                  <td className="border border-gray-300 px-3 py-3">Backloading<br/>in progress.</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-3 py-3">3</td>
                  <td className="border border-gray-300 px-3 py-3">09/DR/512<br/>ABW(QA) /MECH<br/>(BMP)/2025-26<br/><br/>dt 05 Sep 2025</td>
                  <td className="border border-gray-300 px-3 py-3">(2815-004567)<br/>Engine,<br/>Diesel,<br/>UTD-20</td>
                  <td className="border border-gray-300 px-3 py-3 text-center">3</td>
                  <td className="border border-gray-300 px-3 py-3 text-center">CQA<br/>(I)</td>
                  <td className="border border-gray-300 px-3 py-3 text-center">MECH</td>
                  <td className="border border-gray-300 px-3 py-3">Under<br/>investigation</td>
                  <td className="border border-gray-300 px-3 py-3"></td>
                  <td className="border border-gray-300 px-3 py-3">Oil leakage and<br/>overheating<br/>issues reported.</td>
                  <td className="border border-gray-300 px-3 py-3">Technical report<br/>pending.</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-3 py-3">4</td>
                  <td className="border border-gray-300 px-3 py-3">10/DR/512<br/>ABW(QA) /ELEC<br/>(BMP)/2025-26<br/><br/>dt 18 Sep 2025</td>
                  <td className="border border-gray-300 px-3 py-3">(6110-005678)<br/>Battery Pack,<br/>12V-190Ah</td>
                  <td className="border border-gray-300 px-3 py-3 text-center">15</td>
                  <td className="border border-gray-300 px-3 py-3 text-center">CQA<br/>(III)</td>
                  <td className="border border-gray-300 px-3 py-3 text-center">ELEC</td>
                  <td className="border border-gray-300 px-3 py-3">JDI completed<br/>on 22 Sep 2025</td>
                  <td className="border border-gray-300 px-3 py-3">Letter No<br/>CQA/BL/2025/45<br/>dt 28 Sep 2025</td>
                  <td className="border border-gray-300 px-3 py-3">Low voltage and<br/>capacity issues<br/>identified.</td>
                  <td className="border border-gray-300 px-3 py-3">Awaiting<br/>replacement.</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-3 py-3">5</td>
                  <td className="border border-gray-300 px-3 py-3">11/DR/512<br/>ABW(QA) /VEH<br/>(BMP)/2025-26<br/><br/>dt 02 Oct 2025</td>
                  <td className="border border-gray-300 px-3 py-3">(2530-006789)<br/>Track Link,<br/>Assembly</td>
                  <td className="border border-gray-300 px-3 py-3 text-center">25</td>
                  <td className="border border-gray-300 px-3 py-3 text-center">CQA<br/>(I)</td>
                  <td className="border border-gray-300 px-3 py-3 text-center">VEH</td>
                  <td className="border border-gray-300 px-3 py-3">Inspection<br/>scheduled for<br/>10 Oct 2025</td>
                  <td className="border border-gray-300 px-3 py-3"></td>
                  <td className="border border-gray-300 px-3 py-3">Cracks found in<br/>pin assembly<br/>during trial.</td>
                  <td className="border border-gray-300 px-3 py-3">Investigation<br/>ongoing.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
