# MCO Dashboard - Complete Report
## 512 Army Base Workshop ERP System

---

## Report Important Points

### 1) What is MCO?

**MCO** stands for **Material Control Organization**. It is a critical module within the 512 Army Base Workshop ERP system that manages and controls all material-related operations, inventory tracking, and material planning activities.

MCO is responsible for:
- Managing material inventory and stock levels
- Tracking material requisitions and purchase orders
- Monitoring material flow from requisition to delivery
- Generating reports on material status and availability
- Coordinating between different sections for material requirements
- Managing IIL (Indent Issue List) and CVIL (Critical Vendor Issue List)
- Handling OHS (On Hand Stock) management
- Processing defect reports and VIR (Vendor Inspection Report)
- Managing material returns and reporting

MCO operates under the **GM WKS MTRL (General Manager Workshop Material)** hierarchy and works closely with various sections to ensure smooth material flow for workshop operations.

---

### 2) Who all in the Higher Authority does MCO concern with?

MCO interacts with the following higher authorities in the organizational hierarchy:

#### **Top Level:**
- **Comd & MD (Commander & Managing Director)** - The highest authority in the 512 Army Base Workshop

#### **General Manager Level:**
- **GM WKS MTRL (General Manager Workshop Material)** - Direct reporting authority for MCO
- **GM Prod (General Manager Production)** - Coordinates material requirements for production
- **GM WKS (Tech) (General Manager Workshop Technical)** - Technical coordination
- **GM Admin (General Manager Administration)** - Administrative oversight

#### **Deputy General Manager Level:**
- **DGM WKS MTRL (Deputy General Manager Workshop Material)** - Direct supervisor for MCO operations
- **DGM Purchase (Deputy General Manager Purchase)** - Coordinates purchase activities
- **DGM Prod (Deputy General Manager Production)** - Production material coordination

#### **Section Level:**
- **Section Incharge** - Direct operational interface for material requirements

#### **Other Departments:**
- **DGM Purchase** - For purchase order processing
- **LPO (Local Purchase Order)** - For local purchase requisitions
- **LPS (Local Purchase Section)** - For purchase section operations
- **ESS (Equipment Support Section)** - For equipment-related material support
- **MPO (Material Planning Organization)** - For material planning coordination

---

### 3) What all are the Sections in the MCO?

MCO consists of the following main sections/modules:

#### **Primary Sections:**
1. **IIL Management** - Indent Issue List management
2. **CVIL Management** - Critical Vendor Issue List management
3. **OHS** - On Hand Stock management
4. **Report & Return** - Reporting and material return processing
5. **Defect Report** - Defect reporting and tracking
6. **VIR** - Vendor Inspection Report

#### **Supporting Modules:**
- **LPO (Local Purchase Order)** - Handles local purchase requisitions
- **LPS (Local Purchase Section)** - Manages purchase section operations
- **ESS (Equipment Support Section)** - Equipment support operations
- **MPO (Material Planning Organization)** - Material planning and coordination

#### **Workshop Sections (Material Consumers):**
1. **VRD** - Vehicle Repair Division
2. **ARD** - Armament Repair Division
3. **SRD** - Small Repair Division
4. **ETD** - Electronics & Technical Division
5. **TAR** - Technical & Assembly Repair

#### **GM WKS MTRL Supporting Sections:**
1. **TT Cell** - Tooling & Technology Cell
2. **QA** - Quality Assurance
3. **MCO** - Material Control Organization
4. **PP&C** - Production Planning & Control
5. **ME Cell** - Manufacturing Engineering Cell

#### **Offices (Material Providers/Coordinators):**
1. **CAFVD** - Central Army Field Vehicle Depot
2. **AGD** - Armament General Depot
3. **DLD** - Depot Logistics Division
4. **223 ABOD** - 223 Army Base Ordnance Depot
5. **JOD** - Joint Ordnance Depot

---

### 4) Information about the Sections

#### **A. IIL Management (Indent Issue List)**
- **Purpose**: Manages the Indent Issue List which tracks materials requested from various depots and offices
- **Functionality**:
  - Tracks IIL receipt status (Yes/No)
  - Manages material nomenclature and part numbers
  - Monitors OHS (On Hand Stock) scales
  - Filters by Planning Year and Office
  - Tracks NR/R (Non-Recurring/Recurring) status
- **Key Features**:
  - Summary cards showing total items, IIL received, pending items, and active offices
  - Filterable by Planning Year (PY-2025-26, PY-2026-27) and Office (CAFVD, AGD, DLD, 223 ABOD, JOD)
  - Displays CT (Component Type), NR/R status, IIL receipt status, nomenclature, and OHS scale

#### **B. CVIL Management (Critical Vendor Issue List)**
- **Purpose**: Manages critical items that have not been received in IIL (marked as "No")
- **Functionality**:
  - Tracks items pending from IIL
  - Monitors critical vendor issues
  - Manages urgent material requirements
- **Key Features**:
  - Shows items that were marked as "No" in IIL Management
  - Filterable by Planning Year and Office
  - Summary statistics for total CVIL items, active offices, and planning years

#### **C. OHS (On Hand Stock)**
- **Purpose**: Manages and tracks On Hand Stock levels for materials
- **Functionality**:
  - Monitors current stock levels
  - Tracks OHS scales (e.g., 1:50, 1:100, 1:200)
  - Manages stock replenishment requirements
