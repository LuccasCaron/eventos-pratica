import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Info } from "lucide-react";
import bgTextura from "../assets/imagens/bg-textura.png";

export default function Mimaqui() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    data: "",
    tipo: "",
    convidados: "",
    tema: "",
    temaPersonalizado: "",
    mensagem: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [resumo, setResumo] = useState(null);

  const valoresPorConvidado = 20;
  const temas = {
    "balada neon": 500,
    "anos 80": 600,
    tropical: 550,
    masquerade: 700,
    luxo: 800,
    personalizado: 1000,
  };

  function calcularPreco() {
    const convidados = parseInt(form.convidados) || 0;
    const hoje = new Date();
    const dataEvento = new Date(form.data);
    const diasParaEvento = (dataEvento - hoje) / (1000 * 60 * 60 * 24);
    const acrescimoUrgencia = diasParaEvento <= 15 ? 300 : 0;
    const precoTema = temas[form.tema] || 0;
    const total =
      convidados * valoresPorConvidado + precoTema + acrescimoUrgencia;

    return {
      convidados,
      precoPorConvidado: convidados * valoresPorConvidado,
      precoTema,
      acrescimoUrgencia,
      total,
    };
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const resumoValores = calcularPreco();
    setResumo(resumoValores);
    setShowModal(true);
  }

  return (
    <div
      className="min-h-screen bg-center bg-cover py-12 px-4 md:px-8"
      style={{ backgroundImage: `url(${bgTextura})` }}
    >
      <section className="max-w-3xl mx-auto bg-white shadow-2xl rounded-3xl p-8 relative overflow-hidden border border-blue-100">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute -top-4 -right-4 text-blue-950 opacity-20 text-8xl pointer-events-none"
        >
          <Sparkles className="w-24 h-24 animate-pulse" />
        </motion.div>

        <h2 className="text-center text-4xl font-extrabold text-blue-950 mb-8">
          Verifique os Valores ✨
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">
                Nome completo
              </label>
              <input
                type="text"
                name="nome"
                value={form.nome}
                onChange={handleChange}
                className="w-full border border-blue-100 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-950"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">
                E-mail
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border border-blue-100 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-950"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">
                Data do evento
              </label>
              <input
                type="date"
                name="data"
                value={form.data}
                onChange={handleChange}
                className="w-full border border-blue-100 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-950"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">
                Tipo de evento
              </label>
              <select
                name="tipo"
                value={form.tipo}
                onChange={handleChange}
                className="w-full border border-blue-100 rounded-xl px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-950"
                required
              >
                <option value="">Selecione</option>
                <option value="casamento">Casamento</option>
                <option value="aniversario">Aniversário</option>
                <option value="formatura">Formatura</option>
                <option value="corporativo">Corporativo</option>
                <option value="outro">Outro</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">
                Quantidade de convidados
              </label>
              <input
                type="number"
                name="convidados"
                value={form.convidados}
                onChange={handleChange}
                className="w-full border border-blue-100 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-950"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">
                Tema da festa
              </label>
              <select
                name="tema"
                value={form.tema}
                onChange={handleChange}
                className="w-full border border-blue-100 rounded-xl px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-950"
                required
              >
                <option value="">Escolha um tema</option>
                {Object.keys(temas).map((tema) => (
                  <option key={tema} value={tema}>
                    {tema}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {form.tema === "personalizado" && (
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">
                Descreva seu tema
              </label>
              <input
                type="text"
                name="temaPersonalizado"
                placeholder="Ex: Festa futurista com robôs dançantes e LED por todo lado"
                value={form.temaPersonalizado}
                onChange={handleChange}
                className="w-full border border-blue-100 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-950"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-blue-900 mb-1">
              Mensagem adicional
            </label>
            <textarea
              name="mensagem"
              value={form.mensagem}
              onChange={handleChange}
              className="w-full border border-blue-100 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-950"
              rows="3"
            />
          </div>

          <div className="flex flex-col gap-4 md:flex-row md:justify-between items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full md:w-auto bg-blue-950 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:bg-blue-900 transition"
            >
              Verificar Valores
            </motion.button>

            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="text-sm text-blue-800 hover:underline flex items-center gap-1"
            >
              <Info className="w-4 h-4" /> Ver tabela de preços
            </button>
          </div>
        </form>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
            <div
              className="bg-white p-6 rounded-2xl shadow-xl w-[90%] max-w-xl backdrop-blur-lg"
              style={{
                backgroundImage: `url(${bgTextura})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundColor: "rgba(255, 255, 255, 0.6)", // Fundo mais claro
              }}
            >
              {resumo ? (
                <div>
                  <h3 className="text-lg font-semibold text-blue-950 mb-4">
                    Resumo da Simulação
                  </h3>
                  <ul className="text-sm space-y-2">
                    <li>
                      <span className="font-semibold text-blue-950">Nome:</span>{" "}
                      <span className="text-blue-600">{form.nome}</span>
                    </li>
                    <li>
                      <span className="font-semibold text-blue-950">
                        Email:
                      </span>{" "}
                      <span className="text-blue-600">{form.email}</span>
                    </li>
                    <li>
                      <span className="font-semibold text-blue-950">
                        Data do Evento:
                      </span>{" "}
                      <span className="text-blue-600">{form.data}</span>
                    </li>
                    <li>
                      <span className="font-semibold text-blue-950">
                        Tipo de Evento:
                      </span>{" "}
                      <span className="text-blue-600">{form.tipo}</span>
                    </li>
                    <li>
                      <span className="font-semibold text-blue-950">
                        Convidados:
                      </span>{" "}
                      <span className="text-blue-600">
                        {resumo.convidados} (R$ {resumo.precoPorConvidado})
                      </span>
                    </li>
                    <li>
                      <span className="font-semibold text-blue-950">Tema:</span>{" "}
                      <span className="text-blue-600">
                        {form.tema} (R$ {resumo.precoTema})
                      </span>
                    </li>
                    {resumo.acrescimoUrgencia > 0 && (
                      <li>
                        <span className="font-semibold text-blue-950">
                          Urgência:
                        </span>{" "}
                        <span className="text-blue-600">
                          +R$ {resumo.acrescimoUrgencia}
                        </span>
                      </li>
                    )}
                    <li className="font-bold text-blue-950 mt-2">
                      <span className="font-semibold">Total estimado:</span>{" "}
                      <span className="text-blue-600">R$ {resumo.total}</span>
                    </li>
                    <li className="text-xs text-blue-600 italic">
                      * Serviços adicionais não estão inclusos neste valor.
                    </li>
                  </ul>
                </div>
              ) : (
                <div>
                  <h3 className="text-lg font-semibold text-blue-950 mb-4">
                    Tabela de Preços
                  </h3>
                  <ul className="text-sm space-y-2">
                    <li>
                      <span className="font-semibold text-blue-950">
                        Convidado:
                      </span>{" "}
                      <span className="text-blue-600">
                        R$ {valoresPorConvidado} por pessoa
                      </span>
                    </li>
                    <h4 className="font-semibold text-blue-950">Temas:</h4>
                    {Object.entries(temas).map(([tema, valor]) => (
                      <li key={tema}>
                        <span className="font-semibold text-blue-950">
                          {tema}:
                        </span>{" "}
                        <span className="text-blue-600">R$ {valor}</span>
                      </li>
                    ))}
                    <li className="font-semibold text-blue-950">
                      <span className="font-semibold">
                        Urgência (evento em até 15 dias):
                      </span>{" "}
                      <span className="text-blue-600">+R$ 300</span>
                    </li>
                    <h4 className="font-semibold text-blue-950 mt-4">
                      Personalizado:
                    </h4>
                    <p className="font-semibold text-blue-950">R$ 1000</p>
                  </ul>
                </div>
              )}
              <button
                onClick={() => {
                  setShowModal(false);
                  setResumo(null);
                }}
                className="mt-6 bg-blue-950 text-white py-2 px-4 rounded-xl hover:bg-blue-900"
              >
                Fechar
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
