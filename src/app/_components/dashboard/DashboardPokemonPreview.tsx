"use client";

import { PokemonCard } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";

const DashboardPokemonPreview = ({
  card,
  index,
}: {
  card: PokemonCard;
  index: number;
}) => {
  const [editState, setEditState] = useState(false);
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border-2 border-black bg-white p-2">
      <Image
        src={card.image}
        alt={card.name}
        height={100}
        width={100}
        priority={index <= 9}
      />
      <div className="flex h-full w-full flex-col items-center justify-between">
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-col items-start justify-center">
            <p>Name:</p>
            {editState ? "" : <p>{card.name}</p>}
          </div>
          <div className="flex flex-col items-start justify-center">
            <p>Cost:</p>
            {editState ? "" : <p>{card.sellValue}</p>}
          </div>
          <div className="flex flex-col items-start justify-center">
            <p>Rarity:</p>
            {editState ? "" : <p>{card.rarity}</p>}
          </div>
        </div>

        <button className="h-10 w-full rounded-lg bg-yellow-200 hover:bg-yellow-300">
          Edit
        </button>
      </div>
    </div>
  );
};

export default DashboardPokemonPreview;
