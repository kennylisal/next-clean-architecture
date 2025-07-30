"use client";

import {
  Box,
  Drawer,
  IconButton,
  Stack,
  styled,
  Toolbar,
  useTheme,
} from "@mui/material";

import MuiAppBar, { type AppBarProps } from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { NavigationAdmin } from "./components/navigation/Navigation-admin";

import { ToolbarElements } from "./components/toolbar-elements/ToolbarElements";
import { useAppNavigation } from "./components/navigation/hooks/use-app-navigation/useAppNavigation";

import type { ReactNode } from "react";
import { NavigationSiswa } from "./components/navigation/navigation-siswa";
// import { Logo } from "../Logo";

const drawerWidth = 280;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(4),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: 0,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: `${drawerWidth}px`,
  }),
}));

interface FoxAppBarProps extends AppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<FoxAppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(4, 1, 0, 4),
  // necessary for content to be below app bar
  justifyContent: "space-between",
}));

interface Props {
  children: ReactNode;
}

export function SidebarLayout({ children }: Props) {
  const theme = useTheme();
  const { isSidebarOpen, toggleSidebar } = useAppNavigation();

  return (
    <Box>
      <AppBar position="relative" open={isSidebarOpen} color="transparent">
        <Toolbar>
          <Stack
            justifyContent={isSidebarOpen ? "flex-end" : "space-between"}
            direction={"row"}
            flex={1}
            alignItems={"center"}
            sx={{ color: (theme) => theme.palette.text.primary }}
          >
            <IconButton
              color="inherit"
              aria-label="open navigation"
              onClick={toggleSidebar}
              edge="start"
              sx={{ mr: 2, ...(isSidebarOpen && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
            <ToolbarElements />
          </Stack>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        elevation={0}
        variant="persistent"
        anchor="left"
        open={isSidebarOpen}
      >
        <DrawerHeader>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"flex-start"}
          >
            <Box sx={{ width: 80, height: 30, backgroundColor: "black" }}></Box>
          </Stack>
          <IconButton onClick={toggleSidebar}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        {/* <NavigationAdmin /> */}
        <NavigationSiswa />
      </Drawer>
      <Main open={isSidebarOpen}>
        {/*<DrawerHeader />*/}
        {children}
      </Main>
    </Box>
  );
}
