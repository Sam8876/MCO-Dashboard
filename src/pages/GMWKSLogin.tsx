import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface LPRNotification {
  originatorNo?: string
  totalDays?: number
  date: string
  type?: 'lpr' | 'dr-summary'
  section?: string
  message?: string
}

export default function GMWKSLogin() {
  const navigate = useNavigate()
  const [selectedCard, setSelectedCard] = useState<string | null>(null)
  const [selectedYear, setSelectedYear] = useState<string>('PY-2025-26')
  const [lmStatusTab, setLmStatusTab] = useState<'scaled' | 'non-scaled'>('scaled')
  const [lpStatusTab, setLpStatusTab] = useState<'scaled' | 'non-scaled'>('scaled')
  const [criticalItemsActions, setCriticalItemsActions] = useState<Record<number, string>>({});
  const [notificationSent, setNotificationSent] = useState<Record<number, boolean>>({});
  const [lprNotifications, setLprNotifications] = useState<LPRNotification[]>([]);
  const [showNotification, setShowNotification] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ id: number; text: string; sender: 'user' | 'bot'; timestamp: Date }>>([]);
  const [chatInput, setChatInput] = useState('');
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [selectedNotificationSerial, setSelectedNotificationSerial] = useState<number | null>(null);
  const [selectedRecipient, setSelectedRecipient] = useState<string>('');
  const [notificationMessage, setNotificationMessage] = useState<string>('');
  const [showSrdPopup, setShowSrdPopup] = useState(false);
  const [selectedSectionForSrd, setSelectedSectionForSrd] = useState<string>('');

  // Check for LPR notifications on component mount
  useEffect(() => {
    const notifications = JSON.parse(localStorage.getItem('lprNotifications') || '[]');
    // Add dummy DR Summary notification for SRD if not already present
    const hasSrdNotification = notifications.some((n: LPRNotification) => n.type === 'dr-summary' && n.section === 'SRD');
    if (!hasSrdNotification) {
      const srdNotification: LPRNotification = {
        type: 'dr-summary',
        section: 'SRD',
        message: 'High number of defect reports detected in SRD section. Please review DR Summary.',
        date: new Date().toISOString()
      };
      notifications.push(srdNotification);
      localStorage.setItem('lprNotifications', JSON.stringify(notifications));
    }
    if (notifications.length > 0) {
      setLprNotifications(notifications);
      setShowNotification(true);
    }
  }, []);

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
    { id: 'ifa-cases', title: 'IFA Cases', description: 'Issue For Acknowledgement cases', color: 'bg-cyan-500' },
    { id: 'abc-analysis', title: 'ABC Analysis', description: 'ABC Analysis for MT Grant and ORD Grant', color: 'bg-slate-500' },
    { id: 'srb', title: 'SRB', description: 'Spares Requirement Book summary', color: 'bg-rose-500' },
    { id: 'misc', title: 'MISC', description: 'Miscellaneous items and information', color: 'bg-gray-500' }
  ]

  const handleAccess = (cardId: string) => {
    setSelectedCard(cardId)
  }

  const handleBack = () => {
    setSelectedCard(null)
  }

  const handleDismissNotification = (identifier: string) => {
    const updatedNotifications = lprNotifications.filter(n => {
      if (n.type === 'dr-summary') {
        return n.section !== identifier;
      } else {
        return n.originatorNo !== identifier;
      }
    });
    setLprNotifications(updatedNotifications);
    localStorage.setItem('lprNotifications', JSON.stringify(updatedNotifications));
    if (updatedNotifications.length === 0) {
      setShowNotification(false);
    }
  };

  const handleDismissAllNotifications = () => {
    setLprNotifications([]);
    setShowNotification(false);
    localStorage.removeItem('lprNotifications');
  };

  const handleSendMessage = () => {
    if (chatInput.trim() === '') return;

    const userMessage = {
      id: Date.now(),
      text: chatInput,
      sender: 'user' as const,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: "Thank you for your message. I'm here to help you with the GM WKS MTRL dashboard. How can I assist you today?",
        sender: 'bot' as const,
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, botResponse]);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

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

    const handleActionChange = (serial: number, action: string) => {
      setCriticalItemsActions(prev => ({ ...prev, [serial]: action }));
    };

    const handleSendNotification = (serial: number) => {
      const action = criticalItemsActions[serial] || '';
      if (!action.trim()) {
        alert('Please enter action taken before sending notification.');
        return;
      }
      // Open notification modal
      setSelectedNotificationSerial(serial);
      setShowNotificationModal(true);
      setSelectedRecipient('');
      setNotificationMessage('');
    };

    const handleNotificationRecipientSelect = (recipient: string) => {
      setSelectedRecipient(recipient);
    };

    const handleSendNotificationMessage = () => {
      if (!selectedRecipient) {
        alert('Please select a recipient.');
        return;
      }
      if (!notificationMessage.trim()) {
        alert('Please enter a message.');
        return;
      }
      if (selectedNotificationSerial === null) {
        return;
      }

      // Store notification in localStorage for the recipient dashboard
      const notificationData = {
        id: Date.now(),
        from: 'GM WKS MTRL',
        to: selectedRecipient,
        serial: selectedNotificationSerial,
        itemName: criticalItemsData.find(item => item.serial === selectedNotificationSerial)?.nomenclature || '',
        action: criticalItemsActions[selectedNotificationSerial] || '',
        message: notificationMessage,
        timestamp: new Date().toISOString()
      };

      const existingNotifications = JSON.parse(localStorage.getItem(`notifications_${selectedRecipient}`) || '[]');
      existingNotifications.push(notificationData);
      localStorage.setItem(`notifications_${selectedRecipient}`, JSON.stringify(existingNotifications));

      // Mark as sent
      setNotificationSent(prev => ({ ...prev, [selectedNotificationSerial]: true }));
      
      // Close modal
      setShowNotificationModal(false);
      setSelectedNotificationSerial(null);
      setSelectedRecipient('');
      setNotificationMessage('');
      
      alert(`Notification sent to ${selectedRecipient} for item ${selectedNotificationSerial}`);
    };

    const handleCancelNotification = () => {
      setShowNotificationModal(false);
      setSelectedNotificationSerial(null);
      setSelectedRecipient('');
      setNotificationMessage('');
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

    // Fund State Grant Data
    const fundStateGrantData = [
      {
        serNo: 1,
        grantName: 'ORD Grant (415/01)',
        almt202526: 17359000,
        soPlacedGem: 12,
        soPlacedNonGem: 278,
        expdrGem: 713555,
        expdrNonGem: 11060706,
        totalExpdr: 11774261,
        billsSubmitted: 5365263,
        amtBooked: 4493190,
        amtBal: 5584739,
        remarks: ''
      },
      {
        serNo: 2,
        grantName: 'MT Grant (417/07)',
        almt202526: 16252000,
        soPlacedGem: 8,
        soPlacedNonGem: 139,
        expdrGem: 8731713,
        expdrNonGem: 11916599,
        totalExpdr: 20648312,
        billsSubmitted: 7604025,
        amtBooked: 7320152,
        amtBal: -4396312,
        remarks: 'Addl Rs 60 lakhs reqmt already fwd to HQ BWG'
      },
      {
        serNo: 3,
        grantName: 'IR&D Grant (438/00)',
        almt202526: 3500000,
        soPlacedGem: null,
        soPlacedNonGem: 3,
        expdrGem: 0,
        expdrNonGem: 244130,
        totalExpdr: 244130,
        billsSubmitted: 199998,
        amtBooked: null,
        amtBal: 3255870,
        remarks: 'Letter fwd to HQ BWG for surrender of Rs 28.75 Lakhs'
      }
    ];

    // Calculate totals for graph
    const totalAlmt = fundStateGrantData.reduce((sum, g) => sum + g.almt202526, 0);
    const totalExpdr = fundStateGrantData.reduce((sum, g) => sum + g.totalExpdr, 0);
    const maxGrantAmount = Math.max(...fundStateGrantData.map(g => g.almt202526));

    // LPR Data for LM Status (Scaled)
    const lmScaledData = [
      { sec: 'ARD', awtMtrl: 7, can: 3, comp: 5, hold: '', ifaCase: 2, oss: 4, woPlaced: 2, storeRecd: '', grandTotal: 23 },
      { sec: 'ARMT', awtMtrl: 6, can: 2, comp: 2, hold: '', ifaCase: '', oss: '', woPlaced: '', storeRecd: '', grandTotal: 10 },
      { sec: 'ENG', awtMtrl: '', can: 2, comp: 1, hold: 2, ifaCase: 2, oss: '', woPlaced: 1, storeRecd: 2, grandTotal: 10 },
      { sec: 'ETD', awtMtrl: 4, can: 3, comp: '', hold: '', ifaCase: 2, oss: 1, woPlaced: 1, storeRecd: '', grandTotal: 11 },
      { sec: 'INST', awtMtrl: '', can: 1, comp: 1, hold: 1, ifaCase: '', oss: '', woPlaced: 1, storeRecd: 1, grandTotal: 5 },
      { sec: 'SRD', awtMtrl: 1, can: 1, comp: 2, hold: '', ifaCase: '', oss: 7, woPlaced: 3, storeRecd: '', grandTotal: 14 },
      { sec: 'T&R', awtMtrl: 2, can: '', comp: 1, hold: '', ifaCase: '', oss: 9, woPlaced: '', storeRecd: '', grandTotal: 12 },
      { sec: 'VRD', awtMtrl: 1, can: 1, comp: 3, hold: '', ifaCase: 1, oss: 1, woPlaced: 5, storeRecd: '', grandTotal: 12 }
    ];

    // LPR Data for LM Status (Non-Scaled)
    const lmNonScaledData = [
      { sec: 'ARD', awtMtrl: 3, can: 1, comp: 2, hold: 1, ifaCase: 1, oss: 2, woPlaced: 1, storeRecd: '', grandTotal: 11 },
      { sec: 'ARMT', awtMtrl: 2, can: 1, comp: 1, hold: '', ifaCase: '', oss: '', woPlaced: '', storeRecd: '', grandTotal: 4 },
      { sec: 'ENG', awtMtrl: '', can: 1, comp: '', hold: 1, ifaCase: 1, oss: '', woPlaced: '', storeRecd: 1, grandTotal: 4 },
      { sec: 'ETD', awtMtrl: 2, can: 1, comp: '', hold: '', ifaCase: 1, oss: '', woPlaced: '', storeRecd: '', grandTotal: 4 },
      { sec: 'INST', awtMtrl: '', can: '', comp: '', hold: '', ifaCase: '', oss: '', woPlaced: '', storeRecd: '', grandTotal: 0 },
      { sec: 'SRD', awtMtrl: '', can: '', comp: 1, hold: '', ifaCase: '', oss: 3, woPlaced: 1, storeRecd: '', grandTotal: 5 },
      { sec: 'T&R', awtMtrl: 1, can: '', comp: '', hold: '', ifaCase: '', oss: 4, woPlaced: '', storeRecd: '', grandTotal: 5 },
      { sec: 'VRD', awtMtrl: '', can: '', comp: 1, hold: '', ifaCase: '', oss: '', woPlaced: 2, storeRecd: '', grandTotal: 3 }
    ];

    // LPR Data for LP Status (Scaled)
    const lpScaledData = [
      { sec: 'ARD', awtMtrl: 7, can: 3, comp: 5, hold: '', ifaCase: 2, oss: 4, soPlaced: 2, storeRecd: '', grandTotal: 23 },
      { sec: 'ARMT', awtMtrl: 6, can: 2, comp: 2, hold: '', ifaCase: '', oss: '', soPlaced: '', storeRecd: '', grandTotal: 10 },
      { sec: 'ENG', awtMtrl: '', can: 2, comp: 1, hold: 2, ifaCase: 2, oss: '', soPlaced: 1, storeRecd: 2, grandTotal: 10 },
      { sec: 'ETD', awtMtrl: 4, can: 3, comp: '', hold: '', ifaCase: 2, oss: 1, soPlaced: 1, storeRecd: '', grandTotal: 11 },
      { sec: 'INST', awtMtrl: '', can: 1, comp: 1, hold: 1, ifaCase: '', oss: '', soPlaced: 1, storeRecd: 1, grandTotal: 5 },
      { sec: 'SRD', awtMtrl: 1, can: 1, comp: 2, hold: '', ifaCase: '', oss: 7, soPlaced: 3, storeRecd: '', grandTotal: 14 },
      { sec: 'T&R', awtMtrl: 2, can: '', comp: 1, hold: '', ifaCase: '', oss: 9, soPlaced: '', storeRecd: '', grandTotal: 12 },
      { sec: 'VRD', awtMtrl: 1, can: 1, comp: 3, hold: '', ifaCase: 1, oss: 1, soPlaced: 5, storeRecd: '', grandTotal: 12 }
    ];

    // LPR Data for LP Status (Non-Scaled)
    const lpNonScaledData = [
      { sec: 'ARD', awtMtrl: 3, can: 1, comp: 2, hold: 1, ifaCase: 1, oss: 2, soPlaced: 1, storeRecd: '', grandTotal: 11 },
      { sec: 'ARMT', awtMtrl: 2, can: 1, comp: 1, hold: '', ifaCase: '', oss: '', soPlaced: '', storeRecd: '', grandTotal: 4 },
      { sec: 'ENG', awtMtrl: '', can: 1, comp: '', hold: 1, ifaCase: 1, oss: '', soPlaced: '', storeRecd: 1, grandTotal: 4 },
      { sec: 'ETD', awtMtrl: 2, can: 1, comp: '', hold: '', ifaCase: 1, oss: '', soPlaced: '', storeRecd: '', grandTotal: 4 },
      { sec: 'INST', awtMtrl: '', can: '', comp: '', hold: '', ifaCase: '', oss: '', soPlaced: '', storeRecd: '', grandTotal: 0 },
      { sec: 'SRD', awtMtrl: '', can: '', comp: 1, hold: '', ifaCase: '', oss: 3, soPlaced: 1, storeRecd: '', grandTotal: 5 },
      { sec: 'T&R', awtMtrl: 1, can: '', comp: '', hold: '', ifaCase: '', oss: 4, soPlaced: '', storeRecd: '', grandTotal: 5 },
      { sec: 'VRD', awtMtrl: '', can: '', comp: 1, hold: '', ifaCase: '', oss: '', soPlaced: 2, storeRecd: '', grandTotal: 3 }
    ];

    // Calculate Grand Totals
    const calculateGrandTotal = (data: any[], field: string) => {
      return data.reduce((sum, row) => {
        const value = row[field];
        return sum + (typeof value === 'number' ? value : 0);
      }, 0);
    };

    const lmScaledGrandTotal = {
      awtMtrl: calculateGrandTotal(lmScaledData, 'awtMtrl'),
      can: calculateGrandTotal(lmScaledData, 'can'),
      comp: calculateGrandTotal(lmScaledData, 'comp'),
      hold: calculateGrandTotal(lmScaledData, 'hold'),
      ifaCase: calculateGrandTotal(lmScaledData, 'ifaCase'),
      oss: calculateGrandTotal(lmScaledData, 'oss'),
      woPlaced: calculateGrandTotal(lmScaledData, 'woPlaced'),
      storeRecd: calculateGrandTotal(lmScaledData, 'storeRecd'),
      grandTotal: calculateGrandTotal(lmScaledData, 'grandTotal')
    };

    const lmNonScaledGrandTotal = {
      awtMtrl: calculateGrandTotal(lmNonScaledData, 'awtMtrl'),
      can: calculateGrandTotal(lmNonScaledData, 'can'),
      comp: calculateGrandTotal(lmNonScaledData, 'comp'),
      hold: calculateGrandTotal(lmNonScaledData, 'hold'),
      ifaCase: calculateGrandTotal(lmNonScaledData, 'ifaCase'),
      oss: calculateGrandTotal(lmNonScaledData, 'oss'),
      woPlaced: calculateGrandTotal(lmNonScaledData, 'woPlaced'),
      storeRecd: calculateGrandTotal(lmNonScaledData, 'storeRecd'),
      grandTotal: calculateGrandTotal(lmNonScaledData, 'grandTotal')
    };

    const lpScaledGrandTotal = {
      awtMtrl: calculateGrandTotal(lpScaledData, 'awtMtrl'),
      can: calculateGrandTotal(lpScaledData, 'can'),
      comp: calculateGrandTotal(lpScaledData, 'comp'),
      hold: calculateGrandTotal(lpScaledData, 'hold'),
      ifaCase: calculateGrandTotal(lpScaledData, 'ifaCase'),
      oss: calculateGrandTotal(lpScaledData, 'oss'),
      soPlaced: calculateGrandTotal(lpScaledData, 'soPlaced'),
      storeRecd: calculateGrandTotal(lpScaledData, 'storeRecd'),
      grandTotal: calculateGrandTotal(lpScaledData, 'grandTotal')
    };

    const lpNonScaledGrandTotal = {
      awtMtrl: calculateGrandTotal(lpNonScaledData, 'awtMtrl'),
      can: calculateGrandTotal(lpNonScaledData, 'can'),
      comp: calculateGrandTotal(lpNonScaledData, 'comp'),
      hold: calculateGrandTotal(lpNonScaledData, 'hold'),
      ifaCase: calculateGrandTotal(lpNonScaledData, 'ifaCase'),
      oss: calculateGrandTotal(lpNonScaledData, 'oss'),
      soPlaced: calculateGrandTotal(lpNonScaledData, 'soPlaced'),
      storeRecd: calculateGrandTotal(lpNonScaledData, 'storeRecd'),
      grandTotal: calculateGrandTotal(lpNonScaledData, 'grandTotal')
    };

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
      <React.Fragment>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-8">
        <div className="max-w-7xl mx-auto">
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
                  <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Target Module - PY-2023-24</h2>
                    <p className="text-gray-600">No target data available for this financial year.</p>
                  </div>
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

                        {/* Bar Graph: Target Values from Table - Merged VEH and ENG */}
                        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                          <h3 className="text-2xl font-bold text-gray-900 mb-6">Target Values - VEH & ENG</h3>
                          <div className="flex items-end justify-around h-96 border-l-2 border-b-2 border-gray-400 pl-4 pb-4 gap-2">
                            {(() => {
                              const vehTargets = [
                                { label: 'OH-I\nBMP II', value: targetData.veh.ohI.bmpII, color: 'from-blue-600 to-blue-400' },
                                { label: 'OH-I\nBMP IIK', value: targetData.veh.ohI.iik, color: 'from-purple-600 to-purple-400' },
                                { label: 'OH-II', value: targetData.veh.ohII, color: 'from-green-600 to-green-400' },
                                { label: 'CMT', value: targetData.veh.cmt, color: 'from-orange-600 to-orange-400' },
                                { label: 'VT-72B', value: targetData.veh.vt72b, color: 'from-red-600 to-red-400' }
                              ];
                              const engTargets = [
                                { label: 'UTD-20 ENG', value: targetData.eng.utd20, color: 'from-indigo-600 to-indigo-400' },
                                { label: 'SLK ENG', value: targetData.eng.slk, color: 'from-teal-600 to-teal-400' }
                              ];
                              const allTargets = [...vehTargets, ...engTargets];
                              const maxValue = Math.max(...allTargets.map(t => t.value), 1);
                              return allTargets.map((target, index) => (
                                <div key={index} className="flex flex-col items-center gap-2 flex-1">
                                  <div
                                    className={`w-full bg-gradient-to-t ${target.color} flex items-start justify-center text-white font-bold text-xs pt-2 rounded-t-lg`}
                                    style={{ height: `${(target.value / maxValue) * 350}px`, minHeight: '30px' }}
                                  >
                                    {target.value}
                                  </div>
                                  <span className="text-xs font-semibold text-gray-700 mt-2 text-center whitespace-pre-line">{target.label}</span>
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

                        {/* Bar Graph: Target Values from Table - Merged VEH and ENG */}
                        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                          <h3 className="text-2xl font-bold text-gray-900 mb-6">Target Values - VEH & ENG</h3>
                          <div className="flex items-end justify-around h-96 border-l-2 border-b-2 border-gray-400 pl-4 pb-4 gap-2">
                            {(() => {
                              const vehTargets = [
                                { label: 'OH-I\nBMP II', value: targetData.veh.ohI.bmpII, color: 'from-blue-600 to-blue-400' },
                                { label: 'OH-II\nBMP II', value: targetData.veh.ohII.bmpII, color: 'from-green-600 to-green-400' },
                                { label: 'CMT', value: targetData.veh.cmt, color: 'from-orange-600 to-orange-400' },
                                { label: 'VT-72B', value: targetData.veh.vt72b, color: 'from-red-600 to-red-400' },
                                ...(targetData.veh.gun30mm ? [{ label: '30 MM\nGun', value: targetData.veh.gun30mm, color: 'from-pink-600 to-pink-400' }] : [])
                              ];
                              const engTargets = [
                                { label: 'UTD-20 ENG', value: targetData.eng.utd20, color: 'from-indigo-600 to-indigo-400' },
                                ...(targetData.eng.baz ? [{ label: 'BAZ ENG', value: targetData.eng.baz, color: 'from-cyan-600 to-cyan-400' }] : []),
                                { label: 'SLK ENG', value: targetData.eng.slk, color: 'from-teal-600 to-teal-400' }
                              ];
                              const allTargets = [...vehTargets, ...engTargets];
                              const maxValue = Math.max(...allTargets.map(t => t.value), 1);
                              return allTargets.map((target, index) => (
                                <div key={index} className="flex flex-col items-center gap-2 flex-1">
                                  <div
                                    className={`w-full bg-gradient-to-t ${target.color} flex items-start justify-center text-white font-bold text-xs pt-2 rounded-t-lg`}
                                    style={{ height: `${(target.value / maxValue) * 350}px`, minHeight: '30px' }}
                                  >
                                    {target.value}
                                  </div>
                                  <span className="text-xs font-semibold text-gray-700 mt-2 text-center whitespace-pre-line">{target.label}</span>
                                </div>
                              ));
                            })()}
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

                        {/* Bar Graph: Target Values from Table - Merged VEH and ENG */}
                        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                          <h3 className="text-2xl font-bold text-gray-900 mb-6">Target Values - VEH & ENG</h3>
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
                              const engTargets = [
                                { label: 'UTD-20 ENG', value: targetData.eng.utd20, color: 'from-indigo-600 to-indigo-400' },
                                ...(targetData.eng.baz ? [{ label: 'BAZ ENG', value: targetData.eng.baz, color: 'from-cyan-600 to-cyan-400' }] : []),
                                { label: 'SLK ENG', value: targetData.eng.slk, color: 'from-teal-600 to-teal-400' }
                              ];
                              const allTargets = [...vehTargets, ...engTargets];
                              const maxValue = Math.max(...allTargets.map(t => t.value), 1);
                              return allTargets.map((target, index) => (
                                <div key={index} className="flex flex-col items-center gap-2 flex-1">
                                  <div
                                    className={`w-full bg-gradient-to-t ${target.color} flex items-start justify-center text-white font-bold text-xs pt-2 rounded-t-lg`}
                                    style={{ height: `${(target.value / maxValue) * 350}px`, minHeight: '30px' }}
                                  >
                                    {target.value}
                                  </div>
                                  <span className="text-xs font-semibold text-gray-700 mt-2 text-center whitespace-pre-line">{target.label}</span>
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
          ) : selectedCard === 'ct-issue' ? (
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
              ) : selectedYear === 'PY-2023-24' ? (
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

                        {/* CT Issued VEH Table */}
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

                        {/* CT Issued ENG Table */}
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

              {/* Notification Modal */}
              {showNotificationModal && selectedNotificationSerial !== null && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                  <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-bold text-gray-900">Send Notification</h3>
                      <button
                        onClick={handleCancelNotification}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2">
                        Item: <span className="font-semibold text-gray-900">
                          {criticalItemsData.find(item => item.serial === selectedNotificationSerial)?.nomenclature}
                        </span>
                      </p>
                      <p className="text-sm text-gray-600">
                        Action Taken: <span className="font-semibold text-gray-900">
                          {criticalItemsActions[selectedNotificationSerial] || 'N/A'}
                        </span>
                      </p>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Select Recipient</label>
                      <div className="grid grid-cols-2 gap-3">
                        {['DGM WKS MTRL', 'DGM Purchase', 'DGM Prod', 'Section Incharge'].map((recipient) => (
                          <button
                            key={recipient}
                            onClick={() => handleNotificationRecipientSelect(recipient)}
                            className={`px-4 py-3 rounded-lg border-2 transition-all font-semibold text-sm ${
                              selectedRecipient === recipient
                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400 hover:bg-gray-50'
                            }`}
                          >
                            {recipient}
                          </button>
                        ))}
                      </div>
                    </div>

                    {selectedRecipient && (
                      <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                        <textarea
                          value={notificationMessage}
                          onChange={(e) => setNotificationMessage(e.target.value)}
                          placeholder="Enter your message here..."
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                          rows={4}
                        />
                      </div>
                    )}

                    <div className="flex gap-3">
                      <button
                        onClick={handleCancelNotification}
                        className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-semibold transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSendNotificationMessage}
                        disabled={!selectedRecipient || !notificationMessage.trim()}
                        className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-colors ${
                          !selectedRecipient || !notificationMessage.trim()
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-blue-500 text-white hover:bg-blue-600'
                        }`}
                      >
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              )}

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

              {/* Title */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">DETLS OF LM WK ORDERS :2025-26</h2>

                {/* Tabs */}
                <div className="flex border-b border-gray-300 mb-6">
                  <button
                    onClick={() => setLmStatusTab('scaled')}
                    className={`px-6 py-3 font-semibold text-sm transition-all ${
                      lmStatusTab === 'scaled'
                        ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    Scaled
                  </button>
                  <button
                    onClick={() => setLmStatusTab('non-scaled')}
                    className={`px-6 py-3 font-semibold text-sm transition-all ${
                      lmStatusTab === 'non-scaled'
                        ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    Non Scaled
                  </button>
                </div>

                {/* Scaled Tab Content */}
                {lmStatusTab === 'scaled' && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Status</h3>
                    
                    {/* Scaled Table Data */}
                    {(() => {
                      const scaledData = [
                        { sec: 'ARD', awtMtrl: 5, can: 12, comp: 0, oss: 0, woRel: 20, meCell: 0, grandTotal: 37 },
                        { sec: 'ARMT', awtMtrl: 14, can: 5, comp: 1, oss: 3, woRel: 10, meCell: 5, grandTotal: 38 },
                        { sec: 'ETD', awtMtrl: 0, can: 0, comp: 2, oss: 0, woRel: 0, meCell: 0, grandTotal: 2 },
                        { sec: 'SRD', awtMtrl: 41, can: 2, comp: 1, oss: 0, woRel: 15, meCell: 1, grandTotal: 60 },
                        { sec: 'T&R', awtMtrl: 4, can: 1, comp: 5, oss: 0, woRel: 4, meCell: 0, grandTotal: 14 },
                        { sec: 'VRD', awtMtrl: 4, can: 8, comp: 0, oss: 0, woRel: 18, meCell: 0, grandTotal: 30 }
                      ];

                      const grandTotals = {
                        awtMtrl: 68,
                        can: 28,
                        comp: 9,
                        oss: 3,
                        woRel: 67,
                        meCell: 6,
                        grandTotal: 181
                      };

                      return (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="bg-gray-200">
                                <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Sec</th>
                                <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Awt Mtrl</th>
                                <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Can</th>
                                <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Comp</th>
                                <th className="border border-gray-400 px-3 py-2 font-semibold text-left">OSS</th>
                                <th className="border border-gray-400 px-3 py-2 font-semibold text-left">WO Rel</th>
                                <th className="border border-gray-400 px-3 py-2 font-semibold text-left">ME Cell</th>
                                <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Grand Total</th>
                      </tr>
                    </thead>
                    <tbody>
                              {scaledData.map((row, index) => (
                                <tr key={row.sec} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}>
                                  <td className="border border-gray-300 px-3 py-2 font-semibold">{row.sec}</td>
                                  <td className="border border-gray-300 px-3 py-2 text-center">{row.awtMtrl || ''}</td>
                                  <td className="border border-gray-300 px-3 py-2 text-center">{row.can || ''}</td>
                                  <td className="border border-gray-300 px-3 py-2 text-center">{row.comp || ''}</td>
                                  <td className="border border-gray-300 px-3 py-2 text-center">{row.oss || ''}</td>
                                  <td className="border border-gray-300 px-3 py-2 text-center">{row.woRel || ''}</td>
                                  <td className="border border-gray-300 px-3 py-2 text-center">{row.meCell || ''}</td>
                                  <td className="border border-gray-300 px-3 py-2 text-center font-semibold">{row.grandTotal}</td>
                        </tr>
                      ))}
                              <tr className="bg-gray-300 font-bold">
                                <td className="border border-gray-400 px-3 py-2">Grand Total</td>
                                <td className="border border-gray-400 px-3 py-2 text-center">{grandTotals.awtMtrl}</td>
                                <td className="border border-gray-400 px-3 py-2 text-center">{grandTotals.can}</td>
                                <td className="border border-gray-400 px-3 py-2 text-center">{grandTotals.comp}</td>
                                <td className="border border-gray-400 px-3 py-2 text-center">{grandTotals.oss}</td>
                                <td className="border border-gray-400 px-3 py-2 text-center">{grandTotals.woRel}</td>
                                <td className="border border-gray-400 px-3 py-2 text-center">{grandTotals.meCell}</td>
                                <td className="border border-gray-400 px-3 py-2 text-center">{grandTotals.grandTotal}</td>
                              </tr>
                    </tbody>
                  </table>
                          
                          {/* Summary below table */}
                          <div className="mt-6 grid grid-cols-3 gap-4">
                            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                              <div className="text-blue-700 text-sm font-semibold mb-1">AWT MTRL</div>
                              <div className="text-2xl font-bold text-blue-600">68</div>
                            </div>
                            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                              <div className="text-green-700 text-sm font-semibold mb-1">SO PLACED</div>
                              <div className="text-2xl font-bold text-green-600">40</div>
                            </div>
                            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
                              <div className="text-yellow-700 text-sm font-semibold mb-1">ENQ</div>
                              <div className="text-2xl font-bold text-yellow-600">28</div>
                </div>
              </div>

                          {/* Summary Cards Bar Graph */}
                          <div className="mt-8 bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                            <h4 className="text-xl font-bold text-gray-900 mb-8">Summary Cards Visualization</h4>
                            <div className="flex items-end justify-around h-80 border-l-2 border-b-2 border-gray-400 pl-4 pb-4 gap-2 mt-6">
                        {(() => {
                                const maxValue = Math.max(grandTotals.awtMtrl, grandTotals.can, grandTotals.comp, grandTotals.oss, grandTotals.woRel, grandTotals.meCell, 1);
                                return (
                                  <>
                                    <div className="flex flex-col items-center gap-2 flex-1">
                                      <div
                                        className="w-full bg-gradient-to-t from-blue-600 to-blue-400 flex items-start justify-center text-white font-bold text-xs pt-2 rounded-t-lg hover:from-blue-700 hover:to-blue-500 transition-all"
                                        style={{ height: `${(grandTotals.awtMtrl / maxValue) * 300}px`, minHeight: '30px' }}
                                        title={`Awt Mtrl: ${grandTotals.awtMtrl}`}
                                      >
                                        {grandTotals.awtMtrl}
                                      </div>
                                      <span className="text-xs font-semibold text-gray-700 mt-2 text-center">Awt Mtrl</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2 flex-1">
                                      <div
                                        className="w-full bg-gradient-to-t from-green-600 to-green-400 flex items-start justify-center text-white font-bold text-xs pt-2 rounded-t-lg hover:from-green-700 hover:to-green-500 transition-all"
                                        style={{ height: `${(grandTotals.can / maxValue) * 300}px`, minHeight: '30px' }}
                                        title={`Can: ${grandTotals.can}`}
                                      >
                                        {grandTotals.can}
                                      </div>
                                      <span className="text-xs font-semibold text-gray-700 mt-2 text-center">Can</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2 flex-1">
                                      <div
                                        className="w-full bg-gradient-to-t from-purple-600 to-purple-400 flex items-start justify-center text-white font-bold text-xs pt-2 rounded-t-lg hover:from-purple-700 hover:to-purple-500 transition-all"
                                        style={{ height: `${(grandTotals.comp / maxValue) * 300}px`, minHeight: '30px' }}
                                        title={`Comp: ${grandTotals.comp}`}
                                      >
                                        {grandTotals.comp}
                                      </div>
                                      <span className="text-xs font-semibold text-gray-700 mt-2 text-center">Comp</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2 flex-1">
                                      <div
                                        className="w-full bg-gradient-to-t from-orange-600 to-orange-400 flex items-start justify-center text-white font-bold text-xs pt-2 rounded-t-lg hover:from-orange-700 hover:to-orange-500 transition-all"
                                        style={{ height: `${(grandTotals.oss / maxValue) * 300}px`, minHeight: '30px' }}
                                        title={`OSS: ${grandTotals.oss}`}
                                      >
                                        {grandTotals.oss}
                                      </div>
                                      <span className="text-xs font-semibold text-gray-700 mt-2 text-center">OSS</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2 flex-1">
                                      <div
                                        className="w-full bg-gradient-to-t from-teal-600 to-teal-400 flex items-start justify-center text-white font-bold text-xs pt-2 rounded-t-lg hover:from-teal-700 hover:to-teal-500 transition-all"
                                        style={{ height: `${(grandTotals.woRel / maxValue) * 300}px`, minHeight: '30px' }}
                                        title={`WO Rel: ${grandTotals.woRel}`}
                                      >
                                        {grandTotals.woRel}
                                      </div>
                                      <span className="text-xs font-semibold text-gray-700 mt-2 text-center">WO Rel</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2 flex-1">
                                      <div
                                        className="w-full bg-gradient-to-t from-pink-600 to-pink-400 flex items-start justify-center text-white font-bold text-xs pt-2 rounded-t-lg hover:from-pink-700 hover:to-pink-500 transition-all"
                                        style={{ height: `${(grandTotals.meCell / maxValue) * 300}px`, minHeight: '30px' }}
                                        title={`ME Cell: ${grandTotals.meCell}`}
                                      >
                                        {grandTotals.meCell}
                                      </div>
                                      <span className="text-xs font-semibold text-gray-700 mt-2 text-center">ME Cell</span>
                                    </div>
                                  </>
                                );
                              })()}
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}

                {/* Non Scaled Tab Content */}
                {lmStatusTab === 'non-scaled' && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Status</h3>
                    
                    {/* Non Scaled Table Data */}
                    {(() => {
                      const nonScaledData = [
                        { sec: 'ARD', awtMtrl: 0, can: 3, comp: 0, ess: 0, meCell: 0, woRel: 2, grandTotal: 5 },
                        { sec: 'ARMT', awtMtrl: 1, can: 0, comp: 1, ess: 0, meCell: 2, woRel: 1, grandTotal: 5 },
                        { sec: 'ENG', awtMtrl: 13, can: 0, comp: 0, ess: 0, meCell: 4, woRel: 0, grandTotal: 17 },
                        { sec: 'ETD', awtMtrl: 2, can: 0, comp: 2, ess: 3, meCell: 0, woRel: 43, grandTotal: 50 },
                        { sec: 'INST', awtMtrl: 2, can: 1, comp: 1, ess: 0, meCell: 0, woRel: 14, grandTotal: 18 },
                        { sec: 'SRD', awtMtrl: 18, can: 0, comp: 6, ess: 1, meCell: 0, woRel: 21, grandTotal: 46 },
                        { sec: 'T&R', awtMtrl: 1, can: 0, comp: 2, ess: 0, meCell: 3, woRel: 2, grandTotal: 8 },
                        { sec: 'VRD', awtMtrl: 7, can: 0, comp: 1, ess: 0, meCell: 3, woRel: 15, grandTotal: 26 }
                      ];

                      const grandTotals = {
                        awtMtrl: 44,
                        can: 4,
                        comp: 13,
                        ess: 4,
                        meCell: 12,
                        woRel: 98,
                        grandTotal: 175
                      };

                      return (
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse text-sm">
                            <thead>
                              <tr className="bg-gray-200">
                                <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Sec</th>
                                <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Awt Mtrl</th>
                                <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Can</th>
                                <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Comp</th>
                                <th className="border border-gray-400 px-3 py-2 font-semibold text-left">ESS</th>
                                <th className="border border-gray-400 px-3 py-2 font-semibold text-left">ME Cell</th>
                                <th className="border border-gray-400 px-3 py-2 font-semibold text-left">WO Rel</th>
                                <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Grand Total</th>
                              </tr>
                            </thead>
                            <tbody>
                              {nonScaledData.map((row, index) => (
                                <tr key={row.sec} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}>
                                  <td className="border border-gray-300 px-3 py-2 font-semibold">{row.sec}</td>
                                  <td className="border border-gray-300 px-3 py-2 text-center">{row.awtMtrl || ''}</td>
                                  <td className="border border-gray-300 px-3 py-2 text-center">{row.can || ''}</td>
                                  <td className="border border-gray-300 px-3 py-2 text-center">{row.comp || ''}</td>
                                  <td className="border border-gray-300 px-3 py-2 text-center">{row.ess || ''}</td>
                                  <td className="border border-gray-300 px-3 py-2 text-center">{row.meCell || ''}</td>
                                  <td className="border border-gray-300 px-3 py-2 text-center">{row.woRel || ''}</td>
                                  <td className="border border-gray-300 px-3 py-2 text-center font-semibold">{row.grandTotal}</td>
                                </tr>
                              ))}
                              <tr className="bg-gray-300 font-bold">
                                <td className="border border-gray-400 px-3 py-2">Grand Total</td>
                                <td className="border border-gray-400 px-3 py-2 text-center">{grandTotals.awtMtrl}</td>
                                <td className="border border-gray-400 px-3 py-2 text-center">{grandTotals.can}</td>
                                <td className="border border-gray-400 px-3 py-2 text-center">{grandTotals.comp}</td>
                                <td className="border border-gray-400 px-3 py-2 text-center">{grandTotals.ess}</td>
                                <td className="border border-gray-400 px-3 py-2 text-center">{grandTotals.meCell}</td>
                                <td className="border border-gray-400 px-3 py-2 text-center">{grandTotals.woRel}</td>
                                <td className="border border-gray-400 px-3 py-2 text-center">{grandTotals.grandTotal}</td>
                              </tr>
                            </tbody>
                          </table>
                          
                          {/* Summary below table */}
                          <div className="mt-6 grid grid-cols-3 gap-4">
                            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                              <div className="text-blue-700 text-sm font-semibold mb-1">AWT MTRL</div>
                              <div className="text-2xl font-bold text-blue-600">44</div>
                            </div>
                            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                              <div className="text-green-700 text-sm font-semibold mb-1">SO PLACED</div>
                              <div className="text-2xl font-bold text-green-600">15</div>
                            </div>
                            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
                              <div className="text-yellow-700 text-sm font-semibold mb-1">U/ENQ</div>
                              <div className="text-2xl font-bold text-yellow-600">29</div>
                            </div>
                          </div>

                          {/* Summary Cards Bar Graph */}
                          <div className="mt-8 bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                            <h4 className="text-xl font-bold text-gray-900 mb-8">Summary Cards Visualization</h4>
                            <div className="flex items-end justify-around h-80 border-l-2 border-b-2 border-gray-400 pl-4 pb-4 gap-2 mt-6">
                              {(() => {
                                const maxValue = Math.max(grandTotals.awtMtrl, grandTotals.can, grandTotals.comp, grandTotals.ess, grandTotals.woRel, grandTotals.meCell, 1);
                            return (
                                  <>
                                    <div className="flex flex-col items-center gap-2 flex-1">
                                      <div
                                        className="w-full bg-gradient-to-t from-blue-600 to-blue-400 flex items-start justify-center text-white font-bold text-xs pt-2 rounded-t-lg hover:from-blue-700 hover:to-blue-500 transition-all"
                                        style={{ height: `${(grandTotals.awtMtrl / maxValue) * 300}px`, minHeight: '30px' }}
                                        title={`Awt Mtrl: ${grandTotals.awtMtrl}`}
                                      >
                                        {grandTotals.awtMtrl}
                    </div>
                                      <span className="text-xs font-semibold text-gray-700 mt-2 text-center">Awt Mtrl</span>
                          </div>
                                    <div className="flex flex-col items-center gap-2 flex-1">
                                      <div
                                        className="w-full bg-gradient-to-t from-green-600 to-green-400 flex items-start justify-center text-white font-bold text-xs pt-2 rounded-t-lg hover:from-green-700 hover:to-green-500 transition-all"
                                        style={{ height: `${(grandTotals.can / maxValue) * 300}px`, minHeight: '30px' }}
                                        title={`Can: ${grandTotals.can}`}
                                      >
                                        {grandTotals.can}
                        </div>
                                      <span className="text-xs font-semibold text-gray-700 mt-2 text-center">Can</span>
                    </div>
                                    <div className="flex flex-col items-center gap-2 flex-1">
                                      <div
                                        className="w-full bg-gradient-to-t from-purple-600 to-purple-400 flex items-start justify-center text-white font-bold text-xs pt-2 rounded-t-lg hover:from-purple-700 hover:to-purple-500 transition-all"
                                        style={{ height: `${(grandTotals.comp / maxValue) * 300}px`, minHeight: '30px' }}
                                        title={`Comp: ${grandTotals.comp}`}
                                      >
                                        {grandTotals.comp}
                  </div>
                                      <span className="text-xs font-semibold text-gray-700 mt-2 text-center">Comp</span>
                        </div>
                                    <div className="flex flex-col items-center gap-2 flex-1">
                                      <div
                                        className="w-full bg-gradient-to-t from-orange-600 to-orange-400 flex items-start justify-center text-white font-bold text-xs pt-2 rounded-t-lg hover:from-orange-700 hover:to-orange-500 transition-all"
                                        style={{ height: `${(grandTotals.ess / maxValue) * 300}px`, minHeight: '30px' }}
                                        title={`ESS: ${grandTotals.ess}`}
                                      >
                                        {grandTotals.ess}
                          </div>
                                      <span className="text-xs font-semibold text-gray-700 mt-2 text-center">ESS</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2 flex-1">
                                      <div
                                        className="w-full bg-gradient-to-t from-teal-600 to-teal-400 flex items-start justify-center text-white font-bold text-xs pt-2 rounded-t-lg hover:from-teal-700 hover:to-teal-500 transition-all"
                                        style={{ height: `${(grandTotals.woRel / maxValue) * 300}px`, minHeight: '30px' }}
                                        title={`WO Rel: ${grandTotals.woRel}`}
                                      >
                                        {grandTotals.woRel}
                          </div>
                                      <span className="text-xs font-semibold text-gray-700 mt-2 text-center">WO Rel</span>
                        </div>
                                    <div className="flex flex-col items-center gap-2 flex-1">
                                      <div
                                        className="w-full bg-gradient-to-t from-pink-600 to-pink-400 flex items-start justify-center text-white font-bold text-xs pt-2 rounded-t-lg hover:from-pink-700 hover:to-pink-500 transition-all"
                                        style={{ height: `${(grandTotals.meCell / maxValue) * 300}px`, minHeight: '30px' }}
                                        title={`ME Cell: ${grandTotals.meCell}`}
                                      >
                                        {grandTotals.meCell}
                          </div>
                                      <span className="text-xs font-semibold text-gray-700 mt-2 text-center">ME Cell</span>
                      </div>
                                  </>
                                );
                              })()}
                  </div>
                </div>
                    </div>
                      );
                    })()}
                    </div>
                )}

                {/* Graph - Section-wise Distribution */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mt-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Section-wise Grand Total Distribution</h3>
                  <div className="flex items-end justify-around h-96 border-l-2 border-b-2 border-gray-400 pl-4 pb-4 mt-4">
                    {(() => {
                      const scaledData = [
                        { sec: 'ARD', grandTotal: 37 },
                        { sec: 'ARMT', grandTotal: 38 },
                        { sec: 'ETD', grandTotal: 2 },
                        { sec: 'SRD', grandTotal: 60 },
                        { sec: 'T&R', grandTotal: 14 },
                        { sec: 'VRD', grandTotal: 30 }
                      ];
                      const nonScaledData = [
                        { sec: 'ARD', grandTotal: 5 },
                        { sec: 'ARMT', grandTotal: 5 },
                        { sec: 'ENG', grandTotal: 17 },
                        { sec: 'ETD', grandTotal: 50 },
                        { sec: 'INST', grandTotal: 18 },
                        { sec: 'SRD', grandTotal: 46 },
                        { sec: 'T&R', grandTotal: 8 },
                        { sec: 'VRD', grandTotal: 26 }
                      ];
                      const data = lmStatusTab === 'scaled' ? scaledData : nonScaledData;
                      const maxValue = Math.max(...data.map(d => d.grandTotal));
                      const colors = ['bg-purple-500', 'bg-blue-500', 'bg-green-500', 'bg-orange-500', 'bg-pink-500', 'bg-cyan-500', 'bg-yellow-500', 'bg-red-500'];
                      
                      return data.map((row, index) => {
                        const height = (row.grandTotal / maxValue) * 320;
                        return (
                          <div key={row.sec} className="flex flex-col items-center gap-2">
                            <div
                              className={`w-16 ${colors[index % colors.length]} flex items-start justify-center text-white font-bold text-xs pt-2 rounded-t-lg hover:opacity-80 transition-all`}
                              style={{ height: `${height}px`, minHeight: '30px' }}
                              title={`${row.sec}: ${row.grandTotal}`}
                            >
                              {row.grandTotal}
                    </div>
                            <span className="text-xs font-semibold text-gray-700 mt-2 text-center">{row.sec}</span>
                    </div>
                        );
                      });
                    })()}
                  </div>
                </div>
              </div>
            </div>
          ) : selectedCard === 'lp-completed' ? (
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
                <h2 className="text-3xl font-bold text-gray-900 mb-6">DETLS OF LPR's :2025-26</h2>
                
                {/* Tabs */}
                <div className="flex gap-4 mb-6 border-b border-gray-200">
                  <button
                    onClick={() => setLpStatusTab('scaled')}
                    className={`px-6 py-3 font-semibold transition-colors ${
                      lpStatusTab === 'scaled'
                        ? 'text-indigo-600 border-b-2 border-indigo-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Scaled
                  </button>
                  <button
                    onClick={() => setLpStatusTab('non-scaled')}
                    className={`px-6 py-3 font-semibold transition-colors ${
                      lpStatusTab === 'non-scaled'
                        ? 'text-indigo-600 border-b-2 border-indigo-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Non Scaled
                  </button>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {lpStatusTab === 'scaled' ? 'SCALED LPR\'s 2025-26 STATUS (15/10/25)' : 'NON-SCALED LPR\'s 2025-26 STATUS (15/10/25)'}
                  </h3>
                  <table className="w-full border-collapse text-xs">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Sec</th>
                        <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Awt Spare</th>
                        <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Can</th>
                        <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Comp</th>
                        <th className="border border-gray-400 px-3 py-2 font-semibold text-left">IFA Case</th>
                        <th className="border border-gray-400 px-3 py-2 font-semibold text-left">OSS</th>
                        <th className="border border-gray-400 px-3 py-2 font-semibold text-left">SO Placed</th>
                        <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Store Recd</th>
                        <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Grand Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(lpStatusTab === 'scaled' ? lpScaledData : lpNonScaledData).map((row, index) => (
                        <tr key={row.sec} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}>
                          <td className="border border-gray-300 px-3 py-2 font-semibold">{row.sec}</td>
                          <td className="border border-gray-300 px-3 py-2 text-center">{row.awtMtrl || '-'}</td>
                          <td className="border border-gray-300 px-3 py-2 text-center">{row.can || '-'}</td>
                          <td className="border border-gray-300 px-3 py-2 text-center">{row.comp || '-'}</td>
                          <td className="border border-gray-300 px-3 py-2 text-center">{row.ifaCase || '-'}</td>
                          <td className="border border-gray-300 px-3 py-2 text-center">{row.oss || '-'}</td>
                          <td className="border border-gray-300 px-3 py-2 text-center">{row.soPlaced || '-'}</td>
                          <td className="border border-gray-300 px-3 py-2 text-center">{row.storeRecd || '-'}</td>
                          <td className="border border-gray-300 px-3 py-2 text-center font-bold">{row.grandTotal}</td>
                        </tr>
                      ))}
                      <tr className="bg-gray-200 font-bold">
                        <td className="border border-gray-400 px-3 py-2">Grand Total</td>
                        <td className="border border-gray-400 px-3 py-2 text-center">
                          {(lpStatusTab === 'scaled' ? lpScaledGrandTotal : lpNonScaledGrandTotal).awtMtrl || '-'}
                        </td>
                        <td className="border border-gray-400 px-3 py-2 text-center">
                          {(lpStatusTab === 'scaled' ? lpScaledGrandTotal : lpNonScaledGrandTotal).can || '-'}
                        </td>
                        <td className="border border-gray-400 px-3 py-2 text-center">
                          {(lpStatusTab === 'scaled' ? lpScaledGrandTotal : lpNonScaledGrandTotal).comp || '-'}
                        </td>
                        <td className="border border-gray-400 px-3 py-2 text-center">
                          {(lpStatusTab === 'scaled' ? lpScaledGrandTotal : lpNonScaledGrandTotal).ifaCase || '-'}
                        </td>
                        <td className="border border-gray-400 px-3 py-2 text-center">
                          {(lpStatusTab === 'scaled' ? lpScaledGrandTotal : lpNonScaledGrandTotal).oss || '-'}
                        </td>
                        <td className="border border-gray-400 px-3 py-2 text-center">
                          {(lpStatusTab === 'scaled' ? lpScaledGrandTotal : lpNonScaledGrandTotal).soPlaced || '-'}
                        </td>
                        <td className="border border-gray-400 px-3 py-2 text-center">
                          {(lpStatusTab === 'scaled' ? lpScaledGrandTotal : lpNonScaledGrandTotal).storeRecd || '-'}
                        </td>
                        <td className="border border-gray-400 px-3 py-2 text-center">
                          {(lpStatusTab === 'scaled' ? lpScaledGrandTotal : lpNonScaledGrandTotal).grandTotal}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Summary Cards for LP Status */}
                <div className="mt-6 grid grid-cols-3 gap-4">
                  <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                    <div className="text-blue-700 text-sm font-semibold mb-1">AWT MTRL</div>
                    <div className="text-2xl font-bold text-blue-600">
                      {(lpStatusTab === 'scaled' ? lpScaledGrandTotal : lpNonScaledGrandTotal).awtMtrl || 0}
                    </div>
                  </div>
                  <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                    <div className="text-green-700 text-sm font-semibold mb-1">SO PLACED</div>
                    <div className="text-2xl font-bold text-green-600">
                      {(lpStatusTab === 'scaled' ? lpScaledGrandTotal : lpNonScaledGrandTotal).soPlaced || 0}
                    </div>
                  </div>
                  <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
                    <div className="text-yellow-700 text-sm font-semibold mb-1">ENQ/U/ENQ</div>
                    <div className="text-2xl font-bold text-yellow-600">
                      {((lpStatusTab === 'scaled' ? lpScaledGrandTotal : lpNonScaledGrandTotal).can || 0) + 
                       ((lpStatusTab === 'scaled' ? lpScaledGrandTotal : lpNonScaledGrandTotal).oss || 0)}
                    </div>
                  </div>
                </div>

                {/* Summary Cards Bar Graph */}
                <div className="mt-8 bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-10">Summary Cards Visualization</h4>
                  <div className="flex items-end justify-around h-80 border-l-2 border-b-2 border-gray-400 pl-4 pb-4 gap-2 mt-6">
                    {(() => {
                      const grandTotal = lpStatusTab === 'scaled' ? lpScaledGrandTotal : lpNonScaledGrandTotal;
                      const awtSpare = grandTotal.awtMtrl || 0;
                      const can = grandTotal.can || 0;
                      const comp = grandTotal.comp || 0;
                      const ifaCase = grandTotal.ifaCase || 0;
                      const oss = grandTotal.oss || 0;
                      const soPlaced = grandTotal.soPlaced || 0;
                      const storeRecd = grandTotal.storeRecd || 0;
                      
                      const maxValue = Math.max(awtSpare, can, comp, ifaCase, oss, soPlaced, storeRecd, 1);
                      
                      const barData = [
                        { label: 'Awt Spare', value: awtSpare, colorClass: 'bg-gradient-to-t from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500' },
                        { label: 'Can', value: can, colorClass: 'bg-gradient-to-t from-green-600 to-green-400 hover:from-green-700 hover:to-green-500' },
                        { label: 'Comp', value: comp, colorClass: 'bg-gradient-to-t from-purple-600 to-purple-400 hover:from-purple-700 hover:to-purple-500' },
                        { label: 'IFA Case', value: ifaCase, colorClass: 'bg-gradient-to-t from-orange-600 to-orange-400 hover:from-orange-700 hover:to-orange-500' },
                        { label: 'OSS', value: oss, colorClass: 'bg-gradient-to-t from-yellow-600 to-yellow-400 hover:from-yellow-700 hover:to-yellow-500' },
                        { label: 'SO Placed', value: soPlaced, colorClass: 'bg-gradient-to-t from-indigo-600 to-indigo-400 hover:from-indigo-700 hover:to-indigo-500' },
                        { label: 'Store Recd', value: storeRecd, colorClass: 'bg-gradient-to-t from-pink-600 to-pink-400 hover:from-pink-700 hover:to-pink-500' }
                      ];
                      
                      return (
                        <>
                          {barData.map((bar, index) => (
                            <div key={index} className="flex flex-col items-center gap-2 flex-1">
                              <div
                                className={`w-full ${bar.colorClass} flex items-start justify-center text-white font-bold text-xs pt-2 rounded-t-lg transition-all`}
                                style={{ height: `${(bar.value / maxValue) * 300}px`, minHeight: '30px' }}
                                title={`${bar.label}: ${bar.value}`}
                              >
                                {bar.value}
                              </div>
                              <span className="text-xs font-semibold text-gray-700 mt-2 text-center break-words">{bar.label}</span>
                            </div>
                          ))}
                        </>
                      );
                    })()}
                  </div>
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
              
              {/* Summary Cards */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Fund State Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
                    <div className="text-blue-700 text-sm mb-1 font-semibold">ORD Grant (415/01)</div>
                    <div className="text-3xl font-bold text-blue-600">₹{fundStateGrantData[0].almt202526.toLocaleString('en-IN')}</div>
                  </div>
                  <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
                    <div className="text-red-700 text-sm mb-1 font-semibold">MT Grant (417/07)</div>
                    <div className="text-3xl font-bold text-red-600">₹{fundStateGrantData[1].almt202526.toLocaleString('en-IN')}</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
                    <div className="text-green-700 text-sm mb-1 font-semibold">IR&D Grant (438/00)</div>
                    <div className="text-3xl font-bold text-green-600">₹{fundStateGrantData[2].almt202526.toLocaleString('en-IN')}</div>
                  </div>
                </div>
              </div>

              {/* Fund State Table */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Fund State Report 2025-26</h2>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-xs">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="border border-gray-400 px-2 py-2 font-semibold text-left">Ser No</th>
                        <th className="border border-gray-400 px-2 py-2 font-semibold text-left">Name of Grant (Code Head)</th>
                        <th className="border border-gray-400 px-2 py-2 font-semibold text-left">Almt 2025-26</th>
                        <th className="border border-gray-400 px-2 py-2 font-semibold text-center" colSpan={2}>No of SO Placed</th>
                        <th className="border border-gray-400 px-2 py-2 font-semibold text-center" colSpan={3}>Expdr</th>
                        <th className="border border-gray-400 px-2 py-2 font-semibold text-left">Bills Submitted to CDA</th>
                        <th className="border border-gray-400 px-2 py-2 font-semibold text-left">Amt Booked by CDA</th>
                        <th className="border border-gray-400 px-2 py-2 font-semibold text-left">Amt Bal</th>
                        <th className="border border-gray-400 px-2 py-2 font-semibold text-left">Remarks</th>
                      </tr>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-400 px-2 py-1"></th>
                        <th className="border border-gray-400 px-2 py-1"></th>
                        <th className="border border-gray-400 px-2 py-1"></th>
                        <th className="border border-gray-400 px-2 py-1 font-semibold text-center">GeM</th>
                        <th className="border border-gray-400 px-2 py-1 font-semibold text-center">Non GeM</th>
                        <th className="border border-gray-400 px-2 py-1 font-semibold text-center">Cost / Expdr</th>
                        <th className="border border-gray-400 px-2 py-1 font-semibold text-center">Total Expdr</th>
                        <th className="border border-gray-400 px-2 py-1"></th>
                        <th className="border border-gray-400 px-2 py-1"></th>
                        <th className="border border-gray-400 px-2 py-1"></th>
                        <th className="border border-gray-400 px-2 py-1"></th>
                        <th className="border border-gray-400 px-2 py-1"></th>
                      </tr>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-400 px-2 py-1"></th>
                        <th className="border border-gray-400 px-2 py-1"></th>
                        <th className="border border-gray-400 px-2 py-1"></th>
                        <th className="border border-gray-400 px-2 py-1"></th>
                        <th className="border border-gray-400 px-2 py-1"></th>
                        <th className="border border-gray-400 px-2 py-1 font-semibold text-center">GeM</th>
                        <th className="border border-gray-400 px-2 py-1 font-semibold text-center">Non GeM</th>
                        <th className="border border-gray-400 px-2 py-1"></th>
                        <th className="border border-gray-400 px-2 py-1"></th>
                        <th className="border border-gray-400 px-2 py-1"></th>
                        <th className="border border-gray-400 px-2 py-1"></th>
                        <th className="border border-gray-400 px-2 py-1"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {fundStateGrantData.map((grant, index) => {
                        const expdrPercentage = ((grant.totalExpdr / grant.almt202526) * 100).toFixed(2);
                        const billsPercentage = grant.billsSubmitted ? ((grant.billsSubmitted / grant.almt202526) * 100).toFixed(2) : '-';
                        const bookedPercentage = grant.amtBooked ? ((grant.amtBooked / grant.almt202526) * 100).toFixed(2) : '-';
                        const balPercentage = ((grant.amtBal / grant.almt202526) * 100).toFixed(2);
                        
                        return (
                          <React.Fragment key={grant.serNo}>
                            <tr className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors`}>
                              <td className="border border-gray-300 px-2 py-2 text-center font-semibold">{grant.serNo}</td>
                              <td className="border border-gray-300 px-2 py-2 font-semibold">{grant.grantName}</td>
                              <td className="border border-gray-300 px-2 py-2 text-right">{grant.almt202526.toLocaleString('en-IN')}</td>
                              <td className="border border-gray-300 px-2 py-2 text-center">{grant.soPlacedGem ?? '-'}</td>
                              <td className="border border-gray-300 px-2 py-2 text-center">{grant.soPlacedNonGem}</td>
                              <td className="border border-gray-300 px-2 py-2 text-right">{grant.expdrGem.toLocaleString('en-IN')}</td>
                              <td className="border border-gray-300 px-2 py-2 text-right">{grant.expdrNonGem.toLocaleString('en-IN')}</td>
                              <td className="border border-gray-300 px-2 py-2 text-right font-semibold">{grant.totalExpdr.toLocaleString('en-IN')}</td>
                              <td className="border border-gray-300 px-2 py-2 text-right">{grant.billsSubmitted.toLocaleString('en-IN')}</td>
                              <td className="border border-gray-300 px-2 py-2 text-right">{grant.amtBooked ? grant.amtBooked.toLocaleString('en-IN') : '-'}</td>
                              <td className={`border border-gray-300 px-2 py-2 text-right font-semibold ${grant.amtBal < 0 ? 'text-red-600' : ''}`}>
                                {grant.amtBal.toLocaleString('en-IN')}
                              </td>
                              <td className="border border-gray-300 px-2 py-2 text-sm">{grant.remarks}</td>
                            </tr>
                            <tr className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} text-xs`}>
                              <td className="border border-gray-300 px-2 py-1"></td>
                              <td className="border border-gray-300 px-2 py-1"></td>
                              <td className="border border-gray-300 px-2 py-1"></td>
                              <td className="border border-gray-300 px-2 py-1"></td>
                              <td className="border border-gray-300 px-2 py-1"></td>
                              <td className="border border-gray-300 px-2 py-1"></td>
                              <td className="border border-gray-300 px-2 py-1 text-right font-semibold">{expdrPercentage}%</td>
                              <td className="border border-gray-300 px-2 py-1 text-right">{billsPercentage}%</td>
                              <td className="border border-gray-300 px-2 py-1 text-right">{bookedPercentage}%</td>
                              <td className="border border-gray-300 px-2 py-1 text-right font-semibold">{balPercentage}%</td>
                              <td className="border border-gray-300 px-2 py-1"></td>
                            </tr>
                          </React.Fragment>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Bar Graph - Grant Allocation vs Expenditure vs Bills Submitted */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Grant Allocation vs Expenditure vs Bills Submitted</h3>
                <div className="flex items-end justify-around h-96 border-l-2 border-b-2 border-gray-400 pl-4 pb-4 mt-4">
                  {fundStateGrantData.map((grant) => {
                    const grantShortName = grant.grantName.split(' ')[0]; // ORD, MT, IR&D
                    const almtHeight = (grant.almt202526 / maxGrantAmount) * 320;
                    const expdrHeight = (Math.abs(grant.totalExpdr) / maxGrantAmount) * 320;
                    const billsHeight = grant.billsSubmitted ? (grant.billsSubmitted / maxGrantAmount) * 320 : 0;
                    
                    return (
                      <div key={grant.serNo} className="flex flex-col items-center gap-2">
                        <div className="flex items-end gap-1">
                          <div
                            className="w-14 bg-blue-500 flex items-start justify-center text-white font-bold text-xs pt-2 rounded-t-lg hover:opacity-80 transition-all"
                            style={{ height: `${almtHeight}px`, minHeight: '30px' }}
                            title={`Allocation: ₹${(grant.almt202526 / 1000000).toFixed(2)}M`}
                          >
                            ₹{(grant.almt202526 / 1000000).toFixed(1)}M
                          </div>
                          <div
                            className={`w-14 ${grant.totalExpdr > grant.almt202526 ? 'bg-red-500' : 'bg-green-500'} flex items-start justify-center text-white font-bold text-xs pt-2 rounded-t-lg hover:opacity-80 transition-all`}
                            style={{ height: `${expdrHeight}px`, minHeight: '30px' }}
                            title={`Expenditure: ₹${(grant.totalExpdr / 1000000).toFixed(2)}M`}
                          >
                            ₹{(grant.totalExpdr / 1000000).toFixed(1)}M
                          </div>
                          {grant.billsSubmitted && (
                            <div
                              className="w-14 bg-orange-500 flex items-start justify-center text-white font-bold text-xs pt-2 rounded-t-lg hover:opacity-80 transition-all"
                              style={{ height: `${billsHeight}px`, minHeight: '30px' }}
                              title={`Bills Submitted: ₹${(grant.billsSubmitted / 1000000).toFixed(2)}M`}
                            >
                              ₹{(grant.billsSubmitted / 1000000).toFixed(1)}M
                            </div>
                          )}
                        </div>
                        <span className="text-xs font-semibold text-gray-700 mt-2 text-center">{grantShortName}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-6 flex justify-center gap-8 flex-wrap">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-500 rounded"></div>
                    <div className="text-sm font-semibold">Allocation</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <div className="text-sm font-semibold">Expenditure (Within Budget)</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded"></div>
                    <div className="text-sm font-semibold">Expenditure (Over Budget)</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-orange-500 rounded"></div>
                    <div className="text-sm font-semibold">Bills Submitted to CDA</div>
                  </div>
                </div>
              </div>
            </div>
          ) : selectedCard === 'daily-output' ? (
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

                      {/* IFA Cases Table */}
                      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">IFA Cases - Detailed List</h3>
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse text-sm">
                            <thead>
                              <tr className="bg-gray-200">
                                <th className="border border-gray-400 px-3 py-2 font-semibold text-left">S.No</th>
                                <th className="border border-gray-400 px-3 py-2 font-semibold text-left">IFA Case No</th>
                                <th className="border border-gray-400 px-3 py-2 font-semibold text-left">LPR/WO No</th>
                                <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Section</th>
                                <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Component</th>
                                <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Issue Date</th>
                                <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Status</th>
                                <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Remarks</th>
                              </tr>
                            </thead>
                            <tbody>
                              {[
                                { sNo: 1, ifaCaseNo: 'IFA/2024/001', lprWoNo: 'LPR/2024/001', section: 'ARD', component: 'Hydraulic Pump', issueDate: '15/01/2024', status: 'Pending', remarks: 'Awaiting vendor response' },
                                { sNo: 2, ifaCaseNo: 'IFA/2024/002', lprWoNo: 'WO/2024/001', section: 'VRD', component: 'Engine Gasket', issueDate: '20/01/2024', status: 'In Progress', remarks: 'Under review' },
                                { sNo: 3, ifaCaseNo: 'IFA/2024/003', lprWoNo: 'LPR/2024/002', section: 'SRD', component: 'Brake Assembly', issueDate: '25/01/2024', status: 'Resolved', remarks: 'Issue resolved' },
                                { sNo: 4, ifaCaseNo: 'IFA/2024/004', lprWoNo: 'WO/2024/002', section: 'ETD', component: 'Transmission Gear', issueDate: '01/02/2024', status: 'Pending', remarks: '' },
                                { sNo: 5, ifaCaseNo: 'IFA/2024/005', lprWoNo: 'LPR/2024/003', section: 'ARMT', component: 'Clutch Plate', issueDate: '05/02/2024', status: 'In Progress', remarks: 'Investigation ongoing' },
                                { sNo: 6, ifaCaseNo: 'IFA/2024/006', lprWoNo: 'WO/2024/003', section: 'T&R', component: 'Suspension Spring', issueDate: '10/02/2024', status: 'Resolved', remarks: 'Closed' },
                                { sNo: 7, ifaCaseNo: 'IFA/2024/007', lprWoNo: 'LPR/2024/004', section: 'ENG', component: 'Cylinder Head', issueDate: '15/02/2024', status: 'Pending', remarks: '' },
                                { sNo: 8, ifaCaseNo: 'IFA/2024/008', lprWoNo: 'WO/2024/004', section: 'INST', component: 'Electrical Harness', issueDate: '20/02/2024', status: 'In Progress', remarks: 'Awaiting parts' },
                                { sNo: 9, ifaCaseNo: 'IFA/2024/009', lprWoNo: 'LPR/2024/005', section: 'VRD', component: 'Oil Filter', issueDate: '25/02/2024', status: 'Resolved', remarks: 'Issue fixed' },
                                { sNo: 10, ifaCaseNo: 'IFA/2024/010', lprWoNo: 'WO/2024/005', section: 'ARD', component: 'Water Pump', issueDate: '01/03/2024', status: 'Pending', remarks: 'Follow up required' }
                              ].map((row, index) => (
                                <tr key={row.sNo} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}>
                                  <td className="border border-gray-300 px-3 py-2 text-center">{row.sNo}</td>
                                  <td className="border border-gray-300 px-3 py-2 font-mono">{row.ifaCaseNo}</td>
                                  <td className="border border-gray-300 px-3 py-2 font-mono">{row.lprWoNo}</td>
                                  <td className="border border-gray-300 px-3 py-2 font-semibold">{row.section}</td>
                                  <td className="border border-gray-300 px-3 py-2">{row.component}</td>
                                  <td className="border border-gray-300 px-3 py-2 text-center">{row.issueDate}</td>
                                  <td className="border border-gray-300 px-3 py-2 text-center">
                                    <span
                                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                                        row.status === 'Resolved'
                                          ? 'bg-green-100 text-green-800'
                                          : row.status === 'In Progress'
                                          ? 'bg-blue-100 text-blue-800'
                                          : 'bg-yellow-100 text-yellow-800'
                                      }`}
                                    >
                                      {row.status}
                                    </span>
                                  </td>
                                  <td className="border border-gray-300 px-3 py-2 text-sm">{row.remarks || '-'}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Pie Chart - IFA Cases by Status */}
                      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">IFA Cases by Status</h3>
                        <div className="flex flex-col items-center">
                          {(() => {
                            const ifaTableData = [
                              { sNo: 1, ifaCaseNo: 'IFA/2024/001', lprWoNo: 'LPR/2024/001', section: 'ARD', component: 'Hydraulic Pump', issueDate: '15/01/2024', status: 'Pending', remarks: 'Awaiting vendor response' },
                              { sNo: 2, ifaCaseNo: 'IFA/2024/002', lprWoNo: 'WO/2024/001', section: 'VRD', component: 'Engine Gasket', issueDate: '20/01/2024', status: 'In Progress', remarks: 'Under review' },
                              { sNo: 3, ifaCaseNo: 'IFA/2024/003', lprWoNo: 'LPR/2024/002', section: 'SRD', component: 'Brake Assembly', issueDate: '25/01/2024', status: 'Resolved', remarks: 'Issue resolved' },
                              { sNo: 4, ifaCaseNo: 'IFA/2024/004', lprWoNo: 'WO/2024/002', section: 'ETD', component: 'Transmission Gear', issueDate: '01/02/2024', status: 'Pending', remarks: '' },
                              { sNo: 5, ifaCaseNo: 'IFA/2024/005', lprWoNo: 'LPR/2024/003', section: 'ARMT', component: 'Clutch Plate', issueDate: '05/02/2024', status: 'In Progress', remarks: 'Investigation ongoing' },
                              { sNo: 6, ifaCaseNo: 'IFA/2024/006', lprWoNo: 'WO/2024/003', section: 'T&R', component: 'Suspension Spring', issueDate: '10/02/2024', status: 'Resolved', remarks: 'Closed' },
                              { sNo: 7, ifaCaseNo: 'IFA/2024/007', lprWoNo: 'LPR/2024/004', section: 'ENG', component: 'Cylinder Head', issueDate: '15/02/2024', status: 'Pending', remarks: '' },
                              { sNo: 8, ifaCaseNo: 'IFA/2024/008', lprWoNo: 'WO/2024/004', section: 'INST', component: 'Electrical Harness', issueDate: '20/02/2024', status: 'In Progress', remarks: 'Awaiting parts' },
                              { sNo: 9, ifaCaseNo: 'IFA/2024/009', lprWoNo: 'LPR/2024/005', section: 'VRD', component: 'Oil Filter', issueDate: '25/02/2024', status: 'Resolved', remarks: 'Issue fixed' },
                              { sNo: 10, ifaCaseNo: 'IFA/2024/010', lprWoNo: 'WO/2024/005', section: 'ARD', component: 'Water Pump', issueDate: '01/03/2024', status: 'Pending', remarks: 'Follow up required' }
                            ];
                            
                            const statusCounts = ifaTableData.reduce((acc: any, item) => {
                              acc[item.status] = (acc[item.status] || 0) + 1;
                              return acc;
                            }, {});
                            
                            const statusData = [
                              { status: 'Pending', count: statusCounts['Pending'] || 0, color: '#eab308' },
                              { status: 'In Progress', count: statusCounts['In Progress'] || 0, color: '#3b82f6' },
                              { status: 'Resolved', count: statusCounts['Resolved'] || 0, color: '#22c55e' }
                            ];
                            
                            const totalStatusCount = statusData.reduce((sum, item) => sum + item.count, 0);
                            const percentages = statusData.map(item => totalStatusCount > 0 ? (item.count / totalStatusCount) * 100 : 0);
                            
                            return (
                              <>
                                <div className="relative w-80 h-80">
                                  <svg viewBox="0 0 200 200" className="w-full h-full">
                                    {(() => {
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
                                            fill={statusData[index].color}
                                            stroke="white"
                                            strokeWidth="2"
                                          />
                                        );
                                      });
                                    })()}
                                    <circle cx="100" cy="100" r="50" fill="white" />
                                    <text x="100" y="95" textAnchor="middle" className="text-2xl font-bold fill-gray-900">
                                      {totalStatusCount}
                                    </text>
                                    <text x="100" y="110" textAnchor="middle" className="text-sm fill-gray-600">
                                      Total Cases
                                    </text>
                                  </svg>
                                </div>
                                <div className="mt-6 flex flex-wrap justify-center gap-6">
                                  {statusData.map((item, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                      <div className="w-4 h-4 rounded" style={{ backgroundColor: item.color }}></div>
                                      <div className="text-sm">
                                        <span className="font-semibold">{item.status}</span>
                                        <span className="text-gray-600 ml-1">({item.count})</span>
                                        <span className="text-gray-500 ml-1">
                                          ({totalStatusCount > 0 ? ((item.count / totalStatusCount) * 100).toFixed(1) : 0}%)
                                        </span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </>
                            );
                          })()}
                        </div>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
          ) : selectedCard === 'dr-summary' ? (
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
                                      className="cursor-pointer hover:opacity-80 transition-opacity"
                                      onClick={() => {
                                        setSelectedSectionForSrd(data.section);
                                        setShowSrdPopup(true);
                                      }}
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
                              <div 
                                key={data.section} 
                                className="border-l-4 border-gray-300 pl-4 cursor-pointer hover:bg-gray-50 transition-colors rounded-lg p-2"
                                onClick={() => {
                                  setSelectedSectionForSrd(data.section);
                                  setShowSrdPopup(true);
                                }}
                              >
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

                    {/* SRD DR Summary Popup Modal */}
                    {showSrdPopup && selectedSectionForSrd && (
                      <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden flex flex-col">
                          {/* Header */}
                          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 flex items-center justify-between shadow-lg">
                            <div>
                              <h3 className="text-2xl font-bold">DR Summary - {selectedSectionForSrd} Section</h3>
                              <p className="text-blue-100 text-sm mt-1">Defect Report Summary for {selectedSectionForSrd}</p>
                            </div>
                            <button
                              onClick={() => {
                                setShowSrdPopup(false);
                                setSelectedSectionForSrd('');
                              }}
                              className="text-white hover:text-blue-200 transition-colors p-2 rounded-full hover:bg-white hover:bg-opacity-20"
                            >
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>

                          {/* SRD DR Summary Table Content */}
                          <div className="flex-1 overflow-y-auto p-6">
                            {(() => {
                              // DR Table Data for SRD DR Summary
                              const drTableDataForSrd = [
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

                              // Generate SRD DR Summary data for the selected section based on existing DR table
                              const sectionDrSummaryData = drTableDataForSrd.filter((_, index) => {
                                // Filter data based on section - for SRD section, show items that match SRD pattern
                                // For demo, we'll show a subset of DR data
                                if (selectedSectionForSrd === 'SRD') {
                                  return index < 5; // Show first 5 items for SRD
                                } else if (selectedSectionForSrd === 'ARD') {
                                  return index >= 1 && index < 4; // Show items 1-3 for ARD
                                } else if (selectedSectionForSrd === 'VRD') {
                                  return index >= 0 && index < 3; // Show items 0-2 for VRD
                                } else if (selectedSectionForSrd === 'ETD') {
                                  return index >= 2 && index < 6; // Show items 2-5 for ETD
                                } else if (selectedSectionForSrd === 'T&R') {
                                  return index >= 4 && index < 7; // Show items 4-6 for T&R
                                } else {
                                  return index >= 7; // Show remaining items for Others
                                }
                              }).map((dr, index) => ({
                                serNo: index + 1,
                                drNumber: dr.drNumber,
                                nomenclature: dr.nomenclature,
                                typeOfDefect: dr.typeOfDefect,
                                dateReported: `2024-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
                                status: ['Open', 'In Progress', 'Resolved', 'Closed'][Math.floor(Math.random() * 4)],
                                priority: ['High', 'Medium', 'Low'][Math.floor(Math.random() * 3)],
                                remarks: dr.remarks
                              }));

                              return (
                                <div className="overflow-x-auto">
                                  <div className="mb-4">
                                    <div className="text-center font-bold text-lg mb-2">Defect Report Summary</div>
                                    <div className="text-sm text-gray-600 mb-4 text-center">PY 2024-25 - {selectedSectionForSrd} Section</div>
                                  </div>
                                  <table className="w-full border-collapse text-sm">
                                    <thead>
                                      <tr className="bg-gray-200">
                                        <th className="border border-gray-400 px-4 py-3 font-semibold text-left">Ser No</th>
                                        <th className="border border-gray-400 px-4 py-3 font-semibold text-left">DR Number</th>
                                        <th className="border border-gray-400 px-4 py-3 font-semibold text-left">Nomenclature</th>
                                        <th className="border border-gray-400 px-4 py-3 font-semibold text-left">Type of Defect</th>
                                        <th className="border border-gray-400 px-4 py-3 font-semibold text-left">Date Reported</th>
                                        <th className="border border-gray-400 px-4 py-3 font-semibold text-left">Status</th>
                                        <th className="border border-gray-400 px-4 py-3 font-semibold text-left">Priority</th>
                                        <th className="border border-gray-400 px-4 py-3 font-semibold text-left">Remarks</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {sectionDrSummaryData.map((item, index) => (
                                        <tr 
                                          key={item.serNo}
                                          className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}
                                        >
                                          <td className="border border-gray-300 px-4 py-2 text-center">{item.serNo}</td>
                                          <td className="border border-gray-300 px-4 py-2 font-mono text-xs">{item.drNumber}</td>
                                          <td className="border border-gray-300 px-4 py-2">{item.nomenclature}</td>
                                          <td className="border border-gray-300 px-4 py-2">{item.typeOfDefect}</td>
                                          <td className="border border-gray-300 px-4 py-2">{item.dateReported}</td>
                                          <td className="border border-gray-300 px-4 py-2">
                                            <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                              item.status === 'Resolved' || item.status === 'Closed' ? 'bg-green-100 text-green-800' :
                                              item.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                                              'bg-red-100 text-red-800'
                                            }`}>
                                              {item.status}
                                            </span>
                                          </td>
                                          <td className="border border-gray-300 px-4 py-2">
                                            <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                              item.priority === 'High' ? 'bg-red-100 text-red-800' :
                                              item.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                              'bg-green-100 text-green-800'
                                            }`}>
                                              {item.priority}
                                            </span>
                                          </td>
                                          <td className="border border-gray-300 px-4 py-2 text-xs">{item.remarks}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              );
                            })()}
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          ) : selectedCard === 'abc-analysis' ? (
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

              {/* ABC Analysis MT Grant 2024-25 */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">ABC ANALYSIS MT GRANT 2024-25</h2>
                
                {/* Table */}
                <div className="mb-8 overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="border border-gray-400 px-4 py-3 font-semibold text-left">TYPES OF ITEMS</th>
                        <th className="border border-gray-400 px-4 py-3 font-semibold text-left">EXP (IN LAKHS)</th>
                        <th className="border border-gray-400 px-4 py-3 font-semibold text-left">RANGE OF ITEMS</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-4 py-2 font-semibold">A ITEMS (70%)</td>
                        <td className="border border-gray-300 px-4 py-2 text-right">144.22</td>
                        <td className="border border-gray-300 px-4 py-2 text-right">29</td>
                      </tr>
                      <tr className="hover:bg-gray-50 bg-gray-50">
                        <td className="border border-gray-300 px-4 py-2 font-semibold">B ITEMS (20%)</td>
                        <td className="border border-gray-300 px-4 py-2 text-right">41.13</td>
                        <td className="border border-gray-300 px-4 py-2 text-right">47</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-4 py-2 font-semibold">C ITEMS (10%)</td>
                        <td className="border border-gray-300 px-4 py-2 text-right">20.33</td>
                        <td className="border border-gray-300 px-4 py-2 text-right">153</td>
                      </tr>
                      <tr className="bg-gray-200 font-bold">
                        <td className="border border-gray-400 px-4 py-2">TOTAL</td>
                        <td className="border border-gray-400 px-4 py-2 text-right">205.68</td>
                        <td className="border border-gray-400 px-4 py-2 text-right">229</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Grouped Bar Chart */}
                <div className="mt-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">ABC Analysis Chart - MT Grant 2024-25</h3>
                  <div className="flex items-end justify-around h-96 border-l-2 border-b-2 border-gray-400 pl-4 pb-4 gap-4">
                    {(() => {
                      const mtGrantData = [
                        { type: 'A ITEMS (70%)', exp: 144.22, range: 29 },
                        { type: 'B ITEMS (20%)', exp: 41.13, range: 47 },
                        { type: 'C ITEMS (10%)', exp: 20.33, range: 153 }
                      ];
                      const maxValue = Math.max(...mtGrantData.flatMap(d => [d.exp, d.range]), 1);
                      
                      return (
                        <>
                          {mtGrantData.map((data, index) => (
                            <div key={index} className="flex flex-col items-center gap-2 flex-1">
                              <div className="flex items-end gap-2 w-full justify-center">
                                {/* EXP (IN LAKHS) Bar */}
                                <div className="flex flex-col items-center gap-1 flex-1">
                                  <div
                                    className="w-full bg-gradient-to-t from-gray-700 to-gray-600 flex items-start justify-center text-white font-bold text-xs pt-2 rounded-t-lg hover:from-gray-800 hover:to-gray-700 transition-all"
                                    style={{ height: `${(data.exp / maxValue) * 350}px`, minHeight: '30px' }}
                                    title={`EXP (IN LAKHS): ${data.exp}`}
                                  >
                                    {data.exp}
                                  </div>
                                </div>
                                {/* RANGE OF ITEMS Bar */}
                                <div className="flex flex-col items-center gap-1 flex-1">
                                  <div
                                    className="w-full bg-gradient-to-t from-gray-500 to-gray-400 flex items-start justify-center text-white font-bold text-xs pt-2 rounded-t-lg hover:from-gray-600 hover:to-gray-500 transition-all"
                                    style={{ height: `${(data.range / maxValue) * 350}px`, minHeight: '30px' }}
                                    title={`RANGE OF ITEMS: ${data.range}`}
                                  >
                                    {data.range}
                                  </div>
                                </div>
                              </div>
                              <span className="text-xs font-semibold text-gray-700 mt-2 text-center break-words">{data.type}</span>
                            </div>
                          ))}
                        </>
                      );
                    })()}
                  </div>
                  {/* Legend */}
                  <div className="mt-6 flex justify-center gap-6">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-gray-700 rounded"></div>
                      <span className="text-sm font-semibold text-gray-700">EXP (IN LAKHS)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-gray-500 rounded"></div>
                      <span className="text-sm font-semibold text-gray-700">RANGE OF ITEMS</span>
                    </div>
                  </div>
                </div>
                  </div>

              {/* ABC Analysis ORD Grant 2024-25 */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">ABC ANALYSIS ORD GRANT 2024-25</h2>
                
                {/* Table */}
                <div className="mb-8 overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="border border-gray-400 px-4 py-3 font-semibold text-left">TYPES OF ITEMS</th>
                        <th className="border border-gray-400 px-4 py-3 font-semibold text-left">EXP (IN LAKHS)</th>
                        <th className="border border-gray-400 px-4 py-3 font-semibold text-left">RANGE OF ITEMS</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-4 py-2 font-semibold">A ITEMS (70%)</td>
                        <td className="border border-gray-300 px-4 py-2 text-right">157.09</td>
                        <td className="border border-gray-300 px-4 py-2 text-right">91</td>
                      </tr>
                      <tr className="hover:bg-gray-50 bg-gray-50">
                        <td className="border border-gray-300 px-4 py-2 font-semibold">B ITEMS (20%)</td>
                        <td className="border border-gray-300 px-4 py-2 text-right">44.85</td>
                        <td className="border border-gray-300 px-4 py-2 text-right">142</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-4 py-2 font-semibold">C ITEMS (10%)</td>
                        <td className="border border-gray-300 px-4 py-2 text-right">22.06</td>
                        <td className="border border-gray-300 px-4 py-2 text-right">465</td>
                      </tr>
                      <tr className="bg-gray-200 font-bold">
                        <td className="border border-gray-400 px-4 py-2">TOTAL</td>
                        <td className="border border-gray-400 px-4 py-2 text-right">224.00</td>
                        <td className="border border-gray-400 px-4 py-2 text-right">698</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Grouped Bar Chart */}
                <div className="mt-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">ABC Analysis Chart - ORD Grant 2024-25</h3>
                  <div className="flex items-end justify-around h-96 border-l-2 border-b-2 border-gray-400 pl-4 pb-4 gap-4">
                    {(() => {
                      const ordGrantData = [
                        { type: 'A ITEMS (70%)', exp: 157.09, range: 91 },
                        { type: 'B ITEMS (20%)', exp: 44.85, range: 142 },
                        { type: 'C ITEMS (10%)', exp: 22.06, range: 465 }
                      ];
                      const maxValue = Math.max(...ordGrantData.flatMap(d => [d.exp, d.range]), 1);
                      
                      return (
                        <>
                          {ordGrantData.map((data, index) => (
                            <div key={index} className="flex flex-col items-center gap-2 flex-1">
                              <div className="flex items-end gap-2 w-full justify-center">
                                {/* EXP (IN LAKHS) Bar */}
                                <div className="flex flex-col items-center gap-1 flex-1">
                                  <div
                                    className="w-full bg-gradient-to-t from-gray-700 to-gray-600 flex items-start justify-center text-white font-bold text-xs pt-2 rounded-t-lg hover:from-gray-800 hover:to-gray-700 transition-all"
                                    style={{ height: `${(data.exp / maxValue) * 350}px`, minHeight: '30px' }}
                                    title={`EXP (IN LAKHS): ${data.exp}`}
                                  >
                                    {data.exp}
                      </div>
                                </div>
                                {/* RANGE OF ITEMS Bar */}
                                <div className="flex flex-col items-center gap-1 flex-1">
                                  <div
                                    className="w-full bg-gradient-to-t from-gray-500 to-gray-400 flex items-start justify-center text-white font-bold text-xs pt-2 rounded-t-lg hover:from-gray-600 hover:to-gray-500 transition-all"
                                    style={{ height: `${(data.range / maxValue) * 350}px`, minHeight: '30px' }}
                                    title={`RANGE OF ITEMS: ${data.range}`}
                                  >
                                    {data.range}
                                  </div>
                                </div>
                              </div>
                              <span className="text-xs font-semibold text-gray-700 mt-2 text-center break-words">{data.type}</span>
                    </div>
                  ))}
                        </>
                      );
                    })()}
                </div>
                  {/* Legend */}
                  <div className="mt-6 flex justify-center gap-6">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-gray-700 rounded"></div>
                      <span className="text-sm font-semibold text-gray-700">EXP (IN LAKHS)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-gray-500 rounded"></div>
                      <span className="text-sm font-semibold text-gray-700">RANGE OF ITEMS</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : selectedCard === 'srb' ? (
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

              {/* SRB Summary Section */}
              {(() => {
                // SRB Data from MPO Dashboard
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

                // Calculate Summary Metrics
                const totalItems = srbData.length;
                const totalDepthReqd = srbData.reduce((sum, item) => sum + item.depthReqd, 0);
                const totalVirItems = srbData.reduce((sum, item) => sum + item.virTotal, 0);
                const totalIssueDepth = srbData.reduce((sum, item) => sum + item.totalDepth, 0);
                const itemsWithScaleChange = srbData.filter(item => item.changeInScaleAuth !== 'No Change').length;
                const totalNewLP = srbData.reduce((sum, item) => sum + item.newLPDepth, 0);
                const totalNewLM = srbData.reduce((sum, item) => sum + item.newLMDepth, 0);
                const totalRepaired = srbData.reduce((sum, item) => sum + item.repairedDepth, 0);
                const totalReclaimed = srbData.reduce((sum, item) => sum + item.reclaimedDepth, 0);
                const avgScale = Math.round(srbData.reduce((sum, item) => sum + item.scale, 0) / totalItems);

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
                            <p className="text-indigo-100 text-sm font-semibold mb-1">Scale Changes</p>
                            <p className="text-3xl font-bold">{itemsWithScaleChange}</p>
                          </div>
                          <div className="bg-white bg-opacity-20 rounded-full p-3">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* SRB Summary Table */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">SRB Summary - PY 2024-25 (ARD SEC)</h3>
                      <div className="mb-4 text-sm text-gray-600">
                        <p>OH Output: 59 vehicles | Total Items: {totalItems}</p>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-sm">
                          <thead>
                            <tr className="bg-gray-200">
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Ser No</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">OHS No</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Part No</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-left">Nomenclature</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-center">Scale</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-center">Depth Reqd</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-center">VIR Total</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-center">New LP</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-center">New LM</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-center">Repaired</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-center">Reclaimed</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-center">Total Depth</th>
                              <th className="border border-gray-400 px-3 py-2 font-semibold text-center">Scale Change</th>
                            </tr>
                          </thead>
                          <tbody>
                            {srbData.map((item, index) => (
                              <tr key={item.serNo} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}>
                                <td className="border border-gray-300 px-3 py-2 text-center">{item.serNo}</td>
                                <td className="border border-gray-300 px-3 py-2 text-center">{item.ohsNo}</td>
                                <td className="border border-gray-300 px-3 py-2 font-mono text-xs">{item.partNo}</td>
                                <td className="border border-gray-300 px-3 py-2">{item.nomenclature}</td>
                                <td className="border border-gray-300 px-3 py-2 text-center">{item.scale}</td>
                                <td className="border border-gray-300 px-3 py-2 text-center font-semibold">{item.depthReqd}</td>
                                <td className="border border-gray-300 px-3 py-2 text-center">{item.virTotal}</td>
                                <td className="border border-gray-300 px-3 py-2 text-center">{item.newLPDepth}</td>
                                <td className="border border-gray-300 px-3 py-2 text-center">{item.newLMDepth}</td>
                                <td className="border border-gray-300 px-3 py-2 text-center">{item.repairedDepth}</td>
                                <td className="border border-gray-300 px-3 py-2 text-center">{item.reclaimedDepth}</td>
                                <td className="border border-gray-300 px-3 py-2 text-center font-semibold text-blue-600">{item.totalDepth}</td>
                                <td className="border border-gray-300 px-3 py-2 text-center text-xs">{item.changeInScaleAuth}</td>
                              </tr>
                            ))}
                            {/* Grand Total Row */}
                            <tr className="bg-gray-200 font-bold">
                              <td className="border border-gray-400 px-3 py-2 text-center" colSpan={5}>Grand Total</td>
                              <td className="border border-gray-400 px-3 py-2 text-center">{totalDepthReqd}</td>
                              <td className="border border-gray-400 px-3 py-2 text-center">{totalVirItems}</td>
                              <td className="border border-gray-400 px-3 py-2 text-center">{totalNewLP}</td>
                              <td className="border border-gray-400 px-3 py-2 text-center">{totalNewLM}</td>
                              <td className="border border-gray-400 px-3 py-2 text-center">{totalRepaired}</td>
                              <td className="border border-gray-400 px-3 py-2 text-center">{totalReclaimed}</td>
                              <td className="border border-gray-400 px-3 py-2 text-center text-blue-600">{totalIssueDepth}</td>
                              <td className="border border-gray-400 px-3 py-2 text-center">-</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          ) : selectedCard === 'misc' ? (
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
              
              {/* MISC Content */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">MISC - Miscellaneous</h2>
                <p className="text-gray-600 mb-6">
                  Miscellaneous items and information will be displayed here.
                </p>
                <div className="border-t pt-6">
                  <p className="text-gray-500 italic">MISC content coming soon...</p>
                </div>
              </div>
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

      {/* Floating Action Buttons Container */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-4">
        {/* Notification Button */}
        <button
          onClick={() => setIsNotificationOpen(!isNotificationOpen)}
          className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-full p-4 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center group relative"
          aria-label="View notifications"
        >
          <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          {lprNotifications.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-yellow-400 text-red-900 text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
              {lprNotifications.length}
            </span>
          )}
        </button>

        {/* Chatbot Floating Button */}
        {!isChatbotOpen && (
          <button
            onClick={() => setIsChatbotOpen(true)}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-full p-4 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center group"
            aria-label="Open chatbot"
          >
            <svg className="w-6 h-6 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </button>
        )}
      </div>

      {/* Notification Panel */}
      {isNotificationOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-40 transition-opacity"
            onClick={() => setIsNotificationOpen(false)}
          ></div>
          
          {/* Notification Panel */}
          <div className="fixed right-6 bottom-24 w-full sm:w-96 bg-white shadow-2xl z-50 rounded-xl overflow-hidden transform transition-all duration-300 ease-in-out max-h-[600px] flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6 flex items-center justify-between shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Alerts & Notifications</h3>
                  <p className="text-xs text-red-100">
                    {lprNotifications.length > 0 ? `${lprNotifications.length} active alert${lprNotifications.length > 1 ? 's' : ''}` : 'No alerts'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsNotificationOpen(false)}
                className="text-white hover:text-red-200 transition-colors p-1 rounded-full hover:bg-white hover:bg-opacity-20"
                aria-label="Close notifications"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Notifications Container */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              {lprNotifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center px-4 py-12">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">No Alerts</h4>
                  <p className="text-sm text-gray-600">You're all caught up! No pending alerts.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {lprNotifications.map((notification, index) => (
                    <div key={index} className={`bg-white border-l-4 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow ${
                      notification.type === 'dr-summary' ? 'border-orange-500' : 'border-red-500'
                    }`}>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <div className={`rounded-full p-1.5 ${
                              notification.type === 'dr-summary' ? 'bg-orange-100' : 'bg-red-100'
                            }`}>
                              <svg className={`w-4 h-4 ${notification.type === 'dr-summary' ? 'text-orange-600' : 'text-red-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                              </svg>
                            </div>
                            <p className="font-bold text-gray-900">
                              {notification.type === 'dr-summary' ? (
                                <>DR Summary - <span className="text-orange-600">{notification.section}</span> Section</>
                              ) : (
                                <>LPR: <span className="text-red-600">{notification.originatorNo}</span></>
                              )}
                            </p>
                          </div>
                          <p className="text-sm text-gray-700 mb-2">
                            {notification.type === 'dr-summary' ? (
                              notification.message
                            ) : (
                              <>This LPR has been pending for <span className="font-bold text-red-600">{notification.totalDays} days</span>, exceeding the 90-day threshold.</>
                            )}
                          </p>
                          <p className="text-xs text-gray-500">
                            Alert: {new Date(notification.date).toLocaleString()}
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            handleDismissNotification(notification.type === 'dr-summary' ? (notification.section || String(index)) : (notification.originatorNo || String(index)));
                            if (lprNotifications.length === 1) {
                              setIsNotificationOpen(false);
                            }
                          }}
                          className="ml-2 text-gray-400 hover:text-red-600 transition-colors p-1"
                          title="Dismiss this notification"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer Actions */}
            {lprNotifications.length > 0 && (
              <div className="border-t border-gray-200 bg-white p-4">
                <button
                  onClick={() => {
                    handleDismissAllNotifications();
                    setIsNotificationOpen(false);
                  }}
                  className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors text-sm flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Dismiss All Alerts
                </button>
              </div>
            )}
          </div>
        </>
      )}

      {/* Chatbot Side Panel */}
      {isChatbotOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-40 transition-opacity"
            onClick={() => setIsChatbotOpen(false)}
          ></div>
          
          {/* Side Panel */}
          <div className={`fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
            isChatbotOpen ? 'translate-x-0' : 'translate-x-full'
          } flex flex-col`}>
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 flex items-center justify-between shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Dashboard Assistant</h3>
                  <p className="text-xs text-blue-100">GM WKS MTRL Support</p>
                </div>
              </div>
              <button
                onClick={() => setIsChatbotOpen(false)}
                className="text-white hover:text-blue-200 transition-colors p-1 rounded-full hover:bg-white hover:bg-opacity-20"
                aria-label="Close chatbot"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
              {chatMessages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center px-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">Welcome to Dashboard Assistant</h4>
                  <p className="text-sm text-gray-600 mb-4">I'm here to help you navigate the GM WKS MTRL dashboard. Ask me anything!</p>
                  <div className="space-y-2 w-full">
                    <button
                      onClick={() => {
                        setChatInput("How do I view LP Status?");
                        setTimeout(() => handleSendMessage(), 100);
                      }}
                      className="w-full text-left px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors text-sm text-gray-700"
                    >
                      💡 How do I view LP Status?
                    </button>
                    <button
                      onClick={() => {
                        setChatInput("What is the Fund State?");
                        setTimeout(() => handleSendMessage(), 100);
                      }}
                      className="w-full text-left px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors text-sm text-gray-700"
                    >
                      💰 What is the Fund State?
                    </button>
                    <button
                      onClick={() => {
                        setChatInput("How to check Critical Items?");
                        setTimeout(() => handleSendMessage(), 100);
                      }}
                      className="w-full text-left px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors text-sm text-gray-700"
                    >
                      ⚠️ How to check Critical Items?
                    </button>
                  </div>
                </div>
              ) : (
                chatMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                        message.sender === 'user'
                          ? 'bg-blue-600 text-white rounded-br-sm'
                          : 'bg-white text-gray-800 border border-gray-200 rounded-bl-sm shadow-sm'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.text}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender === 'user' ? 'text-blue-100' : 'text-gray-400'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-200 bg-white p-4">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={chatInput.trim() === ''}
                  className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                  aria-label="Send message"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      </React.Fragment>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* LPR Notification Popup - Top Right */}
        {showNotification && lprNotifications.length > 0 && (
          <div className="fixed top-4 right-4 z-50 max-w-md w-full mx-4">
            <div className="bg-white rounded-xl shadow-2xl border-2 border-red-500 p-6 animate-slide-in">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-red-100 rounded-full p-2">
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-red-600">LPR Alert</h3>
                </div>
                <button
                  onClick={handleDismissAllNotifications}
                  className="text-gray-400 hover:text-gray-600 transition"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {lprNotifications.map((notification, index) => (
                  <div key={index} className={`border rounded-lg p-4 ${
                    notification.type === 'dr-summary' ? 'bg-orange-50 border-orange-200' : 'bg-red-50 border-red-200'
                  }`}>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 mb-1">
                          {notification.type === 'dr-summary' ? (
                            <>DR Summary - <span className="text-orange-600">{notification.section}</span> Section</>
                          ) : (
                            <>LPR: <span className="text-red-600">{notification.originatorNo}</span></>
                          )}
                        </p>
                        <p className="text-sm text-gray-700">
                          {notification.type === 'dr-summary' ? (
                            notification.message || 'DR Summary alert for section'
                          ) : (
                            <>This LPR has been pending for <span className="font-bold text-red-600">{notification.totalDays} days</span>, exceeding the 90-day threshold.</>
                          )}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Alert generated: {new Date(notification.date).toLocaleString()}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDismissNotification(notification.type === 'dr-summary' ? (notification.section || String(index)) : (notification.originatorNo || String(index)))}
                        className="ml-2 text-gray-400 hover:text-gray-600 transition"
                        title="Dismiss this notification"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {lprNotifications.length > 1 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <button
                    onClick={handleDismissAllNotifications}
                    className="w-full px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-semibold transition-colors text-sm"
                  >
                    Dismiss All
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/gm-wks-mtrl-dashboard')}
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back</span>
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

      {/* Floating Action Buttons Container */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-4">
        {/* Notification Button */}
        <button
          onClick={() => setIsNotificationOpen(!isNotificationOpen)}
          className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-full p-4 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center group relative"
          aria-label="View notifications"
        >
          <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          {lprNotifications.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-yellow-400 text-red-900 text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
              {lprNotifications.length}
            </span>
          )}
        </button>

        {/* Chatbot Floating Button */}
        {!isChatbotOpen && (
          <button
            onClick={() => setIsChatbotOpen(true)}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-full p-4 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center group"
            aria-label="Open chatbot"
          >
            <svg className="w-6 h-6 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </button>
        )}
      </div>

      {/* Notification Panel */}
      {isNotificationOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-40 transition-opacity"
            onClick={() => setIsNotificationOpen(false)}
          ></div>
          
          {/* Notification Panel */}
          <div className="fixed right-6 bottom-24 w-full sm:w-96 bg-white shadow-2xl z-50 rounded-xl overflow-hidden transform transition-all duration-300 ease-in-out max-h-[600px] flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6 flex items-center justify-between shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Alerts & Notifications</h3>
                  <p className="text-xs text-red-100">
                    {lprNotifications.length > 0 ? `${lprNotifications.length} active alert${lprNotifications.length > 1 ? 's' : ''}` : 'No alerts'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsNotificationOpen(false)}
                className="text-white hover:text-red-200 transition-colors p-1 rounded-full hover:bg-white hover:bg-opacity-20"
                aria-label="Close notifications"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Notifications Container */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              {lprNotifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center px-4 py-12">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">No Alerts</h4>
                  <p className="text-sm text-gray-600">You're all caught up! No pending alerts.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {lprNotifications.map((notification, index) => (
                    <div key={index} className={`bg-white border-l-4 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow ${
                      notification.type === 'dr-summary' ? 'border-orange-500' : 'border-red-500'
                    }`}>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <div className={`rounded-full p-1.5 ${
                              notification.type === 'dr-summary' ? 'bg-orange-100' : 'bg-red-100'
                            }`}>
                              <svg className={`w-4 h-4 ${notification.type === 'dr-summary' ? 'text-orange-600' : 'text-red-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                              </svg>
                            </div>
                            <p className="font-bold text-gray-900">
                              {notification.type === 'dr-summary' ? (
                                <>DR Summary - <span className="text-orange-600">{notification.section}</span> Section</>
                              ) : (
                                <>LPR: <span className="text-red-600">{notification.originatorNo}</span></>
                              )}
                            </p>
                          </div>
                          <p className="text-sm text-gray-700 mb-2">
                            {notification.type === 'dr-summary' ? (
                              notification.message
                            ) : (
                              <>This LPR has been pending for <span className="font-bold text-red-600">{notification.totalDays} days</span>, exceeding the 90-day threshold.</>
                            )}
                          </p>
                          <p className="text-xs text-gray-500">
                            Alert: {new Date(notification.date).toLocaleString()}
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            handleDismissNotification(notification.type === 'dr-summary' ? (notification.section || String(index)) : (notification.originatorNo || String(index)));
                            if (lprNotifications.length === 1) {
                              setIsNotificationOpen(false);
                            }
                          }}
                          className="ml-2 text-gray-400 hover:text-red-600 transition-colors p-1"
                          title="Dismiss this notification"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer Actions */}
            {lprNotifications.length > 0 && (
              <div className="border-t border-gray-200 bg-white p-4">
                <button
                  onClick={() => {
                    handleDismissAllNotifications();
                    setIsNotificationOpen(false);
                  }}
                  className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors text-sm flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Dismiss All Alerts
                </button>
              </div>
            )}
          </div>
        </>
      )}

      {/* Chatbot Side Panel */}
      {isChatbotOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-40 transition-opacity"
            onClick={() => setIsChatbotOpen(false)}
          ></div>
          
          {/* Side Panel */}
          <div className={`fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
            isChatbotOpen ? 'translate-x-0' : 'translate-x-full'
          } flex flex-col`}>
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 flex items-center justify-between shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Dashboard Assistant</h3>
                  <p className="text-xs text-blue-100">GM WKS MTRL Support</p>
                </div>
              </div>
              <button
                onClick={() => setIsChatbotOpen(false)}
                className="text-white hover:text-blue-200 transition-colors p-1 rounded-full hover:bg-white hover:bg-opacity-20"
                aria-label="Close chatbot"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
              {chatMessages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center px-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">Welcome to Dashboard Assistant</h4>
                  <p className="text-sm text-gray-600 mb-4">I'm here to help you navigate the GM WKS MTRL dashboard. Ask me anything!</p>
                  <div className="space-y-2 w-full">
                    <button
                      onClick={() => {
                        setChatInput("How do I view LP Status?");
                        setTimeout(() => handleSendMessage(), 100);
                      }}
                      className="w-full text-left px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors text-sm text-gray-700"
                    >
                      💡 How do I view LP Status?
                    </button>
                    <button
                      onClick={() => {
                        setChatInput("What is the Fund State?");
                        setTimeout(() => handleSendMessage(), 100);
                      }}
                      className="w-full text-left px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors text-sm text-gray-700"
                    >
                      💰 What is the Fund State?
                    </button>
                    <button
                      onClick={() => {
                        setChatInput("How to check Critical Items?");
                        setTimeout(() => handleSendMessage(), 100);
                      }}
                      className="w-full text-left px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors text-sm text-gray-700"
                    >
                      ⚠️ How to check Critical Items?
                    </button>
                  </div>
                </div>
              ) : (
                chatMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                        message.sender === 'user'
                          ? 'bg-blue-600 text-white rounded-br-sm'
                          : 'bg-white text-gray-800 border border-gray-200 rounded-bl-sm shadow-sm'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.text}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender === 'user' ? 'text-blue-100' : 'text-gray-400'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-200 bg-white p-4">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={chatInput.trim() === ''}
                  className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                  aria-label="Send message"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
