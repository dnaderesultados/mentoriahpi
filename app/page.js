"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faBuilding, faClock, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { faInstagram } from '@fortawesome/free-brands-svg-icons';


export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const videoRef = useRef(null);
  const pixKey = "00020101021226840014BR.GOV.BCB.PIX0136bfda72e0-012d-4ae3-8e2d-60e624ab38d80222Pagamento hugoalmeidac5204000053039865406197.005802BR5925HUGO DE ALMEIDA BARBOSA 96007GOIANIA62290525QRCCVVF4yXTXfnbi2jRbPjDBp6304F840";

  const copyPix = () => {
    navigator.clipboard.writeText(pixKey);
    alert("Chave Pix copiada!");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      nome: e.target[0].value,
      email: e.target[1].value,
      telefone: e.target[2].value,
    };

    const res = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      setShowModal(true);

      //  Pixel do navegador
      if (typeof window.fbq === "function") {
        window.fbq("track", "Lead");
      }
    } else {
      alert("Erro ao enviar, tente novamente.");
    }
  };
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // força o preload completo do vídeo
    video.preload = "auto";

    const handleCanPlay = () => {
      // pula para 5 segundos
      video.currentTime = 5;
      // pausa para não tocar automaticamente
      video.pause();
    };

    video.addEventListener("canplay", handleCanPlay);

    return () => video.removeEventListener("canplay", handleCanPlay);
  }, []);
  return (
    <main className="bg-black text-white">
      {/* 1. Topo */}
      <section className="relative w-full flex items-center justify-center">
        {/* Container da imagem */}
        <div className="w-full">
          <Image
            src="/images/DNA-FEED (3).png"
            alt="DNA de Vendas Imobiliárias"
            width={1920}
            height={1080}
            className="w-full h-auto object-center"
            priority
          />
        </div>
      </section>
      {/* 2. Informações principais */}
      <section className="py-8 px-6 text-center bg-black">
        <h2 className="text-3xl md:text-4xl font-bold text-orange-500 mb-6 font-biorhyme">
          DNA DE NEGÓCIOS IMOBILIÁRIOS
        </h2>
        <ul className="space-y-3 text-lg font-chivo">
          <li>🔸 APRENDA A CONSTRUIR UMA CARREIRA COM ALTA PERFORMANCE CONSTANTE.</li>
          <li>🔸 Performance está batendo na sua porta agora, não fique de fora.</li>
          <li className="text-2xl font-bold text-orange-400">
            De <span className="line-through text-gray-400">R$ 897,00</span> por <span className="text-white">R$ 197,00</span>
          </li>
        </ul>
        <a
          href="#inscricao"
          className="mt-8 inline-block bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-xl text-lg transition font-montserrat font-bold"
        >
          Garantir minha vaga!
        </a>
      </section>

      <section className="pb-8 px-6 bg-black text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-orange-500 mb-6 font-biorhyme">
          Assista ao vídeo
        </h2>
        <div className="flex justify-center">
          <video ref={videoRef} controls className="rounded-xl w-full max-w-sm"  poster="/images/DNA-FEED (3).png">
            <source src="/videos/Videointro.mp4" type="video/mp4" />
            Seu navegador não suporta vídeo.
          </video>
        </div>
      </section>
      {/* 3. Data, Local, Horário */}
      <section className="py-12 px-6 bg-gray-900 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-orange-500 mb-6 font-biorhyme">
          Data, Horário e Local
        </h2>

        {/* Mapa */}
        <div className="w-full max-w-4xl mx-auto rounded-lg overflow-hidden shadow-lg mb-8">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3843.6402080401376!2d-54.30108789999999!3d-15.5574068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x937725cbc1a28643%3A0xd10dbdd55947178b!2sPrimacredi%3A%20Empr%C3%A9stimos%20Financiamentos%2C%20Cons%C3%B3rcios%2C%20Seguros%20em%20Primavera%20do%20Leste%20MT!5e0!3m2!1sen!2sbr!4v1758419714210!5m2!1sen!2sbr"
            width="100%"
            height="400"
            className="border-0"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* Infos abaixo do mapa, boxes lado a lado */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <div className="bg-black bg-opacity-60 border border-orange-500 rounded-lg p-4 text-white min-w-[180px] flex items-center gap-2 justify-center">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="w-5 h-5" /> Primavera do Leste - Mato Grosso
          </div>
          <div className="bg-black bg-opacity-60 border border-orange-500 rounded-lg p-4 text-white min-w-[180px] flex items-center gap-2 justify-center">
            <FontAwesomeIcon icon={faBuilding} className="w-5 h-5" /> Primacredi Auditório
          </div>
          <div className="bg-black bg-opacity-60 border border-orange-500 rounded-lg p-4 text-white min-w-[180px] flex items-center gap-2 justify-center">
            <FontAwesomeIcon icon={faClock} className="w-5 h-5" /> 08:00 às 20h
          </div>
          <div className="bg-black bg-opacity-60 border border-orange-500 rounded-lg p-4 text-white min-w-[180px] flex items-center gap-2 justify-center">
            <FontAwesomeIcon icon={faCalendarAlt} className="w-5 h-5" /> 14/10/25
          </div>
        </div>
      </section>
      {/* 4. Informações mais completas */}
      <section className="py-12 px-6 bg-black text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-orange-500 mb-6 font-biorhyme">
          Por que participar?
        </h2>
        <ul className="space-y-4 text-2xl font-chivo">
          <li>🔸 Networking exclusivo com líderes do mercado imobiliário.</li>
          <li>🔸 Estratégias comprovadas para escalar suas vendas.</li>
          <li>🔸 Desenvolvimento pessoal e inteligência emocional aplicada.</li>
          <li>🔸 Cases reais de sucesso para inspirar sua performance.</li>
          <li>🔸 Tendências e oportunidades para se antecipar ao mercado.</li>
          <li>🔸 Insights práticos para gestão de carreira e crescimento.</li>
        </ul>
      </section>

      {/* 5. Palestrantes */}
      <section className="py-12 px-6 bg-gray-900">
        <h2 className="text-3xl md:text-4xl font-bold text-orange-500 mb-12 text-center font-biorhyme">
          Palestrantes
        </h2>

        <div className="flex flex-col space-y-12">
          {/* Palestrante 1: Daniel Reis */}
          <div className="flex flex-col md:flex-row bg-black rounded-xl shadow-lg overflow-hidden">
            {/* Imagem */}
            <div className="relative w-full md:w-1/3 aspect-[3/4] md:h-auto">
              <Image
                src="/images/Reisfoto.jpg"
                alt="Daniel Reis"
                fill
                className="object-cover"
              />
            </div>

            {/* Info */}
            <div className="p-6 flex flex-col justify-start md:w-2/3 text-left space-y-4">
              <div className="flex items-center space-x-3">
                <h3 className="text-3xl font-bold font-biorhyme text-orange-500">
                  Daniel Reis
                </h3>
                <a
                  href="https://www.instagram.com/danielreisaugusto"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-500 hover:text-orange-600 text-2xl"
                >
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
              </div>
              {/* Destaques / Experiência */}
              <div>
                <h4 className="text-xl font-semibold text-white mb-2">Destaques & Experiência</h4>
                <ul className="list-disc list-inside text-gray-400 font-chivo space-y-1">
                  <li>20 anos de mercado imobiliário</li>
                  <li>Líder que formou mais de 1200 corretores</li>
                  <li>1.5 bilhão em VGV</li>
                  <li>Sócio fundador Home Class. (Imobiliária com 100 corretores no modelo digital posicionada para o alto padrão)</li>
                  <li>Especialista em carreiras de alta performance</li>
                  <li>Formação de líderes e diretores executivos</li>
                  <li>Fundador Adão Vibe (VGB 404 Milhões)</li>
                  <li>Ministrei mais de 700 treinamentos de vendas</li>
                  <li>Inúmeras apresentações de rodadas de negócios</li>
                  <li>Mentor de executivos para carreira</li>
                  <li>Especialista em Vendas</li>
                </ul>
              </div>

              {/* Formação */}
              <div>
                <h4 className="text-xl font-semibold text-white mb-2">Formação & Certificações</h4>
                <ul className="list-disc list-inside text-gray-400 font-chivo space-y-1">
                  <li>Graduação: Ciências Biológicas</li>
                  <li>Fundação Dom Cabral</li>
                  <li>Academia Internacional de Coach</li>
                  <li>G4 Traction</li>
                  <li>Benchmarking USA - Imersão mercado imobiliário</li>
                  <li>Benchmarking SP - Mercado de luxo imobiliário</li>
                  <li>Treinamentos de posicionamento - SP</li>
                  <li>Treinamentos mercado de luxo - SP</li>
                  <li>Treinamentos mercado de luxo - Miami</li>
                </ul>
              </div>

              {/* Métodos e Conquistas */}
              <div>
                <h4 className="text-xl font-semibold text-white mb-2">Métodos & Conquistas</h4>
                <ul className="list-disc list-inside text-gray-400 font-chivo space-y-2">
                  <li>
                    <strong>Método Antecipação de lançamento Fire</strong> —
                    Crie desejo antes do lançamento e transforme expectativa em vendas imediatas.
                  </li>
                  <li>
                    <strong>Método Venda de Alto Impacto</strong> —
                    Técnicas que aceleram negociações e levam o cliente ao fechamento sem objeções.
                  </li>
                  <li>
                    <strong>Método Luxury Cliente</strong> —
                    Atenda clientes de alto luxo com exclusividade, sofisticação e experiências únicas.
                  </li>
                  <li>
                    <strong>Método Performance+</strong> —
                    Transforme sua equipe em uma máquina de vendas com foco em resultado real.
                  </li>
                  <li>
                    <strong>Método Potencial Máximo</strong> —
                    Descubra e explore o melhor de cada corretor, elevando sua performance ao topo.
                  </li>
                  <li>
                    <strong>Método Líder Alfa</strong> —
                    Formação de líderes que inspiram, engajam e conduzem times de alta performance.
                  </li>
                  <li>
                    <strong>Método Executivo Visionário</strong> —
                    Construa uma carreira sólida de diretor executivo com visão, autoridade e estratégia.
                  </li>
                  <li>
                    <strong>Método Imobiliária Zero a Cem</strong> —
                    Passo a passo para abrir e escalar uma imobiliária sólida e lucrativa do zero.
                  </li>
                  <li>
                    <strong>Método Carreira 20/20</strong> —
                    Como se manter por 20 anos no topo da carreira com performance consistente.
                  </li>
                  <li>
                    <strong>Método DISC & Eneagrama Pro</strong> —
                    Use ferramentas comportamentais para liderar corretores, gestores e executivos.
                  </li>
                  <li>
                    <strong>Método RH 360°®</strong> —
                    Transforme o RH da sua imobiliária em motor de crescimento e retenção de talentos.
                  </li>
                  <li>
                    <strong>Método Executivo Imob®</strong> —
                    Leve seu time ao próximo nível: de corretores comuns a executivos de impacto.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Palestrante 2: Hugo Almeida */}
          <div className="flex flex-col md:flex-row bg-black rounded-xl shadow-lg overflow-hidden">
            {/* Imagem */}
            <div className="relative w-full md:w-1/3 aspect-[3/4] md:h-auto">
              <Image
                src="/images/Hugofoto.jpg"
                alt="Hugo Almeida"
                fill
                className="object-cover object-top"
              />
            </div>

            {/* Info */}
            <div className="p-6 flex flex-col justify-start md:w-2/3 text-left space-y-6">
              <div className="flex items-center space-x-3">
                <h3 className="text-3xl font-bold font-biorhyme text-orange-500">
                  Hugo Almeida
                </h3>
                <a
                  href="https://www.instagram.com/eusouhugoalmeida"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-500 hover:text-orange-600 text-2xl"
                >
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
              </div>
              {/* Destaques / Experiência */}
              <div>
                <h4 className="text-xl font-semibold text-white mb-2">Destaques & Experiência</h4>
                <ul className="list-disc list-inside text-gray-400 font-chivo space-y-1">
                  <li>Treinador de Líderes há 20 anos</li>
                  <li>Professional & Personal Coach (AIC)</li>
                  <li>Business and Executive Coach (AIC)</li>
                  <li>Master Coach (AIC)</li>
                  <li>Desenvolveu mais de 5.000 pessoas para atingirem seu máximo potencial</li>
                  <li>Reconhecido em liderança, vendas e treinamento de alto impacto</li>
                </ul>
              </div>

              {/* Formação */}
              <div>
                <h4 className="text-xl font-semibold text-white mb-2">Formação & Certificações</h4>
                <ul className="list-disc list-inside text-gray-400 font-chivo space-y-1">
                  <li>Graduado em Gestão Comercial (ESTÁCIO)</li>
                  <li>MBA – Liderança Integral & Organizacional (FRANKLINCOVEY)</li>
                  <li>Millionaire Mind Intensive (MMI)</li>
                  <li>Unleash the Power Within - Londres (ING)</li>
                  <li>Método Treinador Implacável (Grupo Karcher)</li>
                  <li>Analista DISC (AIC)</li>
                  <li>Treinador Experencial (Grupo Karcher)</li>
                </ul>
              </div>

              {/* Métodos e Conquistas */}
              <div>
                <h4 className="text-xl font-semibold text-white mb-2">Métodos & Conquistas</h4>
                <ul className="list-disc list-inside text-gray-400 font-chivo space-y-1">
                  <li>Criador do método <strong>Vendedor de Sucesso</strong></li>
                  <li>Criador do método Fortium - <strong>Liderança Emocional e Alta Performance</strong></li>
                  <li>Criador do Método Aureum - <strong>Elite da Liderança Emocional e Estratégia</strong></li>
                  <li>Criador do Método LeaderPRO - <strong>Professional Leadership</strong></li>
                  <li>Criador do Método Level Up Day - <strong>Imersão Corporativa</strong></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Testemunhos */}
      <section className="py-12 px-6 bg-black text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-orange-500 mb-6 font-biorhyme">
          O que esperar deste evento
        </h2>
        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
          <video ref={videoRef} controls className="rounded-xl w-full max-w-md h-60 md:h-72" poster="/images/Reisfotohavan.jpeg">
            <source src="/videos/Video7.mp4" type="video/mp4" />
          </video>
          <video ref={videoRef} controls className="rounded-xl w-full max-w-md h-60 md:h-72" poster="/images/Reisfoto2.jpeg">
            <source src="/videos/Videoreis.mp4" type="video/mp4" />
          </video>
          <video ref={videoRef} controls className="rounded-xl w-full max-w-md h-60 md:h-72" poster="/images/Reisfoto3.jpeg">
            <source src="/videos/Video1.mp4" type="video/mp4" />
          </video>
          <video ref={videoRef} controls className="rounded-xl w-full max-w-md h-60 md:h-72" poster="/images/Reisfoto4.jpeg">
            <source src="/videos/Video2.mp4" type="video/mp4" />
          </video>
          <video ref={videoRef} controls className="rounded-xl w-full max-w-md h-60 md:h-72" poster="/images/Reisfoto5.jpeg">
            <source src="/videos/Video3.mp4" type="video/mp4" />
          </video>
          <video ref={videoRef} controls className="rounded-xl w-full max-w-md h-60 md:h-72" poster="/images/Reisfoto6.jpeg">
            <source src="/videos/Video4.mp4" type="video/mp4" />
          </video>
          <video ref={videoRef} controls className="rounded-xl w-full max-w-md h-60 md:h-72" poster="/images/Reisfoto7.jpeg">
            <source src="/videos/Video6.mp4" type="video/mp4" />
          </video>
          <video ref={videoRef} controls className="rounded-xl w-full max-w-md h-60 md:h-72" poster="/images/Reisfoto8.jpeg">
            <source src="/videos/Video8.mp4" type="video/mp4" />
          </video>
          <video ref={videoRef} controls className="rounded-xl w-full max-w-md h-60 md:h-72" poster="/images/Reisfoto9.jpeg">
            <source src="/videos/Video9.mp4" type="video/mp4" />
          </video>
          <video ref={videoRef} controls className="rounded-xl w-full max-w-md h-60 md:h-72" poster="/images/Hugofoto2.jpg">
            <source src="/videos/Videohugo1.mp4" type="video/mp4" />
          </video>
          <video ref={videoRef} controls className="rounded-xl w-full max-w-md h-60 md:h-72" poster="/images/Nayara.jpeg">
            <source src="/videos/Video10.mp4" type="video/mp4" />
          </video>
          <video ref={videoRef} controls className="rounded-xl w-full max-w-md h-60 md:h-72" poster="/images/Hugofoto2.jpg">
            <source src="/videos/Videohugo2.mp4" type="video/mp4" />
          </video>
          <video ref={videoRef} controls className="rounded-xl w-full max-w-md h-60 md:h-72" poster="/images/Nayara2.jpeg">
            <source src="/videos/Video11.mp4" type="video/mp4" />
          </video>
          <video ref={videoRef} controls className="rounded-xl w-full max-w-md h-60 md:h-72" poster="/images/Hugofoto2.jpg">
            <source src="/videos/Videohugo3.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      {/* 7. Para quem é */}
      <section className="py-12 px-6 bg-gray-900 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-orange-500 mb-6 font-biorhyme">
          Este evento é para você!
        </h2>
        <ul className="space-y-3 text-2xl font-chivo">
          <li>🔸 Executivos</li>
          <li>🔸 Corretores</li>
          <li>🔸 Construção de carreira</li>
          <li>🔸 Liderança de alta performance</li>
        </ul>
      </section>

      {/* 8 e 9. Compra + Formulário */}
      <section id="inscricao" className="py-14 px-6 bg-black text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-orange-500 mb-5 mt-0 font-biorhyme">
          Garanta sua vaga agora
        </h2>
        <form className="max-w-lg mx-auto bg-gray-900 p-8 rounded-xl space-y-4"
          onSubmit={handleSubmit}
        >
          <input type="text" placeholder="Nome completo" className="w-full p-3 rounded-lg text-black font-montserrat" required />
          <input type="email" placeholder="E-mail" className="w-full p-3 rounded-lg text-black font-montserrat" required />
          <input type="tel" placeholder="Telefone/WhatsApp" className="w-full p-3 rounded-lg text-black font-montserrat" required />

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 py-3 rounded-lg text-lg transition font-montserrat font-bold"
          >
            Enviar
          </button>
        </form>

        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/70">
            <div className="bg-white p-6 rounded-xl max-w-md w-full text-center space-y-1">
              <h3 className="text-xl font-bold">Escolha sua forma de pagamento</h3>

              <a
                href="https://link.infinitepay.io/hugoalmeidacoach/VC1DLTEtSQ-27U2eP5Aw9-197,00"
                target="_blank"
                className="block w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-bold"
              >
                Pagar com cartão
              </a>

              {/* Pix */}
              <div>
                <p className="mb-1 font-semibold">Pagar com Pix</p>

                {/* QR Code */}
                <a
                  href={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(pixKey)}`}
                  target="_blank"
                  className="block w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-bold"
                >
                  Abrir QR Code Pix
                </a>

                {/* Copiar chave Pix */}
                <div className="flex justify-between items-center bg-gray-300 p-2 rounded-lg mt-1">
                  <span className="text-xs break-all">{pixKey}</span>
                  <button
                    onClick={copyPix}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg text-sm"
                  >
                    Copiar
                  </button>
                </div>

                <p className="mt-2 text-sm text-gray-600">
                  Ao efetuar pagamento por Pix, envie o comprovante via{" "}
                  <a
                    href={`https://wa.me/5562991426760?text=${encodeURIComponent(
                      "Olá, enviei o comprovante do Pix."
                    )}`}
                    target="_blank"
                    className="text-blue-600 underline"
                  >
                    WhatsApp
                  </a>
                  .
                </p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="mt-4 text-gray-600 underline"
              >
                Fechar
              </button>
            </div>
          </div>
        )}
      </section>

      {/* 10. Rodapé */}
      <footer className="bg-gray-900 py-6 text-center text-gray-400 font-montserrat space-y-2">
        <p>© 2025 DNA de Vendas Imobiliárias. Todos os direitos reservados.</p>
        <p className="text-sm">
          Desenvolvido por{' '}
          <a
            href="https://wa.me/5562984961022"
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-500 hover:text-orange-600"
          >
            Saulo Valin
          </a>
        </p>
      </footer>
    </main>
  );
}
