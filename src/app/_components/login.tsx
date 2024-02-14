"use client";
import { signIn } from "next-auth/react";
import Button from "./Button";

const Login = () => {
  return (
    <Button
      className="cursor-pointer rounded-md bg-black/80 p-2 px-6 text-white md:hover:bg-gray-400"
      onClick={async () => {
        await signIn();
      }}
    >
      Login
    </Button>
  );
};

export default Login;
