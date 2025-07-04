import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";
import {
  FaMapMarkedAlt,
  FaUsers,
  FaGlassCheers,
  FaCouch,
} from "react-icons/fa";

import galeria1 from "../assets/imagens/evento1.png";
import galeria2 from "../assets/imagens/evento2.png";
import galeria3 from "../assets/imagens/evento3.png";
import galeria4 from "../assets/imagens/evento4.jpg";
import galeria5 from "../assets/imagens/evento5.jpg";
import galeria6 from "../assets/imagens/evento6.jpg";
import bgTextura from "../assets/imagens/bg-textura.png";
import bilhete from "../assets/imagens/bilhete.png";
import buffet from "../assets/imagens/buffet.png";
import diaNoiva from "../assets/imagens/diaNoiva.png";
import festaCompleto from "../assets/imagens/festaCompleto.png";
import festaPerso from "../assets/imagens/festaPerso.png";
import fotoNoivos from "../assets/imagens/fotoNoivos.png";
import musica from "../assets/imagens/musica.png";
import transporte from "../assets/imagens/transporte.png";
import TemasMaisPedidos from "./TemasMaisPedidos";

export default function Home() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    cssEase: "ease-in-out",
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  const imagens = [galeria1, galeria2, galeria3, galeria4, galeria5, galeria6];

  return (
    <div
      className="min-h-screen bg-center bg-cover"
      style={{ backgroundImage: `url(${bgTextura})` }}
    >
      <section className="px-4 md:px-12 py-8 max-w-screen-xl mx-auto">
        <motion.h2
          className="text-4xl font-bold text-blue-950 mb-6 text-center font-cormorant"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Bem-vindo à L&L Eventos e Locações
        </motion.h2>

        <motion.p
          className="text-center text-gray-700 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Organizamos eventos inesquecíveis e oferecemos espaços incríveis para
          tornar seu momento especial único.
        </motion.p>

        <div className="text-center mb-10">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-950 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-900 transition-all"
          >
            <Link to="/formulario">Solicite um orçamento</Link>{" "}
          </motion.button>
        </div>

        <Slider {...settings}>
          {imagens.map((img, idx) => (
            <div key={idx} className="px-2">
              <img
                src={img}
                alt={`Evento ${idx + 1}`}
                className="rounded-xl shadow-xl h-[300px] w-full object-cover pointer-events-none"
                tabIndex={-1}
              />
            </div>
          ))}
        </Slider>

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <motion.div
            className="bg-[#e2e8f0] p-6 rounded-xl shadow-md"
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-semibold text-blue-950 mb-2 flex items-center">
              <FaMapMarkedAlt className="mr-2" /> Espaços modernos e versáteis
            </h3>
            <p className="text-gray-700">
              Oferecemos ambientes climatizados, com infraestrutura de ponta
              para casamentos, aniversários, formaturas e eventos corporativos.
            </p>
          </motion.div>

          <motion.div
            className="bg-[#e2e8f0] p-6 rounded-xl shadow-md"
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h3 className="text-xl font-semibold text-blue-950 mb-2 flex items-center">
              <FaUsers className="mr-2" /> Equipe especializada
            </h3>
            <p className="text-gray-700">
              Contamos com profissionais experientes que cuidam de todos os
              detalhes, do planejamento à execução do seu evento.
            </p>
          </motion.div>

          <motion.div
            className="bg-[#e2e8f0] p-6 rounded-xl shadow-md"
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h3 className="text-xl font-semibold text-blue-950 mb-2 flex items-center">
              <FaGlassCheers className="mr-2" /> Eventos personalizados
            </h3>
            <p className="text-gray-700">
              Cada detalhe do seu evento é planejado com carinho, desde a
              decoração até a programação.
            </p>
          </motion.div>

          <motion.div
            className="bg-[#e2e8f0] p-6 rounded-xl shadow-md"
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <h3 className="text-xl font-semibold text-blue-950 mb-2 flex items-center">
              <FaCouch className="mr-2" /> Conforto e elegância
            </h3>
            <p className="text-gray-700">
              Ambientes decorados com bom gosto e sofisticação para encantar
              seus convidados.
            </p>
          </motion.div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-blue-950 text-center mb-8">
            Serviços
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              className="service-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={bilhete}
                alt="Convites e Papelaria Personalizada"
                className="w-full h-64 object-cover rounded-lg"
              />
              <h3 className="text-lg font-semibold text-blue-950 mt-4">
                Convites e Papelaria Personalizada
              </h3>
              <p className="text-sm text-gray-700">
                Convites e papelaria criados com detalhes que tornam seu
                casamento único e especial.
              </p>
            </motion.div>

            <motion.div
              className="service-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={buffet}
                alt="Buffet Gourmet"
                className="w-full h-64 object-cover rounded-lg"
              />
              <h3 className="text-lg font-semibold text-blue-950 mt-4">
                Buffet Gourmet
              </h3>
              <p className="text-sm text-gray-700">
                Cardápios elaborados com ingredientes selecionados, oferecendo
                uma experiência gastronômica memorável para os convidados.
              </p>
            </motion.div>

            <motion.div
              className="service-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={diaNoiva}
                alt="Dia da Noiva e do Noivo"
                className="w-full h-64 object-cover rounded-lg"
              />
              <h3 className="text-lg font-semibold text-blue-950 mt-4">
                Dia da Noiva e do Noivo
              </h3>
              <p className="text-sm text-gray-700">
                Momento de preparação e cuidado para os noivos antes do grande
                dia, com serviços de beleza e relaxamento.
              </p>
            </motion.div>

            <motion.div
              className="service-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={festaPerso}
                alt="Decoração Personalizada"
                className="w-full h-64 object-cover rounded-lg"
              />
              <h3 className="text-lg font-semibold text-blue-950 mt-4">
                Decoração Personalizada
              </h3>
              <p className="text-sm text-gray-700">
                Decoração feita sob medida, com detalhes que refletem a
                personalidade dos noivos e criam o ambiente dos sonhos.
              </p>
            </motion.div>

            <motion.div
              className="service-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={fotoNoivos}
                alt="Fotografia e Filmagem"
                className="w-full h-64 object-cover rounded-lg"
              />
              <h3 className="text-lg font-semibold text-blue-950 mt-4">
                Fotografia e Filmagem
              </h3>
              <p className="text-sm text-gray-700">
                Registro dos momentos mais especiais do seu grande dia com
                qualidade e sensibilidade.
              </p>
            </motion.div>

            <motion.div
              className="service-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={musica}
                alt="Música ao Vivo"
                className="w-full h-64 object-cover rounded-lg"
              />
              <h3 className="text-lg font-semibold text-blue-950 mt-4">
                Música ao Vivo
              </h3>
              <p className="text-sm text-gray-700">
                Seleção de músicos e bandas para embalar cada momento da
                cerimônia e festa com trilhas sonoras emocionantes.
              </p>
            </motion.div>
          </div>
        </div>

 <TemasMaisPedidos />

        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h3 className="text-2xl font-bold text-blue-950 text-center mb-6">
            O que dizem sobre nós
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <p className="text-gray-700 italic">
                "Foi tudo impecável! A equipe da L&L cuidou de cada detalhe do
                nosso casamento. Recomendamos de olhos fechados!"
              </p>
              <span className="block mt-4 font-semibold text-blue-950">
                – Mariana Silva
              </span>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <p className="text-gray-700 italic">
                "Alugamos o espaço para nossa formatura e foi uma experiência
                inesquecível. Organização excelente!"
              </p>
              <span className="block mt-4 font-semibold text-blue-950">
                – Pedro Almeida
              </span>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <p className="text-gray-700 italic">
                "Atendimento atencioso e estrutura impecável. Com certeza
                faremos mais eventos com a L&L."
              </p>
              <span className="block mt-4 font-semibold text-blue-950">
                – Júlia Fernandes
              </span>
            </div>
          </div>
        </motion.div>
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h3 className="text-2xl font-bold text-blue-950 text-center mb-6">
            Nossa Localização
          </h3>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-center">
              <FaMapMarkedAlt className="text-blue-950 text-4xl mr-4" />
              <span className="text-gray-700">
                Av. Leonel Caron Gonçalves, 2935 - Centro, Curitiba
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        ></motion.div>
      </section>
    </div>
  );
}