- **Key Features**:
  - Filterable by OHS type
  - Tracks stock levels across different sections

#### **D. Report & Return**
- **Purpose**: Generates reports and processes material returns
- **Functionality**:
  - Generates various material reports
  - Processes material return requests
  - Tracks return status
- **Key Features**:
  - Filterable by Report Type, Year, and Month
  - Handles return documentation and processing

#### **E. Defect Report**
- **Purpose**: Tracks and manages defect reports for materials
- **Functionality**:
  - Records material defects
  - Tracks defect resolution status
  - Manages defect-related communications
- **Key Features**:
  - Defect tracking and reporting
  - Status monitoring

#### **F. VIR (Vendor Inspection Report)**
- **Purpose**: Manages Vendor Inspection Reports
- **Functionality**:
  - Tracks vendor inspection results
  - Manages inspection documentation
  - Monitors vendor quality compliance
- **Key Features**:
  - Inspection report management
  - Vendor quality tracking

#### **G. LPO (Local Purchase Order)**
- **Purpose**: Manages Local Purchase Requisitions (LPR)
- **Functionality**:
  - Creates and manages LPR forms
  - Tracks LPR status (ENQ, CST, SANC, SO NO, SO Dt, PDS)
  - Monitors LPR aging (90-day threshold alert)
  - Manages LPR list and printing
- **Key Features**:
  - LPR form creation with fields: LPR No, Date, OSS Control No, Demand No & Date, Depot NA No & Date, Army HQ Srl No, WO No, Sec, Part No, OHS, Scale, Nomenclature, A/U, Qty Reqd, Ref, Last Purchase Price
  - LPR list with status tracking
  - Days in state and total days calculation
  - Alert system for LPRs exceeding 90 days
  - Print functionality for LPR documents

#### **H. LPS (Local Purchase Section)**
- **Purpose**: Manages Local Purchase Section operations
- **Functionality**:
  - Coordinates purchase section activities
  - Manages purchase workflows
  - Tracks purchase section status

#### **I. ESS (Equipment Support Section)**
- **Purpose**: Provides equipment support and manages equipment-related material requirements
- **Functionality**:
  - Manages ION (Issue Order Number) processing
  - Handles equipment support requests
  - Coordinates equipment material requirements
- **Key Features**:
  - ION management
  - Equipment support tracking

#### **J. MPO (Material Planning Organization)**
- **Purpose**: Handles material planning and coordination
- **Functionality**:
  - Plans material requirements
  - Coordinates material flow
  - Manages material planning schedules

---

## ERP Software Flow and User Hierarchy

### **Workflow Process**

#### **1. Material Requisition Flow:**
```
Section Incharge (VRD/ARD/SRD/ETD/TAR)
    ↓
Creates Material Requirement
    ↓
MCO receives requirement
    ↓
MCO checks IIL/CVIL status
    ↓
If available in stock → Issue material
    ↓
If not available → Create LPR (Local Purchase Requisition)
    ↓
LPR sent to LPO (Local Purchase Order)
    ↓
LPO processes purchase
    ↓
LPS (Local Purchase Section) coordinates purchase
    ↓
Material received → Update MCO inventory
    ↓
Material issued to Section
```

#### **2. Purchase Order Flow:**
```
Section Incharge
    ↓
Material Requirement
    ↓
MCO → LPR Creation
    ↓
LPR Status: ENQ (Enquiry) → CST (Cost) → SANC (Sanction) → SO NO (Sale Order Number) → SO Dt (Sale Order Date) → PDS (Pending Delivery Status)
    ↓
DGM Purchase approves
    ↓
LPO processes order
    ↓
LPS coordinates with vendors
    ↓
Material delivery
    ↓
MCO updates inventory (IIL/CVIL)
    ↓
Material issued to Section
```

#### **3. Reporting Flow:**
```
Section Incharge
    ↓
Daily/Weekly Reports
    ↓
MCO consolidates
    ↓
DGM WKS MTRL reviews
    ↓
GM WKS MTRL approves
    ↓
Comd & MD receives summary
```

---

## Modules and Cards Explanation

### **GM WKS MTRL Dashboard Cards:**

#### **1. Target Card**
- **Purpose**: Displays production targets and goals
- **Features**: 
  - Planning year targets (PY-2024-25, PY-2025-26, PY-2026-27)
  - Section-wise target breakdown
  - Target vs Achievement comparison

#### **2. CT Issue Card**
- **Purpose**: Component tracking and issue management
- **Features**:
  - CT (Component Type) issuance tracking
  - Section-wise CT distribution
  - CT status monitoring

#### **3. Critical Items Card**
- **Purpose**: Monitors critical inventory items
- **Features**:
  - Criticality status (P1, P2, P3)
  - Section-wise critical items
  - Alert system for critical items
  - OHS scale tracking

#### **4. LM Status Card (Local Manufacture Status)**
- **Purpose**: Tracks Local Manufacture completion status
- **Features**:
  - Scaled and Non-scaled items
  - Section-wise LM status
  - Completion percentage
  - Status breakdown (AWT MTRL, CAN, COMP, HOLD, IFA Case, OSS, WO Placed, Store Recd)

