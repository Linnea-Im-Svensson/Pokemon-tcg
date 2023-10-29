import { CardOwnedByUser, type PokemonCard } from "@prisma/client";
import PokemonCardPreview from "./PokemonCardPreview";
import { api } from "~/trpc/server";

const PokemonCardContainer = async () => {
  const cards = await api.cards.getAllCards.query();
  const userCardCollection = await api.cards.getUserCardsFromCollection.query();
  const checkIfOwned = (id: number) => {
    let owned = false;
    userCardCollection?.cardCollection.forEach((card) => {
      if (card.cardId === id) {
        owned = true;
      }
    });
    return owned;
  };

  return (
    <div className="grid max-h-screen grid-cols-3 gap-4 overflow-y-scroll px-4 pb-16 pt-20 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7">
      {cards &&
        cards.map((card) => (
          <div key={card.id}>
            <PokemonCardPreview
              card={card}
              owned={checkIfOwned(card.id)}
              priority={card.id < 31}
            />
            <p>{card.name}</p>
          </div>
        ))}
    </div>
  );
};

export default PokemonCardContainer;
