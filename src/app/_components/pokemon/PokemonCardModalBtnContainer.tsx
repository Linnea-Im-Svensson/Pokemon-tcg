"use client";

import { CardOwnedByUser, PokemonCard } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaStore } from "react-icons/fa";
import { api } from "~/trpc/react";
import ModalExitBtn from "../modal/ModalExitBtn";

type PokemonCardModalBtnContainerProps = {
  card: PokemonCard;
  amountOfCards: CardOwnedByUser[];
};

const PokemonCardModalBtnContainer = ({
  card,
  amountOfCards,
}: PokemonCardModalBtnContainerProps) => {
  const cardArray = api.cards.getCardInfo.useQuery({
    cardId: card.id,
  }).data;
  const [amount, setAmount] = useState(amountOfCards.length);
  const ctx = api.useUtils();
  const { mutate, isLoading } = api.cards.sellOneCard.useMutation({
    onSuccess: () => {
      ctx.cards.getCardAmount.invalidate({ cardId: card.id });
      ctx.cards.getUserCardsFromCollection.invalidate();
      ctx.user.getPokeCoins.invalidate();
      ctx.cards.getCardInfo.invalidate();
    },
  });

  const { mutate: mutateSellDuplicates, isLoading: isSellingDuplicates } =
    api.cards.sellDuplicateCards.useMutation({
      onSuccess: () => {
        ctx.cards.getCardAmount.invalidate({ cardId: card.id });
        ctx.cards.getUserCardsFromCollection.invalidate();
        ctx.user.getPokeCoins.invalidate();
        ctx.cards.getCardInfo.invalidate();
      },
    });

  const { mutate: putUpCardForSale, isLoading: isPuttingUpForSale } =
    api.marketplace.putUpCardForSale.useMutation({
      onSuccess: () => {
        ctx.cards.getCardAmount.invalidate({ cardId: card.id });
        ctx.cards.getUserCardsFromCollection.invalidate();
        ctx.cards.getCardInfo.invalidate();
      },
    });
  const marketSellPrice = useRef(null);

  const handleSale = () => {
    if (marketSellPrice.current !== null && marketSellPrice.current > 0) {
      putUpCardForSale({ cardId: card.id, cost: marketSellPrice.current });
    }
  };

  const router = useRouter();

  return (
    <div className="flex items-center justify-center gap-4">
      <div className="flex gap-4 pt-6">
        <button
          onClick={() => (
            setAmount((prev) => prev - 1),
            mutate({ cardId: card.id, cardValue: card.sellValue })
          )}
          className="rounded-lg bg-blue-200 p-2 disabled:opacity-50"
          disabled={
            isLoading ||
            cardArray?.length === 0 ||
            isSellingDuplicates ||
            isPuttingUpForSale
          }
        >
          Sell one
        </button>
        <button
          onClick={() => (
            setAmount(1),
            mutateSellDuplicates({
              cardId: card.id,
              totalAmount: amount - 1,
              cardValue: card.sellValue,
            })
          )}
          disabled={
            (cardArray && cardArray.length <= 1) ||
            isSellingDuplicates ||
            isLoading ||
            isPuttingUpForSale
          }
          className="rounded-lg bg-blue-200 p-2 disabled:opacity-50"
        >
          Sell duplicates
        </button>
        <button
          onClick={() => handleSale()}
          disabled={
            (cardArray && cardArray.length === 0) ||
            isSellingDuplicates ||
            isLoading ||
            isPuttingUpForSale
          }
          className="flex gap-4 rounded-lg bg-blue-200 p-2 disabled:opacity-50"
        >
          <FaStore size={25} />
          Put up on marketplace
        </button>
      </div>
    </div>
  );
};

export default PokemonCardModalBtnContainer;
