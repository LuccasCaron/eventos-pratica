import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "../../assets/imagens/logo2.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const links = [
    { to: "/", label: "Início" },
    { to: "/formulario", label: "Orçamento" },
    { to: "/agendamento", label: "Agendamento" },
    { to: "/chat", label: "Chat" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-[#0f172a] text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/">
          <img src={logo} alt="L&L Festas e Eventos" className="h-14 md:h-18" />
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
                isActive(link.to)
                  ? "text-blue-200"
                  : "text-white hover:text-blue-200"
              }`}
            >
              {link.label}
              {isActive(link.to) && (
                <span className="absolute bottom-[-6px] left-0 w-full h-0.5 bg-blue-200 rounded-full" />
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
                isActive(link.to)
                  ? "bg-blue-900 text-white"
                  : "text-white hover:bg-blue-900"
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
