"use client";
import { ColorModeContext } from "@/components/context/ColorMode";
import { appTheme } from "@/components/theme/app-theme/appTheme";
import { ThemeConfigurator } from "@/components/theme/ThemeConfigurator";
import { Analytics } from "@mui/icons-material";
import { CssBaseline, ThemeProvider } from "@mui/material";
import React, { useState } from "react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
        <Analytics />
        <>
          {children}
          <ThemeConfigurator
            setThemeName={setThemeName}
            themeName={themeName}
          />
        </>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
