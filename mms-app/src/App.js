import React, { useState, useEffect, useContext, createContext } from 'react';
import { 
  Users, Settings, BarChart3, Wrench, Factory, Search, 
  Filter, Download, Upload, Calendar, Clock, AlertTriangle,
  CheckCircle, XCircle, TrendingUp, PieChart, Activity,
  Bell, FileText, Camera, MapPin, Zap, Cog, Eye,
  Edit, Trash2, Play, Pause, Plus, MoreHorizontal,
  ArrowRight, ArrowDown, AlertCircle, Target, Timer,
  DollarSign, Package, UserCheck, Truck, 
  LineChart, BarChart, Gauge, X, Save, Menu, ChevronLeft,
  ChevronRight, ChevronDown, ChevronUp, FolderOpen, Folder,
  Image, Paperclip, MessageSquare, AlertOctagon, CheckSquare,
  Square, PlayCircle, PauseCircle, RotateCcw, Send, Mail, Phone
} from 'lucide-react';

// Context for app state management
const AppContext = createContext();

// Enhanced sample data with hierarchical equipment structure and templates
const initialData = {
  users: [
    { id: 1, name: 'Rajesh Kumar', username: 'admin', password: 'admin123', role: 'Administrator', status: 'Active', department: 'Maintenance', lastLogin: '2024-01-18T08:00:00Z', email: 'rajesh@company.com', phone: '+91-9876543210' },
    { id: 2, name: 'Priya Sharma', username: 'supervisor', password: 'super123', role: 'Supervisor', status: 'Active', department: 'Operations', lastLogin: '2024-01-18T07:30:00Z', email: 'priya@company.com', phone: '+91-9876543211' },
    { id: 3, name: 'Amit Patel', username: 'technician', password: 'tech123', role: 'Field Technician', status: 'Active', department: 'Mechanical', lastLogin: '2024-01-18T06:45:00Z', email: 'amit@company.com', phone: '+91-9876543212' },
    { id: 4, name: 'Sunita Singh', username: 'manager', password: 'manager123', role: 'Department Head', status: 'Active', department: 'Engineering', lastLogin: '2024-01-17T18:30:00Z', email: 'sunita@company.com', phone: '+91-9876543213' },
    { id: 5, name: 'Vikram Gupta', username: 'vikram', password: 'pass123', role: 'Field Technician', status: 'Active', department: 'Electrical', lastLogin: '2024-01-18T08:15:00Z', email: 'vikram@company.com', phone: '+91-9876543214' },
    { id: 6, name: 'Meera Reddy', username: 'meera', password: 'pass123', role: 'Supervisor', status: 'Active', department: 'Safety', lastLogin: '2024-01-18T07:00:00Z', email: 'meera@company.com', phone: '+91-9876543215' }
  ],
  
  equipment: [
    // Plant Level
    {
      id: 'PLANT-001',
      code: 'PLANT-001',
      name: 'Steel Manufacturing Plant - Mumbai',
      type: 'plant',
      level: 1,
      parent: null,
      criticality: 'A',
      location: 'Mumbai, Maharashtra',
      status: 'Active',
      description: 'Main steel manufacturing facility',
      manufacturer: 'TATA Steel',
      model: 'Integrated Steel Plant',
      serialNumber: 'TSP-MUM-2019',
      commissionDate: '2019-01-15',
      runningHours: 45600,
      lastMaintenanceHours: 45000,
      nextMaintenanceHours: 47000,
      specifications: {
        'Annual Capacity': '2.5 Million Tons',
        'Area': '500 Hectares',
        'Power Requirement': '150 MW'
      },
      ownership: {
        mechanical: 'Amit Patel',
        electrical: 'Vikram Gupta',
        operations: 'Priya Sharma'
      },
      healthScore: 92,
      lastMaintenance: '2024-01-10',
      nextMaintenance: '2024-01-25',
      maintenanceCost: 125000,
      uptimePercentage: 96.5,
      children: []
    },
    // Equipment Level
    {
      id: 'EAF-001',
      code: 'EAF-001',
      name: 'Electric Arc Furnace #1',
      type: 'equipment',
      level: 2,
      parent: 'PLANT-001',
      criticality: 'A',
      location: 'SMS Bay 1',
      status: 'Active',
      description: 'Primary melting furnace for steel production',
      manufacturer: 'SMS Group',
      model: 'EAF-150T',
      serialNumber: '2019-EAF-1234',
      commissionDate: '2019-03-15',
      runningHours: 8760,
      lastMaintenanceHours: 8500,
      nextMaintenanceHours: 9000,
      specifications: {
        'Capacity': '150 tons',
        'Power Rating': '90 MVA',
        'Cooling Requirement': '1200 m³/h',
        'Operating Temperature': '1800°C',
        'Tap-to-Tap Time': '45 minutes'
      },
      ownership: {
        mechanical: 'Amit Patel',
        electrical: 'Vikram Gupta',
        operations: 'Meera Reddy'
      },
      healthScore: 87,
      lastMaintenance: '2024-01-08',
      nextMaintenance: '2024-01-22',
      maintenanceCost: 45000,
      uptimePercentage: 94.2,
      children: []
    },
    // Assembly Level
    {
      id: 'EAF-001-COOL',
      code: 'EAF-001-COOL',
      name: 'Cooling System',
      type: 'assembly',
      level: 3,
      parent: 'EAF-001',
      criticality: 'A',
      location: 'SMS Bay 1 - EAF Area',
      status: 'Active',
      description: 'Water cooling system for EAF',
      manufacturer: 'Alfa Laval',
      model: 'CS-200',
      serialNumber: 'AL-CS-2019-001',
      commissionDate: '2019-03-20',
      runningHours: 8760,
      lastMaintenanceHours: 8500,
      nextMaintenanceHours: 8800,
      specifications: {
        'Flow Rate': '1200 m³/h',
        'Pressure': '15 bar',
        'Temperature Range': '15-45°C'
      },
      ownership: {
        mechanical: 'Amit Patel',
        electrical: 'Vikram Gupta'
      },
      healthScore: 85,
      lastMaintenance: '2024-01-05',
      nextMaintenance: '2024-01-20',
      maintenanceCost: 15000,
      uptimePercentage: 92.8,
      children: []
    },
    // Sub-Assembly Level
    {
      id: 'EAF-001-COOL-PUMP',
      code: 'EAF-001-COOL-PUMP',
      name: 'Primary Cooling Pump',
      type: 'sub-assembly',
      level: 4,
      parent: 'EAF-001-COOL',
      criticality: 'A',
      location: 'SMS Bay 1 - Pump House',
      status: 'Active',
      description: 'Main circulation pump for cooling water',
      manufacturer: 'Grundfos',
      model: 'NK-200',
      serialNumber: 'GF-NK-2019-001',
      commissionDate: '2019-03-22',
      runningHours: 8760,
      lastMaintenanceHours: 8700,
      nextMaintenanceHours: 9000,
      specifications: {
        'Capacity': '1200 m³/h',
        'Head': '45 m',
        'Power': '75 kW',
        'Speed': '1450 RPM'
      },
      ownership: {
        mechanical: 'Amit Patel'
      },
      healthScore: 83,
      lastMaintenance: '2024-01-12',
      nextMaintenance: '2024-01-28',
      maintenanceCost: 8000,
      uptimePercentage: 90.5,
      children: []
    },
    // Component Level
    {
      id: 'EAF-001-COOL-PUMP-IMP',
      code: 'EAF-001-COOL-PUMP-IMP',
      name: 'Pump Impeller',
      type: 'component',
      level: 5,
      parent: 'EAF-001-COOL-PUMP',
      criticality: 'B',
      location: 'Inside Primary Cooling Pump',
      status: 'Active',
      description: 'Centrifugal impeller for water circulation',
      manufacturer: 'Grundfos',
      model: 'IMP-NK-200',
      serialNumber: 'GF-IMP-2019-001',
      commissionDate: '2019-03-22',
      runningHours: 8760,
      lastMaintenanceHours: 8700,
      nextMaintenanceHours: 10000,
      specifications: {
        'Material': 'Cast Iron',
        'Diameter': '200 mm',
        'Number of Vanes': '7',
        'Balance Grade': 'G6.3'
      },
      ownership: {
        mechanical: 'Amit Patel'
      },
      healthScore: 88,
      lastMaintenance: '2024-01-12',
      nextMaintenance: '2024-03-15',
      maintenanceCost: 2500,
      uptimePercentage: 95.2,
      children: []
    },
    {
      id: 'CRN-001',
      code: 'CRN-001',
      name: 'EOT Crane #1',
      type: 'equipment',
      level: 2,
      parent: 'PLANT-001',
      criticality: 'B',
      location: 'SMS Bay 1',
      status: 'Active',
      description: 'Overhead crane for material handling',
      manufacturer: 'Demag Cranes',
      model: 'DH-200',
      serialNumber: 'DMG-2019-CR01',
      commissionDate: '2019-02-20',
      runningHours: 5840,
      lastMaintenanceHours: 5600,
      nextMaintenanceHours: 6000,
      specifications: {
        'Lifting Capacity': '200 tons',
        'Span': '35 meters',
        'Lifting Height': '25 meters',
        'Speed': '15 m/min'
      },
      ownership: {
        mechanical: 'Arjun Nair',
        electrical: 'Kavya Iyer',
        operations: 'Rohit Joshi'
      },
      healthScore: 89,
      lastMaintenance: '2024-01-12',
      nextMaintenance: '2024-01-28',
      maintenanceCost: 32000,
      uptimePercentage: 97.1,
      children: []
    }
  ],
  
  inspectionTemplates: [
    {
      id: 'TMPL-001',
      name: 'Daily Equipment Check',
      equipmentTypes: ['equipment', 'assembly'],
      safetyChecks: [
        'PPE inspection completed',
        'LOTO procedures verified',
        'Work area secured and barricaded',
        'Emergency contacts confirmed',
        'Safety equipment available'
      ],
      checkpoints: [
        {
          id: 'cp-001',
          name: 'Visual Inspection',
          type: 'observation',
          mandatory: true,
          parameters: ['Leaks', 'Corrosion', 'Damage', 'Cleanliness']
        },
        {
          id: 'cp-002',
          name: 'Vibration Check',
          type: 'measurement',
          mandatory: true,
          unit: 'mm/s',
          normalRange: { min: 0, max: 4.5 },
          parameters: ['X-axis', 'Y-axis', 'Z-axis']
        },
        {
          id: 'cp-003',
          name: 'Temperature Check',
          type: 'measurement',
          mandatory: true,
          unit: '°C',
          normalRange: { min: 20, max: 80 },
          parameters: ['Bearing DE', 'Bearing NDE', 'Motor']
        },
        {
          id: 'cp-004',
          name: 'Lubrication Status',
          type: 'observation',
          mandatory: false,
          parameters: ['Grease condition', 'Oil level', 'Contamination']
        }
      ],
      createdBy: 'Rajesh Kumar',
      createdDate: '2024-01-10',
      isActive: true
    },
    {
      id: 'TMPL-002',
      name: 'Weekly Comprehensive Check',
      equipmentTypes: ['equipment'],
      safetyChecks: [
        'Shutdown procedures completed',
        'Energy isolation verified',
        'Confined space permits obtained',
        'Gas testing completed',
        'Rescue team on standby'
      ],
      checkpoints: [
        {
          id: 'cp-005',
          name: 'Electrical Inspection',
          type: 'measurement',
          mandatory: true,
          parameters: ['Insulation resistance', 'Earth continuity', 'Voltage levels']
        },
        {
          id: 'cp-006',
          name: 'Mechanical Inspection',
          type: 'observation',
          mandatory: true,
          parameters: ['Belt condition', 'Coupling alignment', 'Foundation bolts']
        },
        {
          id: 'cp-007',
          name: 'Performance Test',
          type: 'measurement',
          mandatory: true,
          parameters: ['Flow rate', 'Pressure', 'Power consumption']
        }
      ],
      createdBy: 'Sunita Singh',
      createdDate: '2024-01-08',
      isActive: true
    }
  ],

  inspections: [
    {
      id: 'INSP-001',
      equipmentId: 'EAF-001',
      equipmentName: 'Electric Arc Furnace #1',
      templateId: 'TMPL-001',
      templateName: 'Daily Equipment Check',
      type: 'Daily Equipment Check',
      scheduledDate: '2024-01-20',
      status: 'Scheduled',
      assignedTo: 'Amit Patel',
      estimatedDuration: '2 hours',
      priority: 'High',
      healthScoreBefore: 87,
      healthScoreAfter: null,
      findings: [],
      isDraft: false,
      resourceTracking: {
        measurementPhase: { startTime: null, endTime: null, resources: [] },
        engagementPhase: { startTime: null, endTime: null, resources: [] },
        totalTries: 0,
        totalTimeSpent: 0
      },
      escalationSettings: {
        delayThreshold: 24, // hours
        criticalityThreshold: 'High',
        escalationContacts: [
          { name: 'Sunita Singh', role: 'Department Head', email: 'sunita@company.com', phone: '+91-9876543213' }
        ]
      }
    },
    {
      id: 'INSP-002',
      equipmentId: 'CRN-001',
      equipmentName: 'EOT Crane #1',
      templateId: 'TMPL-001',
      templateName: 'Daily Equipment Check',
      type: 'Daily Equipment Check',
      scheduledDate: '2024-01-19',
      status: 'In Progress',
      assignedTo: 'Arjun Nair',
      estimatedDuration: '1 hour',
      priority: 'Normal',
      healthScoreBefore: 89,
      healthScoreAfter: null,
      findings: [],
      isDraft: true,
      resourceTracking: {
        measurementPhase: { 
          startTime: '2024-01-19T08:00:00Z', 
          endTime: null, 
          resources: [{ name: 'Arjun Nair', timeSpent: 0.5 }] 
        },
        engagementPhase: { startTime: null, endTime: null, resources: [] },
        totalTries: 1,
        totalTimeSpent: 0.5
      },
      escalationSettings: {
        delayThreshold: 8,
        criticalityThreshold: 'Normal',
        escalationContacts: [
          { name: 'Priya Sharma', role: 'Supervisor', email: 'priya@company.com', phone: '+91-9876543211' }
        ]
      }
    }
  ],
  
  backlogs: [
    {
      id: 'BL-001',
      equipmentId: 'EAF-001',
      equipmentName: 'Electric Arc Furnace #1',
      issue: 'Cooling system pressure drop detected',
      category: 'Mechanical',
      priority: 'P1',
      status: 'In Progress',
      dueDate: '2024-01-19',
      createdDate: '2024-01-17',
      assignedTo: 'Amit Patel',
      estimatedHours: 4,
      actualHours: 2.5,
      progress: 65,
      estimatedCost: 15000,
      actualCost: 8500,
      isSelected: false,
      workOrderId: null,
      autoGenerated: false,
      source: 'Manual Entry'
    },
    {
      id: 'BL-002',
      equipmentId: 'CRN-001',
      equipmentName: 'EOT Crane #1',
      issue: 'Wire rope showing wear patterns',
      category: 'Safety',
      priority: 'P3',
      status: 'Open',
      dueDate: '2024-01-25',
      createdDate: '2024-01-16',
      assignedTo: 'Arjun Nair',
      estimatedHours: 2,
      progress: 0,
      estimatedCost: 5000,
      isSelected: false,
      workOrderId: null,
      autoGenerated: false,
      source: 'Inspection Finding'
    },
    {
      id: 'BL-003',
      equipmentId: 'EAF-001-COOL-PUMP',
      equipmentName: 'Primary Cooling Pump',
      issue: 'Scheduled oil change required after 8800 running hours',
      category: 'Preventive',
      priority: 'P2',
      status: 'Validated',
      dueDate: '2024-01-22',
      createdDate: '2024-01-18',
      assignedTo: 'Amit Patel',
      estimatedHours: 1,
      progress: 0,
      estimatedCost: 2000,
      isSelected: false,
      workOrderId: null,
      autoGenerated: true,
      source: 'Running Hours Alert'
    }
  ],
  
  workOrders: [
    {
      id: 'WO-001',
      backlogId: 'BL-001',
      title: 'EAF Cooling System Repair',
      description: 'Replace cooling pump bearing and restore system pressure',
      equipmentId: 'EAF-001',
      equipmentName: 'Electric Arc Furnace #1',
      status: 'In Progress',
      priority: 'P1',
      type: 'Corrective',
      woType: 'User Generated',
      assignedTo: 'Amit Patel',
      createdDate: '2024-01-17',
      scheduledDate: '2024-01-18',
      estimatedHours: 4,
      actualHours: 2.5,
      progress: 65,
      estimatedCost: 15000,
      actualCost: 8500,
      triggerCondition: null,
      materials: [
        { item: 'Pump Bearing SKF-6308', quantity: 1, unitCost: 2500, totalCost: 2500, status: 'Available' },
        { item: 'Cooling System Gasket', quantity: 2, unitCost: 75, totalCost: 150, status: 'Available' }
      ],
      labor: [
        { technician: 'Amit Patel', hours: 2.5, rate: 500, total: 1250 }
      ]
    },
    {
      id: 'WO-002',
      backlogId: null,
      title: 'Crane Motor Bearing Replacement',
      description: 'Replace worn motor bearings on crane hoist system',
      equipmentId: 'CRN-001',
      equipmentName: 'EOT Crane #1',
      status: 'Planned',
      priority: 'P2',
      type: 'Preventive',
      woType: 'User Generated',
      assignedTo: 'Arjun Nair',
      createdDate: '2024-01-16',
      scheduledDate: '2024-01-22',
      estimatedHours: 6,
      actualHours: null,
      progress: 0,
      estimatedCost: 25000,
      actualCost: null,
      triggerCondition: null,
      materials: [
        { item: 'Motor Bearing Set', quantity: 2, unitCost: 8000, totalCost: 16000, status: 'Ordered' },
        { item: 'Grease', quantity: 5, unitCost: 200, totalCost: 1000, status: 'Available' }
      ],
      labor: [
        { technician: 'Arjun Nair', hours: 6, rate: 450, total: 2700 }
      ]
    },
    {
      id: 'WO-003',
      backlogId: 'BL-003',
      title: 'Primary Cooling Pump Oil Change',
      description: 'Scheduled oil change for primary cooling pump after 8800 running hours',
      equipmentId: 'EAF-001-COOL-PUMP',
      equipmentName: 'Primary Cooling Pump',
      status: 'Scheduled',
      priority: 'P2',
      type: 'Preventive',
      woType: 'Auto Generated',
      assignedTo: 'Amit Patel',
      createdDate: '2024-01-18',
      scheduledDate: '2024-01-22',
      estimatedHours: 1,
      actualHours: null,
      progress: 0,
      estimatedCost: 2000,
      actualCost: null,
      triggerCondition: {
        type: 'running_hours',
        threshold: 8800,
        currentValue: 8760,
        description: 'Oil change required every 300 running hours'
      },
      materials: [
        { item: 'Hydraulic Oil SAE 46', quantity: 20, unitCost: 80, totalCost: 1600, status: 'Available' },
        { item: 'Oil Filter', quantity: 1, unitCost: 400, totalCost: 400, status: 'Available' }
      ],
      labor: [
        { technician: 'Amit Patel', hours: 1, rate: 500, total: 500 }
      ]
    }
  ],
  
  preventiveMaintenance: [
    {
      id: 'PM-001',
      equipmentId: 'EAF-001',
      equipmentName: 'Electric Arc Furnace #1',
      title: 'Monthly Comprehensive Maintenance',
      frequency: 'Monthly',
      lastPerformed: '2024-01-15',
      nextDue: '2024-02-15',
      assignedTo: 'Amit Patel',
      estimatedDuration: '8 hours',
      status: 'Scheduled',
      checklist: [
        'Inspect refractory lining',
        'Check cooling system',
        'Test electrical connections',
        'Calibrate sensors',
        'Lubricate moving parts'
      ],
      estimatedCost: 25000,
      completionHistory: [
        { completedDate: '2024-01-15', completedBy: 'Amit Patel', actualCost: 23500 },
        { completedDate: '2023-12-15', completedBy: 'Vikram Gupta', actualCost: 24800 }
      ]
    },
    {
      id: 'PM-002',
      equipmentId: 'CRN-001',
      equipmentName: 'EOT Crane #1',
      title: 'Weekly Safety Inspection',
      frequency: 'Weekly',
      lastPerformed: '2024-01-15',
      nextDue: '2024-01-22',
      assignedTo: 'Arjun Nair',
      estimatedDuration: '2 hours',
      status: 'Scheduled',
      checklist: [
        'Check wire rope condition',
        'Test safety systems',
        'Inspect hook block',
        'Verify load test compliance',
        'Check lubrication points'
      ],
      estimatedCost: 5000,
      completionHistory: [
        { completedDate: '2024-01-15', completedBy: 'Arjun Nair', actualCost: 4800 },
        { completedDate: '2024-01-08', completedBy: 'Arjun Nair', actualCost: 5200 }
      ]
    }
  ],

  // Auto Work Order Rules
  autoWorkOrderRules: [
    {
      id: 'RULE-001',
      equipmentId: 'EAF-001-COOL-PUMP',
      name: 'Cooling Pump Oil Change',
      triggerType: 'running_hours',
      triggerValue: 300, // Every 300 hours
      workOrderTemplate: {
        title: 'Primary Cooling Pump Oil Change',
        description: 'Scheduled oil change for primary cooling pump',
        type: 'Preventive',
        estimatedHours: 1,
        materials: [
          { item: 'Hydraulic Oil SAE 46', quantity: 20, unitCost: 80 },
          { item: 'Oil Filter', quantity: 1, unitCost: 400 }
        ]
      },
      isActive: true,
      lastTriggered: '2024-01-18',
      createdBy: 'Rajesh Kumar'
    },
    {
      id: 'RULE-002',
      equipmentId: 'CRN-001',
      name: 'Crane Wire Rope Inspection',
      triggerType: 'running_hours',
      triggerValue: 1000, // Every 1000 hours
      workOrderTemplate: {
        title: 'Crane Wire Rope Detailed Inspection',
        description: 'Comprehensive inspection and potential replacement of wire ropes',
        type: 'Preventive',
        estimatedHours: 4,
        materials: [
          { item: 'Wire Rope 32mm', quantity: 100, unitCost: 450 }
        ]
      },
      isActive: true,
      lastTriggered: null,
      createdBy: 'Sunita Singh'
    }
  ]
};

