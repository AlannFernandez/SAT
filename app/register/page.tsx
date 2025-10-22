"use client";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/lib/services/auth-service";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!name || !email || !password || !repeatPassword) {
      setError("Completá todos los campos");
      return;
    }
    if (password !== repeatPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }
    setLoading(true);
    try {
      const { error } = await registerUser(name, email, password);
      if (error) {
        if (error.code === "23505" || error.message.includes("duplicate")) {
          setError("El email ya está registrado");
        } else {
          setError("Error al registrar. Intenta de nuevo.");
        }
        setLoading(false);
        return;
      }
      router.push("/");
    } catch (err) {
      setError("Error de conexión. Intenta más tarde.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-[#73BD4D] via-[#8BC962] to-[#fff] px-4 overflow-hidden">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <svg width="100%" height="100%" viewBox="0 0 600 600" className="absolute top-0 left-0 opacity-20">
          <circle cx="500" cy="100" r="80" fill="#73BD4D" />
          <circle cx="100" cy="500" r="60" fill="#000" />
          <ellipse cx="300" cy="300" rx="180" ry="80" fill="#8BC962" />
        </svg>
      </div>
      <div className="w-full max-w-md z-10">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-black/10">
          <div className="px-8 pt-8 pb-4 border-b border-black/10">
            <h1 className="text-3xl font-extrabold text-black text-center mb-2 tracking-tight">Crear cuenta</h1>
            <p className="text-center text-slate-600 text-sm mb-2">Registrate para acceder a SAT</p>
          </div>
          <form onSubmit={handleSubmit} className="px-8 py-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-black mb-1">Nombre</label>
              <input type="text" required className="w-full border border-black/20 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#73BD4D] bg-slate-50" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-1">Email</label>
              <input type="email" autoComplete="username" required className="w-full border border-black/20 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#73BD4D] bg-slate-50" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-1">Contraseña</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  className="w-full border border-black/20 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#73BD4D] bg-slate-50 pr-10"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[#73BD4D] p-1 rounded hover:bg-[#73BD4D]/10"
                  onClick={() => setShowPassword((v) => !v)}
                  tabIndex={-1}
                  aria-label={showPassword ? "Ocultar contraseña" : "Ver contraseña"}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-1">Repetir contraseña</label>
              <div className="relative">
                <input
                  type={showRepeatPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  className="w-full border border-black/20 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#73BD4D] bg-slate-50 pr-10"
                  value={repeatPassword}
                  onChange={e => setRepeatPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[#73BD4D] p-1 rounded hover:bg-[#73BD4D]/10"
                  onClick={() => setShowRepeatPassword((v) => !v)}
                  tabIndex={-1}
                  aria-label={showRepeatPassword ? "Ocultar contraseña" : "Ver contraseña"}
                >
                  {showRepeatPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            {error && <div className="text-red-600 text-sm text-center">{error}</div>}
            <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-[#73BD4D] to-[#5BA83A] text-white font-semibold py-2 rounded-lg transition disabled:opacity-60 shadow-lg border border-black/20">
              {loading ? "Creando cuenta..." : "Crear cuenta"}
            </button>
            <div className="text-center text-sm mt-2">
              ¿Ya tenés cuenta? <a href="/login" className="text-black hover:underline">Iniciar sesión</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
