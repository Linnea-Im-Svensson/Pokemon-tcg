"use client";

import type { CardOwnedByUser, PokemonCard } from "@prisma/client";
import { useState } from "react";
import { FaStore } from "react-icons/fa";
import { api } from "~/trpc/react";

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
  const [cost, setCost] = useState(card.sellValue);
  const [showMarketplaceBtns, setShowMarketplaceBtns] = useState(false);
  const ctx = api.useUtils();
  const { mutate, isLoading } = api.cards.sellOneCard.useMutation({
    onSuccess: async () => {
      await ctx.cards.getCardAmount.invalidate({ cardId: card.id });
      await ctx.cards.getUserCardsFromCollection.invalidate();
      await ctx.user.getPokeCoins.invalidate();
      await ctx.cards.getCardInfo.invalidate();
    },
  });

  const { mutate: mutateSellDuplicates, isLoading: isSellingDuplicates } =
    api.cards.sellDuplicateCards.useMutation({
      onSuccess: async () => {
        await ctx.cards.getCardAmount.invalidate({ cardId: card.id });
        await ctx.cards.getUserCardsFromCollection.invalidate();
        await ctx.user.getPokeCoins.invalidate();
        await ctx.cards.getCardInfo.invalidate();
      },
    });

  const { mutate: putUpCardForSale, isLoading: isPuttingUpForSale } =
    api.marketplace.putUpCardForSale.useMutation({
      onSuccess: async () => {
        await ctx.cards.getCardAmount.invalidate({ cardId: card.id });
        await ctx.cards.getUserCardsFromCollection.invalidate();
        await ctx.cards.getCardInfo.invalidate();
      },
    });

  const handleSale = () => {
    if (cost > 0) {
      putUpCardForSale({ cardId: card.id, cost: cost });
      setShowMarketplaceBtns(false);
    }
  };

  return (
    <div className="flex items-center justify-center gap-4">
      <div className="flex gap-4 pt-6">
        {!showMarketplaceBtns ? (
          <>
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
              onClick={() => setShowMarketplaceBtns(true)}
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
          </>
        ) : (
          <>
            <button
              onClick={() => setShowMarketplaceBtns(false)}
              className="rounded-lg bg-blue-200 p-2"
            >
              Back
            </button>
            <input
              type="number"
              placeholder="Price"
              className="rounded-lg p-2"
              value={cost}
              onChange={(e) => setCost(+e.target.value)}
            />
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
              Sell on marketplace
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PokemonCardModalBtnContainer;
