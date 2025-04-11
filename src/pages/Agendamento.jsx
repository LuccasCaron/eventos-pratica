import { useEffect, useState } from 'react'

export default function Agendamento() {
  const agendamento = {
    data: '2025-06-22',
    horario: '19:00',
    convidadosPermitidos: 150,
    convidados: [
      { nome: 'Ana Souza', confirmado: true },
      { nome: 'Carlos Lima', confirmado: false },
      { nome: 'Marina Dias', confirmado: true },
      { nome: 'João Mendes', confirmado: true },
      { nome: 'Lucas Freitas', confirmado: false },
    ],
  }

  const [confirmados, setConfirmados] = useState(0)

  useEffect(() => {
    let count = 0
    const totalConfirmados = agendamento.convidados.filter(c => c.confirmado).length
    const interval = setInterval(() => {
      count++
      if (count > totalConfirmados) {
        clearInterval(interval)
      } else {
        setConfirmados(count)
      }
    }, 100)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="px-4 md:px-12 py-8 max-w-3xl mx-auto">
       <h2 className="text-3xl font-bold text-cyan-600 mb-6 text-center">Detalhes do Agendamento</h2>

       <div className="bg-white shadow-xl rounded-2xl p-6 mb-8 border border-gray-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
          <p><span className="font-medium">Data:</span> {agendamento.data}</p>
          <p><span className="font-medium">Horário:</span> {agendamento.horario}</p>
          <p><span className="font-medium">Convidados Permitidos:</span> {agendamento.convidadosPermitidos}</p>
          <p><span className="font-medium">Convidados Confirmados:</span> <span className="text-green-600 font-semibold">{confirmados}</span></p>
        </div>
      </div>

      <div className="bg-[#f1f5f9] p-6 rounded-2xl shadow-lg border border-gray-200">
      <h3 className="text-2xl font-semibold text-[#0f172a] mb-4 text-center">Lista de Convidados</h3>

        <ul className="space-y-3">
          {agendamento.convidados.map((c, i) => (
            <li
              key={i}
              className={`flex justify-between items-center px-4 py-3 rounded-xl shadow-md transition-all duration-200 ${
                c.confirmado ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
              }`}
            >
              <span className="font-medium">{c.nome}</span>
              <span
                className={`text-sm font-semibold uppercase tracking-wide ${
                  c.confirmado ? 'text-green-700' : 'text-red-700'
                }`}
              >
                {c.confirmado ? 'Confirmado' : 'Pendente'}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
