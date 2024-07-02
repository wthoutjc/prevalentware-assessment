"use client";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Image from "next/image";

// Components
import SignOutButton from "../buttons/sign-out-button";
import { NavigationMenuList, NavigationMenu } from "../navigation-menu";
import DrawerItems from "./drawer-items";

function MyDrawer() {
  const { status, data: session } = useSession();
  const pathname = usePathname();

  const isAuth = status === "authenticated";
  const isLoading = status === "loading";

  return (
    <div
      id="persistent-drawer"
      className={`${
        isAuth ? "w-72" : isLoading ? "w-72" : "w-full"
      } flex flex-col bg-[--primary-color]`}
    >
      {!isAuth && !isLoading && (
        <div className="flex items-center justify-center content-between w-full h-full">
          <Image
            src="https://res.cloudinary.com/ddmeptk5c/image/upload/f_auto,q_auto/v1/prevalentware/lpmimvxfcrmwixkbpfns"
            width={400}
            height={250}
            alt="Prevalentware Logo"
            priority
          />
        </div>
      )}

      {isAuth && (
        <div className="flex justify-center items-center h-16 text-[--primary-contrast-color]">
          <h3>Prevalentware</h3>
        </div>
      )}

      {isAuth && session && session.user && (
        <NavigationMenu className="flex flex-col h-full justify-between min-w-full bg-[--primary-color]">
          <NavigationMenuList className="min-w-full">
            <DrawerItems user={session.user} pathname={pathname} />
          </NavigationMenuList>

          <SignOutButton />
        </NavigationMenu>
      )}
    </div>
  );
}

export { MyDrawer };
