import { Star } from "lucide-react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"

export default function TemasMaisPedidos() {
  const navigate = useNavigate()

  const temas = [
    {
      titulo: "Festa de Halloween",
      desc: "Decoração assustadora, iluminação sombria e experiências imersivas de arrepiar.",
    },
    {
      titulo: "Festas Temáticas – Anos 80",
      desc: "Cenografia neon, playlists retrô e figurinos icônicos pra reviver a década.",
    },
    {
      titulo: "Casamentos ao Ar Livre",
      desc: "Ambientes naturais, luzes aconchegantes e estrutura para cerimônias externas.",
    },
  ]

  return (
    <motion.div
      className="mt-16"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <h3 className="text-2xl font-bold text-blue-950 text-center mb-6">
        Temas Mais Pedidos do Mês
      </h3>

      <div className="grid md:grid-cols-3 gap-6">
        {temas.map((tema, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-md text-center"
          >
            <div className="flex justify-center items-center gap-2 mb-3">
              <Star size={20} className="text-yellow-400" />
              <h4 className="font-semibold text-blue-950">{tema.titulo}</h4>
            </div>
            <p className="text-gray-700 text-sm">{tema.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={() => navigate("/formulario")}
          className="bg-blue-950 text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-blue-900 transition"
        >
          Quero esse tema
        </button>
      </div>
    </motion.div>
  )
}
