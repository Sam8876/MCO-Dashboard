import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginForm from '../LoginForm'

export default function GMWKSLogin() {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [selectedCard, setSelectedCard] = useState<string | null>(null)
  const [selectedYear, setSelectedYear] = useState<string>('PY-2024-25')

  if (!isLoggedIn) {
    return (
      <LoginForm
        title="GM WKS (MTRL)"
        subtitle="General Manager Workshop Material Dashboard"
        onLoginSuccess={() => setIsLoggedIn(true)}
      />
    )
  }

  const cards = [
    { id: 'target', title: 'Target', description: 'View production targets and goals', color: 'bg-blue-500' },
    { id: 'ct-issue', title: 'CT Issue', description: 'Component tracking and issue management', color: 'bg-green-500' },
    { id: 'critical-items', title: 'Critical Items', description: 'Monitor critical inventory items', color: 'bg-red-500' },
    { id: 'lm-completed', title: 'LM Status', description: 'Local Manufacture status', color: 'bg-purple-500' },
    { id: 'lp-completed', title: 'LP Status', description: 'Local Purchase status', color: 'bg-indigo-500' },
    { id: 'fund-state', title: 'Fund State', description: 'Current fund allocation and status', color: 'bg-yellow-500' },
    { id: 'daily-output', title: 'Daily Output', description: 'Track daily production output', color: 'bg-teal-500' },
    { id: 'equipments-collected', title: "Equipment's Collected", description: 'Equipment collection tracking', color: 'bg-orange-500' },
    { id: 'dr-summary', title: 'DR Summary', description: 'Defect Report summary and analysis', color: 'bg-pink-500' },
    { id: 'ifa-cases', title: 'IFA Cases', description: 'Issue For Acknowledgement cases', color: 'bg-cyan-500' }
  ]

  const handleAccess = (cardId: string) => {
    setSelectedCard(cardId)
  }

  const handleBack = () => {
    setSelectedCard(null)
  }

  if (selectedCard) {
    // CT Issue Data
    const ctIssueData = [
      { serNo: 1, ohsSerNo: 1, compNo: 6435, mtrlNo: 10234632, cosSection: 'LV2/ICVS', partNo: '5330-390235 (675-10-29-01)', nomenclature: 'SEAL PLAIN (CUP)', noOff: 1, scale: 80, reqdQty: '', issueQty: '' },
      { serNo: 2, ohsSerNo: 2, compNo: 25189, mtrlNo: 10264521, cosSection: 'LV2/ICVS', partNo: '5330-390228 (675-10-20-03)', nomenclature: 'RETAINER PACKING', noOff: 1, scale: 80, reqdQty: '', issueQty: '' },
      { serNo: 3, ohsSerNo: 3, compNo: 6432, mtrlNo: 10257575, cosSection: 'LV2/ICVS', partNo: '4730-079089 (675-10-27)', nomenclature: 'ADAPTOR BUSHING', noOff: 1, scale: 50, reqdQty: '', issueQty: '' },
      { serNo: 4, ohsSerNo: 4, compNo: 6423, mtrlNo: 10255675, cosSection: 'LV2/ICVS', partNo: '5331-002747 (675-10-19) (5331720323423)', nomenclature: "'O' RING", noOff: 1, scale: 80, reqdQty: '', issueQty: '' },
      { serNo: 5, ohsSerNo: 5, compNo: 6431, mtrlNo: 10264534, cosSection: 'LV2/ICVS', partNo: '5330-390184 (675-10-26-01)', nomenclature: 'GASKET', noOff: 2, scale: 160, reqdQty: '', issueQty: '' }
    ];

    // Critical Items Data
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

    // LM Completed Data
    const lmCompletedData = [
      { serial: 1, workOrderNumber: 'WO/2024/001', manHoursCount: 450, progressStatus: 'Completed' },
      { serial: 2, workOrderNumber: 'WO/2024/002', manHoursCount: 320, progressStatus: 'In Progress' },
      { serial: 3, workOrderNumber: 'WO/2024/003', manHoursCount: 580, progressStatus: 'Completed' },
      { serial: 4, workOrderNumber: 'WO/2024/004', manHoursCount: 410, progressStatus: 'Held Up' },
      { serial: 5, workOrderNumber: 'WO/2024/005', manHoursCount: 390, progressStatus: 'Overdue' },
      { serial: 6, workOrderNumber: 'WO/2024/006', manHoursCount: 670, progressStatus: 'Completed' },
      { serial: 7, workOrderNumber: 'WO/2024/007', manHoursCount: 290, progressStatus: 'In Progress' },
      { serial: 8, workOrderNumber: 'WO/2024/008', manHoursCount: 520, progressStatus: 'Overdue' },
      { serial: 9, workOrderNumber: 'WO/2024/009', manHoursCount: 480, progressStatus: 'Completed' },
      { serial: 10, workOrderNumber: 'WO/2024/010', manHoursCount: 350, progressStatus: 'Held Up' },
      { serial: 11, workOrderNumber: 'WO/2024/011', manHoursCount: 430, progressStatus: 'In Progress' },
      { serial: 12, workOrderNumber: 'WO/2024/012', manHoursCount: 560, progressStatus: 'Completed' }
    ];

    // Pie Chart Data for LM Completed
    const pieChartData = [
      { status: 'Completed', count: 5, color: 'bg-green-500', percentage: 41.67, reasons: [] },
      { status: 'In Progress', count: 3, color: 'bg-blue-500', percentage: 25, reasons: [] },
      { status: 'Held Up', count: 2, color: 'bg-yellow-500', percentage: 16.67, reasons: ['Material shortage', 'Equipment breakdown'] },
      { status: 'Overdue', count: 2, color: 'bg-red-500', percentage: 16.67, reasons: ['Labor unavailability', 'Technical delays'] }
    ];

    // LP Completed Data
    const lpCompletedData = [
      { serial: 1, supplyOrderNo: 'SO/2024/001', vendor: 'ABC Engineering Ltd', vendorContact: '+91-9876543210', component: 'Hydraulic Pump', cost: 45000, lpr: 'LPR/2024/001', progressStatus: 'Completed', previousCost: 42000 },
      { serial: 2, supplyOrderNo: 'SO/2024/002', vendor: 'XYZ Industries', vendorContact: '+91-9876543211', component: 'Gasket Set', cost: 8500, lpr: 'LPR/2024/002', progressStatus: 'In Progress', previousCost: 8000 },
      { serial: 3, supplyOrderNo: 'SO/2024/003', vendor: 'Precision Parts Co', vendorContact: '+91-9876543212', component: 'Brake Assembly', cost: 32000, lpr: 'LPR/2024/003', progressStatus: 'Completed', previousCost: 30000 },
      { serial: 4, supplyOrderNo: 'SO/2024/004', vendor: 'ABC Engineering Ltd', vendorContact: '+91-9876543210', component: 'Oil Filter', cost: 1200, lpr: 'LPR/2024/004', progressStatus: 'Pending', previousCost: 1100 },
      { serial: 5, supplyOrderNo: 'SO/2024/005', vendor: 'Metro Supplies', vendorContact: '+91-9876543213', component: 'Clutch Plate', cost: 18000, lpr: 'LPR/2024/005', progressStatus: 'In Progress', previousCost: 17500 },
      { serial: 6, supplyOrderNo: 'SO/2024/006', vendor: 'XYZ Industries', vendorContact: '+91-9876543211', component: 'Radiator Core', cost: 25000, lpr: 'LPR/2024/006', progressStatus: 'Completed', previousCost: 24000 },
      { serial: 7, supplyOrderNo: 'SO/2024/007', vendor: 'TechnoMech Solutions', vendorContact: '+91-9876543214', component: 'Fuel Pump', cost: 72000, lpr: 'LPR/2024/007', progressStatus: 'Held Up', previousCost: 45000 },
      { serial: 8, supplyOrderNo: 'SO/2024/008', vendor: 'Precision Parts Co', vendorContact: '+91-9876543212', component: 'Alternator', cost: 15000, lpr: 'LPR/2024/008', progressStatus: 'Completed', previousCost: 14500 },
      { serial: 9, supplyOrderNo: 'SO/2024/009', vendor: 'ABC Engineering Ltd', vendorContact: '+91-9876543210', component: 'Steering Box', cost: 38000, lpr: 'LPR/2024/009', progressStatus: 'In Progress', previousCost: 36000 },
      { serial: 10, supplyOrderNo: 'SO/2024/010', vendor: 'Metro Supplies', vendorContact: '+91-9876543213', component: 'Water Pump', cost: 9500, lpr: 'LPR/2024/010', progressStatus: 'Completed', previousCost: 9000 },
      { serial: 11, supplyOrderNo: 'SO/2024/011', vendor: 'Elite Parts Inc', vendorContact: '+91-9876543215', component: 'Suspension Spring', cost: 84000, lpr: 'LPR/2024/011', progressStatus: 'Pending', previousCost: 52000 },
      { serial: 12, supplyOrderNo: 'SO/2024/012', vendor: 'XYZ Industries', vendorContact: '+91-9876543211', component: 'Transmission Gear', cost: 56000, lpr: 'LPR/2024/012', progressStatus: 'Completed', previousCost: 54000 }
    ];

    // Detect price spikes over 50%
    const priceAlerts = lpCompletedData.filter(item => {
      const priceIncrease = ((item.cost - item.previousCost) / item.previousCost) * 100;
      return priceIncrease > 50;
    });

    // Vendor Distribution
    const vendorCounts = lpCompletedData.reduce((acc: any, item) => {
      acc[item.vendor] = (acc[item.vendor] || 0) + 1;
      return acc;
    }, {});

    const vendorPieData = Object.entries(vendorCounts).map(([vendor, count]: [string, any]) => ({
      vendor,
      count,
      percentage: (count / lpCompletedData.length) * 100
    }));

    // Progress Status Distribution
    const statusCounts = lpCompletedData.reduce((acc: any, item) => {
      acc[item.progressStatus] = (acc[item.progressStatus] || 0) + 1;
      return acc;
    }, {});

    const statusPieData = Object.entries(statusCounts).map(([status, count]: [string, any]) => ({
      status,
      count,
      percentage: (count / lpCompletedData.length) * 100
    }));

    // Price Comparison Data
    const priceComparisonData = lpCompletedData.slice(0, 6).map(item => ({
      component: item.component,
      previousCost: item.previousCost,
      currentCost: item.cost
    }));

    // Fund State Data
    const totalBudget = 50000000; // ₹5 Crore
    const usedFunds = 32500000; // ₹3.25 Crore
    const remainingFunds = totalBudget - usedFunds;
    const usedPercentage = (usedFunds / totalBudget) * 100;
    const remainingPercentage = (remainingFunds / totalBudget) * 100;

    // Section-wise fund usage
    const sectionFundData = [
      { section: 'VRD', amount: 8500000, color: 'bg-blue-500' },
      { section: 'ARD', amount: 6200000, color: 'bg-green-500' },
      { section: 'SRD', amount: 5800000, color: 'bg-purple-500' },
      { section: 'ETD', amount: 4900000, color: 'bg-orange-500' },
      { section: 'TAR', amount: 3600000, color: 'bg-pink-500' },
      { section: 'Others', amount: 3500000, color: 'bg-cyan-500' }
    ];

    const maxAmount = Math.max(...sectionFundData.map(s => s.amount));

    // Daily Output Data
    const dailyOutputData = [
      { label: 'Today', value: 45, target: 50, color: 'bg-blue-500' },
      { label: 'Yesterday', value: 52, target: 50, color: 'bg-green-500' },
      { label: 'Avg Last Week', value: 48, target: 50, color: 'bg-purple-500' },
      { label: 'Avg Last Month', value: 46, target: 50, color: 'bg-orange-500' }
    ];

    const maxOutput = Math.max(...dailyOutputData.map(d => Math.max(d.value, d.target)));

    // Equipment Collected Data
    const equipmentCollectedData = [
      { serial: 1, equipment: 'Hydraulic Pump Assembly', vendor: 'ABC Engineering Ltd', orderDate: '2024-01-15', expectedDelivery: '2024-02-15', actualDelivery: '2024-02-12', status: 'Delivered', daysToDeliver: 28 },
      { serial: 2, equipment: 'Engine Gasket Set', vendor: 'XYZ Industries', orderDate: '2024-01-20', expectedDelivery: '2024-02-20', actualDelivery: '2024-02-18', status: 'Delivered', daysToDeliver: 29 },
      { serial: 3, equipment: 'Brake Pad Assembly', vendor: 'Precision Parts Co', orderDate: '2024-01-25', expectedDelivery: '2024-02-25', actualDelivery: null, status: 'Pending', daysToDeliver: null },
      { serial: 4, equipment: 'Oil Filter Element', vendor: 'ABC Engineering Ltd', orderDate: '2024-02-01', expectedDelivery: '2024-02-15', actualDelivery: '2024-02-20', status: 'Delivered', daysToDeliver: 19 },
      { serial: 5, equipment: 'Clutch Plate Set', vendor: 'Metro Supplies', orderDate: '2024-02-05', expectedDelivery: '2024-03-05', actualDelivery: '2024-03-01', status: 'Delivered', daysToDeliver: 25 },
      { serial: 6, equipment: 'Radiator Core', vendor: 'XYZ Industries', orderDate: '2024-02-10', expectedDelivery: '2024-03-10', actualDelivery: '2024-03-08', status: 'Delivered', daysToDeliver: 27 },
      { serial: 7, equipment: 'Fuel Injection Pump', vendor: 'TechnoMech Solutions', orderDate: '2024-02-15', expectedDelivery: '2024-03-15', actualDelivery: null, status: 'Pending', daysToDeliver: null },
      { serial: 8, equipment: 'Alternator Assembly', vendor: 'Precision Parts Co', orderDate: '2024-02-20', expectedDelivery: '2024-03-20', actualDelivery: '2024-03-15', status: 'Delivered', daysToDeliver: 24 },
      { serial: 9, equipment: 'Steering Box Assembly', vendor: 'ABC Engineering Ltd', orderDate: '2024-02-25', expectedDelivery: '2024-03-25', actualDelivery: '2024-03-22', status: 'Delivered', daysToDeliver: 26 },
      { serial: 10, equipment: 'Water Pump', vendor: 'Elite Parts Inc', orderDate: '2024-03-01', expectedDelivery: '2024-03-31', actualDelivery: null, status: 'Pending', daysToDeliver: null },
      { serial: 11, equipment: 'Suspension Spring', vendor: 'Metro Supplies', orderDate: '2024-03-05', expectedDelivery: '2024-04-05', actualDelivery: '2024-04-02', status: 'Delivered', daysToDeliver: 28 },
      { serial: 12, equipment: 'Transmission Gear Set', vendor: 'XYZ Industries', orderDate: '2024-03-10', expectedDelivery: '2024-04-10', actualDelivery: '2024-04-05', status: 'Delivered', daysToDeliver: 26 },
      { serial: 13, equipment: 'Battery Charger', vendor: 'ABC Engineering Ltd', orderDate: '2024-03-15', expectedDelivery: '2024-04-15', actualDelivery: '2024-04-10', status: 'Delivered', daysToDeliver: 26 },
      { serial: 14, equipment: 'Cooling Fan', vendor: 'Precision Parts Co', orderDate: '2024-03-20', expectedDelivery: '2024-04-20', actualDelivery: null, status: 'Pending', daysToDeliver: null },
      { serial: 15, equipment: 'Exhaust System', vendor: 'TechnoMech Solutions', orderDate: '2024-03-25', expectedDelivery: '2024-04-25', actualDelivery: '2024-04-30', status: 'Delivered', daysToDeliver: 36 }
    ];

    // Calculate delivery statistics
    const deliveredCount = equipmentCollectedData.filter(item => item.status === 'Delivered').length;
    const pendingCount = equipmentCollectedData.filter(item => item.status === 'Pending').length;

    // Calculate unique vendors who have delivered vs left to deliver
    const vendorsDelivered = new Set(
      equipmentCollectedData
        .filter(item => item.status === 'Delivered')
        .map(item => item.vendor)
    );
    const vendorsPending = new Set(
      equipmentCollectedData
        .filter(item => item.status === 'Pending')
        .map(item => item.vendor)
    );
    // Vendors who have delivered (may also have pending items)
    const vendorsWithDeliveries = vendorsDelivered.size;
    // Vendors who only have pending items (haven't delivered anything yet)
    const vendorsOnlyPending = Array.from(vendorsPending).filter(v => !vendorsDelivered.has(v)).length;

    // Calculate on-time deliveries per vendor
    const vendorOnTimeCount: Record<string, number> = {};
    equipmentCollectedData.forEach(item => {
      if (item.status === 'Delivered' && item.actualDelivery && item.expectedDelivery) {
        const actualDate = new Date(item.actualDelivery);
        const expectedDate = new Date(item.expectedDelivery);
        if (actualDate <= expectedDate) {
          vendorOnTimeCount[item.vendor] = (vendorOnTimeCount[item.vendor] || 0) + 1;
        }
      }
    });

    // Calculate average days to deliver per vendor
    const vendorDeliveryDays: Record<string, { totalDays: number, count: number }> = {};
    equipmentCollectedData.forEach(item => {
      if (item.status === 'Delivered' && item.daysToDeliver !== null) {
        if (!vendorDeliveryDays[item.vendor]) {
          vendorDeliveryDays[item.vendor] = { totalDays: 0, count: 0 };
        }
        vendorDeliveryDays[item.vendor].totalDays += item.daysToDeliver;
        vendorDeliveryDays[item.vendor].count += 1;
      }
    });

    const vendorAvgDays = Object.entries(vendorDeliveryDays).map(([vendor, data]) => ({
      vendor,
      avgDays: Math.round(data.totalDays / data.count)
    }));

    const maxAvgDays = Math.max(...vendorAvgDays.map(v => v.avgDays), 1);
    const maxOnTimeCount = Math.max(...Object.values(vendorOnTimeCount), 1);

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-8">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={handleBack}
            className="mb-6 px-6 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition"
          >
            ← Back to Dashboard
          </button>
          
          {selectedCard === 'target' ? (
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
                <select
                  id="year-select"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full md:w-64 px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm font-semibold"
                >
                  <option value="PY-2023-24">PY-2023-24</option>
                  <option value="PY-2024-25">PY-2024-25</option>
                  <option value="PY-2025-26">PY-2025-26</option>
                  <option value="PY-2026-27">PY-2026-27</option>
                </select>
              </div>

              {/* Content based on selected year */}
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
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-lg p-6 shadow-sm">
                            <div className="text-blue-700 text-sm mb-1 font-semibold">CT Issued VEH</div>
                            <div className="text-3xl font-bold text-blue-600">{ctIssuedData.veh.total}</div>
                          </div>
                          <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-lg p-6 shadow-sm">
                            <div className="text-green-700 text-sm mb-1 font-semibold">CT Issued ENG</div>
                            <div className="text-3xl font-bold text-green-600">{ctIssuedData.eng.total}</div>
                          </div>
                          <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 rounded-lg p-6 shadow-sm">
                            <div className="text-purple-700 text-sm mb-1 font-semibold">Target VEH</div>
                            <div className="text-3xl font-bold text-purple-600">{targetData.veh.ohI.bmpII + targetData.veh.ohI.iik + targetData.veh.ohII + targetData.veh.cmt + targetData.veh.vt72b}</div>
                          </div>
                          <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200 rounded-lg p-6 shadow-sm">
                            <div className="text-orange-700 text-sm mb-1 font-semibold">Target ENG</div>
                            <div className="text-3xl font-bold text-orange-600">{targetData.eng.utd20 + targetData.eng.slk}</div>
                          </div>
                        </div>

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

                        {/* Graph: CT Issued vs Output */}
                        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                          <h3 className="text-2xl font-bold text-gray-900 mb-6">CT Issued vs Output vs Target - VEH</h3>
                          <div className="flex items-end justify-around h-96 border-l-2 border-b-2 border-gray-400 pl-4 pb-4">
                            <div className="flex flex-col items-center gap-2">
                              <div
                                className="w-24 bg-gradient-to-t from-blue-600 to-blue-400 flex items-start justify-center text-white font-bold text-sm pt-2 rounded-t-lg"
                                style={{ height: `${(ctIssuedData.veh.total / 250) * 350}px`, minHeight: '30px' }}
                              >
                                {ctIssuedData.veh.total}
                              </div>
                              <span className="text-sm font-semibold text-gray-700 mt-2 text-center">CT Issued</span>
                            </div>
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
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-lg p-6 shadow-sm">
                            <div className="text-blue-700 text-sm mb-1 font-semibold">Target VEH</div>
                            <div className="text-3xl font-bold text-blue-600">{targetData.veh.ohI.bmpII + targetData.veh.ohII.bmpII + targetData.veh.cmt + targetData.veh.vt72b + targetData.veh.gun30mm}</div>
                          </div>
                          <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-lg p-6 shadow-sm">
                            <div className="text-green-700 text-sm mb-1 font-semibold">Target ENG</div>
                            <div className="text-3xl font-bold text-green-600">{targetData.eng.utd20 + targetData.eng.baz + targetData.eng.slk}</div>
                          </div>
                          <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 rounded-lg p-6 shadow-sm">
                            <div className="text-purple-700 text-sm mb-1 font-semibold">CT Issued VEH</div>
                            <div className="text-3xl font-bold text-purple-600">{ctIssuedData.veh.cfCt.total + 55}</div>
                          </div>
                          <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200 rounded-lg p-6 shadow-sm">
                            <div className="text-orange-700 text-sm mb-1 font-semibold">CT Issued ENG</div>
                            <div className="text-3xl font-bold text-orange-600">{ctIssuedData.eng.cfCt.utd20 + ctIssuedData.eng.freshCt.utd20 + ctIssuedData.eng.freshCt.baz}</div>
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

                        {/* Graph: Target vs CT Issued */}
                        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                          <h3 className="text-2xl font-bold text-gray-900 mb-6">Target vs CT Issued - VEH</h3>
                          <div className="flex items-end justify-around h-96 border-l-2 border-b-2 border-gray-400 pl-4 pb-4">
                            <div className="flex flex-col items-center gap-2">
                              <div
                                className="w-24 bg-gradient-to-t from-purple-600 to-purple-400 flex items-start justify-center text-white font-bold text-sm pt-2 rounded-t-lg"
                                style={{ height: `${((targetData.veh.ohI.bmpII + targetData.veh.ohII.bmpII + targetData.veh.cmt + targetData.veh.vt72b + targetData.veh.gun30mm) / 200) * 350}px`, minHeight: '30px' }}
                              >
                                {targetData.veh.ohI.bmpII + targetData.veh.ohII.bmpII + targetData.veh.cmt + targetData.veh.vt72b + targetData.veh.gun30mm}
                              </div>
                              <span className="text-sm font-semibold text-gray-700 mt-2 text-center">Target</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                              <div
                                className="w-24 bg-gradient-to-t from-blue-600 to-blue-400 flex items-start justify-center text-white font-bold text-sm pt-2 rounded-t-lg"
                                style={{ height: `${((ctIssuedData.veh.cfCt.total + 55) / 200) * 350}px`, minHeight: '30px' }}
                              >
                                {ctIssuedData.veh.cfCt.total + 55}
                              </div>
                              <span className="text-sm font-semibold text-gray-700 mt-2 text-center">CT Issued</span>
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
          ) : selectedCard === 'ct-issue' ? (
            <div className="space-y-8">
              {/* Table Section */}
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
            </div>
          ) : selectedCard === 'critical-items' ? (
            <div className="space-y-8">
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
          ) : selectedCard === 'lm-completed' ? (
            <div className="space-y-8">
              {/* Table Section */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">LM Completed - Work Orders Status</h2>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="border border-gray-400 px-4 py-3 font-semibold text-left">Serial Number</th>
                        <th className="border border-gray-400 px-4 py-3 font-semibold text-left">Work Order Number</th>
                        <th className="border border-gray-400 px-4 py-3 font-semibold text-left">Man Hours Count</th>
                        <th className="border border-gray-400 px-4 py-3 font-semibold text-left">Progress Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {lmCompletedData.map((item) => (
                        <tr key={item.serial} className="hover:bg-gray-50">
                          <td className="border border-gray-300 px-4 py-2 text-center">{item.serial}</td>
                          <td className="border border-gray-300 px-4 py-2 font-mono">{item.workOrderNumber}</td>
                          <td className="border border-gray-300 px-4 py-2 text-center font-semibold">{item.manHoursCount}</td>
                          <td className="border border-gray-300 px-4 py-2 text-center">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-bold ${
                                item.progressStatus === 'Completed'
                                  ? 'bg-green-100 text-green-800'
                                  : item.progressStatus === 'In Progress'
                                  ? 'bg-blue-100 text-blue-800'
                                  : item.progressStatus === 'Held Up'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {item.progressStatus}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Pie Chart Section */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Work Orders Distribution</h3>
                <p className="text-gray-600 mb-8 text-sm">Status breakdown of all work orders with reasons for delays</p>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Pie Chart Visualization */}
                  <div className="flex flex-col items-center">
                    <div className="relative w-80 h-80">
                      <svg viewBox="0 0 200 200" className="w-full h-full">
                        {(() => {
                          const colors = ['#22c55e', '#3b82f6', '#eab308', '#ef4444'];
                          const percentages = [41.67, 25, 16.67, 16.67];
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
                          });
                        })()}
                        {/* Center white circle for donut effect */}
                        <circle cx="100" cy="100" r="50" fill="white" />
                      </svg>
                    </div>
                    <div className="mt-6 grid grid-cols-2 gap-4">
                      {pieChartData.map((data) => (
                        <div key={data.status} className="flex items-center gap-2">
                          <div className={`w-4 h-4 ${data.color} rounded`}></div>
                          <div className="text-sm">
                            <span className="font-semibold">{data.status}</span>
                            <span className="text-gray-600 ml-1">({data.count})</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Statistics and Reasons */}
                  <div className="space-y-6">
                    {pieChartData.map((data) => (
                      <div key={data.status} className="border-l-4 border-gray-300 pl-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-bold text-lg">{data.status}</h4>
                          <span className="text-2xl font-bold text-gray-700">{data.count}</span>
                        </div>
                        <div className="mb-2">
                          <div className="flex justify-between text-sm text-gray-600 mb-1">
                            <span>Percentage</span>
                            <span className="font-semibold">{data.percentage.toFixed(2)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${data.color}`}
                              style={{ width: `${data.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                        {data.reasons.length > 0 && (
                          <div className="mt-3">
                            <p className="text-xs font-semibold text-gray-700 mb-1">Reasons:</p>
                            <ul className="text-xs text-gray-600 list-disc list-inside space-y-1">
                              {data.reasons.map((reason, idx) => (
                                <li key={idx}>{reason}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8">
                  <h4 className="font-bold text-lg text-gray-900 mb-4">Summary</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white border-2 border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition">
                      <div className="text-gray-600 text-sm mb-1">Total Work Orders</div>
                      <div className="text-3xl font-bold text-gray-900">12</div>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-lg p-4 shadow-sm hover:shadow-md transition">
                      <div className="text-green-700 text-sm mb-1">Completion Rate</div>
                      <div className="text-3xl font-bold text-green-600">41.67%</div>
                    </div>
                    <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 rounded-lg p-4 shadow-sm hover:shadow-md transition">
                      <div className="text-red-700 text-sm mb-1">Work Orders Needing Attention</div>
                      <div className="text-3xl font-bold text-red-600">4 <span className="text-sm font-normal text-red-500">(Held Up + Overdue)</span></div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-lg p-4 shadow-sm hover:shadow-md transition">
                      <div className="text-blue-700 text-sm mb-1">Active Work Orders</div>
                      <div className="text-3xl font-bold text-blue-600">3</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : selectedCard === 'lp-completed' ? (
            <div className="space-y-8">
              {/* Summary Cards */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-white border-2 border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition">
                    <div className="text-gray-600 text-sm mb-1">Total Supply Orders</div>
                    <div className="text-3xl font-bold text-gray-900">{lpCompletedData.length}</div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-lg p-4 shadow-sm hover:shadow-md transition">
                    <div className="text-blue-700 text-sm mb-1">Active Vendors</div>
                    <div className="text-3xl font-bold text-blue-600">{Object.keys(vendorCounts).length}</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 rounded-lg p-4 shadow-sm hover:shadow-md transition">
                    <div className="text-purple-700 text-sm mb-1">Completion Rate</div>
                    <div className="text-3xl font-bold text-purple-600">
                      {((statusCounts['Completed'] / lpCompletedData.length) * 100).toFixed(0)}%
                    </div>
                  </div>
                </div>
              </div>

              {/* Table Section */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">LP Completed - Supply Orders</h2>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="border border-gray-400 px-3 py-3 font-semibold text-left">S.No</th>
                        <th className="border border-gray-400 px-3 py-3 font-semibold text-left">Supply Order No</th>
                        <th className="border border-gray-400 px-3 py-3 font-semibold text-left">Vendor</th>
                        <th className="border border-gray-400 px-3 py-3 font-semibold text-left">Vendor Contact</th>
                        <th className="border border-gray-400 px-3 py-3 font-semibold text-left">Component</th>
                        <th className="border border-gray-400 px-3 py-3 font-semibold text-left">LPR</th>
                        <th className="border border-gray-400 px-3 py-3 font-semibold text-left">Progress Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {lpCompletedData.map((item) => (
                        <tr key={item.serial} className="hover:bg-gray-50">
                          <td className="border border-gray-300 px-3 py-2 text-center">{item.serial}</td>
                          <td className="border border-gray-300 px-3 py-2 font-mono">{item.supplyOrderNo}</td>
                          <td className="border border-gray-300 px-3 py-2">{item.vendor}</td>
                          <td className="border border-gray-300 px-3 py-2 text-center">{item.vendorContact}</td>
                          <td className="border border-gray-300 px-3 py-2">{item.component}</td>
                          <td className="border border-gray-300 px-3 py-2 font-mono text-center">{item.lpr}</td>
                          <td className="border border-gray-300 px-3 py-2 text-center">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-bold ${
                                item.progressStatus === 'Completed'
                                  ? 'bg-green-100 text-green-800'
                                  : item.progressStatus === 'In Progress'
                                  ? 'bg-blue-100 text-blue-800'
                                  : item.progressStatus === 'Held Up'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              {item.progressStatus}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Vendor Distribution Pie Chart */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Vendor Distribution</h3>
                <p className="text-gray-600 mb-8 text-sm">Supply orders count by vendor</p>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="flex flex-col items-center">
                    <div className="relative w-80 h-80">
                      <svg viewBox="0 0 200 200" className="w-full h-full">
                        {(() => {
                          const colors = ['#3b82f6', '#22c55e', '#eab308', '#ef4444', '#8b5cf6', '#06b6d4'];
                          let currentAngle = 0;
                          
                          return vendorPieData.map((data, index) => {
                            const angle = (data.percentage / 100) * 360;
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
                    <div className="mt-6 grid grid-cols-2 gap-4">
                      {vendorPieData.map((data, index) => {
                        const colors = ['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-red-500', 'bg-purple-500', 'bg-cyan-500'];
                        return (
                          <div key={data.vendor} className="flex items-center gap-2">
                            <div className={`w-4 h-4 ${colors[index % colors.length]} rounded`}></div>
                            <div className="text-sm">
                              <span className="font-semibold">{data.vendor}</span>
                              <span className="text-gray-600 ml-1">({data.count})</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-4">
                    {vendorPieData.map((data, index) => {
                      const colors = ['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-red-500', 'bg-purple-500', 'bg-cyan-500'];
                      return (
                        <div key={data.vendor} className="border-l-4 border-gray-300 pl-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-bold text-lg">{data.vendor}</h4>
                            <span className="text-2xl font-bold text-gray-700">{data.count}</span>
                          </div>
                          <div className="mb-2">
                            <div className="flex justify-between text-sm text-gray-600 mb-1">
                              <span>Percentage</span>
                              <span className="font-semibold">{data.percentage.toFixed(2)}%</span>
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

              {/* Progress Status Pie Chart */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Progress Status Distribution</h3>
                <p className="text-gray-600 mb-8 text-sm">Supply orders by completion status</p>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="flex flex-col items-center">
                    <div className="relative w-80 h-80">
                      <svg viewBox="0 0 200 200" className="w-full h-full">
                        {(() => {
                          const statusColors: Record<string, string> = {
                            'Completed': '#22c55e',
                            'In Progress': '#3b82f6',
                            'Held Up': '#eab308',
                            'Pending': '#9ca3af'
                          };
                          let currentAngle = 0;
                          
                          return statusPieData.map((data, index) => {
                            const angle = (data.percentage / 100) * 360;
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
                                fill={statusColors[data.status] || '#9ca3af'}
                                stroke="white"
                                strokeWidth="2"
                              />
                            );
                          });
                        })()}
                        <circle cx="100" cy="100" r="50" fill="white" />
                      </svg>
                    </div>
                    <div className="mt-6 grid grid-cols-2 gap-4">
                      {statusPieData.map((data) => {
                        const statusColorClasses: Record<string, string> = {
                          'Completed': 'bg-green-500',
                          'In Progress': 'bg-blue-500',
                          'Held Up': 'bg-yellow-500',
                          'Pending': 'bg-gray-400'
                        };
                        return (
                          <div key={data.status} className="flex items-center gap-2">
                            <div className={`w-4 h-4 ${statusColorClasses[data.status]} rounded`}></div>
                            <div className="text-sm">
                              <span className="font-semibold">{data.status}</span>
                              <span className="text-gray-600 ml-1">({data.count})</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-4">
                    {statusPieData.map((data) => {
                      const statusColorClasses: Record<string, string> = {
                        'Completed': 'bg-green-500',
                        'In Progress': 'bg-blue-500',
                        'Held Up': 'bg-yellow-500',
                        'Pending': 'bg-gray-400'
                      };
                      return (
                        <div key={data.status} className="border-l-4 border-gray-300 pl-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-bold text-lg">{data.status}</h4>
                            <span className="text-2xl font-bold text-gray-700">{data.count}</span>
                          </div>
                          <div className="mb-2">
                            <div className="flex justify-between text-sm text-gray-600 mb-1">
                              <span>Percentage</span>
                              <span className="font-semibold">{data.percentage.toFixed(2)}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${statusColorClasses[data.status]}`}
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
            </div>
          ) : selectedCard === 'fund-state' ? (
            <div className="space-y-8">
              {/* Summary Cards */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Fund State Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
                    <div className="text-blue-700 text-sm mb-1 font-semibold">Total Budget</div>
                    <div className="text-3xl font-bold text-blue-600">₹{(totalBudget / 10000000).toFixed(2)} Cr</div>
                  </div>
                  <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
                    <div className="text-red-700 text-sm mb-1 font-semibold">Funds Used</div>
                    <div className="text-3xl font-bold text-red-600">₹{(usedFunds / 10000000).toFixed(2)} Cr</div>
                    <div className="text-sm text-red-500 mt-1">{usedPercentage.toFixed(1)}% utilized</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
                    <div className="text-green-700 text-sm mb-1 font-semibold">Remaining Funds</div>
                    <div className="text-3xl font-bold text-green-600">₹{(remainingFunds / 10000000).toFixed(2)} Cr</div>
                    <div className="text-sm text-green-500 mt-1">{remainingPercentage.toFixed(1)}% available</div>
                  </div>
                </div>
              </div>

              {/* Pie Chart - Fund Utilization */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Fund Utilization</h3>
                <div className="flex flex-col items-center">
                  <div className="relative w-80 h-80">
                    <svg viewBox="0 0 200 200" className="w-full h-full">
                      {(() => {
                        const colors = ['#ef4444', '#22c55e'];
                        const percentages = [usedPercentage, remainingPercentage];
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
                      <div className="w-4 h-4 bg-red-500 rounded"></div>
                      <div className="text-sm font-semibold">Used</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-500 rounded"></div>
                      <div className="text-sm font-semibold">Remaining</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bar Graph - Section-wise Fund Usage */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Section-wise Fund Usage</h3>
                <div className="flex items-end justify-around h-96 border-l-2 border-b-2 border-gray-400 pl-4 pb-4">
                  {sectionFundData.map((data) => (
                    <div key={data.section} className="flex flex-col items-center gap-2">
                      <div
                        className={`w-20 ${data.color} flex items-start justify-center text-white font-bold text-sm pt-2 rounded-t-lg hover:opacity-80 transition-all`}
                        style={{ height: `${(data.amount / maxAmount) * 300}px`, minHeight: '40px' }}
                      >
                        ₹{(data.amount / 1000000).toFixed(1)}M
                      </div>
                      <span className="text-sm font-semibold text-gray-700 mt-2">{data.section}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : selectedCard === 'daily-output' ? (
            <div className="space-y-8">
              {/* Daily Output Cards */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Daily Output Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-lg p-4 shadow-sm hover:shadow-md transition">
                    <div className="text-blue-700 text-sm mb-1 font-semibold">Today's Output</div>
                    <div className="text-3xl font-bold text-blue-600">45</div>
                    <div className="text-xs text-blue-500 mt-1">Target: 50</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-lg p-4 shadow-sm hover:shadow-md transition">
                    <div className="text-green-700 text-sm mb-1 font-semibold">Yesterday</div>
                    <div className="text-3xl font-bold text-green-600">52</div>
                    <div className="text-xs text-green-500 mt-1">Target: 50 ✓</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 rounded-lg p-4 shadow-sm hover:shadow-md transition">
                    <div className="text-purple-700 text-sm mb-1 font-semibold">Avg Last Week</div>
                    <div className="text-3xl font-bold text-purple-600">48</div>
                    <div className="text-xs text-purple-500 mt-1">Target: 50</div>
                  </div>
                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200 rounded-lg p-4 shadow-sm hover:shadow-md transition">
                    <div className="text-orange-700 text-sm mb-1 font-semibold">Avg Last Month</div>
                    <div className="text-3xl font-bold text-orange-600">46</div>
                    <div className="text-xs text-orange-500 mt-1">Target: 50</div>
                  </div>
                </div>
              </div>

              {/* Bar Graph - Output vs Target */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Output Performance Analysis</h3>
                <div className="flex items-end justify-around h-96 border-l-2 border-b-2 border-gray-400 pl-4 pb-4 relative">
                  {/* Target line */}
                  <div 
                    className="absolute left-0 right-0 border-t-2 border-dashed border-red-400"
                    style={{ bottom: `${(50 / maxOutput) * 100}%` }}
                  >
                    <span className="absolute -top-6 right-4 text-sm font-semibold text-red-600">Target: 50</span>
                  </div>

                  {dailyOutputData.map((data, index) => (
                    <div key={index} className="flex flex-col items-center gap-2 z-10">
                      <div
                        className={`w-20 ${data.color} flex items-start justify-center text-white font-bold text-sm pt-2 rounded-t-lg hover:opacity-80 transition-all relative`}
                        style={{ height: `${(data.value / maxOutput) * 350}px`, minHeight: '30px' }}
                      >
                        {data.value}
                      </div>
                      <span className="text-sm font-semibold text-gray-700 mt-2">{data.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : selectedCard === 'equipments-collected' ? (
            <div className="space-y-8">
              {/* Summary Cards */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Equipment Collection Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-lg p-4 shadow-sm hover:shadow-md transition">
                    <div className="text-green-700 text-sm mb-1 font-semibold">Total Equipment</div>
                    <div className="text-3xl font-bold text-green-600">{equipmentCollectedData.length}</div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-lg p-4 shadow-sm hover:shadow-md transition">
                    <div className="text-blue-700 text-sm mb-1 font-semibold">Delivered</div>
                    <div className="text-3xl font-bold text-blue-600">{deliveredCount}</div>
                  </div>
                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200 rounded-lg p-4 shadow-sm hover:shadow-md transition">
                    <div className="text-orange-700 text-sm mb-1 font-semibold">Pending Delivery</div>
                    <div className="text-3xl font-bold text-orange-600">{pendingCount}</div>
                  </div>
                </div>
              </div>

              {/* Chart 1: Pie Chart - Vendors Delivered vs Left to Deliver */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Vendor Delivery Status</h3>
                <p className="text-gray-600 mb-8 text-sm">Distribution of vendors who have delivered goods vs those left to deliver</p>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="flex flex-col items-center">
                    <div className="relative w-80 h-80">
                      <svg viewBox="0 0 200 200" className="w-full h-full">
                        {(() => {
                          const totalVendors = vendorsWithDeliveries + vendorsOnlyPending;
                          const deliveredVendorPercentage = totalVendors > 0 ? (vendorsWithDeliveries / totalVendors) * 100 : 0;
                          const pendingVendorPercentage = totalVendors > 0 ? (vendorsOnlyPending / totalVendors) * 100 : 0;
                          const colors = ['#22c55e', '#f97316'];
                          const percentages = [deliveredVendorPercentage, pendingVendorPercentage];
                          let currentAngle = 0;
                          
                          return percentages.map((percentage, index) => {
                            if (percentage === 0) return null;
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
                          });
                        })()}
                        <circle cx="100" cy="100" r="50" fill="white" />
                        <text x="100" y="95" textAnchor="middle" className="text-2xl font-bold fill-gray-900">
                          {vendorsWithDeliveries + vendorsOnlyPending}
                        </text>
                        <text x="100" y="110" textAnchor="middle" className="text-sm fill-gray-600">
                          Vendors
                        </text>
                      </svg>
                    </div>
                    <div className="mt-6 grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-green-500 rounded"></div>
                        <div className="text-sm">
                          <span className="font-semibold">Delivered</span>
                          <span className="text-gray-600 ml-1">({vendorsWithDeliveries})</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-orange-500 rounded"></div>
                        <div className="text-sm">
                          <span className="font-semibold">Pending</span>
                          <span className="text-gray-600 ml-1">({vendorsOnlyPending})</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="border-l-4 border-green-500 pl-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-lg">Vendors with Deliveries</h4>
                        <span className="text-2xl font-bold text-gray-700">{vendorsWithDeliveries}</span>
                      </div>
                      <div className="mb-2">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>Percentage</span>
                          <span className="font-semibold">
                            {vendorsWithDeliveries + vendorsOnlyPending > 0 
                              ? ((vendorsWithDeliveries / (vendorsWithDeliveries + vendorsOnlyPending)) * 100).toFixed(1)
                              : 0}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="h-2 rounded-full bg-green-500"
                            style={{ 
                              width: `${vendorsWithDeliveries + vendorsOnlyPending > 0 
                                ? (vendorsWithDeliveries / (vendorsWithDeliveries + vendorsOnlyPending)) * 100 
                                : 0}%` 
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="border-l-4 border-orange-500 pl-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-lg">Vendors Pending Only</h4>
                        <span className="text-2xl font-bold text-gray-700">{vendorsOnlyPending}</span>
                      </div>
                      <div className="mb-2">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>Percentage</span>
                          <span className="font-semibold">
                            {vendorsWithDeliveries + vendorsOnlyPending > 0 
                              ? ((vendorsOnlyPending / (vendorsWithDeliveries + vendorsOnlyPending)) * 100).toFixed(1)
                              : 0}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="h-2 rounded-full bg-orange-500"
                            style={{ 
                              width: `${vendorsWithDeliveries + vendorsOnlyPending > 0 
                                ? (vendorsOnlyPending / (vendorsWithDeliveries + vendorsOnlyPending)) * 100 
                                : 0}%` 
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chart 2: Bar Chart - On-Time Deliveries per Vendor */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">On-Time Delivery Performance</h3>
                <p className="text-gray-600 mb-8 text-sm">Number of times each vendor has delivered goods on time</p>
                
                <div className="flex items-end justify-around h-96 border-l-2 border-b-2 border-gray-400 pl-4 pb-4">
                  {Object.entries(vendorOnTimeCount).map(([vendor, count]) => (
                    <div key={vendor} className="flex flex-col items-center gap-2 flex-1 mx-2">
                      <div
                        className="w-full max-w-24 bg-gradient-to-t from-blue-600 to-blue-400 flex items-start justify-center text-white font-bold text-xs pt-2 rounded-t-lg hover:from-blue-700 hover:to-blue-500 transition-all"
                        style={{ height: `${(count / maxOnTimeCount) * 350}px`, minHeight: '30px' }}
                      >
                        {count}
                      </div>
                      <span className="text-xs font-semibold text-gray-700 mt-2 text-center break-words max-w-[100px]">{vendor}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <p className="text-xs text-gray-500">Y-axis: Number of On-Time Deliveries | X-axis: Vendors</p>
                </div>
              </div>

              {/* Chart 3: Bar Chart - Average Days to Deliver per Vendor */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Average Delivery Time by Vendor</h3>
                <p className="text-gray-600 mb-8 text-sm">Average number of days each vendor takes to deliver goods</p>
                
                <div className="flex items-end justify-around h-96 border-l-2 border-b-2 border-gray-400 pl-4 pb-4">
                  {vendorAvgDays.map((data) => (
                    <div key={data.vendor} className="flex flex-col items-center gap-2 flex-1 mx-2">
                      <div
                        className="w-full max-w-24 bg-gradient-to-t from-purple-600 to-purple-400 flex items-start justify-center text-white font-bold text-xs pt-2 rounded-t-lg hover:from-purple-700 hover:to-purple-500 transition-all"
                        style={{ height: `${(data.avgDays / maxAvgDays) * 350}px`, minHeight: '30px' }}
                      >
                        {data.avgDays}
                      </div>
                      <span className="text-xs font-semibold text-gray-700 mt-2 text-center break-words max-w-[100px]">{data.vendor}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <p className="text-xs text-gray-500">Y-axis: Average Days to Deliver | X-axis: Vendors</p>
                </div>
              </div>

              {/* Equipment Collection Table */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Equipment Collection Details</h2>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="border border-gray-400 px-3 py-3 font-semibold text-left">S.No</th>
                        <th className="border border-gray-400 px-3 py-3 font-semibold text-left">Equipment</th>
                        <th className="border border-gray-400 px-3 py-3 font-semibold text-left">Vendor</th>
                        <th className="border border-gray-400 px-3 py-3 font-semibold text-left">Order Date</th>
                        <th className="border border-gray-400 px-3 py-3 font-semibold text-left">Expected Delivery</th>
                        <th className="border border-gray-400 px-3 py-3 font-semibold text-left">Actual Delivery</th>
                        <th className="border border-gray-400 px-3 py-3 font-semibold text-left">Days to Deliver</th>
                        <th className="border border-gray-400 px-3 py-3 font-semibold text-left">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {equipmentCollectedData.map((item) => (
                        <tr key={item.serial} className="hover:bg-gray-50">
                          <td className="border border-gray-300 px-3 py-2 text-center">{item.serial}</td>
                          <td className="border border-gray-300 px-3 py-2">{item.equipment}</td>
                          <td className="border border-gray-300 px-3 py-2">{item.vendor}</td>
                          <td className="border border-gray-300 px-3 py-2 text-center">{new Date(item.orderDate).toLocaleDateString()}</td>
                          <td className="border border-gray-300 px-3 py-2 text-center">{new Date(item.expectedDelivery).toLocaleDateString()}</td>
                          <td className="border border-gray-300 px-3 py-2 text-center">{item.actualDelivery ? new Date(item.actualDelivery).toLocaleDateString() : '-'}</td>
                          <td className="border border-gray-300 px-3 py-2 text-center">{item.daysToDeliver !== null ? `${item.daysToDeliver} days` : '-'}</td>
                          <td className="border border-gray-300 px-3 py-2 text-center">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-bold ${
                                item.status === 'Delivered'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-orange-100 text-orange-800'
                              }`}
                            >
                              {item.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : selectedCard === 'ifa-cases' ? (
            <div className="space-y-8">
              {/* IFA Cases Count */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">IFA Cases</h2>
                {(() => {
                  const ifaCasesData = [
                    { quarter: 'Q1 2024-25', count: 12 },
                    { quarter: 'Q2 2024-25', count: 18 },
                    { quarter: 'Q3 2024-25', count: 15 },
                    { quarter: 'Q4 2024-25', count: 22 }
                  ];

                  const totalIfaCases = ifaCasesData.reduce((sum, item) => sum + item.count, 0);
                  const maxIfaCount = Math.max(...ifaCasesData.map(d => d.count));

                  return (
                    <>
                      {/* Count Card */}
                      <div className="mb-8">
                        <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 border-2 border-cyan-200 rounded-lg p-6 shadow-sm max-w-md">
                          <div className="text-cyan-700 text-sm mb-1 font-semibold">Total IFA Cases</div>
                          <div className="text-4xl font-bold text-cyan-600">{totalIfaCases}</div>
                        </div>
                      </div>

                      {/* Bar Graph - IFA Cases per Quarter */}
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">IFA Cases by Quarter</h3>
                        <div className="flex items-end justify-around h-96 border-l-2 border-b-2 border-gray-400 pl-4 pb-4">
                          {ifaCasesData.map((data) => (
                            <div key={data.quarter} className="flex flex-col items-center gap-2">
                              <div
                                className="w-24 bg-gradient-to-t from-cyan-600 to-cyan-400 flex items-start justify-center text-white font-bold text-sm pt-2 rounded-t-lg hover:from-cyan-700 hover:to-cyan-500 transition-all"
                                style={{ height: `${(data.count / maxIfaCount) * 350}px`, minHeight: '30px' }}
                              >
                                {data.count}
                              </div>
                              <span className="text-sm font-semibold text-gray-700 mt-2 text-center">{data.quarter}</span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-6 text-center">
                          <p className="text-xs text-gray-500">Y-axis: Number of IFA Cases | X-axis: Financial Year Quarters</p>
                        </div>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
          ) : selectedCard === 'dr-summary' ? (
            <div className="space-y-8">
              {/* DR Summary Content */}
              {(() => {
                // Quarterly DR Data
                const quarterlyDrData = [
                  { quarter: 'Q1 2024-25', count: 25 },
                  { quarter: 'Q2 2024-25', count: 32 },
                  { quarter: 'Q3 2024-25', count: 28 },
                  { quarter: 'Q4 2024-25', count: 35 }
                ];

                // Section-wise DR Data
                const sectionDrData = [
                  { section: 'VRD', count: 18, percentage: 15.0 },
                  { section: 'ARD', count: 25, percentage: 20.8 },
                  { section: 'SRD', count: 30, percentage: 25.0 },
                  { section: 'ETD', count: 22, percentage: 18.3 },
                  { section: 'T&R', count: 15, percentage: 12.5 },
                  { section: 'Others', count: 10, percentage: 8.3 }
                ];

                // DR Table Data
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

                // Type of Defect Distribution
                const defectTypeData = [
                  { type: 'Mechanical Failure', count: 45 },
                  { type: 'Material Defect', count: 28 },
                  { type: 'Electrical Issue', count: 22 },
                  { type: 'Wear & Tear', count: 18 },
                  { type: 'Corrosion', count: 7 }
                ];

                const maxQuarterlyCount = Math.max(...quarterlyDrData.map(d => d.count));
                const maxDefectTypeCount = Math.max(...defectTypeData.map(d => d.count));
                const totalDrReports = drTableData.length;
                const totalSectionCount = sectionDrData.reduce((sum, item) => sum + item.count, 0);

                return (
                  <>
                    {/* Graph 1: Defect Reports per Quarter */}
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

                    {/* Pie Chart: Defect Reports by Section */}
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

                    {/* Graph: Types of Defects */}
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

                    {/* DR Progress Table */}
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
          ) : (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 capitalize">
                {cards.find(c => c.id === selectedCard)?.title}
              </h2>
              <p className="text-gray-600 mb-6">
                {cards.find(c => c.id === selectedCard)?.description}
              </p>
              <div className="border-t pt-6">
                <p className="text-gray-500 italic">Content for {cards.find(c => c.id === selectedCard)?.title} will be displayed here.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition flex items-center gap-2"
          >
            <span>←</span> Back to Section Dashboard
          </button>
        </div>

        <header className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">GM WKS (MTRL) Dashboard</h1>
          <p className="text-lg text-gray-600">General Manager Workshop Material - Central Control Panel</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cards.map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className={`${card.color} h-32 rounded-t-xl flex items-center justify-center`}>
                <h3 className="text-2xl font-bold text-white text-center px-4">{card.title}</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-600 text-sm mb-4 h-12">{card.description}</p>
                <button
                  onClick={() => handleAccess(card.id)}
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
  )
}
