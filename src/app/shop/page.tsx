"use client";

import { PokemonCard } from "@prisma/client";
import Image from "next/image";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Loading from "../_components/utils/Loading";
import { api } from "~/trpc/react";
import OpenPack from "../_components/pokemon/OpenPack";

const shopPage = () => {
  const [showOpenPackModule, setShowOpenPackModule] = useState<boolean>(false);
  const [pokemonPack, setPokemonPack] = useState<PokemonCard[]>([]);
  const ctx = api.useUtils();
  const { mutate, isLoading } = api.pack.openPack.useMutation({
    onSuccess: (pokemonCards) => {
      setShowOpenPackModule(true);
      pokemonCards[1].forEach((card) => {
        setPokemonPack((prev) => [...prev, card.pokemonCard]);
      });
      ctx.user.getPokeCoins.invalidate();
    },
  });

  const { data } = api.user.getPokeCoins.useQuery();

  const [showDisabledNote, setShowDisabledNote] = useState(false);

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <button
        onClick={() => mutate()}
        disabled={isLoading || data?.pokeCoins! < 20}
        className="relative flex h-96 w-80 flex-col items-center justify-center gap-4 rounded-xl border-4 border-black bg-white pt-2"
        onMouseOver={() => data?.pokeCoins! < 20 && setShowDisabledNote(true)}
        onMouseOut={() => setShowDisabledNote(false)}
      >
        <AnimatePresence>
          {showDisabledNote && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute left-[50%] top-[50%] w-96 -translate-x-[50%] -translate-y-[50%] rounded-md bg-yellow-200 p-4 text-xl"
            >
              Not enough pokécoins
            </motion.p>
          )}
        </AnimatePresence>
        {isLoading ? (
          <div className="flex h-full w-full items-center justify-center bg-white">
            <Loading size="medium" />
          </div>
        ) : (
          <>
            <Image
              src="/pack.jpg"
              alt="pokemon card pack rounded-xl"
              height={500}
              width={300}
              priority
            />
            <p>20 Pokécoins</p>
          </>
        )}
      </button>
      {showOpenPackModule && (
        <OpenPack
          pokemonPack={pokemonPack}
          showOpenPackModule={showOpenPackModule}
          setShowOpenPackModule={setShowOpenPackModule}
          setPokemonPack={setPokemonPack}
        />
      )}
    </div>
  );
};

export default shopPage;
