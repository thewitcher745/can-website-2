import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useRouter } from "next/router";
import { buildApiUrl } from "@src/config";
import { verifyAdminToken } from "@src/domains/admin/api";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const logout = useCallback(() => {
    localStorage.removeItem("admin_token");
    setIsAuthenticated(false);
    if (
      router.pathname.startsWith("/admin") &&
      router.pathname !== "/admin/login"
    ) {
      router.replace("/admin/login");
    }
  }, [router]);

  const checkAuth = useCallback(async () => {
    try {
      const isValid = await verifyAdminToken();
      if (!isValid) {
        logout();
      } else {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      logout();
    } finally {
      setLoading(false);
    }
  }, [logout]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = (token: string) => {
    localStorage.setItem("admin_token", token);
    setIsAuthenticated(true);
    router.push("/admin/dashboard");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
