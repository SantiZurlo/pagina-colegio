import schoolLogo from '../assets/logo.png'

const AboutSection = () => {
  return (
    <section id="nosotros" className="py-20 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <img src={schoolLogo} alt="Logo del Instituto" className="w-48 h-48 object-contain mx-auto mb-6" />

        <p className="text-gray-500 italic text-lg mb-8">
          "Una historia de amor y comunidad que comenzó en abril de 1936, cuando abrimos las puertas como escuela. El lugar donde el aprendizaje y los valores de nuestros chicos crecen de la mano."
        </p>

        <h2 className="text-3xl font-bold font-serif text-navy-900 mb-6">
          Nuestra Identidad
        </h2>

        <p className="text-gray-600 leading-relaxed mb-4">
          ¡Bienvenidos a nuestra comunidad educativa! Somos el lugar donde el aprendizaje se vive con alegría, curiosidad y afecto. Acompañamos a las infancias en sus etapas más importantes, desde el nivel Inicial, nuestros jardines, hasta la finalización de la Primaria, brindando opciones horarias en el turno mañana y turno tarde para adaptarnos a las necesidades de cada familia.
        </p>
        <p className="text-gray-600 leading-relaxed">
          Creemos que educar es mucho más que transmitir conocimientos: es cobijar, escuchar y guiar. Nos define el trato personalizado, el respeto por los tiempos de cada niño y un equipo docente apasionado por despertar el deseo de aprender. Aquí, cada día es una oportunidad para jugar, explorar, compartir y crecer en valores.
        </p>

      </div>
    </section>
  )
}

export default AboutSection