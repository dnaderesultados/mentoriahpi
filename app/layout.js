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
      <body
        className={`${bioRhyme.variable} ${chivo.variable} ${montserrat.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
