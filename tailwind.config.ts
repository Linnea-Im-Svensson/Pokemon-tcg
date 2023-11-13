import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      backgroundImage: {
        pokemonBackground: "url('/background.png')",
        battleBackground: "url('/battle-bg.png')",
      },
    },
  },
  plugins: [],
} satisfies Config;
