import { getServerAuthSession } from "~/server/auth";
import DashboardContainer from "../_components/dashboard/DashboardContainer";

const dashboardPage = async () => {
  const session = await getServerAuthSession();
  return <div>{session?.user.role === "Admin" && <DashboardContainer />}</div>;
};

export default dashboardPage;
