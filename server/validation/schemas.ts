import { z } from 'zod';

// Part A: Safe User Profile Update Schema (Protects security-sensitive fields from mass assignment)
export const updateProfileSchema = z.object({
  firstName: z.string().min(1).max(100).optional(),
  lastName: z.string().min(1).max(100).optional(),
  phone: z.string().max(50).optional(),
  profileSummary: z.string().max(1000).optional(),
  bio: z.string().max(1000).optional(),
  roleDetails: z.object({
    yearsExperience: z.number().min(0).max(100).optional(),
    primaryDiscipline: z.string().max(150).optional(),
    professionalBody: z.string().max(150).optional(),
    registrationNumber: z.string().max(100).optional(),
    companyName: z.string().max(150).optional(),
    yearsOperating: z.number().min(0).max(200).optional(),
    specialties: z.array(z.string()).optional(),
    entityType: z.enum(['Individual', 'Organization']).optional(),
    country: z.string().max(100).optional(),
    city: z.string().max(100).optional(),
    intendedUse: z.string().max(100).optional(),
  }).optional(),
  contactInformation: z.record(z.string(), z.any()).optional(),
}).strict(); // Strictly reject any unknown keys (e.g. primaryRole, authUserId, verificationStatus)

// Part B: Organization Creation Schema
export const createOrganizationSchema = z.object({
  name: z.string().min(2, 'Organization name must be at least 2 characters').max(120),
  type: z.enum([
    'INDIVIDUAL_DEVELOPER',
    'REAL_ESTATE_DEVELOPER',
    'CORPORATE',
    'INSTITUTIONAL',
    'PUBLIC_SECTOR',
    'OTHER'
  ]),
  jurisdiction: z.string().min(2, 'Jurisdiction is required').max(100),
  country: z.string().min(2, 'Country is required').max(100),
  registrationNumber: z.string().max(100).optional(),
  address: z.string().max(250).optional(),
});

// Part C: Project Creation Under Organization Schema
export const createProjectSchema = z.object({
  name: z.string().min(2, 'Project name is required').max(150),
  location: z.string().min(2, 'Location is required').max(200),
  projectType: z.string().max(100).optional().default('Commercial Mixed-Use'),
  description: z.string().max(2000).optional().default(''),
  startDate: z.string().min(4, 'Start date is required'),
  targetHandoverDate: z.string().min(4, 'Target handover date is required'),
  totalBaselineBudgetUSD: z.number().min(0, 'Initial budget must be non-negative'),
  currency: z.string().max(10).optional().default('USD'),
  currentStage: z.string().max(100).optional().default('Planning & Feasibility'),
});

// Part D: Project Governance Invitation Schema
export const createInvitationSchema = z.object({
  professionalUserId: z.string().min(1, 'Professional user ID is required'),
  role: z.enum([
    'SENIOR_PROJECT_DIRECTOR',
    'GENERAL_CONTRACTOR',
    'STRUCTURAL_QA_QC_AUDITOR'
  ]),
  reason: z.string().max(500).optional(),
});
