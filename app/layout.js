import "./globals.css";
import { BioRhyme, Chivo, Montserrat } from "next/font/google";

const bioRhyme = BioRhyme({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-biorhyme",
});

const chivo = Chivo({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-chivo",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-montserrat",
});

export const metadata = {
  title: "DNA de Vendas Imobiliárias",
  description: "Imersão para alta performance no mercado imobiliário",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <head>
        {/* SEO/Redes sociais */}
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="DNA de Vendas Imobiliárias" />
        <meta property="og:description" content="Imersão para alta performance no mercado imobiliário" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="http://dnadeperformance.com.br/" />
        <meta property="og:image" content="http://dnadeperformance.com.br/DNA-FEED (1).png" />
        <meta name="twitter:card" content="summary_large_image" />
      </head>
      <body
        className={`${bioRhyme.variable} ${chivo.variable} ${montserrat.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
