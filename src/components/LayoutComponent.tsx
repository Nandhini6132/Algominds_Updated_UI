"use client";

import React, { Suspense, useContext, useEffect } from "react";
import HomeComponent from "./home/HomeComponent";
import Header from "./header/Header";
import { ClerkProvider, useUser } from "@clerk/nextjs";

import { usePathname, useRouter } from "next/navigation";
import { currentUser, getAuth } from "@clerk/nextjs/server";
import MainHeader from "./mainHeader/MainHeader";

import Loading from "@/app/loading";
import ContextAPI, { UserContext } from "./context";
import SignInPage from "@/app/sign-in/[[...sign-in]]/page";
import ListMenu from "./ListMenu";

const LayoutComponent = ({ children }: any) => {
  const path = usePathname();
  const {selectedType}:any=useContext(UserContext)
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
            className=" h-[100%] skew-y-6 origin-top-right "
          ></div>
          <div className="absolute top-0 w-full">
            <div className="bounce bg-teal-600 absolute top-24 rounded-full left-14 rounded" style={{ width: '50px', height: '50px' }}></div>
            <div className="bounce bg-teal-400 absolute bottom-0 rounded-full left-52 rounded" style={{ width: '150px', height: '150px' }}></div>

            <div className="bounce bg-teal-300 absolute bottom-32 rounded-full left-1/3 rounded" style={{ width: '150px', height: '150px' }}></div>

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
          <div className={`transition-all duration-500 ease-in-out ${selectedType!==''?'container-fluid ml-[68px]':' w-[1360px] m-auto'}  flex mt-10`}>
            <div className={`${selectedType!==''?'w-[17%]':'w-[25%]'}`}>
              <ListMenu />
            </div>
            <div className={`${selectedType!==''?'w-[83%] pl-8':'w-[75%]'}`}>
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LayoutComponent;
