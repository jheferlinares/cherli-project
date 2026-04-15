import { supabaseAdmin } from '@/app/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

export async function GET(req: NextRequest) {
  const pass = req.headers.get('x-admin-password')
  if (pass !== ADMIN_PASSWORD) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const { data, error } = await supabaseAdmin
    .from('inscripciones')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: 'Error al obtener datos' }, { status: 500 })
  return NextResponse.json(data)
}

export async function PATCH(req: NextRequest) {
  const pass = req.headers.get('x-admin-password')
  if (pass !== ADMIN_PASSWORD) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const { id, estado } = await req.json()
  const { error } = await supabaseAdmin
    .from('inscripciones')
    .update({ estado })
    .eq('id', id)

  if (error) return NextResponse.json({ error: 'Error al actualizar' }, { status: 500 })
  return NextResponse.json({ ok: true })
}
