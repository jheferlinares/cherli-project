import { supabase } from '@/app/lib/supabase'
import { NextResponse } from 'next/server'

export async function GET() {
  const { data, error } = await supabase
    .from('configuracion')
    .select('cupos_usados, cupos_max')
    .eq('id', 1)
    .single()

  if (error) return NextResponse.json({ cupos_usados: 0, cupos_max: 60 })
  return NextResponse.json(data)
}
