"use client";

import Image from "next/image";
import React from "react";
import CardAmount from "./CardAmount";
import { PokemonCard } from "@prisma/client";
import { motion } from "framer-motion";

const ModalCardImage = ({
  id,
  card,
  showAmount,
  showCost,
}: {
  id: string;
  card: PokemonCard;
  showAmount: boolean;
  showCost: boolean;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <Image
        src={`/${id}.jpg`}
        alt={`Pokemon nr ${card.name}`}
        height={300}
        width={200}
        priority
        className="h-[350px] w-auto  rounded-3xl"
      />
      {showAmount && <CardAmount cardId={card.id} size="large" />}
      {showCost && (
        <p className="absolute -right-4 bottom-0 flex h-8 w-fit items-center justify-center rounded-full border-2 border-black bg-yellow-200 p-2">
          {card.sellValue} coins
        </p>
      )}
    </motion.div>
  );
};

export default ModalCardImage;
