"use client";

import { api } from "~/trpc/react";
import { useEffect, useState } from "react";
import DashboardCard from "./DashboardCard";
import DashboardPokemonPreview from "./DashboardPokemonPreview";
import Pagination from "../utils/Pagination";

const DashboardContainer = () => {
  const [page, setPage] = useState(1);
  const totalCards = api.cards.getAllCards.useQuery().data?.length;
  const totalPages = totalCards && Math.ceil(totalCards / 12);
  const data = api.dashboard.getDashBoardData.useQuery().data;
  const cards = api.cards.getPaginationCards.useQuery({ page: page });

  const { mutate, isLoading } = api.dashboard.updateCard.useMutation();

  useEffect(() => {
    cards.refetch();
  }, [page]);

  return (
    <div className="pt-16">
      <div className="flex items-center justify-between gap-10 p-4">
        <DashboardCard bgColor="bg-white">
          <p className="text-xl font-semibold">Total users:</p>
          <p className="text-lg">{data?.totalAmountOfUsers}</p>
        </DashboardCard>
        <DashboardCard bgColor="bg-white">
          <p className="text-xl font-semibold">Average cards per user:</p>
          <p className="text-lg">{data?.cardAverage}</p>
        </DashboardCard>
      </div>
      <div className="w-full p-4">
        <DashboardCard bgColor="bg-red-200">
          <div className="grid w-full grid-cols-1 justify-between gap-4 md:grid-cols-2 lg:grid-cols-3">
            {cards.data?.map((card, index) => (
              <DashboardPokemonPreview
                card={card}
                index={index}
                key={card.id}
                // mutate={mutate}
                isLoading={isLoading}
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
      </div>
    </div>
  );
};

export default DashboardContainer;
