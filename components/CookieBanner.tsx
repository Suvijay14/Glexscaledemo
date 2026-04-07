"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CookieBanner({ lang = "en" }: { lang?: "en" | "fr" }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("glexCookieConsent");
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("glexCookieConsent", "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("glexCookieConsent", "declined");
    setVisible(false);
  };

  const text = {
    en: {
      message:
        "We use cookies to improve your experience on PartnerMatch. By continuing, you accept our use of cookies.",
      accept: "Accept",
      decline: "Decline",
      policy: "Privacy Policy",
    },
    fr: {
      message:
        "Nous utilisons des cookies pour améliorer votre expérience sur PartnerMatch. En continuant, vous acceptez notre utilisation des cookies.",
      accept: "Accepter",
      decline: "Refuser",
      policy: "Politique de Confidentialité",
    },
  }[lang];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4"
          style={{ backgroundColor: "#12101A", borderTop: "1px solid #1E1A2E" }}
        >
          <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <p className="text-sm" style={{ color: "#A89BC2" }}>
              {text.message}{" "}
              <a href="/politique-de-confidentialite" className="underline" style={{ color: "#7DD855" }}>
                {text.policy}
              </a>
            </p>
            <div className="flex flex-shrink-0 gap-3">
              <button
                onClick={decline}
                className="rounded-lg border px-4 py-2 text-sm font-medium transition-all"
                style={{ borderColor: "#1E1A2E", color: "#A89BC2", backgroundColor: "transparent" }}
              >
                {text.decline}
              </button>
              <button
                onClick={accept}
                className="rounded-lg px-4 py-2 text-sm font-bold transition-all"
                style={{ backgroundColor: "#570284", color: "#FFFFFF" }}
              >
                {text.accept}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
