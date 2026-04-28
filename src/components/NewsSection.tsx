import { useEffect, useState } from 'react'
import { Calendar } from 'lucide-react'
import { supabase } from '../lib/supabase'
import type { Noticia } from '../lib/types'

const NewsSection = () => {
  const [noticias, setNoticias] = useState<Noticia[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNoticias = async () => {
      const { data } = await supabase
        .from('noticias')
        .select('*')
        .order('fecha', { ascending: false })
        .limit(3)
      if (data) setNoticias(data)
      setLoading(false)
    }
    fetchNoticias()
  }, [])

  return (
    <section id="noticias" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">

        <h2 className="text-3xl font-bold font-serif text-navy-900 text-center mb-12">
          Noticias Destacadas
        </h2>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="border border-gray-200 rounded-xl overflow-hidden animate-pulse">
                <div className="h-40 bg-gray-200" />
                <div className="p-6">
                  <div className="h-3 bg-gray-200 rounded w-1/2 mb-4" />
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-3 bg-gray-200 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : noticias.length === 0 ? (
          <p className="text-center text-gray-400 text-sm py-12">No hay noticias publicadas aún.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {noticias.map(noticia => (
              <div
                key={noticia.id}
                className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Imagen */}
                {noticia.imagen_url ? (
                  <img
                    src={noticia.imagen_url}
                    alt={noticia.titulo}
                    className="w-full h-40 object-cover"
                  />
                ) : (
                  <div className="w-full h-40 bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-300 text-sm">Sin imagen</span>
                  </div>
                )}

                {/* Contenido */}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
                    <Calendar size={14} />
                    <span>
                      {new Date(noticia.fecha).toLocaleDateString('es-AR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  <h3 className="text-navy-900 font-semibold text-lg mb-2">
                    {noticia.titulo}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {noticia.descripcion}
                  </p>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  )
}

export default NewsSection