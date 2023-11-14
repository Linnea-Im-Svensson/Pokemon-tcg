"use client";

import React from "react";
import { api } from "~/trpc/react";
import PokemonCard from "../pokemon/PokemonCardPreview";
import Image from "next/image";

const LatestBigPulls = () => {
  const latestBigPulls = api.cards.getLatestBigPulls.useQuery().data;
  return (
    <div className="mb-6 mt-auto flex h-60 w-4/5 items-center justify-start gap-4 overflow-x-scroll bg-blue-50">
      {latestBigPulls?.map((card) => (
        <Image
          src={card.pokemonCard.image}
          alt={card.pokemonCard.name}
          key={card.id}
          height={150}
          width={150}
          className="h-full w-auto rounded-lg"
        />
      ))}
    </div>
  );
};

export default LatestBigPulls;
