/* eslint-disable @typescript-eslint/no-explicit-any */
import List from "@mui/material/List";
import { NavigationItem } from "./components/navigation-item/NavigationItem";
import { AccountBoxOutlined, DashboardOutlined } from "@mui/icons-material";
import { useMemo } from "react";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
// import { useNotifications } from "../../../../hooks/api/use-notifications/useNotifications";

import type { NavigationItemType } from "./components/navigation-item/types";
import { routes } from "@/components/constant/route";

export function NavigationSiswa() {
  const navigationItems: NavigationItemType[] = useMemo(
    () => [
      {
        header: "POST",
      },
      {
        path: routes.dashboard,
        label: "General",
        icon: (props: any) => <DashboardOutlined {...props} />,
      },
      // {
      //   path: routes.dashboard,
      //   label: "For You",
      //   icon: (props: any) => <AccountBoxIcon {...props} />,
      // },
      {
        header: "Pages",
      },
      {
        label: "User",
        icon: (props: any) => <AccountBoxOutlined {...props} />,
        description: "User management",
        items: [
          {
            path: routes.userAccount,
            label: "Account",
          },
          {
            path: routes.userProfile,
            label: "Profile",
          },
          {
            path: routes.userList,
            label: "List",
          },
          {
            path: routes.userEdit,
            label: "Edit",
          },
          {
            path: routes.userCreate,
            label: "Create",
          },
        ],
      },
    ],
    []
  );

  const navigationItemsList = navigationItems.map((item) => {
    return <NavigationItem key={Object.values(item).toString()} item={item} />;
  });

  return (
    <List
      sx={{ width: "100%", maxWidth: 360, padding: 2 }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      {navigationItemsList}
    </List>
  );
}
