import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function LPSLogin() {
  const navigate = useNavigate()
  const [selectedSection, setSelectedSection] = useState('inspection-note')
  const [showImportModal, setShowImportModal] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  
  // Inspection Note form states
  const [inspectionNotes, setInspectionNotes] = useState<any[]>([])
  const [inspectionForm, setInspectionForm] = useState({
    date: '',
    inNo: '',
    vendor: '',
    item: '',
    quantity: '',
    remarks: ''
  })

  // CRV form states
  const [crvEntries, setCrvEntries] = useState<any[]>([])
  const [crvForm, setCrvForm] = useState({
    date: '',
    crvNo: '',
    section: '',
    nomenclature: '',
    quantity: '',
    amount: ''
  })

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleImport = () => {
    if (selectedFile) {
      // Handle file import logic here
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

  const handleInspectionSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setInspectionNotes([...inspectionNotes, { ...inspectionForm, id: Date.now() }])
    setInspectionForm({ date: '', inNo: '', vendor: '', item: '', quantity: '', remarks: '' })
  }

  const handleCrvSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setCrvEntries([...crvEntries, { ...crvForm, id: Date.now() }])
    setCrvForm({ date: '', crvNo: '', section: '', nomenclature: '', quantity: '', amount: '' })
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
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
      <h3 className="text-2xl font-bold text-gray-900 mb-6">LPS - Local Purchase Store</h3>

      {/* Main Section Selection Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="flex space-x-1 overflow-x-auto">
          <button
            onClick={() => setSelectedSection('inspection-note')}
            className={`px-6 py-3 font-semibold text-sm transition-all whitespace-nowrap ${
              selectedSection === 'inspection-note'
                ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            Inspection Note
          </button>
          <button
            onClick={() => setSelectedSection('crv')}
            className={`px-6 py-3 font-semibold text-sm transition-all whitespace-nowrap ${
              selectedSection === 'crv'
                ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            CRV
          </button>
          <button
            onClick={() => setSelectedSection('material-register')}
            className={`px-6 py-3 font-semibold text-sm transition-all whitespace-nowrap ${
              selectedSection === 'material-register'
                ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            Material Register
          </button>
          <button
            onClick={() => setSelectedSection('supply-order')}
            className={`px-6 py-3 font-semibold text-sm transition-all whitespace-nowrap ${
              selectedSection === 'supply-order'
                ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            Supply Order
          </button>
          <button
            onClick={() => setSelectedSection('crv-register')}
            className={`px-6 py-3 font-semibold text-sm transition-all whitespace-nowrap ${
              selectedSection === 'crv-register'
                ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            CRV Register
          </button>
          <button
            onClick={() => setSelectedSection('supply-order-register')}
            className={`px-6 py-3 font-semibold text-sm transition-all whitespace-nowrap ${
              selectedSection === 'supply-order-register'
                ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            Supply Order Register
          </button>
        </nav>
      </div>

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full mx-4">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Import File</h3>
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Select File to Upload
              </label>
              <input
                type="file"
                onChange={handleFileSelect}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                accept=".xlsx,.xls,.csv"
              />
              {selectedFile && (
                <p className="mt-2 text-sm text-gray-600">
                  Selected: <span className="font-semibold">{selectedFile.name}</span>
                </p>
              )}
            </div>
            <div className="flex gap-4 justify-end">
              <button
                onClick={handleCancelImport}
                className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleImport}
                disabled={!selectedFile}
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors"
              >
                Import
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Inspection Note Section */}
      {selectedSection === 'inspection-note' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-xl font-bold text-gray-900">Inspection Note</h4>
            <button
              onClick={() => setShowImportModal(true)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              Import
            </button>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-semibold mb-1">Total Inspection Notes</p>
                  <p className="text-3xl font-bold">{inspectionNotes.length}</p>
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
                  <p className="text-green-100 text-sm font-semibold mb-1">This Month</p>
                  <p className="text-3xl font-bold">{inspectionNotes.filter(n => {
                    const noteDate = new Date(n.date);
                    const now = new Date();
                    return noteDate.getMonth() === now.getMonth() && noteDate.getFullYear() === now.getFullYear();
                  }).length}</p>
                </div>
                <div className="bg-white bg-opacity-20 rounded-full p-3">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-semibold mb-1">Unique Vendors</p>
                  <p className="text-3xl font-bold">{new Set(inspectionNotes.map(n => n.vendor)).size}</p>
                </div>
                <div className="bg-white bg-opacity-20 rounded-full p-3">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          {/* Form */}
          <form onSubmit={handleInspectionSubmit} className="bg-gray-50 rounded-lg p-6 mb-6">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  value={inspectionForm.date}
                  onChange={(e) => setInspectionForm({...inspectionForm, date: e.target.value})}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">IN No</label>
                <input
                  type="text"
                  value={inspectionForm.inNo}
                  onChange={(e) => setInspectionForm({...inspectionForm, inNo: e.target.value})}
                  required
                  placeholder="IN/2025/001"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Vendor</label>
                <input
                  type="text"
                  value={inspectionForm.vendor}
                  onChange={(e) => setInspectionForm({...inspectionForm, vendor: e.target.value})}
                  required
                  placeholder="Vendor Name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Item</label>
                <input
                  type="text"
                  value={inspectionForm.item}
                  onChange={(e) => setInspectionForm({...inspectionForm, item: e.target.value})}
                  required
                  placeholder="Item Description"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Quantity</label>
                <input
                  type="text"
                  value={inspectionForm.quantity}
                  onChange={(e) => setInspectionForm({...inspectionForm, quantity: e.target.value})}
                  required
                  placeholder="50 Nos"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Remarks</label>
                <input
                  type="text"
                  value={inspectionForm.remarks}
                  onChange={(e) => setInspectionForm({...inspectionForm, remarks: e.target.value})}
                  placeholder="Optional remarks"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-colors"
            >
              Add Entry
            </button>
          </form>

          {/* Table */}
          {inspectionNotes.length > 0 && (
            <div className="overflow-x-auto">
              <h5 className="text-lg font-bold text-gray-900 mb-3">Inspection Notes</h5>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-400 px-3 py-2 font-semibold">S.No</th>
                    <th className="border border-gray-400 px-3 py-2 font-semibold">Date</th>
                    <th className="border border-gray-400 px-3 py-2 font-semibold">IN No</th>
                    <th className="border border-gray-400 px-3 py-2 font-semibold">Vendor</th>
                    <th className="border border-gray-400 px-3 py-2 font-semibold">Item</th>
                    <th className="border border-gray-400 px-3 py-2 font-semibold">Quantity</th>
                    <th className="border border-gray-400 px-3 py-2 font-semibold">Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {inspectionNotes.map((note, index) => (
                    <tr key={note.id} className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-3 py-2 text-center">{index + 1}</td>
                      <td className="border border-gray-300 px-3 py-2">{note.date}</td>
                      <td className="border border-gray-300 px-3 py-2">{note.inNo}</td>
                      <td className="border border-gray-300 px-3 py-2">{note.vendor}</td>
                      <td className="border border-gray-300 px-3 py-2">{note.item}</td>
                      <td className="border border-gray-300 px-3 py-2">{note.quantity}</td>
                      <td className="border border-gray-300 px-3 py-2">{note.remarks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* CRV Section */}
      {selectedSection === 'crv' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-xl font-bold text-gray-900">CRV (Cash Receipt Voucher)</h4>
            <button
              onClick={() => setShowImportModal(true)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              Import
            </button>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-indigo-100 text-sm font-semibold mb-1">Total CRV Entries</p>
                  <p className="text-3xl font-bold">{crvEntries.length}</p>
                </div>
                <div className="bg-white bg-opacity-20 rounded-full p-3">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-teal-100 text-sm font-semibold mb-1">Total Amount</p>
                  <p className="text-3xl font-bold">₹{crvEntries.reduce((sum, e) => sum + (parseFloat(e.amount) || 0), 0).toLocaleString('en-IN')}</p>
                </div>
                <div className="bg-white bg-opacity-20 rounded-full p-3">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm font-semibold mb-1">Total Quantity</p>
                  <p className="text-3xl font-bold">{crvEntries.reduce((sum, e) => sum + (parseFloat(e.quantity) || 0), 0)}</p>
                </div>
                <div className="bg-white bg-opacity-20 rounded-full p-3">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          {/* Form */}
          <form onSubmit={handleCrvSubmit} className="bg-gray-50 rounded-lg p-6 mb-6">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  value={crvForm.date}
                  onChange={(e) => setCrvForm({...crvForm, date: e.target.value})}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">CRV No</label>
                <input
                  type="text"
                  value={crvForm.crvNo}
                  onChange={(e) => setCrvForm({...crvForm, crvNo: e.target.value})}
                  required
                  placeholder="CRV/2025/001"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Section</label>
                <input
                  type="text"
                  value={crvForm.section}
                  onChange={(e) => setCrvForm({...crvForm, section: e.target.value})}
                  required
                  placeholder="ARD/VRD/SRD"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nomenclature</label>
                <input
                  type="text"
                  value={crvForm.nomenclature}
                  onChange={(e) => setCrvForm({...crvForm, nomenclature: e.target.value})}
                  required
                  placeholder="Item Name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Quantity</label>
                <input
                  type="text"
                  value={crvForm.quantity}
                  onChange={(e) => setCrvForm({...crvForm, quantity: e.target.value})}
                  required
                  placeholder="100"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Amount (₹)</label>
                <input
                  type="text"
                  value={crvForm.amount}
                  onChange={(e) => setCrvForm({...crvForm, amount: e.target.value})}
                  required
                  placeholder="50000"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-colors"
            >
              Add Entry
            </button>
          </form>

          {/* Table */}
          {crvEntries.length > 0 && (
            <div className="overflow-x-auto">
              <h5 className="text-lg font-bold text-gray-900 mb-3">CRV Entries</h5>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-400 px-3 py-2 font-semibold">S.No</th>
                    <th className="border border-gray-400 px-3 py-2 font-semibold">Date</th>
                    <th className="border border-gray-400 px-3 py-2 font-semibold">CRV No</th>
                    <th className="border border-gray-400 px-3 py-2 font-semibold">Section</th>
                    <th className="border border-gray-400 px-3 py-2 font-semibold">Nomenclature</th>
                    <th className="border border-gray-400 px-3 py-2 font-semibold">Quantity</th>
                    <th className="border border-gray-400 px-3 py-2 font-semibold">Amount (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {crvEntries.map((entry, index) => (
                    <tr key={entry.id} className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-3 py-2 text-center">{index + 1}</td>
                      <td className="border border-gray-300 px-3 py-2">{entry.date}</td>
                      <td className="border border-gray-300 px-3 py-2">{entry.crvNo}</td>
                      <td className="border border-gray-300 px-3 py-2">{entry.section}</td>
                      <td className="border border-gray-300 px-3 py-2">{entry.nomenclature}</td>
                      <td className="border border-gray-300 px-3 py-2 text-right">{entry.quantity}</td>
                      <td className="border border-gray-300 px-3 py-2 text-right">{entry.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Material Register Section */}
      {selectedSection === 'material-register' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-xl font-bold text-gray-900">Material Register</h4>
            <button
              onClick={() => setShowImportModal(true)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              Import
            </button>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-semibold mb-1">Total Entries</p>
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
                  <p className="text-green-100 text-sm font-semibold mb-1">Total Receipt Qty</p>
                  <p className="text-3xl font-bold">1,130</p>
                </div>
                <div className="bg-white bg-opacity-20 rounded-full p-3">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm font-semibold mb-1">Total Issue Qty</p>
                  <p className="text-3xl font-bold">315</p>
                </div>
                <div className="bg-white bg-opacity-20 rounded-full p-3">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 20v-8m-4 4l4-4 4 4" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-semibold mb-1">Total Balance</p>
                  <p className="text-3xl font-bold">815</p>
                </div>
                <div className="bg-white bg-opacity-20 rounded-full p-3">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-400 px-3 py-2 font-semibold">S.No</th>
                  <th className="border border-gray-400 px-3 py-2 font-semibold">Date</th>
                  <th className="border border-gray-400 px-3 py-2 font-semibold">Voucher No</th>
                  <th className="border border-gray-400 px-3 py-2 font-semibold">Challan No</th>
                  <th className="border border-gray-400 px-3 py-2 font-semibold">Challan Date</th>
                  <th className="border border-gray-400 px-3 py-2 font-semibold">Nomenclature</th>
                  <th className="border border-gray-400 px-3 py-2 font-semibold">Part No</th>
                  <th className="border border-gray-400 px-3 py-2 font-semibold">Receipt Qty</th>
                  <th className="border border-gray-400 px-3 py-2 font-semibold">Issue Qty</th>
                  <th className="border border-gray-400 px-3 py-2 font-semibold">Balance</th>
                  <th className="border border-gray-400 px-3 py-2 font-semibold">Issued To</th>
                  <th className="border border-gray-400 px-3 py-2 font-semibold">Remarks</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2 text-center">1</td>
                  <td className="border border-gray-300 px-3 py-2">15-01-2025</td>
                  <td className="border border-gray-300 px-3 py-2">MR/2025/001</td>
                  <td className="border border-gray-300 px-3 py-2">CH-101</td>
                  <td className="border border-gray-300 px-3 py-2">10-01-2025</td>
                  <td className="border border-gray-300 px-3 py-2">BOLT ASSEMBLY</td>
                  <td className="border border-gray-300 px-3 py-2">5307-228880</td>
                  <td className="border border-gray-300 px-3 py-2 text-right">200</td>
                  <td className="border border-gray-300 px-3 py-2 text-right">50</td>
                  <td className="border border-gray-300 px-3 py-2 text-right">150</td>
                  <td className="border border-gray-300 px-3 py-2">ARD Section</td>
                  <td className="border border-gray-300 px-3 py-2">-</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2 text-center">2</td>
                  <td className="border border-gray-300 px-3 py-2">18-01-2025</td>
                  <td className="border border-gray-300 px-3 py-2">MR/2025/002</td>
                  <td className="border border-gray-300 px-3 py-2">CH-102</td>
                  <td className="border border-gray-300 px-3 py-2">13-01-2025</td>
                  <td className="border border-gray-300 px-3 py-2">WATER RADIATOR</td>
                  <td className="border border-gray-300 px-3 py-2">LV2I/CVS-765</td>
                  <td className="border border-gray-300 px-3 py-2 text-right">30</td>
                  <td className="border border-gray-300 px-3 py-2 text-right">10</td>
                  <td className="border border-gray-300 px-3 py-2 text-right">20</td>
                  <td className="border border-gray-300 px-3 py-2">SRD Section</td>
                  <td className="border border-gray-300 px-3 py-2">Urgent Issue</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2 text-center">3</td>
                  <td className="border border-gray-300 px-3 py-2">22-01-2025</td>
                  <td className="border border-gray-300 px-3 py-2">MR/2025/003</td>
                  <td className="border border-gray-300 px-3 py-2">CH-103</td>
                  <td className="border border-gray-300 px-3 py-2">17-01-2025</td>
                  <td className="border border-gray-300 px-3 py-2">HYDRAULIC OIL</td>
                  <td className="border border-gray-300 px-3 py-2">HYD-OIL-68</td>
                  <td className="border border-gray-300 px-3 py-2 text-right">500</td>
                  <td className="border border-gray-300 px-3 py-2 text-right">150</td>
                  <td className="border border-gray-300 px-3 py-2 text-right">350</td>
                  <td className="border border-gray-300 px-3 py-2">VRD Section</td>
                  <td className="border border-gray-300 px-3 py-2">-</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2 text-center">4</td>
                  <td className="border border-gray-300 px-3 py-2">25-01-2025</td>
                  <td className="border border-gray-300 px-3 py-2">MR/2025/004</td>
                  <td className="border border-gray-300 px-3 py-2">CH-104</td>
                  <td className="border border-gray-300 px-3 py-2">20-01-2025</td>
                  <td className="border border-gray-300 px-3 py-2">GASKET SET</td>
                  <td className="border border-gray-300 px-3 py-2">5330-00184</td>
                  <td className="border border-gray-300 px-3 py-2 text-right">100</td>
                  <td className="border border-gray-300 px-3 py-2 text-right">25</td>
                  <td className="border border-gray-300 px-3 py-2 text-right">75</td>
                  <td className="border border-gray-300 px-3 py-2">ETD Section</td>
                  <td className="border border-gray-300 px-3 py-2">-</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2 text-center">5</td>
                  <td className="border border-gray-300 px-3 py-2">28-01-2025</td>
                  <td className="border border-gray-300 px-3 py-2">MR/2025/005</td>
                  <td className="border border-gray-300 px-3 py-2">CH-105</td>
                  <td className="border border-gray-300 px-3 py-2">23-01-2025</td>
                  <td className="border border-gray-300 px-3 py-2">SPRING HELICAL</td>
                  <td className="border border-gray-300 px-3 py-2">5360-042773</td>
                  <td className="border border-gray-300 px-3 py-2 text-right">300</td>
                  <td className="border border-gray-300 px-3 py-2 text-right">80</td>
                  <td className="border border-gray-300 px-3 py-2 text-right">220</td>
                  <td className="border border-gray-300 px-3 py-2">TAR Section</td>
                  <td className="border border-gray-300 px-3 py-2">Priority Item</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Supply Order Section */}
      {selectedSection === 'supply-order' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-xl font-bold text-gray-900">Supply Order</h4>
            <button
              onClick={() => setShowImportModal(true)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-colors flex items-center gap-2"
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
                  <p className="text-cyan-100 text-sm font-semibold mb-1">Total Supply Orders</p>
                  <p className="text-3xl font-bold">8</p>
                </div>
                <div className="bg-white bg-opacity-20 rounded-full p-3">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-pink-100 text-sm font-semibold mb-1">Total Amount</p>
                  <p className="text-3xl font-bold">₹12.5L</p>
                </div>
                <div className="bg-white bg-opacity-20 rounded-full p-3">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-100 text-sm font-semibold mb-1">Pending Orders</p>
                  <p className="text-3xl font-bold">3</p>
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
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-400 px-3 py-2 font-semibold">S.No</th>
                  <th className="border border-gray-400 px-3 py-2 font-semibold">Supply Order No</th>
                  <th className="border border-gray-400 px-3 py-2 font-semibold">Vendor Name</th>
                  <th className="border border-gray-400 px-3 py-2 font-semibold">Sec/Part No</th>
                  <th className="border border-gray-400 px-3 py-2 font-semibold">Nomenclature</th>
                  <th className="border border-gray-400 px-3 py-2 font-semibold">A/U</th>
                  <th className="border border-gray-400 px-3 py-2 font-semibold">Quantity</th>
                  <th className="border border-gray-400 px-3 py-2 font-semibold">Rate (₹)</th>
                  <th className="border border-gray-400 px-3 py-2 font-semibold">Cost (₹)</th>
                  <th className="border border-gray-400 px-3 py-2 font-semibold">GST %</th>
                  <th className="border border-gray-400 px-3 py-2 font-semibold">Total Amount (₹)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2 text-center">1</td>
                  <td className="border border-gray-300 px-3 py-2">SO/2025/001</td>
                  <td className="border border-gray-300 px-3 py-2">ABC Industries Ltd</td>
                  <td className="border border-gray-300 px-3 py-2">ARD/5307-228880</td>
                  <td className="border border-gray-300 px-3 py-2">BOLT ASSEMBLY</td>
                  <td className="border border-gray-300 px-3 py-2 text-center">Nos</td>
                  <td className="border border-gray-300 px-3 py-2 text-right">500</td>
                  <td className="border border-gray-300 px-3 py-2 text-right">150</td>
                  <td className="border border-gray-300 px-3 py-2 text-right">75,000</td>
                  <td className="border border-gray-300 px-3 py-2 text-center">18</td>
                  <td className="border border-gray-300 px-3 py-2 text-right">88,500</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2 text-center">2</td>
                  <td className="border border-gray-300 px-3 py-2">SO/2025/002</td>
                  <td className="border border-gray-300 px-3 py-2">XYZ Traders</td>
                  <td className="border border-gray-300 px-3 py-2">VRD/HYD-OIL-68</td>
                  <td className="border border-gray-300 px-3 py-2">HYDRAULIC OIL</td>
                  <td className="border border-gray-300 px-3 py-2 text-center">Ltr</td>
                  <td className="border border-gray-300 px-3 py-2 text-right">1000</td>
                  <td className="border border-gray-300 px-3 py-2 text-right">250</td>
                  <td className="border border-gray-300 px-3 py-2 text-right">2,50,000</td>
                  <td className="border border-gray-300 px-3 py-2 text-center">12</td>
                  <td className="border border-gray-300 px-3 py-2 text-right">2,80,000</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2 text-center">3</td>
                  <td className="border border-gray-300 px-3 py-2">SO/2025/003</td>
                  <td className="border border-gray-300 px-3 py-2">PQR Engineering Works</td>
                  <td className="border border-gray-300 px-3 py-2">SRD/LV2I/CVS-765</td>
                  <td className="border border-gray-300 px-3 py-2">WATER RADIATOR</td>
                  <td className="border border-gray-300 px-3 py-2 text-center">Nos</td>
                  <td className="border border-gray-300 px-3 py-2 text-right">50</td>
                  <td className="border border-gray-300 px-3 py-2 text-right">8,500</td>
                  <td className="border border-gray-300 px-3 py-2 text-right">4,25,000</td>
                  <td className="border border-gray-300 px-3 py-2 text-center">18</td>
                  <td className="border border-gray-300 px-3 py-2 text-right">5,01,500</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2 text-center">4</td>
                  <td className="border border-gray-300 px-3 py-2">SO/2025/004</td>
                  <td className="border border-gray-300 px-3 py-2">LMN Steel Corporation</td>
                  <td className="border border-gray-300 px-3 py-2">ETD/STEEL-MS</td>
                  <td className="border border-gray-300 px-3 py-2">MILD STEEL SHEET</td>
                  <td className="border border-gray-300 px-3 py-2 text-center">Kg</td>
                  <td className="border border-gray-300 px-3 py-2 text-right">2500</td>
                  <td className="border border-gray-300 px-3 py-2 text-right">85</td>
                  <td className="border border-gray-300 px-3 py-2 text-right">2,12,500</td>
                  <td className="border border-gray-300 px-3 py-2 text-center">18</td>
                  <td className="border border-gray-300 px-3 py-2 text-right">2,50,750</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2 text-center">5</td>
                  <td className="border border-gray-300 px-3 py-2">SO/2025/005</td>
                  <td className="border border-gray-300 px-3 py-2">DEF Chemicals Pvt Ltd</td>
                  <td className="border border-gray-300 px-3 py-2">TAR/PAINT-EP</td>
                  <td className="border border-gray-300 px-3 py-2">EPOXY PAINT</td>
                  <td className="border border-gray-300 px-3 py-2 text-center">m³</td>
                  <td className="border border-gray-300 px-3 py-2 text-right">15</td>
                  <td className="border border-gray-300 px-3 py-2 text-right">12,000</td>
                  <td className="border border-gray-300 px-3 py-2 text-right">1,80,000</td>
                  <td className="border border-gray-300 px-3 py-2 text-center">18</td>
                  <td className="border border-gray-300 px-3 py-2 text-right">2,12,400</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CRV Control Register Section */}
      {selectedSection === 'crv-register' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-xl font-bold text-gray-900">CRV Control Register</h4>
            <button
              onClick={() => setShowImportModal(true)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              Import
            </button>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-indigo-100 text-sm font-semibold mb-1">Total CRV Entries</p>
                  <p className="text-3xl font-bold">12</p>
                </div>
                <div className="bg-white bg-opacity-20 rounded-full p-3">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100 text-sm font-semibold mb-1">Serviceable Items</p>
                  <p className="text-3xl font-bold">10</p>
                </div>
                <div className="bg-white bg-opacity-20 rounded-full p-3">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-rose-500 to-rose-600 rounded-xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-rose-100 text-sm font-semibold mb-1">Unserviceable Items</p>
                  <p className="text-3xl font-bold">2</p>
                </div>
                <div className="bg-white bg-opacity-20 rounded-full p-3">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-400 px-3 py-2 font-semibold">S.No</th>
                  <th className="border border-gray-400 px-3 py-2 font-semibold">Date</th>
                  <th className="border border-gray-400 px-3 py-2 font-semibold">CRV No</th>
                  <th className="border border-gray-400 px-3 py-2 font-semibold">Challan No</th>
                  <th className="border border-gray-400 px-3 py-2 font-semibold">Challan Date</th>
                  <th className="border border-gray-400 px-3 py-2 font-semibold">Supply Order No</th>
                  <th className="border border-gray-400 px-3 py-2 font-semibold">Supply Order Date</th>
                  <th className="border border-gray-400 px-3 py-2 font-semibold">INSPEC/NO</th>
                  <th className="border border-gray-400 px-3 py-2 font-semibold">INSPEC Date</th>
                  <th className="border border-gray-400 px-3 py-2 font-semibold">RV No.</th>
                  <th className="border border-gray-400 px-3 py-2 font-semibold">RV Date</th>
                  <th className="border border-gray-400 px-3 py-2 font-semibold">Depot/Section</th>
                  <th className="border border-gray-400 px-3 py-2 font-semibold">Part No</th>
                  <th className="border border-gray-400 px-3 py-2 font-semibold">Nomenclature</th>
                  <th className="border border-gray-400 px-3 py-2 font-semibold">Quantity</th>
                  <th className="border border-gray-400 px-3 py-2 font-semibold">Returned By</th>
                  <th className="border border-gray-400 px-3 py-2 font-semibold">Condition</th>
                  <th className="border border-gray-400 px-3 py-2 font-semibold">Remarks</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2 text-center">1</td>
                  <td className="border border-gray-300 px-3 py-2">10-02-2025</td>
                  <td className="border border-gray-300 px-3 py-2">CRV/2025/001</td>
                  <td className="border border-gray-300 px-3 py-2">CH-101</td>
                  <td className="border border-gray-300 px-3 py-2">05-02-2025</td>
                  <td className="border border-gray-300 px-3 py-2">SO/2025/001</td>
                  <td className="border border-gray-300 px-3 py-2">01-02-2025</td>
                  <td className="border border-gray-300 px-3 py-2">IN-001</td>
                  <td className="border border-gray-300 px-3 py-2">06-02-2025</td>
                  <td className="border border-gray-300 px-3 py-2">RV-001</td>
                  <td className="border border-gray-300 px-3 py-2">08-02-2025</td>
                  <td className="border border-gray-300 px-3 py-2">CAF/VD KIRKEE</td>
                  <td className="border border-gray-300 px-3 py-2">5307-228880</td>
                  <td className="border border-gray-300 px-3 py-2">BOLT ASSEMBLY</td>
                  <td className="border border-gray-300 px-3 py-2 text-right">25</td>
                  <td className="border border-gray-300 px-3 py-2">ARD Section</td>
                  <td className="border border-gray-300 px-3 py-2">Serviceable</td>
                  <td className="border border-gray-300 px-3 py-2">Excess Stock</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2 text-center">2</td>
                  <td className="border border-gray-300 px-3 py-2">12-02-2025</td>
                  <td className="border border-gray-300 px-3 py-2">CRV/2025/002</td>
                  <td className="border border-gray-300 px-3 py-2">CH-102</td>
                  <td className="border border-gray-300 px-3 py-2">08-02-2025</td>
                  <td className="border border-gray-300 px-3 py-2">SO/2025/002</td>
                  <td className="border border-gray-300 px-3 py-2">04-02-2025</td>
                  <td className="border border-gray-300 px-3 py-2">IN-002</td>
                  <td className="border border-gray-300 px-3 py-2">09-02-2025</td>
                  <td className="border border-gray-300 px-3 py-2">RV-002</td>
                  <td className="border border-gray-300 px-3 py-2">10-02-2025</td>
                  <td className="border border-gray-300 px-3 py-2">COD AGRA</td>
                  <td className="border border-gray-300 px-3 py-2">5330-00184</td>
                  <td className="border border-gray-300 px-3 py-2">GASKET SET</td>
                  <td className="border border-gray-300 px-3 py-2 text-right">15</td>
                  <td className="border border-gray-300 px-3 py-2">VRD Section</td>
                  <td className="border border-gray-300 px-3 py-2">Defective</td>
                  <td className="border border-gray-300 px-3 py-2">To be repaired</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2 text-center">3</td>
                  <td className="border border-gray-300 px-3 py-2">15-02-2025</td>
                  <td className="border border-gray-300 px-3 py-2">CRV/2025/003</td>
                  <td className="border border-gray-300 px-3 py-2">CH-103</td>
                  <td className="border border-gray-300 px-3 py-2">11-02-2025</td>
                  <td className="border border-gray-300 px-3 py-2">SO/2025/003</td>
                  <td className="border border-gray-300 px-3 py-2">07-02-2025</td>
                  <td className="border border-gray-300 px-3 py-2">IN-003</td>
                  <td className="border border-gray-300 px-3 py-2">12-02-2025</td>
                  <td className="border border-gray-300 px-3 py-2">RV-003</td>
                  <td className="border border-gray-300 px-3 py-2">14-02-2025</td>
                  <td className="border border-gray-300 px-3 py-2">CAF/VD KIRKEE</td>
                  <td className="border border-gray-300 px-3 py-2">LV2I/CVS-765</td>
                  <td className="border border-gray-300 px-3 py-2">WATER RADIATOR</td>
                  <td className="border border-gray-300 px-3 py-2 text-right">5</td>
                  <td className="border border-gray-300 px-3 py-2">SRD Section</td>
                  <td className="border border-gray-300 px-3 py-2">Serviceable</td>
                  <td className="border border-gray-300 px-3 py-2">-</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2 text-center">4</td>
                  <td className="border border-gray-300 px-3 py-2">18-02-2025</td>
                  <td className="border border-gray-300 px-3 py-2">CRV/2025/004</td>
                  <td className="border border-gray-300 px-3 py-2">CH-104</td>
                  <td className="border border-gray-300 px-3 py-2">14-02-2025</td>
                  <td className="border border-gray-300 px-3 py-2">SO/2025/004</td>
                  <td className="border border-gray-300 px-3 py-2">10-02-2025</td>
                  <td className="border border-gray-300 px-3 py-2">IN-004</td>
                  <td className="border border-gray-300 px-3 py-2">15-02-2025</td>
                  <td className="border border-gray-300 px-3 py-2">RV-004</td>
                  <td className="border border-gray-300 px-3 py-2">17-02-2025</td>
                  <td className="border border-gray-300 px-3 py-2">COD AGRA</td>
                  <td className="border border-gray-300 px-3 py-2">5360-042773</td>
                  <td className="border border-gray-300 px-3 py-2">SPRING HELICAL</td>
                  <td className="border border-gray-300 px-3 py-2 text-right">40</td>
                  <td className="border border-gray-300 px-3 py-2">ETD Section</td>
                  <td className="border border-gray-300 px-3 py-2">Serviceable</td>
                  <td className="border border-gray-300 px-3 py-2">Surplus</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2 text-center">5</td>
                  <td className="border border-gray-300 px-3 py-2">20-02-2025</td>
                  <td className="border border-gray-300 px-3 py-2">CRV/2025/005</td>
                  <td className="border border-gray-300 px-3 py-2">CH-105</td>
                  <td className="border border-gray-300 px-3 py-2">16-02-2025</td>
                  <td className="border border-gray-300 px-3 py-2">SO/2025/005</td>
                  <td className="border border-gray-300 px-3 py-2">12-02-2025</td>
                  <td className="border border-gray-300 px-3 py-2">IN-005</td>
                  <td className="border border-gray-300 px-3 py-2">17-02-2025</td>
                  <td className="border border-gray-300 px-3 py-2">RV-005</td>
                  <td className="border border-gray-300 px-3 py-2">19-02-2025</td>
                  <td className="border border-gray-300 px-3 py-2">CAF/VD KIRKEE</td>
                  <td className="border border-gray-300 px-3 py-2">HYD-OIL-68</td>
                  <td className="border border-gray-300 px-3 py-2">HYDRAULIC OIL</td>
                  <td className="border border-gray-300 px-3 py-2 text-right">100</td>
                  <td className="border border-gray-300 px-3 py-2">TAR Section</td>
                  <td className="border border-gray-300 px-3 py-2">Serviceable</td>
                  <td className="border border-gray-300 px-3 py-2">Unopened</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Supply Order Register Section */}
      {selectedSection === 'supply-order-register' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-xl font-bold text-gray-900">Supply Order Register</h4>
            <button
              onClick={() => setShowImportModal(true)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-colors flex items-center gap-2"
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
                  <p className="text-cyan-100 text-sm font-semibold mb-1">Total Orders</p>
                  <p className="text-3xl font-bold">15</p>
                </div>
                <div className="bg-white bg-opacity-20 rounded-full p-3">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-violet-500 to-violet-600 rounded-xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-violet-100 text-sm font-semibold mb-1">Completed Orders</p>
                  <p className="text-3xl font-bold">12</p>
                </div>
                <div className="bg-white bg-opacity-20 rounded-full p-3">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-amber-100 text-sm font-semibold mb-1">Pending Orders</p>
                  <p className="text-3xl font-bold">3</p>
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
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-400 px-3 py-2 font-semibold">S.No</th>
                  <th className="border border-gray-400 px-3 py-2 font-semibold">SO No</th>
                  <th className="border border-gray-400 px-3 py-2 font-semibold">SO Date</th>
                  <th className="border border-gray-400 px-3 py-2 font-semibold">Vendor Name</th>
                  <th className="border border-gray-400 px-3 py-2 font-semibold">Vendor Contact</th>
                  <th className="border border-gray-400 px-3 py-2 font-semibold">Item Description</th>
                  <th className="border border-gray-400 px-3 py-2 font-semibold">Total Amount (₹)</th>
                  <th className="border border-gray-400 px-3 py-2 font-semibold">Delivery Date</th>
                  <th className="border border-gray-400 px-3 py-2 font-semibold">Status</th>
                  <th className="border border-gray-400 px-3 py-2 font-semibold">Payment Status</th>
                  <th className="border border-gray-400 px-3 py-2 font-semibold">Remarks</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2 text-center">1</td>
                  <td className="border border-gray-300 px-3 py-2">SO/2025/001</td>
                  <td className="border border-gray-300 px-3 py-2">05-01-2025</td>
                  <td className="border border-gray-300 px-3 py-2">ABC Industries Ltd</td>
                  <td className="border border-gray-300 px-3 py-2">+91-9876543210</td>
                  <td className="border border-gray-300 px-3 py-2">BOLT ASSEMBLY - 500 Nos</td>
                  <td className="border border-gray-300 px-3 py-2 text-right">88,500</td>
                  <td className="border border-gray-300 px-3 py-2">05-02-2025</td>
                  <td className="border border-gray-300 px-3 py-2">Completed</td>
                  <td className="border border-gray-300 px-3 py-2">Paid</td>
                  <td className="border border-gray-300 px-3 py-2">On Time</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2 text-center">2</td>
                  <td className="border border-gray-300 px-3 py-2">SO/2025/002</td>
                  <td className="border border-gray-300 px-3 py-2">10-01-2025</td>
                  <td className="border border-gray-300 px-3 py-2">XYZ Traders</td>
                  <td className="border border-gray-300 px-3 py-2">+91-9123456789</td>
                  <td className="border border-gray-300 px-3 py-2">HYDRAULIC OIL - 1000 Ltr</td>
                  <td className="border border-gray-300 px-3 py-2 text-right">2,80,000</td>
                  <td className="border border-gray-300 px-3 py-2">15-02-2025</td>
                  <td className="border border-gray-300 px-3 py-2">In Progress</td>
                  <td className="border border-gray-300 px-3 py-2">Pending</td>
                  <td className="border border-gray-300 px-3 py-2">-</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2 text-center">3</td>
                  <td className="border border-gray-300 px-3 py-2">SO/2025/003</td>
                  <td className="border border-gray-300 px-3 py-2">15-01-2025</td>
                  <td className="border border-gray-300 px-3 py-2">PQR Engineering Works</td>
                  <td className="border border-gray-300 px-3 py-2">+91-8765432109</td>
                  <td className="border border-gray-300 px-3 py-2">WATER RADIATOR - 50 Nos</td>
                  <td className="border border-gray-300 px-3 py-2 text-right">5,01,500</td>
                  <td className="border border-gray-300 px-3 py-2">28-02-2025</td>
                  <td className="border border-gray-300 px-3 py-2">Ordered</td>
                  <td className="border border-gray-300 px-3 py-2">Advance Paid</td>
                  <td className="border border-gray-300 px-3 py-2">30% Advance</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2 text-center">4</td>
                  <td className="border border-gray-300 px-3 py-2">SO/2025/004</td>
                  <td className="border border-gray-300 px-3 py-2">20-01-2025</td>
                  <td className="border border-gray-300 px-3 py-2">LMN Steel Corporation</td>
                  <td className="border border-gray-300 px-3 py-2">+91-9988776655</td>
                  <td className="border border-gray-300 px-3 py-2">MILD STEEL SHEET - 2500 Kg</td>
                  <td className="border border-gray-300 px-3 py-2 text-right">2,50,750</td>
                  <td className="border border-gray-300 px-3 py-2">10-02-2025</td>
                  <td className="border border-gray-300 px-3 py-2">Completed</td>
                  <td className="border border-gray-300 px-3 py-2">Paid</td>
                  <td className="border border-gray-300 px-3 py-2">-</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2 text-center">5</td>
                  <td className="border border-gray-300 px-3 py-2">SO/2025/005</td>
                  <td className="border border-gray-300 px-3 py-2">25-01-2025</td>
                  <td className="border border-gray-300 px-3 py-2">DEF Chemicals Pvt Ltd</td>
                  <td className="border border-gray-300 px-3 py-2">+91-8877665544</td>
                  <td className="border border-gray-300 px-3 py-2">EPOXY PAINT - 15 m³</td>
                  <td className="border border-gray-300 px-3 py-2 text-right">2,12,400</td>
                  <td className="border border-gray-300 px-3 py-2">20-02-2025</td>
                  <td className="border border-gray-300 px-3 py-2">Delayed</td>
                  <td className="border border-gray-300 px-3 py-2">Pending</td>
                  <td className="border border-gray-300 px-3 py-2">Vendor Delay</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
