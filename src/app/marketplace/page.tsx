import { api } from "~/trpc/server";
import Banner from "../_components/marketplace/Banner";
import MarketplaceItem from "../_components/marketplace/MarketplaceItem";

const marketplacePage = async () => {
  const marketPlaceItems = await api.marketplace.getAllItems.query();

  return (
    <div className="flex h-full w-full ">
      <Banner />
      <div className="h-full w-20 bg-yellow-800"></div>
      <div className="grid h-full w-full grid-cols-5 gap-4 px-4 pt-56">
        {marketPlaceItems &&
          marketPlaceItems.map((item, indx) => (
            <MarketplaceItem
              key={item.id}
              card={item.pokemonCard}
              seller={item.seller}
              cost={item.cost}
              priority={indx <= 10}
            />
          ))}
      </div>
      <div className="h-full w-20 bg-yellow-800"></div>
    </div>
  );
};

export default marketplacePage;
