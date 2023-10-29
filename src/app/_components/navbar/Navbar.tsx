import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaCoins } from "react-icons/fa";
import { AiTwotoneShop } from "react-icons/ai";
import { FaStore } from "react-icons/fa";
import { CgGames } from "react-icons/cg";
import { motion } from "framer-motion";
import { api } from "~/trpc/react";
import { getServerAuthSession } from "~/server/auth";

const Navbar = async () => {
  const [showMenu, setShowMenu] = useState(false);
  const session = await getServerAuthSession();
  const pokeCoins = api.user.getPokeCoins.useQuery().data || 0;

  return (
    <nav className="fixed left-0 top-0 h-14 w-full border-b-8 border-black bg-red-400">
      <div className="flex items-start justify-around px-3">
        <div className="p-3">
          <Link href={session?.user ? "/auth/api/signout" : "/auth/api/signin"}>
            {session?.user ? "Sign Out" : "Sign in"}
          </Link>
        </div>
        <Link
          href={session?.user.role === "Admin" ? "/dashboard" : "/profile"}
          className="p-3"
        >
          {session?.user.role === "Admin" ? "Dashboard" : "Profile"}
        </Link>
        <Link href="/games" className="flex items-center gap-2 p-2">
          <CgGames size={32} />
          <p>Games</p>
        </Link>
        <motion.div
          whileHover={{
            rotate: "180deg",
          }}
          whileTap={{ rotate: "-360deg" }}
        >
          <Link href="/">
            <Image
              src="/pokeball.png"
              alt="pokeball menu button"
              priority
              height={100}
              width={100}
              onClick={() => setShowMenu((prev) => !prev)}
            />
          </Link>
        </motion.div>

        <Link href="/marketplace" className="flex items-center gap-2 p-2">
          <FaStore size={32} />
          <p>Marketplace</p>
        </Link>
        <Link href="/shop" className="flex items-center gap-2 p-2">
          <AiTwotoneShop size={32} />
          <p>Store</p>
        </Link>
        <div className="flex items-center gap-4 p-2">
          <FaCoins size={28} color="black" className="" />
          <p>{pokeCoins ? pokeCoins?.pokeCoins : pokeCoins}</p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
