import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ConfirmacaoConvidado() {
  const { convidadoId } = useParams();
  const [status, setStatus] = useState("carregando");
  const [agendamento, setAgendamento] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function confirmar() {
      try {
        const res = await fetch(
          `http://localhost:3000/confirmar/${convidadoId}`,
          {
            method: "POST",
          }
        );

        const data = await res.json();

        if (!res.ok) throw new Error(data.error);

        if (isMounted) {
          setAgendamento(data.agendamento || data);
          setStatus(data.jaConfirmado ? "ja_confirmado" : "confirmado");
        }
      } catch (err) {
        if (!isMounted) return;

        if (err.message === "Presença já confirmada") {
          setStatus("ja_confirmado");
        } else if (err.message === "Convidado não encontrado") {
          setStatus("nao_encontrado");
        } else {
          setStatus("erro");
        }
      }
    }

    confirmar();

    return () => {
      isMounted = false;
    };
  }, [convidadoId]);

  if (status === "carregando") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-50">
        <p className="text-blue-800 text-xl font-semibold animate-pulse">
          Confirmando sua presença...
        </p>
      </div>
    );
  }

  if (status === "erro") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-700 mb-2">
            Erro ao confirmar
          </h1>
          <p className="text-red-600">
            Tente novamente mais tarde ou entre em contato com o organizador.
          </p>
        </div>
      </div>
    );
  }

  if (status === "nao_encontrado") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50 px-4">
        <div className="bg-white border border-red-300 rounded-3xl p-8 shadow-xl text-center max-w-md">
          <h1 className="text-3xl font-bold text-red-700 mb-4">
            Convidado não encontrado
          </h1>
          <p className="text-red-800">
            O link pode estar incorreto ou expirado.
          </p>
        </div>
      </div>
    );
  }

  if (status === "ja_confirmado") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-yellow-50 px-4">
        <div className="bg-white border border-yellow-300 rounded-3xl p-8 shadow-xl text-center max-w-md">
          <h1 className="text-3xl font-bold text-yellow-700 mb-4">
            ✅ Já confirmado
          </h1>
          <p className="text-yellow-800">
            Sua presença neste evento já foi confirmada anteriormente.
          </p>
          <p className="text-sm text-gray-600 mt-4">
            Dúvidas? Fale com o organizador.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
      <div className="bg-white border border-green-200 rounded-3xl p-8 shadow-xl text-center max-w-md">
        <h1 className="text-3xl font-bold text-green-700 mb-4">
          🎉 Presença Confirmada!
        </h1>
        <p className="text-green-800 mb-3">
          Sua confirmação foi registrada com sucesso. <br />
          Evento: <span className="font-semibold">{agendamento.tema}</span>
        </p>
        <p className="text-sm text-gray-600">
          Qualquer dúvida, entre em contato com seu organizador: <br />
          <span className="font-semibold">{agendamento.organizadorEmail}</span>
        </p>
      </div>
    </div>
  );
}
