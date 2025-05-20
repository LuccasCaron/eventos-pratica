import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import bgTextura from "../assets/imagens/bg-textura.png"
import { FaTrashAlt } from "react-icons/fa"

export default function Agendamento() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const protocolo = searchParams.get("protocolo") || ""
  const [inputProtocolo, setInputProtocolo] = useState("")
  const [buscarClicado, setBuscarClicado] = useState(false)
  const [agendamento, setAgendamento] = useState(null)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!protocolo) return
    setError("")
    fetch(`http://localhost:3000/agendamento/${protocolo}`)
      .then(res => {
        if (!res.ok) throw new Error("Não encontrado")
        return res.json()
      })
      .then(data => setAgendamento(data))
      .catch(() => setAgendamento(null) || setError("Agendamento não encontrado"))
  }, [protocolo])

  function handleBuscar() {
    if (!inputProtocolo.trim()) return
    navigate(`?protocolo=${inputProtocolo.trim()}`)
    setBuscarClicado(true)
  }

  function handleLimpar() {
    setInputProtocolo("")
    navigate("?")
    setBuscarClicado(false)
    setAgendamento(null)
    setError("")
  }

  const confirmados = agendamento
    ? agendamento.convidados.filter(c => c.status === "CONFIRMADO").length
    : 0

  return (
    <div
      className="min-h-screen bg-cover bg-center py-10 px-4"
      style={{ backgroundImage: `url(${bgTextura})` }}
    >
      <section className="px-4 md:px-12 py-8 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-blue-950 mb-6 text-center">
          Buscar Agendamento
        </h2>

        <div className="bg-white rounded-2xl p-6 shadow-md flex flex-col sm:flex-row justify-center items-center gap-4 mb-10">
          <input
            type="text"
            placeholder="Digite o protocolo"
            value={inputProtocolo}
            onChange={e => setInputProtocolo(e.target.value)}
            className="w-full sm:w-auto px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600"
          />
          <button
            onClick={handleBuscar}
            className="bg-blue-950 text-white px-6 py-2 rounded-xl hover:bg-blue-900 transition-all"
          >
            Buscar
          </button>
          <button
            onClick={handleLimpar}
            className="text-gray-600 hover:text-gray-800 transition-all"
          >
            <FaTrashAlt size={24} />
          </button>
        </div>

        {buscarClicado && error && (
          <p className="text-center text-blue-950 text-xl font-medium mb-6">
            {error}
          </p>
        )}

        {agendamento && (
          <>
            <div className="bg-white shadow-xl rounded-2xl p-6 mb-8 border border-gray-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
                <p>
                  <span className="font-medium">Data:</span> {new Date(agendamento.data).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-medium">Horário:</span> {agendamento.horario}
                </p>
                <p>
                  <span className="font-medium">Convidados Confirmados:</span>{" "}
                  <span className="text-green-600 font-semibold">{confirmados}</span>
                </p>
              </div>
            </div>

            <div className="bg-[#f1f5f9] p-6 rounded-2xl shadow-lg border border-gray-200">
              <h3 className="text-2xl font-semibold text-[#0f172a] mb-4 text-center">
                Lista de Convidados
              </h3>

              <ul className="space-y-3">
                {agendamento.convidados.map((c, i) => (
                  <li
                    key={i}
                    className={`flex justify-between items-center px-4 py-3 rounded-xl shadow-md transition-all duration-200 ${
                      c.status === "CONFIRMADO"
                        ? "bg-green-50 border border-green-200"
                        : "bg-red-50 border border-red-200"
                    }`}
                  >
                    <span className="font-medium">{c.nome || c.email}</span>
                    <span
                      className={`text-sm font-semibold uppercase tracking-wide ${
                        c.status === "CONFIRMADO" ? "text-green-700" : "text-red-700"
                      }`}
                    >
                      {c.status === "CONFIRMADO" ? "Confirmado" : "Pendente"}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </section>
    </div>
  )
}
