export type MonitoringCadence = 'daily' | 'weekly' | 'fortnightly' | 'monthly';

export type NavigationTab = 
  | 'cockpit' 
  | 'monitoring' 
  | 'inspection' 
  | 'budget' 
  | 'finished_render' 
  | 'new_estimator'
  | 'stakeholder_hub'
  | 'stakeholder_owner'
  | 'stakeholder_director'
  | 'stakeholder_contractor'
  | 'stakeholder_qaqc';

export type UserRole = 'Owner / Client' | 'Senior Project Director' | 'General Contractor' | 'Structural QA/QC Auditor';

export interface LandSpecifications {
  plotAreaSqm: number;
  topography: 'Flat / Level Ground' | 'Sloped / Terraced' | 'Rocky Hillside' | 'Coastal / High Water Table';
  soilType: 'Standard Sandy Clay' | 'Dense Gravel / Rock' | 'Soft Clay / Silt' | 'Expansive Clay';
  zoningClassification: 'R-1 Low Density Residential' | 'R-3 Multi-Family Luxury' | 'Commercial Mixed-Use' | 'Light Industrial';
  setbackMeters: { front: number; rear: number; left: number; right: number };
  location: string;
}

export interface FloorPlanSpecifications {
  grossFloorAreaSqm: number;
  floors: number;
  buildingStyle: 'Contemporary Minimalist' | 'Industrial Modern Luxury' | 'Mediterranean Coastal' | 'Scandinavian Mass Timber' | 'Biophilic Sustainable';
  ceilingHeightMeters: number;
  bedroomCount: number;
  bathroomCount: number;
  hasBasement: boolean;
  hasSwimmingPool: boolean;
  hasRooftopDeck: boolean;
}

export interface MaterialSpecifications {
  structuralCore: 'Reinforced Concrete (RC Frame)' | 'Structural Steel & Composite Deck' | 'Mass Timber (CLT / Glulam)' | 'Reinforced Masonry & Precast' | 'Hybrid Steel-Concrete Core';
  foundationType: 'Raft / Mat Slab Foundation' | 'Deep Bored Piling & Grade Beams' | 'Continuous Strip Footing' | 'Reinforced Pad Footings & Tie Beams';
  facadeType: 'Unitized Glass Curtain Wall & Terracotta' | 'Natural Limestone & Architectural Concrete' | 'High-Performance EIFS & Timber Cladding' | 'Double-Skin Ventilated Facade';
  roofType: 'Standing Seam Zinc / Aluminum' | 'Intensive Green Living Roof' | 'Insulated Concrete Flat Deck with Solar PV' | 'Spanish Clay Tile on Trusses';
  mepTier: 'Standard Residential / Commercial Grade' | 'High-Efficiency VRF HVAC + Smart Building Controls' | 'Net-Zero Carbon (Geothermal/Solar PV + Smart Microgrid)';
  interiorGrade: 'Standard Commercial Finish' | 'Premium Contemporary Finish' | 'Ultra-Luxury Bespoke (Marble, Millwork, Smart Automation)' | 'Minimalist High-Spec Architectural';
}

export interface BOQItem {
  id: string;
  category: 'Substructure' | 'Superstructure' | 'Envelope & Facade' | 'Roofing' | 'MEP & HVAC' | 'Interior Finishes' | 'Site Works' | 'Prelims & Overheads';
  description: string;
  unit: string;
  quantity: number;
  unitRateUSD: number;
  totalCostUSD: number;
  spentUSD: number;
  variancePercentage: number;
  status: 'On Target' | 'Minor Overrun' | 'Favorable' | 'Critical Variance';
}

