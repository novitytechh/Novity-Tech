export default function manifest() {
  return {
    name: "Novity Tech — Engineering Digital Excellence",
    short_name: "Novity Tech",
    description:
      "Elite software engineering agency specializing in custom web applications, AI automation, cloud architectures, and dedicated developer teams.",
    start_url: "/",
    display: "standalone",
    background_color: "#0b0a0e",
    theme_color: "#dfc15d",
    icons: [
      {
        src: "/img/novity-emblem.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any maskable",
      },
      {
        src: "/img/novity-emblem.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
  };
}
