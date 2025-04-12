import { useState } from "react";
import bgTextura from "../assets/imagens/bg-textura.png";

const respostas = [
  "Mensagem recebida! Em breve um atendente responderá.",
  "Show! Já estamos verificando isso pra você.",
  "Perfeito, anotado! Vamos dar andamento.",
  "Obrigado pela informação, estamos a caminho de resolver!",
];

const Chat = () => {
  const [messages, setMessages] = useState([
    { sender: "atendente", text: "Olá! Como posso ajudar você hoje?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const novaMensagem = { sender: "user", text: input };
    setMessages((prev) => [...prev, novaMensagem]);
    setInput("");

    setTimeout(() => {
      const respostaAleatoria =
        respostas[Math.floor(Math.random() * respostas.length)];
      setMessages((prev) => [
        ...prev,
        { sender: "atendente", text: respostaAleatoria },
      ]);
    }, 700);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center py-10 px-4"
      style={{ backgroundImage: `url(${bgTextura})` }}
    >
      <div className="flex flex-col h-[calc(100vh-80px)] max-w-3xl mx-auto p-4 bg-white rounded-2xl shadow-lg border border-gray-200">
        <h1 className="text-2xl font-semibold mb-4 text-[#0f172a]">
          Suporte via Chat
        </h1>

        <div className="flex-1 overflow-y-auto space-y-2 p-2 bg-gray-100 rounded-lg">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`max-w-[70%] px-4 py-2 rounded-lg text-sm ${
                msg.sender === "user"
                  ? "bg-cyan-500 text-white self-end ml-auto"
                  : "bg-gray-300 text-gray-800 self-start mr-auto"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-2">
          <input
            type="text"
            className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-950"
            placeholder="Digite sua mensagem..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            className="bg-blue-950 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
