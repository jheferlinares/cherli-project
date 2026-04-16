'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Inscripcion() {
  const router = useRouter()
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [fechaNacimiento, setFechaNacimiento] = useState('')
  const [nombreEquipo, setNombreEquipo] = useState('')
  const [telefono, setTelefono] = useState('')
  const [correo, setCorreo] = useState('')
  const [incluyeTriples, setIncluyeTriples] = useState(false)
  const [pasarela, setPasarela] = useState('')
  const [numeroComprobante, setNumeroComprobante] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [tasaBcv, setTasaBcv] = useState<number | null>(null)

  const monto = incluyeTriples ? 28 : 25

  const infoPago: Record<string, { titulo: string; lineas: string[] }> = {
    mercantil: {
      titulo: 'Pago Móvil · Banco Mercantil',
      lineas: ['Teléfono: 04124236347', 'CI: 24984205', 'Banco: Mercantil']
    },
    bnc: {
      titulo: 'Pago Móvil · BNC',
      lineas: ['Teléfono: 04124236347', 'CI: 24984205', 'Banco: Nacional de Crédito (BNC)']
    },
    binance: {
      titulo: 'Binance Pay',
      lineas: ['Email: cherligomez95@gmail.com']
    }
  }

  useEffect(() => {
    fetch('https://ve.dolarapi.com/v1/dolares/oficial')
      .then(r => r.json())
      .then(d => setTasaBcv(d.promedio ?? null))
      .catch(() => null)
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/inscribir', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombre, apellido, fecha_nacimiento: fechaNacimiento,
        nombre_equipo: nombreEquipo, telefono, correo,
        incluye_triples: incluyeTriples, pasarela, numero_comprobante: numeroComprobante
      })
    })

    const data = await res.json()
    setLoading(false)

    if (!res.ok) { setError(data.error || 'Error al inscribirse'); return }
    router.push(`/confirmacion?nombre=${encodeURIComponent(nombre)}&equipo=${encodeURIComponent(nombreEquipo)}`)
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white px-4 py-12">
      <div className="max-w-lg mx-auto">
        <Link href="/" className="text-gray-400 text-sm hover:text-white mb-6 inline-block">← Volver</Link>
        <h1 className="text-4xl font-black mb-2">INSCRIPCIÓN</h1>
        <p className="text-gray-400 mb-8">Torneo 3x3 Basket Mundo · 16 de mayo 2026</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-400 uppercase tracking-wider">Nombre</label>
              <input required value={nombre} onChange={e => setNombre(e.target.value)}
                className="w-full mt-1 bg-[#111] border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-red-600 outline-none" />
            </div>
            <div>
              <label className="text-xs text-gray-400 uppercase tracking-wider">Apellido</label>
              <input required value={apellido} onChange={e => setApellido(e.target.value)}
                className="w-full mt-1 bg-[#111] border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-red-600 outline-none" />
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-400 uppercase tracking-wider">Fecha de nacimiento</label>
            <input type="date" required value={fechaNacimiento} onChange={e => setFechaNacimiento(e.target.value)}
              className="w-full mt-1 bg-[#111] border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-red-600 outline-none" />
          </div>

          <div>
            <label className="text-xs text-gray-400 uppercase tracking-wider">Nombre del equipo</label>
            <input required value={nombreEquipo} onChange={e => setNombreEquipo(e.target.value)}
              className="w-full mt-1 bg-[#111] border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-red-600 outline-none" />
          </div>

          <div>
            <label className="text-xs text-gray-400 uppercase tracking-wider">Teléfono / WhatsApp</label>
            <input required value={telefono} onChange={e => setTelefono(e.target.value)}
              className="w-full mt-1 bg-[#111] border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-red-600 outline-none" />
          </div>

          <div>
            <label className="text-xs text-gray-400 uppercase tracking-wider">Correo electrónico</label>
            <input type="email" required value={correo} onChange={e => setCorreo(e.target.value)}
              className="w-full mt-1 bg-[#111] border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-red-600 outline-none" />
          </div>

          {/* Concurso de triples */}
          <div className="flex items-center gap-3 bg-[#111] border border-yellow-600/40 rounded-xl px-4 py-4">
            <input
              id="triples"
              type="checkbox"
              checked={incluyeTriples}
              onChange={e => setIncluyeTriples(e.target.checked)}
              className="w-6 h-6 accent-yellow-500"
            />
            <label htmlFor="triples" className="cursor-pointer flex-1">
              <p className="font-bold text-yellow-400">+ Concurso de Triples <span className="text-white">+3 USD</span></p>
              <p className="text-xs text-gray-400">Participar en el concurso individual el mismo día</p>
            </label>
          </div>

          {/* Pasarela de pago */}
          <div>
            <label className="text-xs text-gray-400 uppercase tracking-wider">Método de pago</label>
            <select
              required
              defaultValue=""
              onChange={e => setPasarela(e.target.value)}
              style={{ WebkitAppearance: 'auto' }}
              className="w-full mt-1 bg-[#111] border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-red-600 outline-none"
            >
              <option value="" disabled>Selecciona un método</option>
              <option value="mercantil">Pago Móvil · Mercantil</option>
              <option value="bnc">Pago Móvil · BNC</option>
              <option value="binance">Binance Pay</option>
            </select>
          </div>

          {pasarela && infoPago[pasarela] && (
            <div className="bg-[#111] border border-red-800/40 rounded-xl px-4 py-4 space-y-1">
              <p className="text-xs text-red-400 font-bold uppercase tracking-wider mb-2">{infoPago[pasarela].titulo}</p>
              {infoPago[pasarela].lineas.map(l => (
                <p key={l} className="text-sm text-white font-mono">{l}</p>
              ))}
            </div>
          )}

          {/* Resumen */}
          <div className="bg-red-950/30 border border-red-800/40 rounded-xl px-4 py-4">
            <p className="text-sm text-gray-400">Total a pagar</p>
            <p className="text-4xl font-black text-white">{monto} <span className="text-xl text-gray-400">{pasarela === 'binance' ? 'USDT' : 'USD'}</span></p>
            {tasaBcv && pasarela !== 'binance' && (
              <div className="mt-2 pt-2 border-t border-red-800/30">
                <p className="text-lg font-bold text-gray-300">
                  ≈ {(monto * tasaBcv).toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className="text-sm text-gray-500">Bs.</span>
                </p>
                <p className="text-xs text-gray-500 mt-1">Tasa BCV: {tasaBcv.toFixed(2)} Bs/USD</p>
              </div>
            )}
          </div>

          <div>
            <label className="text-xs text-gray-400 uppercase tracking-wider">Número de comprobante / referencia</label>
            <input required value={numeroComprobante} onChange={e => setNumeroComprobante(e.target.value)}
              placeholder="Ej: TXN123456789"
              className="w-full mt-1 bg-[#111] border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-red-600 outline-none" />
          </div>

          {error && <p className="text-red-400 text-sm bg-red-950/30 border border-red-800 rounded-xl px-4 py-3">{error}</p>}

          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" required className="w-5 h-5 mt-0.5 accent-red-600 shrink-0" />
            <p className="text-xs text-gray-400">Entiendo que <span className="text-white font-bold">no se devuelven inscripciones una vez pagadas</span> y acepto la decisión inapelable del árbitro.</p>
          </label>

          <button type="submit" disabled={loading || !pasarela}
            className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white text-xl font-black py-5 rounded-2xl transition-all pulse-red">
            {loading ? 'ENVIANDO...' : 'CONFIRMAR INSCRIPCIÓN →'}
          </button>
        </form>
      </div>
    </main>
  )
}
