import heroBg from '../assets/foto2.jpeg'

const Hero = () => {
  return (
    <section id="inicio" className="relative h-screen flex items-center justify-center">

      <img
        src="/foto2.jpeg"
        alt="Instituto"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-navy-900 opacity-60" />

      <div className="relative z-10 text-center px-4">
        <div className="w-12 h-1 bg-yellow-500 mx-auto mb-6 rounded-full" />
        <h1 className="text-white font-serif text-5xl md:text-7xl font-bold leading-tight max-w-4xl mx-auto">
          Bienvenidos al Instituto Nuestra Señora de Luján de San José de Flores
        </h1>
        <p className="text-gray-300 mt-6 text-sm tracking-widest uppercase">
          San José de Flores · Desde 1936
        </p>
      </div>

    </section>
  )
}

export default Hero