/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        parchment: "#F4F4F1",
        obsidian: "#121214",
        syntax: "#0B4F66",
        signal: "#FF4D00"
      },
      fontFamily: {
        mono: ["JetBrains Mono", "monospace"],
        serif: ["Playfair Display", "serif"]
      }
    }
  },
  plugins: []
};
