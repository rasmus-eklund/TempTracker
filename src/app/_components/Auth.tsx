"use client";
import { signIn, signOut } from "next-auth/react";
import { Button } from "~/components/ui/button";

export const Login = () => {
  return (
    <Button
      onClick={async () => {
        await signIn();
      }}
    >
      Login
    </Button>
  );
};
export const Logout = () => {
  return (
    <Button
      variant="secondary"
      onClick={async () => {
        await signOut();
      }}
    >
      Logout
    </Button>
  );
};
