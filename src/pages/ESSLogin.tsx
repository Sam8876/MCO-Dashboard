import React, { useState } from 'react';

// Inter Office Note (ION) Display Component
function IonForm() {
  const ionData = {
    referenceNo: '70201/VRD PT-2/TS/2025',
    title: 'INTER OFFICE NOTE (BMP VRD PT-2)',
    subject: 'PROVISION OF FAST MOVING EXPENDABLE STORES FOR REPAIR COMMITMENT',
    period: 'FOR THE MONTH OF NOV TO JAN 2025 (03 MONTHS)',
    date: '31 Oct 2025',
    vehicles: '15 x vehs',
    items: [
      { sNo: '(a)', nomenclature: 'Paint OG', qtyDemanded: '240 Ltr', remarks: '' },
      { sNo: '(b)', nomenclature: 'Paint White', qtyDemanded: '180 Ltr', remarks: '' },
      { sNo: '(c)', nomenclature: 'Paint light gray', qtyDemanded: '180 Ltr', remarks: '' },
      { sNo: '(d)', nomenclature: 'Thinner anti chill', qtyDemanded: '150 Ltr', remarks: '' },
      { sNo: '(e)', nomenclature: 'White cotton tape', qtyDemanded: '6000 Mtr', remarks: '' },
      { sNo: '(f)', nomenclature: 'Paint remover', qtyDemanded: '140 Ltr', remarks: '' },
      { sNo: '(g)', nomenclature: 'Soap liquid', qtyDemanded: '50 Ltr', remarks: '' },
      { sNo: '(h)', nomenclature: 'Glass putty', qtyDemanded: '50 Kg', remarks: '' },
      { sNo: '(i)', nomenclature: 'Fast drying insulation varnish', qtyDemanded: '45 Ltr', remarks: '' },
      { sNo: '(k)', nomenclature: 'Soft sealing wire 0.8mm', qtyDemanded: '50 kg', remarks: '' },
      { sNo: '(l)', nomenclature: 'Elect welding rod 3.15mm armour steel purpose', qtyDemanded: '225 Kg', remarks: '' },
      { sNo: '(m)', nomenclature: 'Elect cutting rod 4mm chamfering & grooving', qtyDemanded: '225 Kg', remarks: '' },
      { sNo: '(n)', nomenclature: 'Zinc oxide power', qtyDemanded: '50 Kg', remarks: '' },
      { sNo: '(o)', nomenclature: 'Gas dissolved Acetylene', qtyDemanded: '112.5 Cubic Mtr', remarks: '' },
      { sNo: '(p)', nomenclature: 'Gas Oxygen', qtyDemanded: '105 Cubic Mtr', remarks: '' },
      { sNo: '(q)', nomenclature: 'Silver paint', qtyDemanded: '80 Ltr', remarks: '' }
    ]
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
      <div className="text-center mb-6">
        <p className="text-sm font-medium text-gray-600 mb-2">{ionData.referenceNo}</p>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{ionData.title}</h3>
        <p className="text-right text-sm text-gray-600 mb-4">{ionData.date}</p>
        <p className="text-sm font-semibold text-gray-800 mb-1">{ionData.subject}</p>
        <p className="text-sm font-semibold text-gray-800 mb-4">{ionData.period}</p>
      </div>

      <div className="mb-6">
        <p className="text-sm text-gray-700 mb-4">
          1. The under mentioned expendable store is urgently reqd to this section for {ionData.vehicles}.
          Therefore, you are requested to provide these items at the earliest :-
        </p>
      </div>
        
      <div className="overflow-x-auto mb-6">
        <table className="w-full border-collapse border-2 border-gray-800">
          <thead>
            <tr className="bg-gray-100">
              <th className="border-2 border-gray-800 px-4 py-2 text-left font-bold">S. No</th>
              <th className="border-2 border-gray-800 px-4 py-2 text-left font-bold">Nomenclature</th>
              <th className="border-2 border-gray-800 px-4 py-2 text-left font-bold">Qty Demanded</th>
              <th className="border-2 border-gray-800 px-4 py-2 text-left font-bold">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {ionData.items.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border-2 border-gray-800 px-4 py-2">{item.sNo}</td>
                <td className="border-2 border-gray-800 px-4 py-2">{item.nomenclature}</td>
                <td className="border-2 border-gray-800 px-4 py-2">{item.qtyDemanded}</td>
                <td className="border-2 border-gray-800 px-4 py-2">{item.remarks || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mb-6">
        <p className="text-sm text-gray-700">2. An early action is requested pl.</p>
      </div>

    </div>
  );
}

// Estimation Sheet (EME) Form Component
function EstimationSheetForm() {
  const sheetData = {
    workOrderNo: '2 CZW WO No. - 2CZW/MR/Auto/03/2025',
    woDate: '24-May-25',
    qty: '40 Nos',
    hqBwgContNo: 'BWG/512/2025',
    section: 'VRD PT-2',
    partNo: '675-33-SB104',
    nomenclature: 'Re-rubberisation of Bogie Wheel',
    indexNo: '947/MISC',
    mainEqpt: 'BMP',
    drgNo: 'DRG-2025-01',
    totalManhrs: '2800 hrs',
    items: [
      {
        serNo: '1.',
        partNoNomenclature: 'LVG/MTB-NIV- Natural Rubber Sheet Grade RMA 1X (Std Pkt Size : 50 Kg)',
        technicalSpec: 'RMA - 1X',
        volumePerPc: '12.000 Kg',
        weightPerPc: '40 Nos',
        totalWeight: '480.000 Kg',
        materialAvailability: 'Available'
      },
      {
        serNo: '2.',
        partNoNomenclature: '1-4 High Cis BR (Std Pkt Size : 35 Kg)',
        technicalSpec: 'BR',
        volumePerPc: '3.000 Kg',
        weightPerPc: '40 Nos',
        totalWeight: '120.000 Kg',
        materialAvailability: 'Available'
      },
      {
        serNo: '3.',
        partNoNomenclature: 'Peptizer A86 - Blend of di (o-benzamidophenyl disulfide, organic metal complexes and in-organic dispersing agent) (Std Pkt Size : 20 Kg)',
        technicalSpec: 'Ash Content : 16-18 % DBD Content : 12-14 Melting Point 50-60',
        volumePerPc: '0.030 Kg',
        weightPerPc: '40 Nos',
        totalWeight: '1.200 Kg',
        materialAvailability: 'Available'
      },
      {
        serNo: '4.',
        partNoNomenclature: 'Zinc Oxide Rubber Grade (Std Pkt Size : 20 Kg)',
        technicalSpec: 'CAS No 1314-13-2',
        volumePerPc: '0.750 Kg',
        weightPerPc: '40 Nos',
        totalWeight: '30.000 Kg',
        materialAvailability: 'Available'
      },
      {
        serNo: '5.',
        partNoNomenclature: 'Stearic Acid Rubber Grade (Std Pkt Size : 50 Kg)',
        technicalSpec: 'CAS No 95 57-11-44',
        volumePerPc: '0.225 Kg',
        weightPerPc: '40 Nos',
        totalWeight: '9.000 Kg',
        materialAvailability: 'Available'
      },
      {
        serNo: '6.',
        partNoNomenclature: 'Carbon Black HAF N 220 (Std Pkt Size : 25 Kg)',
        technicalSpec: 'ASTM D1510, D2414, D3493, D6556, D3265',
        volumePerPc: '10.500 Kg',
        weightPerPc: '40 Nos',
        totalWeight: '420.000 Kg',
        materialAvailability: 'Available'
      },
      {
        serNo: '7.',
        partNoNomenclature: 'Aromatic Oil (Std Pkt Size : 210 Ltr)',
        technicalSpec: 'Flash point-220°C, Viscosity- 20-27, Aniline Point 20-55',
        volumePerPc: '1.050 Ltr',
        weightPerPc: '40 Nos',
        totalWeight: '42.000 Ltr',
        materialAvailability: 'Available'
      },
      {
        serNo: '8.',
        partNoNomenclature: 'TMQ Lanxess (2,4,4-trimethyl-1, 2-dihydroquinoline) (Std Pkt Size : 25 Kg)',
        technicalSpec: 'Softening Point- 90±5, Alkalinity Index 540 ±30, Ash content ≤0.3, Density 1.04',
        volumePerPc: '0.150 Kg',
        weightPerPc: '40 Nos',
        totalWeight: '6.000 Kg',
        materialAvailability: 'Available'
      },
      {
        serNo: '9.',
        partNoNomenclature: 'MBI (2 Mercaptobenzimidazole) (Std Pkt Size : 25 Kg)',
        technicalSpec: 'CAS 583-39-1. Specific Gravity 1.4g/cm³. Melting Point 295°C',
        volumePerPc: '0.075 Kg',
        weightPerPc: '40 Nos',
        totalWeight: '3.000 Kg',
        materialAvailability: 'Available'
      }
    ]
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
      <h3 className="text-xl font-bold text-gray-900 text-center mb-6">Revised Estimate Sheet for Manufacture Jobs IAF (EME) W-61</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 text-sm">
        <div className="lg:col-span-2">
          <p className="font-semibold text-gray-700">Work Order No.:</p>
          <p className="text-gray-900">{sheetData.workOrderNo}</p>
        </div>
        <div>
          <p className="font-semibold text-gray-700">W.O. Date:</p>
          <p className="text-gray-900">{sheetData.woDate}</p>
        </div>
        <div>
          <p className="font-semibold text-gray-700">Qty:</p>
          <p className="text-gray-900">{sheetData.qty}</p>
        </div>
        <div>
          <p className="font-semibold text-gray-700">HQ BWG Cont No.:</p>
          <p className="text-gray-900">{sheetData.hqBwgContNo}</p>
        </div>
        <div>
          <p className="font-semibold text-gray-700">Section:</p>
          <p className="text-gray-900">{sheetData.section}</p>
        </div>
        <div>
          <p className="font-semibold text-gray-700">Part No:</p>
          <p className="text-gray-900">{sheetData.partNo}</p>
        </div>
        <div className="lg:col-span-2">
          <p className="font-semibold text-gray-700">Nomenclature:</p>
          <p className="text-gray-900">{sheetData.nomenclature}</p>
        </div>
        <div>
          <p className="font-semibold text-gray-700">Index No.:</p>
          <p className="text-gray-900">{sheetData.indexNo}</p>
        </div>
        <div>
          <p className="font-semibold text-gray-700">Main Eqpt:</p>
          <p className="text-gray-900">{sheetData.mainEqpt}</p>
        </div>
        <div>
          <p className="font-semibold text-gray-700">Drg. No.:</p>
          <p className="text-gray-900">{sheetData.drgNo}</p>
        </div>
        <div>
          <p className="font-semibold text-gray-700">Total Manhrs:</p>
          <p className="text-gray-900">{sheetData.totalManhrs}</p>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-3">Material Items</h4>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border-2 border-gray-800 text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border-2 border-gray-800 px-2 py-2 text-left font-bold">Ser No</th>
                <th className="border-2 border-gray-800 px-2 py-2 text-left font-bold">Part No. & Nomenclature</th>
                <th className="border-2 border-gray-800 px-2 py-2 text-left font-bold">Technical Specification</th>
                <th className="border-2 border-gray-800 px-2 py-2 text-left font-bold">Volume (Per Pc)</th>
                <th className="border-2 border-gray-800 px-2 py-2 text-left font-bold">Weight (Per Pc)</th>
                <th className="border-2 border-gray-800 px-2 py-2 text-left font-bold">Total Weight</th>
                <th className="border-2 border-gray-800 px-2 py-2 text-left font-bold">Material Availability</th>
              </tr>
            </thead>
            <tbody>
              {sheetData.items.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border-2 border-gray-800 px-2 py-2">{item.serNo}</td>
                  <td className="border-2 border-gray-800 px-2 py-2">{item.partNoNomenclature}</td>
                  <td className="border-2 border-gray-800 px-2 py-2">{item.technicalSpec}</td>
                  <td className="border-2 border-gray-800 px-2 py-2">{item.volumePerPc}</td>
                  <td className="border-2 border-gray-800 px-2 py-2">{item.weightPerPc}</td>
                  <td className="border-2 border-gray-800 px-2 py-2">{item.totalWeight}</td>
                  <td className="border-2 border-gray-800 px-2 py-2">{item.materialAvailability}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

// LPR Form with Consolidated Table View
function LprFormESS() {
  const [showTable, setShowTable] = useState(false);
  const [lpr, setLpr] = useState({
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
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLpr((prevLpr) => ({
      ...prevLpr,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowTable(true);
  };

  const formFields = [
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
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Local Purchase Requisition (LPR)</h3>

      {!showTable ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
            {formFields.map((field) => (
              <div key={field.id} className={field.gridSpan || ''}>
                <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-1">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.id}
                  id={field.id}
                  value={lpr[field.id as keyof typeof lpr]}
                  onChange={handleInputChange}
                  placeholder={field.placeholder || ''}
                  readOnly={field.isReadOnly}
                  className={`w-full px-3 py-2 border rounded-md text-sm ${
                    field.isReadOnly
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500'
                  }`}
                />
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Generate Table
            </button>
          </div>
        </form>
      ) : (
        <div>
          <div className="mb-4">
            <button
              type="button"
              onClick={() => setShowTable(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 text-sm"
            >
              ← Back to Form
            </button>
          </div>

          <div className="overflow-x-auto mb-6">
            <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Field</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Value</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-2 font-medium text-gray-700">LPR No/Originators No</td>
                  <td className="px-4 py-2 text-gray-900">{lpr.lprNo}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium text-gray-700">Date</td>
                  <td className="px-4 py-2 text-gray-900">{lpr.lprDate}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium text-gray-700">OSS Control No</td>
                  <td className="px-4 py-2 text-gray-900">{lpr.ossControlNo}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium text-gray-700">OSS Date</td>
                  <td className="px-4 py-2 text-gray-900">{lpr.ossDate}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium text-gray-700">Demand No & Date</td>
                  <td className="px-4 py-2 text-gray-900">{lpr.demandNoAndDate}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium text-gray-700">Depot NA No & Date</td>
                  <td className="px-4 py-2 text-gray-900">{lpr.depotNaNoAndDate}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium text-gray-700">Army HQ Srl No</td>
                  <td className="px-4 py-2 text-gray-900">{lpr.armyHqSrlNo}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium text-gray-700">WO No / Job No</td>
                  <td className="px-4 py-2 text-gray-900">{lpr.woNo}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium text-gray-700">Sec</td>
                  <td className="px-4 py-2 text-gray-900">{lpr.sec}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium text-gray-700">Part No</td>
                  <td className="px-4 py-2 text-gray-900">{lpr.partNo}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium text-gray-700">OHS (OH-I / OH-II)</td>
                  <td className="px-4 py-2 text-gray-900">{lpr.ohs}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium text-gray-700">Scale (OH-I / OH-II)</td>
                  <td className="px-4 py-2 text-gray-900">{lpr.scale}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium text-gray-700">Nomenclature</td>
                  <td className="px-4 py-2 text-gray-900">{lpr.nomenclature}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium text-gray-700">A/U</td>
                  <td className="px-4 py-2 text-gray-900">{lpr.au}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium text-gray-700">Qty Reqd</td>
                  <td className="px-4 py-2 text-gray-900">{lpr.qtyReqd}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium text-gray-700">Ref (CT No/ION No/WO No etc)</td>
                  <td className="px-4 py-2 text-gray-900">{lpr.ref}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium text-gray-700">Last Purchase Price</td>
                  <td className="px-4 py-2 text-gray-900">{lpr.lastPurchasePrice}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              Export to PDF
            </button>
            <button
              type="button"
              className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Save LPR
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Main ESS Component
export default function ESSLogin() {
  const [selectedSection, setSelectedSection] = useState('ion');

  return (
    <div>
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">ESS Dashboard</h3>
        {/* Section Selection Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="flex space-x-1 overflow-x-auto">
            <button
              onClick={() => setSelectedSection('ion')}
              className={`px-6 py-3 font-semibold text-sm transition-all whitespace-nowrap ${
                selectedSection === 'ion'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Inter Office Note (ION)
            </button>
            <button
              onClick={() => setSelectedSection('estimation-sheet')}
              className={`px-6 py-3 font-semibold text-sm transition-all whitespace-nowrap ${
                selectedSection === 'estimation-sheet'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Estimation Sheet (EME)
            </button>
            <button
              onClick={() => setSelectedSection('lpr')}
              className={`px-6 py-3 font-semibold text-sm transition-all whitespace-nowrap ${
                selectedSection === 'lpr'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Local Purchase Requisition (LPR)
            </button>
          </nav>
        </div>
      </div>

      {selectedSection === 'ion' && <IonForm />}
      {selectedSection === 'estimation-sheet' && <EstimationSheetForm />}
      {selectedSection === 'lpr' && <LprFormESS />}
    </div>
  );
}