// Main App Component
export default function MMSApp() {
  const [currentUser, setCurrentUser] = useState(null);
  const [data, setData] = useState(initialData);
  const [currentSection, setCurrentSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const updateData = (section, newData) => {
    setData(prev => ({
      ...prev,
      [section]: newData
    }));
  };

  const addActivity = (description, type = 'General') => {
    const newActivity = {
      id: Date.now(),
      description,
      timestamp: new Date().toLocaleString(),
      user: currentUser?.name || 'System',
      type
    };
    console.log('Activity logged:', newActivity);
  };

  // Auto Work Order Generation based on running hours
  const checkAutoWorkOrders = () => {
    data.autoWorkOrderRules.forEach(rule => {
      if (!rule.isActive) return;
      
      const equipment = data.equipment.find(eq => eq.id === rule.equipmentId);
      if (!equipment) return;

      // Check if trigger condition is met
      const hoursSinceLastMaintenance = equipment.runningHours - (equipment.lastMaintenanceHours || 0);
      
      if (hoursSinceLastMaintenance >= rule.triggerValue) {
        // Generate auto work order
        const autoWO = {
          id: `WO-AUTO-${Date.now()}`,
          backlogId: null,
          title: rule.workOrderTemplate.title,
          description: rule.workOrderTemplate.description,
          equipmentId: equipment.id,
          equipmentName: equipment.name,
          status: 'Scheduled',
          priority: 'P2',
          type: rule.workOrderTemplate.type,
          woType: 'Auto Generated',
          assignedTo: equipment.ownership?.mechanical || 'Unassigned',
          createdDate: new Date().toISOString().split('T')[0],
          scheduledDate: new Date(Date.now() + 24*60*60*1000).toISOString().split('T')[0],
          estimatedHours: rule.workOrderTemplate.estimatedHours,
          actualHours: null,
          progress: 0,
          estimatedCost: rule.workOrderTemplate.materials?.reduce((sum, mat) => sum + (mat.quantity * mat.unitCost), 0) || 0,
          actualCost: null,
          triggerCondition: {
            type: rule.triggerType,
            threshold: rule.triggerValue,
            currentValue: hoursSinceLastMaintenance,
            description: `${rule.name} - Auto generated at ${rule.triggerValue} hours`
          },
          materials: rule.workOrderTemplate.materials || [],
          labor: []
        };

        setData(prev => ({
          ...prev,
          workOrders: [...prev.workOrders, autoWO],
          autoWorkOrderRules: prev.autoWorkOrderRules.map(r => 
            r.id === rule.id ? { ...r, lastTriggered: new Date().toISOString() } : r
          )
        }));

        addActivity(`Auto Work Order ${autoWO.id} generated for ${equipment.name}`, 'Auto Work Order');
      }
    });
  };

  // Check for auto work orders on app load and periodically
  useEffect(() => {
    if (currentUser) {
      checkAutoWorkOrders();
      const interval = setInterval(checkAutoWorkOrders, 60000); // Check every minute
      return () => clearInterval(interval);
    }
  }, [currentUser, data.equipment, data.autoWorkOrderRules]);

  const contextValue = {
    currentUser,
    setCurrentUser,
    data,
    setData,
    updateData,
    addActivity,
    currentSection,
    setCurrentSection,
    sidebarOpen,
    setSidebarOpen,
    checkAutoWorkOrders
  };

  return (
    <AppContext.Provider value={contextValue}>
      <div className="min-h-screen bg-gray-100">
        {!currentUser ? <LoginPage /> : <MainApp />}
      </div>
    </AppContext.Provider>
  );
}

// PM Schedule Card Component
function PMScheduleCard({ pmSchedule, onUpdateStatus }) {
  const [expanded, setExpanded] = useState(false);
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'Scheduled': return 'bg-blue-100 text-blue-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const isOverdue = new Date(pmSchedule.nextDue) < new Date() && pmSchedule.status !== 'Completed';
  const actualStatus = isOverdue ? 'Overdue' : pmSchedule.status;

  const getNextStatus = (currentStatus) => {
    switch (currentStatus) {
      case 'Scheduled': return 'In Progress';
      case 'In Progress': return 'Completed';
      default: return null;
    }
  };

  const getActionLabel = (currentStatus) => {
    switch (currentStatus) {
      case 'Scheduled': return 'Start Maintenance';
      case 'In Progress': return 'Complete';
      default: return null;
    }
  };

  const handleStatusUpdate = () => {
    const nextStatus = getNextStatus(pmSchedule.status);
    if (nextStatus) {
      onUpdateStatus(pmSchedule.id, nextStatus);
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <h4 className="text-sm sm:text-lg font-medium text-gray-900 truncate">{pmSchedule.title}</h4>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(actualStatus)}`}>
              {actualStatus}
            </span>
            <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
              {pmSchedule.frequency}
            </span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
            <div>
              <span className="font-medium">Equipment:</span> <span className="truncate">{pmSchedule.equipmentName}</span>
            </div>
            <div>
              <span className="font-medium">Assigned:</span> {pmSchedule.assignedTo || 'Unassigned'}
            </div>
            <div>
              <span className="font-medium">Next Due:</span> 
              <span className={isOverdue ? 'text-red-600 font-medium' : ''}> {pmSchedule.nextDue}</span>
            </div>
            <div>
              <span className="font-medium">Duration:</span> {pmSchedule.estimatedDuration}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            {expanded ? <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5" /> : <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />}
          </button>
          
          {/* Action button */}
          {getActionLabel(pmSchedule.status) && (
            <button
              onClick={handleStatusUpdate}
              className="px-2 sm:px-3 py-1 bg-blue-600 text-white text-xs sm:text-sm rounded-lg hover:bg-blue-700 transition-colors min-h-[36px] flex items-center"
            >
              {pmSchedule.status === 'Scheduled' && <Play className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />}
              {pmSchedule.status === 'In Progress' && <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />}
              <span className="hidden sm:inline">{getActionLabel(pmSchedule.status)}</span>
              <span className="sm:hidden">{pmSchedule.status === 'Scheduled' ? 'Start' : 'Complete'}</span>
            </button>
          )}
        </div>
      </div>

      {expanded && (
        <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Checklist */}
            <div>
              <h5 className="font-medium text-gray-900 mb-3">Maintenance Checklist</h5>
              <div className="space-y-2">
                {pmSchedule.checklist?.map((item, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <input 
                      type="checkbox" 
                      className="mt-1 rounded text-blue-600 min-w-[16px] min-h-[16px]"
                      onChange={(e) => {
                        console.log(`Checklist item ${index} checked:`, e.target.checked);
                      }}
                    />
                    <span className="text-xs sm:text-sm text-gray-700 leading-relaxed">{item}</span>
                  </div>
                )) || <p className="text-xs sm:text-sm text-gray-500">No checklist items</p>}
              </div>
            </div>

            {/* History */}
            <div>
              <h5 className="font-medium text-gray-900 mb-3">Completion History</h5>
              <div className="space-y-2">
                {pmSchedule.completionHistory?.map((history, index) => (
                  <div key={index} className="text-xs sm:text-sm p-2 bg-gray-50 rounded">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Completed:</span>
                      <span>{history.completedDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">By:</span>
                      <span className="truncate ml-2">{history.completedBy}</span>
                    </div>
                    {history.actualCost && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Cost:</span>
                        <span>₹{history.actualCost}</span>
                      </div>
                    )}
                  </div>
                )) || <p className="text-xs sm:text-sm text-gray-500">No completion history</p>}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-gray-600">Estimated Cost:</span>
                  <span className="font-medium">₹{pmSchedule.estimatedCost}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 sm:mt-6 flex flex-wrap items-center gap-2">
            <button 
              onClick={() => alert('Edit functionality would be implemented here')}
              className="px-3 py-2 bg-gray-600 text-white text-xs sm:text-sm rounded-lg hover:bg-gray-700 transition-colors min-h-[44px] flex items-center"
            >
              <Edit className="w-4 h-4 mr-1 sm:mr-2" />
              Edit
            </button>
            <button 
              onClick={() => alert('Reschedule functionality would be implemented here')}
              className="px-3 py-2 bg-gray-600 text-white text-xs sm:text-sm rounded-lg hover:bg-gray-700 transition-colors min-h-[44px] flex items-center"
            >
              <Calendar className="w-4 h-4 mr-1 sm:mr-2" />
              Reschedule
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// PM Schedule Modal Component
function PMScheduleModal({ isOpen, onClose, onSave, equipment }) {
  const [formData, setFormData] = useState({
    equipmentId: '',
    equipmentName: '',
    title: '',
    frequency: '',
    assignedTo: '',
    estimatedDuration: '',
    estimatedCost: '',
    nextDue: '',
    checklist: []
  });

  const [checklistInput, setChecklistInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedEquipment = equipment.find(eq => eq.id === formData.equipmentId);
    if (selectedEquipment) {
      onSave({
        ...formData,
        equipmentName: selectedEquipment.name
      });
      onClose();
      setFormData({
        equipmentId: '',
        equipmentName: '',
        title: '',
        frequency: '',
        assignedTo: '',
        estimatedDuration: '',
        estimatedCost: '',
        nextDue: '',
        checklist: []
      });
      setChecklistInput('');
    }
  };

  const addChecklistItem = () => {
    if (checklistInput.trim()) {
      setFormData(prev => ({
        ...prev,
        checklist: [...prev.checklist, checklistInput.trim()]
      }));
      setChecklistInput('');
    }
  };

  const removeChecklistItem = (index) => {
    setFormData(prev => ({
      ...prev,
      checklist: prev.checklist.filter((_, i) => i !== index)
    }));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create PM Schedule"
      size="lg"
    >
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 sm:mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Equipment *
            </label>
            <select
              value={formData.equipmentId}
              onChange={(e) => setFormData({...formData, equipmentId: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base min-h-[44px]"
              required
            >
              <option value="">Select Equipment</option>
              {equipment.map(eq => (
                <option key={eq.id} value={eq.id}>
                  {eq.name} ({eq.code})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Frequency *
            </label>
            <select
              value={formData.frequency}
              onChange={(e) => setFormData({...formData, frequency: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base min-h-[44px]"
              required
            >
              <option value="">Select Frequency</option>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
              <option value="Quarterly">Quarterly</option>
              <option value="Annually">Annually</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Next Due Date *
            </label>
            <input
              type="date"
              value={formData.nextDue}
              onChange={(e) => setFormData({...formData, nextDue: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base min-h-[44px]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Assigned To
            </label>
            <input
              type="text"
              value={formData.assignedTo}
              onChange={(e) => setFormData({...formData, assignedTo: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base min-h-[44px]"
              placeholder="Technician name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Estimated Duration
            </label>
            <input
              type="text"
              value={formData.estimatedDuration}
              onChange={(e) => setFormData({...formData, estimatedDuration: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base min-h-[44px]"
              placeholder="e.g., 2 hours"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Estimated Cost
            </label>
            <input
              type="number"
              value={formData.estimatedCost}
              onChange={(e) => setFormData({...formData, estimatedCost: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base min-h-[44px]"
              placeholder="Cost in rupees"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base min-h-[44px]"
            placeholder="PM schedule title"
            required
          />
        </div>

        <div className="mb-4 sm:mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Maintenance Checklist
          </label>
          <div className="flex space-x-2 mb-2">
            <input
              type="text"
              value={checklistInput}
              onChange={(e) => setChecklistInput(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base min-h-[44px]"
              placeholder="Add checklist item..."
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addChecklistItem())}
            />
            <button
              type="button"
              onClick={addChecklistItem}
              className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm min-h-[44px]"
            >
              Add
            </button>
          </div>
          <div className="space-y-1">
            {formData.checklist.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm flex-1 mr-2">{item}</span>
                <button
                  type="button"
                  onClick={() => removeChecklistItem(index)}
                  className="text-red-600 hover:text-red-800 p-1 min-h-[32px] min-w-[32px] flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors text-sm min-h-[44px]"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm min-h-[44px] flex items-center justify-center"
          >
            <Save className="w-4 h-4 mr-2" />
            Create PM Schedule
          </button>
        </div>
      </form>
    </Modal>
  );
}

// Enhanced User Management Component
function UserManagement() {
  const { data, setData, addActivity } = useContext(AppContext);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const createUser = (userData) => {
    const newUser = {
      id: Date.now(),
      ...userData,
      status: 'Active',
      lastLogin: new Date().toISOString(),
      email: userData.email || `${userData.username}@company.com`,
      phone: userData.phone || '+91-0000000000'
    };

    setData(prev => ({
      ...prev,
      users: [...prev.users, newUser]
    }));

    addActivity(`User ${newUser.name} added to system`, 'User Management');
  };

  const updateUser = (userId, userData) => {
    setData(prev => ({
      ...prev,
      users: prev.users.map(u => u.id === userId ? { ...u, ...userData } : u)
    }));

    addActivity(`User ${userData.name} updated`, 'User Management');
  };

  const deleteUser = (userId) => {
    const user = data.users.find(u => u.id === userId);
    if (user && window.confirm(`Are you sure you want to delete user ${user.name}?`)) {
      setData(prev => ({
        ...prev,
        users: prev.users.filter(u => u.id !== userId)
      }));
      addActivity(`User ${user.name} deleted from system`, 'User Management');
    }
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const userStats = {
    total: data.users.length,
    active: data.users.filter(u => u.status === 'Active').length,
    administrators: data.users.filter(u => u.role === 'Administrator').length,
    technicians: data.users.filter(u => u.role === 'Field Technician').length
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 space-y-3 sm:space-y-0">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">User Management</h2>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm min-h-[44px] flex items-center justify-center"
          >
            <Plus className="w-4 h-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Add User</span>
            <span className="sm:hidden">Add User</span>
          </button>
        </div>

        {/* User Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6">
          <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-lg sm:text-2xl font-bold text-gray-900">{userStats.total}</p>
              </div>
              <Users className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500 flex-shrink-0" />
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-medium text-gray-600">Active</p>
                <p className="text-lg sm:text-2xl font-bold text-green-600">{userStats.active}</p>
              </div>
              <UserCheck className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0" />
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-medium text-gray-600">Administrators</p>
                <p className="text-lg sm:text-2xl font-bold text-purple-600">{userStats.administrators}</p>
              </div>
              <Settings className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500 flex-shrink-0" />
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-medium text-gray-600">Technicians</p>
                <p className="text-lg sm:text-2xl font-bold text-orange-600">{userStats.technicians}</p>
              </div>
              <Wrench className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500 flex-shrink-0" />
            </div>
          </div>
        </div>
      </div>

      {/* Users List */}
      <div className="bg-white rounded-lg shadow">
        {/* Mobile-friendly list */}
        <div className="block sm:hidden">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-base font-medium text-gray-900">Users</h3>
          </div>
          {data.users.map((user) => (
            <div key={user.id} className="p-4 border-b border-gray-200 last:border-b-0">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium text-sm flex-shrink-0">
                    {user.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">{user.name}</div>
                    <div className="text-xs text-gray-500">{user.username}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <button 
                    onClick={() => handleEditUser(user)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => deleteUser(user.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-gray-500">Role:</span> {user.role}
                </div>
                <div>
                  <span className="text-gray-500">Department:</span> {user.department}
                </div>
                <div className="flex items-center">
                  <span className="text-gray-500 mr-1">Status:</span>
                  <span className={`px-1.5 py-0.5 text-xs font-medium rounded ${
                    user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {user.status}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">Last Login:</span> {new Date(user.lastLogin).toLocaleDateString()}
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                <div>Email: {user.email}</div>
                <div>Phone: {user.phone}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                        {user.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.username}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.email}</div>
                    <div className="text-sm text-gray-500">{user.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(user.lastLogin).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => handleEditUser(user)}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => deleteUser(user.id)}
                        className="text-red-600 hover:text-red-900 p-1 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create User Modal */}
      <UserModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSave={createUser}
        title="Add New User"
      />

      {/* Edit User Modal */}
      <UserModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedUser(null);
        }}
        onSave={(userData) => updateUser(selectedUser.id, userData)}
        user={selectedUser}
        title="Edit User"
        isEdit={true}
      />
    </div>
  );
}

