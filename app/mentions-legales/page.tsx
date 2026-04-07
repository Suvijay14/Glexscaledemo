export default function MentionsLegales() {
  return (
    <div style={{ backgroundColor: "#0A0A0F", minHeight: "100vh", padding: "80px 40px" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h1 style={{ color: "#FFFFFF", fontFamily: "var(--font-syne)", fontSize: "36px", marginBottom: "8px" }}>
          Mentions Legales
        </h1>
        <p style={{ color: "#6B5F82", fontSize: "14px", marginBottom: "40px" }}>
          Conformement a la loi n°2004-575 du 21 juin 2004 pour la Confiance dans l&apos;Economie Numerique
        </p>

        {[
          {
            title: "Editeur du site",
            content: "GlexScale · PartnerMatch Platform · Paris, France · contact@glexscale.com",
          },
          {
            title: "Directeur de la publication",
            content: "GlexScale — Global Growth Accelerator",
          },
          {
            title: "Hebergement",
            content:
              "Vercel Inc. · 340 Pine Street, Suite 701, San Francisco, CA 94104, USA · vercel.com\nBase de donnees : Supabase · Infrastructure AWS eu-west-3 (Paris, France)",
          },
          {
            title: "Propriete intellectuelle",
            content:
              "L'ensemble du contenu de ce site (textes, images, logos, algorithme GCS) est la propriete exclusive de GlexScale. Toute reproduction est interdite sans autorisation ecrite prealable.",
          },
          {
            title: "Donnees personnelles",
            content:
              "Conformement au RGPD et a la loi Informatique et Libertes, vous disposez d'un droit d'acces, de rectification et de suppression de vos donnees. Pour exercer ces droits : contact@glexscale.com",
          },
          {
            title: "Cookies",
            content:
              "Ce site utilise des cookies fonctionnels uniquement. Aucun cookie publicitaire ou de tracking tiers n'est utilise sans votre consentement explicite.",
          },
        ].map((section, i) => (
          <div key={i} style={{ marginBottom: "32px", paddingBottom: "32px", borderBottom: "1px solid #1E1A2E" }}>
            <h2
              style={{
                color: "#7DD855",
                fontSize: "14px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "12px",
              }}
            >
              {section.title}
            </h2>
            <p style={{ color: "#A89BC2", fontSize: "14px", lineHeight: "1.7", whiteSpace: "pre-line" }}>
              {section.content}
            </p>
          </div>
        ))}

        <a href="/" style={{ color: "#7DD855", fontSize: "14px" }}>
          ← Retour a l&apos;accueil
        </a>
      </div>
    </div>
  );
}
