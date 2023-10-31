import { PokemonCard, User } from "@prisma/client";
import Image from "next/image";

type MarketplaceItemProps = {
  card: PokemonCard;
  cost: number;
  priority: boolean;
  seller: User;
};

const MarketplaceItem = ({
  card,
  cost,
  priority,
  seller,
}: MarketplaceItemProps) => {
  return (
    <div className="flex flex-col">
      <Image
        src={card.image}
        alt={card.name}
        height={300}
        width={200}
        priority={priority}
        className="h-auto w-full"
      />
      <p>{cost} pokécoins</p>
      <p>Sold by: {seller.name}</p>
    </div>
  );
};

export default MarketplaceItem;
