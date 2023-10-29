import PokemonCardContainer from "./_components/pokemon/PokemonCardContainer";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function Home() {
  const session = getServerAuthSession();

  return (
    <div>
      <PokemonCardContainer />
    </div>
  );
}
