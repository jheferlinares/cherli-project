import Link from 'next/link'
import Image from 'next/image'
import ContadorCupos from './components/ContadorCupos'
import Header from './components/Header'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">

      <Header />

      {/* HERO */}
      <section className="hero-bg min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="max-w-4xl mx-auto text-center">

          <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-600/40 rounded-full px-4 py-2 text-sm text-red-400 mb-6">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse inline-block" />
            Evento exclusivo · Comunidad Basket Mundo TikTok
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-4">
            TORNEO<br />
            <span className="text-red-600">3x3</span><br />
            BASKET MUNDO
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mt-6 mb-2">
            📅 Sábado <span className="text-white font-bold">16 de mayo 2026</span> · 10:00 a.m.
          </p>
          <p className="text-gray-400 mb-8">
            📍 Cancha Santa Cruz · Calle 5 de Marzo, Leonardo Ruiz Pineda
          </p>

          <div className="max-w-sm mx-auto mb-8">
            <div className="bg-black/60 border border-red-900 rounded-2xl p-6 text-center backdrop-blur-sm">
              <p className="text-yellow-400 font-semibold text-lg">⚡ Cupos muy limitados</p>
              <p className="text-gray-400 text-sm mt-1">Una vez se llenen, se cierra la inscripción</p>
            </div>
          </div>

          <Link
            href="/inscripcion"
            className="inline-block bg-red-600 hover:bg-red-700 text-white text-2xl font-black px-14 py-6 rounded-2xl transition-all pulse-red shadow-2xl shadow-red-900/50"
          >
            INSCRIBIRME AHORA →
          </Link>

          <div className="flex flex-wrap justify-center gap-6 mt-10 text-sm text-gray-400">
            <span>✅ Todo incluido</span>
            <span>✅ Sin pago extra de arbitraje</span>
            <span>✅ Premio sorpresa al campeón</span>
          </div>
        </div>
      </section>

      {/* PRECIOS */}
      <section className="py-20 px-4 bg-[#0d0d0d]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-black text-center mb-4">PRECIOS</h2>
          <p className="text-center text-gray-400 mb-12">Sin sorpresas. Todo incluido desde el primer día.</p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Torneo */}
            <div className="bg-[#111] border border-red-600 rounded-3xl p-8 card-glow transition-all">
              <div className="text-red-500 text-4xl mb-4">🏆</div>
              <h3 className="text-2xl font-black mb-2">Torneo 3x3</h3>
              <p className="text-6xl font-black text-white mt-4">20 <span className="text-2xl text-gray-400">USD</span></p>
              <div className="mt-6 space-y-2 text-sm text-gray-300">
                <p>✅ Árbitros incluidos</p>
                <p>✅ Cancha incluida</p>
                <p>✅ Hidratación incluida</p>
                <p>✅ Sin pagos extra</p>
              </div>
              <div className="mt-4 bg-green-900/30 border border-green-700/40 rounded-xl px-4 py-2 text-green-400 text-xs font-bold">
                TODO INCLUIDO
              </div>
            </div>

            {/* Triples */}
            <div className="bg-[#111] border border-yellow-500 rounded-3xl p-8 card-glow transition-all">
              <div className="text-yellow-400 text-4xl mb-4">🎯</div>
              <h3 className="text-2xl font-black mb-2">+ Concurso de Triples</h3>
              <p className="text-gray-400 text-sm mb-2">Adicional al torneo (opcional)</p>
              <p className="text-6xl font-black text-white mt-4">+3 <span className="text-2xl text-gray-400">USD</span></p>
              <div className="mt-6 space-y-2 text-sm text-gray-300">
                <p>🎯 Concurso individual</p>
                <p>🏅 Por persona</p>
                <p>⚡ Mismo día del torneo</p>
              </div>
              <div className="mt-4 bg-yellow-900/30 border border-yellow-700/40 rounded-xl px-4 py-2 text-yellow-400 text-xs font-bold">
                OPCIONAL · +3 USD
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            <Link
              href="/inscripcion"
              className="inline-block bg-red-600 hover:bg-red-700 text-white text-xl font-black px-12 py-5 rounded-2xl transition-all"
            >
              QUIERO INSCRIBIRME →
            </Link>
          </div>
        </div>
      </section>

      {/* POR QUÉ PARTICIPAR */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-black text-center mb-12">¿POR QUÉ PARTICIPAR?</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: '🏀', title: 'Formato 3x3', desc: 'El formato más emocionante del básquet callejero' },
              { icon: '🎁', title: 'Premio Sorpresa', desc: 'El campeón se lleva un premio que se revela el día del torneo' },
              { icon: '🤝', title: 'Comunidad', desc: 'Evento exclusivo para la familia Basket Mundo de TikTok' },
              { icon: '⚡', title: 'Todo Incluido', desc: 'Árbitros, cancha e hidratación sin costo extra' },
            ].map((item) => (
              <div key={item.title} className="bg-[#111] border border-gray-800 rounded-2xl p-5 text-center card-glow transition-all">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h4 className="font-bold text-sm mb-1">{item.title}</h4>
                <p className="text-gray-400 text-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LUGAR */}
      <section className="py-20 px-4 bg-[#0d0d0d]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-black text-center mb-4">LUGAR DEL EVENTO</h2>
          <p className="text-center text-gray-400 mb-10">📍 Cancha Santa Cruz · Calle 5 de Marzo, Leonardo Ruiz Pineda (esquina)</p>
          <div className="rounded-2xl overflow-hidden border border-gray-800 h-72">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1422.2798433839398!2d-67.51372311480536!3d10.183098740048347!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e802267b9f63edd%3A0x5585809d2effe859!2s5FMP%2B6QG%2C%20Santa%20Cruz%202123%2C%20Aragua%2C%20Venezuela!5e1!3m2!1ses-419!2sus!4v1776212910218!5m2!1ses-419!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 px-4 text-center hero-bg">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-5xl font-black mb-4">¿LISTO PARA <span className="text-red-600">JUGAR?</span></h2>
          <p className="text-gray-400 mb-8 text-lg">Los cupos se están llenando. No te quedes fuera.</p>
          <Link
            href="/inscripcion"
            className="inline-block bg-red-600 hover:bg-red-700 text-white text-2xl font-black px-14 py-6 rounded-2xl transition-all pulse-red shadow-2xl shadow-red-900/50"
          >
            INSCRIBIRME AHORA →
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black border-t border-gray-900 py-8 px-4 text-center text-gray-500 text-sm">
        <div className="flex justify-center mb-3">
          <Image src="/logo.jpg" alt="Basket Mundo" width={48} height={48} className="rounded-xl" />
        </div>
        <p className="text-white font-bold mb-1">Torneo 3x3 Basket Mundo · Mayo 2026</p>
        <p>Evento exclusivo de la comunidad Basket Mundo de TikTok</p>
        <p className="mt-2 text-xs">No se devuelven inscripciones una vez pagadas · La decisión del árbitro es inapelable</p>
      </footer>

    </main>
  )
}
