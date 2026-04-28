const maestras = [
  { nombre: 'María García', cargo: 'Directora' },
  { nombre: 'Ana Martínez', cargo: 'Maestra de Inicial' },
  { nombre: 'Laura Rodríguez', cargo: 'Maestra de 1° grado' },
  { nombre: 'Claudia López', cargo: 'Maestra de 2° grado' },
  { nombre: 'Susana Pérez', cargo: 'Maestra de 3° grado' },
  { nombre: 'Patricia Gómez', cargo: 'Maestra de 4° grado' },
  { nombre: 'Marcela Torres', cargo: 'Maestra de 5° grado' },
  { nombre: 'Verónica Díaz', cargo: 'Maestra de 6° grado' },
]

const TeachersSection = () => {
  return (
    <section id="maestras" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">

        <h2 className="text-3xl font-bold font-serif text-navy-900 text-center mb-4">
          Nuestras Maestras
        </h2>
        <p className="text-gray-500 text-center text-sm mb-12">
          El equipo docente que acompaña a nuestros alumnos día a día
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {maestras.map((maestra, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center p-6 border border-gray-200 rounded-2xl hover:shadow-md transition-shadow"
            >
              {/* Avatar con inicial */}
              <div className="w-16 h-16 rounded-full bg-navy-800 flex items-center justify-center text-white text-2xl font-bold font-serif mb-4">
                {maestra.nombre.charAt(0)}
              </div>
              <p className="font-semibold text-navy-900 text-sm">{maestra.nombre}</p>
              <p className="text-gray-400 text-xs mt-1">{maestra.cargo}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default TeachersSection