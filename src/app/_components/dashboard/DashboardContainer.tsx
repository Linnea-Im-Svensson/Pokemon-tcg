"use client";

import { api } from "~/trpc/react";
import { useState } from "react";
import DashboardCard from "./DashboardCard";
import DashboardPokemonPreview from "./DashboardPokemonPreview";
import Pagination from "../utils/Pagination";
import Image from "next/image";
import DashboardItemPreview from "./DashboardItemPreview";

const DashboardContainer = () => {
  const [page, setPage] = useState(1);
  const totalCards = api.cards.getAllCards.useQuery().data?.length;
  const totalPages = totalCards && Math.ceil(totalCards / 6);
  const data = api.dashboard.getDashBoardData.useQuery().data;
  const cards = api.cards.getPaginationCards.useQuery({ page: page });
  const shopItems = api.dashboard.getShopItemDetails.useQuery().data;

  return (
    <div className="pt-14">
      <div className="flex h-32 items-center justify-between gap-10 p-4">
        <DashboardCard bgColor="bg-white">
          <p className="text-xl font-semibold">Total users:</p>
          <p className="text-lg">{data?.totalAmountOfUsers}</p>
        </DashboardCard>
        <DashboardCard bgColor="bg-white">
          <p className="text-xl font-semibold">Average cards per user:</p>
          <p className="text-lg">
            {data?.cardAverage && Math.ceil(data?.cardAverage)}
          </p>
        </DashboardCard>
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-4 p-4 lg:h-[530px] lg:flex-row">
        <DashboardCard bgColor="bg-red-200">
          <input
            type="text"
            className=" w-96 rounded-lg bg-white p-2"
            placeholder="Search for pokémon"
          />
          <div className="grid w-full grid-cols-1 justify-between gap-4 lg:grid-cols-2">
            {cards.data?.map((card, index) => (
              <DashboardPokemonPreview
                card={card}
                index={index}
                key={card.id}
              />
            ))}
          </div>
          <Pagination
            totalPages={totalPages ?? 0}
            query={cards}
            page={page}
            setPage={setPage}
          />
        </DashboardCard>
        <DashboardCard bgColor="bg-white">
          {/* Shop items */}
          <p className="text-xl font-semibold underline">Shop Items:</p>
          <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-1">
            {shopItems && shopItems[0] && (
              <DashboardItemPreview
                itemId={shopItems[0].id}
                itemName={shopItems[0].name}
                cost={shopItems[0].cost}
              />
            )}
          </div>
          {/* Games */}
          <p className="text-xl font-semibold underline">Games:</p>
          <div className="grid w-full grid-cols-1 justify-between gap-4 lg:grid-cols-1">
            {shopItems && shopItems[0] && (
              <DashboardItemPreview
                itemId={shopItems[0].id}
                itemName={shopItems[0].name}
                cost={shopItems[0].cost}
              />
            )}
          </div>
        </DashboardCard>
      </div>
    </div>
  );
};

export default DashboardContainer;
