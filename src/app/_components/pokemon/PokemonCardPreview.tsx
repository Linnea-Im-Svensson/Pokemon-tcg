import Image from "next/image";
import { PokemonCard } from "@prisma/client";
import Link from "next/link";
import CardAmount from "./CardAmount";

type PokemonCardProps = {
  priority: boolean;
  owned: boolean;
  card: PokemonCard;
};

const PokemonCard = ({ priority, owned, card }: PokemonCardProps) => {
  return (
    <div className="relative">
      <Link href={`/pokemon/${card.id}`}>
        <Image
          src={card.image}
          alt={card.name}
          priority={priority}
          width={150}
          height={300}
          className={`h-auto w-full rounded-lg ${!owned && "grayscale"}`}
        />
      </Link>
      <CardAmount cardId={card.id} size="small" />
    </div>
  );
};

export default PokemonCard;
