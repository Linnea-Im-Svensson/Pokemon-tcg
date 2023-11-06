import { api } from "~/trpc/server";
import DashboardCard from "../_components/dashboard/DashboardCard";
import Image from "next/image";
import DashboardPokemonPreview from "../_components/dashboard/DashboardPokemonPreview";

const dashboardPage = async () => {
  const data = await api.dashboard.getDashBoardData.query();
  const cards = await api.cards.getAllCards.query();
  return (
    <div className="pt-20">
      <div className="flex items-center justify-between gap-4 p-4">
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
            {cards.map((card, index) => (
              <DashboardPokemonPreview
                card={card}
                index={index}
                key={card.id}
              />
            ))}
          </div>
        </DashboardCard>
      </div>
    </div>
  );
};

export default dashboardPage;
