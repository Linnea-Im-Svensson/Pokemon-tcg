"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import BattleScreen from "./BattleScreen";
import Pokeball, { GamePokemon } from "./Pokeball";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { api } from "~/trpc/react";

const ChooseYourStarterGame = () => {
  const [showBattleScreen, setShowBattleScreen] = useState(false);
  const [chosenPokemon, setChosenPokemon] = useState<GamePokemon | null>(null);
  const [showRules, setShowRules] = useState(false);
  const winValue = api.dashboard.getGameDetails.useQuery().data;

  return (
    <div className="h-full w-full overflow-hidden bg-battleBackground bg-cover bg-center pt-20">
      <button
        className="ml-4 flex items-center justify-center gap-2 rounded-lg bg-yellow-200 p-4"
        onClick={() => setShowRules(true)}
      >
        Rules
        <AiOutlineInfoCircle size={25} />
      </button>
      {/* rules */}
      <AnimatePresence mode="popLayout">
        {showRules && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed left-0 top-0 z-10 h-screen w-screen bg-black bg-opacity-70"
            onClick={() => setShowRules(false)}
          >
            <motion.div
              initial={{ translateX: -1000 }}
              animate={{ translateX: 0 }}
              exit={{ translateX: -1000 }}
              transition={{ duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              className="fixed left-0 top-0 flex h-screen w-full flex-col items-center justify-start gap-4 overflow-y-scroll bg-white p-4 md:w-96"
            >
              <button
                onClick={() => setShowRules(false)}
                className="right-2 top-0 ml-auto mt-16 h-8 w-8 rounded-full bg-yellow-200"
              >
                X
              </button>
              <p className="font mt-6 text-xl font-semibold underline">
                Element chart
              </p>
              <Image
                src="/elements.webp"
                alt="elements"
                height={300}
                width={300}
                priority
              />
              <p>
                Choose one of the 3 pokéballs which contains one of the
                following Pokémon: Charmander, Squirtle or Bulbasaur. The
                opponent trainer chooses a pokemon at random and the battle is
                decided based on the Pokémon's element.
              </p>
              <p className="mt-6 text-xl font-semibold">
                Price: {winValue?.[0]?.winValue} Pokécoins
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* opponent trainer */}
      <motion.div
        initial={{ translateX: -2000 }}
        animate={{ translateX: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="pr:10 flex h-1/2 w-full items-center justify-end pt-10 lg:pr-32"
      >
        <Image
          src="/trainer1.png"
          height={250}
          width={200}
          priority
          alt="opponent trainer"
          className="mr-4 mt-20 h-60 w-auto lg:mr-0 lg:mt-0 lg:h-96"
        />
      </motion.div>
      <div className="flex h-1/2 w-full items-center justify-center gap-10 ">
        <Pokeball
          pokemon="charmander1"
          height={150}
          width={150}
          setShowBattleScreen={setShowBattleScreen}
          setChosenPokemon={setChosenPokemon}
        />
        <Pokeball
          pokemon="squirtle"
          height={90}
          width={90}
          setShowBattleScreen={setShowBattleScreen}
          setChosenPokemon={setChosenPokemon}
        />
        <Pokeball
          pokemon="bulbasaur"
          height={100}
          width={100}
          setShowBattleScreen={setShowBattleScreen}
          setChosenPokemon={setChosenPokemon}
        />
      </div>
      {showBattleScreen && chosenPokemon && (
        <BattleScreen
          chosenPokemon={chosenPokemon}
          setChosenPokemon={setChosenPokemon}
          setShowBattleScreen={setShowBattleScreen}
        />
      )}
    </div>
  );
};

export default ChooseYourStarterGame;
