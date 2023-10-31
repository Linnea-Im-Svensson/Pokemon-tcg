"use client";

import { PokemonCard } from "@prisma/client";
import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import CardMotionComponent from "./CardMotionComponent";
import Image from "next/image";

type OpenPackProps = {
  pokemonPack: PokemonCard[];
  showOpenPackModule: boolean;
  setShowOpenPackModule: React.Dispatch<React.SetStateAction<boolean>>;
  setPokemonPack: React.Dispatch<React.SetStateAction<PokemonCard[]>>;
};

const OpenPack = ({
  pokemonPack,
  showOpenPackModule,
  setShowOpenPackModule,
  setPokemonPack,
}: OpenPackProps) => {
  const reversePack: PokemonCard[] = pokemonPack
    .filter((card) => card.rarity !== "common" && card.rarity !== "uncommon")
    .reverse()
    .concat(
      pokemonPack.filter(
        (card) => card.rarity === "common" || card.rarity === "uncommon",
      ),
    );
  const [pack, setPack] = useState<PokemonCard[]>(
    pokemonPack
      .filter((card) => card.rarity === "common" || card.rarity === "uncommon")
      .reverse()
      .concat(
        pokemonPack.filter(
          (card) => card.rarity !== "common" && card.rarity !== "uncommon",
        ),
      ),
  );
  const [showAllCards, setShowAllCards] = useState(false);
  const [cardsToDraw, setCardsToDraw] = useState(9);
  const containerRef = useRef(null);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className={`fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-70 px-4 ${
          showOpenPackModule ? "opacity-100" : "opacity-0"
        } transition-all`}
        onMouseDown={() => (setShowOpenPackModule(false), setPokemonPack([]))}
      >
        <div
          className={`relative flex h-3/4 ${
            showAllCards ? "mt-8 h-fit w-fit" : "w-[500px]"
          } items-center justify-center  rounded-lg p-4`}
          ref={containerRef}
          onMouseDown={(e) => e.stopPropagation()}
        >
          {!showAllCards && (
            <button
              className="absolute right-4 top-4 rounded-lg bg-red-500 p-2 text-white"
              onClick={() => setShowAllCards(true)}
            >
              Skip
            </button>
          )}

          {!showAllCards &&
            reversePack.map((card, indx) => (
              <CardMotionComponent
                card={card}
                containerRef={containerRef}
                key={indx}
                index={indx}
                setShowAllCards={setShowAllCards}
                cardsToDraw={cardsToDraw}
                setCardsToDraw={setCardsToDraw}
              />
            ))}
          {showAllCards && (
            <motion.div className="z-50 grid h-full w-full grid-cols-5 place-content-center gap-4">
              {pack.map((card, indx) => (
                <motion.div
                  key={indx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: indx * 0.3 }}
                  className={`rounded-xl shadow-xl ${
                    card.rarity === "rare"
                      ? "shadow-blue-500"
                      : card.rarity === "doubleRare"
                      ? "shadow-yellow-500"
                      : card.rarity === "superRare"
                      ? "shadow-orange-500"
                      : card.rarity === "artRare"
                      ? "shadow-purple-500"
                      : card.rarity === "secretArtRare"
                      ? "shadow-red-500"
                      : ""
                  }`}
                >
                  <Image
                    src={card.image}
                    alt={card.name}
                    height={200}
                    width={130}
                    priority
                    className="h-fit w-auto rounded-xl"
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default OpenPack;
