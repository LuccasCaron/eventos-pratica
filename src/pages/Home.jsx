import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import galeria1 from "../assets/imagens/evento1.png";
import galeria2 from "../assets/imagens/evento2.png";
import galeria3 from "../assets/imagens/evento3.png";
import galeria4 from "../assets/imagens/evento4.jpg";
import galeria5 from "../assets/imagens/evento5.jpg";
import galeria6 from "../assets/imagens/evento6.jpg";
import bgTextura from "../assets/imagens/bg-textura.png";

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
        <h2 className="text-3xl font-bold text-blue-950 mb-6 text-center font-cormorant">
          Bem-vindo à L&L Eventos e Locações
        </h2>

        <p className="text-center text-gray-700 mb-10">
          Organizamos eventos inesquecíveis e oferecemos espaços incríveis para
          tornar seu momento especial único.
        </p>

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
          <div className="bg-[#e2e8f0] p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-blue-950 mb-2">
              Espaços modernos e versáteis
            </h3>
            <p className="text-gray-700">
              Oferecemos ambientes climatizados, com infraestrutura de ponta
              para casamentos, aniversários, formaturas e eventos corporativos.
            </p>
          </div>
          <div className="bg-[#e2e8f0] p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-blue-950 mb-2">
              Equipe especializada
            </h3>
            <p className="text-gray-700">
              Contamos com profissionais experientes que cuidam de todos os
              detalhes, do planejamento à execução do seu evento.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
