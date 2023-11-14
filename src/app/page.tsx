import Link from "next/link";
import PokemonCardContainer from "./_components/pokemon/PokemonCardContainer";
import { getServerAuthSession } from "~/server/auth";
import Image from "next/image";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <div>
      {session ? (
        <PokemonCardContainer />
      ) : (
        <div className="flex h-screen w-full flex-col items-center justify-center gap-6 pt-20 ">
          <p className="font text-3xl font-semibold lg:text-6xl">
            Pokémon TCG Collection
          </p>
          <Link
            href="/api/auth/signin"
            className="relative hover:rotate-12 hover:opacity-50"
          >
            <Image
              src="/pokeball.png"
              alt="login button"
              height={150}
              width={150}
            />
            <p className="absolute left-[50%] top-[50%] flex w-24 -translate-x-[50%] -translate-y-[50%] items-center justify-center rounded-lg border-4 border-black bg-white text-2xl font-semibold">
              Sign in
            </p>
          </Link>
        </div>
      )}
    </div>
  );
}
