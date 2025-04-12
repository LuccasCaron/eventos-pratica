import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import bgTextura from "../assets/imagens/bg-textura.png";
import { FaTrashAlt } from "react-icons/fa";

export default function Agendamento() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const protocolo = searchParams.get("protocolo");
  const [inputProtocolo, setInputProtocolo] = useState("");
  const [buscarClicado, setBuscarClicado] = useState(false);

  const agendamentos = {
    1234: {
      data: "2025-06-22",
      horario: "19:00",
      convidadosPermitidos: 150,
      convidados: [
        { nome: "Ana Souza", confirmado: true },
        { nome: "Carlos Lima", confirmado: false },
        { nome: "Marina Dias", confirmado: true },
        { nome: "João Mendes", confirmado: true },
        { nome: "Lucas Freitas", confirmado: false },
      ],
    },
    5678: {
      data: "2025-07-15",
      horario: "21:30",
      convidadosPermitidos: 100,
      convidados: [
        { nome: "Fernanda Alves", confirmado: true },
        { nome: "Bruno Rocha", confirmado: true },
        { nome: "Isabela Torres", confirmado: false },
        { nome: "Diego Martins", confirmado: false },
        { nome: "Clara Silva", confirmado: true },
      ],
    },
  };

  const agendamento = agendamentos[protocolo];
  const [confirmados, setConfirmados] = useState(0);

  useEffect(() => {
    if (!agendamento) return;

    const totalConfirmados = agendamento.convidados.filter(
      (c) => c.confirmado
    ).length;

    setConfirmados(totalConfirmados);
  }, [agendamento]);

  function handleBuscar() {
    if (inputProtocolo.trim() !== "") {
      navigate(`?protocolo=${inputProtocolo.trim()}`);
      setBuscarClicado(true);
    }
  }

  function handleLimpar() {
    setInputProtocolo("");
    navigate("?");
    setBuscarClicado(false);
  }

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
            onChange={(e) => setInputProtocolo(e.target.value)}
            className="w-full sm:w-auto px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
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

        {buscarClicado && !agendamento && inputProtocolo.trim() !== "" && (
          <p className="text-center text-blue-950 text-xl font-medium mb-6">
            Agendamento não encontrado.
          </p>
        )}

        {agendamento && (
          <>
            <div className="bg-white shadow-xl rounded-2xl p-6 mb-8 border border-gray-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
                <p>
                  <span className="font-medium">Data:</span> {agendamento.data}
                </p>
                <p>
                  <span className="font-medium">Horário:</span>{" "}
                  {agendamento.horario}
                </p>
                <p>
                  <span className="font-medium">Convidados Permitidos:</span>{" "}
                  {agendamento.convidadosPermitidos}
                </p>
                <p>
                  <span className="font-medium">Convidados Confirmados:</span>{" "}
                  <span className="text-green-600 font-semibold">
                    {confirmados}
                  </span>
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
                      c.confirmado
                        ? "bg-green-50 border border-green-200"
                        : "bg-red-50 border border-red-200"
                    }`}
                  >
                    <span className="font-medium">{c.nome}</span>
                    <span
                      className={`text-sm font-semibold uppercase tracking-wide ${
                        c.confirmado ? "text-green-700" : "text-red-700"
                      }`}
                    >
                      {c.confirmado ? "Confirmado" : "Pendente"}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
