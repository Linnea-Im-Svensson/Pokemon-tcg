"use client";

import { MarketPlaceItem } from "@prisma/client";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import Loading from "../utils/Loading";

const BuyItemBtn = ({
  pokeCoins,
  item,
}: {
  pokeCoins: number;
  item: MarketPlaceItem;
}) => {
  const ctx = api.useUtils();
  const router = useRouter();
  const { mutate, isLoading } = api.marketplace.buyMarketItem.useMutation({
    onSuccess: () => {
      ctx.marketplace.getAllItems.invalidate();
      ctx.user.getPokeCoins.invalidate();
      router.back();
    },
  });
  return (
    <button
      className="flex h-14 w-20 items-center justify-center rounded-lg bg-blue-200 p-2"
      disabled={pokeCoins < item.cost || isLoading}
      onClick={() =>
        mutate({
          cardId: item.cardId,
          itemId: item.id,
          sellerId: item.sellerId,
          cost: item.cost,
        })
      }
    >
      {isLoading ? <Loading size="full" /> : "Buy"}
    </button>
  );
};

export default BuyItemBtn;
