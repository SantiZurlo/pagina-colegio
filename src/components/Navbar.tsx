import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const links = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Noticias', href: '#noticias' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Contacto', href: '#contacto' },
]

const Navbar = () => {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-navy-800 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Logo + Nombre */}
        <div className="flex items-center gap-3">
          <img src="/src/assets/logo.png" alt="Logo" className="h-10 w-10 object-contain" />
          <span className="text-white font-serif text-sm font-semibold leading-tight">
            Instituto Nuestra Señora de Luján de San José de Flores
          </span>
        </div>

        {/* Links desktop */}
        <ul className="hidden md:flex items-center gap-8 ml-8 shrink-0">
          {links.map(link => (
            <li key={link.href}>
              <a href={link.href} className="text-white hover:text-gray-300 text-sm transition-colors">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Burger mobile */}
        <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Menú mobile */}
      {open && (
        <div className="md:hidden bg-navy-800 border-t border-navy-700 px-4 py-3">
          <ul className="flex flex-col gap-4">
            {links.map(link => (
              <li key={link.href}>
                <a href={link.href} className="text-white hover:text-gray-300 text-sm" onClick={() => setOpen(false)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  )
}

export default Navbar