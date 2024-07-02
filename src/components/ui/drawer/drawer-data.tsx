// Icons
import { Roles } from "@/lib/enums";
import { ReaderIcon, PersonIcon, BarChartIcon } from "@radix-ui/react-icons";

interface DrawerItem {
  label: string;
  icon: JSX.Element;
  href: string;
}

export const DRAWER_DATA: Record<string, DrawerItem[]> = {
  [Roles.ADMIN]: [
    {
      label: "Dashboard",
      icon: <BarChartIcon className="ml-3 mr-3 h-4 w-4" />,
      href: "/dashboard",
    },
    {
      label: "Users",
      icon: <PersonIcon className="ml-3 mr-3 h-4 w-4" />,
      href: "/users",
    },
    {
      label: "Ledger",
      icon: <ReaderIcon className="ml-3 mr-3 h-4 w-4" />,
      href: "/ledger",
    },
  ],
};
