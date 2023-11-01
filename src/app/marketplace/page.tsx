"use client";

import { api } from "~/trpc/react";
import Banner from "../_components/marketplace/Banner";
import MarketplaceItem from "../_components/marketplace/MarketplaceItem";

const marketplacePage = () => {
  const marketPlaceItems = api.marketplace.getAllItems.useQuery().data;

  return (
    <div className="flex h-full w-full ">
      <Banner />
      <div className="grid h-full w-full grid-cols-3 gap-4 px-4 pt-56 md:grid-cols-5 lg:grid-cols-7">
        {marketPlaceItems &&
          marketPlaceItems.map((item, indx) => (
            <MarketplaceItem
              key={item.id}
              card={item.pokemonCard}
              seller={item.seller}
              cost={item.cost}
              priority={indx <= 10}
              itemId={item.id}
            />
          ))}
      </div>
    </div>
  );
};

export default marketplacePage;
