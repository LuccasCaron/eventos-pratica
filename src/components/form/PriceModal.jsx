// src/components/form/PriceModal.jsx
import React from "react"

export default function PriceModal({ show, resumo, onClose, valoresPorConvidado, temas, form, guests }) {
  if (!show) return null

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="relative w-[90%] max-w-xl max-h-[80vh] bg-gradient-to-br from-blue-950 to-blue-800 text-white rounded-2xl shadow-2xl border border-blue-700 p-6 flex flex-col">
        
        {resumo ? (
          <>
            <h3 className="text-2xl font-bold mb-4 text-center">🎉 Detalhes do Evento</h3>
            <div className="flex-1 overflow-y-auto space-y-3 text-sm leading-relaxed pr-2">
              <p>Organizador: {form.nome} ({form.email})</p>
              {guests.map((g,i)=>(
                <p key={i}>Convidado {i+1}: {g.email}</p>
              ))}
              <p>Data: {form.data}</p>
              <p>Horário: {form.hora}</p>
              <p>Tipo: {form.tipo}</p>
              <p>Por convidado: R$ {resumo.precoPorConvidado}</p>
              <p>Tema: {form.tema === "personalizado" ? form.temaPersonalizado : form.tema} (R$ {resumo.temaPrice})</p>
              {resumo.urg > 0 && <p>Urgência: +R$ {resumo.urg}</p>}
            </div>
            <div className="border-t border-blue-600 mt-4 pt-4">
              <p className="text-lg font-bold">Total: R$ {resumo.total}</p>
            </div>
          </>
        ) : (
          <>
            <h3 className="text-2xl font-bold mb-4 text-center">📊 Tabela de Preços</h3>
            <div className="flex-1 overflow-y-auto space-y-2 text-sm leading-relaxed pr-2">
              <p>Valor por convidado: R$ {valoresPorConvidado}</p>
              <p>Temas:</p>
              <ul className="ml-4 list-disc list-inside">
                {Object.entries(temas).map(([t,v])=>(
                  <li key={t} className="capitalize">{t}: R$ {v}</li>
                ))}
              </ul>
              <p>Urgência: Eventos &lt; 15 dias +R$ 300</p>
            </div>
          </>
        )}

        <button
          onClick={onClose}
          className="mt-6 w-full bg-white text-blue-950 font-semibold py-3 rounded-xl hover:bg-blue-100 transition"
        >
          Fechar
        </button>
      </div>
    </div>
  )
}
