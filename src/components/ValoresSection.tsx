const valores = [
  { emoji: '🤝', label: 'Respeto' },
  { emoji: '💛', label: 'Empatía' },
  { emoji: '📚', label: 'Responsabilidad' },
  { emoji: '🌱', label: 'Solidaridad' },
  { emoji: '🦋', label: 'Autonomía' },
  { emoji: '⭐', label: 'Superación' },
  { emoji: '❤️', label: 'Amor' },
  { emoji: '🏫', label: 'Convivencia' },
]

const ValoresSection = () => {
  return (
    <section id="valores" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">

        <h2 className="text-3xl font-bold font-serif text-navy-900 text-center mb-4">
          Nuestros Valores
        </h2>
        <p className="text-gray-500 text-center text-sm mb-12">
          Los pilares que guían nuestra comunidad educativa
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {valores.map((valor, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center p-6 border border-gray-200 rounded-2xl hover:shadow-md hover:border-navy-700 transition-all"
            >
              <span className="text-4xl mb-4">{valor.emoji}</span>
              <p className="font-semibold text-navy-900">{valor.label}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="mailto:A346.p@bue.edu.ar"
            className="inline-block bg-navy-800 text-white font-semibold text-sm px-8 py-4 rounded-xl hover:bg-navy-900 transition-colors tracking-wide"
            >
            VACANTES ABIERTAS 2027
          </a>
        </div>

      </div>
    </section>
  )
}

export default ValoresSection