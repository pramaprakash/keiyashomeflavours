"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    setTimeout(() => {
      if (
        (username.trim().toLowerCase() === "admin" || username.trim().toLowerCase() === "keiya") &&
        (password === "admin123" || password === "keiya2026")
      ) {
        if (typeof window !== "undefined") {
          localStorage.setItem("khf_admin_auth", "true");
          localStorage.setItem("khf_admin_user", username.trim());
        }
        router.push("/admin");
      } else {
        setError("Invalid credentials. Try: admin / admin123");
        setIsLoading(false);
      }
    }, 600);
  };

  return (
    <>
      <Navbar showSearch={false} />

      <main className="w-full min-h-screen pt-36 pb-20 px-4 md:px-6 flex items-center justify-center bg-gradient-to-b from-surface-container-low/60 via-background to-background relative overflow-hidden">
        {/* Decorative background glow accents */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10"></div>

        {/* Responsive Container Box with fixed minimum width so child text never squishes */}
        <div className="w-full sm:w-[480px] bg-surface-container-lowest p-8 sm:p-10 rounded-3xl border border-outline-variant/40 shadow-[0_20px_60px_rgba(22,52,34,0.08)] relative z-10 mx-auto">
          {/* Top Badge & Icon */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-primary text-on-primary flex items-center justify-center mb-4 shadow-lg shadow-primary/20 flex-shrink-0">
              <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                shield_person
              </span>
            </div>
            <span className="inline-block px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-[10px] font-black uppercase tracking-widest mb-2">
              Keiya&apos;s Home Flavours
            </span>
            <h2 className="font-headline-lg text-2xl md:text-3xl font-black text-primary tracking-tight">
              Admin Portal
            </h2>
            <p className="font-body-sm text-xs text-on-surface-variant mt-2 leading-relaxed">
              Sign in with your administrative credentials to manage video uploads &amp; AI analysis.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-3.5 rounded-xl bg-error-container text-on-error-container text-xs font-bold flex items-center gap-2 animate-fade-in border border-error/20">
              <span className="material-symbols-outlined text-lg flex-shrink-0">warning</span>
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5 w-full">
            <div className="w-full">
              <label htmlFor="username" className="block text-[11px] font-bold uppercase tracking-wider text-outline mb-1.5">
                Admin Username
              </label>
              <div className="relative w-full">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-lg pointer-events-none z-10">
                  account_circle
                </span>
                <input
                  id="username"
                  type="text"
                  required
                  placeholder="admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-outline-variant/60 bg-surface-container-low focus:bg-surface-container-lowest focus:outline-none focus:border-primary text-sm font-medium text-primary transition-all placeholder:text-outline/60"
                />
              </div>
            </div>

            <div className="w-full">
              <label htmlFor="password" className="block text-[11px] font-bold uppercase tracking-wider text-outline mb-1.5">
                Passcode
              </label>
              <div className="relative w-full">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-lg pointer-events-none z-10">
                  lock
                </span>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3.5 rounded-xl border border-outline-variant/60 bg-surface-container-low focus:bg-surface-container-lowest focus:outline-none focus:border-primary text-sm font-medium text-primary transition-all placeholder:text-outline/60"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors cursor-pointer z-10"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <span className="material-symbols-outlined text-lg">
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-on-primary py-3.5 rounded-xl font-bold text-sm shadow-md hover:shadow-lg hover:opacity-95 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-4 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-lg">autorenew</span>
                  Authenticating...
                </>
              ) : (
                <>
                  <span>Login to Admin Dashboard</span>
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Helper */}
          <div className="mt-8 pt-6 border-t border-outline-variant/20 text-center w-full">
            <p className="text-[11px] text-outline font-medium">
              Default Credentials: <span className="font-bold text-primary px-1.5 py-0.5 rounded bg-primary/10">admin</span> / <span className="font-bold text-primary px-1.5 py-0.5 rounded bg-primary/10">admin123</span>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
