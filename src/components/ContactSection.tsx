import { useState } from 'react'
import { MapPin, Phone, Mail, Send } from 'lucide-react'
import { supabase } from '../lib/supabase'

const ContactSection = () => {
  const [form, setForm] = useState({ nombre: '', email: '', mensaje: '' })
  const [enviado, setEnviado] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.nombre || !form.email || !form.mensaje) {
      setError('Por favor completá todos los campos.')
      return
    }
    setLoading(true)
    setError('')

    const { error } = await supabase.from('consultas').insert({
      nombre: form.nombre,
      email: form.email,
      mensaje: form.mensaje,
    })

    if (error) {
      setError('Hubo un error al enviar el mensaje. Intentá de nuevo.')
    } else {
      setEnviado(true)
      setForm({ nombre: '', email: '', mensaje: '' })
    }
    setLoading(false)
  }

  return (
    <section id="contacto" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">

        <h2 className="text-3xl font-bold font-serif text-navy-900 text-center mb-12">
          Contacto
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* Datos de contacto */}
          <div className="flex flex-col gap-6 justify-center">
            <div className="flex items-start gap-4">
              <div className="bg-navy-800 text-white p-3 rounded-xl">
                <MapPin size={20} />
              </div>
              <div>
                <p className="font-semibold text-navy-900">Dirección</p>
                <p className="text-gray-500 text-sm">Av. Carabobo 967, C1406DGJ Cdad. Autónoma de Buenos Aires</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-navy-800 text-white p-3 rounded-xl">
                <Phone size={20} />
              </div>
              <div>
                <p className="font-semibold text-navy-900">Teléfono</p>
                <p className="text-gray-500 text-sm">+54 11 4631-1989</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-navy-800 text-white p-3 rounded-xl">
                <Mail size={20} />
              </div>
              <div>
                <p className="font-semibold text-navy-900">Email</p>
                <p className="text-gray-500 text-sm">info@institutoacademico.edu.ar</p>
              </div>
            </div>
          </div>

          {/* Formulario */}
          <div className="flex flex-col gap-4">
            {enviado && (
              <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 text-sm">
                ¡Mensaje enviado! Nos pondremos en contacto pronto.
              </div>
            )}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm">
                {error}
              </div>
            )}

            <input
              type="text"
              name="nombre"
              placeholder="Nombre completo"
              value={form.nombre}
              onChange={handleChange}
              className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy-700"
            />
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={form.email}
              onChange={handleChange}
              className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy-700"
            />
            <textarea
              name="mensaje"
              placeholder="Su mensaje"
              rows={5}
              value={form.mensaje}
              onChange={handleChange}
              className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy-700 resize-none"
            />
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-navy-800 text-white rounded-xl px-6 py-3 text-sm font-semibold hover:bg-navy-900 transition-colors flex items-center gap-2 justify-center disabled:opacity-50"
            >
              <Send size={16} />
              {loading ? 'Enviando...' : 'Enviar mensaje'}
            </button>
          </div>

        </div>
      </div>
    </section>
  )
}

export default ContactSection