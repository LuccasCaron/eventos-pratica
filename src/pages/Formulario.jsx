import { useState } from "react";

export default function Formulario() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    data: "",
    tipo: "",
    mensagem: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Dados enviados:", form);
    alert("Solicitação enviada com sucesso!");
  }

  return (
    <section className="px-4 md:px-12 py-8 max-w-xl mx-auto">
      <h2 className="text-3xl font-bold text-blue-950 mb-6 text-center">
        Solicite seu orçamento
      </h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl p-6 space-y-4 border border-gray-200"
      >
        <div>
          <label className="block mb-1 text-sm font-semibold text-[#0f172a]">
            Nome completo
          </label>
          <input
            type="text"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-semibold text-[#0f172a]">
            E-mail
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-semibold text-[#0f172a]">
            Data do evento
          </label>
          <input
            type="date"
            name="data"
            value={form.data}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-semibold text-[#0f172a]">
            Tipo de evento
          </label>
          <select
            name="tipo"
            value={form.tipo}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
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

        <div>
          <label className="block mb-1 text-sm font-semibold text-[#0f172a]">
            Mensagem adicional
          </label>
          <textarea
            name="mensagem"
            value={form.mensagem}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            rows="3"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#0f172a] text-white font-semibold py-2 rounded-lg hover:bg-cyan-700 transition"
        >
          Enviar solicitação
        </button>
      </form>
    </section>
  );
}
