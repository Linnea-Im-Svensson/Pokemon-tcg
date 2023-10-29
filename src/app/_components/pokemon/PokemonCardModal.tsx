import { PokemonCard } from "@prisma/client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaStore } from "react-icons/fa";
import { api } from "~/trpc/react";

type PokemonCardModalProps = {
  card: PokemonCard;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const PokemonCardModal = ({ card, setShowModal }: PokemonCardModalProps) => {
  const ctx = api.useContext();
  let { data: amountOfCards } = api.cards.getCardAmount.useQuery({
    cardId: card.id,
  });
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    amountOfCards && setAmount(amountOfCards?.length);
    console.log(amount);
  }, [amountOfCards]);

  const { mutate, isLoading } = api.cards.sellOneCard.useMutation({
    onSuccess: () => {
      ctx.cards.getCardAmount.invalidate({ cardId: card.id });
      ctx.cards.getUserCardsFromCollection.invalidate();
      ctx.user.getPokeCoins.invalidate();
    },
  });

  const { mutate: mutateSellDuplicates, isLoading: isSellingDuplicates } =
    api.cards.sellDuplicateCards.useMutation({
      onSuccess: () => {
        ctx.cards.getCardAmount.invalidate({ cardId: card.id });
        ctx.cards.getUserCardsFromCollection.invalidate();
        ctx.user.getPokeCoins.invalidate();
      },
    });

  const { mutate: putUpCardForSale, isLoading: isPuttingUpForSale } =
    api.marketplace.putUpCardForSale.useMutation({
      onSuccess: () => {
        ctx.cards.getCardAmount.invalidate({ cardId: card.id });
        ctx.cards.getUserCardsFromCollection.invalidate();
      },
    });
  const marketSellPrice = useRef(null);

  const handleSale = () => {
    if (marketSellPrice.current !== null && marketSellPrice.current > 0) {
      putUpCardForSale({ cardId: card.id, cost: marketSellPrice.current });
    }
    console.log(marketSellPrice.current);
  };

  return (
    <div
      className="fixed left-0 top-0 z-20 h-screen w-screen bg-black bg-opacity-50"
      onClick={() => setShowModal(false)}
    >
      <div
        className="fixed left-[50%] top-[50%] flex h-3/4 w-3/4 -translate-x-[50%] -translate-y-[50%] items-center justify-center gap-10 rounded-lg bg-white p-4 shadow-md shadow-neutral-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center justify-center gap-6">
          <h1 className="text-4xl font-bold">{card.name}</h1>
          <Image
            src={card.image}
            alt={card.name}
            priority
            width={270}
            height={400}
            className="h-auto w-60 rounded-lg"
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-6">
          {<p>Amount of cards: {amount}</p>}

          <p>Value: {card.sellValue} coins</p>
          {/* btn container */}
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex gap-4">
              <button
                onClick={() => (
                  setAmount((prev) => prev - 1),
                  mutate({ cardId: card.id, cardValue: card.sellValue })
                )}
                className="rounded-lg bg-blue-200 p-2 disabled:opacity-50"
                disabled={
                  isLoading ||
                  amountOfCards?.length === 0 ||
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
                  (amountOfCards && amountOfCards.length <= 1) ||
                  isSellingDuplicates ||
                  isLoading ||
                  isPuttingUpForSale
                }
                className="rounded-lg bg-blue-200 p-2 disabled:opacity-50"
              >
                Sell duplicates
              </button>
            </div>
            {/* Put up card on marketplace */}
            <div className="mt-10">
              <div className="mb-4 flex items-center justify-center gap-4">
                <p>Pokécoins</p>
                <input
                  type="number"
                  className="h-10 w-28 rounded-lg bg-neutral-200 p-4 outline-none"
                  ref={marketSellPrice}
                />
              </div>
              <button
                onClick={() => handleSale()}
                disabled={
                  (amountOfCards && amountOfCards.length === 0) ||
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
        </div>
      </div>
    </div>
  );
};

export default PokemonCardModal;
