"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/services/auth-service";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data, error } = await loginUser(email, password);
      if (error || !data) {
        setError("Email o contraseña incorrectos");
        setLoading(false);
        return;
      }
      // Guardar cookie de sesión
      document.cookie = `sat_session=${data.id}; path=/; max-age=${60 * 60 * 24 * 7}`;
      router.push("/");
    } catch (err) {
      setError("Error de conexión. Intenta más tarde.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-[#883feb] via-[#b47cff] to-[#fff] px-4 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-0">
        <svg width="100%" height="100%" viewBox="0 0 600 600" className="absolute top-0 left-0 opacity-20">
          <circle cx="500" cy="100" r="80" fill="#883feb" />
          <circle cx="100" cy="500" r="60" fill="#000" />
          <ellipse cx="300" cy="300" rx="180" ry="80" fill="#b47cff" />
        </svg>
      </div>
      <div className="w-full max-w-md z-10">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-black/10">
          <div className="px-8 pt-8 pb-4 border-b border-black/10">
            <h1 className="text-3xl font-extrabold text-black text-center mb-2 tracking-tight">Iniciar sesión</h1>
            <p className="text-center text-slate-600 text-sm mb-2">Accedé a SAT para gestionar tus recorridas e informes.</p>
          </div>
          <form onSubmit={handleSubmit} className="px-8 py-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-black mb-1">Email</label>
              <input type="email" autoComplete="username" required className="w-full border border-black/20 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#883feb] bg-slate-50" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-1">Contraseña</label>
              <input type="password" autoComplete="current-password" required className="w-full border border-black/20 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#883feb] bg-slate-50" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            {error && <div className="text-red-600 text-sm text-center">{error}</div>}
            <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-[#883feb] to-[#683feb] text-white font-semibold py-2 rounded-lg transition disabled:opacity-60 shadow-lg border border-black/20">
              {loading ? "Ingresando..." : "Ingresar"}
            </button>
            <div className="text-center text-sm mt-2">
              ¿No tenés cuenta? <a href="/register" className="text-black hover:underline">Registrate</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