#### **5. LP Status Card (Local Purchase Status)**
- **Purpose**: Tracks Local Purchase completion status
- **Features**:
  - Scaled and Non-scaled items
  - Section-wise LP status
  - Purchase order tracking
  - Status breakdown similar to LM Status

#### **6. Fund State Card**
- **Purpose**: Current fund allocation and status
- **Features**:
  - Section-wise fund allocation
  - Fund utilization tracking
  - Budget vs Actual comparison

#### **7. Daily Output Card**
- **Purpose**: Tracks daily production output
- **Features**:
  - Daily production statistics
  - Section-wise output
  - Output trends

#### **8. Equipment's Collected Card**
- **Purpose**: Equipment collection tracking
- **Features**:
  - Equipment collection status
  - Collection statistics
  - Equipment inventory

#### **9. DR Summary Card (Defect Report Summary)**
- **Purpose**: Defect Report summary and analysis
- **Features**:
  - Section-wise defect reports
  - Defect analysis
  - Resolution tracking
  - Alert system for high defect rates

#### **10. IFA Cases Card (Issue For Acknowledgement)**
- **Purpose**: Manages IFA cases
- **Features**:
  - IFA case tracking
  - Case status (Pending, In Progress, Resolved)
  - Section-wise IFA cases
  - Case details and remarks

#### **11. ABC Analysis Card**
- **Purpose**: ABC Analysis for MT Grant and ORD Grant
- **Features**:
  - Material categorization (A, B, C)
  - Grant-wise analysis
  - Value-based classification

#### **12. SRB Card (Spares Requirement Book)**
- **Purpose**: Spares Requirement Book summary
- **Features**:
  - Spares requirement tracking
  - Requirement analysis
  - Section-wise spares needs

#### **13. MISC Card**
- **Purpose**: Miscellaneous items and information
- **Features**:
  - Miscellaneous tracking
  - Other items management

---

### **MCO Dashboard Sections:**

#### **1. IIL Management Section**
- **Summary Cards**:
  - Total Items: Shows total number of items in IIL
  - IIL Received: Count of items received
  - Pending: Items not yet received
  - Offices: Number of active offices
- **Filters**: Planning Year, Office
- **Table Columns**: S.No, CT, NR/R, IIL Received, Nomenclature, OHS Scale

#### **2. CVIL Management Section**
- **Summary Cards**:
  - Total CVIL Items: Critical items count
  - Active Offices: Number of offices with CVIL items
  - Planning Years: Number of planning years
- **Filters**: Planning Year, Office
- **Table Columns**: S.No, CT, Nomenclature, OHS Scale

#### **3. OHS Section**
- **Purpose**: On Hand Stock management
- **Features**: OHS type filtering, stock level tracking

#### **4. Report & Return Section**
- **Filters**: Report Type, Year, Month, OHS Type
- **Features**: Report generation, return processing

#### **5. Defect Report Section**
- **Purpose**: Defect tracking and reporting
- **Features**: Defect recording, status tracking

#### **6. VIR Section**
- **Purpose**: Vendor Inspection Report management
- **Features**: Inspection tracking, vendor compliance

---

### **LPO Dashboard Sections:**

#### **1. LPR Form**
- **Form Fields**:
  - LPR No/Originators No
  - Date
  - OSS Control No & Date
  - Demand No & Date
  - Depot NA No & Date
  - Army HQ Srl No
  - WO No / Job No
  - Sec (Section)
  - Part No
  - OHS (OH-I / OH-II)
  - Scale (OH-I / OH-II)
  - Nomenclature
  - A/U (Allocation Unit)
  - Qty Reqd (Quantity Required)
  - Ref (CT No/ION No/WO No etc)
  - Last Purchase Price (Auto-generated)

#### **2. List of LPR**
- **Summary Cards**:
  - Total LPRs: Total number of LPRs
  - Overdue (>90 days): LPRs exceeding 90 days
  - Active LPRs: LPRs within 90 days
  - Avg Days: Average days for LPR processing
- **Table Columns**: S.No, Originator No, Date, OSS Control No, Status, Days in State, Total Days, View
- **Status Types**: ENQ, CST, SANC, SO NO, SO Dt, PDS
- **Features**: 
  - Status-based color coding
  - Alert system for overdue LPRs
  - Print functionality
  - Detailed LPR view

---

### **ESS Dashboard Sections:**

#### **1. ION Management (Inter Office Note)**
- **Purpose**: Issue Order Number processing and Inter Office Note management
- **Features**: 
  - ION creation and tracking
  - Expendable stores requisition management
  - Vehicle-wise material demand tracking
  - Period-based material requirements (e.g., 3 months)
  - Summary statistics (Total IONs, Total Items, Vehicles Covered)
- **Key Fields**: Reference No, Title, Subject, Period, Date, Vehicles, Items with Nomenclature, Qty Demanded, Remarks

#### **2. Estimation Sheet (EME)**
- **Purpose**: Estimation Sheet for Manufacture Jobs IAF (EME) W-61
- **Features**:
  - Work Order details (WO No, Date, Quantity)
  - Material estimation for manufacture jobs
  - Technical specifications tracking
  - Material availability status
  - Volume and weight calculations per piece
  - Total weight calculations
  - Summary statistics (Total Estimation Sheets, Total Man Hours, Total Items)
