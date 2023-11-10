import dashboardPage from "~/app/dashboard/page";

const DashboardCard = ({
  children,
  bgColor,
}: {
  children: any;
  bgColor: string;
}) => {
  return (
    <div
      className={`flex w-full flex-col items-center justify-center gap-2 rounded-lg border-4 border-black ${bgColor} p-2`}
    >
      {children}
    </div>
  );
};

export default DashboardCard;
