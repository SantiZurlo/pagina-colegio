import { useState, useEffect, useRef } from 'react'
import { supabase } from '../lib/supabase'
import { LogIn, LogOut, Plus, Pencil, Trash2, Newspaper, MessageSquare, X } from 'lucide-react'
import type { Noticia, Consulta } from '../lib/types'


// ─── Login ───────────────────────────────────────────────────────────────────
const LoginView = ({ onLogin }: { onLogin: () => void }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError('Email o contraseña incorrectos')
    else onLogin()
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-sm">
        <h1 className="text-2xl font-bold font-serif text-navy-900 text-center mb-6">Admin</h1>
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm mb-4">{error}</div>
        )}
        <div className="flex flex-col gap-4">
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}
            className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy-700" />
          <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)}
            className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy-700" />
          <button onClick={handleLogin} disabled={loading}
            className="bg-navy-800 text-white rounded-xl px-6 py-3 text-sm font-semibold hover:bg-navy-900 transition-colors flex items-center gap-2 justify-center disabled:opacity-50">
            <LogIn size={16} />
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
          <a href="/" className="text-center text-sm text-gray-400 hover:text-gray-600 transition-colors">← Volver al sitio</a>
        </div>
      </div>
    </div>
  )
}

// ─── Modal nueva/editar noticia ───────────────────────────────────────────────
const NoticiaModal = ({ noticia, onClose, onSave }: {
  noticia: Noticia | null
  onClose: () => void
  onSave: () => void
}) => {
  const [titulo, setTitulo] = useState(noticia?.titulo ?? '')
  const [descripcion, setDescripcion] = useState(noticia?.descripcion ?? '')
  const [fecha, setFecha] = useState(noticia?.fecha ?? new Date().toISOString().split('T')[0])
  const [imagen, setImagen] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(noticia?.imagen_url ?? null)
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = (file: File) => {
    setImagen(file)
    setPreview(URL.createObjectURL(file))
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    const file = e.clipboardData.files?.[0]
    if (file && file.type.startsWith('image/')) handleFile(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith('image/')) handleFile(file)
  }

  const handleSave = async () => {
    if (!titulo || !fecha) return
    setLoading(true)

    let imagen_url = noticia?.imagen_url ?? null

    if (imagen) {
      const ext = imagen.name.split('.').pop()
      const fileName = `${Date.now()}.${ext}`
      const { error: uploadError } = await supabase.storage
        .from('noticias')
        .upload(fileName, imagen)

      if (!uploadError) {
        const { data } = supabase.storage.from('noticias').getPublicUrl(fileName)
        imagen_url = data.publicUrl
      }
    }

    if (noticia) {
      await supabase.from('noticias').update({ titulo, descripcion, fecha, imagen_url }).eq('id', noticia.id)
    } else {
      await supabase.from('noticias').insert({ titulo, descripcion, fecha, imagen_url })
    }

    setLoading(false)
    onSave()
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold font-serif text-navy-900">{noticia ? 'Editar noticia' : 'Nueva noticia'}</h2>
          <button onClick={onClose}><X size={20} className="text-gray-400 hover:text-gray-600" /></button>
        </div>

        <div className="flex flex-col gap-3">
          <input type="text" placeholder="Título" value={titulo} onChange={e => setTitulo(e.target.value)}
            className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy-700" />
          <textarea placeholder="Descripción" rows={4} value={descripcion} onChange={e => setDescripcion(e.target.value)}
            className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy-700 resize-none" />
          <input type="date" value={fecha} onChange={e => setFecha(e.target.value)}
            className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy-700" />

          {/* Zona de imagen */}
          <div
            onPaste={handlePaste}
            onDrop={handleDrop}
            onDragOver={e => e.preventDefault()}
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center cursor-pointer hover:border-navy-700 transition-colors"
          >
            {preview ? (
              <div className="relative">
                <img src={preview} alt="Preview" className="w-full h-40 object-cover rounded-lg" />
                <button
                  onClick={e => { e.stopPropagation(); setPreview(null); setImagen(null) }}
                  className="absolute top-2 right-2 bg-white rounded-full p-1 shadow"
                >
                  <X size={14} className="text-gray-600" />
                </button>
              </div>
            ) : (
              <div className="py-4">
                <p className="text-sm text-gray-400">Subir imagen o pegar (Ctrl+V)</p>
                <p className="text-xs text-gray-300 mt-1">También podés arrastrar y soltar</p>
              </div>
            )}
          </div>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileInput} className="hidden" />

          <button onClick={handleSave} disabled={loading}
            className="bg-navy-800 text-white rounded-xl px-6 py-3 text-sm font-semibold hover:bg-navy-900 transition-colors disabled:opacity-50">
            {loading ? 'Guardando...' : 'Publicar noticia'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Panel principal ──────────────────────────────────────────────────────────
const PanelView = ({ onLogout, userEmail }: { onLogout: () => void, userEmail: string }) => {
  const [tab, setTab] = useState<'noticias' | 'consultas'>('noticias')
  const [noticias, setNoticias] = useState<Noticia[]>([])
  const [consultas, setConsultas] = useState<Consulta[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [editando, setEditando] = useState<Noticia | null>(null)

  const fetchNoticias = async () => {
    const { data } = await supabase.from('noticias').select('*').order('fecha', { ascending: false })
    if (data) setNoticias(data)
  }

  const fetchConsultas = async () => {
    const { data } = await supabase.from('consultas').select('*').order('created_at', { ascending: false })
    if (data) setConsultas(data)
  }

  useEffect(() => {
    fetchNoticias()
    fetchConsultas()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar esta noticia?')) return
    await supabase.from('noticias').delete().eq('id', id)
    fetchNoticias()
  }

  const handleMarcarLeida = async (id: string) => {
    await supabase.from('consultas').update({ leida: true }).eq('id', id)
    fetchConsultas()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b px-6 py-4 flex items-center justify-between">
        <h1 className="font-bold font-serif text-navy-900">Panel de Administración</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-400">{userEmail}</span>
          <button onClick={onLogout} className="flex items-center gap-1 text-sm text-gray-500 hover:text-navy-900 transition-colors">
            <LogOut size={16} /> Salir
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-2 bg-gray-100 rounded-xl p-1 mb-8 w-fit">
          <button onClick={() => setTab('noticias')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tab === 'noticias' ? 'bg-white shadow text-navy-900' : 'text-gray-500 hover:text-gray-700'}`}>
            <Newspaper size={16} /> Noticias
          </button>
          <button onClick={() => setTab('consultas')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tab === 'consultas' ? 'bg-white shadow text-navy-900' : 'text-gray-500 hover:text-gray-700'}`}>
            <MessageSquare size={16} /> Consultas
            {consultas.filter(c => !c.leida).length > 0 && (
              <span className="bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                {consultas.filter(c => !c.leida).length}
              </span>
            )}
          </button>
        </div>

        {/* Noticias */}
        {tab === 'noticias' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold font-serif text-navy-900">Noticias</h2>
              <button onClick={() => { setEditando(null); setModalOpen(true) }}
                className="bg-navy-800 text-white rounded-xl px-4 py-2 text-sm font-semibold hover:bg-navy-900 transition-colors flex items-center gap-2">
                <Plus size={16} /> Nueva noticia
              </button>
            </div>
            {noticias.length === 0 ? (
              <p className="text-gray-400 text-sm text-center py-12">No hay noticias aún.</p>
            ) : (
              <div className="flex flex-col gap-3">
                {noticias.map(n => (
                  <div key={n.id} className="bg-white border border-gray-200 rounded-xl p-4 flex items-start justify-between">
                    <div>
                      <p className="text-xs text-gray-400 mb-1">{new Date(n.fecha).toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                      <p className="font-semibold text-navy-900">{n.titulo}</p>
                      {n.descripcion && <p className="text-sm text-gray-500 mt-1">{n.descripcion}</p>}
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button onClick={() => { setEditando(n); setModalOpen(true) }} className="text-gray-400 hover:text-navy-800 transition-colors">
                        <Pencil size={16} />
                      </button>
                      <button onClick={() => handleDelete(n.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Consultas */}
        {tab === 'consultas' && (
          <div>
            <h2 className="text-xl font-bold font-serif text-navy-900 mb-6">Consultas recibidas</h2>
            {consultas.length === 0 ? (
              <p className="text-gray-400 text-sm text-center py-12">No hay consultas aún.</p>
            ) : (
              <div className="flex flex-col gap-3">
                {consultas.map(c => (
                  <div key={c.id} className={`bg-white border rounded-xl p-4 ${!c.leida ? 'border-navy-700' : 'border-gray-200'}`}>
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-navy-900">{c.nombre}</p>
                        <p className="text-sm text-gray-400">{c.email}</p>
                        <p className="text-sm text-gray-600 mt-2">{c.mensaje}</p>
                      </div>
                      <div className="flex flex-col items-end gap-2 ml-4">
                        <p className="text-xs text-gray-400">{new Date(c.created_at).toLocaleDateString('es-AR')}</p>
                        {!c.leida && (
                          <button onClick={() => handleMarcarLeida(c.id)}
                            className="text-xs text-navy-800 border border-navy-800 rounded-lg px-2 py-1 hover:bg-navy-800 hover:text-white transition-colors">
                            Marcar leída
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <NoticiaModal
          noticia={editando}
          onClose={() => setModalOpen(false)}
          onSave={fetchNoticias}
        />
      )}
    </div>
  )
}

// ─── Admin page ───────────────────────────────────────────────────────────────
const Admin = () => {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null)
      setLoading(false)
    })
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  if (loading) return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><p className="text-gray-400">Cargando...</p></div>

  if (!user) return <LoginView onLogin={() => supabase.auth.getUser().then(({ data }) => setUser(data.user))} />

  return <PanelView onLogout={handleLogout} userEmail={user.email} />
}

export default Admin