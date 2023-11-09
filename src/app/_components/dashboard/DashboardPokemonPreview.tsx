"use client";

import { PokemonCard, Rarity } from "@prisma/client";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import { useState } from "react";
import { api } from "~/trpc/react";
import Loading from "../utils/Loading";

type CardInfo = {
  name: string;
  sellValue: number;
  rarity: Rarity;
};

const DashboardPokemonPreview = ({
  card,
  index,
}: {
  card: PokemonCard;
  index: number;
}) => {
  const [editState, setEditState] = useState(false);
  const [cardInfo, setCardInfo] = useState<CardInfo>({
    name: card.name,
    sellValue: card.sellValue,
    rarity: card.rarity,
  });
  const rarity = Rarity;
  const ctx = api.useUtils();
  const { mutate, isLoading } = api.dashboard.updateCard.useMutation({
    onSuccess: async (data) => {
      setEditState(false);
    },
  });
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border-2 border-black bg-white p-2">
      <Image
        src={card.image}
        alt={card.name}
        height={100}
        width={100}
        priority={index <= 12}
        className="h-auto w-14"
      />
      <div className="flex h-full w-full flex-col items-center justify-between">
        <div className="flex w-full items-center justify-between gap-2">
          <div className="flex flex-col items-start justify-center">
            <p>Name:</p>
            {editState ? (
              <input
                type="text"
                value={cardInfo.name}
                onChange={(e) =>
                  setCardInfo({ ...cardInfo, name: e.target.value })
                }
                className="w-full rounded-lg border-2 border-black p-1"
              />
            ) : (
              <p>{card.name}</p>
            )}
          </div>
          <div className="flex flex-col items-start justify-center">
            <p>Cost:</p>
            {editState ? (
              <input
                type="number"
                value={cardInfo.sellValue}
                onChange={(e) =>
                  setCardInfo({ ...cardInfo, sellValue: +e.target.value })
                }
                className="w-20 rounded-lg border-2 border-black p-1"
              />
            ) : (
              <p>{card.sellValue}</p>
            )}
          </div>
          <div className="flex flex-col items-start justify-center">
            <p className="mb-auto">Rarity:</p>
            {editState ? (
              <select
                name="rarity"
                defaultValue={card.rarity}
                className="rounded-lg border-2 border-black p-1"
              >
                <option value={rarity.common}>{rarity.common}</option>
                <option value={rarity.uncommon}>{rarity.uncommon}</option>
                <option value={rarity.rare}>{rarity.rare}</option>
                <option value={rarity.doubleRare}>{rarity.doubleRare}</option>
                <option value={rarity.superRare}>{rarity.superRare}</option>
                <option value={rarity.artRare}>{rarity.artRare}</option>
                <option value={rarity.secretArtRare}>
                  {rarity.secretArtRare}
                </option>
              </select>
            ) : (
              <p>{card.rarity}</p>
            )}
          </div>
        </div>
        {editState ? (
          <button
            className="flex h-10 w-full items-center justify-center rounded-lg bg-yellow-200 p-2 hover:bg-yellow-300"
            onClick={() =>
              mutate({
                cardId: card.id,
                name: cardInfo.name,
                sellValue: cardInfo.sellValue,
                rarity: cardInfo.rarity,
              })
            }
          >
            {isLoading ? <Loading size="small" /> : "Save"}
          </button>
        ) : (
          <button
            className="h-10 w-full rounded-lg bg-yellow-200 p-2 hover:bg-yellow-300"
            onClick={() => setEditState(true)}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default DashboardPokemonPreview;
