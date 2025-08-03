import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-50 to-white">
      {/* Header */}
      <header className="w-full flex items-center justify-between px-6 py-4 bg-white/80 shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <Image src="/icon.png" alt="Logo SAT" width={48} height={48} unoptimized />
          <span className="font-bold text-xl text-purple-900 tracking-tight">SAT: Sistema de Alerta Temprana</span>
        </div>
        <Link href="/register" className="bg-[#883feb] hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition">Acceder</Link>
      </header>

      {/* Hero */}
      <section className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto px-6 py-16 gap-10">
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-5xl font-extrabold text-purple-900 mb-6 leading-tight">
            SAT: La app que faltaba en Seguridad e Higiene
            <span className="text-[#883feb] block mt-2 text-3xl">
              Relevamientos, informes y controles, incluso sin conexión
            </span>
          </h1>
          <p className="text-lg text-gray-700 mb-8 max-w-xl">
            Optimiza tu tiempo en cada visita. Realizá tus informes desde el móvil, firmalos en el momento y accedé a todo tu historial, estés donde estés.
          </p>
          <Link href="/register" className="inline-block bg-[#883feb] hover:bg-purple-700 text-white font-semibold py-4 px-10 rounded-lg shadow-lg text-lg transition">Crear cuenta ahora</Link>
        </div>
      </section>

      {/* Beneficios */}
      <section className="bg-purple-100/40 py-12">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-purple-900 mb-8 text-center">Beneficios para Técnicos</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <svg className="w-10 h-10 text-[#883feb] mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M1 12h22M12 1v22" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <h3 className="font-semibold text-purple-800 mb-2">Funciona sin conexión</h3>
              <p className="text-gray-600 text-sm text-center">Completá recorridas y reportes sin necesidad de internet. Todo se sincroniza automáticamente al reconectarte.</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <svg className="w-10 h-10 text-[#883feb] mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 8v4l3 3" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <h3 className="font-semibold text-purple-800 mb-2">Ahorro de tiempo</h3>
              <p className="text-gray-600 text-sm text-center">Digitalizá recorridas y reportes, evitando papeles y planillas manuales.</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <svg className="w-10 h-10 text-[#883feb] mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <h3 className="font-semibold text-purple-800 mb-2">Informes firmados</h3>
              <p className="text-gray-600 text-sm text-center">Generá informes digitales con firma, listos para entregar o enviar desde el dispositivo.</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <svg className="w-10 h-10 text-[#883feb] mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M12 4v16m0 0H3" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <h3 className="font-semibold text-purple-800 mb-2">Historial y seguimiento</h3>
              <p className="text-gray-600 text-sm text-center">Todo tu historial de visitas, controles y firmas accesible desde tu cuenta.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Características */}
      <section className="py-16 max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-purple-900 mb-10 text-center">Características destacadas</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center bg-white rounded-lg shadow p-6">
            <span className="font-semibold text-purple-800 mb-3 text-lg">RGRL</span>
            <p className="text-gray-600 text-sm text-center">Relevamiento General de Riesgos Laborales digital y ágil.</p>
          </div>
          <div className="flex flex-col items-center bg-white rounded-lg shadow p-6">
            <span className="font-semibold text-purple-800 mb-3 text-lg">Control de extintores</span>
            <p className="text-gray-600 text-sm text-center">Registra y controla el estado de extintores en cada visita.</p>
          </div>
          <div className="flex flex-col items-center bg-white rounded-lg shadow p-6">
            <span className="font-semibold text-purple-800 mb-3 text-lg">Firmas desde la app</span>
            <p className="text-gray-600 text-sm text-center">Firma digital desde el móvil en segundos, sin impresiones.</p>
          </div>
          <div className="flex flex-col items-center bg-white rounded-lg shadow p-6">
            <span className="font-semibold text-purple-800 mb-3 text-lg">Visitas de revisión</span>
            <p className="text-gray-600 text-sm text-center">Planificá y registrá tus recorridas y controles periódicos.</p>
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="bg-purple-50 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-purple-900 mb-10 text-center">Testimonios</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow p-6 flex flex-col">
              <p className="text-gray-700 italic mb-4">“SAT me permite hacer recorridas mucho más rápido SIN CONEXION A INTERNET y entregar informes firmados en el momento. ¡Un antes y un después para mi trabajo!”</p>
              <div className="flex items-center gap-3 mt-auto">
                <span className="font-semibold text-purple-800">María G., Técnica S&H</span>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6 flex flex-col">
              <p className="text-gray-700 italic mb-4">“Con SAT tengo todo el historial de visitas y controles en un solo lugar. Es muy fácil de usar y me da tranquilidad.”</p>
              <div className="flex items-center gap-3 mt-auto">
                <span className="font-semibold text-purple-800">Lucas P., Técnico S&H</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-purple-900 mb-10 text-center">Preguntas frecuentes</h2>
        <div className="space-y-6">
          <details className="bg-white rounded-lg shadow p-4 group">
            <summary className="font-semibold text-purple-800 cursor-pointer group-open:text-purple-900 flex items-center justify-between gap-2 px-2 py-3 focus:outline-none min-h-[56px]">
              ¿Funciona sin conexión a internet?
              <span className="transition-transform duration-300 group-open:rotate-90">
                <svg className="w-5 h-5 text-[#883feb]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </summary>
            <div className="relative min-h-[100px]">
              <div className="absolute left-0 right-0 top-0 group-open:opacity-100 opacity-0 transition-opacity duration-300 pointer-events-none">
                <p className="text-gray-600 mt-2">Sí. Podés usar SAT sin estar conectado. Toda la información que cargues se sincroniza automáticamente cuando vuelvas a tener acceso a internet.</p>
              </div>
            </div>
          </details>
          <details className="bg-white rounded-lg shadow p-4 group">
            <summary className="font-semibold text-purple-800 cursor-pointer group-open:text-purple-900 flex items-center justify-between gap-2 px-2 py-3 focus:outline-none min-h-[56px]">
              ¿Puedo firmar informes desde el celular?
              <span className="transition-transform duration-300 group-open:rotate-90">
                <svg className="w-5 h-5 text-[#883feb]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </summary>
            <div className="relative min-h-[56px]">
              <div className="absolute left-0 right-0 top-0 group-open:opacity-100 opacity-0 transition-opacity duration-300 pointer-events-none">
                <p className="text-gray-600 mt-2">Sí, la app permite firmar informes digitalmente desde cualquier dispositivo móvil.</p>
              </div>
            </div>
          </details>
          <details className="bg-white rounded-lg shadow p-4 group">
            <summary className="font-semibold text-purple-800 cursor-pointer group-open:text-purple-900 flex items-center justify-between gap-2 px-2 py-3 focus:outline-none min-h-[56px]">
              ¿Cómo accedo a mis reportes anteriores?
              <span className="transition-transform duration-300 group-open:rotate-90">
                <svg className="w-5 h-5 text-[#883feb]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </summary>
            <div className="relative min-h-[56px]">
              <div className="absolute left-0 right-0 top-0 group-open:opacity-100 opacity-0 transition-opacity duration-300 pointer-events-none">
                <p className="text-gray-600 mt-2">Todos los reportes y visitas quedan guardados y accesibles desde tu cuenta en SAT.</p>
              </div>
            </div>
          </details>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-[#883feb] text-white py-8 mt-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <span className="font-bold text-lg tracking-tight"></span>
          </div>
          <nav className="flex gap-6 text-sm">
            <Link href="/register" className="px-4 py-2 rounded-lg bg-white/90 text-[#883feb] font-semibold shadow hover:bg-white hover:text-[#b47cff] transition border border-[#883feb]">Registrarse</Link>
            <Link href="/login" className="px-4 py-2 rounded-lg bg-[#883feb] text-white font-semibold shadow hover:bg-[#b47cff] transition border border-white">Login</Link>
          </nav>
          <div className="flex gap-4">
            <a href="#" aria-label="LinkedIn" className="hover:text-purple-300">
              {/* LinkedIn Icon */}
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-purple-300">
              {/* Twitter Icon */}
            </a>
          </div>
        </div>
        <div className="text-center text-xs text-purple-200 mt-6">
          &copy; {new Date().getFullYear()} SAT. Todos los derechos reservados. <br />
          Propiedad de <a href="https://www.soft3ch.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-purple-300">soft3ch.com</a>
        </div>
      </footer>
    </div>
  );
}
