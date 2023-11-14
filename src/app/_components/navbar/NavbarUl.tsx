"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CgGames } from "react-icons/cg";
import { motion } from "framer-motion";
import { FaCoins, FaStore } from "react-icons/fa";
import { AiTwotoneShop } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { RxDashboard } from "react-icons/rx";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { api } from "~/trpc/react";
import type { UserRole } from "@prisma/client";
import NavbarTitle from "./NavbarTitle";

const NavbarUl = ({ role }: { role?: UserRole }) => {
  const pokeCoins =
    role === "Admin" || "User"
      ? api.user.getPokeCoins.useQuery().data
      : { pokeCoins: 0 };

  return (
    <div className="flex items-start justify-around pl-3 pr-0 md:px-3 ">
      <Link
        href={role ? "/api/auth/signout" : "/api/auth/signin"}
        className="flex items-center gap-2 p-2"
      >
        {role ? (
          <>
            <FaArrowRightFromBracket size={30} />
            <NavbarTitle title="Sign Out" />
          </>
        ) : (
          <>
            <FaArrowRightToBracket size={30} />
            <NavbarTitle title="Sign In" />
          </>
        )}
      </Link>

      <Link
        href={role === "Admin" ? "/dashboard" : "/profile"}
        className="flex items-center gap-2 p-2"
      >
        {role === "Admin" ? (
          <>
            <RxDashboard size={32} />
            <NavbarTitle title="Dashboard" />
          </>
        ) : (
          <>
            <CgProfile size={32} />
            <NavbarTitle title="Profile" />
          </>
        )}
      </Link>
      <Link href="/games" className="flex items-center gap-2 p-2">
        <CgGames size={35} />
        <NavbarTitle title="Games" />
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
        <NavbarTitle title="Marketplace" />
      </Link>
      <Link href="/shop" className="flex items-center gap-2 p-2">
        <AiTwotoneShop size={32} />
        <NavbarTitle title="Store" />
      </Link>
      <div className="flex items-center gap-4 p-2">
        <FaCoins size={28} color="black" className="" />
        <p>{pokeCoins?.pokeCoins}</p>
      </div>
    </div>
  );
};

export default NavbarUl;
