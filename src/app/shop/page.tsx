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
  const items = api.dashboard.getShopItemDetails.useQuery().data;

  const { data } = api.user.getPokeCoins.useQuery();

  const [showDisabledNote, setShowDisabledNote] = useState(false);

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      {items && items[0]?.cost && (
        <button
          onClick={() => items[0]?.cost && mutate({ itemCost: items[0]?.cost })}
          disabled={isLoading || data?.pokeCoins! < items[0]?.cost}
          className="relative flex min-h-[320px] w-80 flex-col items-center justify-center gap-4 rounded-xl border-4 border-black bg-white py-4"
          onMouseOver={() =>
            data?.pokeCoins! < items[0]?.cost! && setShowDisabledNote(true)
          }
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
              {items && (
                <>
                  <p>{items[0]?.name}</p>
                  <Image
                    src="/pack.jpg"
                    height={500}
                    width={300}
                    alt="pokemon card pack"
                    className="h-auto w-80 rounded-xl"
                    priority
                  />
                  <p>{items[0]?.cost} Pokécoins</p>
                </>
              )}
            </>
          )}
        </button>
      )}

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
