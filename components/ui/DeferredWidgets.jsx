"use client";

import dynamic from "next/dynamic";

const CookieBanner = dynamic(() => import("./CookieBanner"), { ssr: false });
const Chatbot = dynamic(() => import("./Chatbot"), { ssr: false });

export default function DeferredWidgets() {
  return (
    <>
      <CookieBanner />
      <Chatbot />
    </>
  );
}
