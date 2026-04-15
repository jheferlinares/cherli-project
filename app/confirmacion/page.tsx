import Link from 'next/link'

export default async function Confirmacion({ searchParams }: { searchParams: Promise<{ nombre?: string; equipo?: string }> }) {
  const params = await searchParams
  const nombre = params.nombre || 'Jugador'
  const equipo = params.equipo || ''

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center px-4">
      <div className="max-w-lg mx-auto text-center">
        <div className="text-8xl mb-6">🏀</div>
        <h1 className="text-5xl font-black mb-4">¡INSCRIPCIÓN<br /><span className="text-red-600">RECIBIDA!</span></h1>
        <p className="text-xl text-gray-300 mb-2">¡Bienvenido, <span className="text-white font-bold">{nombre}</span>!</p>
        {equipo && <p className="text-gray-400 mb-6">Equipo: <span className="text-white font-semibold">{equipo}</span></p>}

        <div className="bg-[#111] border border-gray-800 rounded-2xl p-6 text-left mb-8 space-y-3">
          <p className="text-sm text-gray-300">✅ Tu inscripción fue registrada correctamente</p>
          <p className="text-sm text-gray-300">📋 Revisaremos tu comprobante y confirmaremos tu cupo</p>
          <p className="text-sm text-gray-300">📅 Torneo: Sábado 16 de mayo 2026 · 10:00 a.m.</p>
          <p className="text-sm text-gray-300">📍 Cancha Santa Cruz · Calle 5 de Marzo, Leonardo Ruiz Pineda</p>
        </div>

        <Link href="/"
          className="inline-block bg-red-600 hover:bg-red-700 text-white font-black px-10 py-4 rounded-2xl transition-all">
          VOLVER AL INICIO
        </Link>
      </div>
    </main>
  )
}
