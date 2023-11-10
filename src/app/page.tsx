import PokemonCardContainer from "./_components/pokemon/PokemonCardContainer";
import { getServerAuthSession } from "~/server/auth";

export default async function Home() {
  const session = await getServerAuthSession();

  return <div>{session ? <PokemonCardContainer /> : ""}</div>;
}
