import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info } from "lucide-react";
import bgTextura from "../assets/imagens/bg-textura.png";
export default function Formulario() {
  const [form, setForm] = useState({
    organizadorNome: "",
    organizadorEmail: "",
    data: "",
    hora: "",
    tipo: "",
    convidados: "",
    tema: "",
    temaPersonalizado: "",
    mensagem: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [resumo, setResumo] = useState(null);
  const [convidados, setConvidados] = useState([]);
  const [inputConvidado, setInputConvidado] = useState("");
  const [pagamentoConfirmado, setPagamentoConfirmado] = useState(false);
  const [resumoValores, setResumoValores] = useState(null);

  const valoresPorConvidado = 120;
  const temas = {
    "balada neon": 1200,
    "anos 80": 1500,
    tropical: 1400,
    masquerade: 1800,
    luxo: 2500,
    personalizado: 3500,
  };

  function calcularPreco() {
    const lista = form.convidados
      .split(",")
      .map((e) => e.trim())
      .filter((e) => e);
    const count = lista.length;
    const hoje = new Date();
    const dataEvento = new Date(form.data);
    const dias = (dataEvento - hoje) / (1000 * 60 * 60 * 24);
    const urg = dias <= 15 ? 300 : 0;
    const precoTema = temas[form.tema] || 0;
    const total = count * valoresPorConvidado + precoTema + urg;
    return {
      convidados: count,
      precoPorConvidado: count * valoresPorConvidado,
      precoTema,
      acrescimoUrgencia: urg,
      total,
    };
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function enviarAgendamento() {
    const emailsValidos = convidados
      .map((email) => email.trim())
      .filter((email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));

    if (emailsValidos.length === 0) {
      alert("Adicione ao menos 1 e-mail válido");
      return;
    }

    const count = emailsValidos.length;
    const precoTema = temas[form.tema] || 0;
    const hoje = new Date();
    const dataEvento = new Date(form.data);
    const dias = (dataEvento - hoje) / (1000 * 60 * 60 * 24);
    const urg = dias <= 15 ? 300 : 0;
    const total = count * valoresPorConvidado + precoTema + urg;

    const resumoValores = {
      convidados: count,
      precoPorConvidado: count * valoresPorConvidado,
      precoTema,
      acrescimoUrgencia: urg,
      total,
    };

    const payload = {
      nome: form.organizadorNome,
      organizadorEmail: form.organizadorEmail,
      data: form.data,
      horario: form.hora,
      tipo: form.tipo,
      info: form.mensagem,
      tema: form.tema === "personalizado" ? form.temaPersonalizado : form.tema,
      convidados: emailsValidos.map((email) => ({ nome: "", email })),
    };

    const res = await fetch("http://localhost:3000/agendamento", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));
    if (!data.token) {
      alert("Erro ao agendar. Verifique os dados e tente novamente.");
      return;
    }

    setResumo({ ...resumoValores, token: data.token });
    setShowModal(true);
  }

  async function handleSubmitFake() {
    const payload = {
      nome: form.organizadorNome,
      organizadorEmail: form.organizadorEmail,
      data: form.data,
      horario: form.hora,
      tipo: form.tipo,
      info: form.mensagem,
      tema: form.tema === "personalizado" ? form.temaPersonalizado : form.tema,
      convidados: convidados.map((email) => ({
        nome: "",
        email: email.trim(),
      })),
    };

    const res = await fetch("http://localhost:3000/agendamento", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));
    if (!data.token) {
      alert("Erro ao agendar");
      return;
    }

    setResumo({ ...resumoValores, token: data.token });
  }

  return (
    <div
      className="min-h-screen bg-center bg-cover py-12 px-4 md:px-8"
      style={{ backgroundImage: `url(${bgTextura})` }}
    >
      <section className="max-w-3xl mx-auto bg-white shadow-2xl rounded-3xl p-8 relative overflow-hidden border border-blue-100">
        <h2 className="text-center text-4xl font-extrabold text-blue-950 mb-8">
          Verifique os Valores ✨
        </h2>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                required
                className="block text-sm font-medium text-blue-900 mb-1"
              >
                Nome do Organizador
              </label>
              <input
                type="text"
                name="organizadorNome"
                value={form.organizadorNome}
                onChange={handleChange}
                className="w-full border border-blue-100 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-950"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">
                E-mail do Organizador
              </label>
              <input
                type="email"
                name="organizadorEmail"
                value={form.organizadorEmail}
                onChange={handleChange}
                className="w-full border border-blue-100 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-950"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">
                Data do Evento
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
                Horário
              </label>
              <input
                type="time"
                name="hora"
                value={form.hora}
                onChange={handleChange}
                className="w-full border border-blue-100 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-950"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">
                Tipo de Evento
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
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-blue-900">
                E-mails dos Convidados
              </label>
              <div className="border border-blue-100 rounded-xl p-2 max-h-32 overflow-y-auto">
                <div className="flex flex-wrap gap-2">
                  {convidados.map((email, i) => (
                    <span
                      key={i}
                      className="w-full md:w-auto flex items-center gap-2 bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-sm"
                    >
                      {email}
                      <button
                        type="button"
                        onClick={() =>
                          setConvidados(
                            convidados.filter((_, idx) => idx !== i)
                          )
                        }
                        className="text-blue-800 hover:text-blue-950"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  <input
                    type="email"
                    placeholder="Digite e pressione Enter"
                    className="flex-1 border-none outline-none bg-transparent text-sm min-w-[180px]"
                    value={inputConvidado}
                    onChange={(e) => setInputConvidado(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === ",") {
                        e.preventDefault();
                        const email = inputConvidado.trim();
                        if (email && !convidados.includes(email)) {
                          setConvidados([...convidados, email]);
                          setInputConvidado("");
                        }
                      }
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-blue-900">
                Tema da Festa
              </label>
              <select
                name="tema"
                value={form.tema}
                onChange={handleChange}
                className="w-full border border-blue-100 rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-950"
                required
              >
                <option value="">Escolha um tema</option>
                {Object.keys(temas).map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>

              <AnimatePresence mode="wait">
                {form.tema === "personalizado" && (
                  <motion.div
                    key="temaInput"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <input
                      type="text"
                      name="temaPersonalizado"
                      value={form.temaPersonalizado}
                      onChange={handleChange}
                      placeholder="Descreva seu tema"
                      className="mt-2 w-full border border-blue-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-950"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-900 mb-1">
              Recado aos Convidados
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
              type="button"
              onClick={() => {
                const camposObrigatorios = [
                  form.organizadorNome,
                  form.organizadorEmail,
                  form.data,
                  form.hora,
                  form.tipo,
                  form.tema,
                  form.tema === "personalizado" ? form.temaPersonalizado : "ok",
                  convidados.length > 0 ? "ok" : "",
                ];

                const tudoPreenchido = camposObrigatorios.every(Boolean);

                if (!tudoPreenchido) {
                  alert(
                    "Preencha todos os campos antes de verificar os valores."
                  );
                  return;
                }

                const resumo = calcularPreco();
                setResumoValores(resumo);
                setShowModal(true);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full md:w-auto bg-blue-950 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:bg-blue-900 transition"
            >
              Verificar Valores
            </motion.button>

            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="text-sm text-blue-800 hover:underline flex items-center gap-1"
            >
              <Info className="w-4 h-4" />
              Ver tabela de preços
            </button>
          </div>
        </form>
        {showModal && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50"
            onClick={() => {
              setShowModal(false);
              setResumo(null);
              setResumoValores(null);
              setPagamentoConfirmado(false);
            }}
          >
            <div
              className="relative w-[90%] max-w-xl bg-gradient-to-br from-blue-950 to-blue-800 text-white rounded-2xl shadow-2xl border border-blue-700 p-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* MODAL DE DETALHES APÓS PAGAMENTO */}
              {pagamentoConfirmado && resumo && (
                <>
                  <h3 className="text-2xl font-bold mb-6 text-center">
                    🎉 Detalhes do Evento
                  </h3>
                  <ul className="space-y-3 text-sm leading-relaxed">
                    <li>
                      <span className="font-semibold text-blue-200">
                        👤 Organizador:
                      </span>{" "}
                      {form.organizadorNome}
                    </li>
                    <li>
                      <span className="font-semibold text-blue-200">
                        📧 Email:
                      </span>{" "}
                      {form.organizadorEmail}
                    </li>
                    <li>
                      <span className="font-semibold text-blue-200">
                        📅 Data:
                      </span>{" "}
                      {form.data}
                    </li>
                    <li>
                      <span className="font-semibold text-blue-200">
                        ⏰ Horário:
                      </span>{" "}
                      {form.hora}
                    </li>
                    <li>
                      <span className="font-semibold text-blue-200">
                        🎯 Tipo:
                      </span>{" "}
                      {form.tipo}
                    </li>
                    <li>
                      <span className="font-semibold text-blue-200">
                        👥 Convidados:
                      </span>{" "}
                      {resumo.convidados} (R$ {resumo.precoPorConvidado})
                    </li>
                    <li>
                      <span className="font-semibold text-blue-200">
                        🎨 Tema:
                      </span>{" "}
                      {form.tema === "personalizado"
                        ? form.temaPersonalizado
                        : form.tema}{" "}
                      (R$ {resumo.precoTema})
                    </li>
                    {resumo.acrescimoUrgencia > 0 && (
                      <li>
                        <span className="font-semibold text-blue-200">
                          ⚡ Urgência:
                        </span>{" "}
                        +R$ {resumo.acrescimoUrgencia}
                      </li>
                    )}
                    <li className="text-lg font-bold text-blue-100 border-t border-blue-600 pt-3">
                      💰 Total:{" "}
                      <span className="text-white">R$ {resumo.total}</span>
                    </li>
                    <li className="text-xs text-blue-300 italic pt-1">
                      * Token: {resumo.token}
                    </li>
                  </ul>
                  <button
                    onClick={() => {
                      setShowModal(false);
                      setResumo(null);
                      setPagamentoConfirmado(false);
                    }}
                    className="mt-6 w-full bg-white text-blue-950 font-semibold py-2 px-4 rounded-xl hover:bg-blue-100 transition"
                  >
                    Fechar
                  </button>
                </>
              )}

              {/* MODAL DE SIMULAÇÃO DE PAGAMENTO */}
              {!pagamentoConfirmado && resumoValores && (
                <>
                  <h3 className="text-3xl font-bold text-center text-white mb-6">
                    💳 Pagamento
                  </h3>

                  <div className="bg-white/10 p-4 rounded-xl space-y-3 border border-blue-700">
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-200">Tema:</span>
                      <span className="font-medium text-white">
                        {form.tema}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-200">Convidados:</span>
                      <span className="font-medium text-white">
                        {convidados.length}
                      </span>
                    </div>
                    <div className="flex justify-between text-base font-bold border-t border-blue-700 pt-3">
                      <span className="text-blue-100">Total:</span>
                      <span className="text-white">
                        R$ {resumoValores.total}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={async () => {
                      await enviarAgendamento();
                      setPagamentoConfirmado(true);
                    }}
                    className="mt-6 w-full bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:opacity-90 transition"
                  >
                    💰 Pagar agora
                  </button>
                </>
              )}

              {/* MODAL TABELA DE PREÇOS */}
              {!resumoValores && (
                <>
                  <h3 className="text-2xl font-bold mb-6 text-center">
                    📊 Tabela de Preços
                  </h3>
                  <ul className="space-y-3 text-sm leading-relaxed">
                    <li>
                      <span className="font-semibold text-blue-200">
                        👥 Valor por convidado:
                      </span>{" "}
                      R$ {valoresPorConvidado}
                    </li>
                    <li>
                      <span className="font-semibold text-blue-200">
                        🎨 Temas disponíveis:
                      </span>
                      <ul className="ml-4 mt-2 space-y-1 list-disc list-inside text-blue-100">
                        {Object.entries(temas).map(([t, v]) => (
                          <li key={t} className="capitalize">
                            {t}: R$ {v}
                          </li>
                        ))}
                      </ul>
                    </li>
                    <li className="pt-3">
                      <span className="font-semibold text-blue-200">
                        ⚡ Urgência:
                      </span>{" "}
                      Eventos com menos de 15 dias +R$ 300
                    </li>
                  </ul>
                  <p className="text-xs text-blue-300 italic mt-4">
                    * Os valores simulados são estimativas.
                  </p>
                  <button
                    onClick={() => {
                      setShowModal(false);
                      setResumo(null);
                      setResumoValores(null);
                      setPagamentoConfirmado(false);
                    }}
                    className="mt-6 w-full bg-white text-blue-950 font-semibold py-2 px-4 rounded-xl hover:bg-blue-100 transition"
                  >
                    Fechar
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
