import { getServiceBySlug } from "@/lib/servicesData";

export async function generateMetadata({ params }) {
  const service = getServiceBySlug(params?.slug);

  if (!service) {
    return {
      title: "Service Not Found",
      description: "The requested engineering service could not be located.",
    };
  }

  const title = `${service.title} — Software & Digital Engineering`;
  const description = service.overview
    ? `${service.overview.slice(0, 155)}...`
    : service.shortDesc;

  return {
    title,
    description,
    alternates: {
      canonical: `/services/${params.slug}`,
    },
    openGraph: {
      title: `${service.title} | Novity Tech`,
      description,
      url: `https://novitytech.com/services/${params.slug}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title} | Novity Tech`,
      description,
    },
  };
}

export default function ServiceDetailLayout({ children, params }) {
  const service = getServiceBySlug(params?.slug);

  const breadcrumbJsonLd = service
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://novitytech.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Services",
            item: "https://novitytech.com/services",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: service.title,
            item: `https://novitytech.com/services/${service.slug}`,
          },
        ],
      }
    : null;

  const serviceJsonLd = service
    ? {
        "@context": "https://schema.org",
        "@type": "Service",
        name: service.title,
        description: service.overview || service.shortDesc,
        provider: {
          "@type": "Organization",
          name: "Novity Tech",
          url: "https://novitytech.com",
        },
        areaServed: "Worldwide",
        serviceType: service.category,
      }
    : null;

  return (
    <>
      {breadcrumbJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      )}
      {serviceJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
        />
      )}
      {children}
    </>
  );
}
