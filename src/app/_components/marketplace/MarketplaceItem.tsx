import type { PokemonCard, User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

type MarketplaceItemProps = {
  card: PokemonCard;
  cost: number;
  priority: boolean;
  seller: User;
  itemId: string;
};

const MarketplaceItem = ({
  card,
  cost,
  priority,
  seller,
  itemId,
}: MarketplaceItemProps) => {
  return (
    <div>
      <Link href={`/marketplace/${itemId}`} className="flex h-fit flex-col">
        <Image
          src={card.image}
          alt={card.name}
          height={200}
          width={100}
          priority={priority}
          className="h-auto w-full hover:opacity-50"
        />
        <div className="rounded-lg bg-yellow-200 p-2">
          <p>{cost} pokécoins</p>
          <p>Sold by: {seller.name}</p>
        </div>
      </Link>
    </div>
  );
};

export default MarketplaceItem;