- **Key Fields**: Work Order No, WO Date, Qty, HQ BWG Cont No, Section, Part No, Nomenclature, Index No, Main Equipment, Drawing No, Total Man Hours, Material specifications, Volume per piece, Weight per piece, Total weight, Material availability

#### **3. LPR (Local Purchase Requisition)**
- **Purpose**: Local Purchase Requisition management for ESS
- **Features**: 
  - LPR form creation
  - LPR tracking and status management
  - Similar to LPO LPR functionality but specific to ESS requirements

---

### **MPO (Material Planning Organization) Dashboard**

MPO is responsible for material planning, provisioning, and coordination. It operates under DGM WKS MTRL and provides comprehensive planning and tracking capabilities.

#### **MPO Sections:**

#### **1. Target Section**
- **Purpose**: Production target planning and tracking
- **Features**:
  - Planning Year selection (PY-2023-24, PY-2024-25, PY-2025-26, PY-2026-27)
  - Vehicle (VEH) target tracking:
    - OH-I (BMP II, BMP IIK)
    - OH-II (BMP II)
    - CMT (Combat Maintenance Team)
    - VT-72B
    - 30 MM Gun
  - Engine (ENG) target tracking:
    - UTD-20 ENG
    - BAZ ENG
    - SLK ENG
  - Summary cards (Target VEH, Target ENG)
  - CT (Component Type) issued tracking
  - Visual distribution charts
  - Carry forward tracking
- **Key Metrics**: Total VEH CT, CF CT (Carry Forward), Fresh CT, Output, Total ENG CT

#### **2. CT Details Section**
- **Purpose**: Component Type (CT) detailed tracking
- **Features**:
  - CT category filtering
  - CT type filtering
  - Detailed CT information
  - Component-wise tracking
  - Section-wise CT distribution
- **Key Fields**: CT Category, CT Type, Component details, Section allocation

#### **3. Issue Details Section**
- **Purpose**: Material issue details tracking
- **Features**:
  - Issue tracking by section
  - Issue quantity tracking
  - Issue date tracking
  - Material flow tracking
- **Key Fields**: Section, Material, Issue Quantity, Issue Date, Status

#### **4. LM Summary (Local Manufacture Summary)**
- **Purpose**: Local Manufacture status summary
- **Features**:
  - Scaled and Non-scaled items tracking
  - Section-wise LM status
  - Completion percentage
  - Status breakdown (AWT MTRL, CAN, COMP, HOLD, IFA Case, OSS, WO Placed, Store Recd)
  - Summary statistics
- **Key Metrics**: Total LM items, Completed items, Pending items, Section-wise breakdown

#### **5. LP Summary (Local Purchase Summary)**
- **Purpose**: Local Purchase status summary
- **Features**:
  - Scaled and Non-scaled items tracking
  - Section-wise LP status
  - Purchase order tracking
  - Status breakdown similar to LM Summary
  - Summary statistics
- **Key Metrics**: Total LP items, Completed items, Pending items, Section-wise breakdown

#### **6. SRB (Spares Requirement Book) Section**
- **Purpose**: Spares Requirement Book management
- **Features**:
  - SRB data tracking
  - Section-wise SRB requirements
  - Planning year-wise SRB
  - New LP range and depth tracking
  - SRB summary tables
- **Key Fields**: Section, Planning Year, SRB requirements, New LP Range, New LP Depth

---

### **LPS (Local Purchase Section) Dashboard**

LPS manages local purchase store operations, material receipt, inspection, and issue. It operates under DGM Purchase and coordinates with LPO for purchase activities.

#### **LPS Sections:**

#### **1. Inspection Note Section**
- **Purpose**: Material inspection and quality control
- **Features**:
  - Inspection Note (IN) creation
  - Vendor-wise inspection tracking
  - Item-wise inspection details
  - Quantity inspection
  - Remarks and quality notes
  - Summary statistics (Total Inspection Notes, Total Items Inspected, Total Quantity)
- **Key Fields**: Date, IN No, Vendor, Item, Quantity, Remarks
- **Workflow**: Material received → Inspection Note created → Quality check → Approval/Rejection

#### **2. CRV (Cash Receipt Voucher) Section**
- **Purpose**: Cash Receipt Voucher management for material purchases
- **Features**:
  - CRV creation and tracking
  - Section-wise CRV entries
  - Material-wise CRV tracking
  - Amount tracking
  - Summary statistics (Total CRVs, Total Amount, Total Quantity)
- **Key Fields**: Date, CRV No, Section, Nomenclature, Quantity, Amount
- **Workflow**: Material purchase → CRV creation → Payment processing → Material receipt

#### **3. Material Register Section**
- **Purpose**: Complete material inventory register
- **Features**:
  - Material receipt tracking
  - Material issue tracking
  - Balance calculation
  - Section-wise material tracking
  - Voucher and Challan tracking
  - Summary statistics (Total Entries, Total Receipt Qty, Total Issue Qty, Total Balance)
- **Key Fields**: Date, Voucher No, Challan No, Challan Date, Nomenclature, Part No, Receipt Qty, Issue Qty, Balance, Issued To, Remarks
- **Workflow**: Material receipt → Entry in register → Issue to sections → Balance update

