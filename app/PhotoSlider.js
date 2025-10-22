"use client";

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Importações de CSS do Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// O componente agora recebe 'photoPaths' como uma propriedade
export default function PhotoSlider({ photoPaths }) {

  // Se não houver fotos, não renderiza nada
  if (!photoPaths || photoPaths.length === 0) {
    return (
      <section className="pb-8 px-6 bg-black text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-green-500 mb-6 font-biorhyme">
          Veja como foi a última Mentoria:
        </h2>
        <p className="text-gray-400">Nenhuma foto encontrada.</p>
      </section>
    );
  }

  return (
    <section className="pb-8 px-6 bg-black text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-green-500 mb-6 font-biorhyme">
        Veja como foi a última Mentoria:
      </h2>

      <div className="max-w-4xl mx-auto">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 30 },
          }}
          className="mySwiper"
        >
          {/* Aqui fazemos o loop na lista de fotos que recebemos */}
          {photoPaths.map((src, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-64 md:h-80">
                <Image
                  src={src} // Usa o caminho da foto (ex: /fotos/1.jpg)
                  alt={`Foto da mentoria ${index + 1}`} // Alt text automático
                  fill
                  className="rounded-xl object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority={index < 3} // Prioriza o carregamento das 3 primeiras
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/*
      <div className="flex justify-center">
        <video ref={videoRef} controls className="rounded-xl w-full max-w-sm">
          <source src="/videos/Videonovo.mp4" type="video/mp4" />
          Seu navegador não suporta vídeo.
        </video>
      </div>
      */}
    </section>
  );
}