const InstagramSection = () => {
  return (
    <section id="instagram" className="py-20 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 text-center">

        <div className="bg-white rounded-2xl shadow-md p-10 flex flex-col items-center gap-6">
          <div className="bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-1 rounded-full">
            <div className="bg-white rounded-full p-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
              </svg>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold font-serif text-navy-900 mb-2">
              Seguinos en Instagram
            </h2>
            <p className="text-gray-400 text-sm">
              @nuestrasradelujan_flores
            </p>
          </div>

          
          <a href="https://www.instagram.com/nuestrasradelujan_flores"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white font-semibold px-8 py-3 rounded-xl hover:opacity-90 transition-opacity"
          >
            Ver Instagram
          </a>
        </div>

      </div>
    </section>
  )
}

export default InstagramSection