#### **4. Supply Order Section**
- **Purpose**: Supply order management
- **Features**:
  - Supply order creation
  - Vendor-wise supply order tracking
  - Order status tracking
  - Delivery tracking
  - Summary statistics
- **Key Fields**: Supply Order No, Vendor, Item, Quantity, Order Date, Expected Delivery, Actual Delivery, Status

#### **5. CRV Register Section**
- **Purpose**: CRV register for tracking all CRV entries
- **Features**:
  - Complete CRV history
  - CRV-wise material tracking
  - Amount-wise tracking
  - Filtering and search capabilities
- **Key Fields**: Date, CRV No, Section, Nomenclature, Quantity, Amount, Status

#### **6. Supply Order Register Section**
- **Purpose**: Supply order register for tracking all supply orders
- **Features**:
  - Complete supply order history
  - Vendor-wise order tracking
  - Order status tracking
  - Delivery status tracking
  - Filtering and search capabilities
- **Key Fields**: Supply Order No, Vendor, Item, Quantity, Order Date, Delivery Date, Status, Amount

---

### **ESS (Equipment Support Section) Dashboard**

ESS manages equipment support, expendable stores, and equipment-related material requirements. It operates under DGM WKS MTRL and coordinates with sections for equipment support.

#### **ESS Sections:**

#### **1. Inter Office Note (ION) Section**
- **Purpose**: Inter Office Note for expendable stores requisition
- **Features**:
  - ION creation for fast-moving expendable stores
  - Period-based requisition (e.g., 3 months)
  - Vehicle-wise material demand
  - Item-wise quantity demanded
  - Summary statistics (Total IONs, Total Items, Vehicles Covered)
- **Key Fields**: Reference No, Title, Subject, Period, Date, Vehicles, Items (Nomenclature, Qty Demanded, Remarks)
- **Example**: ION for BMP VRD PT-2 with items like Paint OG, Paint White, Thinner, Cotton Tape, etc.

#### **2. Estimation Sheet (EME) Section**
- **Purpose**: Estimation Sheet for Manufacture Jobs IAF (EME) W-61
- **Features**:
  - Work Order-based estimation
  - Material requirement calculation
  - Technical specifications tracking
  - Material availability status
  - Volume and weight calculations
  - Summary statistics (Total Estimation Sheets, Total Man Hours, Total Items)
- **Key Fields**: Work Order No, WO Date, Qty, HQ BWG Cont No, Section, Part No, Nomenclature, Index No, Main Equipment, Drawing No, Total Man Hours, Material details with specifications, Volume per piece, Weight per piece, Total weight, Material availability
- **Example**: Estimation for "Re-rubberisation of Bogie Wheel" with materials like Natural Rubber Sheet, High Cis BR, Peptizer, Zinc Oxide, etc.

#### **3. Local Purchase Requisition (LPR) Section**
- **Purpose**: LPR management for ESS requirements
- **Features**:
  - LPR form creation
  - LPR tracking
  - Status management
  - Similar functionality to LPO LPR but specific to ESS needs
- **Key Fields**: Similar to LPO LPR fields

---

## GM and DGM Dashboards Information

### **GM WKS MTRL (General Manager Workshop Material) Dashboard**

The GM WKS MTRL Dashboard is the top-level material management dashboard providing comprehensive oversight of all material operations.

#### **Dashboard Access:**
- **Route**: `/login/gm-dashboard` or accessed through Sections Dashboard
- **Hierarchy**: Reports to Comd & MD, supervises DGM WKS MTRL and DGM Purchase

#### **GM WKS MTRL Sections:**
The GM WKS MTRL oversees the following sections under the Sections Dashboard:

1. **TT Cell (Tooling & Technology Cell)**
   - **Purpose**: Manages tooling and technology-related activities
   - **Status**: Dashboard under development
   - **Functionality**: Tooling management, technology implementation, technical support

2. **QA (Quality Assurance)**
   - **Purpose**: Quality assurance and quality control activities
   - **Status**: Dashboard under development
   - **Functionality**: 
     - Quality inspection and testing
     - CQA (Central Quality Assurance) coordination
     - QA remarks on defect reports
     - Quality standards compliance
     - Backloading of stores against DR/FDR list tracking
   - **Key References**: 
     - QA remarks in MCO Dashboard
     - CQA (I), CQA (II), CQA (III) classifications
     - DR/512 ABW(QA) references

3. **MCO (Material Control Organization)**
   - **Purpose**: Material control and inventory management (as detailed in previous sections)
   - **Status**: Fully implemented
   - **Route**: `/gm-wks-mtrl-dashboard`

4. **PP&C (Production Planning & Control)**
   - **Purpose**: Production planning and control activities
   - **Status**: Dashboard under development
   - **Functionality**: 
     - Production planning
     - Production scheduling
     - Production control and monitoring
     - Resource allocation

5. **ME Cell (Manufacturing Engineering Cell)**
   - **Purpose**: Manufacturing engineering activities
   - **Status**: Active in system (referenced in multiple dashboards)
   - **Functionality**: 
     - Manufacturing engineering support
     - Process improvement
     - Engineering solutions
     - Referenced in LM Status and LP Status tables as a status category
   - **Key References**: 
     - ME Cell column in GM WKS MTRL Dashboard status tables
     - ME Cell tracking in DGM MTRL and DGM Prod dashboards

