export default function Footer() {
  return (
    <footer className="bg-[#0f172a] text-white pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8 text-sm">
        <div>
          <h3 className="text-lg font-semibold mb-4 ">L&L Eventos</h3>
          <p className="text-gray-400">
            Especialistas em tornar seu evento inesquecível. Qualidade,
            compromisso e paixão por realizar.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-4 ">Links</h4>
          <ul className="space-y-2">
            <li>
              <a href="/" className="hover:underline text-gray-300">
                Início
              </a>
            </li>
            <li>
              <a href="/formulario" className="hover:underline text-gray-300">
                Formulário
              </a>
            </li>
            <li>
              <a href="/agendamento" className="hover:underline text-gray-300">
                Agendamento
              </a>
            </li>
            <li>
              <a href="/chat" className="hover:underline text-gray-300">
                Chat
              </a>
            </li>
          </ul>
        </div>

        {/* Contato / redes sociais */}
        <div>
          <h4 className="font-semibold mb-4 ">Contato</h4>
          <p className="text-gray-400">Email: contato@lleventos.com</p>
          <p className="text-gray-400">Telefone: (11) 99999-0000</p>
          <div className="flex gap-4 mt-4">
            <a href="#" className="text-gray-400 hover:text-white">
              Instagram
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              Facebook
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-500 text-xs">
        &copy; 2025 L&L Eventos e Locações. Todos os direitos reservados.
      </div>
    </footer>
  );
}
