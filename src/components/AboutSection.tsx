import schoolLogo from '../assets/logo.png'

const AboutSection = () => {
  return (
    <section id="nosotros" className="py-20 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 text-center">

        {/* Logo */}
        <img
          src={schoolLogo}
          alt="Logo del Instituto"
          className="w-24 h-24 object-contain mx-auto mb-6"
        />

        {/* Frase */}
        <p className="text-gray-500 italic text-lg mb-8">
          "Educamos para la vida, formamos para el futuro"
        </p>

        {/* Título */}
        <h2 className="text-3xl font-bold font-serif text-navy-900 mb-6">
          Quiénes Somos
        </h2>

        {/* Texto */}
        <p className="text-gray-600 leading-relaxed mb-4">
          El Instituto Nuestra Señora de Luján es una institución educativa con más de 40 años
          de trayectoria, dedicada a la formación integral de niños y jóvenes. Nuestro proyecto
          pedagógico se sustenta en valores como el respeto, la responsabilidad y la excelencia académica.
        </p>
        <p className="text-gray-600 leading-relaxed">
          Contamos con niveles inicial, primario y secundario, un equipo docente altamente
          capacitado y espacios modernos para el aprendizaje, el deporte y la creatividad.
          Acompañamos a cada alumno en su camino hacia un futuro lleno de posibilidades.
        </p>

      </div>
    </section>
  )
}

export default AboutSection