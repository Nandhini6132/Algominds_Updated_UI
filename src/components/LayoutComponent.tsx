"use client";

import React, { Suspense, useContext, useEffect } from "react";
import HomeComponent from "./home/HomeComponent";
import Header from "./header/Header";
import { ClerkProvider, useUser } from "@clerk/nextjs";

import { usePathname, useRouter } from "next/navigation";
import { currentUser, getAuth } from "@clerk/nextjs/server";
import MainHeader from "./mainHeader/MainHeader";

import Loading from "@/app/loading";
import ContextAPI from "./context";
import SignInPage from "@/app/sign-in/[[...sign-in]]/page";

const LayoutComponent = ({ children }: any) => {
  const path = usePathname();
  console.log(path);

  const { user, isSignedIn } = useUser();

  const router = useRouter();


  return (
    <>
      {!isSignedIn ? (
        <div className="h-[60vh]">
          <div
            style={{
              background:
                "linear-gradient(-150deg, #222222 15%, #373737 70%, #3c4859 94%)",
            }}
            className="h-[100%] skew-y-6 origin-top-right"
          ></div>
          <div className="absolute top-0 w-full">
            <div className="container">
            <Header />
            <HomeComponent />
            </div>

            {/* <p> {path === "/premium" && (
              
                "Redirecting to sign-in..."
           
            )}</p> */}
          </div>
        </div>
      ) : (
        <div>
          <MainHeader />
          {children}
        </div>
      )}
    </>
  );
};

export default LayoutComponent;
