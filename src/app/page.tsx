"use client";
import { ColorModeContext } from "@/components/context/ColorMode";
import { appTheme } from "@/components/theme/app-theme/appTheme";
import { getThemeByName } from "@/components/theme/theme";
import { ThemeConfigurator } from "@/components/theme/ThemeConfigurator";
import { ThemeProvider } from "@emotion/react";
import { Analytics } from "@mui/icons-material";
import { CssBaseline } from "@mui/material";
import React, { Suspense, useState } from "react";

export default function Home() {
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
  const JobList = React.lazy(
    () => import("@/components/pages/jobs/jobs-list/JobsListPage")
  );
  return (
    <Suspense>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={appTheme("light")}>
          <CssBaseline />
          <Analytics />
          <>
            <JobList />
            <ThemeConfigurator
              setThemeName={setThemeName}
              themeName={themeName}
            />
          </>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </Suspense>
  );
}
