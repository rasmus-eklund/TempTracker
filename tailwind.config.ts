import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    colors: {
      c1: "#FFE4D6",
      c2: "#FACBEA",
      c3: "#D988B9",
      c4: "#B0578D",
      black: "#000000",
      white: "#FFFFFF"
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
} satisfies Config;
