"use client";
import { useSession } from "next-auth/react";

function UsersPage() {
  const { data, status } = useSession();
  console.log(`[INFO] UsersPage.session`, data);
  if (status === "loading") return <div>Loading...</div>;

  return <div>UsersPage {data?.user?.name} </div>;
}

export default UsersPage;
