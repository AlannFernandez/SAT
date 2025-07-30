"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    setTimeout(() => {
      if (email === "test@demo.com" && password === "123456") {
        router.push("/");
      } else {
        setError("Email o contraseña incorrectos (usa test@demo.com / 123456)");
        setLoading(false);
      }
    }, 900);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold text-blue-900 text-center mb-2">Iniciar sesión</h1>
        <div>
          <label className="block text-sm font-medium text-blue-800 mb-1">Email</label>
          <input type="email" autoComplete="username" required className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-blue-800 mb-1">Contraseña</label>
          <input type="password" autoComplete="current-password" required className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        {error && <div className="text-red-600 text-sm text-center">{error}</div>}
        <button type="submit" disabled={loading} className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 rounded transition disabled:opacity-60">
          {loading ? "Ingresando..." : "Ingresar"}
        </button>
        <div className="text-center text-sm mt-2">
          ¿No tenés cuenta? <a href="/register" className="text-blue-700 hover:underline">Registrate</a>
        </div>
      </form>
    </div>
  );
}
