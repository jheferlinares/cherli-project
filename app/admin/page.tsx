'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

type Inscripcion = {
  id: string
  nombre: string
  apellido: string
  nombre_equipo: string
  telefono: string
  correo: string
  incluye_triples: boolean
  monto_usd: number
  pasarela: string
  numero_comprobante: string
  estado: string
  created_at: string
}

export default function Admin() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [authed, setAuthed] = useState(false)
  const [data, setData] = useState<Inscripcion[]>([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function logout() {
    setAuthed(false)
    setPassword('')
    setData([])
    router.push('/')
  }

  async function login() {
    setLoading(true)
    const res = await fetch('/api/admin', { headers: { 'x-admin-password': password } })
    setLoading(false)
    if (!res.ok) { setError('Contraseña incorrecta'); return }
    setData(await res.json())
    setAuthed(true)
  }

  async function cambiarEstado(id: string, estado: string) {
    await fetch('/api/admin', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'x-admin-password': password },
      body: JSON.stringify({ id, estado })
    })
    setData(d => d.map(i => i.id === id ? { ...i, estado } : i))
  }

  if (!authed) return (
    <main className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-black mb-6 text-center">🔐 ADMIN</h1>
        <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && login()}
          className="w-full bg-[#111] border border-gray-700 rounded-xl px-4 py-3 text-white outline-none focus:border-red-600 mb-3" />
        {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
        <button onClick={login} disabled={loading}
          className="w-full bg-red-600 hover:bg-red-700 font-black py-3 rounded-xl transition-all">
          {loading ? 'ENTRANDO...' : 'ENTRAR'}
        </button>
      </div>
    </main>
  )

  const confirmados = data.filter(i => i.estado === 'confirmado').length
  const pendientes = data.filter(i => i.estado === 'pendiente').length
  const totalUSD = data.filter(i => i.estado === 'confirmado').reduce((s, i) => s + i.monto_usd, 0)

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-black">🏀 Panel Admin · Basket Mundo</h1>
          <button onClick={logout} className="bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm font-bold px-4 py-2 rounded-xl transition-all">
            Cerrar sesión
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-[#111] border border-gray-800 rounded-2xl p-4 text-center">
            <p className="text-3xl font-black">{data.length}</p>
            <p className="text-gray-400 text-sm">Total inscritos</p>
          </div>
          <div className="bg-[#111] border border-green-800 rounded-2xl p-4 text-center">
            <p className="text-3xl font-black text-green-400">{confirmados}</p>
            <p className="text-gray-400 text-sm">Confirmados</p>
          </div>
          <div className="bg-[#111] border border-yellow-800 rounded-2xl p-4 text-center">
            <p className="text-3xl font-black text-yellow-400">{pendientes}</p>
            <p className="text-gray-400 text-sm">Pendientes</p>
          </div>
        </div>

        <p className="text-gray-400 text-sm mb-4">💰 Recaudado (confirmados): <span className="text-white font-bold">${totalUSD} USD</span></p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-400 border-b border-gray-800">
                <th className="text-left py-2 pr-4">Nombre</th>
                <th className="text-left py-2 pr-4">Equipo</th>
                <th className="text-left py-2 pr-4">Teléfono</th>
                <th className="text-left py-2 pr-4">Pasarela</th>
                <th className="text-left py-2 pr-4">Comprobante</th>
                <th className="text-left py-2 pr-4">Monto</th>
                <th className="text-left py-2 pr-4">Triples</th>
                <th className="text-left py-2 pr-4">Estado</th>
                <th className="text-left py-2">Acción</th>
              </tr>
            </thead>
            <tbody>
              {data.map(i => (
                <tr key={i.id} className="border-b border-gray-900 hover:bg-white/5">
                  <td className="py-3 pr-4 font-medium">{i.nombre} {i.apellido}</td>
                  <td className="py-3 pr-4 text-gray-300">{i.nombre_equipo}</td>
                  <td className="py-3 pr-4 text-gray-300">{i.telefono}</td>
                  <td className="py-3 pr-4 text-gray-300 capitalize">{i.pasarela}</td>
                  <td className="py-3 pr-4 text-gray-300 font-mono text-xs">{i.numero_comprobante}</td>
                  <td className="py-3 pr-4 text-white font-bold">${i.monto_usd}</td>
                  <td className="py-3 pr-4">{i.incluye_triples ? '✅' : '—'}</td>
                  <td className="py-3 pr-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${i.estado === 'confirmado' ? 'bg-green-900/50 text-green-400' : 'bg-yellow-900/50 text-yellow-400'}`}>
                      {i.estado}
                    </span>
                  </td>
                  <td className="py-3">
                    {i.estado === 'pendiente' ? (
                      <button onClick={() => cambiarEstado(i.id, 'confirmado')}
                        className="bg-green-700 hover:bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-lg transition-all">
                        Confirmar
                      </button>
                    ) : (
                      <button onClick={() => cambiarEstado(i.id, 'pendiente')}
                        className="bg-gray-700 hover:bg-gray-600 text-white text-xs px-3 py-1 rounded-lg transition-all">
                        Revertir
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {data.length === 0 && <p className="text-gray-500 text-center py-12">No hay inscripciones aún</p>}
        </div>
      </div>
    </main>
  )
}
