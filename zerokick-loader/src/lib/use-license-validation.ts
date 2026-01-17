/**
 * License Validation Hook
 *
 * Validates user licenses with HWID
 */

import { useEffect, useState } from "react";
import { apiClient } from "./api-client";
import { getHWID } from "./tauri-commands";
import { useAuthStore } from "./store";

interface ValidationResult {
  isValid: boolean;
  isLoading: boolean;
  error: string | null;
  hwid: string | null;
}

export function useLicenseValidation(): ValidationResult {
  const { licenses } = useAuthStore();
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hwid, setHwid] = useState<string | null>(null);

  useEffect(() => {
    validateLicenses();

    // Re-validate every 5 minutes
    const interval = setInterval(validateLicenses, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [licenses]);

  const validateLicenses = async () => {
    try {
      // Get HWID from Tauri
      const currentHwid = await getHWID();
      setHwid(currentHwid);

      // If no licenses, mark as invalid
      if (licenses.length === 0) {
        setIsValid(false);
        setError("Nenhuma licença ativa");
        setIsLoading(false);
        return;
      }

      // Verify license with backend
      const response = await apiClient.verifyLicense(currentHwid);

      if (response.valid) {
        setIsValid(true);
        setError(null);
      } else {
        setIsValid(false);
        setError(response.message || "Licença inválida");
      }
    } catch (err: any) {
      console.error("License validation error:", err);
      setIsValid(false);
      setError(err.message || "Erro ao validar licença");
    } finally {
      setIsLoading(false);
    }
  };

  return { isValid, isLoading, error, hwid };
}
