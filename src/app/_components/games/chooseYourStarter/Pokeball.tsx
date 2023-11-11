import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { Result } from "~/utils/chooseYourStarterGame";

export type GamePokemon = "charmander1" | "squirtle" | "bulbasaur";

const Pokeball = ({
  pokemon,
  height,
  width,
  setShowBattleScreen,
  setChosenPokemon,
}: {
  pokemon: GamePokemon;
  height: number;
  width: number;
  setShowBattleScreen: React.Dispatch<React.SetStateAction<boolean>>;
  setChosenPokemon: React.Dispatch<React.SetStateAction<GamePokemon | null>>;
}) => {
  return (
    <motion.div
      whileHover={{ rotate: "20deg" }}
      className="flex cursor-pointer items-center justify-center"
      onClick={() => (setChosenPokemon(pokemon), setShowBattleScreen(true))}
    >
      <Image
        src={`/${pokemon}.png`}
        alt="charmander"
        height={height}
        width={width}
        priority
        className="absolute -rotate-[20deg] opacity-0 transition-all hover:opacity-100"
      />

      <Image
        src="/pokeball2.png"
        alt="pokéball"
        height={150}
        width={150}
        priority
        className="h-auto w-28 lg:w-40"
      />
    </motion.div>
  );
};

export default Pokeball;
