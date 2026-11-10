import "./globals.css";
import CookieBanner from "../components/ui/CookieBanner";
import Chatbot from "../components/ui/Chatbot";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  metadataBase: new URL("https://novitytech.com"),
  title: {
    default: "Novity Tech — Engineering Digital Excellence & Custom Software",
    template: "%s | Novity Tech",
  },
  description:
    "Novity Tech is a premier digital engineering and software development agency headquartered in Gujranwala, Pakistan. We architect scalable web platforms, AI workflow automation, custom ERPs, and cloud systems for ambitious global enterprises.",
  applicationName: "Novity Tech",
  keywords: [
    "Novity Tech",
    "software engineering agency",
    "custom web application development",
    "AI automation solutions",
    "AI workflow automation",
    "IT staff augmentation",
    "dedicated software developers",
    "ERP systems solutions",
    "cloud infrastructure",
    "Muhammad Faseeh Altaf",
    "software development company Pakistan",
    "Gujranwala software house",
    "Next.js developers",
    "enterprise digital transformation",
  ],
  authors: [
    { name: "Muhammad Faseeh Altaf", url: "https://novitytech.com/team" },
    { name: "Novity Tech Engineering Guild", url: "https://novitytech.com" },
  ],
  creator: "Muhammad Faseeh Altaf",
  publisher: "Novity Tech",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/img/novity-emblem.png",
    shortcut: "/img/novity-emblem.png",
    apple: "/img/novity-emblem.png",
  },
  openGraph: {
    title: "Novity Tech — Engineering Digital Excellence for Ambitious Brands",
    description:
      "Bespoke software engineering, AI workflow automation, cloud architectures, and dedicated development teams. Driving real enterprise impact.",
    url: "https://novitytech.com",
    siteName: "Novity Tech",
    images: [
      {
        url: "/img/novity-logo.png",
        width: 1200,
        height: 630,
        alt: "Novity Tech — Digital Engineering & AI Agency",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Novity Tech — Engineering Digital Excellence",
    description:
      "Elite digital engineering, custom software, AI automation, and dedicated developer teams.",
    images: ["/img/novity-logo.png"],
    creator: "@novitytech",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://novitytech.com/#organization",
      name: "Novity Tech",
      legalName: "Novity Tech",
      url: "https://novitytech.com",
      logo: "https://novitytech.com/img/novity-emblem.png",
      image: "https://novitytech.com/img/novity-logo.png",
      description:
        "Premier digital engineering and custom software agency delivering web applications, AI automation, and dedicated engineering squads.",
      email: "contact@novitytech.com",
      telephone: "+92 329 1013649",
      founder: {
        "@type": "Person",
        "@id": "https://novitytech.com/#founder",
        name: "Muhammad Faseeh Altaf",
        jobTitle: "Founder & Chief Executive Officer (CEO)",
        url: "https://novitytech.com/team",
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: "Main Boulevard",
        addressLocality: "Gujranwala",
        addressRegion: "Punjab",
        postalCode: "52250",
        addressCountry: "PK",
      },
      sameAs: [
        "https://github.com/novitytechh",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+92 329 1013649",
        contactType: "customer service",
        email: "contact@novitytech.com",
        availableLanguage: ["English", "Urdu"],
      },
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://novitytech.com/#localbusiness",
      name: "Novity Tech",
      url: "https://novitytech.com",
      logo: "https://novitytech.com/img/novity-emblem.png",
      image: "https://novitytech.com/img/novity-logo.png",
      telephone: "+92 329 1013649",
      email: "contact@novitytech.com",
      priceRange: "$$$",
      currenciesAccepted: "USD, EUR, GBP, PKR",
      paymentAccepted: "Bank Transfer, Stripe, Wire",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Main Boulevard",
        addressLocality: "Gujranwala",
        addressRegion: "Punjab",
        postalCode: "52250",
        addressCountry: "PK",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 32.1877,
        longitude: 74.1945,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          opens: "09:00",
          closes: "20:00",
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://novitytech.com/#website",
      url: "https://novitytech.com",
      name: "Novity Tech",
      description: "Engineering Digital Excellence for Ambitious Brands.",
      publisher: {
        "@id": "https://novitytech.com/#organization",
      },
      inLanguage: "en-US",
    },
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
        <CookieBanner />
        <Chatbot />
        <Analytics />
      </body>
    </html>
  );
}
