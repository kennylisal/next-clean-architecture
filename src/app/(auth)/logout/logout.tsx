"use client";
import { Button } from "@mui/material";

export function LogoutComponent({ logOut }: { logOut: () => Promise<void> }) {
  return (
    <>
      <h1>Halaman logout</h1>
      <Button name="tester" onClick={logOut}>
        logout
      </Button>
    </>
  );
}
