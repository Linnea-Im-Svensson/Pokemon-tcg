"use client";

import { api } from "~/trpc/react";
import DashboardCard from "../_components/dashboard/DashboardCard";
import DashboardPokemonPreview from "../_components/dashboard/DashboardPokemonPreview";
import { ReactElement, useEffect, useState } from "react";
import PaginationBtn from "../_components/utils/PaginationBtn";
import Pagination from "../_components/utils/Pagination";

const dashboardPage = () => {
  const [page, setPage] = useState(1);
  const totalCards = api.cards.getAllCards.useQuery().data?.length;
  const totalPages = totalCards && Math.ceil(totalCards / 12);
  const data = api.dashboard.getDashBoardData.useQuery().data;
  const cards = api.cards.getPaginationCards.useQuery({ page: page });

  useEffect(() => {
    cards.refetch();
  }, [page]);

  return (
    <div className="pt-16">
      <div className="flex items-center justify-between gap-10 p-4">
        <DashboardCard>
          <p className="text-xl font-semibold">Total users:</p>
          <p className="text-lg">{data?.totalAmountOfUsers}</p>
        </DashboardCard>
        <DashboardCard>
          <p className="text-xl font-semibold">Average cards per user:</p>
          <p className="text-lg">{data?.cardAverage}</p>
        </DashboardCard>
      </div>
      <div className="p-4">
        <DashboardCard bgColor="bg-red-200">
          <div className="grid grid-cols-1 justify-between gap-4 md:grid-cols-2 lg:grid-cols-3">
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
      </div>
    </div>
  );
};

// <{PokemonCard[], TRPCClientErrorLike<BuildProcedure<"query", >>}>

export default dashboardPage;
