import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-red-900/30">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.jpg" alt="Basket Mundo" width={40} height={40} className="rounded-lg" />
          <span className="font-bold text-lg tracking-tight text-white">BASKET MUNDO</span>
        </Link>
        <Link
          href="/inscripcion"
          className="bg-red-600 hover:bg-red-700 text-white text-sm font-bold px-5 py-2 rounded-xl transition-all pulse-red"
        >
          INSCRIBIRME
        </Link>
      </div>
    </header>
  )
}
