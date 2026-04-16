'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'


export default function Inscripcion() {
  const router = useRouter()
  const [form, setForm] = useState({
    nombre: '', apellido: '', fecha_nacimiento: '', nombre_equipo: '',
    telefono: '', correo: '', incluye_triples: false,
    pasarela: '', numero_comprobante: ''
  })

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
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [tasaBcv, setTasaBcv] = useState<number | null>(null)

  const monto = form.incluye_triples ? 28 : 25

  useEffect(() => {
    fetch('https://ve.dolarapi.com/v1/dolares/oficial')
      .then(r => r.json())
      .then(d => setTasaBcv(d.promedio ?? null))
      .catch(() => null)
  }, [])

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const target = e.target as HTMLInputElement
    setForm(f => ({ ...f, [target.name]: target.type === 'checkbox' ? target.checked : target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/inscribir', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })

    const data = await res.json()
    setLoading(false)

    if (!res.ok) {
      setError(data.error || 'Error al inscribirse')
      return
    }

    router.push(`/confirmacion?nombre=${encodeURIComponent(form.nombre)}&equipo=${encodeURIComponent(form.nombre_equipo)}`)
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
              <input name="nombre" required value={form.nombre} onChange={handleChange}
                className="w-full mt-1 bg-[#111] border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-red-600 outline-none" />
            </div>
            <div>
              <label className="text-xs text-gray-400 uppercase tracking-wider">Apellido</label>
              <input name="apellido" required value={form.apellido} onChange={handleChange}
                className="w-full mt-1 bg-[#111] border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-red-600 outline-none" />
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-400 uppercase tracking-wider">Fecha de nacimiento</label>
            <input name="fecha_nacimiento" type="date" required value={form.fecha_nacimiento} onChange={handleChange}
              className="w-full mt-1 bg-[#111] border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-red-600 outline-none" />
          </div>

          <div>
            <label className="text-xs text-gray-400 uppercase tracking-wider">Nombre del equipo</label>
            <input name="nombre_equipo" required value={form.nombre_equipo} onChange={handleChange}
              className="w-full mt-1 bg-[#111] border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-red-600 outline-none" />
          </div>

          <div>
            <label className="text-xs text-gray-400 uppercase tracking-wider">Teléfono / WhatsApp</label>
            <input name="telefono" required value={form.telefono} onChange={handleChange}
              className="w-full mt-1 bg-[#111] border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-red-600 outline-none" />
          </div>

          <div>
            <label className="text-xs text-gray-400 uppercase tracking-wider">Correo electrónico</label>
            <input name="correo" type="email" required value={form.correo} onChange={handleChange}
              className="w-full mt-1 bg-[#111] border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-red-600 outline-none" />
          </div>

          {/* Concurso de triples */}
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Concurso de Triples (opcional)</p>
            <button
              type="button"
              onClick={(e) => { e.preventDefault(); setForm(f => ({ ...f, incluye_triples: !f.incluye_triples })) }}
              onTouchEnd={(e) => { e.preventDefault(); setForm(f => ({ ...f, incluye_triples: !f.incluye_triples })) }}
              className={`w-full flex items-center gap-3 border rounded-xl px-4 py-4 transition-all ${
                form.incluye_triples
                  ? 'bg-yellow-900/30 border-yellow-500'
                  : 'bg-[#111] border-yellow-600/40'
              }`}
            >
              <span className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 ${
                form.incluye_triples ? 'bg-yellow-500 border-yellow-500' : 'border-gray-500'
              }`}>
                {form.incluye_triples && <span className="text-black text-xs font-black">✓</span>}
              </span>
              <div className="text-left">
                <p className="font-bold text-yellow-400">+ Concurso de Triples <span className="text-white">+3 USD</span></p>
                <p className="text-xs text-gray-400">Participar en el concurso individual el mismo día</p>
              </div>
            </button>
          </div>

          {/* Pasarela de pago */}
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Método de pago</p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: 'mercantil', label: 'Pago Móvil', sub: 'Mercantil' },
                { value: 'bnc', label: 'Pago Móvil', sub: 'BNC' },
                { value: 'binance', label: 'Binance', sub: 'Pay' },
              ].map(op => (
                <button
                  key={op.value}
                  type="button"
                  onClick={(e) => { e.preventDefault(); setForm(f => ({ ...f, pasarela: op.value })) }}
                  onTouchEnd={(e) => { e.preventDefault(); setForm(f => ({ ...f, pasarela: op.value })) }}}
                  className={`border rounded-xl px-3 py-3 text-center transition-all ${
                    form.pasarela === op.value
                      ? 'bg-red-900/40 border-red-500 text-white'
                      : 'bg-[#111] border-gray-700 text-gray-400'
                  }`}
                >
                  <p className="text-xs font-bold">{op.label}</p>
                  <p className="text-xs">{op.sub}</p>
                </button>
              ))}
            </div>
          </div>

          {form.pasarela && infoPago[form.pasarela] && (
            <div className="bg-[#111] border border-red-800/40 rounded-xl px-4 py-4 space-y-1">
              <p className="text-xs text-red-400 font-bold uppercase tracking-wider mb-2">{infoPago[form.pasarela].titulo}</p>
              {infoPago[form.pasarela].lineas.map(l => (
                <p key={l} className="text-sm text-white font-mono">{l}</p>
              ))}
            </div>
          )}

          {/* Resumen */}
          <div className="bg-red-950/30 border border-red-800/40 rounded-xl px-4 py-4">
            <p className="text-sm text-gray-400">Total a pagar</p>
            <p className="text-4xl font-black text-white">{monto} <span className="text-xl text-gray-400">{form.pasarela === 'binance' ? 'USDT' : 'USD'}</span></p>
            {tasaBcv && form.pasarela !== 'binance' && (
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
            <input name="numero_comprobante" required value={form.numero_comprobante} onChange={handleChange}
              placeholder="Ej: TXN123456789"
              className="w-full mt-1 bg-[#111] border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-red-600 outline-none" />
          </div>

          {error && <p className="text-red-400 text-sm bg-red-950/30 border border-red-800 rounded-xl px-4 py-3">{error}</p>}

          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" required className="w-5 h-5 mt-0.5 accent-red-600 shrink-0" />
            <p className="text-xs text-gray-400">Entiendo que <span className="text-white font-bold">no se devuelven inscripciones una vez pagadas</span> y acepto la decisión inapelable del árbitro.</p>
          </label>

          <button type="submit" disabled={loading || !form.pasarela}
            className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white text-xl font-black py-5 rounded-2xl transition-all pulse-red">
            {loading ? 'ENVIANDO...' : 'CONFIRMAR INSCRIPCIÓN →'}
          </button>


        </form>
      </div>
    </main>
  )
}
