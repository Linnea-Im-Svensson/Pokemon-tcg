"use client";

import Image from "next/image";
import { useState } from "react";
import PokemonCardModal from "./PokemonCardModal";
import { PokemonCard } from "@prisma/client";

type PokemonCardProps = {
  priority: boolean;
  owned: boolean;
  card: PokemonCard;
};

const PokemonCard = ({ priority, owned, card }: PokemonCardProps) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>
        <Image
          src={card.image}
          alt={card.name}
          priority={priority}
          width={150}
          height={300}
          className={`h-auto w-full rounded-lg ${!owned && "grayscale"}`}
        />
      </button>
      {showModal && (
        <PokemonCardModal card={card} setShowModal={setShowModal} />
      )}
    </>
  );
};

export default PokemonCard;
