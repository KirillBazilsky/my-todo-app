"use client";

import React from "react";
import { signOut, useSession } from "next-auth/react";
import SignUpForm from "./components/SignUpForm";
import SignInForm from "./components/SignInForm";
import UserInfo from "./components/UserInfo";
import { useState } from "react";
import clsx from "clsx";

const AuthPage = () => {
  const { data: session, status } = useSession();
  const [isSignUpOpen, setIsSignUpOpen] = useState<boolean>(false);

  const handleLogout = async () => {
    await signOut();
  };

  if(status === "loading") {
    return <p>...Loading</p>
  }

  return (
    <div className="flex-wrapper flex-col mt-20">
      <div className="flex-wrapper flex-row">
        <button
          onClick={() => setIsSignUpOpen(false)}
          className={clsx(
            "btn btn-primary",
            { "btn-active": !isSignUpOpen },
            { "btn-disabled": session }
          )}
        >
          Sign In
        </button>
        <button
          onClick={() => setIsSignUpOpen(true)}
          className={clsx(
            "btn btn-primary",
            { "btn-active": isSignUpOpen },
            { "btn-disabled": session }
          )}
        >
          Sign Up
        </button>
      </div>
      {isSignUpOpen && !session ? <SignUpForm /> : null}
      {!isSignUpOpen && !session ? <SignInForm /> : null}
      <UserInfo />
      <button onClick={handleLogout} className={clsx("btn btn-primary",{"btn-disabled": !session})}>
        Logout
      </button>
    </div>
  );
};

export default AuthPage;
