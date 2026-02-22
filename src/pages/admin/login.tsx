import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { buildApiUrl } from "@src/config";

const AdminLogin = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Go to the dashboard if a JWT exists
  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (token) {
      router.push("/admin/dashboard");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(buildApiUrl("/api/admin/login"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = (await res.json()) as unknown;

      if (!res.ok) {
        const message =
          typeof data === "object" && data !== null && "error" in data
            ? String((data as { error: unknown }).error)
            : "Login failed";
        setError(message);
        return;
      }

      if (
        typeof data !== "object" ||
        data === null ||
        !("token" in data) ||
        typeof (data as { token: unknown }).token !== "string"
      ) {
        setError("Login failed");
        return;
      }

      localStorage.setItem("admin_token", (data as { token: string }).token);
      await router.push("/admin/dashboard");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-background text-text-main font-sans">
      <div className="bg-surface p-10 rounded-xl shadow-xl w-full max-w-md border border-border">
        <h1 className="mt-0 mb-6 text-center text-2xl font-bold text-primary">
          Admin Login
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="username"
              className="block mb-2 text-sm text-text-muted"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 rounded-lg border border-border bg-background text-text-main focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm text-text-muted"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg border border-border bg-background text-text-main focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all"
              required
            />
          </div>
          {error && <p className="text-error text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full p-3 bg-primary hover:bg-primary-dark disabled:bg-text-muted text-black rounded-lg font-bold cursor-pointer disabled:cursor-not-allowed transition-colors"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
