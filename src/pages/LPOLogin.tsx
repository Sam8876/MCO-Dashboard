import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// ... (LprForm and LprList components remain the same) ...
interface FormField {
    id: keyof LprState
    label: string
    placeholder?: string
    type: 'text' | 'date' | 'number'
    gridSpan?: string // e.g., 'sm:col-span-2'
    isReadOnly?: boolean
  }
  
  // State structure for the LPR form
  interface LprState {
    lprNo: string
    lprDate: string
    ossControlNo: string
    ossDate: string
    demandNoAndDate: string
    depotNaNoAndDate: string
    armyHqSrlNo: string
    woNo: string
    sec: string
    partNo: string
    ohs: string
    scale: string
    nomenclature: string
    au: string
    qtyReqd: string
    ref: string
    lastPurchasePrice: string
  }
  
  function LprForm() {
    const [lpr, setLpr] = useState<LprState>({
      lprNo: '',
      lprDate: '',
      ossControlNo: '',
      ossDate: '',
      demandNoAndDate: '',
      depotNaNoAndDate: '',
      armyHqSrlNo: '',
      woNo: '',
      sec: '',
      partNo: '',
      ohs: '',
      scale: '',
      nomenclature: '',
      au: '',
      qtyReqd: '',
      ref: '',
      lastPurchasePrice: 'Auto-generated from saved data'
    })
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target
      setLpr((prevLpr) => ({
        ...prevLpr,
        [name]: value
      }))
    }
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      // Handle form submission logic here
      console.log('LPR Submitted:', lpr)
      alert('LPR form submitted! Check the console for the data.')
    }
  
    // Define form fields based on the image
    const formFields: FormField[] = [
      { id: 'lprNo', label: 'LPR No/Originators No', type: 'text', placeholder: 'Originator Number' },
      { id: 'lprDate', label: 'Date', type: 'date' },
      { id: 'ossControlNo', label: 'OSS Control No', type: 'text', placeholder: 'OSS Control Number' },
      { id: 'ossDate', label: 'Date', type: 'date' },
      { id: 'demandNoAndDate', label: 'Demand No & Date', type: 'text', placeholder: 'Demand Info' },
      { id: 'depotNaNoAndDate', label: 'Depot NA No & Date', type: 'text', placeholder: 'Depot NA Info' },
      { id: 'armyHqSrlNo', label: 'Army HQ Srl No', type: 'text', placeholder: 'Army HQ Serial' },
      { id: 'woNo', label: 'WO No / Job No', type: 'text', placeholder: 'WO or Job Number' },
      { id: 'sec', label: 'Sec', type: 'text', placeholder: 'Section' },
      { id: 'partNo', label: 'Part No', type: 'text', placeholder: 'Part Number' },
      { id: 'ohs', label: 'OHS (OH-I / OH-II)', type: 'text', placeholder: 'OHS-I or OHS-II' },
      { id: 'scale', label: 'Scale (OH-I / OH-II)', type: 'text', placeholder: 'Scale' },
      { id: 'nomenclature', label: 'Nomenclature', type: 'text', placeholder: 'Item Name', gridSpan: 'sm:col-span-2' },
      { id: 'au', label: 'A/U', type: 'text', placeholder: 'A/U' },
      { id: 'qtyReqd', label: 'Qty Reqd', type: 'number', placeholder: 'e.g., 100' },
      { id: 'ref', label: 'Ref (CT No/ION No/WO No etc)', type: 'text', placeholder: 'Reference Number', gridSpan: 'sm:col-span-2' },
      { id: 'lastPurchasePrice', label: 'Last Purchase Price', type: 'text', isReadOnly: true, gridSpan: 'sm:col-span-2' }
    ]
  
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200">
        <div className="p-8">
          <header className="mb-8 text-center">
            <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wider">CP / Chaser Module</p>
            <h1 className="text-3xl font-extrabold text-gray-900 mt-2">Local Purchase Requisition (LPR)</h1>
            <p className="mt-2 text-sm text-gray-600">Create and manage LPRs as per the specified format.</p>
          </header>
  
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
                {formFields.map((field) => (
                  <div key={field.id} className={field.gridSpan || ''}>
                    <label htmlFor={field.id} className="block text-sm font-medium text-gray-700">
                      {field.label}
                    </label>
                    <div className="mt-1">
                      <input
                        type={field.type}
                        name={field.id}
                        id={field.id}
                        value={lpr[field.id]}
                        onChange={handleInputChange}
                        placeholder={field.placeholder || ''}
                        readOnly={field.isReadOnly}
                        className={`block w-full rounded-md shadow-sm ${
                          field.isReadOnly
                            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            : 'bg-white border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                        } sm:text-sm px-3 py-2`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
  
            <div className="flex justify-end pt-5">
              <button
                type="submit"
                className="inline-flex justify-center py-3 px-8 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
  
  function LprList() {
    const [selectedLpr, setSelectedLpr] = useState<any>(null);
    
    // Dummy data matching the image format with status entries
    const lprs = [
      {
        id: 1,
        originatorNo: 'ORG/2025/001',
        date: '15-Jan-2025',
        ossControlNo: 'OSS/001/2025',
        ossDate: '16-Jan-2025',
        status: 'ENQ',
        items: [
          {
            sNo: 1,
            secPartNo: 'VRD/PT-2/001',
            designation: 'BOLT ASSEMBLY',
            au: 'Nos',
            qtyReqd: '500',
            demandNoDate: 'DEM/001 / 10-Jan-2025',
            depotNANoDate: 'DEP/NA/001 / 12-Jan-2025',
            armyHQSrlNo: 'AHQ/SRL/001',
            woNoJobNo: 'WO/2025/001',
            remarks: 'Urgent'
          },
          {
            sNo: 2,
            secPartNo: 'ARD/PT-1/002',
            designation: 'HYDRAULIC OIL',
            au: 'Ltr',
            qtyReqd: '1000',
            demandNoDate: 'DEM/002 / 10-Jan-2025',
            depotNANoDate: 'DEP/NA/002 / 12-Jan-2025',
            armyHQSrlNo: 'AHQ/SRL/002',
            woNoJobNo: 'WO/2025/002',
            remarks: ''
          }
        ]
      },
      {
        id: 2,
        originatorNo: 'ORG/2025/002',
        date: '18-Jan-2025',
        ossControlNo: 'OSS/002/2025',
        ossDate: '19-Jan-2025',
        status: 'CST',
        items: [
          {
            sNo: 1,
            secPartNo: 'SRD/PT-3/003',
            designation: 'WATER RADIATOR',
            au: 'Nos',
            qtyReqd: '50',
            demandNoDate: 'DEM/003 / 15-Jan-2025',
            depotNANoDate: 'DEP/NA/003 / 16-Jan-2025',
            armyHQSrlNo: 'AHQ/SRL/003',
            woNoJobNo: 'WO/2025/003',
            remarks: 'Priority'
          }
        ]
      },
      {
        id: 3,
        originatorNo: 'ORG/2025/003',
        date: '20-Jan-2025',
        ossControlNo: 'OSS/003/2025',
        ossDate: '21-Jan-2025',
        status: 'SANC',
        items: [
          {
            sNo: 1,
            secPartNo: 'ETD/PT-4/004',
            designation: 'GASKET SET',
            au: 'Sets',
            qtyReqd: '100',
            demandNoDate: 'DEM/004 / 18-Jan-2025',
            depotNANoDate: 'DEP/NA/004 / 19-Jan-2025',
            armyHQSrlNo: 'AHQ/SRL/004',
            woNoJobNo: 'WO/2025/004',
            remarks: ''
          },
          {
            sNo: 2,
            secPartNo: 'TAR/PT-5/005',
            designation: 'SPRING HELICAL',
            au: 'Nos',
            qtyReqd: '300',
            demandNoDate: 'DEM/005 / 18-Jan-2025',
            depotNANoDate: 'DEP/NA/005 / 19-Jan-2025',
            armyHQSrlNo: 'AHQ/SRL/005',
            woNoJobNo: 'WO/2025/005',
            remarks: 'Bulk Order'
          }
        ]
      },
      {
        id: 4,
        originatorNo: 'ORG/2025/004',
        date: '22-Jan-2025',
        ossControlNo: 'OSS/004/2025',
        ossDate: '23-Jan-2025',
        status: 'SO NO',
        items: [
          {
            sNo: 1,
            secPartNo: 'VRD/PT-6/006',
            designation: 'FILTER ELEMENT',
            au: 'Nos',
            qtyReqd: '200',
            demandNoDate: 'DEM/006 / 20-Jan-2025',
            depotNANoDate: 'DEP/NA/006 / 21-Jan-2025',
            armyHQSrlNo: 'AHQ/SRL/006',
            woNoJobNo: 'WO/2025/006',
            remarks: ''
          }
        ]
      },
      {
        id: 5,
        originatorNo: 'ORG/2025/005',
        date: '24-Jan-2025',
        ossControlNo: 'OSS/005/2025',
        ossDate: '25-Jan-2025',
        status: 'SO Dt',
        items: [
          {
            sNo: 1,
            secPartNo: 'SRD/PT-7/007',
            designation: 'OIL SEAL',
            au: 'Nos',
            qtyReqd: '150',
            demandNoDate: 'DEM/007 / 22-Jan-2025',
            depotNANoDate: 'DEP/NA/007 / 23-Jan-2025',
            armyHQSrlNo: 'AHQ/SRL/007',
            woNoJobNo: 'WO/2025/007',
            remarks: ''
          }
        ]
      },
      {
        id: 6,
        originatorNo: 'ORG/2025/006',
        date: '26-Jan-2025',
        ossControlNo: 'OSS/006/2025',
        ossDate: '27-Jan-2025',
        status: 'PDS',
        items: [
          {
            sNo: 1,
            secPartNo: 'ARD/PT-8/008',
            designation: 'BEARING ASSEMBLY',
            au: 'Nos',
            qtyReqd: '75',
            demandNoDate: 'DEM/008 / 24-Jan-2025',
            depotNANoDate: 'DEP/NA/008 / 25-Jan-2025',
            armyHQSrlNo: 'AHQ/SRL/008',
            woNoJobNo: 'WO/2025/008',
            remarks: ''
          }
        ]
      }
    ];

    const handlePrint = () => {
      window.print();
    };

    if (selectedLpr) {
      return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          <div className="mb-6 flex justify-between items-center print:hidden">
            <button
              onClick={() => setSelectedLpr(null)}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
            >
              Back to List
            </button>
            <button
              onClick={handlePrint}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Print LPR
            </button>
          </div>

          {/* Print Format - Draft LPR */}
          <div className="border-2 border-gray-800 p-8">
            <h3 className="text-2xl font-bold text-center mb-2 underline">DRAFT FORMAT OF LPR</h3>
            <h4 className="text-xl font-bold text-center mb-6 underline">LOCAL PURCHASE REQUISITION</h4>

            <div className="grid grid-cols-3 gap-4 mb-6 text-sm">
              <div>
                <span className="font-semibold">Originator No:</span> <span className="border-b border-gray-400 inline-block min-w-[200px]">{selectedLpr.originatorNo}</span>
              </div>
              <div>
                <span className="font-semibold">Date:</span> <span className="border-b border-gray-400 inline-block min-w-[200px]">{selectedLpr.date}</span>
              </div>
              <div>
                <span className="font-semibold">OSS Control No:</span> <span className="border-b border-gray-400 inline-block min-w-[150px]">{selectedLpr.ossControlNo}</span>
                <span className="ml-4 font-semibold">Date:</span> <span className="border-b border-gray-400 inline-block min-w-[100px]">{selectedLpr.ossDate}</span>
              </div>
            </div>

            <table className="w-full border-2 border-gray-800 text-sm mb-6">
              <thead>
                <tr className="border-2 border-gray-800">
                  <th className="border-2 border-gray-800 px-2 py-2 font-bold">S No</th>
                  <th className="border-2 border-gray-800 px-2 py-2 font-bold">Sec/Part No</th>
                  <th className="border-2 border-gray-800 px-2 py-2 font-bold">Designation</th>
                  <th className="border-2 border-gray-800 px-2 py-2 font-bold">A/U</th>
                  <th className="border-2 border-gray-800 px-2 py-2 font-bold">Qty Reqd</th>
                  <th className="border-2 border-gray-800 px-2 py-2 font-bold">Demand No & Date</th>
                  <th className="border-2 border-gray-800 px-2 py-2 font-bold">Depot NA No & dt</th>
                  <th className="border-2 border-gray-800 px-2 py-2 font-bold">Army HQ Srl No</th>
                  <th className="border-2 border-gray-800 px-2 py-2 font-bold">WO No/Job No</th>
                  <th className="border-2 border-gray-800 px-2 py-2 font-bold">Remarks</th>
                </tr>
              </thead>
              <tbody>
                {selectedLpr.items.map((item: any) => (
                  <tr key={item.sNo} className="border-2 border-gray-800">
                    <td className="border-2 border-gray-800 px-2 py-2 text-center">{item.sNo}</td>
                    <td className="border-2 border-gray-800 px-2 py-2">{item.secPartNo}</td>
                    <td className="border-2 border-gray-800 px-2 py-2">{item.designation}</td>
                    <td className="border-2 border-gray-800 px-2 py-2 text-center">{item.au}</td>
                    <td className="border-2 border-gray-800 px-2 py-2 text-center">{item.qtyReqd}</td>
                    <td className="border-2 border-gray-800 px-2 py-2">{item.demandNoDate}</td>
                    <td className="border-2 border-gray-800 px-2 py-2">{item.depotNANoDate}</td>
                    <td className="border-2 border-gray-800 px-2 py-2">{item.armyHQSrlNo}</td>
                    <td className="border-2 border-gray-800 px-2 py-2">{item.woNoJobNo}</td>
                    <td className="border-2 border-gray-800 px-2 py-2">{item.remarks}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="grid grid-cols-4 gap-8 text-sm mt-8">
              <div className="text-center">
                <div className="font-semibold underline">CP/Chaser</div>
              </div>
              <div className="text-center">
                <div className="font-semibold underline">IC MPO</div>
              </div>
              <div className="text-center">
                <div className="font-semibold underline">DGM (Mtrl)</div>
              </div>
              <div className="text-center">
                <div className="font-semibold underline">GM Wks (Mtrl)</div>
              </div>
            </div>

            <div className="flex justify-end text-sm mt-8">
              <div className="mr-8">
                <span className="font-semibold">OSS</span>
              </div>
              <div>
                <span className="font-semibold">Date</span>
              </div>
            </div>
          </div>
        </div>
      );
    }
  
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">List of LPRs</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-400 px-3 py-2 font-semibold">S.No</th>
                <th className="border border-gray-400 px-3 py-2 font-semibold">Originator No</th>
                <th className="border border-gray-400 px-3 py-2 font-semibold">Date</th>
                <th className="border border-gray-400 px-3 py-2 font-semibold">OSS Control No</th>
                <th className="border border-gray-400 px-3 py-2 font-semibold">Status</th>
                <th className="border border-gray-400 px-3 py-2 font-semibold">View</th>
              </tr>
            </thead>
            <tbody>
              {lprs.map((lpr, index) => (
                <tr key={lpr.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2 text-center">{index + 1}</td>
                  <td className="border border-gray-300 px-3 py-2">{lpr.originatorNo}</td>
                  <td className="border border-gray-300 px-3 py-2">{lpr.date}</td>
                  <td className="border border-gray-300 px-3 py-2">{lpr.ossControlNo}</td>
                  <td className="border border-gray-300 px-3 py-2 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      lpr.status === 'ENQ' ? 'bg-yellow-100 text-yellow-800' :
                      lpr.status === 'CST' ? 'bg-blue-100 text-blue-800' :
                      lpr.status === 'SANC' ? 'bg-purple-100 text-purple-800' :
                      lpr.status === 'SO NO' ? 'bg-green-100 text-green-800' :
                      lpr.status === 'SO Dt' ? 'bg-indigo-100 text-indigo-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {lpr.status}
                    </span>
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-center">
                    <button
                      onClick={() => setSelectedLpr(lpr)}
                      className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm font-semibold"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

export default function LPOLogin() {
  const [selectedSection, setSelectedSection] = useState('lpr-form');
  const navigate = useNavigate();

  return (
    <div>
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">LPO Dashboard</h3>
        {/* Section Selection Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="flex space-x-1 overflow-x-auto">
            <button
              onClick={() => setSelectedSection('lpr-form')}
              className={`px-6 py-3 font-semibold text-sm transition-all whitespace-nowrap ${
                selectedSection === 'lpr-form'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              LPR
            </button>
            <button
              onClick={() => setSelectedSection('lpr-list')}
              className={`px-6 py-3 font-semibold text-sm transition-all whitespace-nowrap ${
                selectedSection === 'lpr-list'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              List of LPR
            </button>
          </nav>
        </div>
      </div>

      {selectedSection === 'lpr-form' && <LprForm />}
      {selectedSection === 'lpr-list' && <LprList />}
    </div>
  );
}
