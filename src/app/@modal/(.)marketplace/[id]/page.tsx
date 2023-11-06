import { revalidatePath } from "next/cache";
import React from "react";
import BuyItemBtn from "~/app/_components/marketplace/BuyItemBtn";
import ModalExitBtn from "~/app/_components/modal/ModalExitBtn";
import ModalCardImage from "~/app/_components/pokemon/ModalCardImage";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

const marketplaceModal = async ({ params }: { params: { id: string } }) => {
  const item = await api.marketplace.getItem.query({
    itemId: params.id,
  });
  const userCoins = await api.user.getPokeCoins.query();
  const session = await getServerAuthSession();

  return (
    <div className="fixed z-10 h-screen w-screen bg-black bg-opacity-70">
      <div className="absolute left-[50%] top-[50%] flex w-full -translate-x-[50%] -translate-y-[50%] flex-col  items-center justify-center gap-4 ">
        {item && (
          <div className="relative flex w-full flex-col items-center justify-center gap-4 md:w-3/4 lg:w-2/4">
            <ModalExitBtn />
            <h2 className="text-5xl font-semibold text-neutral-100">
              {item.pokemonCard.name}
            </h2>
            <ModalCardImage
              id={item.pokemonCard.id.toString()}
              card={item.pokemonCard}
              showAmount={false}
              showCost={false}
            />
            <p className="rounded-lg bg-yellow-200 p-2">
              {item.cost} pokécoins
            </p>
            {session?.user.id !== item.sellerId && userCoins && (
              <BuyItemBtn pokeCoins={userCoins.pokeCoins} item={item} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default marketplaceModal;
