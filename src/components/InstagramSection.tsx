import { useEffect, useState } from 'react'
import { ExternalLink } from 'lucide-react'

type Post = {
  id: string
  permalink: string
  caption: string
  sizes: {
    medium: { mediaUrl: string }
  }
}

const FEED_ID = 'pENWZnxcprvCij7HUYUz'

const InstagramSection = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`https://feeds.behold.so/${FEED_ID}`)
      .then(res => res.json())
      .then(data => {
        setPosts(data.posts?.slice(0, 3) ?? [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <section id="instagram" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">

        <div className="flex items-center justify-center gap-2 mb-4">
          <ExternalLink size={24} className="text-navy-800" />
          <h2 className="text-3xl font-bold font-serif text-navy-900">
            Seguinos en Instagram
          </h2>
        </div>

        <p className="text-center text-gray-400 text-sm mb-12">
          @nuestrasradelujan_flores
        </p>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="aspect-square bg-gray-200 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <p className="text-center text-gray-400 text-sm">
            No se pudieron cargar las publicaciones.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.map(post => (<a
              
                key={post.id}
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square overflow-hidden rounded-2xl"
              >
                <img
                  src={post.sizes.medium.mediaUrl}
                  alt={post.caption ?? ''}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-navy-900 bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-end p-4">
                  <p className="text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-3">
                    {post.caption}
                  </p>
                </div>
              </a>
            ))}
          </div>
        )}

        <div className="text-center mt-8">
          
            <a href="https://www.instagram.com/nuestrasradelujan_flores"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-navy-800 text-navy-800 rounded-xl px-6 py-3 text-sm font-semibold hover:bg-navy-800 hover:text-white transition-colors"
          >
            <ExternalLink size={16} />
            Ver más en Instagram
          </a>
        </div>

      </div>
    </section>
  )
}

export default InstagramSection