export type Noticia = {
  id: string
  titulo: string
  descripcion: string
  fecha: string
  imagen_url: string | null
  created_at: string
}

export type Consulta = {
  id: string
  nombre: string
  email: string
  mensaje: string
  leida: boolean
  created_at: string
}