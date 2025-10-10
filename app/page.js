"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faBuilding, faClock, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import CountdownTimer from './CountdownTimer';


export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const videoRef = useRef(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const formRef = useRef(null);
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
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1, 
    };

    const observerCallback = (entries) => {
      const [entry] = entries;
      setIsFormVisible(entry.isIntersecting);
    };

    const observer = new IntersectionObserver(observerCallback, options);

    if (formRef.current) {
      observer.observe(formRef.current);
    }

    return () => {
      if (formRef.current) {
        observer.unobserve(formRef.current);
      }
    };
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
      {/* 2. Informações principais ATUALIZADAS */}
      <section className="py-8 px-6 text-center bg-black">
        <h2 className="text-3xl md:text-4xl font-bold text-orange-500 mb-4 font-biorhyme">
          O Segredo do $1.5 Bilhão em VGV
        </h2>
        <p className="text-xl md:text-2xl text-gray-200 mb-8 font-chivo max-w-3xl mx-auto">
          A Imersão Que Vai Desbloquear Sua Alta Performance na Carreira Imobiliária.
        </p>

        {/* 1. TIMER DINÂMICO APLICADO */}
        <CountdownTimer />

        <ul className="space-y-3 text-lg font-chivo">
          <li className="text-2xl font-bold text-orange-400">
            De <span className="line-through text-gray-400">R$ 897,00</span> por <span className="text-white">R$ 197,00</span>
          </li>
          <li>
            <p className="text-lg font-bold text-yellow-400">
              ⚠️ <strong>Últimas Vagas</strong> por este valor promocional!
            </p>
          </li>
        </ul>

        <a
          href="#inscricao"
          className="mt-8 inline-block bg-orange-500 hover:bg-orange-600 px-8 py-4 rounded-xl text-xl transition font-montserrat font-bold animate-pulse-cta"
        >
          Garantir minha vaga!
        </a>
      </section>

      <section className="pb-8 px-6 bg-black text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-orange-500 mb-6 font-biorhyme">
          Veja o que Daniel Reis e Hugo Almeida Vão Te Ensinar na Imersão:
        </h2>
        <div className="flex justify-center">
          <video ref={videoRef} controls className="rounded-xl w-full max-w-sm">
            <source src="/videos/Videonovo.mp4" type="video/mp4" />
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
        {/* DESTAQUE ADICIONADO AQUI */}
        <div className="mt-12 max-w-3xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold text-white font-biorhyme">
            <span className="text-orange-500">12 horas de Imersão Total</span><br />
            Das 08h às 20h
          </h3>
          <p className="mt-4 text-lg text-gray-300 font-chivo">
            Aproveite um dia inteiro de conteúdo transformador para sua carreira
            pelo valor promocional de <span className="font-bold text-orange-500">apenas R$ 197</span>.
          </p>
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

      {/* 5. Palestrantes (Versão Estratégica) */}
      <section className="py-12 px-6 bg-gray-900">
        <h2 className="text-3xl md:text-4xl font-bold text-orange-500 mb-12 text-center font-biorhyme">
          Seus Mentores na Imersão
        </h2>

        <div className="flex flex-col gap-12">

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

            {/* Info Estratégica */}
            <div className="p-8 flex flex-col justify-center md:w-2/3 text-left space-y-5">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-3xl font-bold font-biorhyme text-orange-500">
                    Daniel Reis
                  </h3>
                  <a href="https://www.instagram.com/danielreisaugusto" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:text-orange-600 text-2xl">
                    <FontAwesomeIcon icon={faInstagram} />
                  </a>
                </div>
                {/* FOCO NO RESULTADO (Hook Inicial) */}
                <p className="text-xl text-gray-200 font-chivo">
                  O mentor por trás de <span className="font-bold text-white">$1.5 Bilhão em VGV</span> e da formação de mais de <span className="font-bold text-white">1200 corretores</span> de alta performance.
                </p>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-white mb-2">O que você vai aprender com ele:</h4>
                <p className="text-gray-400 font-chivo">
                  Daniel vai te entregar as estratégias exatas que ele usou para construir carreiras de sucesso e negócios milionários no mercado imobiliário. Você aprenderá os métodos para criar desejo, acelerar negociações e liderar equipes que batem metas consistentemente.
                </p>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-white mb-2">Principais Credenciais e Resultados:</h4>
                <ul className="list-disc list-inside text-gray-400 font-chivo space-y-1">
                  <li><span className="font-bold text-white">20 anos</span> de experiência no mercado imobiliário.</li>
                  <li>Sócio fundador da <span className="font-bold">Home Class</span> (imobiliária digital de alto padrão).</li>
                  <li>Ministrou mais de <span className="font-bold">700 treinamentos de vendas</span>.</li>
                  <li>Formação executiva na <span className="font-bold">Fundação Dom Cabral</span> e <span className="font-bold">G4 Traction</span>.</li>
                  <li>Imersões e Benchmarking nos mercados de luxo de <span className="font-bold">São Paulo e Miami (USA)</span>.</li>
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

            {/* Info Estratégica */}
            <div className="p-8 flex flex-col justify-center md:w-2/3 text-left space-y-5">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-3xl font-bold font-biorhyme text-orange-500">
                    Hugo Almeida
                  </h3>
                  <a href="https://www.instagram.com/eusouhugoalmeida" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:text-orange-600 text-2xl">
                    <FontAwesomeIcon icon={faInstagram} />
                  </a>
                </div>
                {/* FOCO NO RESULTADO (Hook Inicial) */}
                <p className="text-xl text-gray-200 font-chivo">
                  Especialista em <span className="font-bold text-white">Liderança Emocional</span> que já desenvolveu mais de <span className="font-bold text-white">5.000 pessoas</span> para a alta performance.
                </p>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-white mb-2">O que você vai aprender com ele:</h4>
                <p className="text-gray-400 font-chivo">
                  Hugo é o especialista que vai destravar seu potencial máximo. Ele vai te ensinar a usar a inteligência emocional para construir uma mentalidade inabalável, liderar com impacto e transformar seus medos em combustível para o sucesso em vendas.
                </p>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-white mb-2">Principais Credenciais e Resultados:</h4>
                <ul className="list-disc list-inside text-gray-400 font-chivo space-y-1">
                  <li><span className="font-bold text-white">20 anos</span> como treinador de líderes e equipes comerciais.</li>
                  <li><span className="font-bold">MBA em Liderança</span> Organizacional pela FranklinCovey.</li>
                  <li>Criador dos métodos <span className="font-bold">Fortium (Liderança Emocional)</span> e <span className="font-bold">Vendedor de Sucesso</span>.</li>
                  <li>Master Coach com certificação internacional (AIC).</li>
                  <li>Imersão <span className="font-bold">&ldquo;Unleash the Power Within&rdquo;</span> com Tony Robbins em Londres.</li>
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

      {/* 8 e 9. Compra + Formulário (Otimizado) */}
      <section ref={formRef} id="inscricao" className="py-14 px-6 bg-black text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-orange-500 mb-4 font-biorhyme">
          Garanta sua vaga agora
        </h2>

        {/* CHAMADA FINAL ADICIONADA AQUI */}
        <p className="text-2xl font-bold text-white mb-8 max-w-lg mx-auto">
          Última Oportunidade: De <span className="line-through text-gray-400">R$ 897,00</span> por apenas <span className="text-orange-500">R$ 197,00</span>
        </p>

        <form
          className="max-w-lg mx-auto bg-gray-900 p-8 rounded-xl space-y-4"
          onSubmit={handleSubmit}
        >
          <input type="text" placeholder="Nome completo" className="w-full p-3 rounded-lg text-black font-montserrat" required />
          <input type="email" placeholder="E-mail" className="w-full p-3 rounded-lg text-black font-montserrat" required />
          <input type="tel" placeholder="Telefone/WhatsApp" className="w-full p-3 rounded-lg text-black font-montserrat" required />

          {/* BOTÃO COM CTA CLARO */}
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 py-4 rounded-lg text-xl transition font-montserrat font-bold animate-pulse-cta"
          >
            Reservar Minha Vaga por R$ 197,00
          </button>

          {/* PASSO CLARO (FUNIL) */}
          <p className="text-sm text-gray-400 pt-2">
            Após preencher, você será direcionado para a página de pagamento.
          </p>
        </form>

        {showModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/70">
    <div className="bg-white p-6 rounded-xl max-w-md w-full text-center space-y-4">
      <h3 className="text-xl font-bold text-gray-900">
        Finalize sua inscrição pelo WhatsApp
      </h3>

      <p className="text-gray-700">
        Clique no botão abaixo para falar conosco e concluir sua compra.
      </p>

      <a
        href={`http://wa.me/5566996760856?text=${encodeURIComponent(
          "Olá! Quero confirmar minha inscrição no curso por R$ 197,00."
        )}`}
        target="_blank"
        className="block w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-bold text-lg transition"
      >
        Ir para o WhatsApp
      </a>

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
      {/* CTA FLUTUANTE CONDICIONAL */}
      {!isFormVisible && (
        <div className="fixed bottom-0 left-0 w-full bg-black bg-opacity-80 backdrop-blur-sm p-4 z-50 md:hidden">
          <a
            href="#inscricao"
            className="w-full text-center inline-block bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-xl text-lg transition font-montserrat font-bold text-white shadow-lg animate-pulse-cta"
          >
            Garantir minha vaga agora!
          </a>
        </div>
      )}

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