#### **Key Features:**
1. **13 Comprehensive Cards** (as detailed in previous sections):
   - Target, CT Issue, Critical Items, LM Status, LP Status, Fund State, Daily Output, Equipment's Collected, DR Summary, IFA Cases, ABC Analysis, SRB, MISC

2. **Notification System**:
   - LPR notifications for overdue items (>90 days)
   - DR Summary notifications for high defect rates
   - Critical items alerts
   - Real-time notification updates

3. **Chatbot Integration**:
   - AI-powered chatbot for quick queries
   - System information assistance
   - Real-time support

4. **Comprehensive Analytics**:
   - Year-wise data (PY-2023-24, PY-2024-25, PY-2025-26, PY-2026-27)
   - Section-wise breakdown
   - Status-wise filtering
   - Visual charts and graphs

5. **Reporting Capabilities**:
   - Detailed reports generation
   - Export functionality
   - Print functionality

---

### **DGM WKS MTRL (Deputy General Manager Workshop Material) Dashboard**

The DGM WKS MTRL Dashboard provides operational oversight of material management activities.

#### **Dashboard Access:**
- **Route**: `/dgm-wks-mtrl-dashboard` or accessed through GM WKS MTRL Dashboard
- **Hierarchy**: Reports to GM WKS MTRL, supervises MCO, MPO, ESS

#### **Key Modules:**
1. **DGM Dashboard**:
   - Operational overview
   - Status monitoring
   - Key metrics tracking

2. **MCO (Material Control Organization)**:
   - Access to MCO Dashboard
   - IIL, CVIL, OHS management
   - Report & Return, Defect Report, VIR

3. **MPO (Material Planning Organization)**:
   - Access to MPO Dashboard
   - Target, CT Details, Issue Details
   - LM Summary, LP Summary, SRB

4. **ESS (Equipment Support Section)**:
   - Access to ESS Dashboard
   - ION, Estimation Sheet, LPR management

---

### **DGM Purchase (Deputy General Manager Purchase) Dashboard**

The DGM Purchase Dashboard manages all purchase-related activities.

#### **Dashboard Access:**
- **Route**: `/dgm-purchase-dashboard` or accessed through GM WKS MTRL Dashboard
- **Hierarchy**: Reports to GM WKS MTRL, supervises LPO and LPS

#### **Key Modules:**
1. **DGM Dashboard**:
   - Purchase overview
   - Purchase order monitoring
   - Vendor management
   - Cost tracking

2. **LPO (Local Purchase Order)**:
   - Access to LPO Dashboard
   - LPR creation and management
   - LPR status tracking
   - 90-day alert system

3. **LPS (Local Purchase Section)**:
   - Access to LPS Dashboard
   - Inspection Note, CRV management
   - Material Register, Supply Order management
   - CRV Register, Supply Order Register

---

### **GM Prod (General Manager Production) Dashboard**

The GM Prod Dashboard manages production-related activities and coordinates with material management for production requirements.

#### **Dashboard Access:**
- **Route**: `/login/gm-prod` or accessed through Comdt MD Dashboard
- **Hierarchy**: Reports to Comd & MD, coordinates with GM WKS MTRL

#### **Key Features:**
- Production planning and tracking
- Production target monitoring
- Material requirement coordination
- Production output tracking
- Work order management

---

### **GM WKS (Tech) (General Manager Workshop Technical) Dashboard**

The GM WKS (Tech) Dashboard manages technical aspects of workshop operations.

#### **Dashboard Access:**
- **Route**: `/login/gm-wks-tech` or accessed through Comdt MD Dashboard
- **Hierarchy**: Reports to Comd & MD, coordinates with GM WKS MTRL and GM Prod

#### **Key Features:**
- Technical coordination and support
- Technical standards compliance
- Technical documentation
- Technical problem resolution
- Engineering support coordination

---

### **GM Admin (General Manager Administration) Dashboard**

The GM Admin Dashboard manages administrative aspects of workshop operations.

#### **Dashboard Access:**
- **Route**: `/login/gm-admin` or accessed through Comdt MD Dashboard
- **Hierarchy**: Reports to Comd & MD, provides administrative oversight

#### **Key Features:**
- Administrative oversight
- Policy compliance
- Administrative documentation
- Resource management
- Administrative coordination

---

### **DGM Prod (Deputy General Manager Production) Dashboard**

The DGM Prod Dashboard provides operational oversight of production activities.

#### **Dashboard Access:**
- **Route**: `/dgm-prod` or accessed through Section Dashboard
- **Hierarchy**: Reports to GM Prod

#### **Key Features:**
- Production operations management
- Work order tracking
- Production status monitoring
- Material coordination for production

---

### **Section Incharge Dashboard (Comdt MD Login)**

The Section Incharge Dashboard provides access to all modules for section-level operations.

#### **Dashboard Access:**
- **Route**: `/comdt-md` or accessed through Section Dashboard
- **Hierarchy**: Reports to DGM levels, manages section operations

#### **Available Modules:**
1. **MCO**: Material control and inventory management
2. **LPO**: Local purchase order management
3. **ESS**: Equipment support section operations
4. **LPS**: Local purchase section operations
5. **MPO**: Material planning organization operations

