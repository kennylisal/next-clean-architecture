"use client";
import { getPostsForUserUsecase } from "@/application/use-case/get-posts-for-user-usecase";
import { ColorModeContext } from "@/components/context/ColorMode";
import { appTheme } from "@/components/theme/app-theme/appTheme";
import { getThemeByName } from "@/components/theme/theme";
import { ThemeConfigurator } from "@/components/theme/ThemeConfigurator";
import { DummyJsonPostRepositories } from "@/infrastructure/repositories/post.repositories.dummyjson";
import { getPostForUserController } from "@/interface-adapters/controllers/posts/get-posts-for-user-controller";
import { ThemeProvider } from "@emotion/react";
import { Analytics } from "@mui/icons-material";
import { CssBaseline } from "@mui/material";
import React, { Suspense, useEffect, useState } from "react";

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
  useEffect(() => {
    async function getPost() {
      //disini lanjut dependency injection
    }
    getPost();
  }, []);
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
