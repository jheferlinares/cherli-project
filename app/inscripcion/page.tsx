'use client'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

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

export default function Inscripcion() {
  const router = useRouter()
  const [pasarela, setPasarela] = useState('')
  const [incluyeTriples, setIncluyeTriples] = useState(false)
  const [tasaBcv, setTasaBcv] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const monto = incluyeTriples ? 28 : 25

  const nombreRef = useRef<HTMLInputElement>(null)
  const apellidoRef = useRef<HTMLInputElement>(null)
  const fechaRef = useRef<HTMLInputElement>(null)
  const equipoRef = useRef<HTMLInputElement>(null)
  const telefonoRef = useRef<HTMLInputElement>(null)
  const correoRef = useRef<HTMLInputElement>(null)
  const comprobanteRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetch('https://ve.dolarapi.com/v1/dolares/oficial')
      .then(r => r.json())
      .then(d => setTasaBcv(d.promedio ?? null))
      .catch(() => null)
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!pasarela) { setError('Selecciona un método de pago'); return }
    setLoading(true)
    setError('')

    const res = await fetch('/api/inscribir', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombre: nombreRef.current?.value,
        apellido: apellidoRef.current?.value,
        fecha_nacimiento: fechaRef.current?.value,
        nombre_equipo: equipoRef.current?.value,
        telefono: telefonoRef.current?.value,
        correo: correoRef.current?.value,
        incluye_triples: incluyeTriples,
        pasarela,
        numero_comprobante: comprobanteRef.current?.value
      })
    })

    const data = await res.json()
    setLoading(false)
    if (!res.ok) { setError(data.error || 'Error al inscribirse'); return }
    router.push(`/confirmacion?nombre=${encodeURIComponent(nombreRef.current?.value || '')}&equipo=${encodeURIComponent(equipoRef.current?.value || '')}`)
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
              <input ref={nombreRef} required className="w-full mt-1 bg-[#111] border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-red-600 outline-none" />
            </div>
            <div>
              <label className="text-xs text-gray-400 uppercase tracking-wider">Apellido</label>
              <input ref={apellidoRef} required className="w-full mt-1 bg-[#111] border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-red-600 outline-none" />
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-400 uppercase tracking-wider">Fecha de nacimiento</label>
            <input ref={fechaRef} type="date" required className="w-full mt-1 bg-[#111] border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-red-600 outline-none" />
          </div>

          <div>
            <label className="text-xs text-gray-400 uppercase tracking-wider">Nombre del equipo</label>
            <input ref={equipoRef} required className="w-full mt-1 bg-[#111] border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-red-600 outline-none" />
          </div>

          <div>
            <label className="text-xs text-gray-400 uppercase tracking-wider">Teléfono / WhatsApp</label>
            <input ref={telefonoRef} required className="w-full mt-1 bg-[#111] border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-red-600 outline-none" />
          </div>

          <div>
            <label className="text-xs text-gray-400 uppercase tracking-wider">Correo electrónico</label>
            <input ref={correoRef} type="email" required className="w-full mt-1 bg-[#111] border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-red-600 outline-none" />
          </div>

          {/* Concurso de triples */}
          <div className="flex items-center gap-3 bg-[#111] border border-yellow-600/40 rounded-xl px-4 py-4">
            <input
              id="triples"
              type="checkbox"
              style={{ WebkitAppearance: 'checkbox', width: 24, height: 24 }}
              onChange={e => setIncluyeTriples(e.target.checked)}
            />
            <label htmlFor="triples" className="flex-1">
              <p className="font-bold text-yellow-400">+ Concurso de Triples <span className="text-white">+3 USD</span></p>
              <p className="text-xs text-gray-400">Participar en el concurso individual el mismo día</p>
            </label>
          </div>

          {/* Método de pago */}
          <div>
            <label className="text-xs text-gray-400 uppercase tracking-wider">Método de pago</label>
            <select
              style={{ WebkitAppearance: 'auto', fontSize: 16 }}
              defaultValue=""
              onChange={e => setPasarela(e.target.value)}
              className="w-full mt-1 bg-[#111] border border-gray-700 rounded-xl px-4 py-3 text-white outline-none"
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
            <p className="text-4xl font-black text-white">
              {monto} <span className="text-xl text-gray-400">{pasarela === 'binance' ? 'USDT' : 'USD'}</span>
            </p>
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
            <input ref={comprobanteRef} required placeholder="Ej: TXN123456789"
              className="w-full mt-1 bg-[#111] border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-red-600 outline-none" />
          </div>

          {error && <p className="text-red-400 text-sm bg-red-950/30 border border-red-800 rounded-xl px-4 py-3">{error}</p>}

          <div className="flex items-start gap-3">
            <input id="disclaimer" type="checkbox" required style={{ WebkitAppearance: 'checkbox', width: 20, height: 20, marginTop: 2 }} />
            <label htmlFor="disclaimer" className="text-xs text-gray-400">
              Entiendo que <span className="text-white font-bold">no se devuelven inscripciones una vez pagadas</span> y acepto la decisión inapelable del árbitro.
            </label>
          </div>

          <button type="submit" disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white text-xl font-black py-5 rounded-2xl transition-all pulse-red">
            {loading ? 'ENVIANDO...' : 'CONFIRMAR INSCRIPCIÓN →'}
          </button>
        </form>
      </div>
    </main>
  )
}
