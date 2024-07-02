import { getServerSession } from "next-auth";
import { authOptions } from "../../components/auth/options";

async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const { user } = session!;

  return <div>DashboardPage</div>;
}

export default DashboardPage;
