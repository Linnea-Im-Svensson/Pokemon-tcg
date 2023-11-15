"use client";

import { api } from "~/trpc/react";
import { useState } from "react";
import DashboardCard from "./DashboardCard";
import DashboardPokemonPreview from "./DashboardPokemonPreview";
import Pagination from "../utils/Pagination";
import DashboardItemPreview from "./DashboardItemPreview";
import DashboardGamePreview from "./DashboardGamePreview";
import PikaLoading from "../utils/PikaLoading";

const DashboardContainer = () => {
  const [page, setPage] = useState(1);
  const totalCards = api.cards.getAllCards.useQuery().data?.length;
  const totalPages = totalCards && Math.ceil(totalCards / 6);
  const data = api.dashboard.getDashBoardData.useQuery().data;
  const cards = api.cards.getPaginationCards.useQuery({ page: page });
  const shopItems = api.dashboard.getShopItemDetails.useQuery().data;
  const games = api.dashboard.getGameDetails.useQuery().data;
  const [search, setSearch] = useState("");
  const searchedPokemonArr = api.cards.getSearchPokemon.useQuery({
    name: search,
  });

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
      <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-4 lg:h-[530px] lg:flex-row">
        <div className="h-full w-full lg:w-2/3">
          <DashboardCard bgColor="bg-red-200">
            <input
              type="text"
              className=" w-96 rounded-lg bg-white p-2"
              placeholder="Search for pokémon"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="grid h-full w-full grid-cols-1 justify-between gap-4 lg:grid-cols-2">
              {cards.isLoading || searchedPokemonArr.isFetching ? (
                <div className="flex h-full w-full items-center justify-center lg:-translate-y-48 lg:translate-x-52">
                  <PikaLoading />
                </div>
              ) : (
                <>
                  {search !== ""
                    ? searchedPokemonArr?.data?.map((card, index) => (
                        <DashboardPokemonPreview
                          card={card}
                          index={index}
                          key={card.id}
                        />
                      ))
                    : cards.data?.map((card, index) => (
                        <DashboardPokemonPreview
                          card={card}
                          index={index}
                          key={card.id}
                        />
                      ))}
                </>
              )}
            </div>
            {search === "" && (
              <Pagination
                totalPages={totalPages ?? 0}
                query={cards}
                page={page}
                setPage={setPage}
              />
            )}
          </DashboardCard>
        </div>
        <div className="h-full w-full lg:w-1/3">
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
              {games && games[0] && (
                <DashboardGamePreview
                  gameId={games[0].id}
                  gameName={games[0].name}
                  winValue={games[0].winValue}
                />
              )}
            </div>
          </DashboardCard>
        </div>
      </div>
    </div>
  );
};

export default DashboardContainer;
