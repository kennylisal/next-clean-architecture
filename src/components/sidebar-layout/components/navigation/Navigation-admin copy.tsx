// /* eslint-disable @typescript-eslint/no-explicit-any */
// import List from "@mui/material/List";
// import { NavigationItem } from "./components/navigation-item/NavigationItem";
// import {
//   AccountBoxOutlined,
//   DashboardOutlined,
//   DesignServicesOutlined,
//   ShapeLineOutlined,
//   ViewStreamOutlined,
// } from "@mui/icons-material";
// import { useMemo } from "react";
// // import { useNotifications } from "../../../../hooks/api/use-notifications/useNotifications";

// import type { NavigationItemType } from "./components/navigation-item/types";
// import { routes } from "@/components/constant/route";

// export function NavigationAdmin() {
//   const navigationItems: NavigationItemType[] = useMemo(
//     () => [
//       {
//         header: "Dashboards",
//       },
//       {
//         path: routes.dashboard,
//         label: "Dashboard",
//         icon: (props: any) => <DashboardOutlined {...props} />,
//       },
//       {
//         header: "Pages",
//       },
//       {
//         label: "User",
//         icon: (props: any) => <AccountBoxOutlined {...props} />,
//         description: "User management",
//         items: [
//           {
//             path: routes.userAccount,
//             label: "Account",
//           },
//           {
//             path: routes.userProfile,
//             label: "Profile",
//           },
//           {
//             path: routes.userList,
//             label: "List",
//           },
//           {
//             path: routes.userEdit,
//             label: "Edit",
//           },
//           {
//             path: routes.userCreate,
//             label: "Create",
//           },
//         ],
//       },

//       {
//         header: "Documentation",
//       },
//       {
//         label: "Theme",
//         icon: (props: any) => <DesignServicesOutlined {...props} />,
//         items: [
//           {
//             path: routes.themeTypography,
//             label: "Typography",
//           },
//           {
//             path: routes.themeColors,
//             label: "Colors",
//           },
//         ],
//       },
//       {
//         label: "Components",
//         icon: (props: any) => <ShapeLineOutlined {...props} />,
//         items: [
//           {
//             path: routes.componentsButton,
//             label: "Button",
//           },
//         ],
//       },
//       {
//         header: "Navigation",
//       },
//       {
//         path: "",
//         label: "Number",
//         icon: (props: any) => <ViewStreamOutlined {...props} />,
//         badgeText: `2`,
//         badgeColor: "primary",
//       },
//     ],
//     []
//   );

//   const navigationItemsList = navigationItems.map((item) => {
//     return <NavigationItem key={Object.values(item).toString()} item={item} />;
//   });

//   return (
//     <List
//       sx={{ width: "100%", maxWidth: 360, padding: 2 }}
//       component="nav"
//       aria-labelledby="nested-list-subheader"
//     >
//       {navigationItemsList}
//     </List>
//   );
// }
