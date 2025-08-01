import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="w-full flex items-center justify-between px-6 py-4 bg-white/80 shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <Image src="/icon.png" alt="Logo SAT" width={48} height={48} className="rounded-full" />
          <span className="font-bold text-xl text-blue-900 tracking-tight">SAT: Sistema de Alerta Temprana</span>
        </div>
        <Link href="/register" className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-2 rounded-lg shadow transition">Acceder</Link>
      </header>

      {/* Hero */}
      <section className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto px-6 py-16 gap-10">
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-5xl font-extrabold text-blue-900 mb-6 leading-tight">
            SAT: La app que faltaba en Seguridad e Higiene
            <span className="text-blue-600 block mt-2 text-3xl">
              Relevamientos, informes y controles, incluso sin conexión
            </span>
          </h1>
          <p className="text-lg text-gray-700 mb-8 max-w-xl">
            Optimiza tu tiempo en cada visita. Realizá tus informes desde el móvil, firmalos en el momento y accedé a todo tu historial, estés donde estés.
          </p>
          <Link href="/register" className="inline-block bg-blue-700 hover:bg-blue-800 text-white font-semibold py-4 px-10 rounded-lg shadow-lg text-lg transition">Crear cuenta gratis</Link>
        </div>
        <div className="flex-1 flex justify-center">
          <Image src="/placeholder-logo.png" alt="App Demo" width={400} height={320} className="rounded-xl shadow-xl border border-blue-100 bg-white object-contain" />
        </div>
      </section>

      {/* Beneficios */}
      <section className="bg-blue-100/40 py-12">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">Beneficios para Técnicos</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <svg className="w-10 h-10 text-blue-700 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M1 12h22M12 1v22" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <h3 className="font-semibold text-blue-800 mb-2">Funciona sin conexión</h3>
              <p className="text-gray-600 text-sm text-center">Completá recorridas y reportes sin necesidad de internet. Todo se sincroniza automáticamente al reconectarte.</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <svg className="w-10 h-10 text-blue-700 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 8v4l3 3" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <h3 className="font-semibold text-blue-800 mb-2">Ahorro de tiempo</h3>
              <p className="text-gray-600 text-sm text-center">Digitalizá recorridas y reportes, evitando papeles y planillas manuales.</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <svg className="w-10 h-10 text-blue-700 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <h3 className="font-semibold text-blue-800 mb-2">Informes firmados</h3>
              <p className="text-gray-600 text-sm text-center">Generá informes digitales con firma, listos para entregar o enviar desde el dispositivo.</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <svg className="w-10 h-10 text-blue-700 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M12 4v16m0 0H3" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <h3 className="font-semibold text-blue-800 mb-2">Historial y seguimiento</h3>
              <p className="text-gray-600 text-sm text-center">Todo tu historial de visitas, controles y firmas accesible desde tu cuenta.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Características */}
      <section className="py-16 max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-blue-900 mb-10 text-center">Características destacadas</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center bg-white rounded-lg shadow p-6">
            <svg className="w-10 h-10 text-blue-700 mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M8 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span className="font-semibold text-blue-800 mb-1">RGRL</span>
            <p className="text-gray-600 text-sm text-center">Relevamiento General de Riesgos Laborales digital y ágil.</p>
          </div>
          <div className="flex flex-col items-center bg-white rounded-lg shadow p-6">
            <svg className="w-10 h-10 text-blue-700 mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 8h8v8H8z"/></svg>
            <span className="font-semibold text-blue-800 mb-1">Control de extintores</span>
            <p className="text-gray-600 text-sm text-center">Registra y controla el estado de extintores en cada visita.</p>
          </div>
          <div className="flex flex-col items-center bg-white rounded-lg shadow p-6">
            <svg className="w-10 h-10 text-blue-700 mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M16 17l-4 4m0 0l-4-4m4 4V3" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span className="font-semibold text-blue-800 mb-1">Firmas desde la app</span>
            <p className="text-gray-600 text-sm text-center">Firma digital desde el móvil en segundos, sin impresiones.</p>
          </div>
          <div className="flex flex-col items-center bg-white rounded-lg shadow p-6">
            <svg className="w-10 h-10 text-blue-700 mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 7h18M3 12h18M3 17h18" strokeLinecap="round"/></svg>
            <span className="font-semibold text-blue-800 mb-1">Visitas de revisión</span>
            <p className="text-gray-600 text-sm text-center">Planificá y registrá tus recorridas y controles periódicos.</p>
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="bg-blue-50 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-blue-900 mb-10 text-center">Testimonios</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow p-6 flex flex-col">
              <p className="text-gray-700 italic mb-4">“SAT me permite hacer recorridas mucho más rápido y entregar informes firmados en el momento. ¡Un antes y un después para mi trabajo!”</p>
              <div className="flex items-center gap-3 mt-auto">
                <Image src="/placeholder-user.jpg" alt="Testimonio 1" width={40} height={40} className="rounded-full" />
                <span className="font-semibold text-blue-800">María G., Técnica S&H</span>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6 flex flex-col">
              <p className="text-gray-700 italic mb-4">“Con SAT tengo todo el historial de visitas y controles en un solo lugar. Es muy fácil de usar y me da tranquilidad.”</p>
              <div className="flex items-center gap-3 mt-auto">
                <Image src="/placeholder-user.jpg" alt="Testimonio 2" width={40} height={40} className="rounded-full" />
                <span className="font-semibold text-blue-800">Lucas P., Técnico S&H</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-blue-900 mb-10 text-center">Preguntas frecuentes</h2>
        <div className="space-y-6">
          <details className="bg-white rounded-lg shadow p-4 group">
            <summary className="font-semibold text-blue-800 cursor-pointer group-open:text-blue-900">¿Funciona sin conexión a internet?</summary>
            <p className="text-gray-600 mt-2">Sí. Podés usar SAT sin estar conectado. Toda la información que cargues se sincroniza automáticamente cuando vuelvas a tener acceso a internet.</p>
          </details>
          <details className="bg-white rounded-lg shadow p-4 group">
            <summary className="font-semibold text-blue-800 cursor-pointer group-open:text-blue-900">¿Puedo firmar informes desde el celular?</summary>
            <p className="text-gray-600 mt-2">Sí, la app permite firmar informes digitalmente desde cualquier dispositivo móvil.</p>
          </details>
          <details className="bg-white rounded-lg shadow p-4 group">
            <summary className="font-semibold text-blue-800 cursor-pointer group-open:text-blue-900">¿Cómo accedo a mis reportes anteriores?</summary>
            <p className="text-gray-600 mt-2">Todos los reportes y visitas quedan guardados y accesibles desde tu cuenta en SAT.</p>
          </details>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-blue-900 text-white py-8 mt-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Image src="/icon.png" alt="Logo SAT" width={36} height={36} className="rounded-full" />
            <span className="font-bold text-lg tracking-tight">SAT</span>
          </div>
          <nav className="flex gap-6 text-sm">
            <Link href="/register" className="hover:underline">Registrarse</Link>
            <Link href="/login" className="hover:underline">Login</Link>
            <a href="#" className="hover:underline">Contacto</a>
          </nav>
          <div className="flex gap-4">
            <a href="#" aria-label="LinkedIn" className="hover:text-blue-300">
              {/* LinkedIn Icon */}
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-blue-300">
              {/* Twitter Icon */}
            </a>
          </div>
        </div>
        <div className="text-center text-xs text-blue-200 mt-6">
          &copy; {new Date().getFullYear()} SAT. Todos los derechos reservados. <br />
          Propiedad de <a href="https://www.soft3ch.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-300">soft3ch.com</a>
        </div>
      </footer>
    </div>
  );
}
