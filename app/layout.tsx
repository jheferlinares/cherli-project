import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Torneo 3x3 Basket Mundo – Mayo 2026',
  description: 'Inscríbete al Torneo 3x3 Basket Mundo. 16 de mayo 2026. Evento exclusivo de la comunidad Basket Mundo de TikTok. Cupos muy limitados.',
  openGraph: {
    title: 'Torneo 3x3 Basket Mundo – Mayo 2026',
    description: 'Evento exclusivo para la comunidad Basket Mundo de TikTok. ¡Cupos muy limitados!',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
