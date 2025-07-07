// Global type definitions for SyraRobot Academy

// Package type declarations
declare module 'lucide-react' {
  import { FC, SVGProps } from 'react';
  
  interface IconProps extends SVGProps<SVGSVGElement> {
    size?: number | string;
    strokeWidth?: number | string;
    color?: string;
    className?: string;
  }
  
  export const AlertTriangle: FC<IconProps>;
  export const RefreshCw: FC<IconProps>;
  export const Home: FC<IconProps>;
  export const Bug: FC<IconProps>;
  export const ChevronDown: FC<IconProps>;
  export const ChevronUp: FC<IconProps>;
  export const CheckCircle: FC<IconProps>;
  export const XCircle: FC<IconProps>;
  export const AlertCircle: FC<IconProps>;
  export const Info: FC<IconProps>;
  export const X: FC<IconProps>;
  export const Eye: FC<IconProps>;
  export const EyeOff: FC<IconProps>;
  export const Loader2: FC<IconProps>;
  export const User: FC<IconProps>;
  export const Mail: FC<IconProps>;
  export const Lock: FC<IconProps>;
  export const Calendar: FC<IconProps>;
  export const MapPin: FC<IconProps>;
  export const Phone: FC<IconProps>;
  export const Search: FC<IconProps>;
  export const Filter: FC<IconProps>;
  export const Plus: FC<IconProps>;
  export const Edit: FC<IconProps>;
  export const Trash: FC<IconProps>;
  export const Settings: FC<IconProps>;
  export const LogOut: FC<IconProps>;
  export const Bell: FC<IconProps>;
  export const Star: FC<IconProps>;
  export const Heart: FC<IconProps>;
  export const Share: FC<IconProps>;
  export const Download: FC<IconProps>;
  export const Upload: FC<IconProps>;
  export const Save: FC<IconProps>;
  export const Copy: FC<IconProps>;
  export const Check: FC<IconProps>;
  export const ArrowLeft: FC<IconProps>;
  export const ArrowRight: FC<IconProps>;
  export const ArrowUp: FC<IconProps>;
  export const ArrowDown: FC<IconProps>;
  export const ExternalLink: FC<IconProps>;
  export const Menu: FC<IconProps>;
  export const MoreHorizontal: FC<IconProps>;
  export const MoreVertical: FC<IconProps>;
}

declare module 'clsx' {
  export type ClassValue = 
    | ClassArray
    | ClassDictionary
    | string
    | number
    | null
    | boolean
    | undefined;
  
  export type ClassDictionary = Record<string, any>;
  export type ClassArray = ClassValue[];
  
  export function clsx(...inputs: ClassValue[]): string;
  export default clsx;
}

declare module 'tailwind-merge' {
  export function twMerge(...inputs: (string | undefined)[]): string;
  export default twMerge;
}

// React Hook Form enhanced types
declare module 'react-hook-form' {
  export interface FieldError {
    type?: string;
    message?: string;
    ref?: React.Ref<any>;
  }
  
  export interface FieldErrors<TFieldValues = Record<string, any>> {
    [key: string]: FieldError | FieldErrors<TFieldValues> | undefined;
  }
}

// User types
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  isActive: boolean;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type UserRole = 
  | 'student'
  | 'parent'
  | 'coach'
  | 'school_admin'
  | 'regional_judge'
  | 'super_admin';

// School types
export interface School {
  id: string;
  name: string;
  slug: string;
  description?: string;
  logo?: string;
  address: Address;
  contactEmail: string;
  website?: string;
  isVerified: boolean;
  memberCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

// Competition types
export interface Competition {
  id: string;
  name: string;
  description: string;
  type: CompetitionType;
  level: CompetitionLevel;
  status: CompetitionStatus;
  registrationDeadline: Date;
  startDate: Date;
  endDate: Date;
  maxTeams?: number;
  currentTeams: number;
  prizes?: Prize[];
  rules: string;
  organizerId: string;
  schoolId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CompetitionType = 
  | 'knockout'
  | 'leaderboard'
  | 'timed_challenge';

export type CompetitionLevel = 
  | 'elementary'
  | 'middle_school'
  | 'high_school'
  | 'open';

export type CompetitionStatus = 
  | 'draft'
  | 'registration_open'
  | 'registration_closed'
  | 'in_progress'
  | 'completed'
  | 'cancelled';

export interface Prize {
  position: number;
  title: string;
  description?: string;
  value?: number;
}

// Team types
export interface Team {
  id: string;
  name: string;
  schoolId: string;
  captainId: string;
  members: TeamMember[];
  competitionId?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface TeamMember {
  userId: string;
  role: 'captain' | 'member' | 'mentor';
  joinedAt: Date;
}

// Community types
export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  tags?: string[];
  likes: number;
  replies: number;
  isLocked: boolean;
  isPinned: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Reply {
  id: string;
  postId: string;
  content: string;
  authorId: string;
  parentId?: string; // for nested replies
  likes: number;
  createdAt: Date;
  updatedAt: Date;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
  };
}

// Form validation types
export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => string | undefined;
}

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'tel' | 'url' | 'number' | 'select' | 'textarea';
  placeholder?: string;
  helperText?: string;
  validation?: ValidationRule;
  options?: { value: string; label: string }[]; // for select fields
}

// Component prop types
export interface BaseComponentProps {
  className?: string;
  'data-testid'?: string;
}

// Enhanced error interfaces
export interface AppError extends Error {
  statusCode?: number;
  code?: string;
  context?: Record<string, any>;
  isOperational?: boolean;
}

// Toast notification interfaces
export interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface ToastOptions {
  title: string;
  description?: string;
  action?: ToastAction;
  duration?: number;
  variant?: 'success' | 'error' | 'warning' | 'info' | 'loading';
}

// Loading state interfaces
export interface LoadingState {
  isLoading: boolean;
  error?: string | null;
  progress?: number;
}

// Form state interfaces
export interface FormState<T = any> {
  data: T;
  errors: Record<string, string>;
  isSubmitting: boolean;
  isValid: boolean;
  isDirty: boolean;
}

// Event types for analytics
export interface AnalyticsEvent {
  event: string;
  properties?: Record<string, any>;
  userId?: string;
  timestamp?: Date;
}

// Permission types
export interface Permission {
  action: string;
  resource: string;
  conditions?: Record<string, any>;
}

export interface RolePermissions {
  role: UserRole;
  permissions: Permission[];
}

// Notification types
export interface Notification {
  id: string;
  userId: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  actionUrl?: string;
  isRead: boolean;
  createdAt: Date;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      NEXTAUTH_URL: string;
      NEXTAUTH_SECRET: string;
      MONGODB_URI: string;
      STRIPE_SECRET_KEY: string;
      STRIPE_WEBHOOK_SECRET: string;
      NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: string;
      GOOGLE_CLIENT_ID?: string;
      GOOGLE_CLIENT_SECRET?: string;
      GITHUB_CLIENT_ID?: string;
      GITHUB_CLIENT_SECRET?: string;
    }
  }
}

export {};