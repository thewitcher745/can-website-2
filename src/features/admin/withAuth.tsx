import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "./context/AuthContext";

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
) => {
  const AuthProtected: React.FC<P> = (props) => {
    const { isAuthenticated, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !isAuthenticated) {
        router.replace("/admin/login");
      }
    }, [isAuthenticated, loading, router]);

    if (loading || !isAuthenticated) {
      return (
        <div className="flex justify-center items-center min-h-screen bg-background text-text-main">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };

  return AuthProtected;
};

export default withAuth;
