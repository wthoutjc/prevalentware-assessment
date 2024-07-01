import { getServerSession } from "next-auth";
import SignOutButton from "../buttons/sign-out-button";

async function MyDrawer() {
  const session = await getServerSession();

  return (
    <section id="persistent-drawer" className="min-w-64 bg-[--primary-color]">
      {session && <SignOutButton />}
    </section>
  );
}

export { MyDrawer };
