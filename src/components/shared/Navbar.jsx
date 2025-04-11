import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const links = [
    { to: "/", label: "Início" },
    { to: "/formulario", label: "Formulário" },
    { to: "/agendamento", label: "Agendamento" },
    { to: "/chat", label: "Chat" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-[#0f172a] text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-wide text-cyan-400">
          L&L Festas e Eventos
        </Link>

        <div className="md:hidden">
          <button onClick={toggleMenu} aria-label="Menu">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        <nav className="hidden md:flex gap-8 items-center">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`relative font-medium transition-colors duration-200 ${
                isActive(link.to) ? "text-cyan-400" : "text-white hover:text-cyan-300"
              }`}
            >
              {link.label}
              {isActive(link.to) && (
                <span className="absolute bottom-[-6px] left-0 w-full h-0.5 bg-cyan-400 rounded-full" />
              )}
            </Link>
          ))}
        </nav>
      </div>

      {isOpen && (
        <nav className="md:hidden bg-[#0f172a] px-4 pb-4 space-y-2">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className={`block py-2 px-2 rounded-md transition-colors duration-150 ${
                isActive(link.to) ? "bg-cyan-500 text-white" : "text-white hover:bg-cyan-700"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Navbar;
