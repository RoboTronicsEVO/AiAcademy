import type { ValidationRule } from '@/types/global';

export function validateField(value: string, rules?: ValidationRule): string | undefined {
  if (!rules) return undefined;

  // Required validation
  if (rules.required && !value.trim()) {
    return 'This field is required';
  }

  // Skip other validations if field is empty and not required
  if (!value.trim() && !rules.required) {
    return undefined;
  }

  // Min length validation
  if (rules.minLength && value.length < rules.minLength) {
    return `Must be at least ${rules.minLength} characters`;
  }

  // Max length validation
  if (rules.maxLength && value.length > rules.maxLength) {
    return `Must be no more than ${rules.maxLength} characters`;
  }

  // Pattern validation
  if (rules.pattern && !rules.pattern.test(value)) {
    return 'Invalid format';
  }

  // Custom validation
  if (rules.custom) {
    return rules.custom(value);
  }

  return undefined;
}

// Common validation rules
export const validationRules = {
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    custom: (value: string) => {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (value && !emailPattern.test(value)) {
        return 'Please enter a valid email address';
      }
      return undefined;
    },
  } as ValidationRule,

  password: {
    required: true,
    minLength: 8,
    custom: (value: string) => {
      if (value.length < 8) {
        return 'Must be 8+ characters';
      }
      if (!/(?=.*[a-z])/.test(value)) {
        return 'Must contain at least one lowercase letter';
      }
      if (!/(?=.*[A-Z])/.test(value)) {
        return 'Must contain at least one uppercase letter';
      }
      if (!/(?=.*\d)/.test(value)) {
        return 'Must contain at least one number';
      }
      return undefined;
    },
  } as ValidationRule,

  name: {
    required: true,
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-Z\s'-]+$/,
    custom: (value: string) => {
      const namePattern = /^[a-zA-Z\s'-]+$/;
      if (value && !namePattern.test(value)) {
        return 'Name can only contain letters, spaces, hyphens, and apostrophes';
      }
      return undefined;
    },
  } as ValidationRule,

  phone: {
    pattern: /^\+?[\d\s-()]+$/,
    custom: (value: string) => {
      const phonePattern = /^\+?[\d\s-()]+$/;
      if (value && !phonePattern.test(value)) {
        return 'Please enter a valid phone number';
      }
      return undefined;
    },
  } as ValidationRule,
};