#### **Key Features:**
- Module selection interface
- Quick access to all operational modules
- Section-wise material requirements
- Status tracking and reporting

---

### 5) What is the Main Problem Right Now?

The MCO Dashboard system is addressing several critical operational challenges that were prevalent in the manual/material-based workflow system:

#### **A. Delayed Purchase Order Processing**
- **Problem**: Local Purchase Requisitions (LPRs) are experiencing significant delays, with many exceeding the 90-day processing threshold
- **Impact**: 
  - Production delays due to material unavailability
  - Work orders getting stuck waiting for materials
  - Increased costs due to urgent procurement requirements
  - Workshop operations getting disrupted

#### **B. Lack of Real-Time Visibility**
- **Problem**: No centralized system to track material status, purchase order progress, and inventory levels in real-time
- **Impact**:
  - Manual tracking leading to errors and delays
  - Difficulty in identifying bottlenecks
  - Inability to make informed decisions quickly
  - Poor coordination between sections

#### **C. Critical Items Management Issues**
- **Problem**: Critical items (P1, P2, P3 priority) are not being tracked and managed effectively
- **Impact**:
  - Critical components running out of stock
  - Production halts due to missing critical parts
  - No proactive alerts for critical item shortages
  - Delayed response to critical requirements

#### **D. Defect Report Tracking**
- **Problem**: High number of defect reports, especially in sections like SRD, are not being tracked and resolved systematically
- **Impact**:
  - Recurring defects not being addressed
  - Quality issues going unnoticed
  - No systematic approach to defect resolution
  - Vendor quality issues not being escalated properly

#### **E. Material Availability Tracking**
- **Problem**: 
  - IIL (Indent Issue List) items not being received on time
  - CVIL (Critical Vendor Issue List) items pending without proper tracking
  - No visibility into material receipt status
- **Impact**:
  - Unclear material availability status
  - Delays in material procurement
  - Inability to plan production schedules effectively

#### **F. Status Tracking and Bottlenecks**
- **Problem**: Multiple status stages (ENQ, CST, SANC, SO NO, SO Dt, PDS) with no clear visibility into where items are stuck
- **Impact**:
  - Items getting stuck at various stages without follow-up
  - No accountability for delays
  - Difficulty in identifying process bottlenecks
  - Inefficient workflow management

#### **G. Equipment Delivery Delays**
- **Problem**: Equipment collection showing pending status with no proper tracking
- **Impact**:
  - Equipment not being collected on time
  - Vendor delivery issues not being addressed
  - Production delays due to equipment unavailability

#### **H. Price Variation and Cost Management**
- **Problem**: Significant price variations in purchase orders not being tracked or alerted
- **Impact**:
  - Budget overruns
  - No visibility into cost escalations
  - Inability to negotiate better prices

#### **I. Work Order Delays**
- **Problem**: Work orders showing overdue status with no systematic tracking
- **Impact**:
  - Production targets not being met
  - No visibility into work order progress
  - Delayed completion affecting overall workshop efficiency

#### **J. Communication and Coordination Gaps**
- **Problem**: Lack of proper communication channels between sections, MCO, LPO, and higher authorities
- **Impact**:
  - Information silos
  - Delayed decision-making
  - Poor coordination between departments
  - No systematic notification system

---

### 6) How are We Attempting to Sort Out the Problem?

The MCO Dashboard ERP system is implementing comprehensive solutions to address all the identified problems:

#### **A. Automated LPR Tracking and Alert System**
- **Solution**: 
  - Real-time tracking of LPR status through all stages (ENQ → CST → SANC → SO NO → SO Dt → PDS)
  - Automated calculation of days in each state and total days
  - **90-day threshold alert system** that automatically flags overdue LPRs
  - Notification system that alerts GM WKS MTRL when LPRs exceed 90 days
  - Color-coded status indicators for quick identification
- **Benefits**:
  - Immediate visibility into delayed LPRs
  - Proactive alerts prevent further delays
  - Accountability for each stage of processing

#### **B. Centralized Dashboard with Real-Time Visibility**
- **Solution**:
  - Single dashboard showing all material status, purchase orders, and inventory levels
  - Real-time updates across all modules
  - Summary cards with key metrics (Total LPRs, Overdue, Active, Average Days)
  - Filterable views by year, section, office, and status
- **Benefits**:
  - Complete visibility into all operations
  - Quick decision-making based on real-time data
  - Reduced manual tracking errors

#### **C. Critical Items Monitoring System**
- **Solution**:
  - Dedicated Critical Items card with priority classification (P1, P2, P3)
  - Section-wise critical items tracking
  - Action tracking system where users can record actions taken
  - **Notification system** to send alerts to relevant authorities (DGM, Section Incharge, etc.)
  - OHS scale tracking for critical items
- **Benefits**:
  - Proactive management of critical items
  - Immediate alerts for critical shortages
  - Systematic action tracking and follow-up

#### **D. Defect Report Management System**
- **Solution**:
  - DR Summary card with section-wise defect analysis
  - Defect report tracking and status monitoring
  - **Automated notifications** for sections with high defect rates (e.g., SRD)
  - Defect resolution tracking
  - Vendor quality issue escalation
- **Benefits**:
  - Systematic defect tracking
  - Early identification of quality issues
  - Improved vendor quality management

