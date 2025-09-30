import "./globals.css";
import { BioRhyme, Chivo, Montserrat } from "next/font/google";
import Script from "next/script";

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

        {/*  Meta Pixel Code */}
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '696320590145627');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=696320590145627&ev=PageView&noscript=1"
          />
        </noscript>
      </head>
      <body
        className={`${bioRhyme.variable} ${chivo.variable} ${montserrat.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
