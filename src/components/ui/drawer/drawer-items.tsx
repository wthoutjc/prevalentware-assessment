import Link from "next/link";
import { User } from "@/lib/interfaces";
import { DRAWER_DATA } from "./drawer-data";
import { NavigationMenuItem, NavigationMenuLink } from "../navigation-menu";

// Utils
import { isActive } from "@/utils/is-active";

interface Props {
  user: User;
  pathname: string;
}

function DrawerItems({ user, pathname }: Props) {
  const { role } = user;

  return DRAWER_DATA[role].map(({ href, label, icon }, index) => (
    <li key={index}>
      <Link href={href} passHref>
        <NavigationMenuItem
          className={`p-2 mb-2 rounded-xl flex items-center justify-start text-accent-foreground ${
            isActive(pathname, href) && "bg-[--primary-color-dark]"
          } hover:bg-[--primary-color-light] transition-colors`}
        >
          {icon}

          <NavigationMenuLink>
            <small className="text-sm font-light leading-none">{label}</small>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </Link>
    </li>
  ));
}

export default DrawerItems;
