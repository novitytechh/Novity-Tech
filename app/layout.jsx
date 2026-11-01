import "./globals.css";
import CookieBanner from "../components/ui/CookieBanner";
import Chatbot from "../components/ui/Chatbot";

export const metadata = {
  title: "Novity Tech — Engineering Digital Excellence for Ambitious Brands",
  description: "We create modern web platforms, design systems, and digital ecosystems that strengthen your market position and drive business growth.",
  icons: {
    icon: "/img/novity-emblem.png",
    apple: "/img/novity-emblem.png",
  },
  openGraph: {
    title: "Novity Tech — Engineering Digital Excellence",
    description: "Modern websites & platforms for ambitious brands.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Phudu:wght@300;400;500;600;700;800;900&family=Instrument+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <link rel="stylesheet" href="/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/css/style.css" />
      </head>
      <body>
        {children}
        <CookieBanner />
        <Chatbot />
      </body>
    </html>
  );
}
