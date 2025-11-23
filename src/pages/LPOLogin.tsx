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
    
    // Helper function to calculate days between dates
    const calculateDays = (dateString: string): number => {
      // Parse date in format "DD-MMM-YYYY" (e.g., "15-Oct-2025")
      const [day, month, year] = dateString.split('-');
      const monthMap: Record<string, string> = {
        'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04',
        'May': '05', 'Jun': '06', 'Jul': '07', 'Aug': '08',
        'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12'
      };
      const date = new Date(`${year}-${monthMap[month]}-${day}`);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      date.setHours(0, 0, 0, 0);
      const diffTime = today.getTime() - date.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 0;
    };

    // Helper function to calculate days in current state (using status date or OSS date as proxy)
    const calculateDaysInState = (lpr: any): number => {
      // Using statusDate if available, otherwise OSS date as the state entry date
      const stateDate = lpr.statusDate || lpr.ossDate;
      return calculateDays(stateDate);
    };

    // Helper function to check if LPR exceeds 90 days and show alert
    const checkAndAlert = (totalDays: number, originatorNo: string) => {
      if (totalDays > 90) {
        // Store notification for GMWKSLogin to pick up
        const notifications = JSON.parse(localStorage.getItem('lprNotifications') || '[]');
        const existingNotification = notifications.find((n: any) => n.originatorNo === originatorNo);
        if (!existingNotification) {
          notifications.push({
            originatorNo,
            totalDays,
            date: new Date().toISOString()
          });
          localStorage.setItem('lprNotifications', JSON.stringify(notifications));
        }
      }
    };
    
    // Dummy data matching the image format with status entries
    // Most LPRs have dates within last 30-60 days (under 90 days)
    // Only two LPRs have dates older than 90 days
    const lprs = [
      {
        id: 1,
        originatorNo: 'ORG/2025/001',
        date: '15-Aug-2025',
        ossControlNo: 'OSS/001/2025',
        ossDate: '16-Sep-2025',
        status: 'ENQ',
        statusDate: '18-Nov-2025', // Date when status changed to ENQ (about 60 days ago)
        items: [
          {
            sNo: 1,
            secPartNo: 'VRD/PT-2/001',
            designation: 'BOLT ASSEMBLY',
            au: 'Nos',
            qtyReqd: '500',
            demandNoDate: 'DEM/001 / 10-Nov-2025',
            depotNANoDate: 'DEP/NA/001 / 12-Nov-2025',
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
            demandNoDate: 'DEM/002 / 10-Nov-2025',
            depotNANoDate: 'DEP/NA/002 / 12-Nov-2025',
            armyHQSrlNo: 'AHQ/SRL/002',
            woNoJobNo: 'WO/2025/002',
            remarks: ''
          }
        ]
      },
      {
        id: 2,
        originatorNo: 'ORG/2025/002',
        date: '20-Oct-2025',
        ossControlNo: 'OSS/002/2025',
        ossDate: '01-Nov-2025',
        status: 'CST',
        statusDate: '25-Nov-2025', // Date when status changed to CST (about 55 days ago)
        items: [
          {
            sNo: 1,
            secPartNo: 'SRD/PT-3/003',
            designation: 'WATER RADIATOR',
            au: 'Nos',
            qtyReqd: '50',
            demandNoDate: 'DEM/003 / 18-Nov-2025',
            depotNANoDate: 'DEP/NA/003 / 19-Nov-2025',
            armyHQSrlNo: 'AHQ/SRL/003',
            woNoJobNo: 'WO/2025/003',
            remarks: 'Priority'
          }
        ]
      },
      {
        id: 3,
        originatorNo: 'ORG/2025/003',
        date: '05-Nov-2025',
        ossControlNo: 'OSS/003/2025',
        ossDate: '26-Nov-2025',
        status: 'SANC',
        statusDate: '28-Nov-2025', // Date when status changed to SANC (about 52 days ago)
        items: [
          {
            sNo: 1,
            secPartNo: 'ETD/PT-4/004',
            designation: 'GASKET SET',
            au: 'Sets',
            qtyReqd: '100',
            demandNoDate: 'DEM/004 / 23-Nov-2025',
            depotNANoDate: 'DEP/NA/004 / 24-Nov-2025',
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
            demandNoDate: 'DEM/005 / 23-Nov-2025',
            depotNANoDate: 'DEP/NA/005 / 24-Nov-2025',
            armyHQSrlNo: 'AHQ/SRL/005',
            woNoJobNo: 'WO/2025/005',
            remarks: 'Bulk Order'
          }
        ]
      },
      {
        id: 4,
        originatorNo: 'ORG/2025/004',
        date: '01-Sept-2025',
        ossControlNo: 'OSS/004/2025',
        ossDate: '02-Sept-2025',
        status: 'SO NO',
        statusDate: '05-Nov-2025', // Date when status changed to SO NO (about 45 days ago)
        items: [
          {
            sNo: 1,
            secPartNo: 'VRD/PT-6/006',
            designation: 'FILTER ELEMENT',
            au: 'Nos',
            qtyReqd: '200',
            demandNoDate: 'DEM/006 / 28-Nov-2025',
            depotNANoDate: 'DEP/NA/006 / 29-Nov-2025',
            armyHQSrlNo: 'AHQ/SRL/006',
            woNoJobNo: 'WO/2025/006',
            remarks: ''
          }
        ]
      },
      {
        id: 5,
        originatorNo: 'ORG/2025/005',
        date: '05-Dec-2025',
        ossControlNo: 'OSS/005/2025',
        ossDate: '06-Dec-2025',
        status: 'SO Dt',
        statusDate: '10-Dec-2025', // Date when status changed to SO Dt (about 40 days ago)
        items: [
          {
            sNo: 1,
            secPartNo: 'SRD/PT-7/007',
            designation: 'OIL SEAL',
            au: 'Nos',
            qtyReqd: '150',
            demandNoDate: 'DEM/007 / 02-Dec-2025',
            depotNANoDate: 'DEP/NA/007 / 03-Dec-2025',
            armyHQSrlNo: 'AHQ/SRL/007',
            woNoJobNo: 'WO/2025/007',
            remarks: ''
          }
        ]
      },
      {
        id: 6,
        originatorNo: 'ORG/2025/006',
        date: '10-Dec-2025',
        ossControlNo: 'OSS/006/2025',
        ossDate: '11-Dec-2025',
        status: 'PDS',
        statusDate: '15-Dec-2025', // Date when status changed to PDS (about 35 days ago)
        items: [
          {
            sNo: 1,
            secPartNo: 'ARD/PT-8/008',
            designation: 'BEARING ASSEMBLY',
            au: 'Nos',
            qtyReqd: '75',
            demandNoDate: 'DEM/008 / 08-Dec-2025',
            depotNANoDate: 'DEP/NA/008 / 09-Dec-2025',
            armyHQSrlNo: 'AHQ/SRL/008',
            woNoJobNo: 'WO/2025/008',
            remarks: ''
          }
        ]
      },
      {
        id: 7,
        originatorNo: 'ORG/2025/095',
        date: '15-Oct-2025',
        ossControlNo: 'OSS/095/2025',
        ossDate: '16-Oct-2025',
        status: 'CST',
        statusDate: '20-Oct-2025', // Date when status changed to CST (about 95 days ago - OVER 90)
        items: [
          {
            sNo: 1,
            secPartNo: 'VRD/PT-9/009',
            designation: 'CRITICAL COMPONENT DELAYED',
            au: 'Nos',
            qtyReqd: '25',
            demandNoDate: 'DEM/009 / 10-Oct-2025',
            depotNANoDate: 'DEP/NA/009 / 12-Oct-2025',
            armyHQSrlNo: 'AHQ/SRL/009',
            woNoJobNo: 'WO/2025/009',
            remarks: 'Exceeds 90 days - Urgent Action Required'
          }
        ]
      },
      {
        id: 8,
        originatorNo: 'ORG/2025/098',
        date: '10-Oct-2025',
        ossControlNo: 'OSS/098/2025',
        ossDate: '11-Oct-2025',
        status: 'SANC',
        statusDate: '15-Oct-2025', // Date when status changed to SANC (about 100 days ago - OVER 90)
        items: [
          {
            sNo: 1,
            secPartNo: 'ETD/PT-10/010',
            designation: 'OVERDUE COMPONENT',
            au: 'Nos',
            qtyReqd: '30',
            demandNoDate: 'DEM/010 / 05-Oct-2025',
            depotNANoDate: 'DEP/NA/010 / 07-Oct-2025',
            armyHQSrlNo: 'AHQ/SRL/010',
            woNoJobNo: 'WO/2025/010',
            remarks: 'Exceeds 90 days - Requires Immediate Attention'
          }
        ]
      }
    ];

    // Calculate days for each LPR and check for alerts
    const lprsWithDays = lprs.map(lpr => {
      const totalDays = calculateDays(lpr.date);
      const daysInState = calculateDaysInState(lpr);
      checkAndAlert(totalDays, lpr.originatorNo);
      return {
        ...lpr,
        totalDays,
        daysInState
      };
    });

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

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-semibold mb-1">Total LPRs</p>
                <p className="text-3xl font-bold">{lprsWithDays.length}</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-full p-3">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 text-sm font-semibold mb-1">Overdue (&gt;90 days)</p>
                <p className="text-3xl font-bold">{lprsWithDays.filter(l => l.totalDays > 90).length}</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-full p-3">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-semibold mb-1">Active LPRs</p>
                <p className="text-3xl font-bold">{lprsWithDays.filter(l => l.totalDays <= 90).length}</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-full p-3">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100 text-sm font-semibold mb-1">Avg Days</p>
                <p className="text-3xl font-bold">{Math.round(lprsWithDays.reduce((sum, l) => sum + l.totalDays, 0) / lprsWithDays.length) || 0}</p>
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
                <th className="border border-gray-400 px-3 py-2 font-semibold">Originator No</th>
                <th className="border border-gray-400 px-3 py-2 font-semibold">Date</th>
                <th className="border border-gray-400 px-3 py-2 font-semibold">OSS Control No</th>
                <th className="border border-gray-400 px-3 py-2 font-semibold">Status</th>
                <th className="border border-gray-400 px-3 py-2 font-semibold">Days in State</th>
                <th className="border border-gray-400 px-3 py-2 font-semibold">Total Days</th>
                <th className="border border-gray-400 px-3 py-2 font-semibold">View</th>
              </tr>
            </thead>
            <tbody>
              {lprsWithDays.map((lpr, index) => {
                const isOverdue = lpr.totalDays > 90;
                return (
                  <tr key={lpr.id} className={`hover:bg-gray-50 ${isOverdue ? 'bg-red-50' : ''}`}>
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
                    <td className="border border-gray-300 px-3 py-2 text-center font-semibold">
                      {lpr.daysInState} days
                    </td>
                    <td className={`border border-gray-300 px-3 py-2 text-center font-semibold ${
                      isOverdue ? 'text-red-600' : ''
                    }`}>
                      {lpr.totalDays} days
                      {isOverdue && (
                        <span className="ml-2 text-red-600" title="LPR exceeds 90 days threshold">
                          ⚠️
                        </span>
                      )}
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-center">
                      <button
                        onClick={() => {
                          if (isOverdue) {
                            alert(`Alert: LPR ${lpr.originatorNo} has been pending for ${lpr.totalDays} days, exceeding the 90-day threshold!`);
                          }
                          setSelectedLpr(lpr);
                        }}
                        className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm font-semibold"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

export default function LPOLogin() {
  const [selectedSection, setSelectedSection] = useState('lpr-form');
  const navigate = useNavigate();
  const [showImportModal, setShowImportModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleImport = () => {
    if (selectedFile) {
      console.log('Importing file:', selectedFile.name);
      alert(`File "${selectedFile.name}" imported successfully!`);
      setSelectedFile(null);
      setShowImportModal(false);
    }
  };

  const handleCancelImport = () => {
    setSelectedFile(null);
    setShowImportModal(false);
  };

  return (
    <div>
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-6">
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors"
              >
                Import
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedSection === 'lpr-form' && (
        <div>
          <div className="flex justify-end mb-4">
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
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-semibold mb-1">Total LPRs Created</p>
                  <p className="text-3xl font-bold">45</p>
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
                  <p className="text-3xl font-bold">12</p>
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
                  <p className="text-purple-100 text-sm font-semibold mb-1">Pending Forms</p>
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
          <LprForm />
        </div>
      )}
      {selectedSection === 'lpr-list' && (
        <div>
          <div className="flex justify-end mb-4">
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
          <LprList />
        </div>
      )}
    </div>
  );
}
