"use client";
import { ColorModeContext } from "@/components/context/ColorMode";
import { PageHeader } from "@/components/page-header/PageHeader";
import { SidebarLayout } from "@/components/sidebar-layout/SidebarLayout";
import { appTheme } from "@/components/theme/app-theme/appTheme";
import { ThemeConfigurator } from "@/components/theme/ThemeConfigurator";
import { AccountBalance, Analytics } from "@mui/icons-material";
import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((segment) => segment);
  const [mode, setMode] = React.useState<"light" | "dark">("light");
  const [themeName, setThemeName] = useState<
    "appTheme" | "shadTheme" | "cyberpunkTheme" | "ukrTheme"
  >("ukrTheme");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={appTheme("light")}>
        <CssBaseline />
        <SidebarLayout>
          <Container maxWidth={"lg"}>
            <AccountBalance />
            <PageHeader title={"Dashboard"} breadcrumbs={pathSegments} />
            {children}
          </Container>
          <ThemeConfigurator
            setThemeName={setThemeName}
            themeName={themeName}
          />
        </SidebarLayout>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
