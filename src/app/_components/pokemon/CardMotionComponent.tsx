"use client";

import type { PokemonCard } from "@prisma/client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

type CardMotionComponentProps = {
  card: PokemonCard;
  containerRef: React.Reference;
  index: number;
  setShowAllCards: React.Dispatch<React.SetStateAction<boolean>>;
  cardsToDraw: number;
  setCardsToDraw: React.Dispatch<React.SetStateAction<number>>;
};

const CardMotionComponent = ({
  card,
  containerRef,
  index,
  setShowAllCards,
  cardsToDraw,
  setCardsToDraw,
}: CardMotionComponentProps) => {
  const [dragEnded, setDragended] = useState(false);
  !cardsToDraw && setShowAllCards(true);
  return (
    <motion.div
      dragConstraints={containerRef}
      drag
      onDragEnd={() => (setDragended(true), setCardsToDraw((prev) => prev - 1))}
      dragSnapToOrigin
      dragDirectionLock
      dragMomentum={false}
      className={`absolute ${
        index === 9 && !dragEnded ? "z-50" : dragEnded ? "z-0" : "z-10"
      }`}
    >
      <Image
        src={card.image}
        alt={card.name}
        height={300}
        width={200}
        className={`bottom-4  rounded-xl `}
        draggable={false}
      />
    </motion.div>
  );
};

export default CardMotionComponent;
