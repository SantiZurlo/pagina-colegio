import heroBg from '../assets/hero-bg.png'

const Hero = () => {
  return (
    <section id="inicio" className="relative h-[80vh] flex items-center justify-center">
      
      {/* Imagen de fondo */}
      <img
        src={heroBg}
        alt="Instituto"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-navy-900 opacity-50" />

      {/* Texto */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-white font-serif text-4xl md:text-6xl font-bold leading-tight max-w-3xl mx-auto">
          Bienvenidos al Instituto Nuestra Señora de Luján de San José de Flores
        </h1>
      </div>

    </section>
  )
}

export default Hero