export type DimensionCode = "PEM" | "MAI" | "TCS" | "SCSC" | "RTA";

export interface DimensionExplained {
  code: DimensionCode;
  name: string;
  score: number;
  explanation: string;
  friction?: boolean;
}

export interface Partner {
  id: string;
  name: string;
  tagline: string;
  country: string;
  flag: string;
  type: string[];
  industries: string[];
  gcs: number;
  dimensions: Record<DimensionCode, number>;
  band: string;
  color: string;
  description: string;
  salesCycle: string;
  support: "L1" | "L2" | "L3";
  publicSector: boolean;
  logo: string;
  activeDays: number;
  contact: { name: string; title: string; email: string; phone: string };
  profileCompleteness: number;
  lastUpdated: string;
  coverageCountries: string[];
  capabilities: string[];
  channelProfile: { label: string; value: string }[];
  matchSummary: string;
  dimensionDetails: DimensionExplained[];
  clientLogos: string[];
}

const dim = (
  code: DimensionCode,
  name: string,
  score: number,
  explanation: string,
  friction?: boolean
): DimensionExplained => ({ code, name, score, explanation, friction });

export const partners: Partner[] = [
  {
    id: "1",
    name: "Nexus Channel Group",
    tagline: "Enterprise SaaS Distribution Across EMEA",
    country: "France",
    flag: "🇫🇷",
    type: ["VAR", "Systems Integrator"],
    industries: ["Cleantech", "Fintech"],
    gcs: 87,
    dimensions: { PEM: 92, MAI: 88, TCS: 45, SCSC: 38, RTA: 72 },
    band: "Strong Fit",
    color: "#22c55e",
    description:
      "Leading VAR with fifteen years of enterprise SaaS distribution across France and Benelux, with repeatable playbooks for regulated buyers.",
    salesCycle: "3–8 months",
    support: "L2",
    publicSector: true,
    logo: "N",
    activeDays: 12,
    contact: {
      name: "Claire Dubois",
      title: "Head of Alliances",
      email: "c.dubois@nexuschannel.eu",
      phone: "+33 1 44 20 9100",
    },
    profileCompleteness: 94,
    lastUpdated: "2 days ago",
    coverageCountries: ["France", "Germany", "Belgium", "Netherlands", "Luxembourg"],
    capabilities: [
      "Enterprise resale",
      "L2 support",
      "Public sector",
      "Co-sell with hyperscalers",
      "Deal registration",
    ],
    channelProfile: [
      { label: "Primary motion", value: "Recurring SaaS resale with MRR share" },
      { label: "ACV band served", value: "50k–250k EUR" },
      { label: "Certifications", value: "ISO 27001, SOC 2 Type II" },
      { label: "Support tiers", value: "L1 remote, L2 in-country" },
      { label: "Deal desk", value: "Dedicated pricing desk (EU hours)" },
    ],
    matchSummary:
      "Strong channel fit (87/100). This partner's recurring margin model, L2 support capability, and established EMEA VAR networks align well with your channel profile.",
    dimensionDetails: [
      dim(
        "PEM",
        "Partner Ecosystem Maturity",
        92,
        "This partner operates in established VAR networks across France and Germany. Strong ecosystem alignment with the vendor's target markets."
      ),
      dim(
        "MAI",
        "Margin & Incentive Alignment",
        88,
        "Partner accepts recurring SaaS resell with MRR share. Deal size range overlaps with the vendor's 50k–200k EUR ACV band."
      ),
      dim(
        "TCS",
        "Technical Capability Score",
        45,
        "Partner is certified for L1 and L2 remote support. Technical delivery is within standard channel partner capability.",
        true
      ),
      dim(
        "SCSC",
        "Sales Cycle Structural Compatibility",
        38,
        "Partner regularly manages 3–8 month sales cycles with 2–4 decision-makers. No structural mismatch with vendor's typical cycle.",
        true
      ),
      dim(
        "RTA",
        "Regulated & Tender Alignment",
        72,
        "Partner holds active public procurement registration. Strong alignment with regulated-sector accounts."
      ),
    ],
    clientLogos: ["Axiom Bank", "Northwind Utilities", "Helios Rail", "Vantage Health"],
  },
  {
    id: "2",
    name: "Rheinwerk Partners",
    tagline: "DACH-Focused Cloud Reseller & SI",
    country: "Germany",
    flag: "🇩🇪",
    type: ["VAR", "MSP"],
    industries: ["Manufacturing", "Logistics"],
    gcs: 72,
    dimensions: { PEM: 78, MAI: 74, TCS: 68, SCSC: 71, RTA: 62 },
    band: "Good Fit",
    color: "#84cc16",
    description:
      "DACH-native partner with strong SI delivery and mid-market density across manufacturing accounts.",
    salesCycle: "4–9 months",
    support: "L2",
    publicSector: false,
    logo: "R",
    activeDays: 8,
    contact: {
      name: "Jonas Weber",
      title: "Channel Director",
      email: "j.weber@rheinwerk-partners.de",
      phone: "+49 69 900 1200",
    },
    profileCompleteness: 88,
    lastUpdated: "5 days ago",
    coverageCountries: ["Germany", "Austria", "Switzerland"],
    capabilities: ["Cloud migration", "ERP adjacency", "24/7 NOC", "Field services"],
    channelProfile: [
      { label: "Primary motion", value: "Transactional resale + services attach" },
      { label: "ACV band served", value: "35k–180k EUR" },
      { label: "Certifications", value: "ISO 9001" },
      { label: "Support tiers", value: "L2 regional" },
      { label: "Deal desk", value: "Shared with vendor SE team" },
    ],
    matchSummary:
      "Good fit (72/100). Rheinwerk's DACH coverage and SI strength match your manufacturing vertical focus, with minor gaps on public-sector tenders.",
    dimensionDetails: [
      dim("PEM", "Partner Ecosystem Maturity", 78, "Solid partner ecosystem across DACH with repeatable co-sell motions."),
      dim("MAI", "Margin & Incentive Alignment", 74, "Comfortable with SaaS resale; incentive mix aligns with your partner program."),
      dim("TCS", "Technical Capability Score", 68, "Strong delivery bench; can support complex integrations."),
      dim("SCSC", "Sales Cycle Structural Compatibility", 71, "Typical cycles align with your 4–9 month enterprise motion."),
      dim("RTA", "Regulated & Tender Alignment", 62, "Limited public-sector focus; stronger in private industrials."),
    ],
    clientLogos: ["Stahlwerk AG", "CargoLink", "AlpineChem"],
  },
  {
    id: "3",
    name: "Meridian UK Partners",
    tagline: "UK & Ireland Enterprise GTM",
    country: "United Kingdom",
    flag: "🇬🇧",
    type: ["Systems Integrator", "Consultancy"],
    industries: ["Fintech", "Insurtech"],
    gcs: 91,
    dimensions: { PEM: 94, MAI: 90, TCS: 82, SCSC: 88, RTA: 91 },
    band: "Strong Fit",
    color: "#22c55e",
    description:
      "Top-tier SI with deep financial services references and a mature partner success organisation.",
    salesCycle: "3–7 months",
    support: "L3",
    publicSector: true,
    logo: "M",
    activeDays: 4,
    contact: {
      name: "James Holloway",
      title: "VP Partnerships",
      email: "j.holloway@meridianuk.io",
      phone: "+44 20 7123 4400",
    },
    profileCompleteness: 97,
    lastUpdated: "1 day ago",
    coverageCountries: ["United Kingdom", "Ireland"],
    capabilities: ["Regulated FS", "Security reviews", "L3 support", "Executive alignment"],
    channelProfile: [
      { label: "Primary motion", value: "Enterprise SI-led with resale" },
      { label: "ACV band served", value: "75k–400k GBP" },
      { label: "Certifications", value: "Cyber Essentials Plus" },
      { label: "Support tiers", value: "L3 with named engineers" },
      { label: "Deal desk", value: "Dedicated UK deal desk" },
    ],
    matchSummary:
      "Very strong fit (91/100). Meridian mirrors your regulated-sector ICP and can carry complex security-led evaluations end-to-end.",
    dimensionDetails: [
      dim("PEM", "Partner Ecosystem Maturity", 94, "Mature alliances team with structured co-marketing and pipeline reviews."),
      dim("MAI", "Margin & Incentive Alignment", 90, "Aligned to recurring SaaS economics and multi-year expansion."),
      dim("TCS", "Technical Capability Score", 82, "Deep bench for integration, identity, and data residency requirements."),
      dim("SCSC", "Sales Cycle Structural Compatibility", 88, "Cycles and stakeholder maps align tightly with your UK enterprise playbook."),
      dim("RTA", "Regulated & Tender Alignment", 91, "Strong public-sector and FS procurement experience."),
    ],
    clientLogos: ["Sterling Mutual", "Harbour General", "Caledon Bank"],
  },
  {
    id: "4",
    name: "Iberia Cloud Collective",
    tagline: "Spain & Portugal Mid-Market Growth",
    country: "Spain",
    flag: "🇪🇸",
    type: ["VAR"],
    industries: ["Retail", "Hospitality"],
    gcs: 58,
    dimensions: { PEM: 55, MAI: 52, TCS: 60, SCSC: 58, RTA: 48 },
    band: "Conditional",
    color: "#f59e0b",
    description:
      "Growing VAR with retail vertical strength; expanding professional services footprint.",
    salesCycle: "2–5 months",
    support: "L1",
    publicSector: false,
    logo: "I",
    activeDays: 21,
    contact: {
      name: "Elena Vázquez",
      title: "Alliances Lead",
      email: "e.vazquez@iberiacloud.es",
      phone: "+34 91 555 2200",
    },
    profileCompleteness: 71,
    lastUpdated: "1 week ago",
    coverageCountries: ["Spain", "Portugal"],
    capabilities: ["Retail POS integrations", "Quick deployments", "Local language support"],
    channelProfile: [
      { label: "Primary motion", value: "SMB/mid-market resale" },
      { label: "ACV band served", value: "15k–90k EUR" },
      { label: "Certifications", value: "Vendor silver tier" },
      { label: "Support tiers", value: "L1 with escalation path" },
      { label: "Deal desk", value: "Shared queue" },
    ],
    matchSummary:
      "Conditional fit (58/100). Strong retail velocity but lighter enterprise motion and limited regulated-sector coverage versus your target ICP.",
    dimensionDetails: [
      dim("PEM", "Partner Ecosystem Maturity", 55, "Developing partner ecosystem; fewer named enterprise references."),
      dim("MAI", "Margin & Incentive Alignment", 52, "Prefers upfront-heavy deals; partial alignment with pure SaaS resale."),
      dim("TCS", "Technical Capability Score", 60, "Capable for standard integrations; limited complex SI work."),
      dim("SCSC", "Sales Cycle Structural Compatibility", 58, "Shorter cycles; may compress evaluation rigor for enterprise buyers."),
      dim("RTA", "Regulated & Tender Alignment", 48, "Limited tender experience; primarily commercial sector."),
    ],
    clientLogos: ["Sol Retail", "Costa Hotels Group"],
  },
  {
    id: "5",
    name: "Lowlands Tech Partners",
    tagline: "Benelux Digital Transformation",
    country: "Netherlands",
    flag: "🇳🇱",
    type: ["Systems Integrator", "VAR"],
    industries: ["Logistics", "Cleantech"],
    gcs: 66,
    dimensions: { PEM: 70, MAI: 68, TCS: 64, SCSC: 62, RTA: 59 },
    band: "Good Fit",
    color: "#84cc16",
    description:
      "Benelux SI with logistics vertical depth and sustainability-led buying centre access.",
    salesCycle: "4–8 months",
    support: "L2",
    publicSector: false,
    logo: "L",
    activeDays: 15,
    contact: {
      name: "Sophie van den Berg",
      title: "Partner Manager",
      email: "s.vandenberg@lowlands.tech",
      phone: "+31 20 770 3300",
    },
    profileCompleteness: 85,
    lastUpdated: "3 days ago",
    coverageCountries: ["Netherlands", "Belgium"],
    capabilities: ["Integration factory", "Sustainability reporting", "Data residency"],
    channelProfile: [
      { label: "Primary motion", value: "SI-led with resale" },
      { label: "ACV band served", value: "40k–200k EUR" },
      { label: "Certifications", value: "ISO 27001" },
      { label: "Support tiers", value: "L2 Benelux" },
      { label: "Deal desk", value: "EU business hours" },
    ],
    matchSummary:
      "Good fit (66/100). Strong logistics and cleantech alignment; moderate gap on public procurement versus your regulated pipeline.",
    dimensionDetails: [
      dim("PEM", "Partner Ecosystem Maturity", 70, "Healthy ecosystem relationships across Benelux logistics accounts."),
      dim("MAI", "Margin & Incentive Alignment", 68, "Comfortable with SaaS economics and expansion motions."),
      dim("TCS", "Technical Capability Score", 64, "Solid delivery; can support typical enterprise integrations."),
      dim("SCSC", "Sales Cycle Structural Compatibility", 62, "Cycles broadly align; some mid-market compression."),
      dim("RTA", "Regulated & Tender Alignment", 59, "Growing tender capability; not yet a primary strength."),
    ],
    clientLogos: ["NorthSea Freight", "GreenPort NL"],
  },
  {
    id: "6",
    name: "Nordic Bridge AB",
    tagline: "Sweden & Nordics Channel Coverage",
    country: "Sweden",
    flag: "🇸🇪",
    type: ["VAR", "Consultancy"],
    industries: ["Manufacturing", "Energy"],
    gcs: 42,
    dimensions: { PEM: 48, MAI: 40, TCS: 44, SCSC: 41, RTA: 38 },
    band: "Weak Fit",
    color: "#6b7280",
    description:
      "Nordics-focused partner with strong local relationships but narrower enterprise resale experience.",
    salesCycle: "5–10 months",
    support: "L2",
    publicSector: false,
    logo: "B",
    activeDays: 30,
    contact: {
      name: "Erik Lindström",
      title: "Commercial Director",
      email: "e.lindstrom@nordicbridge.se",
      phone: "+46 8 120 8800",
    },
    profileCompleteness: 62,
    lastUpdated: "2 weeks ago",
    coverageCountries: ["Sweden", "Norway", "Finland"],
    capabilities: ["Advisory-led", "Energy sector", "Compliance workshops"],
    channelProfile: [
      { label: "Primary motion", value: "Advisory-first; resale secondary" },
      { label: "ACV band served", value: "25k–120k EUR" },
      { label: "Certifications", value: "Regional vendor tiers" },
      { label: "Support tiers", value: "L2 limited hours" },
      { label: "Deal desk", value: "Quarterly reviews" },
    ],
    matchSummary:
      "Weak fit (42/100). Advisory-heavy motion and lower resale throughput create friction versus your partner-led revenue targets.",
    dimensionDetails: [
      dim("PEM", "Partner Ecosystem Maturity", 48, "Smaller ecosystem footprint; fewer repeatable partner plays."),
      dim("MAI", "Margin & Incentive Alignment", 40, "Prefers services-led economics; weaker alignment with resale incentives."),
      dim("TCS", "Technical Capability Score", 44, "Capable but not scaled for high-volume SaaS delivery."),
      dim("SCSC", "Sales Cycle Structural Compatibility", 41, "Longer cycles with fewer standardized evaluation steps."),
      dim("RTA", "Regulated & Tender Alignment", 38, "Limited tender track record in your priority sectors."),
    ],
    clientLogos: ["Fjord Energy", "ScanManufacturing"],
  },
  {
    id: "7",
    name: "Adriatic Solutions Srl",
    tagline: "Italy SMB & Mid-Market Reseller",
    country: "Italy",
    flag: "🇮🇹",
    type: ["VAR"],
    industries: ["Retail", "Professional Services"],
    gcs: 31,
    dimensions: { PEM: 35, MAI: 28, TCS: 34, SCSC: 30, RTA: 29 },
    band: "Poor Fit",
    color: "#374151",
    description:
      "SMB-oriented reseller with limited enterprise delivery capacity and minimal regulated-sector exposure.",
    salesCycle: "1–3 months",
    support: "L1",
    publicSector: false,
    logo: "A",
    activeDays: 45,
    contact: {
      name: "Marco Ferretti",
      title: "Sales Manager",
      email: "m.ferretti@adriaticsolutions.it",
      phone: "+39 02 947 1100",
    },
    profileCompleteness: 54,
    lastUpdated: "3 weeks ago",
    coverageCountries: ["Italy"],
    capabilities: ["SMB deployments", "Italian language support"],
    channelProfile: [
      { label: "Primary motion", value: "SMB transactional resale" },
      { label: "ACV band served", value: "5k–40k EUR" },
      { label: "Certifications", value: "Basic vendor badges" },
      { label: "Support tiers", value: "L1" },
      { label: "Deal desk", value: "Ad hoc" },
    ],
    matchSummary:
      "Poor fit (31/100). ACV band, sales motion, and delivery depth are misaligned with your enterprise SaaS channel strategy.",
    dimensionDetails: [
      dim("PEM", "Partner Ecosystem Maturity", 35, "Limited enterprise ecosystem participation and co-sell coverage."),
      dim("MAI", "Margin & Incentive Alignment", 28, "Deal economics skew transactional; weak alignment with recurring expansion."),
      dim("TCS", "Technical Capability Score", 34, "Thin bench for complex integrations and enterprise support."),
      dim("SCSC", "Sales Cycle Structural Compatibility", 30, "Short SMB cycles do not mirror enterprise evaluation patterns."),
      dim("RTA", "Regulated & Tender Alignment", 29, "Minimal experience with regulated procurement and compliance reviews."),
    ],
    clientLogos: ["Local Retail Co", "Studio Associati"],
  },
  {
    id: "8",
    name: "Brussels Edge Group",
    tagline: "EU Institutions & Regulated Buyers",
    country: "Belgium",
    flag: "🇧🇪",
    type: ["Systems Integrator", "VAR"],
    industries: ["Public Sector", "Cleantech"],
    gcs: 79,
    dimensions: { PEM: 81, MAI: 76, TCS: 72, SCSC: 74, RTA: 86 },
    band: "Good Fit",
    color: "#84cc16",
    description:
      "Brussels-based SI with EU institution adjacency and cleantech buyer access across Benelux.",
    salesCycle: "4–10 months",
    support: "L2",
    publicSector: true,
    logo: "E",
    activeDays: 9,
    contact: {
      name: "Amélie Laurent",
      title: "Alliances Director",
      email: "a.laurent@brusselsedge.eu",
      phone: "+32 2 512 9000",
    },
    profileCompleteness: 90,
    lastUpdated: "4 days ago",
    coverageCountries: ["Belgium", "Luxembourg", "France"],
    capabilities: ["EU procurement", "Sustainability reporting", "Bilingual delivery"],
    channelProfile: [
      { label: "Primary motion", value: "SI-led with framework agreements" },
      { label: "ACV band served", value: "60k–220k EUR" },
      { label: "Certifications", value: "ISO 27001, public sector badges" },
      { label: "Support tiers", value: "L2 EU hours" },
      { label: "Deal desk", value: "EU institutions desk" },
    ],
    matchSummary:
      "Good fit (79/100). Strong regulated and EU-adjacent alignment; complementary to your cleantech and public-sector pipeline.",
    dimensionDetails: [
      dim("PEM", "Partner Ecosystem Maturity", 81, "Established relationships across EU-facing buyers and frameworks."),
      dim("MAI", "Margin & Incentive Alignment", 76, "Comfortable with SaaS resale and multi-year expansion."),
      dim("TCS", "Technical Capability Score", 72, "Capable delivery for enterprise integrations and security reviews."),
      dim("SCSC", "Sales Cycle Structural Compatibility", 74, "Longer cycles align with complex stakeholder maps."),
      dim("RTA", "Regulated & Tender Alignment", 86, "Strong tender and compliance experience in regulated environments."),
    ],
    clientLogos: ["EU Agency Programmes", "GreenGrid BE"],
  },
  {
    id: "9",
    name: "Vistula Digital Sp. z o.o.",
    tagline: "Poland & CEE Emerging Enterprise",
    country: "Poland",
    flag: "🇵🇱",
    type: ["VAR", "MSP"],
    industries: ["Manufacturing", "Fintech"],
    gcs: 48,
    dimensions: { PEM: 52, MAI: 46, TCS: 50, SCSC: 49, RTA: 44 },
    band: "Weak Fit",
    color: "#6b7280",
    description:
      "CEE partner scaling enterprise motion; strong local presence with evolving resale maturity.",
    salesCycle: "3–6 months",
    support: "L2",
    publicSector: false,
    logo: "V",
    activeDays: 18,
    contact: {
      name: "Piotr Nowak",
      title: "Head of Channel",
      email: "p.nowak@vistuladigital.pl",
      phone: "+48 22 390 4400",
    },
    profileCompleteness: 69,
    lastUpdated: "6 days ago",
    coverageCountries: ["Poland", "Czech Republic"],
    capabilities: ["Localization", "Nearshore delivery", "Manufacturing integrations"],
    channelProfile: [
      { label: "Primary motion", value: "Resale + managed services" },
      { label: "ACV band served", value: "20k–120k EUR" },
      { label: "Certifications", value: "Regional compliance focus" },
      { label: "Support tiers", value: "L2 with nearshore team" },
      { label: "Deal desk", value: "Weekly pipeline sync" },
    ],
    matchSummary:
      "Weak fit (48/100). Geographic expansion potential, but incentive alignment and enterprise maturity trail your core partner profile.",
    dimensionDetails: [
      dim("PEM", "Partner Ecosystem Maturity", 52, "Growing ecosystem; fewer named enterprise logos in target segments."),
      dim("MAI", "Margin & Incentive Alignment", 46, "Mixed appetite for pure SaaS resale versus services-led economics."),
      dim("TCS", "Technical Capability Score", 50, "Improving delivery bench; still building complex SI depth."),
      dim("SCSC", "Sales Cycle Structural Compatibility", 49, "Some cycle mismatch between mid-market speed and enterprise rigor."),
      dim("RTA", "Regulated & Tender Alignment", 44, "Limited regulated-sector track record versus your priority accounts."),
    ],
    clientLogos: ["PolManufacture", "CentralPay"],
  },
  {
    id: "10",
    name: "Gulf Horizon Technologies",
    tagline: "Middle East Enterprise & Public Sector",
    country: "United Arab Emirates",
    flag: "🇦🇪",
    type: ["Systems Integrator"],
    industries: ["Cleantech", "Logistics"],
    gcs: 84,
    dimensions: { PEM: 86, MAI: 82, TCS: 78, SCSC: 80, RTA: 88 },
    band: "Strong Fit",
    color: "#22c55e",
    description:
      "MEA-focused SI with public-sector frameworks and enterprise references across sustainability programmes.",
    salesCycle: "4–9 months",
    support: "L3",
    publicSector: true,
    logo: "G",
    activeDays: 6,
    contact: {
      name: "Fatima Al Mansoori",
      title: "Chief Partnerships Officer",
      email: "f.almansoori@gulfhorizon.ae",
      phone: "+971 4 555 8800",
    },
    profileCompleteness: 95,
    lastUpdated: "2 days ago",
    coverageCountries: ["United Arab Emirates", "Saudi Arabia", "Qatar"],
    capabilities: ["Framework bidding", "L3 support", "Executive sponsorship", "Localization"],
    channelProfile: [
      { label: "Primary motion", value: "Enterprise SI with resale" },
      { label: "ACV band served", value: "USD 80k–350k" },
      { label: "Certifications", value: "Regional security standards" },
      { label: "Support tiers", value: "L3 with on-site options" },
      { label: "Deal desk", value: "MEA leadership review" },
    ],
    matchSummary:
      "Strong fit (84/100). Excellent alignment on regulated tenders and enterprise delivery; geography extends your EMEA strategy into priority MEA accounts.",
    dimensionDetails: [
      dim("PEM", "Partner Ecosystem Maturity", 86, "Mature alliances motion with repeatable co-sell in MEA."),
      dim("MAI", "Margin & Incentive Alignment", 82, "Aligned to recurring SaaS and expansion in multi-year agreements."),
      dim("TCS", "Technical Capability Score", 78, "Strong delivery organisation for complex deployments."),
      dim("SCSC", "Sales Cycle Structural Compatibility", 80, "Cycles and stakeholder maps fit enterprise evaluations."),
      dim("RTA", "Regulated & Tender Alignment", 88, "Deep public-sector and framework experience."),
    ],
    clientLogos: ["Emirates Logistics", "Desert Renewables"],
  },
  {
    id: "11",
    name: "Emerald Isle Channel Co.",
    tagline: "Ireland SaaS Growth Partner",
    country: "Ireland",
    flag: "🇮🇪",
    type: ["VAR"],
    industries: ["Fintech", "Professional Services"],
    gcs: 55,
    dimensions: { PEM: 58, MAI: 54, TCS: 52, SCSC: 56, RTA: 50 },
    band: "Conditional",
    color: "#f59e0b",
    description:
      "Ireland-focused VAR with fintech density; building enterprise SI muscle alongside resale.",
    salesCycle: "3–6 months",
    support: "L2",
    publicSector: false,
    logo: "C",
    activeDays: 22,
    contact: {
      name: "Orla Brennan",
      title: "Partner Lead",
      email: "o.brennan@emeraldisle.ie",
      phone: "+353 1 660 2200",
    },
    profileCompleteness: 74,
    lastUpdated: "10 days ago",
    coverageCountries: ["Ireland"],
    capabilities: ["Fintech integrations", "GDPR alignment", "Rapid pilots"],
    channelProfile: [
      { label: "Primary motion", value: "Mid-market resale" },
      { label: "ACV band served", value: "25k–110k EUR" },
      { label: "Certifications", value: "Vendor gold" },
      { label: "Support tiers", value: "L2 business hours" },
      { label: "Deal desk", value: "Shared" },
    ],
    matchSummary:
      "Conditional fit (55/100). Useful for Ireland coverage, but enterprise depth and tender alignment are still developing versus your core needs.",
    dimensionDetails: [
      dim("PEM", "Partner Ecosystem Maturity", 58, "Growing ecosystem; improving co-sell discipline."),
      dim("MAI", "Margin & Incentive Alignment", 54, "Partial alignment; some preference for services attach."),
      dim("TCS", "Technical Capability Score", 52, "Adequate for typical deployments; limited L3 depth."),
      dim("SCSC", "Sales Cycle Structural Compatibility", 56, "Generally aligned, with occasional mid-market compression."),
      dim("RTA", "Regulated & Tender Alignment", 50, "Moderate tender experience; not a primary strength."),
    ],
    clientLogos: ["Dublin FinOps", "Celtic Services Group"],
  },
  {
    id: "12",
    name: "Alpine Nexus Switzerland AG",
    tagline: "Swiss Enterprise & Compliance-Led SI",
    country: "Switzerland",
    flag: "🇨🇭",
    type: ["Systems Integrator", "Consultancy"],
    industries: ["Fintech", "Manufacturing"],
    gcs: 38,
    dimensions: { PEM: 42, MAI: 36, TCS: 40, SCSC: 39, RTA: 35 },
    band: "Weak Fit",
    color: "#6b7280",
    description:
      "Swiss SI with premium brand but selective resale appetite and long evaluation cycles that may slow pipeline velocity.",
    salesCycle: "6–12 months",
    support: "L3",
    publicSector: false,
    logo: "S",
    activeDays: 40,
    contact: {
      name: "Stefan Keller",
      title: "Managing Director",
      email: "s.keller@alpinenexus.ch",
      phone: "+41 44 500 7700",
    },
    profileCompleteness: 66,
    lastUpdated: "2 weeks ago",
    coverageCountries: ["Switzerland"],
    capabilities: ["Compliance-led evaluations", "Board-level access", "Premium support"],
    channelProfile: [
      { label: "Primary motion", value: "Consulting-led; selective resale" },
      { label: "ACV band served", value: "CHF 120k–600k" },
      { label: "Certifications", value: "Swiss banking-grade standards" },
      { label: "Support tiers", value: "L3 premium" },
      { label: "Deal desk", value: "Executive approval required" },
    ],
    matchSummary:
      "Weak fit (38/100). High-quality brand but low velocity and partial incentive alignment with your scale partner model.",
    dimensionDetails: [
      dim("PEM", "Partner Ecosystem Maturity", 42, "Selective partnerships; limited volume co-sell."),
      dim("MAI", "Margin & Incentive Alignment", 36, "Prefers high-touch consulting economics over standardized resale."),
      dim("TCS", "Technical Capability Score", 40, "Strong technically, but not optimised for repeatable SaaS delivery at scale."),
      dim("SCSC", "Sales Cycle Structural Compatibility", 39, "Very long cycles may conflict with pipeline targets."),
      dim("RTA", "Regulated & Tender Alignment", 35, "Strong compliance posture, but misaligned go-to-market speed."),
    ],
    clientLogos: ["Helvetia Capital", "AlpineManufacture"],
  },
];

export function getPartnerById(id: string): Partner | undefined {
  return partners.find((p) => p.id === id);
}
