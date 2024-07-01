import { getServerSession } from "next-auth";

async function HomePage() {
  const session = await getServerSession();
  console.log("[BACK-INFO] session", session);

  return <div>HomePage</div>;
}

export default HomePage;