#### **E. IIL and CVIL Management System**
- **Solution**:
  - Dedicated IIL Management section with receipt status tracking (Yes/No)
  - CVIL Management for items not received in IIL
  - Filterable by Planning Year and Office
  - Summary statistics (Total Items, Received, Pending, Active Offices)
  - Clear visibility into material availability
- **Benefits**:
  - Clear tracking of material receipt status
  - Identification of pending materials
  - Better planning based on material availability

#### **F. Status-Based Workflow Management**
- **Solution**:
  - Clear status tracking through all stages
  - Days in state calculation for each status
  - Visual indicators (color-coded badges) for each status
  - Status-wise filtering and reporting
  - Bottleneck identification through status analysis
- **Benefits**:
  - Clear visibility into process bottlenecks
  - Accountability at each stage
  - Efficient workflow management

#### **G. Equipment Collection Tracking**
- **Solution**:
  - Equipment's Collected card with delivery status tracking
  - Vendor-wise equipment tracking
  - Expected vs Actual delivery dates
  - Pending equipment identification
  - Vendor performance monitoring
- **Benefits**:
  - Better equipment delivery management
  - Vendor accountability
  - Reduced equipment-related delays

#### **H. Price Alert and Cost Management**
- **Solution**:
  - Price variation alerts in LP Status card
  - Comparison with previous purchase prices
  - Cost escalation tracking
  - Budget monitoring and alerts
- **Benefits**:
  - Cost control and budget management
  - Better price negotiation opportunities
  - Visibility into cost escalations

#### **I. Work Order Progress Tracking**
- **Solution**:
  - Work order status tracking
  - Progress monitoring
  - Overdue work order identification
  - Man-hours tracking
  - Delay reason tracking
- **Benefits**:
  - Better work order management
  - Production target achievement
  - Identification of production bottlenecks

#### **J. Integrated Notification and Communication System**
- **Solution**:
  - **Centralized notification system** for all alerts and updates
  - LPR notifications for overdue items
  - DR Summary notifications for high defect rates
  - Critical items notifications
  - **Notification modal** for sending messages to specific recipients (DGM, Section Incharge, etc.)
  - Chatbot integration for quick queries
  - Real-time notification updates
- **Benefits**:
  - Improved communication between departments
  - Immediate alerts for critical issues
  - Better coordination and collaboration

#### **K. Comprehensive Reporting System**
- **Solution**:
  - Report & Return section for generating various reports
  - Filterable reports by type, year, month, and OHS type
  - Export functionality for data analysis
  - Print functionality for documentation
- **Benefits**:
  - Better reporting and documentation
  - Data-driven decision making
  - Compliance and audit support

#### **L. Import/Export Functionality**
- **Solution**:
  - Bulk data import through Excel/CSV files
  - Data export for external analysis
  - Reduced manual data entry
- **Benefits**:
  - Time savings
  - Reduced data entry errors
  - Better data management

#### **M. User Hierarchy and Access Control**
- **Solution**:
  - Role-based access control
  - Clear hierarchy from Comd & MD to Section Incharge
  - Appropriate access levels for each role
  - Secure login system
- **Benefits**:
  - Data security
  - Appropriate access control
  - Accountability at each level

#### **N. Dashboard Analytics and Metrics**
- **Solution**:
  - Summary cards with key performance indicators
  - Visual indicators (color-coded status, progress bars)
  - Statistical analysis (averages, percentages, counts)
  - Trend analysis capabilities
- **Benefits**:
  - Quick insights into operations
  - Data-driven decision making
  - Performance monitoring

---

## Day by Day Work Done

_This section is left empty for manual entry of daily work progress._

---

## Additional System Features

### **Notification System:**
- LPR notifications for items exceeding 90 days
- DR Summary notifications for high defect rates
- Critical items alerts
- System-wide notification management

### **Import/Export Functionality:**
- File import capability for bulk data entry
- Excel/CSV import support
- Data export for reporting

### **Print Functionality:**
- LPR print format
- Report printing
- Document generation

### **Search and Filter:**
- Advanced filtering options
- Year-wise filtering
- Section-wise filtering
- Office-wise filtering
- Status-based filtering

### **Dashboard Analytics:**
- Summary cards with key metrics
- Visual indicators for status
- Color-coded status displays
- Real-time data updates

---

## System Architecture

### **Technology Stack:**
- Frontend: React with TypeScript
- Styling: Tailwind CSS
- Routing: React Router
- State Management: React Hooks
- Data Storage: LocalStorage (for demo purposes)

### **Key Components:**
- Master Dashboard (Entry point)
- Comdt MD Dashboard (Top level)
- GM WKS MTRL Dashboard
- DGM WKS MTRL Dashboard
- DGM Purchase Dashboard
- MCO Dashboard
- LPO Dashboard
- LPS Dashboard
- ESS Dashboard
- MPO Dashboard
- Section Dashboards

---

## Conclusion

The MCO Dashboard is a comprehensive ERP module designed to manage all material control operations within the 512 Army Base Workshop. It provides a complete workflow from material requisition to delivery, with proper hierarchy management, status tracking, and reporting capabilities. The system ensures efficient material flow, proper inventory management, and timely procurement processes while maintaining accountability at all levels of the organization.

---

*Report Generated: [Date to be filled]*
*Prepared by: [Name to be filled]*

