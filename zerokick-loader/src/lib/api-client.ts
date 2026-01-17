/**
 * API Client Service
 *
 * Handles all HTTP communication with the ZeroKick backend
 */

// Force empty string to use relative path and trigger Vite proxy
// Empty string allows proxy to handle /api requests (avoiding CORS)
const API_BASE_URL = "";
// const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"; (avoiding CORS)
// const API_BASE_URL = "";
// const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

interface ApiError {
  message: string;
  status: number;
}

class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.loadToken();
  }

  /**
   * Load token from localStorage
   */
  private loadToken() {
    this.token = localStorage.getItem("auth_token");
  }

  /**
   * Save token to localStorage
   */
  private saveToken(token: string) {
    this.token = token;
    localStorage.setItem("auth_token", token);
  }

  /**
   * Remove token from localStorage
   */
  clearToken() {
    this.token = null;
    localStorage.removeItem("auth_token");
  }

  /**
   * Get current token
   */
  getToken(): string | null {
    return this.token;
  }

  /**
   * Make HTTP request with automatic token injection
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string>),
    };

    // Add Authorization header if token exists
    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }

    try {
      console.log(`[API] 🚀 Request to: ${url}`, {
        method: options.method,
        headers,
      });

      const response = await fetch(url, {
        ...options,
        headers,
      });

      console.log(
        `[API] 📡 Response status: ${response.status} ${response.statusText}`,
      );

      // Handle non-OK responses
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error(`[API] ❌ Response error data:`, errorData);

        const error: ApiError = {
          message: errorData.message || response.statusText,
          status: response.status,
        };
        throw error;
      }

      // Parse JSON response
      const data = await response.json();
      console.log(`[API] ✅ Success data:`, data);
      return data;
    } catch (error) {
      console.error(`[API] 🔥 Fetch error raw:`, error);

      // Re-throw ApiError
      if ((error as ApiError).status) {
        throw error;
      }

      // Network or other errors
      const networkError = {
        message: "Network error. Please check your connection.",
        status: 0,
        originalError: error,
      };

      console.error(`[API] ☠️ Network error object:`, networkError);
      throw networkError as ApiError;
    }
  }

  /**
   * GET request
   */
  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "GET" });
  }

  /**
   * POST request
   */
  async post<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * PUT request
   */
  async put<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * DELETE request
   */
  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "DELETE" });
  }

  // ==================== AUTH ENDPOINTS ====================

  /**
   * Login with email and password
   */
  async login(
    email: string,
    password: string,
  ): Promise<{ token: string; user: User }> {
    const response = await this.post<{ token: string; user: User }>(
      "/api/auth/login",
      {
        email,
        password,
      },
    );

    // Save token
    this.saveToken(response.token);

    return response;
  }

  /**
   * Verify current token
   */
  async verifyToken(): Promise<{ valid: boolean; user?: User }> {
    try {
      return await this.get<{ valid: boolean; user?: User }>(
        "/api/auth/verify",
      );
    } catch (error) {
      // Token invalid or expired
      this.clearToken();
      return { valid: false };
    }
  }

  /**
   * Logout (clear token)
   */
  logout() {
    this.clearToken();
  }

  // ==================== LICENSE ENDPOINTS ====================

  /**
   * Get user's licenses
   */
  async getMyLicenses(): Promise<LicensesResponse> {
    return this.get<LicensesResponse>("/api/licenses/me");
  }

  /**
   * Verify license with HWID
   */
  async verifyLicense(hwid: string): Promise<LicenseVerification> {
    return this.post<LicenseVerification>("/api/licenses/verify", { hwid });
  }

  // ==================== SCRIPTS ENDPOINTS ====================

  /**
   * Get available scripts for user
   */
  async getMyScripts(): Promise<Script[]> {
    return this.get<Script[]>("/api/scripts/my-scripts");
  }

  /**
   * Download script
   */
  async downloadScript(scriptId: number): Promise<{ downloadUrl: string }> {
    return this.post<{ downloadUrl: string }>(
      `/api/scripts/${scriptId}/download`,
    );
  }
}

// ==================== TYPES ====================

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
}

export interface License {
  id: number;
  gameId: number;
  gameName: string;
  gameSlug: string;
  subscriptionTier: string;
  deviceType: "logitech" | "razer" | "universal";
  expiresAt: string | null;
  active: boolean;
  hwid: string | null;
}

export interface LicensesResponse {
  userId: string;
  licenses: License[];
}

export interface LicenseVerification {
  valid: boolean;
  license?: License;
  message?: string;
}

export interface Script {
  id: number;
  gameId: number;
  gameSlug: string;
  gameName: string;
  weaponName: string;
  description: string;
  version: string;
  fileUrl: string;
  deviceType: "logitech" | "razer" | "both";
}

// Export singleton instance
export const apiClient = new ApiClient(API_BASE_URL);
export type { ApiError };