// Enhanced User Modal Component
function UserModal({ isOpen, onClose, onSave, user, title, isEdit }) {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    email: '',
    phone: '',
    role: '',
    department: '',
    status: 'Active'
  });

  useEffect(() => {
    if (user && isEdit) {
      setFormData({
        name: user.name || '',
        username: user.username || '',
        password: '', // Don't populate password for security
        email: user.email || '',
        phone: user.phone || '',
        role: user.role || '',
        department: user.department || '',
        status: user.status || 'Active'
      });
    } else {
      setFormData({
        name: '',
        username: '',
        password: '',
        email: '',
        phone: '',
        role: '',
        department: '',
        status: 'Active'
      });
    }
  }, [user, isEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSave = { ...formData };
    
    // Don't include password if it's empty during edit
    if (isEdit && !dataToSave.password) {
      delete dataToSave.password;
    }
    
    onSave(dataToSave);
    onClose();
    setFormData({
      name: '',
      username: '',
      password: '',
      email: '',
      phone: '',
      role: '',
      department: '',
      status: 'Active'
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title || 'Add New User'}
      size="lg"
    >
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 sm:mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base min-h-[44px]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username *
            </label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base min-h-[44px]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password {!isEdit && '*'}
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base min-h-[44px]"
              required={!isEdit}
              placeholder={isEdit ? 'Leave blank to keep current password' : ''}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base min-h-[44px]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base min-h-[44px]"
              placeholder="+91-0000000000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Role *
            </label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base min-h-[44px]"
              required
            >
              <option value="">Select Role</option>
              <option value="Administrator">Administrator</option>
              <option value="Department Head">Department Head</option>
              <option value="Supervisor">Supervisor</option>
              <option value="Field Technician">Field Technician</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Department *
            </label>
            <select
              value={formData.department}
              onChange={(e) => setFormData({...formData, department: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base min-h-[44px]"
              required
            >
              <option value="">Select Department</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Operations">Operations</option>
              <option value="Engineering">Engineering</option>
              <option value="Safety">Safety</option>
              <option value="Mechanical">Mechanical</option>
              <option value="Electrical">Electrical</option>
            </select>
          </div>

          {isEdit && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base min-h-[44px]"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors text-sm min-h-[44px]"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm min-h-[44px] flex items-center justify-center"
          >
            <Save className="w-4 h-4 mr-2" />
            {isEdit ? 'Update User' : 'Create User'}
          </button>
        </div>
      </form>
    </Modal>
  );
}

// Login Component (unchanged)
function LoginPage() {
  const { data, setCurrentUser } = useContext(AppContext);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const user = data.users.find(
      u => u.username === credentials.username && u.password === credentials.password
    );
    
    if (user) {
      setCurrentUser(user);
      setError('');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-700 px-4">
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <div className="text-center mb-6 sm:mb-8">
          <div className="text-3xl sm:text-4xl mb-4">🔧</div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">MMS</h1>
          <p className="text-gray-600 text-sm sm:text-base">Maintenance Management System</p>
        </div>
        
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
            <input
              type="text"
              value={credentials.username}
              onChange={(e) => setCredentials({...credentials, username: e.target.value})}
              className="w-full px-3 py-3 sm:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              className="w-full px-3 py-3 sm:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
              required
            />
          </div>
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}
          
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition duration-200 font-medium text-base"
          >
            Login
          </button>
        </form>
        
        <div className="mt-6 sm:mt-8 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-3">Demo Accounts:</h4>
          <div className="text-sm text-gray-600 space-y-1">
            <div><strong>Admin:</strong> admin / admin123</div>
            <div><strong>Supervisor:</strong> supervisor / super123</div>
            <div><strong>Technician:</strong> technician / tech123</div>
            <div><strong>Department Head:</strong> manager / manager123</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main App Layout (unchanged structure)
function MainApp() {
  const { currentUser, setCurrentUser, currentSection, setCurrentSection, sidebarOpen, setSidebarOpen } = useContext(AppContext);

  const navigation = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'equipment', label: 'Equipment Registry', icon: Factory },
    { id: 'inspections', label: 'Inspections', icon: Search },
    { id: 'backlogs', label: 'Backlogs', icon: FileText },
    { id: 'workorders', label: 'Work Orders', icon: Wrench },
    { id: 'preventive', label: 'Preventive Maintenance', icon: Calendar },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    ...(currentUser?.role === 'Administrator' ? [{ id: 'users', label: 'User Management', icon: Users }] : [])
  ];

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentSection('dashboard');
    setSidebarOpen(false);
  };

  const handleNavClick = (sectionId) => {
    setCurrentSection(sectionId);
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-100 relative">
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className={`${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } fixed lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out z-50 lg:z-auto w-64 bg-white shadow-lg h-full`}>
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-xl sm:text-2xl">🔧</div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-gray-900">MMS</h1>
                <p className="text-xs sm:text-sm text-gray-600">Maintenance System</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 rounded-lg hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <nav className="mt-4 sm:mt-6 overflow-y-auto h-full pb-20">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center px-4 sm:px-6 py-3 sm:py-3 text-left hover:bg-gray-50 transition-colors ${
                  currentSection === item.id ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : 'text-gray-700'
                } min-h-[48px]`}
              >
                <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
                <span className="text-sm sm:text-base">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 -ml-2"
              >
                <Menu className="w-5 h-5" />
              </button>
              <h2 className="text-lg sm:text-2xl font-semibold text-gray-900 capitalize">
                {currentSection.replace(/([A-Z])/g, ' $1').trim()}
              </h2>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
                  {currentUser?.name?.charAt(0)}
                </div>
                <span className="text-xs sm:text-sm text-gray-700 hidden sm:block">{currentUser?.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors min-h-[44px] min-w-[44px]"
              >
                <span className="hidden sm:inline">Logout</span>
                <span className="sm:hidden">Exit</span>
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 sm:p-6">
          {currentSection === 'dashboard' && <Dashboard />}
          {currentSection === 'equipment' && <EquipmentRegistry />}
          {currentSection === 'inspections' && <Inspections />}
          {currentSection === 'backlogs' && <Backlogs />}
          {currentSection === 'workorders' && <WorkOrders />}
          {currentSection === 'preventive' && <PreventiveMaintenance />}
          {currentSection === 'analytics' && <Analytics />}
          {currentSection === 'users' && <UserManagement />}
        </main>
      </div>
    </div>
  );
}

// Modal Component (unchanged)
function Modal({ isOpen, onClose, title, children, size = 'md' }) {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    '2xl': 'max-w-6xl'
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`bg-white rounded-lg shadow-xl w-full ${sizeClasses[size]} max-h-[90vh] overflow-y-auto`}>
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 sticky top-0 bg-white">
          <h3 className="text-base sm:text-lg font-medium text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4 sm:p-6">
          {children}
        </div>
      </div>
    </div>
  );
}

// Dashboard Component (unchanged)
function Dashboard() {
  const { data } = useContext(AppContext);
  
  const stats = [
    {
      label: 'Total Equipment',
      value: data.equipment.length,
      icon: Factory,
      color: 'bg-blue-500',
      change: '+5%'
    },
    {
      label: 'Active Inspections',
      value: data.inspections.filter(i => i.status === 'In Progress').length,
      icon: Search,
      color: 'bg-green-500',
      change: '+12%'
    },
    {
      label: 'Pending Backlogs',
      value: data.backlogs.filter(b => b.status !== 'Completed').length,
      icon: FileText,
      color: 'bg-yellow-500',
      change: '-8%'
    },
    {
      label: 'Work Orders',
      value: data.workOrders.length,
      icon: Wrench,
      color: 'bg-purple-500',
      change: '+3%'
    }
  ];

  const recentActivities = [
    { id: 1, action: 'Inspection completed', equipment: 'EAF-001', time: '2 hours ago', user: 'Amit Patel' },
    { id: 2, action: 'Work order created', equipment: 'CRN-001', time: '4 hours ago', user: 'Priya Sharma' },
    { id: 3, action: 'Equipment added', equipment: 'CNV-002', time: '6 hours ago', user: 'Rajesh Kumar' }
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">{stat.label}</p>
                  <p className="text-xl sm:text-3xl font-bold text-gray-900">{stat.value}</p>
                  <p className={`text-xs sm:text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'} hidden sm:block`}>
                    {stat.change} from last month
                  </p>
                </div>
                <div className={`${stat.color} p-2 sm:p-3 rounded-lg flex-shrink-0`}>
                  <Icon className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-4">Equipment Health Overview</h3>
          <div className="space-y-3 sm:space-y-4">
            {data.equipment.filter(eq => eq.level <= 2).map((eq) => (
              <div key={eq.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
                  <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                  <span className="text-xs sm:text-sm text-gray-700 truncate">{eq.name}</span>
                </div>
                <div className="flex items-center space-x-2 flex-shrink-0">
                  <div className="w-12 sm:w-20 bg-gray-200 rounded-full h-1.5 sm:h-2">
                    <div 
                      className="bg-green-500 h-1.5 sm:h-2 rounded-full" 
                      style={{ width: `${eq.healthScore}%` }}
                    ></div>
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-gray-900 w-8 text-right">{eq.healthScore}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-4">Recent Activities</h3>
          <div className="space-y-3 sm:space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm text-gray-900">{activity.action}</p>
                  <p className="text-xs sm:text-sm text-gray-600 truncate">{activity.equipment} • {activity.user}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Enhanced Equipment Registry with Hierarchical Structure
function EquipmentRegistry() {
  const { data, setData, addActivity } = useContext(AppContext);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [view, setView] = useState('tree');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCriticality, setFilterCriticality] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterLevel, setFilterLevel] = useState('all');
  const [expandedNodes, setExpandedNodes] = useState(new Set(['PLANT-001']));

  const filteredEquipment = data.equipment.filter(eq => {
    const matchesSearch = eq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         eq.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         eq.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCriticality = filterCriticality === 'all' || eq.criticality === filterCriticality;
    const matchesStatus = filterStatus === 'all' || eq.status === filterStatus;
    const matchesLevel = filterLevel === 'all' || eq.level.toString() === filterLevel;
    
    return matchesSearch && matchesCriticality && matchesStatus && matchesLevel;
  });

  const buildEquipmentHierarchy = (parentId = null) => {
    return data.equipment
      .filter(eq => eq.parent === parentId)
      .sort((a, b) => a.name.localeCompare(b.name));
  };

  const toggleNodeExpansion = (nodeId) => {
    setExpandedNodes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId);
      } else {
        newSet.add(nodeId);
      }
      return newSet;
    });
  };

  const handleAddEquipment = (equipmentData) => {
    const newEquipment = {
      ...equipmentData,
      id: `${equipmentData.type.toUpperCase()}-${Date.now()}`,
      healthScore: 100,
      lastMaintenance: null,
      nextMaintenance: null,
      maintenanceCost: 0,
      uptimePercentage: 100,
      runningHours: 0,
      lastMaintenanceHours: 0,
      nextMaintenanceHours: equipmentData.level === 5 ? 500 : 1000, // Components need more frequent maintenance
      children: []
    };

    setData(prev => ({
      ...prev,
      equipment: [...prev.equipment, newEquipment]
    }));

    addActivity(`Equipment ${newEquipment.name} added to registry at level ${newEquipment.level}`, 'Equipment');
    setShowCreateModal(false);
    setSelectedEquipment(null);
  };

  const handleEditEquipment = (equipmentId, updatedData) => {
    setData(prev => ({
      ...prev,
      equipment: prev.equipment.map(eq => 
        eq.id === equipmentId ? { ...eq, ...updatedData } : eq
      )
    }));
    addActivity(`Equipment ${updatedData.name} updated`, 'Equipment');
  };

  const handleDeleteEquipment = (equipmentId) => {
    const equipment = data.equipment.find(eq => eq.id === equipmentId);
    const hasChildren = data.equipment.some(eq => eq.parent === equipmentId);
    
    if (hasChildren) {
      alert('Cannot delete equipment that has child components. Please delete or reassign child components first.');
      return;
    }
    
    if (equipment && window.confirm(`Are you sure you want to delete ${equipment.name}?`)) {
      setData(prev => ({
        ...prev,
        equipment: prev.equipment.filter(eq => eq.id !== equipmentId)
      }));
      addActivity(`Equipment ${equipment.name} deleted`, 'Equipment');
    }
  };

  const handleViewEquipment = (equipment) => {
    setSelectedEquipment(equipment);
    setShowViewModal(true);
  };

  const handleImportEquipment = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv,.xlsx,.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        addActivity(`Equipment import initiated: ${file.name}`, 'Import');
        alert(`Import functionality for ${file.name} would be implemented here. File uploaded successfully!`);
      }
    };
    input.click();
  };

  const handleExportEquipment = () => {
    const csvContent = [
      ['Code', 'Name', 'Type', 'Level', 'Parent', 'Location', 'Criticality', 'Status', 'Health Score'].join(','),
      ...filteredEquipment.map(eq => [
        eq.code, eq.name, eq.type, eq.level, eq.parent || '', eq.location, eq.criticality, eq.status, eq.healthScore
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `equipment_hierarchy_export_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    addActivity('Equipment hierarchy data exported', 'Export');
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header and Controls */}
      <div className="bg-white rounded-lg shadow p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 space-y-3 sm:space-y-0">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Equipment Registry</h2>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm min-h-[44px] flex items-center"
            >
              <Plus className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Add Equipment</span>
              <span className="sm:hidden">Add</span>
            </button>
            <button
              onClick={handleImportEquipment}
              className="px-3 sm:px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm min-h-[44px] flex items-center"
            >
              <Upload className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Import</span>
              <span className="sm:hidden">Import</span>
            </button>
            <button
              onClick={handleExportEquipment}
              className="px-3 sm:px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm min-h-[44px] flex items-center"
            >
              <Download className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Export</span>
              <span className="sm:hidden">Export</span>
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 mb-4">
          <div className="sm:col-span-2">
            <input
              type="text"
              placeholder="Search equipment..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base min-h-[44px]"
            />
          </div>
          <select
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base min-h-[44px]"
          >
            <option value="all">All Levels</option>
            <option value="1">Plant</option>
            <option value="2">Equipment</option>
            <option value="3">Assembly</option>
            <option value="4">Sub-Assembly</option>
            <option value="5">Component</option>
          </select>
          <select
            value={filterCriticality}
            onChange={(e) => setFilterCriticality(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base min-h-[44px]"
          >
            <option value="all">All Criticality</option>
            <option value="A">Critical (A)</option>
            <option value="B">Important (B)</option>
            <option value="C">Standard (C)</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base min-h-[44px]"
          >
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Decommissioned">Decommissioned</option>
          </select>
        </div>

        {/* View Toggle */}
        <div className="flex bg-gray-100 rounded-lg p-1">
          {['tree', 'cards', 'list'].map((viewType) => (
            <button
              key={viewType}
              onClick={() => setView(viewType)}
              className={`px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors min-h-[40px] flex-1 ${
                view === viewType 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {viewType.charAt(0).toUpperCase() + viewType.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Equipment Content */}
      {view === 'tree' && (
        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-4">Equipment Hierarchy</h3>
          <EquipmentHierarchyTree 
            equipment={data.equipment}
            filteredEquipment={filteredEquipment}
            expandedNodes={expandedNodes}
            onToggleExpansion={toggleNodeExpansion}
            onView={handleViewEquipment}
            onEdit={(eq) => {
              setSelectedEquipment(eq);
              setShowCreateModal(true);
            }}
            onDelete={handleDeleteEquipment}
          />
        </div>
      )}

      {view === 'cards' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredEquipment.map((equipment) => (
            <EquipmentCard 
              key={equipment.id} 
              equipment={equipment}
              onView={() => handleViewEquipment(equipment)}
              onEdit={() => {
                setSelectedEquipment(equipment);
                setShowCreateModal(true);
              }}
              onDelete={() => handleDeleteEquipment(equipment.id)}
            />
          ))}
        </div>
      )}

      {view === 'list' && (
        <div className="bg-white rounded-lg shadow">
          <div className="block sm:hidden">
            {filteredEquipment.map((equipment) => (
              <div key={equipment.id} className="p-4 border-b border-gray-200 last:border-b-0">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 truncate">{equipment.name}</h3>
                    <p className="text-xs text-gray-500">{equipment.code} • Level {equipment.level}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <button 
                      onClick={() => handleViewEquipment(equipment)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => {
                        setSelectedEquipment(equipment);
                        setShowCreateModal(true);
                      }}
                      className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-gray-500">Type:</span> {equipment.type}
                  </div>
                  <div>
                    <span className="text-gray-500">Location:</span> {equipment.location}
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-500 mr-1">Criticality:</span>
                    <span className={`px-1.5 py-0.5 text-xs font-medium rounded ${
                      equipment.criticality === 'A' ? 'bg-red-100 text-red-800' :
                      equipment.criticality === 'B' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {equipment.criticality}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-500 mr-1">Health:</span>
                    <span className="font-medium">{equipment.healthScore}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="hidden sm:block overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Equipment</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Criticality</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Health</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Running Hours</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredEquipment.map((equipment) => (
                  <tr key={equipment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{equipment.name}</div>
                        <div className="text-sm text-gray-500">{equipment.code}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">
                        Level {equipment.level} ({equipment.type})
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{equipment.location}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        equipment.criticality === 'A' ? 'bg-red-100 text-red-800' :
                        equipment.criticality === 'B' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {equipment.criticality}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-3">
                          <div 
                            className={`h-2 rounded-full ${
                              equipment.healthScore >= 90 ? 'bg-green-500' :
                              equipment.healthScore >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${equipment.healthScore}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-900">{equipment.healthScore}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {equipment.runningHours}h
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => handleViewEquipment(equipment)}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => {
                            setSelectedEquipment(equipment);
                            setShowCreateModal(true);
                          }}
                          className="text-gray-600 hover:text-gray-900 p-1 rounded"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteEquipment(equipment.id)}
                          className="text-red-600 hover:text-red-900 p-1 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add/Edit Equipment Modal */}
      <EquipmentModal
        isOpen={showCreateModal}
        onClose={() => {
          setShowCreateModal(false);
          setSelectedEquipment(null);
        }}
        onSave={handleAddEquipment}
        equipment={selectedEquipment}
        isEdit={!!selectedEquipment}
        availableParents={data.equipment}
      />

      {/* View Equipment Modal */}
      <Modal
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        title="Equipment Details"
        size="xl"
      >
        {selectedEquipment && <EquipmentDetails equipment={selectedEquipment} />}
      </Modal>
    </div>
  );
}

// Equipment Hierarchy Tree Component
function EquipmentHierarchyTree({ equipment, filteredEquipment, expandedNodes, onToggleExpansion, onView, onEdit, onDelete }) {
  const buildTree = (parentId = null, level = 0) => {
    const children = equipment
      .filter(eq => eq.parent === parentId)
      .sort((a, b) => a.name.localeCompare(b.name));
    
    return children.map(eq => {
      const hasChildren = equipment.some(child => child.parent === eq.id);
      const isExpanded = expandedNodes.has(eq.id);
      const isVisible = filteredEquipment.some(filteredEq => filteredEq.id === eq.id);
      
      if (!isVisible && level > 0) return null;

      return (
        <div key={eq.id} className={`ml-${level * 4}`}>
          <div className="flex items-center py-2 px-3 hover:bg-gray-50 rounded-lg group min-h-[44px]">
            {hasChildren ? (
              <button
                onClick={() => onToggleExpansion(eq.id)}
                className="p-1 rounded hover:bg-gray-200 mr-2 min-h-[32px] min-w-[32px] flex items-center justify-center"
              >
                {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>
            ) : (
              <div className="w-8 mr-2"></div>
            )}
            
            <div className={`w-4 h-4 rounded mr-3 flex-shrink-0 ${
              eq.level === 1 ? 'bg-blue-500' :
              eq.level === 2 ? 'bg-green-500' :
              eq.level === 3 ? 'bg-yellow-500' :
              eq.level === 4 ? 'bg-orange-500' : 'bg-purple-500'
            }`}></div>
            
            <div className="flex-1 min-w-0 cursor-pointer" onClick={() => onView(eq)}>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-900 truncate">{eq.name}</span>
                <span className="text-xs text-gray-500 flex-shrink-0">({eq.code})</span>
                <span className={`px-2 py-1 text-xs font-medium rounded-full flex-shrink-0 ${
                  eq.criticality === 'A' ? 'bg-red-100 text-red-800' :
                  eq.criticality === 'B' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {eq.criticality}
                </span>
              </div>
              <div className="text-xs text-gray-500 truncate">
                Level {eq.level} • {eq.type} • {eq.location}
              </div>
            </div>
            
            <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={(e) => { e.stopPropagation(); onView(eq); }}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center"
              >
                <Eye className="w-4 h-4" />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); onEdit(eq); }}
                className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); onDelete(eq.id); }}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {hasChildren && isExpanded && (
            <div className="ml-4">
              {buildTree(eq.id, level + 1)}
            </div>
          )}
        </div>
      );
    }).filter(Boolean);
  };

  return <div>{buildTree()}</div>;
}

// Enhanced Equipment Card (unchanged from previous version)
function EquipmentCard({ equipment, onView, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 sm:p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-3 sm:mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-base sm:text-lg font-medium text-gray-900 truncate">{equipment.name}</h3>
          <p className="text-xs sm:text-sm text-gray-600">{equipment.code} • Level {equipment.level}</p>
        </div>
        <span className={`px-2 py-1 text-xs font-medium rounded-full flex-shrink-0 ${
          equipment.criticality === 'A' ? 'bg-red-100 text-red-800' :
          equipment.criticality === 'B' ? 'bg-yellow-100 text-yellow-800' :
          'bg-green-100 text-green-800'
        }`}>
          {equipment.criticality}
        </span>
      </div>

      <div className="space-y-2 sm:space-y-3">
        <div className="flex items-center justify-between text-xs sm:text-sm">
          <span className="text-gray-600">Type:</span>
          <span className="font-medium truncate ml-2">{equipment.type}</span>
        </div>
        <div className="flex items-center justify-between text-xs sm:text-sm">
          <span className="text-gray-600">Location:</span>
          <span className="font-medium truncate ml-2">{equipment.location}</span>
        </div>
        <div className="flex items-center justify-between text-xs sm:text-sm">
          <span className="text-gray-600">Running Hours:</span>
          <span className="font-medium">{equipment.runningHours}h</span>
        </div>
        <div className="flex items-center justify-between text-xs sm:text-sm">
          <span className="text-gray-600">Health Score:</span>
          <div className="flex items-center space-x-2">
            <div className="w-8 sm:w-12 bg-gray-200 rounded-full h-1.5 sm:h-2">
              <div 
                className={`h-1.5 sm:h-2 rounded-full ${
                  equipment.healthScore >= 90 ? 'bg-green-500' :
                  equipment.healthScore >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${equipment.healthScore}%` }}
              ></div>
            </div>
            <span className="font-medium text-xs sm:text-sm">{equipment.healthScore}%</span>
          </div>
        </div>
        <div className="flex items-center justify-between text-xs sm:text-sm">
          <span className="text-gray-600">Status:</span>
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            equipment.status === 'Active' ? 'bg-green-100 text-green-800' :
            equipment.status === 'Maintenance' ? 'bg-yellow-100 text-yellow-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {equipment.status}
          </span>
        </div>
      </div>

      <div className="mt-4 sm:mt-6 flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <button 
            onClick={onView}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button 
            onClick={onEdit}
            className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button 
            onClick={onDelete}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
        <div className="text-xs text-gray-500 truncate ml-2">
          {equipment.nextMaintenance && `Next PM: ${equipment.nextMaintenance}`}
        </div>
      </div>
    </div>
  );
}

// Enhanced Equipment Details Component
function EquipmentDetails({ equipment }) {
  const { data } = useContext(AppContext);
  
  // Get child equipment
  const childEquipment = data.equipment.filter(eq => eq.parent === equipment.id);
  
  // Get parent equipment
  const parentEquipment = equipment.parent ? data.equipment.find(eq => eq.id === equipment.parent) : null;

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <h4 className="text-base sm:text-lg font-medium text-gray-900 mb-3 sm:mb-4">Basic Information</h4>
          <div className="space-y-2 sm:space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600 text-sm">Code:</span>
              <span className="font-medium text-sm">{equipment.code}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 text-sm">Type:</span>
              <span className="font-medium text-sm">{equipment.type} (Level {equipment.level})</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 text-sm">Location:</span>
              <span className="font-medium text-sm">{equipment.location}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 text-sm">Criticality:</span>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                equipment.criticality === 'A' ? 'bg-red-100 text-red-800' :
                equipment.criticality === 'B' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {equipment.criticality}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 text-sm">Status:</span>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                equipment.status === 'Active' ? 'bg-green-100 text-green-800' :
                equipment.status === 'Maintenance' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {equipment.status}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 text-sm">Running Hours:</span>
              <span className="font-medium text-sm">{equipment.runningHours}h</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-base sm:text-lg font-medium text-gray-900 mb-3 sm:mb-4">Technical Details</h4>
          <div className="space-y-2 sm:space-y-3">
            {equipment.manufacturer && (
              <div className="flex justify-between">
                <span className="text-gray-600 text-sm">Manufacturer:</span>
                <span className="font-medium text-sm">{equipment.manufacturer}</span>
              </div>
            )}
            {equipment.model && (
              <div className="flex justify-between">
                <span className="text-gray-600 text-sm">Model:</span>
                <span className="font-medium text-sm">{equipment.model}</span>
              </div>
            )}
            {equipment.serialNumber && (
              <div className="flex justify-between">
                <span className="text-gray-600 text-sm">Serial Number:</span>
                <span className="font-medium text-sm">{equipment.serialNumber}</span>
              </div>
            )}
            {equipment.commissionDate && (
              <div className="flex justify-between">
                <span className="text-gray-600 text-sm">Commission Date:</span>
                <span className="font-medium text-sm">{equipment.commissionDate}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-600 text-sm">Next Maintenance:</span>
              <span className="font-medium text-sm">{equipment.nextMaintenanceHours}h</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hierarchy Information */}
      <div>
        <h4 className="text-base sm:text-lg font-medium text-gray-900 mb-3 sm:mb-4">Hierarchy</h4>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <h5 className="text-sm font-medium text-gray-700 mb-2">Parent Equipment</h5>
            {parentEquipment ? (
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-sm font-medium text-gray-900">{parentEquipment.name}</div>
                <div className="text-xs text-gray-500">{parentEquipment.code} • Level {parentEquipment.level}</div>
              </div>
            ) : (
              <p className="text-sm text-gray-500">No parent (Root level)</p>
            )}
          </div>
          <div>
            <h5 className="text-sm font-medium text-gray-700 mb-2">Child Equipment ({childEquipment.length})</h5>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {childEquipment.length > 0 ? (
                childEquipment.map(child => (
                  <div key={child.id} className="p-2 bg-gray-50 rounded">
                    <div className="text-sm font-medium text-gray-900">{child.name}</div>
                    <div className="text-xs text-gray-500">{child.code} • Level {child.level}</div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No child equipment</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {equipment.description && (
        <div>
          <h4 className="text-base sm:text-lg font-medium text-gray-900 mb-3 sm:mb-4">Description</h4>
          <p className="text-gray-700 text-sm sm:text-base">{equipment.description}</p>
        </div>
      )}

      {equipment.specifications && Object.keys(equipment.specifications).length > 0 && (
        <div>
          <h4 className="text-base sm:text-lg font-medium text-gray-900 mb-3 sm:mb-4">Specifications</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {Object.entries(equipment.specifications).map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <span className="text-gray-600 text-sm">{key}:</span>
                <span className="font-medium text-sm">{value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {equipment.ownership && (
        <div>
          <h4 className="text-base sm:text-lg font-medium text-gray-900 mb-3 sm:mb-4">Ownership</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {Object.entries(equipment.ownership).map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <span className="text-gray-600 text-sm">{key.charAt(0).toUpperCase() + key.slice(1)}:</span>
                <span className="font-medium text-sm">{value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Enhanced Equipment Modal with Hierarchy Support
function EquipmentModal({ isOpen, onClose, onSave, equipment, isEdit, availableParents }) {
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    type: 'equipment',
    level: 2,
    parent: '',
    criticality: '',
    location: '',
    status: 'Active',
    description: '',
    manufacturer: '',
    model: '',
    serialNumber: '',
    commissionDate: '',
    runningHours: 0,
    specifications: {},
    ownership: {}
  });

  const equipmentTypes = [
    { value: 'plant', label: 'Plant', level: 1 },
    { value: 'equipment', label: 'Equipment', level: 2 },
    { value: 'assembly', label: 'Assembly', level: 3 },
    { value: 'sub-assembly', label: 'Sub-Assembly', level: 4 },
    { value: 'component', label: 'Component', level: 5 }
  ];

  useEffect(() => {
    if (equipment && isEdit) {
      setFormData(equipment);
    } else {
      setFormData({
        code: '',
        name: '',
        type: 'equipment',
        level: 2,
        parent: '',
        criticality: '',
        location: '',
        status: 'Active',
        description: '',
        manufacturer: '',
        model: '',
        serialNumber: '',
        commissionDate: '',
        runningHours: 0,
        specifications: {},
        ownership: {}
      });
    }
  }, [equipment, isEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTypeChange = (type) => {
    const selectedType = equipmentTypes.find(t => t.value === type);
    if (selectedType) {
      setFormData(prev => ({
        ...prev,
        type: type,
        level: selectedType.level,
        parent: selectedType.level === 1 ? '' : prev.parent // Clear parent if plant level
      }));
    }
  };

  // Filter available parents based on hierarchy rules
  const getAvailableParents = () => {
    if (formData.level === 1) return []; // Plants have no parents
    
    const targetParentLevel = formData.level - 1;
    return availableParents.filter(eq => 
      eq.level === targetParentLevel && 
      eq.id !== formData.id // Prevent self-selection
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? 'Edit Equipment' : 'Add New Equipment'}
      size="xl"
    >
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 sm:mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Equipment Code *
            </label>
            <input
              type="text"
              value={formData.code}
              onChange={(e) => handleInputChange('code', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base min-h-[44px]"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Equipment Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base min-h-[44px]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type & Level *
            </label>
            <select
              value={formData.type}
              onChange={(e) => handleTypeChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base min-h-[44px]"
              required
            >
              <option value="">Select Type</option>
              {equipmentTypes.map(type => (
                <option key={type.value} value={type.value}>
                  Level {type.level} - {type.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Parent Equipment
            </label>
            <select
              value={formData.parent || ''}
              onChange={(e) => handleInputChange('parent', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base min-h-[44px]"
              disabled={formData.level === 1}
            >
              <option value="">
                {formData.level === 1 ? 'None (Plant Level)' : 'Select Parent'}
              </option>
              {getAvailableParents().map(eq => (
                <option key={eq.id} value={eq.id}>
                  {eq.name} ({eq.code})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Criticality *
            </label>
            <select
              value={formData.criticality}
              onChange={(e) => handleInputChange('criticality', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base min-h-[44px]"
              required
            >
              <option value="">Select Criticality</option>
              <option value="A">A - Critical</option>
              <option value="B">B - Important</option>
              <option value="C">C - Standard</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location *
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base min-h-[44px]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Manufacturer
            </label>
            <input
              type="text"
              value={formData.manufacturer}
              onChange={(e) => handleInputChange('manufacturer', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base min-h-[44px]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Model
            </label>
            <input
              type="text"
              value={formData.model}
              onChange={(e) => handleInputChange('model', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base min-h-[44px]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Serial Number
            </label>
            <input
              type="text"
              value={formData.serialNumber}
              onChange={(e) => handleInputChange('serialNumber', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base min-h-[44px]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Commission Date
            </label>
            <input
              type="date"
              value={formData.commissionDate}
              onChange={(e) => handleInputChange('commissionDate', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base min-h-[44px]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Running Hours
            </label>
            <input
              type="number"
              value={formData.runningHours}
              onChange={(e) => handleInputChange('runningHours', parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base min-h-[44px]"
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => handleInputChange('status', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base min-h-[44px]"
            >
              <option value="Active">Active</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Decommissioned">Decommissioned</option>
            </select>
          </div>
        </div>

        <div className="mb-4 sm:mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
          />
        </div>

        <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors text-sm min-h-[44px]"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm min-h-[44px] flex items-center justify-center"
          >
            <Save className="w-4 h-4 mr-2" />
            {isEdit ? 'Update' : 'Create'} Equipment
          </button>
        </div>
      </form>
    </Modal>
  );
}

// Enhanced Analytics Component with working functionality
function Analytics() {
  const { data } = useContext(AppContext);
  const [timeRange, setTimeRange] = useState('30d');
  const [viewType, setViewType] = useState('overview');

  // Calculate KPIs
  const kpis = {
    mttr: 2.3, // Mean Time to Repair (hours)
    mtbf: 720, // Mean Time Between Failures (hours)
    availability: 96.5, // Overall Equipment Effectiveness
    maintenanceCosts: 485000, // Total maintenance costs
    costPerHour: 675, // Cost per maintenance hour
    plannerCompliance: 87, // Planned vs Unplanned maintenance
    workOrderCompletion: 94, // Work order completion rate
    inventoryTurnover: 4.2 // Inventory turnover ratio
  };

  const maintenanceTrends = [
    { month: 'Oct', planned: 15, unplanned: 8, emergency: 2 },
    { month: 'Nov', planned: 18, unplanned: 6, emergency: 1 },
    { month: 'Dec', planned: 20, unplanned: 5, emergency: 3 },
    { month: 'Jan', planned: 22, unplanned: 4, emergency: 1 }
  ];

  const costBreakdown = [
    { category: 'Labor', cost: 185000, percentage: 38 },
    { category: 'Materials', cost: 145000, percentage: 30 },
    { category: 'Contractors', cost: 95000, percentage: 20 },
    { category: 'Tools & Equipment', cost: 60000, percentage: 12 }
  ];

  const equipmentCriticality = [
    { level: 'Critical (A)', count: data.equipment.filter(eq => eq.criticality === 'A').length, downtime: 12 },
    { level: 'Important (B)', count: data.equipment.filter(eq => eq.criticality === 'B').length, downtime: 8 },
    { level: 'Standard (C)', count: data.equipment.filter(eq => eq.criticality === 'C').length, downtime: 5 }
  ];

  const workOrderAnalytics = {
    total: data.workOrders.length,
    autoGenerated: data.workOrders.filter(wo => wo.woType === 'Auto Generated').length,
    userGenerated: data.workOrders.filter(wo => wo.woType === 'User Generated').length,
    avgCompletionTime: 4.2,
    onTimeCompletion: 87
  };

  const inspectionAnalytics = {
    total: data.inspections.length,
    completed: data.inspections.filter(i => i.status === 'Completed').length,
    avgHealthScoreImprovement: 2.3,
    findingsGenerated: data.inspections.reduce((sum, i) => sum + (i.findings?.length || 0), 0)
  };

  const exportAnalytics = () => {
    const analyticsData = {
      timeRange,
      kpis,
      maintenanceTrends,
      costBreakdown,
      equipmentCriticality,
      workOrderAnalytics,
      inspectionAnalytics,
      generatedAt: new Date().toISOString()
    };

    const dataStr = JSON.stringify(analyticsData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics_report_${timeRange}_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Controls */}
      <div className="bg-white rounded-lg shadow p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Analytics Dashboard</h2>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <select 
              value={timeRange} 
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm min-h-[44px]"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
            <button
              onClick={exportAnalytics}
              className="px-3 sm:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm min-h-[44px] flex items-center justify-center"
            >
              <Download className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Export Report</span>
              <span className="sm:hidden">Export</span>
            </button>
            <div className="flex bg-gray-100 rounded-lg p-1">
              {['overview', 'costs', 'performance', 'reliability'].map((type) => (
                <button
                  key={type}
                  onClick={() => setViewType(type)}
                  className={`px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm font-medium transition-colors flex-1 min-h-[36px] ${
                    viewType === type 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        <div className="bg-white rounded-lg shadow p-3 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600">MTTR</p>
              <p className="text-lg sm:text-2xl font-bold text-gray-900">{kpis.mttr}h</p>
              <p className="text-xs sm:text-sm text-green-600 hidden sm:block">↓ 12% from last month</p>
            </div>
            <Timer className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500 flex-shrink-0" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-3 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600">MTBF</p>
              <p className="text-lg sm:text-2xl font-bold text-gray-900">{kpis.mtbf}h</p>
              <p className="text-xs sm:text-sm text-green-600 hidden sm:block">↑ 8% from last month</p>
            </div>
            <Target className="w-6 h-6 sm:w-8 sm:h-8 text-green-500 flex-shrink-0" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-3 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Availability</p>
              <p className="text-lg sm:text-2xl font-bold text-gray-900">{kpis.availability}%</p>
              <p className="text-xs sm:text-sm text-green-600 hidden sm:block">↑ 2% from last month</p>
            </div>
            <Gauge className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500 flex-shrink-0" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-3 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Maintenance Costs</p>
              <p className="text-lg sm:text-2xl font-bold text-gray-900">₹{(kpis.maintenanceCosts / 1000).toFixed(0)}K</p>
              <p className="text-xs sm:text-sm text-red-600 hidden sm:block">↑ 5% from last month</p>
            </div>
            <DollarSign className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500 flex-shrink-0" />
          </div>
        </div>
      </div>

      {/* Content based on view type */}
      {viewType === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Maintenance Trends */}
          <div className="bg-white rounded-lg shadow p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-4">Maintenance Trends</h3>
            <div className="space-y-3 sm:space-y-4">
              {maintenanceTrends.map((trend) => (
                <div key={trend.month} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{trend.month}</span>
                  <div className="flex flex-col sm:flex-row items-end sm:items-center space-y-1 sm:space-y-0 sm:space-x-4">
                    <div className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
                      <span className="text-gray-600">{trend.planned} Planned</span>
                    </div>
                    <div className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-gray-600">{trend.unplanned} Unplanned</span>
                    </div>
                    <div className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
                      <span className="text-gray-600">{trend.emergency} Emergency</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Work Order Analytics */}
          <div className="bg-white rounded-lg shadow p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-4">Work Order Analytics</h3>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Work Orders:</span>
                <span className="font-medium">{workOrderAnalytics.total}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Auto Generated:</span>
                <span className="font-medium text-blue-600">{workOrderAnalytics.autoGenerated}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">User Generated:</span>
                <span className="font-medium text-purple-600">{workOrderAnalytics.userGenerated}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Avg Completion Time:</span>
                <span className="font-medium">{workOrderAnalytics.avgCompletionTime} days</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">On-time Completion:</span>
                <span className="font-medium text-green-600">{workOrderAnalytics.onTimeCompletion}%</span>
              </div>
            </div>
          </div>

          {/* Equipment Criticality Distribution */}
          <div className="bg-white rounded-lg shadow p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-4">Equipment by Criticality</h3>
            <div className="space-y-3 sm:space-y-4">
              {equipmentCriticality.map((item) => (
                <div key={item.level} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
                    <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full flex-shrink-0 ${
                      item.level.includes('Critical') ? 'bg-red-500' :
                      item.level.includes('Important') ? 'bg-yellow-500' : 'bg-green-500'
                    }`}></div>
                    <span className="text-xs sm:text-sm font-medium text-gray-700 truncate">{item.level}</span>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-xs sm:text-sm font-medium text-gray-900">{item.count} units</div>
                    <div className="text-xs text-gray-500">{item.downtime}% downtime</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Inspection Analytics */}
          <div className="bg-white rounded-lg shadow p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-4">Inspection Performance</h3>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Inspections:</span>
                <span className="font-medium">{inspectionAnalytics.total}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Completed:</span>
                <span className="font-medium text-green-600">{inspectionAnalytics.completed}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Avg Health Improvement:</span>
                <span className="font-medium text-blue-600">+{inspectionAnalytics.avgHealthScoreImprovement}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Findings Generated:</span>
                <span className="font-medium">{inspectionAnalytics.findingsGenerated}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {viewType === 'costs' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Cost Breakdown */}
          <div className="bg-white rounded-lg shadow p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-4">Cost Breakdown</h3>
            <div className="space-y-3 sm:space-y-4">
              {costBreakdown.map((item) => (
                <div key={item.category} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-medium text-gray-700">{item.category}</span>
                    <span className="text-xs sm:text-sm font-medium text-gray-900">₹{(item.cost / 1000).toFixed(0)}K ({item.percentage}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
                    <div 
                      className="bg-blue-500 h-1.5 sm:h-2 rounded-full" 
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cost per Equipment */}
          <div className="bg-white rounded-lg shadow p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-4">Cost per Equipment</h3>
            <div className="space-y-3 sm:space-y-4">
              {data.equipment.slice(0, 6).map((eq) => (
                <div key={eq.id} className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="text-xs sm:text-sm font-medium text-gray-900 truncate">{eq.name}</div>
                    <div className="text-xs text-gray-500">{eq.code}</div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-xs sm:text-sm font-medium text-gray-900">₹{(eq.maintenanceCost / 1000).toFixed(0)}K</div>
                    <div className="text-xs text-gray-500">This month</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {viewType === 'performance' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Equipment Performance */}
          <div className="bg-white rounded-lg shadow p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-4">Equipment Performance</h3>
            <div className="space-y-3 sm:space-y-4">
              {data.equipment.slice(0, 6).map((eq) => (
                <div key={eq.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-medium text-gray-700 truncate">{eq.name}</span>
                    <span className="text-xs sm:text-sm font-medium text-gray-900">{eq.uptimePercentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
                    <div 
                      className={`h-1.5 sm:h-2 rounded-full ${
                        eq.uptimePercentage >= 95 ? 'bg-green-500' :
                        eq.uptimePercentage >= 90 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${eq.uptimePercentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Maintenance Efficiency */}
          <div className="bg-white rounded-lg shadow p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-4">Maintenance Efficiency</h3>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-green-600">94%</div>
                <div className="text-xs sm:text-sm text-gray-600">Work Order Completion Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-blue-600">87%</div>
                <div className="text-xs sm:text-sm text-gray-600">Planned Maintenance Compliance</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-purple-600">4.2</div>
                <div className="text-xs sm:text-sm text-gray-600">Average Response Time (hours)</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {viewType === 'reliability' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Reliability Metrics */}
          <div className="bg-white rounded-lg shadow p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-4">Reliability Metrics</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Mean Time Between Failures:</span>
                <span className="font-bold text-lg text-green-600">{kpis.mtbf}h</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Mean Time To Repair:</span>
                <span className="font-bold text-lg text-blue-600">{kpis.mttr}h</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Overall Equipment Effectiveness:</span>
                <span className="font-bold text-lg text-purple-600">{kpis.availability}%</span>
              </div>
            </div>
          </div>

          {/* Failure Analysis */}
          <div className="bg-white rounded-lg shadow p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-4">Failure Analysis</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Mechanical Failures:</span>
                <span className="font-medium">45%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Electrical Failures:</span>
                <span className="font-medium">30%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Operational Issues:</span>
                <span className="font-medium">15%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Other:</span>
                <span className="font-medium">10%</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Enhanced Preventive Maintenance Component (similar structure but with auto-generation)
function PreventiveMaintenance() {
  const { data, setData, addActivity } = useContext(AppContext);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [view, setView] = useState('schedule');

  const pmStats = {
    scheduled: data.preventiveMaintenance.filter(pm => pm.status === 'Scheduled').length,
    overdue: data.preventiveMaintenance.filter(pm => 
      new Date(pm.nextDue) < new Date() && pm.status !== 'Completed'
    ).length,
    completed: data.preventiveMaintenance.filter(pm => pm.status === 'Completed').length,
    compliance: 87
  };

  const createPMSchedule = (equipmentId, frequency, title, tasks) => {
    const equipment = data.equipment.find(eq => eq.id === equipmentId);
    if (!equipment) return;

    const getNextDueDate = (freq) => {
      const now = new Date();
      switch (freq) {
        case 'Weekly': return new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
        case 'Monthly': return new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());
        case 'Quarterly': return new Date(now.getFullYear(), now.getMonth() + 3, now.getDate());
        case 'Annually': return new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());
        default: return new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
      }
    };

    const newPM = {
      id: `PM-${Date.now()}`,
      equipmentId: equipment.id,
      equipmentName: equipment.name,
      title: title,
      frequency: frequency,
      lastPerformed: null,
      nextDue: getNextDueDate(frequency).toISOString().split('T')[0],
      assignedTo: equipment.ownership?.mechanical || null,
      estimatedDuration: frequency === 'Weekly' ? '2 hours' : frequency === 'Monthly' ? '4 hours' : '8 hours',
      status: 'Scheduled',
      checklist: tasks,
      estimatedCost: frequency === 'Weekly' ? 5000 : frequency === 'Monthly' ? 15000 : 30000,
      actualCost: null,
      completionHistory: []
    };

    setData(prev => ({
      ...prev,
      preventiveMaintenance: [...prev.preventiveMaintenance, newPM]
    }));

    addActivity(`PM Schedule ${newPM.id} created for ${equipment.name}`, 'Preventive Maintenance');
  };

  const autoGeneratePMSchedules = () => {
    const criticalEquipment = data.equipment.filter(eq => 
      eq.criticality === 'A' && 
      !data.preventiveMaintenance.some(pm => pm.equipmentId === eq.id)
    );

    if (criticalEquipment.length === 0) {
      alert('No critical equipment found without PM schedules');
      return;
    }

    criticalEquipment.forEach(equipment => {
      createPMSchedule(equipment.id, 'Weekly', 'Weekly Safety Inspection', [
        'Visual inspection for leaks and damage',
        'Check safety systems and alarms',
        'Verify operating parameters',
        'Lubricate moving parts',
        'Clean and organize work area'
      ]);

      createPMSchedule(equipment.id, 'Monthly', 'Monthly Preventive Maintenance', [
        'Detailed mechanical inspection',
        'Electrical system check',
        'Calibrate instruments',
        'Replace filters and consumables',
        'Update maintenance logs'
      ]);
    });

    addActivity(`Auto-generated PM schedules for ${criticalEquipment.length} critical equipment`, 'Preventive Maintenance');
    alert(`Successfully generated PM schedules for ${criticalEquipment.length} critical equipment!`);
  };

  const createPMScheduleManual = (pmData) => {
    const newPM = {
      id: `PM-${Date.now()}`,
      ...pmData,
      status: 'Scheduled',
      completionHistory: []
    };

    setData(prev => ({
      ...prev,
      preventiveMaintenance: [...prev.preventiveMaintenance, newPM]
    }));

    addActivity(`PM Schedule ${newPM.id} created for ${pmData.equipmentName}`, 'Preventive Maintenance');
  };

  const updatePMStatus = (pmId, newStatus) => {
    setData(prev => ({
      ...prev,
      preventiveMaintenance: prev.preventiveMaintenance.map(pm => 
        pm.id === pmId ? { 
          ...pm, 
          status: newStatus,
          ...(newStatus === 'Completed' && {
            lastPerformed: new Date().toISOString().split('T')[0],
            completionHistory: [
              ...(pm.completionHistory || []),
              {
                completedDate: new Date().toISOString().split('T')[0],
                completedBy: 'Current User',
                actualCost: pm.estimatedCost
              }
            ]
          })
        } : pm
      )
    }));

    addActivity(`PM ${pmId} status updated to ${newStatus}`, 'Preventive Maintenance');
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header and Controls */}
      <div className="bg-white rounded-lg shadow p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 space-y-3 sm:space-y-0">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Preventive Maintenance</h2>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button
              onClick={autoGeneratePMSchedules}
              className="px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm min-h-[44px] flex items-center"
            >
              <Calendar className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Auto-Generate Schedules</span>
              <span className="sm:hidden">Auto-Gen</span>
            </button>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-3 sm:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm min-h-[44px] flex items-center"
            >
              <Plus className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Create PM Schedule</span>
              <span className="sm:hidden">Create</span>
            </button>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex bg-gray-100 rounded-lg p-1">
          {['schedule', 'calendar', 'analytics'].map((viewType) => (
            <button
              key={viewType}
              onClick={() => setView(viewType)}
              className={`px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors flex-1 min-h-[40px] ${
                view === viewType 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {viewType.charAt(0).toUpperCase() + viewType.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        <div className="bg-white rounded-lg shadow p-3 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Scheduled</p>
              <p className="text-xl sm:text-3xl font-bold text-gray-900">{pmStats.scheduled}</p>
            </div>
            <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500 flex-shrink-0" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-3 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Overdue</p>
              <p className="text-xl sm:text-3xl font-bold text-red-600">{pmStats.overdue}</p>
            </div>
            <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 text-red-500 flex-shrink-0" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-3 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Completed</p>
              <p className="text-xl sm:text-3xl font-bold text-green-600">{pmStats.completed}</p>
            </div>
            <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-500 flex-shrink-0" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-3 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Compliance</p>
              <p className="text-xl sm:text-3xl font-bold text-blue-600">{pmStats.compliance}%</p>
            </div>
            <Target className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500 flex-shrink-0" />
          </div>
        </div>
      </div>

      {/* Content based on view */}
      {view === 'schedule' && (
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <h3 className="text-base sm:text-lg font-medium text-gray-900">PM Schedules</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {data.preventiveMaintenance.map((pm) => (
              <PMScheduleCard 
                key={pm.id} 
                pmSchedule={pm} 
                onUpdateStatus={updatePMStatus}
              />
            ))}
          </div>
        </div>
      )}

      {view === 'calendar' && (
        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-4">PM Calendar View</h3>
          <div className="grid grid-cols-7 gap-2 sm:gap-4">
            {Array.from({ length: 30 }, (_, i) => {
              const date = new Date();
              date.setDate(date.getDate() + i);
              const hasPM = data.preventiveMaintenance.some(pm => 
                new Date(pm.nextDue).toDateString() === date.toDateString()
              );
              
              return (
                <div key={i} className={`p-1 sm:p-2 text-center rounded-lg border min-h-[40px] sm:min-h-[60px] ${
                  hasPM ? 'bg-blue-100 border-blue-300' : 'bg-gray-50 border-gray-200'
                }`}>
                  <div className="text-xs sm:text-sm font-medium">{date.getDate()}</div>
                  {hasPM && <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full mx-auto mt-1"></div>}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {view === 'analytics' && (
        <div className="space-y-4 sm:space-y-6">
          {/* PM Effectiveness */}
          <div className="bg-white rounded-lg shadow p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-4">PM Effectiveness</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-green-600">87%</div>
                <div className="text-xs sm:text-sm text-gray-600">Schedule Compliance</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-blue-600">23%</div>
                <div className="text-xs sm:text-sm text-gray-600">Reduction in Breakdowns</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-yellow-600">₹1.2M</div>
                <div className="text-xs sm:text-sm text-gray-600">Cost Savings</div>
              </div>
            </div>
          </div>

          {/* Equipment PM Status */}
          <div className="bg-white rounded-lg shadow p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-4">Equipment PM Status</h3>
            <div className="space-y-3 sm:space-y-4">
              {data.equipment.map((eq) => {
                const pmSchedules = data.preventiveMaintenance.filter(pm => pm.equipmentId === eq.id);
                const overduePM = pmSchedules.filter(pm => 
                  new Date(pm.nextDue) < new Date() && pm.status !== 'Completed'
                ).length;
                
                return (
                  <div key={eq.id} className="flex items-center justify-between p-3 sm:p-4 border rounded-lg">
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 text-sm sm:text-base truncate">{eq.name}</div>
                      <div className="text-xs sm:text-sm text-gray-600">{pmSchedules.length} PM schedules</div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      {overduePM > 0 ? (
                        <div className="text-red-600 font-medium text-xs sm:text-sm">{overduePM} Overdue</div>
                      ) : (
                        <div className="text-green-600 font-medium text-xs sm:text-sm">Up to Date</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Create PM Schedule Modal */}
      <PMScheduleModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSave={createPMScheduleManual}
        equipment={data.equipment}
      />
    </div>
  );
}

// Enhanced Backlogs Component with Bulk Operations
function Backlogs() {
  const { data, setData, addActivity } = useContext(AppContext);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [view, setView] = useState('list');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBacklogs, setSelectedBacklogs] = useState(new Set());

  const backlogStats = {
    total: data.backlogs.length,
    open: data.backlogs.filter(b => ['Open', 'Validated', 'Planned'].includes(b.status)).length,
    inProgress: data.backlogs.filter(b => b.status === 'In Progress').length,
    completed: data.backlogs.filter(b => b.status === 'Completed').length,
    overdue: data.backlogs.filter(b => 
      new Date(b.dueDate) < new Date() && b.status !== 'Completed'
    ).length
  };

  const updateBacklogStatus = (backlogId, newStatus) => {
    setData(prev => ({
      ...prev,
      backlogs: prev.backlogs.map(backlog => 
        backlog.id === backlogId ? { 
          ...backlog, 
          status: newStatus,
          ...(newStatus === 'Completed' && {
            progress: 100,
            actualHours: backlog.estimatedHours,
            actualCost: backlog.estimatedCost
          })
        } : backlog
      )
    }));

    addActivity(`Backlog ${backlogId} status updated to ${newStatus}`, 'Backlog');
  };

  const createBacklog = (backlogData) => {
    const newBacklog = {
      id: `BL-${Date.now()}`,
      ...backlogData,
      status: 'Open',
      progress: 0,
      createdDate: new Date().toISOString().split('T')[0],
      isSelected: false,
      workOrderId: null,
      autoGenerated: false,
      source: 'Manual Entry'
    };

    setData(prev => ({
      ...prev,
      backlogs: [...prev.backlogs, newBacklog]
    }));

    addActivity(`Backlog ${newBacklog.id} created for ${backlogData.equipmentName}`, 'Backlog');
  };

  const handleSelectBacklog = (backlogId, selected) => {
    setSelectedBacklogs(prev => {
      const newSet = new Set(prev);
      if (selected) {
        newSet.add(backlogId);
      } else {
        newSet.delete(backlogId);
      }
      return newSet;
    });
  };

  const handleSelectAll = (selected) => {
    if (selected) {
      setSelectedBacklogs(new Set(filteredBacklogs.map(b => b.id)));
    } else {
      setSelectedBacklogs(new Set());
    }
  };

  const generateWorkOrderFromBacklog = (backlogId) => {
    const backlog = data.backlogs.find(b => b.id === backlogId);
    if (!backlog) return null;

    const newWorkOrder = {
      id: `WO-${Date.now()}`,
      backlogId: backlog.id,
      title: `${backlog.category} Work: ${backlog.issue.substring(0, 50)}...`,
      description: backlog.issue,
      equipmentId: backlog.equipmentId,
      equipmentName: backlog.equipmentName,
      status: 'Planned',
      priority: backlog.priority,
      type: 'Corrective',
      woType: 'User Generated',
      assignedTo: backlog.assignedTo,
      createdDate: new Date().toISOString().split('T')[0],
      scheduledDate: backlog.dueDate,
      estimatedHours: backlog.estimatedHours,
      estimatedCost: backlog.estimatedCost || backlog.estimatedHours * 500,
      progress: 0,
      triggerCondition: null,
      materials: [],
      labor: []
    };

    setData(prev => ({
      ...prev,
      workOrders: [...prev.workOrders, newWorkOrder],
      backlogs: prev.backlogs.map(b => 
        b.id === backlogId ? { ...b, workOrderId: newWorkOrder.id, status: 'Planned' } : b
      )
    }));

    addActivity(`Work Order ${newWorkOrder.id} generated from backlog ${backlogId}`, 'Work Order');
    return newWorkOrder;
  };

  const handleGenerateWorkOrders = () => {
    const selectedBacklogsList = Array.from(selectedBacklogs).map(id => 
      data.backlogs.find(b => b.id === id)
    ).filter(Boolean);

    const eligibleBacklogs = selectedBacklogsList.filter(b => 
      ['Open', 'Validated', 'Planned'].includes(b.status) && !b.workOrderId
    );

    if (eligibleBacklogs.length === 0) {
      alert('No eligible backlogs selected. Backlogs must be Open, Validated, or Planned status and not already have work orders.');
      return;
    }

    const generatedWOs = eligibleBacklogs.map(backlog => 
      generateWorkOrderFromBacklog(backlog.id)
    ).filter(Boolean);

    if (generatedWOs.length > 0) {
      alert(`Successfully generated ${generatedWOs.length} work orders from selected backlogs!`);
      setSelectedBacklogs(new Set());
    }
  };

  const handleBulkAssign = (assignments) => {
    const selectedBacklogsList = Array.from(selectedBacklogs);
    
    setData(prev => ({
      ...prev,
      backlogs: prev.backlogs.map(backlog => 
        selectedBacklogsList.includes(backlog.id) 
          ? { ...backlog, ...assignments }
          : backlog
      )
    }));

    addActivity(`Bulk assignment completed for ${selectedBacklogsList.length} backlogs`, 'Backlog');
    setSelectedBacklogs(new Set());
    setShowBulkModal(false);
  };

  const filteredBacklogs = data.backlogs.filter(backlog => {
    const matchesSearch = !searchTerm || 
      backlog.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      backlog.equipmentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      backlog.issue.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = priorityFilter === 'all' || backlog.priority === priorityFilter;
    const matchesStatus = statusFilter === 'all' || backlog.status === statusFilter;
    
    return matchesSearch && matchesPriority && matchesStatus;
  });

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header and Controls */}
      <div className="bg-white rounded-lg shadow p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 space-y-3 sm:space-y-0">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Backlog Management</h2>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm min-h-[44px] flex items-center"
            >
              <Plus className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Create Backlog</span>
              <span className="sm:hidden">Create</span>
            </button>
            {selectedBacklogs.size > 0 && (
              <>
                <button
                  onClick={() => setShowBulkModal(true)}
                  className="px-3 sm:px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm min-h-[44px] flex items-center"
                >
                  <UserCheck className="w-4 h-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Bulk Assign ({selectedBacklogs.size})</span>
                  <span className="sm:hidden">Assign ({selectedBacklogs.size})</span>
                </button>
                <button
                  onClick={handleGenerateWorkOrders}
                  className="px-3 sm:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm min-h-[44px] flex items-center"
                >
                  <Wrench className="w-4 h-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Generate WOs ({selectedBacklogs.size})</span>
                  <span className="sm:hidden">Gen WOs ({selectedBacklogs.size})</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Filters and View Toggle */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between space-y-3 lg:space-y-0">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base min-h-[44px]"
            >
              <option value="all">All Priority</option>
              <option value="P1">P1 - Critical</option>
              <option value="P2">P2 - High</option>
              <option value="P3">P3 - Medium</option>
              <option value="P4">P4 - Low</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base min-h-[44px]"
            >
              <option value="all">All Status</option>
              <option value="Open">Open</option>
              <option value="Validated">Validated</option>
              <option value="Planned">Planned</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <input
              type="text"
              placeholder="Search backlogs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base min-h-[44px]"
            />
          </div>
          
          <div className="flex bg-gray-100 rounded-lg p-1">
            {['list', 'kanban'].map((viewType) => (
              <button
                key={viewType}
                onClick={() => setView(viewType)}
                className={`px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors flex-1 min-h-[40px] ${
                  view === viewType 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {viewType.charAt(0).toUpperCase() + viewType.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-6">
        <div className="bg-white rounded-lg shadow p-3 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Total</p>
              <p className="text-xl sm:text-3xl font-bold text-gray-900">{backlogStats.total}</p>
            </div>
            <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500 flex-shrink-0" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-3 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Open</p>
              <p className="text-xl sm:text-3xl font-bold text-blue-600">{backlogStats.open}</p>
            </div>
            <Package className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500 flex-shrink-0" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-3 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600">In Progress</p>
              <p className="text-xl sm:text-3xl font-bold text-yellow-600">{backlogStats.inProgress}</p>
            </div>
            <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500 flex-shrink-0" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-3 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Completed</p>
              <p className="text-xl sm:text-3xl font-bold text-green-600">{backlogStats.completed}</p>
            </div>
            <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-500 flex-shrink-0" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-3 sm:p-6 col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Overdue</p>
              <p className="text-xl sm:text-3xl font-bold text-red-600">{backlogStats.overdue}</p>
            </div>
            <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 text-red-500 flex-shrink-0" />
          </div>
        </div>
      </div>

      {/* Backlogs Content */}
      {view === 'list' && (
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-medium text-gray-900">Backlogs</h3>
              {filteredBacklogs.length > 0 && (
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedBacklogs.size === filteredBacklogs.length}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="rounded text-blue-600"
                  />
                  <label className="text-sm text-gray-600">Select All</label>
                </div>
              )}
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {filteredBacklogs.map((backlog) => (
              <EnhancedBacklogCard 
                key={backlog.id} 
                backlog={backlog} 
                onUpdateStatus={updateBacklogStatus}
                onGenerateWorkOrder={() => generateWorkOrderFromBacklog(backlog.id)}
                onSelect={(selected) => handleSelectBacklog(backlog.id, selected)}
                isSelected={selectedBacklogs.has(backlog.id)}
              />
            ))}
          </div>
        </div>
      )}

      {view === 'kanban' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-6">
          {['Open', 'Validated', 'Planned', 'In Progress', 'Completed'].map((status) => (
            <div key={status} className="bg-white rounded-lg shadow">
              <div className="p-3 sm:p-4 border-b border-gray-200">
                <h3 className="text-xs sm:text-sm font-medium text-gray-900">
                  {status} ({filteredBacklogs.filter(b => b.status === status).length})
                </h3>
              </div>
              <div className="p-3 sm:p-4 space-y-3 min-h-96 overflow-y-auto">
                {filteredBacklogs
                  .filter(b => b.status === status)
                  .map((backlog) => (
                    <BacklogKanbanCard 
                      key={backlog.id} 
                      backlog={backlog} 
                      onUpdateStatus={updateBacklogStatus}
                      onGenerateWorkOrder={() => generateWorkOrderFromBacklog(backlog.id)}
                    />
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Backlog Modal */}
      <BacklogModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSave={createBacklog}
        equipment={data.equipment}
      />

      {/* Bulk Assignment Modal */}
      <BulkAssignmentModal
        isOpen={showBulkModal}
        onClose={() => setShowBulkModal(false)}
        onSave={handleBulkAssign}
        selectedCount={selectedBacklogs.size}
        users={data.users}
      />
    </div>
  );
}

// Enhanced Backlog Card with Selection and Generate WO
function EnhancedBacklogCard({ backlog, onUpdateStatus, onGenerateWorkOrder, onSelect, isSelected }) {
  const [expanded, setExpanded] = useState(false);
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'Open': return 'bg-blue-100 text-blue-800';
      case 'Validated': return 'bg-yellow-100 text-yellow-800';
      case 'Planned': return 'bg-purple-100 text-purple-800';
      case 'In Progress': return 'bg-orange-100 text-orange-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'P1': return 'bg-red-100 text-red-800';
      case 'P2': return 'bg-orange-100 text-orange-800';
      case 'P3': return 'bg-yellow-100 text-yellow-800';
      case 'P4': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const isOverdue = new Date(backlog.dueDate) < new Date() && backlog.status !== 'Completed';

  const getNextStatus = (currentStatus) => {
    switch (currentStatus) {
      case 'Open': return 'Validated';
      case 'Validated': return 'Planned';
      case 'Planned': return 'In Progress';
      case 'In Progress': return 'Completed';
      default: return null;
    }
  };

  const getActionLabel = (currentStatus) => {
    switch (currentStatus) {
      case 'Open': return 'Validate';
      case 'Validated': return 'Plan';
      case 'Planned': return 'Start Work';
      case 'In Progress': return 'Complete';
      default: return null;
    }
  };

  const handleStatusUpdate = () => {
    const nextStatus = getNextStatus(backlog.status);
    if (nextStatus) {
      onUpdateStatus(backlog.id, nextStatus);
    }
  };

  const canGenerateWorkOrder = ['Open', 'Validated', 'Planned'].includes(backlog.status) && !backlog.workOrderId;

  return (
    <div className={`p-4 sm:p-6 ${isOverdue ? 'bg-red-50' : ''}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1 min-w-0">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => onSelect(e.target.checked)}
            className="mt-1 rounded text-blue-600 flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <h4 className="text-sm sm:text-lg font-medium text-gray-900">{backlog.id}</h4>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(backlog.status)}`}>
                {backlog.status}
              </span>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(backlog.priority)}`}>
                {backlog.priority}
              </span>
              {backlog.autoGenerated && (
                <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                  AUTO
                </span>
              )}
              {backlog.workOrderId && (
                <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                  WO CREATED
                </span>
              )}
              {isOverdue && (
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                  OVERDUE
                </span>
              )}
            </div>
            
            <p className="text-xs sm:text-sm text-gray-700 mb-3 line-clamp-2">{backlog.issue}</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
              <div>
                <span className="font-medium">Equipment:</span> <span className="truncate">{backlog.equipmentName}</span>
              </div>
              <div>
                <span className="font-medium">Category:</span> {backlog.category}
              </div>
              <div>
                <span className="font-medium">Assigned:</span> {backlog.assignedTo || 'Unassigned'}
              </div>
              <div>
                <span className="font-medium">Due:</span> 
                <span className={isOverdue ? 'text-red-600 font-medium' : ''}> {backlog.dueDate}</span>
              </div>
              <div>
                <span className="font-medium">Source:</span> {backlog.source}
              </div>
            </div>

            {backlog.progress > 0 && (
              <div className="mt-3">
                <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600 mb-1">
                  <span>Progress</span>
                  <span>{backlog.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
                  <div 
                    className="bg-blue-500 h-1.5 sm:h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${backlog.progress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            {expanded ? <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5" /> : <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />}
          </button>
          
          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
            {canGenerateWorkOrder && (
              <button
                onClick={onGenerateWorkOrder}
                className="px-2 sm:px-3 py-1 bg-green-600 text-white text-xs sm:text-sm rounded-lg hover:bg-green-700 transition-colors min-h-[36px] flex items-center justify-center"
              >
                <Wrench className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                <span className="hidden sm:inline">Generate WO</span>
                <span className="sm:hidden">WO</span>
              </button>
            )}
            {getActionLabel(backlog.status) && (
              <button
                onClick={handleStatusUpdate}
                className="px-2 sm:px-3 py-1 bg-blue-600 text-white text-xs sm:text-sm rounded-lg hover:bg-blue-700 transition-colors min-h-[36px] flex items-center"
              >
                <span className="hidden sm:inline">{getActionLabel(backlog.status)}</span>
                <span className="sm:hidden">{getActionLabel(backlog.status).split(' ')[0]}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {expanded && (
        <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <h5 className="font-medium text-gray-900 mb-3">Details</h5>
              <div className="space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Created:</span>
                  <span>{backlog.createdDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Estimated Hours:</span>
                  <span>{backlog.estimatedHours}h</span>
                </div>
                {backlog.actualHours && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Actual Hours:</span>
                    <span>{backlog.actualHours}h</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Estimated Cost:</span>
                  <span>₹{backlog.estimatedCost}</span>
                </div>
                {backlog.actualCost && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Actual Cost:</span>
                    <span>₹{backlog.actualCost}</span>
                  </div>
                )}
              </div>
            </div>
            <div>
              <h5 className="font-medium text-gray-900 mb-3">Actions</h5>
              <div className="space-y-2">
                <button 
                  onClick={() => alert('Edit functionality would be implemented here')}
                  className="w-full px-3 py-2 bg-gray-600 text-white text-xs sm:text-sm rounded-lg hover:bg-gray-700 transition-colors min-h-[44px] flex items-center justify-center"
                >
                  <Edit className="w-4 h-4 mr-1 sm:mr-2" />
                  Edit Backlog
                </button>
                {canGenerateWorkOrder && (
                  <button 
                    onClick={onGenerateWorkOrder}
                    className="w-full px-3 py-2 bg-green-600 text-white text-xs sm:text-sm rounded-lg hover:bg-green-700 transition-colors min-h-[44px] flex items-center justify-center"
                  >
                    <Wrench className="w-4 h-4 mr-1 sm:mr-2" />
                    Generate Work Order
                  </button>
                )}
                {backlog.workOrderId && (
                  <button 
                    onClick={() => alert(`View Work Order ${backlog.workOrderId}`)}
                    className="w-full px-3 py-2 bg-blue-600 text-white text-xs sm:text-sm rounded-lg hover:bg-blue-700 transition-colors min-h-[44px] flex items-center justify-center"
                  >
                    <Eye className="w-4 h-4 mr-1 sm:mr-2" />
                    View Work Order
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Backlog Kanban Card (enhanced)
function BacklogKanbanCard({ backlog, onUpdateStatus, onGenerateWorkOrder }) {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'P1': return 'border-l-red-500';
      case 'P2': return 'border-l-orange-500';
      case 'P3': return 'border-l-yellow-500';
      case 'P4': return 'border-l-green-500';
      default: return 'border-l-gray-500';
    }
  };

  const isOverdue = new Date(backlog.dueDate) < new Date() && backlog.status !== 'Completed';

  const getNextStatus = (currentStatus) => {
    switch (currentStatus) {
      case 'Open': return 'Validated';
      case 'Validated': return 'Planned';
      case 'Planned': return 'In Progress';
      case 'In Progress': return 'Completed';
      default: return null;
    }
  };

  const handleStatusUpdate = () => {
    const nextStatus = getNextStatus(backlog.status);
    if (nextStatus) {
      onUpdateStatus(backlog.id, nextStatus);
    }
  };

  const canGenerateWorkOrder = ['Open', 'Validated', 'Planned'].includes(backlog.status) && !backlog.workOrderId;

  return (
    <div className={`p-3 bg-white border-l-4 ${getPriorityColor(backlog.priority)} rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer ${isOverdue ? 'bg-red-50' : ''}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs sm:text-sm font-medium text-gray-900">{backlog.id}</span>
        <div className="flex items-center space-x-1">
          <span className="text-xs text-gray-500">{backlog.priority}</span>
          {backlog.autoGenerated && (
            <span className="text-xs bg-blue-100 text-blue-800 px-1 rounded">AUTO</span>
          )}
        </div>
      </div>
      
      <p className="text-xs sm:text-sm text-gray-700 mb-2 line-clamp-2">{backlog.issue}</p>
      
      <div className="text-xs text-gray-500 mb-2">
        <div className="truncate">{backlog.equipmentName}</div>
        <div>{backlog.category}</div>
      </div>
      
      <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
        <span className="truncate">{backlog.assignedTo || 'Unassigned'}</span>
        <span className={isOverdue ? 'text-red-600 font-medium' : ''}>{backlog.dueDate}</span>
      </div>
      
      {backlog.progress > 0 && (
        <div className="mb-2">
          <div className="w-full bg-gray-200 rounded-full h-1">
            <div 
              className="bg-blue-500 h-1 rounded-full" 
              style={{ width: `${backlog.progress}%` }}
            ></div>
          </div>
        </div>
      )}

      <div className="space-y-1">
        {canGenerateWorkOrder && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onGenerateWorkOrder();
            }}
            className="w-full px-2 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition-colors min-h-[32px]"
          >
            Generate WO
          </button>
        )}
        
        {getNextStatus(backlog.status) && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleStatusUpdate();
            }}
            className="w-full px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors min-h-[32px]"
          >
            Move to {getNextStatus(backlog.status)}
          </button>
        )}

        {backlog.workOrderId && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              alert(`View Work Order ${backlog.workOrderId}`);
            }}
            className="w-full px-2 py-1 bg-gray-600 text-white text-xs rounded hover:bg-gray-700 transition-colors min-h-[32px]"
          >
            View WO
          </button>
        )}
      </div>
    </div>
  );
}

// Bulk Assignment Modal
function BulkAssignmentModal({ isOpen, onClose, onSave, selectedCount, users }) {
  const [assignments, setAssignments] = useState({
    assignedTo: '',
    priority: '',
    dueDate: '',
    category: ''
  });

  const handleSubmit = () => {
    const filteredAssignments = Object.fromEntries(
      Object.entries(assignments).filter(([key, value]) => value !== '')
    );
    
    if (Object.keys(filteredAssignments).length === 0) {
      alert('Please select at least one field to update.');
      return;
    }

    onSave(filteredAssignments);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Bulk Assignment (${selectedCount} backlogs)`}
      size="md"
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Assign To
          </label>
          <select
            value={assignments.assignedTo}
            onChange={(e) => setAssignments({...assignments, assignedTo: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Keep Current Assignment</option>
            {users.filter(u => u.role !== 'Administrator').map(user => (
              <option key={user.id} value={user.name}>
                {user.name} ({user.role})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Priority
          </label>
          <select
            value={assignments.priority}
            onChange={(e) => setAssignments({...assignments, priority: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Keep Current Priority</option>
            <option value="P1">P1 - Critical</option>
            <option value="P2">P2 - High</option>
            <option value="P3">P3 - Medium</option>
            <option value="P4">P4 - Low</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Due Date
          </label>
          <input
            type="date"
            value={assignments.dueDate}
            onChange={(e) => setAssignments({...assignments, dueDate: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            value={assignments.category}
            onChange={(e) => setAssignments({...assignments, category: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Keep Current Category</option>
            <option value="Mechanical">Mechanical</option>
            <option value="Electrical">Electrical</option>
            <option value="Safety">Safety</option>
            <option value="Environmental">Environmental</option>
            <option value="Operational">Operational</option>
            <option value="Instrumentation">Instrumentation</option>
          </select>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <p className="text-sm text-yellow-800">
            Only non-empty fields will be updated. Empty fields will keep their current values.
          </p>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Apply to {selectedCount} Backlogs
          </button>
        </div>
      </div>
    </Modal>
  );
}

// Backlog Modal (unchanged from previous implementation)
function BacklogModal({ isOpen, onClose, onSave, equipment }) {
  const [formData, setFormData] = useState({
    equipmentId: '',
    equipmentName: '',
    issue: '',
    category: '',
    priority: '',
    assignedTo: '',
    estimatedHours: '',
    dueDate: '',
    estimatedCost: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedEquipment = equipment.find(eq => eq.id === formData.equipmentId);
    if (selectedEquipment) {
      onSave({
        ...formData,
        equipmentName: selectedEquipment.name,
        estimatedCost: formData.estimatedCost || formData.estimatedHours * 500
      });
      onClose();
      setFormData({
        equipmentId: '',
        equipmentName: '',
        issue: '',
        category: '',
        priority: '',
        assignedTo: '',
        estimatedHours: '',
        dueDate: '',
        estimatedCost: ''
      });
    }
  };

  const updateDueDate = (priority) => {
    if (priority) {
      const now = new Date();
      let dueDate = new Date();
      
      switch (priority) {
        case 'P1':
          dueDate.setHours(now.getHours() + 4);
          break;
        case 'P2':
          dueDate.setHours(now.getHours() + 48);
          break;
        case 'P3':
          dueDate.setDate(now.getDate() + 7);
          break;
        case 'P4':
          dueDate.setMonth(now.getMonth() + 1);
          break;
      }
      
      setFormData(prev => ({
        ...prev,
        priority,
        dueDate: dueDate.toISOString().split('T')[0]
      }));
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Backlog"
      size="lg"
    >
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 sm:mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Equipment *
            </label>
            <select
              value={formData.equipmentId}
              onChange={(e) => setFormData({...formData, equipmentId: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base min-h-[44px]"
              required
            >
              <option value="">Select Equipment</option>
              {equipment.map(eq => (
                <option key={eq.id} value={eq.id}>
                  {eq.name} ({eq.code})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base min-h-[44px]"
              required
            >
              <option value="">Select Category</option>
              <option value="Mechanical">Mechanical</option>
              <option value="Electrical">Electrical</option>
              <option value="Safety">Safety</option>
              <option value="Environmental">Environmental</option>
              <option value="Operational">Operational</option>
              <option value="Instrumentation">Instrumentation</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Priority *
            </label>
            <select
              value={formData.priority}
              onChange={(e) => updateDueDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base min-h-[44px]"
              required
            >
              <option value="">Select Priority</option>
              <option value="P1">P1 - Critical (4 hours)</option>
              <option value="P2">P2 - High (48 hours)</option>
              <option value="P3">P3 - Medium (1 week)</option>
              <option value="P4">P4 - Low (1 month)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Assigned To
            </label>
            <input
              type="text"
              value={formData.assignedTo}
              onChange={(e) => setFormData({...formData, assignedTo: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base min-h-[44px]"
              placeholder="Technician name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Estimated Hours
            </label>
            <input
              type="number"
              value={formData.estimatedHours}
              onChange={(e) => setFormData({...formData, estimatedHours: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base min-h-[44px]"
              min="0.5"
              step="0.5"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Due Date
            </label>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base min-h-[44px]"
            />
          </div>
        </div>

        <div className="mb-4 sm:mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Issue Description *
          </label>
          <textarea
            value={formData.issue}
            onChange={(e) => setFormData({...formData, issue: e.target.value})}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
            placeholder="Describe the issue in detail..."
            required
          />
        </div>

        <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors text-sm min-h-[44px]"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm min-h-[44px] flex items-center justify-center"
          >
            <Save className="w-4 h-4 mr-2" />
            Create Backlog
          </button>
        </div>
      </form>
    </Modal>
  );
}

// Enhanced Work Orders Component with Auto/User Generated Types
function WorkOrders() {
  const { data, setData, addActivity, checkAutoWorkOrders } = useContext(AppContext);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [workOrderType, setWorkOrderType] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [woTypeFilter, setWoTypeFilter] = useState('all'); // Auto Generated vs User Generated

  const workOrderStats = {
    total: data.workOrders.length,
    inProgress: data.workOrders.filter(wo => wo.status === 'In Progress').length,
    completed: data.workOrders.filter(wo => wo.status === 'Completed').length,
    overdue: data.workOrders.filter(wo => new Date(wo.scheduledDate) < new Date() && wo.status !== 'Completed').length,
    autoGenerated: data.workOrders.filter(wo => wo.woType === 'Auto Generated').length,
    userGenerated: data.workOrders.filter(wo => wo.woType === 'User Generated').length
  };

  const updateWorkOrderStatus = (workOrderId, newStatus) => {
    setData(prev => ({
      ...prev,
      workOrders: prev.workOrders.map(wo => 
        wo.id === workOrderId ? { 
          ...wo, 
          status: newStatus,
          ...(newStatus === 'Completed' && { 
            progress: 100,
            actualHours: wo.estimatedHours,
            actualCost: wo.estimatedCost 
          })
        } : wo
      )
    }));

    const workOrder = data.workOrders.find(wo => wo.id === workOrderId);
    addActivity(`Work Order ${workOrderId} status updated to ${newStatus}`, 'Work Order');
  };

  const createWorkOrder = (workOrderData) => {
    const newWorkOrder = {
      id: `WO-${Date.now()}`,
      ...workOrderData,
      status: 'Planned',
      progress: 0,
      woType: 'User Generated',
      createdDate: new Date().toISOString().split('T')[0],
      triggerCondition: null,
      materials: [],
      labor: []
    };

    setData(prev => ({
      ...prev,
      workOrders: [...prev.workOrders, newWorkOrder]
    }));

    addActivity(`Work Order ${newWorkOrder.id} created for ${workOrderData.equipmentName}`, 'Work Order');
  };

  const generateAutoWorkOrders = () => {
    checkAutoWorkOrders();
    addActivity('Manual auto work order check completed', 'Work Order');
  };

  const filteredWorkOrders = data.workOrders
    .filter(wo => workOrderType === 'all' || wo.type === workOrderType)
    .filter(wo => statusFilter === 'all' || wo.status === statusFilter)
    .filter(wo => woTypeFilter === 'all' || wo.woType === woTypeFilter);

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header and Controls */}
      <div className="bg-white rounded-lg shadow p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 space-y-3 sm:space-y-0">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Work Order Management</h2>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button
              onClick={generateAutoWorkOrders}
              className="px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm min-h-[44px] flex items-center"
            >
              <RotateCcw className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Check Auto WOs</span>
              <span className="sm:hidden">Auto Check</span>
            </button>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-3 sm:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm min-h-[44px] flex items-center"
            >
              <Plus className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Create Work Order</span>
              <span className="sm:hidden">Create</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <select 
            value={workOrderType} 
            onChange={(e) => setWorkOrderType(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base min-h-[44px]"
          >
            <option value="all">All Types</option>
            <option value="Corrective">Corrective</option>
            <option value="Preventive">Preventive</option>
            <option value="Emergency">Emergency</option>
            <option value="Shutdown">Shutdown</option>
          </select>
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base min-h-[44px]"
          >
            <option value="all">All Status</option>
            <option value="Planned">Planned</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="On Hold">On Hold</option>
          </select>
          <select 
            value={woTypeFilter} 
            onChange={(e) => setWoTypeFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base min-h-[44px]"
          >
            <option value="all">All Generation Types</option>
            <option value="Auto Generated">Auto Generated</option>
            <option value="User Generated">User Generated</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-6">
        <div className="bg-white rounded-lg shadow p-3 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Total WOs</p>
              <p className="text-xl sm:text-3xl font-bold text-gray-900">{workOrderStats.total}</p>
            </div>
            <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500 flex-shrink-0" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-3 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600">In Progress</p>
              <p className="text-xl sm:text-3xl font-bold text-yellow-600">{workOrderStats.inProgress}</p>
            </div>
            <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500 flex-shrink-0" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-3 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Completed</p>
              <p className="text-xl sm:text-3xl font-bold text-green-600">{workOrderStats.completed}</p>
            </div>
            <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-500 flex-shrink-0" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-3 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Overdue</p>
              <p className="text-xl sm:text-3xl font-bold text-red-600">{workOrderStats.overdue}</p>
            </div>
            <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 text-red-500 flex-shrink-0" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-3 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Auto Generated</p>
              <p className="text-xl sm:text-3xl font-bold text-blue-600">{workOrderStats.autoGenerated}</p>
            </div>
            <Cog className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500 flex-shrink-0" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-3 sm:p-6 col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600">User Generated</p>
              <p className="text-xl sm:text-3xl font-bold text-purple-600">{workOrderStats.userGenerated}</p>
            </div>
            <Users className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500 flex-shrink-0" />
          </div>
        </div>
      </div>

      {/* Work Orders List */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <h3 className="text-base sm:text-lg font-medium text-gray-900">Work Orders</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredWorkOrders.map((workOrder) => (
            <EnhancedWorkOrderCard 
              key={workOrder.id} 
              workOrder={workOrder} 
              onUpdateStatus={updateWorkOrderStatus}
            />
          ))}
        </div>
      </div>

      {/* Create Work Order Modal */}
      <WorkOrderModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSave={createWorkOrder}
        equipment={data.equipment}
      />
    </div>
  );
}

// Enhanced Work Order Card
function EnhancedWorkOrderCard({ workOrder, onUpdateStatus }) {
  const [expanded, setExpanded] = useState(false);
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'Planned': return 'bg-blue-100 text-blue-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'On Hold': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'P1': return 'bg-red-100 text-red-800';
      case 'P2': return 'bg-orange-100 text-orange-800';
      case 'P3': return 'bg-yellow-100 text-yellow-800';
      case 'P4': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStatusUpdate = (newStatus) => {
    onUpdateStatus(workOrder.id, newStatus);
  };

  const isOverdue = new Date(workOrder.scheduledDate) < new Date() && workOrder.status !== 'Completed';

  return (
    <div className={`p-4 sm:p-6 ${isOverdue ? 'bg-red-50' : ''}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <h4 className="text-sm sm:text-lg font-medium text-gray-900 truncate">{workOrder.title}</h4>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(workOrder.status)}`}>
              {workOrder.status}
            </span>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(workOrder.priority)}`}>
              {workOrder.priority}
            </span>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              workOrder.woType === 'Auto Generated' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
            }`}>
              {workOrder.woType}
            </span>
            {workOrder.triggerCondition && (
              <span className="px-2 py-1 text-xs font-medium bg-orange-100 text-orange-800 rounded-full">
                AUTO TRIGGER
              </span>
            )}
            {isOverdue && (
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                OVERDUE
              </span>
            )}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
            <div>
              <span className="font-medium">Equipment:</span> <span className="truncate">{workOrder.equipmentName}</span>
            </div>
            <div>
              <span className="font-medium">Assigned:</span> {workOrder.assignedTo}
            </div>
            <div>
              <span className="font-medium">Scheduled:</span> 
              <span className={isOverdue ? 'text-red-600 font-medium' : ''}> {workOrder.scheduledDate}</span>
            </div>
            <div>
              <span className="font-medium">Est. Hours:</span> {workOrder.estimatedHours}h
            </div>
          </div>

          {workOrder.triggerCondition && (
            <div className="mt-2 p-2 bg-orange-50 border border-orange-200 rounded text-xs sm:text-sm">
              <span className="font-medium text-orange-800">Trigger:</span>
              <span className="text-orange-700 ml-1">{workOrder.triggerCondition.description}</span>
              <span className="text-orange-600 ml-2">
                ({workOrder.triggerCondition.currentValue} / {workOrder.triggerCondition.threshold} {workOrder.triggerCondition.type.replace('_', ' ')})
              </span>
            </div>
          )}

          {workOrder.progress > 0 && (
            <div className="mt-3">
              <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600 mb-1">
                <span>Progress</span>
                <span>{workOrder.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
                <div 
                  className="bg-blue-500 h-1.5 sm:h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${workOrder.progress}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            {expanded ? <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5" /> : <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />}
          </button>
          
          {/* Action buttons based on status */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
            {workOrder.status === 'Planned' && (
              <button
                onClick={() => handleStatusUpdate('In Progress')}
                className="px-2 sm:px-3 py-1 bg-blue-600 text-white text-xs sm:text-sm rounded-lg hover:bg-blue-700 transition-colors min-h-[36px] flex items-center justify-center"
              >
                <Play className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                <span className="hidden sm:inline">Start</span>
              </button>
            )}
            {workOrder.status === 'In Progress' && (
              <>
                <button
                  onClick={() => handleStatusUpdate('On Hold')}
                  className="px-2 sm:px-3 py-1 bg-yellow-600 text-white text-xs sm:text-sm rounded-lg hover:bg-yellow-700 transition-colors min-h-[36px] flex items-center justify-center"
                >
                  <Pause className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  <span className="hidden sm:inline">Pause</span>
                </button>
                <button
                  onClick={() => handleStatusUpdate('Completed')}
                  className="px-2 sm:px-3 py-1 bg-green-600 text-white text-xs sm:text-sm rounded-lg hover:bg-green-700 transition-colors min-h-[36px] flex items-center justify-center"
                >
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  <span className="hidden sm:inline">Complete</span>
                </button>
              </>
            )}
            {workOrder.status === 'On Hold' && (
              <button
                onClick={() => handleStatusUpdate('In Progress')}
                className="px-2 sm:px-3 py-1 bg-blue-600 text-white text-xs sm:text-sm rounded-lg hover:bg-blue-700 transition-colors min-h-[36px] flex items-center justify-center"
              >
                <Play className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                <span className="hidden sm:inline">Resume</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {expanded && (
        <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Work Order Details */}
            <div>
              <h5 className="font-medium text-gray-900 mb-3">Description</h5>
              <p className="text-xs sm:text-sm text-gray-600 mb-4">{workOrder.description}</p>
              
              <h5 className="font-medium text-gray-900 mb-3">Timeline</h5>
              <div className="space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Created:</span>
                  <span>{workOrder.createdDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Scheduled:</span>
                  <span>{workOrder.scheduledDate}</span>
                </div>
                {workOrder.actualHours && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Actual Hours:</span>
                    <span>{workOrder.actualHours}h</span>
                  </div>
                )}
                {workOrder.backlogId && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">From Backlog:</span>
                    <span className="text-blue-600">{workOrder.backlogId}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Materials and Labor */}
            <div>
              <h5 className="font-medium text-gray-900 mb-3">Materials</h5>
              <div className="space-y-2 mb-4">
                {workOrder.materials?.map((material, index) => (
                  <div key={index} className="flex justify-between text-xs sm:text-sm">
                    <span className="text-gray-600 truncate">{material.item} (x{material.quantity})</span>
                    <span className="font-medium flex-shrink-0 ml-2">₹{material.totalCost}</span>
                  </div>
                ))}
                {(!workOrder.materials || workOrder.materials.length === 0) && (
                  <p className="text-xs sm:text-sm text-gray-500">No materials assigned</p>
                )}
              </div>

              <h5 className="font-medium text-gray-900 mb-3">Labor</h5>
              <div className="space-y-2">
                {workOrder.labor?.map((labor, index) => (
                  <div key={index} className="flex justify-between text-xs sm:text-sm">
                    <span className="text-gray-600 truncate">{labor.technician} ({labor.hours}h)</span>
                    <span className="font-medium flex-shrink-0 ml-2">₹{labor.total}</span>
                  </div>
                ))}
                {(!workOrder.labor || workOrder.labor.length === 0) && (
                  <p className="text-xs sm:text-sm text-gray-500">No labor assigned</p>
                )}
              </div>

              {(workOrder.estimatedCost || workOrder.actualCost) && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between text-xs sm:text-sm font-medium">
                    <span>Total Cost:</span>
                    <span>₹{workOrder.actualCost || workOrder.estimatedCost}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-stretch sm:items-center sm:justify-between space-y-2 sm:space-y-0">
            <div className="flex flex-wrap items-center gap-2">
              <button 
                onClick={() => alert('Print functionality would be implemented here')}
                className="px-3 py-2 bg-gray-600 text-white text-xs sm:text-sm rounded-lg hover:bg-gray-700 transition-colors min-h-[44px] flex items-center"
              >
                <FileText className="w-4 h-4 mr-1 sm:mr-2" />
                Print
              </button>
              {workOrder.backlogId && (
                <button 
                  onClick={() => alert(`View Backlog ${workOrder.backlogId}`)}
                  className="px-3 py-2 bg-blue-600 text-white text-xs sm:text-sm rounded-lg hover:bg-blue-700 transition-colors min-h-[44px] flex items-center"
                >
                  <Eye className="w-4 h-4 mr-1 sm:mr-2" />
                  View Backlog
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Work Order Modal (enhanced)
function WorkOrderModal({ isOpen, onClose, onSave, equipment }) {
  const [formData, setFormData] = useState({
    equipmentId: '',
    equipmentName: '',
    title: '',
    description: '',
    type: '',
    priority: '',
    assignedTo: '',
    scheduledDate: '',
    estimatedHours: '',
    estimatedCost: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedEquipment = equipment.find(eq => eq.id === formData.equipmentId);
    if (selectedEquipment) {
      onSave({
        ...formData,
        equipmentName: selectedEquipment.name,
        estimatedCost: formData.estimatedCost || formData.estimatedHours * 500
      });
      onClose();
      setFormData({
        equipmentId: '',
        equipmentName: '',
        title: '',
        description: '',
        type: '',
        priority: '',
        assignedTo: '',
        scheduledDate: '',
        estimatedHours: '',
        estimatedCost: ''
      });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Work Order"
      size="lg"
    >
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 sm:mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Equipment *
            </label>
            <select
              value={formData.equipmentId}
              onChange={(e) => setFormData({...formData, equipmentId: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base min-h-[44px]"
              required
            >
              <option value="">Select Equipment</option>
              {equipment.map(eq => (
                <option key={eq.id} value={eq.id}>
                  {eq.name} ({eq.code})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Work Order Type *
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base min-h-[44px]"
              required
            >
              <option value="">Select Type</option>
              <option value="Corrective">Corrective</option>
              <option value="Preventive">Preventive</option>
              <option value="Emergency">Emergency</option>
              <option value="Shutdown">Shutdown</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Priority *
            </label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData({...formData, priority: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base min-h-[44px]"
              required
            >
              <option value="">Select Priority</option>
              <option value="P1">P1 - Critical</option>
              <option value="P2">P2 - High</option>
              <option value="P3">P3 - Medium</option>
              <option value="P4">P4 - Low</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Assigned To *
            </label>
            <input
              type="text"
              value={formData.assignedTo}
              onChange={(e) => setFormData({...formData, assignedTo: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base min-h-[44px]"
              placeholder="Technician name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Scheduled Date *
            </label>
            <input
              type="date"
              value={formData.scheduledDate}
              onChange={(e) => setFormData({...formData, scheduledDate: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base min-h-[44px]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Estimated Hours
            </label>
            <input
              type="number"
              value={formData.estimatedHours}
              onChange={(e) => setFormData({...formData, estimatedHours: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base min-h-[44px]"
              min="0.5"
              step="0.5"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base min-h-[44px]"
            placeholder="Work order title"
            required
          />
        </div>

        <div className="mb-4 sm:mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description *
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
            placeholder="Describe the work to be performed..."
            required
          />
        </div>

        <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors text-sm min-h-[44px]"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm min-h-[44px] flex items-center justify-center"
          >
            <Save className="w-4 h-4 mr-2" />
            Create Work Order
          </button>
        </div>
      </form>
    </Modal>
  );
}

// Safety Checks Step Component
function SafetyChecksStep({ template, safetyChecks, onCheckChange }) {
  if (!template?.safetyChecks?.length) {
    return (
      <div className="text-center py-8">
        <AlertOctagon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500">No safety checks defined for this template.</p>
      </div>
    );
  }

  const allChecked = template.safetyChecks.every((_, index) => safetyChecks[index] === true);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <AlertOctagon className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900">Safety Preparedness</h3>
        <p className="text-sm text-gray-600 mt-2">
          Complete all safety checks before proceeding with the inspection. Your safety is our priority.
        </p>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex">
          <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h4 className="text-sm font-medium text-yellow-800">Safety Requirements</h4>
            <p className="text-sm text-yellow-700 mt-1">
              All safety checks must be completed and verified before inspection can begin. 
              Do not proceed if any safety requirement cannot be met.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {template.safetyChecks.map((check, index) => (
          <div key={index} className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg">
            <input
              type="checkbox"
              checked={safetyChecks[index] || false}
              onChange={(e) => onCheckChange(index, e.target.checked)}
              className="mt-1 h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
            />
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-900 cursor-pointer">
                {check}
              </label>
            </div>
            {safetyChecks[index] && (
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
            )}
          </div>
        ))}
      </div>

      {allChecked && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
          <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
          <p className="text-sm font-medium text-green-800">
            All safety checks completed. You may proceed with the inspection.
          </p>
        </div>
      )}
    </div>
  );
}

// Inspection Step Component
function InspectionStep({ template, checkpoints, onCheckpointChange, onAddFinding, findings }) {
  const [selectedCheckpoint, setSelectedCheckpoint] = useState(null);
  const [findingForm, setFindingForm] = useState({
    description: '',
    status: 'passed',
    action: '',
    priority: 'low'
  });

  const handleCheckpointClick = (checkpoint) => {
    setSelectedCheckpoint(checkpoint);
  };

  const handleMeasurementSave = (checkpointId, data) => {
    onCheckpointChange(checkpointId, { ...data, completed: true });
    setSelectedCheckpoint(null);
  };

  const handleAddFinding = () => {
    if (findingForm.description.trim()) {
      onAddFinding(findingForm);
      setFindingForm({
        description: '',
        status: 'passed',
        action: '',
        priority: 'low'
      });
    }
  };

  if (!template?.checkpoints?.length) {
    return (
      <div className="text-center py-8">
        <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500">No inspection checkpoints defined for this template.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <Search className="w-12 h-12 text-blue-500 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900">Equipment Inspection</h3>
        <p className="text-sm text-gray-600 mt-2">
          Complete all mandatory checkpoints and record measurements, observations, and findings.
        </p>
      </div>

      {/* Checkpoints */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {template.checkpoints.map((checkpoint) => {
          const isCompleted = checkpoints[checkpoint.id]?.completed;
          const Icon = checkpoint.type === 'measurement' ? BarChart : 
                     checkpoint.type === 'test' ? Zap : Eye;
          
          return (
            <div
              key={checkpoint.id}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                isCompleted 
                  ? 'border-green-300 bg-green-50' 
                  : checkpoint.mandatory 
                    ? 'border-red-300 bg-red-50 hover:border-red-400'
                    : 'border-gray-300 bg-white hover:border-gray-400'
              }`}
              onClick={() => handleCheckpointClick(checkpoint)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <Icon className={`w-5 h-5 mt-0.5 ${
                    isCompleted ? 'text-green-600' : 'text-gray-600'
                  }`} />
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{checkpoint.name}</h4>
                    <p className="text-xs text-gray-500 mt-1">
                      Type: {checkpoint.type}
                      {checkpoint.mandatory && ' • Mandatory'}
                    </p>
                    {checkpoint.parameters?.length > 0 && (
                      <p className="text-xs text-gray-600 mt-1">
                        Parameters: {checkpoint.parameters.join(', ')}
                      </p>
                    )}
                  </div>
                </div>
                {isCompleted && <CheckCircle className="w-5 h-5 text-green-600" />}
              </div>
            </div>
          );
        })}
      </div>

      {/* Findings Section */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="text-sm font-medium text-gray-900 mb-4">Inspection Findings</h4>
        
        {/* Add Finding Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <textarea
              value={findingForm.description}
              onChange={(e) => setFindingForm({...findingForm, description: e.target.value})}
              placeholder="Describe finding or observation..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          </div>
          <div className="space-y-3">
            <select
              value={findingForm.status}
              onChange={(e) => setFindingForm({...findingForm, status: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="passed">Passed</option>
              <option value="failed">Failed</option>
              <option value="observation">Under Observation</option>
            </select>
            <select
              value={findingForm.priority}
              onChange={(e) => setFindingForm({...findingForm, priority: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
              <option value="critical">Critical</option>
            </select>
            <button
              onClick={handleAddFinding}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              Add Finding
            </button>
          </div>
        </div>

        {/* Findings List */}
        <div className="space-y-2">
          {findings.map((finding) => (
            <div key={finding.id} className="flex items-start justify-between p-3 bg-white rounded border">
              <div className="flex-1">
                <p className="text-sm text-gray-900">{finding.description}</p>
                <div className="flex items-center space-x-4 mt-1">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    finding.status === 'passed' ? 'bg-green-100 text-green-800' :
                    finding.status === 'failed' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {finding.status}
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    finding.priority === 'critical' ? 'bg-red-100 text-red-800' :
                    finding.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                    finding.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {finding.priority}
                  </span>
                </div>
              </div>
            </div>
          ))}
          {findings.length === 0 && (
            <p className="text-sm text-gray-500 text-center py-4">No findings recorded yet.</p>
          )}
        </div>
      </div>

      {/* Checkpoint Detail Modal */}
      {selectedCheckpoint && (
        <CheckpointDetailModal
          checkpoint={selectedCheckpoint}
          onClose={() => setSelectedCheckpoint(null)}
          onSave={(data) => handleMeasurementSave(selectedCheckpoint.id, data)}
          existingData={checkpoints[selectedCheckpoint.id]}
        />
      )}
    </div>
  );
}

// Documentation Step Component
function DocumentationStep({ journeyData, onDataChange }) {
  const [newPhoto, setNewPhoto] = useState('');
  const [newDocument, setNewDocument] = useState('');

  const addPhoto = () => {
    if (newPhoto.trim()) {
      onDataChange(prev => ({
        ...prev,
        photos: [...prev.photos, {
          id: Date.now(),
          name: newPhoto,
          timestamp: new Date().toISOString()
        }]
      }));
      setNewPhoto('');
    }
  };

  const addDocument = () => {
    if (newDocument.trim()) {
      onDataChange(prev => ({
        ...prev,
        documents: [...prev.documents, {
          id: Date.now(),
          name: newDocument,
          timestamp: new Date().toISOString()
        }]
      }));
      setNewDocument('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <FileText className="w-12 h-12 text-purple-500 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900">Documentation</h3>
        <p className="text-sm text-gray-600 mt-2">
          Attach photos, documents, and additional comments to support your inspection findings.
        </p>
      </div>

      {/* Photos Section */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="text-sm font-medium text-gray-900 mb-4 flex items-center">
          <Camera className="w-4 h-4 mr-2" />
          Photos
        </h4>
        <div className="flex space-x-2 mb-3">
          <input
            type="text"
            value={newPhoto}
            onChange={(e) => setNewPhoto(e.target.value)}
            placeholder="Photo description or filename..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addPhoto}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            Add Photo
          </button>
        </div>
        <div className="space-y-2">
          {journeyData.photos.map((photo) => (
            <div key={photo.id} className="flex items-center justify-between p-2 bg-white rounded border">
              <div className="flex items-center space-x-2">
                <Image className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-900">{photo.name}</span>
              </div>
              <span className="text-xs text-gray-500">{new Date(photo.timestamp).toLocaleString()}</span>
            </div>
          ))}
          {journeyData.photos.length === 0 && (
            <p className="text-sm text-gray-500 text-center py-4">No photos attached.</p>
          )}
        </div>
      </div>

      {/* Documents Section */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="text-sm font-medium text-gray-900 mb-4 flex items-center">
          <Paperclip className="w-4 h-4 mr-2" />
          Documents
        </h4>
        <div className="flex space-x-2 mb-3">
          <input
            type="text"
            value={newDocument}
            onChange={(e) => setNewDocument(e.target.value)}
            placeholder="Document name or description..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addDocument}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            Add Document
          </button>
        </div>
        <div className="space-y-2">
          {journeyData.documents.map((doc) => (
            <div key={doc.id} className="flex items-center justify-between p-2 bg-white rounded border">
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-900">{doc.name}</span>
              </div>
              <span className="text-xs text-gray-500">{new Date(doc.timestamp).toLocaleString()}</span>
            </div>
          ))}
          {journeyData.documents.length === 0 && (
            <p className="text-sm text-gray-500 text-center py-4">No documents attached.</p>
          )}
        </div>
      </div>

      {/* Comments Section */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="text-sm font-medium text-gray-900 mb-4 flex items-center">
          <MessageSquare className="w-4 h-4 mr-2" />
          Additional Comments
        </h4>
        <textarea
          value={journeyData.comments}
          onChange={(e) => onDataChange(prev => ({...prev, comments: e.target.value}))}
          placeholder="Add any additional observations, recommendations, or notes..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
        />
      </div>
    </div>
  );
}

// Review Step Component
function ReviewStep({ inspection, journeyData, template, onDataChange }) {
  const completedCheckpoints = template?.checkpoints?.filter(cp => 
    journeyData.checkpoints[cp.id]?.completed
  ).length || 0;
  
  const totalCheckpoints = template?.checkpoints?.length || 0;
  const mandatoryCheckpoints = template?.checkpoints?.filter(cp => cp.mandatory).length || 0;
  const completedMandatory = template?.checkpoints?.filter(cp => 
    cp.mandatory && journeyData.checkpoints[cp.id]?.completed
  ).length || 0;

  const failedFindings = journeyData.findings.filter(f => f.status === 'failed').length;
  const observationFindings = journeyData.findings.filter(f => f.status === 'observation').length;

  const estimatedHealthScore = Math.max(50, 
    inspection.healthScoreBefore - (failedFindings * 10) - (observationFindings * 2)
  );

  return (
    <div className="space-y-6">
      <div className="text-center">
        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900">Review & Submit</h3>
        <p className="text-sm text-gray-600 mt-2">
          Review your inspection results before submitting. Ensure all required checks are completed.
        </p>
      </div>

      {/* Inspection Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-900 mb-4">Inspection Progress</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Checkpoints:</span>
              <span className="font-medium">{completedCheckpoints}/{totalCheckpoints}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Mandatory Completed:</span>
              <span className={`font-medium ${completedMandatory === mandatoryCheckpoints ? 'text-green-600' : 'text-red-600'}`}>
                {completedMandatory}/{mandatoryCheckpoints}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Findings:</span>
              <span className="font-medium">{journeyData.findings.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Failed Items:</span>
              <span className={`font-medium ${failedFindings > 0 ? 'text-red-600' : 'text-green-600'}`}>
                {failedFindings}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-900 mb-4">Equipment Health</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Before Inspection:</span>
              <span className="font-medium">{inspection.healthScoreBefore}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Estimated After:</span>
              <span className={`font-medium ${
                estimatedHealthScore >= inspection.healthScoreBefore ? 'text-green-600' : 'text-orange-600'
              }`}>
                {estimatedHealthScore}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Change:</span>
              <span className={`font-medium ${
                estimatedHealthScore >= inspection.healthScoreBefore ? 'text-green-600' : 'text-red-600'
              }`}>
                {estimatedHealthScore - inspection.healthScoreBefore > 0 ? '+' : ''}
                {estimatedHealthScore - inspection.healthScoreBefore}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Final Status */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="text-sm font-medium text-gray-900 mb-4">Overall Assessment</h4>
        <div className="grid grid-cols-3 gap-3">
          {['passed', 'observation', 'failed'].map(status => (
            <label key={status} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="finalStatus"
                value={status}
                checked={journeyData.finalStatus === status}
                onChange={(e) => onDataChange(prev => ({...prev, finalStatus: e.target.value}))}
                className="text-blue-600"
              />
              <span className={`px-3 py-2 rounded-lg text-sm font-medium flex-1 text-center ${
                status === 'passed' ? 'bg-green-100 text-green-800' :
                status === 'observation' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Validation Messages */}
      {completedMandatory < mandatoryCheckpoints && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex">
            <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-medium text-red-800">Incomplete Mandatory Checks</h4>
              <p className="text-sm text-red-700 mt-1">
                Please complete all mandatory checkpoints before submitting the inspection.
              </p>
            </div>
          </div>
        </div>
      )}

      {failedFindings > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex">
            <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-medium text-yellow-800">Failed Items Detected</h4>
              <p className="text-sm text-yellow-700 mt-1">
                This inspection contains {failedFindings} failed item(s). Consider creating maintenance backlogs.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Checkpoint Detail Modal
function CheckpointDetailModal({ checkpoint, onClose, onSave, existingData }) {
  const [data, setData] = useState({
    measurements: {},
    observations: '',
    status: 'passed',
    notes: '',
    ...existingData
  });

  const handleSave = () => {
    onSave(data);
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title={`${checkpoint.name} - ${checkpoint.type}`}
      size="lg"
    >
      <div className="space-y-4">
        {checkpoint.type === 'measurement' && (
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">Measurements</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {checkpoint.parameters?.map((param) => (
                <div key={param}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {param} {checkpoint.unit && `(${checkpoint.unit})`}
                  </label>
                  <input
                    type="number"
                    value={data.measurements[param] || ''}
                    onChange={(e) => setData(prev => ({
                      ...prev,
                      measurements: {
                        ...prev.measurements,
                        [param]: e.target.value
                      }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter value"
                  />
                  {checkpoint.normalRange && (
                    <p className="text-xs text-gray-500 mt-1">
                      Normal: {checkpoint.normalRange.min} - {checkpoint.normalRange.max}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Observations
          </label>
          <textarea
            value={data.observations}
            onChange={(e) => setData(prev => ({...prev, observations: e.target.value}))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            placeholder="Record your observations..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            value={data.status}
            onChange={(e) => setData(prev => ({...prev, status: e.target.value}))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="passed">Passed</option>
            <option value="failed">Failed</option>
            <option value="observation">Under Observation</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Additional Notes
          </label>
          <textarea
            value={data.notes}
            onChange={(e) => setData(prev => ({...prev, notes: e.target.value}))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={2}
            placeholder="Any additional notes..."
          />
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Save Checkpoint
          </button>
        </div>
      </div>
    </Modal>
  );
}

// Inspection Templates Management Modal
function InspectionTemplatesModal({ isOpen, onClose, templates, onSave }) {
  const [activeTab, setActiveTab] = useState('list');
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    equipmentTypes: [],
    safetyChecks: [],
    checkpoints: [],
    isActive: true
  });

  const [newSafetyCheck, setNewSafetyCheck] = useState('');
  const [newCheckpoint, setNewCheckpoint] = useState({
    name: '',
    type: 'observation',
    mandatory: true,
    parameters: []
  });

  const handleCreateTemplate = () => {
    setEditingTemplate(null);
    setFormData({
      name: '',
      equipmentTypes: [],
      safetyChecks: [],
      checkpoints: [],
      isActive: true
    });
    setActiveTab('create');
  };

  const handleEditTemplate = (template) => {
    setEditingTemplate(template);
    setFormData(template);
    setActiveTab('create');
  };

  const handleSaveTemplate = () => {
    const newTemplate = {
      id: editingTemplate?.id || `TMPL-${Date.now()}`,
      ...formData,
      createdBy: 'Current User',
      createdDate: editingTemplate?.createdDate || new Date().toISOString().split('T')[0]
    };

    let updatedTemplates;
    if (editingTemplate) {
      updatedTemplates = templates.map(t => t.id === editingTemplate.id ? newTemplate : t);
    } else {
      updatedTemplates = [...templates, newTemplate];
    }
    
    onSave(updatedTemplates);
    setActiveTab('list');
  };

  const handleDeleteTemplate = (templateId) => {
    if (window.confirm('Are you sure you want to delete this template?')) {
      const updatedTemplates = templates.filter(t => t.id !== templateId);
      onSave(updatedTemplates);
    }
  };

  const addSafetyCheck = () => {
    if (newSafetyCheck.trim()) {
      setFormData(prev => ({
        ...prev,
        safetyChecks: [...prev.safetyChecks, newSafetyCheck.trim()]
      }));
      setNewSafetyCheck('');
    }
  };

  const removeSafetyCheck = (index) => {
    setFormData(prev => ({
      ...prev,
      safetyChecks: prev.safetyChecks.filter((_, i) => i !== index)
    }));
  };

  const addCheckpoint = () => {
    if (newCheckpoint.name.trim()) {
      const checkpoint = {
        ...newCheckpoint,
        id: `cp-${Date.now()}`,
        parameters: newCheckpoint.parameters.filter(p => p.trim())
      };
      setFormData(prev => ({
        ...prev,
        checkpoints: [...prev.checkpoints, checkpoint]
      }));
      setNewCheckpoint({
        name: '',
        type: 'observation',
        mandatory: true,
        parameters: []
      });
    }
  };

  const removeCheckpoint = (index) => {
    setFormData(prev => ({
      ...prev,
      checkpoints: prev.checkpoints.filter((_, i) => i !== index)
    }));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Inspection Templates"
      size="2xl"
    >
      <div className="space-y-4">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('list')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'list'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Templates List
            </button>
            <button
              onClick={() => setActiveTab('create')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'create'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {editingTemplate ? 'Edit Template' : 'Create Template'}
            </button>
          </nav>
        </div>

        {/* Templates List */}
        {activeTab === 'list' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-medium text-gray-900">Available Templates</h4>
              <button
                onClick={handleCreateTemplate}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                <Plus className="w-4 h-4 mr-2 inline" />
                New Template
              </button>
            </div>
            
            <div className="space-y-3">
              {templates.map((template) => (
                <div key={template.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h5 className="text-sm font-medium text-gray-900">{template.name}</h5>
                      <p className="text-xs text-gray-500 mt-1">
                        Equipment Types: {template.equipmentTypes.join(', ')}
                      </p>
                      <p className="text-xs text-gray-500">
                        {template.safetyChecks.length} Safety Checks, {template.checkpoints.length} Checkpoints
                      </p>
                      <div className="flex items-center mt-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          template.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {template.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEditTemplate(template)}
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteTemplate(template.id)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Create/Edit Template */}
        {activeTab === 'create' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Template Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter template name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Equipment Types
                </label>
                <select
                  multiple
                  value={formData.equipmentTypes}
                  onChange={(e) => setFormData({
                    ...formData, 
                    equipmentTypes: Array.from(e.target.selectedOptions, option => option.value)
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="plant">Plant</option>
                  <option value="equipment">Equipment</option>
                  <option value="assembly">Assembly</option>
                  <option value="sub-assembly">Sub-Assembly</option>
                  <option value="component">Component</option>
                </select>
              </div>
            </div>

            {/* Safety Checks */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Safety Checks
              </label>
              <div className="flex space-x-2 mb-2">
                <input
                  type="text"
                  value={newSafetyCheck}
                  onChange={(e) => setNewSafetyCheck(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Add safety check..."
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSafetyCheck())}
                />
                <button
                  type="button"
                  onClick={addSafetyCheck}
                  className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add
                </button>
              </div>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {formData.safetyChecks.map((check, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm flex-1">{check}</span>
                    <button
                      type="button"
                      onClick={() => removeSafetyCheck(index)}
                      className="text-red-600 hover:text-red-800 p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Checkpoints */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Inspection Checkpoints
              </label>
              <div className="border border-gray-200 rounded-lg p-4 mb-2">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                  <input
                    type="text"
                    value={newCheckpoint.name}
                    onChange={(e) => setNewCheckpoint({...newCheckpoint, name: e.target.value})}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Checkpoint name"
                  />
                  <select
                    value={newCheckpoint.type}
                    onChange={(e) => setNewCheckpoint({...newCheckpoint, type: e.target.value})}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="observation">Observation</option>
                    <option value="measurement">Measurement</option>
                    <option value="test">Test</option>
                  </select>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={newCheckpoint.mandatory}
                      onChange={(e) => setNewCheckpoint({...newCheckpoint, mandatory: e.target.checked})}
                      className="rounded text-blue-600"
                    />
                    <label className="text-sm text-gray-700">Mandatory</label>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newCheckpoint.parameters.join(', ')}
                    onChange={(e) => setNewCheckpoint({
                      ...newCheckpoint, 
                      parameters: e.target.value.split(',').map(p => p.trim())
                    })}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Parameters (comma separated)"
                  />
                  <button
                    type="button"
                    onClick={addCheckpoint}
                    className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Add Checkpoint
                  </button>
                </div>
              </div>
              
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {formData.checkpoints.map((checkpoint, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">{checkpoint.name}</span>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          checkpoint.type === 'measurement' ? 'bg-blue-100 text-blue-800' :
                          checkpoint.type === 'test' ? 'bg-purple-100 text-purple-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {checkpoint.type}
                        </span>
                        {checkpoint.mandatory && (
                          <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">
                            Mandatory
                          </span>
                        )}
                      </div>
                      {checkpoint.parameters.length > 0 && (
                        <div className="text-xs text-gray-500 mt-1">
                          Parameters: {checkpoint.parameters.join(', ')}
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeCheckpoint(index)}
                      className="text-red-600 hover:text-red-800 p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                className="rounded text-blue-600"
              />
              <label className="text-sm text-gray-700">Active Template</label>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setActiveTab('list')}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveTemplate}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {editingTemplate ? 'Update Template' : 'Create Template'}
              </button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}

// Inspection Journey Modal - Multi-step inspection process
function InspectionJourneyModal({ isOpen, onClose, inspection, template, onSave }) {
  const [currentStep, setCurrentStep] = useState('safety');
  const [journeyData, setJourneyData] = useState({
    safetyChecks: {},
    checkpoints: {},
    measurements: {},
    findings: [],
    photos: [],
    documents: [],
    comments: '',
    finalStatus: 'passed'
  });
  const [timeTracking, setTimeTracking] = useState({
    startTime: null,
    currentPhase: 'measurement',
    resources: []
  });

  const steps = [
    { id: 'safety', label: 'Safety Checks', icon: AlertOctagon },
    { id: 'inspection', label: 'Inspection', icon: Search },
    { id: 'documentation', label: 'Documentation', icon: FileText },
    { id: 'review', label: 'Review & Submit', icon: CheckCircle }
  ];

  useEffect(() => {
    if (inspection && isOpen) {
      setTimeTracking({
        startTime: new Date().toISOString(),
        currentPhase: 'measurement',
        resources: [{ name: 'Current User', startTime: new Date().toISOString() }]
      });
    }
  }, [inspection, isOpen]);

  const handleSafetyCheckChange = (checkIndex, checked) => {
    setJourneyData(prev => ({
      ...prev,
      safetyChecks: {
        ...prev.safetyChecks,
        [checkIndex]: checked
      }
    }));
  };

  const handleCheckpointChange = (checkpointId, data) => {
    setJourneyData(prev => ({
      ...prev,
      checkpoints: {
        ...prev.checkpoints,
        [checkpointId]: data
      }
    }));
  };

  const addFinding = (finding) => {
    setJourneyData(prev => ({
      ...prev,
      findings: [...prev.findings, {
        id: Date.now(),
        ...finding,
        timestamp: new Date().toISOString()
      }]
    }));
  };

  const canProceedFromSafety = () => {
    if (!template?.safetyChecks) return true;
    return template.safetyChecks.every((_, index) => journeyData.safetyChecks[index] === true);
  };

  const canCompleteInspection = () => {
    if (!template?.checkpoints) return true;
    return template.checkpoints
      .filter(cp => cp.mandatory)
      .every(cp => journeyData.checkpoints[cp.id]?.completed);
  };

  const handleSaveDraft = () => {
    const updatedInspection = {
      ...inspection,
      isDraft: true,
      status: 'In Progress',
      resourceTracking: {
        ...inspection.resourceTracking,
        measurementPhase: {
          ...timeTracking,
          endTime: null
        },
        totalTries: inspection.resourceTracking.totalTries + 1,
        totalTimeSpent: inspection.resourceTracking.totalTimeSpent + 
          (new Date() - new Date(timeTracking.startTime)) / (1000 * 60 * 60)
      },
      journeyData
    };
    onSave(updatedInspection);
    onClose();
  };

  const handleCompleteInspection = () => {
    const updatedInspection = {
      ...inspection,
      isDraft: false,
      status: 'Completed',
      findings: journeyData.findings,
      resourceTracking: {
        ...inspection.resourceTracking,
        measurementPhase: {
          ...timeTracking,
          endTime: new Date().toISOString()
        },
        totalTries: inspection.resourceTracking.totalTries + 1,
        totalTimeSpent: inspection.resourceTracking.totalTimeSpent + 
          (new Date() - new Date(timeTracking.startTime)) / (1000 * 60 * 60)
      },
      healthScoreAfter: calculateHealthScore(),
      journeyData
    };
    onSave(updatedInspection);
    onClose();
  };

  const calculateHealthScore = () => {
    const baseScore = inspection.healthScoreBefore;
    const failedFindings = journeyData.findings.filter(f => f.status === 'failed').length;
    const observationFindings = journeyData.findings.filter(f => f.status === 'observation').length;
    
    return Math.max(50, baseScore - (failedFindings * 10) - (observationFindings * 2));
  };

  if (!inspection || !isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Inspection Journey - ${inspection.id}`}
      size="2xl"
    >
      <div className="space-y-6">
        {/* Step Navigation */}
        <div className="flex justify-between items-center border-b border-gray-200 pb-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = step.id === currentStep;
            const isCompleted = steps.findIndex(s => s.id === currentStep) > index;
            
            return (
              <div
                key={step.id}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                  isActive 
                    ? 'bg-blue-100 text-blue-700' 
                    : isCompleted 
                      ? 'bg-green-100 text-green-700'
                      : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => {
                  if (isCompleted || isActive) {
                    setCurrentStep(step.id);
                  }
                }}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium hidden sm:inline">{step.label}</span>
                {isCompleted && <CheckCircle className="w-4 h-4" />}
              </div>
            );
          })}
        </div>

        {/* Step Content */}
        <div className="min-h-96">
          {currentStep === 'safety' && (
            <SafetyChecksStep
              template={template}
              safetyChecks={journeyData.safetyChecks}
              onCheckChange={handleSafetyCheckChange}
            />
          )}
          
          {currentStep === 'inspection' && (
            <InspectionStep
              template={template}
              checkpoints={journeyData.checkpoints}
              onCheckpointChange={handleCheckpointChange}
              onAddFinding={addFinding}
              findings={journeyData.findings}
            />
          )}
          
          {currentStep === 'documentation' && (
            <DocumentationStep
              journeyData={journeyData}
              onDataChange={setJourneyData}
            />
          )}
          
          {currentStep === 'review' && (
            <ReviewStep
              inspection={inspection}
              journeyData={journeyData}
              template={template}
              onDataChange={setJourneyData}
            />
          )}
        </div>

        {/* Navigation and Actions */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
          <div className="flex space-x-3">
            <button
              onClick={handleSaveDraft}
              className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm"
            >
              <Save className="w-4 h-4 mr-2 inline" />
              Save as Draft
            </button>
          </div>
          
          <div className="flex space-x-3">
            {currentStep !== 'safety' && (
              <button
                onClick={() => {
                  const currentIndex = steps.findIndex(s => s.id === currentStep);
                  setCurrentStep(steps[currentIndex - 1].id);
                }}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors text-sm"
              >
                Previous
              </button>
            )}
            
            {currentStep !== 'review' ? (
              <button
                onClick={() => {
                  if (currentStep === 'safety' && !canProceedFromSafety()) {
                    alert('Please complete all safety checks before proceeding.');
                    return;
                  }
                  const currentIndex = steps.findIndex(s => s.id === currentStep);
                  setCurrentStep(steps[currentIndex + 1].id);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                disabled={currentStep === 'safety' && !canProceedFromSafety()}
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleCompleteInspection}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                disabled={!canCompleteInspection()}
              >
                <CheckCircle className="w-4 h-4 mr-2 inline" />
                Complete Inspection
              </button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}

// Enhanced Inspections Component with Templates and Journey
function Inspections() {
  const { data, setData, addActivity } = useContext(AppContext);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showInspectionJourney, setShowInspectionJourney] = useState(false);
  const [selectedInspection, setSelectedInspection] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const inspectionStats = {
    total: data.inspections.length,
    scheduled: data.inspections.filter(i => i.status === 'Scheduled').length,
    inProgress: data.inspections.filter(i => i.status === 'In Progress').length,
    completed: data.inspections.filter(i => i.status === 'Completed').length,
    overdue: data.inspections.filter(i => 
      new Date(i.scheduledDate) < new Date() && i.status !== 'Completed'
    ).length
  };

  const updateInspectionStatus = (inspectionId, newStatus) => {
    setData(prev => ({
      ...prev,
      inspections: prev.inspections.map(inspection => 
        inspection.id === inspectionId ? { 
          ...inspection, 
          status: newStatus,
          ...(newStatus === 'Completed' && {
            healthScoreAfter: inspection.healthScoreBefore + Math.floor(Math.random() * 5),
            findings: []
          })
        } : inspection
      )
    }));

    addActivity(`Inspection ${inspectionId} status updated to ${newStatus}`, 'Inspection');
  };

  const createInspection = (inspectionData) => {
    const newInspection = {
      id: `INSP-${Date.now()}`,
      ...inspectionData,
      status: 'Scheduled',
      findings: [],
      isDraft: false,
      resourceTracking: {
        measurementPhase: { startTime: null, endTime: null, resources: [] },
        engagementPhase: { startTime: null, endTime: null, resources: [] },
        totalTries: 0,
        totalTimeSpent: 0
      },
      escalationSettings: {
        delayThreshold: 24,
        criticalityThreshold: 'High',
        escalationContacts: []
      }
    };

    setData(prev => ({
      ...prev,
      inspections: [...prev.inspections, newInspection]
    }));

    addActivity(`Inspection ${newInspection.id} scheduled for ${inspectionData.equipmentName}`, 'Inspection');
  };

  const startInspectionJourney = (inspection) => {
    setSelectedInspection(inspection);
    setShowInspectionJourney(true);
  };

  const filteredInspections = data.inspections.filter(inspection => {
    const matchesSearch = !searchTerm || 
      inspection.equipmentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inspection.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || inspection.status === statusFilter;
    const matchesType = typeFilter === 'all' || inspection.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header and Controls */}
      <div className="bg-white rounded-lg shadow p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 space-y-3 sm:space-y-0">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Inspection Management</h2>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm min-h-[44px] flex items-center"
            >
              <Plus className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Schedule Inspection</span>
              <span className="sm:hidden">Schedule</span>
            </button>
            <button
              onClick={() => setShowTemplateModal(true)}
              className="px-3 sm:px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm min-h-[44px] flex items-center"
            >
              <FileText className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Templates</span>
              <span className="sm:hidden">Templates</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base min-h-[44px]"
          >
            <option value="all">All Status</option>
            <option value="Scheduled">Scheduled</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Overdue">Overdue</option>
          </select>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base min-h-[44px]"
          >
            <option value="all">All Types</option>
            <option value="Daily Equipment Check">Daily</option>
            <option value="Weekly Comprehensive Check">Weekly</option>
            <option value="Monthly Comprehensive">Monthly</option>
            <option value="Shutdown Inspection">Shutdown</option>
          </select>
          <input
            type="text"
            placeholder="Search inspections..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base min-h-[44px]"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-6">
        <div className="bg-white rounded-lg shadow p-3 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Total</p>
              <p className="text-xl sm:text-3xl font-bold text-gray-900">{inspectionStats.total}</p>
            </div>
            <Search className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500 flex-shrink-0" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-3 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Scheduled</p>
              <p className="text-xl sm:text-3xl font-bold text-blue-600">{inspectionStats.scheduled}</p>
            </div>
            <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500 flex-shrink-0" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-3 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600">In Progress</p>
              <p className="text-xl sm:text-3xl font-bold text-yellow-600">{inspectionStats.inProgress}</p>
            </div>
            <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500 flex-shrink-0" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-3 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Completed</p>
              <p className="text-xl sm:text-3xl font-bold text-green-600">{inspectionStats.completed}</p>
            </div>
            <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-500 flex-shrink-0" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-3 sm:p-6 col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Overdue</p>
              <p className="text-xl sm:text-3xl font-bold text-red-600">{inspectionStats.overdue}</p>
            </div>
            <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 text-red-500 flex-shrink-0" />
          </div>
        </div>
      </div>

      {/* Inspections List */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <h3 className="text-base sm:text-lg font-medium text-gray-900">Inspections</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredInspections.map((inspection) => (
            <EnhancedInspectionCard 
              key={inspection.id} 
              inspection={inspection} 
              onUpdateStatus={updateInspectionStatus}
              onStartJourney={startInspectionJourney}
            />
          ))}
        </div>
      </div>

      {/* Create Inspection Modal */}
      <EnhancedInspectionModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSave={createInspection}
        equipment={data.equipment}
        templates={data.inspectionTemplates}
      />

      {/* Templates Management Modal */}
      <InspectionTemplatesModal
        isOpen={showTemplateModal}
        onClose={() => setShowTemplateModal(false)}
        templates={data.inspectionTemplates}
        onSave={(templates) => setData(prev => ({ ...prev, inspectionTemplates: templates }))}
      />

      {/* Inspection Journey Modal */}
      <InspectionJourneyModal
        isOpen={showInspectionJourney}
        onClose={() => {
          setShowInspectionJourney(false);
          setSelectedInspection(null);
        }}
        inspection={selectedInspection}
        template={selectedInspection ? data.inspectionTemplates.find(t => t.id === selectedInspection.templateId) : null}
        onSave={(updatedInspection) => {
          setData(prev => ({
            ...prev,
            inspections: prev.inspections.map(insp => 
              insp.id === updatedInspection.id ? updatedInspection : insp
            )
          }));
          addActivity(`Inspection ${updatedInspection.id} ${updatedInspection.status.toLowerCase()}`, 'Inspection');
        }}
      />
    </div>
  );
}

// Enhanced Inspection Card
function EnhancedInspectionCard({ inspection, onUpdateStatus, onStartJourney }) {
  const [expanded, setExpanded] = useState(false);
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'Scheduled': return 'bg-blue-100 text-blue-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const isOverdue = new Date(inspection.scheduledDate) < new Date() && inspection.status !== 'Completed';
  const actualStatus = isOverdue ? 'Overdue' : inspection.status;

  const handleStatusUpdate = (newStatus) => {
    onUpdateStatus(inspection.id, newStatus);
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <h4 className="text-sm sm:text-lg font-medium text-gray-900">{inspection.id}</h4>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(actualStatus)}`}>
              {actualStatus}
            </span>
            <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
              {inspection.type}
            </span>
            {inspection.isDraft && (
              <span className="px-2 py-1 text-xs font-medium bg-orange-100 text-orange-800 rounded-full">
                DRAFT
              </span>
            )}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
            <div>
              <span className="font-medium">Equipment:</span> <span className="truncate">{inspection.equipmentName}</span>
            </div>
            <div>
              <span className="font-medium">Assigned:</span> {inspection.assignedTo}
            </div>
            <div>
              <span className="font-medium">Scheduled:</span> 
              <span className={isOverdue ? 'text-red-600 font-medium' : ''}> {inspection.scheduledDate}</span>
            </div>
            <div>
              <span className="font-medium">Duration:</span> {inspection.estimatedDuration}
            </div>
          </div>

          {/* Resource Tracking Display */}
          {inspection.resourceTracking.totalTimeSpent > 0 && (
            <div className="mt-2 text-xs text-gray-600">
              <span className="font-medium">Time Spent:</span> {inspection.resourceTracking.totalTimeSpent}h 
              <span className="ml-2 font-medium">Tries:</span> {inspection.resourceTracking.totalTries}
            </div>
          )}
        </div>

        <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            {expanded ? <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5" /> : <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />}
          </button>
          
          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
            {(inspection.status === 'Scheduled' || inspection.status === 'In Progress') && (
              <button
                onClick={() => onStartJourney(inspection)}
                className="px-2 sm:px-3 py-1 bg-green-600 text-white text-xs sm:text-sm rounded-lg hover:bg-green-700 transition-colors min-h-[36px] flex items-center justify-center"
              >
                <PlayCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                <span className="hidden sm:inline">Start Inspection</span>
                <span className="sm:hidden">Start</span>
              </button>
            )}
            {inspection.status === 'Scheduled' && (
              <button
                onClick={() => handleStatusUpdate('In Progress')}
                className="px-2 sm:px-3 py-1 bg-blue-600 text-white text-xs sm:text-sm rounded-lg hover:bg-blue-700 transition-colors min-h-[36px] flex items-center justify-center"
              >
                <Play className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                <span className="hidden sm:inline">Start</span>
                <span className="sm:hidden">Start</span>
              </button>
            )}
            {inspection.status === 'In Progress' && !inspection.isDraft && (
              <button
                onClick={() => handleStatusUpdate('Completed')}
                className="px-2 sm:px-3 py-1 bg-green-600 text-white text-xs sm:text-sm rounded-lg hover:bg-green-700 transition-colors min-h-[36px] flex items-center justify-center"
              >
                <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                <span className="hidden sm:inline">Complete</span>
                <span className="sm:hidden">Complete</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {expanded && (
        <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <h5 className="font-medium text-gray-900 mb-3">Inspection Details</h5>
              <div className="space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Priority:</span>
                  <span className="font-medium">{inspection.priority}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Template:</span>
                  <span className="font-medium">{inspection.templateName || 'No Template'}</span>
                </div>
                {inspection.healthScoreBefore && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Health Score Before:</span>
                    <span className="font-medium">{inspection.healthScoreBefore}%</span>
                  </div>
                )}
                {inspection.healthScoreAfter && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Health Score After:</span>
                    <span className="font-medium">{inspection.healthScoreAfter}%</span>
                  </div>
                )}
              </div>
            </div>
            <div>
              <h5 className="font-medium text-gray-900 mb-3">Resource Tracking</h5>
              <div className="space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Tries:</span>
                  <span className="font-medium">{inspection.resourceTracking.totalTries}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Time:</span>
                  <span className="font-medium">{inspection.resourceTracking.totalTimeSpent}h</span>
                </div>
                {inspection.resourceTracking.measurementPhase.startTime && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Measurement Phase:</span>
                    <span className="font-medium">
                      {inspection.resourceTracking.measurementPhase.endTime ? 'Completed' : 'In Progress'}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-4 sm:mt-6 flex flex-wrap items-center gap-2">
            <button 
              onClick={() => alert('Edit functionality would be implemented here')}
              className="px-3 py-2 bg-gray-600 text-white text-xs sm:text-sm rounded-lg hover:bg-gray-700 transition-colors min-h-[44px] flex items-center"
            >
              <Edit className="w-4 h-4 mr-1 sm:mr-2" />
              Edit
            </button>
            <button 
              onClick={() => alert('Report functionality would be implemented here')}
              className="px-3 py-2 bg-gray-600 text-white text-xs sm:text-sm rounded-lg hover:bg-gray-700 transition-colors min-h-[44px] flex items-center"
            >
              <FileText className="w-4 h-4 mr-1 sm:mr-2" />
              Report
            </button>
            {inspection.escalationSettings.escalationContacts?.length > 0 && (
              <button 
                onClick={() => alert('Send escalation notification functionality would be implemented here')}
                className="px-3 py-2 bg-orange-600 text-white text-xs sm:text-sm rounded-lg hover:bg-orange-700 transition-colors min-h-[44px] flex items-center"
              >
                <Bell className="w-4 h-4 mr-1 sm:mr-2" />
                Escalate
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Enhanced Inspection Modal
function EnhancedInspectionModal({ isOpen, onClose, onSave, equipment, templates }) {
  const [formData, setFormData] = useState({
    equipmentId: '',
    equipmentName: '',
    templateId: '',
    templateName: '',
    type: '',
    scheduledDate: '',
    assignedTo: '',
    estimatedDuration: '',
    priority: 'Normal',
    escalationSettings: {
      delayThreshold: 24,
      criticalityThreshold: 'High',
      escalationContacts: []
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedEquipment = equipment.find(eq => eq.id === formData.equipmentId);
    const selectedTemplate = templates.find(t => t.id === formData.templateId);
    if (selectedEquipment) {
      onSave({
        ...formData,
        equipmentName: selectedEquipment.name,
        templateName: selectedTemplate?.name || '',
        type: selectedTemplate?.name || formData.type,
        healthScoreBefore: selectedEquipment.healthScore
      });
      onClose();
      setFormData({
        equipmentId: '',
        equipmentName: '',
        templateId: '',
        templateName: '',
        type: '',
        scheduledDate: '',
        assignedTo: '',
        estimatedDuration: '',
        priority: 'Normal',
        escalationSettings: {
          delayThreshold: 24,
          criticalityThreshold: 'High',
          escalationContacts: []
        }
      });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Schedule New Inspection"
      size="lg"
    >
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 sm:mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Equipment *
            </label>
            <select
              value={formData.equipmentId}
              onChange={(e) => setFormData({...formData, equipmentId: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base min-h-[44px]"
              required
            >
              <option value="">Select Equipment</option>
              {equipment.map(eq => (
                <option key={eq.id} value={eq.id}>
                  {eq.name} ({eq.code})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Inspection Template
            </label>
            <select
              value={formData.templateId}
              onChange={(e) => {
                const template = templates.find(t => t.id === e.target.value);
                setFormData({
                  ...formData, 
                  templateId: e.target.value,
                  templateName: template?.name || '',
                  type: template?.name || ''
                });
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base min-h-[44px]"
            >
              <option value="">Select Template</option>
              {templates.filter(t => t.isActive).map(template => (
                <option key={template.id} value={template.id}>
                  {template.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Inspection Type *
            </label>
            <input
              type="text"
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base min-h-[44px]"
              placeholder="Enter inspection type"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Scheduled Date *
            </label>
            <input
              type="date"
              value={formData.scheduledDate}
              onChange={(e) => setFormData({...formData, scheduledDate: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base min-h-[44px]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Assigned To *
            </label>
            <input
              type="text"
              value={formData.assignedTo}
              onChange={(e) => setFormData({...formData, assignedTo: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base min-h-[44px]"
              placeholder="Technician name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Estimated Duration
            </label>
            <input
              type="text"
              value={formData.estimatedDuration}
              onChange={(e) => setFormData({...formData, estimatedDuration: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base min-h-[44px]"
              placeholder="e.g., 2 hours"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Priority
            </label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData({...formData, priority: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base min-h-[44px]"
            >
              <option value="Normal">Normal</option>
              <option value="High">High</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Escalation Threshold (hours)
            </label>
            <input
              type="number"
              value={formData.escalationSettings.delayThreshold}
              onChange={(e) => setFormData({
                ...formData, 
                escalationSettings: {
                  ...formData.escalationSettings,
                  delayThreshold: parseInt(e.target.value) || 24
                }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base min-h-[44px]"
              min="1"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors text-sm min-h-[44px]"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm min-h-[44px] flex items-center justify-center"
          >
            <Save className="w-4 h-4 mr-2" />
            Schedule Inspection
          </button>
        </div>
      </form>
    </Modal>
  );
}
