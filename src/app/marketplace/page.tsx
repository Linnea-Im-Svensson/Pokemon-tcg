"use client";

import { useState } from "react";
import Banner from "../_components/marketplace/Banner";
import MarketplaceItem from "../_components/marketplace/MarketplaceItem";
import { api } from "~/trpc/react";
import Loading from "../_components/utils/Loading";
import PikaLoading from "../_components/utils/PikaLoading";

const marketplacePage = () => {
  const marketPlaceItems = api.marketplace.getAllItems.useQuery().data;
  const [search, setSearch] = useState("");
  const filteredItems = api.marketplace.getSearchedItems.useQuery({
    name: search,
  });
  return (
    <div className="flex h-full w-full ">
      <Banner />
      <input
        type="text"
        className="fixed left-[50%] top-24 w-96 -translate-x-[50%] rounded-lg border-2 border-neutral-200 bg-white p-2 md:top-28"
        placeholder="Search for pokémon"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {filteredItems.isLoading ? (
        <div className="mt-10 flex h-full w-full items-center justify-center">
          <PikaLoading />
        </div>
      ) : (
        <div className="grid h-full w-full grid-cols-3 gap-4 overflow-y-scroll px-4 pt-56 md:grid-cols-5 lg:grid-cols-7">
          {search === "" ? (
            <>
              {marketPlaceItems?.map((item, index) => (
                <MarketplaceItem
                  key={item.id}
                  card={item.pokemonCard}
                  seller={item.seller}
                  cost={item.cost}
                  priority={index <= 21}
                  itemId={item.id}
                />
              ))}
            </>
          ) : (
            <>
              {filteredItems.data?.map((item, index) => (
                <MarketplaceItem
                  key={item.id}
                  card={item.pokemonCard}
                  seller={item.seller}
                  cost={item.cost}
                  priority={index <= 21}
                  itemId={item.id}
                />
              ))}
              {!filteredItems.data?.[0] && <p>No results found...</p>}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default marketplacePage;
