/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class", // Use the 'class' strategy for more control over dark mode
  theme: {
    extend: {
      colors: {
        // background: "var(--background)",
        // foreground: "var(--foreground)",
        dark: {
          bg: "#121212", // Very dark background for main layout
          surface: "#1E1E1E", // Slightly lighter for cards, modals, etc.
          overlay: "#2A2A2A", // Overlay or hovered items
          border: "#333333", // Border color for input fields, cards
          textPrimary: "#EDEDED", // Bright text color for primary headings
          textSecondary: "#A1A1A1", // Muted text for secondary elements
          accent: "#BB86FC", // Purple accent for highlights
          accentHover: "#9A70D6", // Darker accent for hover effects
          success: "#03DAC5", // Teal success color for alerts
          error: "#CF6679", // Red error color
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
      },
    },
  },
  plugins: [],
};
