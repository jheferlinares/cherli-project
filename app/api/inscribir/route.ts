import { supabaseAdmin } from '@/app/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()

  const { nombre, apellido, fecha_nacimiento, nombre_equipo, telefono, correo, incluye_triples, pasarela, numero_comprobante } = body

  if (!nombre || !apellido || !fecha_nacimiento || !nombre_equipo || !telefono || !correo || !pasarela || !numero_comprobante) {
    return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 })
  }

  // Verificar cupos
  const { data: config } = await supabaseAdmin
    .from('configuracion')
    .select('cupos_usados, cupos_max')
    .eq('id', 1)
    .single()

  if (!config || config.cupos_usados >= config.cupos_max) {
    return NextResponse.json({ error: 'No hay cupos disponibles' }, { status: 400 })
  }

  const monto_usd = incluye_triples ? 28 : 25

  const { error: insertError } = await supabaseAdmin
    .from('inscripciones')
    .insert({ nombre, apellido, fecha_nacimiento, nombre_equipo, telefono, correo, incluye_triples: !!incluye_triples, monto_usd, pasarela, numero_comprobante })

  if (insertError) {
    if (insertError.code === '23505') {
      return NextResponse.json({ error: 'Ese número de comprobante ya fue usado' }, { status: 400 })
    }
    return NextResponse.json({ error: 'Error al guardar inscripción' }, { status: 500 })
  }

  // Incrementar cupos usados
  await supabaseAdmin
    .from('configuracion')
    .update({ cupos_usados: config.cupos_usados + 1 })
    .eq('id', 1)

  return NextResponse.json({ ok: true })
}
