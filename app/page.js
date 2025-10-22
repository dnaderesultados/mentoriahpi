import fs from 'fs'; // Módulo 'File System' para ler arquivos
import path from 'path'; // Módulo 'Path' para lidar com caminhos
import PhotoSlider from './PhotoSlider'; // Vamos criar este componente
import PageContent from './PageContent'

// Função para buscar as imagens
function getPhotos() {
  // 1. Encontra o caminho absoluto da pasta /public/fotos
  const photosDirectory = path.join(process.cwd(), 'public/photos');

  // 2. Lê todos os nomes de arquivos dentro dessa pasta.
  try {
    const filenames = fs.readdirSync(photosDirectory);

    // 3. Filtra para pegar apenas arquivos de imagem (jpg, png, etc.)
    const imageFiles = filenames.filter(
      (file) => /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
    );

    // 4. Retorna a lista de caminhos relativos (ex: ['/fotos/1.jpg', '/fotos/2.jpg'])
    return imageFiles.map((filename) => `/photos/${filename}`);

  } catch (error) {
    console.error("Erro ao ler a pasta de fotos:", error);
    return []; // Retorna um array vazio se a pasta não existir ou der erro
  }
}

export default function Home() {
  const photos = getPhotos();
  return (
    <main>
      <PageContent photos={photos} />
    </main>
  );
}
