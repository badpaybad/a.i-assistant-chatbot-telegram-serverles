/**
 * Centralized API configuration.
 * Uses Vite environment variables for cross-environment support.
 * For production, ensure VITE_API_URL is set in the build environment.
 */
export const API_CONFIG = {
  // BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  BASE_URL: "http://localhost:5000/api",
};
