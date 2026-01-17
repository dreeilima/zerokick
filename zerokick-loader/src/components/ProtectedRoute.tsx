/**
 * Protected Route Component
 *
 * Redirects to login if user is not authenticated
 */

import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../lib/store";
import { apiClient } from "../lib/api-client";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, setUser, setLoading } = useAuthStore();

  useEffect(() => {
    // Verify token on mount
    const verifyAuth = async () => {
      const token = apiClient.getToken();

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const { valid, user } = await apiClient.verifyToken();

        if (valid && user) {
          setUser(user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Auth verification failed:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    verifyAuth();
  }, [setUser, setLoading]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto" />
          <p className="text-muted-foreground">Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Render protected content
  return <>{children}</>;
}