export interface ConstructionMilestone {
  id: string;
  name: string;
  phaseOrder: number;
  plannedStartDate: string;
  plannedEndDate: string;
  actualEndDate?: string;
  status: 'Completed' | 'In Progress' | 'Upcoming' | 'Delayed';
  progressPercentage: number;
  costAllocationUSD: number;
  payoutApproved: boolean;
  escrowStatus: 'Released' | 'Pending Sign-Off' | 'On Hold' | 'Not Reached';
  certificationsRequired: string[];
  certificationsCleared: boolean;
  contractorClaimUSD: number;
}

export interface SitePhotoInspection {
  id: string;
  timestamp: string;
  phaseId: string;
  phaseName: string;
  zone: string;
  imageUrl: string;
  caption: string;
  inspectedBy: string;
  aiAnalysis?: {
    overallHealth: 'Optimal' | 'Caution - Minor Deviations' | 'Critical - Immediate Action Required';
    completionEstimatePercent: number;
    detectedElements: string[];
    complianceScore: number;
    defectFindings: Array<{
      severity: 'Low' | 'Medium' | 'High';
      title: string;
      description: string;
      recommendation: string;
    }>;
    safetyObservations: string[];
    executiveSummary: string;
    varianceAlert?: {
      hasAlert: boolean;
      varianceType: string;
      varianceNote: string;
    };
  };
}

export interface PeriodicLogEntry {
  id: string;
  date: string;
  cadence: MonitoringCadence;
  weather: 'Clear & Sunny (26°C)' | 'Overcast (19°C)' | 'Heavy Rain (14°C - Concrete Halted)' | 'Windy (18°C)';
  manpowerHeadcount: number;
  activeTrades: string[];
  tasksAccomplished: string[];
  materialsReceived: string[];
  safetyIncidentsCount: number;
  dailySpendUSD: number;
  author: string;
  notes: string;
}

export interface SituationReport {
  id: string;
  reportDate: string;
  cadence: MonitoringCadence;
  executiveHeadline: string;
  ownerConfidenceScore: number; // 0-100
  earnedValueAnalysis: {
    cpi: number; // Cost Performance Index
    spi: number; // Schedule Performance Index
    costVarianceAmount: number;
    scheduleVarianceDays: number;
    forecastAtCompletionStatus: string;
  };
  keyAccomplishments: string[];
  upcomingMilestones: string[];
  budgetVarianceAlerts: Array<{
    trade: string;
    status: string;
    detail: string;
    actionTaken: string;
  }>;
  ownerActionItems: string[];
  preparedBy: string;
}

export interface ConstructionProject {
  id: string;
  name: string;
  clientName: string;
  contractorName: string;
  location: string;
  startDate: string;
  targetHandoverDate: string;
  currentPhaseIndex: number;
  overallProgressPercentage: number;
  totalBaselineBudgetUSD: number;
  actualCostIncurredUSD: number;
  forecastAtCompletionUSD: number;
  confidenceScore: number;
  
  landSpecs: LandSpecifications;
  floorPlanSpecs: FloorPlanSpecifications;
  materialSpecs: MaterialSpecifications;
  
  finishedBuildingRenderUrl: string;
  finishedBuildingRenderAltViews: string[];
  proposedBuildingRenderUrl?: string;
  proposedBuildingRenderAltViews?: string[];
  proposedBuilding360Views?: Array<{ angle: number; label: string; url: string }>;
  finishedBuilding360Views?: Array<{ angle: number; label: string; url: string }>;
  panoramic360Tours?: Array<{
    id: string;
    name: string;
    type: 'exterior' | 'interior' | 'rooftop' | 'structural';
    equirectangularUrl: string;
    description: string;
  }>;
  architecturalPrompt: string;
  
  milestones: ConstructionMilestone[];
  boq: BOQItem[];
  sitePhotos: SitePhotoInspection[];
  periodicLogs: PeriodicLogEntry[];
  situationReports: SituationReport[];
  
  curveData: Array<{
    month: string;
    plannedBudget: number;
    actualSpend: number;
    earnedValue: number;
    targetProgress: number;
    actualProgress: number;
  }>;
}
