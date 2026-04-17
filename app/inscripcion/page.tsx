'use client'
import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Inscripcion() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const formRef = useRef<HTMLFormElement>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const form = formRef.current!
    const pasarela = (form.querySelector('#pasarela') as HTMLSelectElement).value
    const incluye_triples = (form.querySelector('#triples') as HTMLInputElement).checked

    if (!pasarela) { setError('Selecciona un método de pago'); return }

    setLoading(true)
    setError('')

    const res = await fetch('/api/inscribir', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombre: (form.querySelector('#nombre') as HTMLInputElement).value,
        apellido: (form.querySelector('#apellido') as HTMLInputElement).value,
        fecha_nacimiento: (form.querySelector('#fecha') as HTMLInputElement).value,
        nombre_equipo: (form.querySelector('#equipo') as HTMLInputElement).value,
        telefono: (form.querySelector('#telefono') as HTMLInputElement).value,
        correo: (form.querySelector('#correo') as HTMLInputElement).value,
        incluye_triples,
        pasarela,
        numero_comprobante: (form.querySelector('#comprobante') as HTMLInputElement).value
      })
    })

    const data = await res.json()
    setLoading(false)
    if (!res.ok) { setError(data.error || 'Error al inscribirse'); return }

    const nombre = (form.querySelector('#nombre') as HTMLInputElement).value
    const equipo = (form.querySelector('#equipo') as HTMLInputElement).value
    router.push(`/confirmacion?nombre=${encodeURIComponent(nombre)}&equipo=${encodeURIComponent(equipo)}`)
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white px-4 py-12">
      <div className="max-w-lg mx-auto">
        <Link href="/" className="text-gray-400 text-sm hover:text-white mb-6 inline-block">← Volver</Link>
        <h1 className="text-4xl font-black mb-2">INSCRIPCIÓN</h1>
        <p className="text-gray-400 mb-8">Torneo 3x3 Basket Mundo · 16 de mayo 2026</p>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="nombre" className="text-xs text-gray-400 uppercase tracking-wider">Nombre</label>
              <input id="nombre" required className="w-full mt-1 bg-[#111] border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-red-600 outline-none" />
            </div>
            <div>
              <label htmlFor="apellido" className="text-xs text-gray-400 uppercase tracking-wider">Apellido</label>
              <input id="apellido" required className="w-full mt-1 bg-[#111] border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-red-600 outline-none" />
            </div>
          </div>

          <div>
            <label htmlFor="fecha" className="text-xs text-gray-400 uppercase tracking-wider">Fecha de nacimiento</label>
            <input id="fecha" type="date" required className="w-full mt-1 bg-[#111] border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-red-600 outline-none" />
          </div>

          <div>
            <label htmlFor="equipo" className="text-xs text-gray-400 uppercase tracking-wider">Nombre del equipo</label>
            <input id="equipo" required className="w-full mt-1 bg-[#111] border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-red-600 outline-none" />
          </div>

          <div>
            <label htmlFor="telefono" className="text-xs text-gray-400 uppercase tracking-wider">Teléfono / WhatsApp</label>
            <input id="telefono" required className="w-full mt-1 bg-[#111] border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-red-600 outline-none" />
          </div>

          <div>
            <label htmlFor="correo" className="text-xs text-gray-400 uppercase tracking-wider">Correo electrónico</label>
            <input id="correo" type="email" required className="w-full mt-1 bg-[#111] border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-red-600 outline-none" />
          </div>

          {/* Triples - vanilla JS */}
          <div className="bg-[#111] border border-yellow-600/40 rounded-xl px-4 py-4">
            <div className="flex items-center gap-3">
              <input id="triples" type="checkbox"
                style={{ width: 22, height: 22, flexShrink: 0 }}
                onChange={() => {
                  const checked = (document.getElementById('triples') as HTMLInputElement).checked
                  const montoEl = document.getElementById('monto-valor')
                  const bsEl = document.getElementById('monto-bs')
                  const tasaEl = document.getElementById('tasa-bcv')
                  const monedaEl = document.getElementById('monto-moneda')
                  const pasarela = (document.getElementById('pasarela') as HTMLSelectElement)?.value
                  const base = checked ? 28 : 25
                  if (montoEl) montoEl.textContent = String(base)
                  if (monedaEl) monedaEl.textContent = pasarela === 'binance' ? 'USDT' : 'USD'
                  const tasa = parseFloat(tasaEl?.dataset.tasa || '0')
                  if (bsEl && tasa && pasarela !== 'binance') {
                    bsEl.textContent = `≈ ${(base * tasa).toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Bs.`
                    bsEl.style.display = 'block'
                  }
                }}
              />
              <label htmlFor="triples" style={{ flex: 1 }}>
                <p className="font-bold text-yellow-400">+ Concurso de Triples <span className="text-white">+3 USD</span></p>
                <p className="text-xs text-gray-400">Participar en el concurso individual el mismo día</p>
              </label>
            </div>
          </div>

          {/* Método de pago - vanilla JS */}
          <div>
            <label htmlFor="pasarela" className="text-xs text-gray-400 uppercase tracking-wider">Método de pago</label>
            <select id="pasarela" required
              style={{ fontSize: 16, width: '100%' }}
              className="mt-1 bg-[#111] border border-gray-700 rounded-xl px-4 py-3 text-white outline-none"
              onChange={() => {
                const val = (document.getElementById('pasarela') as HTMLSelectElement).value
                const info: Record<string, { titulo: string; lineas: string[] }> = {
                  mercantil: { titulo: 'Pago Móvil · Banco Mercantil', lineas: ['Teléfono: 04124236347', 'CI: 24984205', 'Banco: Mercantil'] },
                  bnc: { titulo: 'Pago Móvil · BNC', lineas: ['Teléfono: 04124236347', 'CI: 24984205', 'Banco: Nacional de Crédito (BNC)'] },
                  binance: { titulo: 'Binance Pay', lineas: ['Email: cherligomez95@gmail.com'] }
                }
                const box = document.getElementById('info-pago')
                if (box && info[val]) {
                  box.innerHTML = `<p style="font-size:11px;color:#f87171;font-weight:bold;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:8px">${info[val].titulo}</p>` +
                    info[val].lineas.map(l => `<p style="font-size:14px;color:white;font-family:monospace">${l}</p>`).join('')
                  box.style.display = 'block'
                } else if (box) {
                  box.style.display = 'none'
                }
                // actualizar moneda en resumen
                const monedaEl = document.getElementById('monto-moneda')
                const bsEl = document.getElementById('monto-bs')
                const tasaEl = document.getElementById('tasa-bcv')
                const checked = (document.getElementById('triples') as HTMLInputElement)?.checked
                const base = checked ? 28 : 25
                if (monedaEl) monedaEl.textContent = val === 'binance' ? 'USDT' : 'USD'
                const tasa = parseFloat(tasaEl?.dataset.tasa || '0')
                if (bsEl) {
                  if (tasa && val !== 'binance') {
                    bsEl.textContent = `≈ ${(base * tasa).toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Bs.`
                    bsEl.style.display = 'block'
                  } else {
                    bsEl.style.display = 'none'
                  }
                }
              }}
            >
              <option value="" disabled selected>Selecciona un método</option>
              <option value="mercantil">Pago Móvil · Mercantil</option>
              <option value="bnc">Pago Móvil · BNC</option>
              <option value="binance">Binance Pay</option>
            </select>
          </div>

          <div id="info-pago" style={{ display: 'none' }} className="bg-[#111] border border-red-800/40 rounded-xl px-4 py-4 space-y-1" />

          {/* Resumen */}
          <div className="bg-red-950/30 border border-red-800/40 rounded-xl px-4 py-4">
            <p className="text-sm text-gray-400">Total a pagar</p>
            <p className="text-4xl font-black text-white">
              <span id="monto-valor">25</span>{' '}
              <span id="monto-moneda" className="text-xl text-gray-400">USD</span>
            </p>
            <p id="monto-bs" style={{ display: 'none' }} className="text-lg font-bold text-gray-300 mt-2" />
            <span id="tasa-bcv" data-tasa="" />
          </div>

          <div>
            <label htmlFor="comprobante" className="text-xs text-gray-400 uppercase tracking-wider">Número de comprobante / referencia</label>
            <input id="comprobante" required placeholder="Ej: TXN123456789"
              className="w-full mt-1 bg-[#111] border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-red-600 outline-none" />
          </div>

          {error && <p className="text-red-400 text-sm bg-red-950/30 border border-red-800 rounded-xl px-4 py-3">{error}</p>}

          <div className="flex items-start gap-3">
            <input id="disclaimer" type="checkbox" required style={{ width: 20, height: 20, marginTop: 2, flexShrink: 0 }} />
            <label htmlFor="disclaimer" className="text-xs text-gray-400">
              Entiendo que <span className="text-white font-bold">no se devuelven inscripciones una vez pagadas</span> y acepto la decisión inapelable del árbitro.
            </label>
          </div>

          <button type="submit" disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white text-xl font-black py-5 rounded-2xl transition-all pulse-red">
            {loading ? 'ENVIANDO...' : 'CONFIRMAR INSCRIPCIÓN →'}
          </button>
        </form>

        {/* Cargar tasa BCV */}
        <script dangerouslySetInnerHTML={{ __html: `
          fetch('https://ve.dolarapi.com/v1/dolares/oficial')
            .then(function(r){ return r.json() })
            .then(function(d){
              var tasa = d.promedio || 0;
              var el = document.getElementById('tasa-bcv');
              if(el) el.dataset.tasa = tasa;
              var bsEl = document.getElementById('monto-bs');
              var pasarela = document.getElementById('pasarela');
              if(bsEl && tasa && pasarela && pasarela.value !== 'binance') {
                bsEl.textContent = '≈ ' + (25 * tasa).toLocaleString('es-VE', {minimumFractionDigits:2, maximumFractionDigits:2}) + ' Bs.';
                bsEl.style.display = 'block';
              }
            }).catch(function(){});
        `}} />
      </div>
    </main>
  )
}
