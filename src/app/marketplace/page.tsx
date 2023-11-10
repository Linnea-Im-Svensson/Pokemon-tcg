import { api } from "~/trpc/server";
import Banner from "../_components/marketplace/Banner";
import MarketplaceItem from "../_components/marketplace/MarketplaceItem";

export default async function marketplacePage() {
  const marketPlaceItems = await api.marketplace.getAllItems.query();

  return (
    <div className="flex h-full w-full ">
      <Banner />
      <div className="grid h-full w-full grid-cols-3 gap-4 overflow-y-scroll px-4 pt-56 md:grid-cols-5 lg:grid-cols-7">
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
      </div>
    </div>
  );
}
