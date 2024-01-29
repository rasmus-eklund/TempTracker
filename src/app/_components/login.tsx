"use client";
import { signIn } from "next-auth/react";

const Login = () => {
  return (
    <button
      className="cursor-pointer rounded-md bg-black/80 p-2 px-6 text-3xl text-white md:hover:bg-gray-400"
      onClick={async () => {
        await signIn();
      }}
    >
      Logga in
    </button>
  );
};

export default Login;
