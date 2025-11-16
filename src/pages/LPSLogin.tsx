import React, { useState } from 'react'

export default function LPSLogin() {
  const [selectedSection, setSelectedSection] = useState('inspection-note')
  
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

  // CFV form states
  const [cfvEntries, setCfvEntries] = useState<any[]>([])
  const [cfvForm, setCfvForm] = useState({
    date: '',
    cfvNo: '',
    section: '',
    nomenclature: '',
    quantity: '',
    amount: ''
  })

  const handleInspectionSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setInspectionNotes([...inspectionNotes, { ...inspectionForm, id: Date.now() }])
    setInspectionForm({ date: '', inNo: '', vendor: '', item: '', quantity: '', remarks: '' })
  }

  const handleCfvSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setCfvEntries([...cfvEntries, { ...cfvForm, id: Date.now() }])
    setCfvForm({ date: '', cfvNo: '', section: '', nomenclature: '', quantity: '', amount: '' })
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
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
            onClick={() => setSelectedSection('cfv')}
            className={`px-6 py-3 font-semibold text-sm transition-all whitespace-nowrap ${
              selectedSection === 'cfv'
                ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            CFV
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

      {/* Inspection Note Section */}
      {selectedSection === 'inspection-note' && (
        <div>
          <h4 className="text-xl font-bold text-gray-900 mb-4">Inspection Note</h4>
          
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

      {/* CFV Section */}
      {selectedSection === 'cfv' && (
        <div>
          <h4 className="text-xl font-bold text-gray-900 mb-4">CFV (Cash/Folio Voucher)</h4>
          
          {/* Form */}
          <form onSubmit={handleCfvSubmit} className="bg-gray-50 rounded-lg p-6 mb-6">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  value={cfvForm.date}
                  onChange={(e) => setCfvForm({...cfvForm, date: e.target.value})}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">CFV No</label>
                <input
                  type="text"
                  value={cfvForm.cfvNo}
                  onChange={(e) => setCfvForm({...cfvForm, cfvNo: e.target.value})}
                  required
                  placeholder="CFV/2025/001"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Section</label>
                <input
                  type="text"
                  value={cfvForm.section}
                  onChange={(e) => setCfvForm({...cfvForm, section: e.target.value})}
                  required
                  placeholder="ARD/VRD/SRD"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nomenclature</label>
                <input
                  type="text"
                  value={cfvForm.nomenclature}
                  onChange={(e) => setCfvForm({...cfvForm, nomenclature: e.target.value})}
                  required
                  placeholder="Item Name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Quantity</label>
                <input
                  type="text"
                  value={cfvForm.quantity}
                  onChange={(e) => setCfvForm({...cfvForm, quantity: e.target.value})}
                  required
                  placeholder="100"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Amount (₹)</label>
                <input
                  type="text"
                  value={cfvForm.amount}
                  onChange={(e) => setCfvForm({...cfvForm, amount: e.target.value})}
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
          {cfvEntries.length > 0 && (
            <div className="overflow-x-auto">
              <h5 className="text-lg font-bold text-gray-900 mb-3">CFV Entries</h5>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-400 px-3 py-2 font-semibold">S.No</th>
                    <th className="border border-gray-400 px-3 py-2 font-semibold">Date</th>
                    <th className="border border-gray-400 px-3 py-2 font-semibold">CFV No</th>
                    <th className="border border-gray-400 px-3 py-2 font-semibold">Section</th>
                    <th className="border border-gray-400 px-3 py-2 font-semibold">Nomenclature</th>
                    <th className="border border-gray-400 px-3 py-2 font-semibold">Quantity</th>
                    <th className="border border-gray-400 px-3 py-2 font-semibold">Amount (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {cfvEntries.map((entry, index) => (
                    <tr key={entry.id} className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-3 py-2 text-center">{index + 1}</td>
                      <td className="border border-gray-300 px-3 py-2">{entry.date}</td>
                      <td className="border border-gray-300 px-3 py-2">{entry.cfvNo}</td>
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
          <h4 className="text-xl font-bold text-gray-900 mb-4">Material Register</h4>
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
          <h4 className="text-xl font-bold text-gray-900 mb-4">Supply Order</h4>
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
          <h4 className="text-xl font-bold text-gray-900 mb-4">CRV Control Register</h4>
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
          <h4 className="text-xl font-bold text-gray-900 mb-4">Supply Order Register</h4>
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
