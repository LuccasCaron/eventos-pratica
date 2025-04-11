import { useState } from "react";

const Chat = () => {
  const [messages, setMessages] = useState([
    { sender: "atendente", text: "Olá! Como posso ajudar você hoje?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessages = [
      ...messages,
      { sender: "user", text: input },
      {
        sender: "atendente",
        text: "Mensagem recebida! Em breve um atendente responderá.",
      },
    ];
    setMessages(newMessages);
    setInput("");
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] max-w-3xl mx-auto mt-4 p-4 bg-white rounded-2xl shadow-lg border border-gray-200">
      <h1 className="text-2xl font-semibold mb-4 text-[#0f172a]">Suporte via Chat</h1>

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
          className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          placeholder="Digite sua mensagem..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2 rounded-full transition"
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

export default Chat;
