'use client'
import { useEffect, useState } from 'react'

export default function ContadorCupos() {
  const [cuposUsados, setCuposUsados] = useState<number | null>(null)
  const MAX = 60

  useEffect(() => {
    fetch('/api/cupos')
      .then(r => r.json())
      .then(d => setCuposUsados(d.cupos_usados ?? 0))
      .catch(() => setCuposUsados(0))
  }, [])

  const restantes = cuposUsados === null ? null : MAX - cuposUsados
  const porcentaje = cuposUsados === null ? 0 : (cuposUsados / MAX) * 100

  return (
    <div className="bg-black/60 border border-red-900 rounded-2xl p-6 text-center backdrop-blur-sm">
      <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">Cupos disponibles</p>
      {restantes === null ? (
        <p className="text-5xl font-mono font-bold text-red-500">...</p>
      ) : restantes === 0 ? (
        <p className="text-3xl font-bold text-red-500">¡CUPOS AGOTADOS!</p>
      ) : (
        <>
          <p className="text-6xl font-mono font-bold text-red-500">{restantes}</p>
          <p className="text-gray-400 text-sm mt-1">de {MAX} cupos</p>
          <div className="mt-4 bg-gray-800 rounded-full h-2">
            <div
              className="bg-red-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${porcentaje}%` }}
            />
          </div>
          {restantes <= 10 && (
            <p className="text-yellow-400 text-xs mt-2 font-bold animate-pulse">
              ⚠️ ¡Últimos cupos disponibles!
            </p>
          )}
        </>
      )}
    </div>
  )
}
