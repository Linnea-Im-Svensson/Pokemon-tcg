import ModalExitBtn from "~/app/_components/modal/ModalExitBtn";
import ModalCardImage from "~/app/_components/pokemon/ModalCardImage";
import PokemonCardModalBtnContainer from "~/app/_components/pokemon/PokemonCardModalBtnContainer";
import { api } from "~/trpc/server";

const pokemonModalPage = async ({ params }: { params: { id: string } }) => {
  const card = await api.cards.getCard.query({
    cardId: +params.id,
  });
  const amountOfCards = await api.cards.getCardAmount.query({
    cardId: +params.id,
  });

  console.log(amountOfCards.length);
  return (
    <div className="fixed z-10 h-screen w-screen bg-black bg-opacity-70">
      <div className="absolute left-[50%] top-[50%] flex w-full -translate-x-[50%] -translate-y-[50%] flex-col  items-center justify-center gap-4 ">
        {card && (
          <div className="relative flex flex-col items-center justify-center gap-4">
            <ModalExitBtn />
            <h2 className="text-5xl font-semibold text-neutral-100">
              {card?.name}
            </h2>

            <ModalCardImage id={params.id} card={card} showAmount showCost />

            <PokemonCardModalBtnContainer
              card={card}
              amountOfCards={amountOfCards}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default pokemonModalPage;
