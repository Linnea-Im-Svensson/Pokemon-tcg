"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CgGames } from "react-icons/cg";
import { motion } from "framer-motion";
import { FaCoins, FaStore } from "react-icons/fa";
import { AiTwotoneShop } from "react-icons/ai";
import { api } from "~/trpc/react";

const NavbarUl = ({ role }: { role: "Admin" | "User" }) => {
  const pokeCoins = api.user.getPokeCoins.useQuery().data;

  return (
    <div className="flex items-start justify-around px-3">
      <div className="p-3">
        <Link href={role ? "/auth/api/signout" : "/auth/api/signin"}>
          {role ? "Sign Out" : "Sign in"}
        </Link>
      </div>
      <Link href={role === "Admin" ? "/dashboard" : "/profile"} className="p-3">
        {role === "Admin" ? "Dashboard" : "Profile"}
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
        <p>{pokeCoins?.pokeCoins}</p>
      </div>
    </div>
  );
};

export default NavbarUl;
