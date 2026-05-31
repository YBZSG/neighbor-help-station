/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        campus: {
          bg: "#F6FAF8",
          ink: "#102A43",
          muted: "#64748B",
          green: "#2F9E7E",
          greenSoft: "#E3F5EE",
          blue: "#2775B6",
          blueSoft: "#EAF3FB",
          orange: "#F59F43",
          orangeSoft: "#FFF1DD",
          coral: "#F56B61"
        }
      },
      boxShadow: {
        soft: "0 16px 42px rgba(16, 42, 67, 0.08)",
        lift: "0 18px 50px rgba(47, 158, 126, 0.16)"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "Microsoft YaHei", "sans-serif"]
      }
    }
  },
  plugins: []
};
