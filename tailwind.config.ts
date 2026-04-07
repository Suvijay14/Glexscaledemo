import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        syne: ["var(--font-syne)", "system-ui", "sans-serif"],
        dm: ["var(--font-dm)", "system-ui", "sans-serif"],
      },
      colors: {
        purple: {
          primary: "#570284",
          light: "#7B35B8",
          dark: "#3D015C",
        },
        green: {
          accent: "#7DD855",
          light: "#9EE876",
        },
        dark: {
          bg: "#0A0A0F",
          surface: "#12101A",
          card: "#1A1625",
          border: "#1E1A2E",
        },
        text: {
          primary: "#FFFFFF",
          secondary: "#A89BC2",
          muted: "#6B5F82",
        },
      },
      backgroundImage: {
        "hero-radial":
          "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(87, 2, 132, 0.45) 0%, #0A0A0F 55%)",
        "stats-band":
          "linear-gradient(135deg, #570284 0%, #3D015C 50%, #570284 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
