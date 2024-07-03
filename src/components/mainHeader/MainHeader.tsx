"use client";

import Image from "next/image";
import React, { useContext, useEffect } from "react";
import logo from "@/assets/logoAlgo.png";
import Link from "next/link";
import { SignIn, useClerk } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { UserContext } from "../context";
import SignInPage from "@/app/sign-in/[[...sign-in]]/page";
import { Avatar } from "@mui/material";

import QuestionModal from "../questionModal/QuestionModal";

const MainHeader = () => {
  const { signOut, user } = useClerk();
  const header = [
    {
      id: 1,
      navigation: [
        // {
        //   id: 1,
        //   name: "Explore",
        //   url: "/explore",

        // },
        {
          id: 2,
          name: "Problems",
          url: "/problems",
        },
        // {
        //   id: 3,
        //   name: "Contest",
        //   url: "/contest",
        // },
      ],

      profileNavigation: [
        {
          id: 1,
          name: <Avatar sx={{ width: "30px", height: "30px" }} />,
          url: "/profile",
          // click:handleOpens
        },
        {
          id: 2,
          name: "Premium",
          url: "/premium",
        },
        {
          id: 3,
          name: "Logout",
          url: "/sign-out",
        },
        // {
        //   id: 4,
        //   name: "notifi",
        //   url: "/notifi",
        // },
      ],
    },
  ];
  const path = usePathname();
  const handleLogout = async (e: any) => {
    e.preventDefault();
    await signOut();
  };
  const { isAdmin, setIsAdmin, open, handleOpen }: any =
    useContext(UserContext);
  const adminEmail = "nandhini6132@gmail.com";
  const adminU_Id = "user_2i3206gbxKyZ4nYQksQ22fS5R91";

  useEffect(() => {
    if (user?.id === adminU_Id) {
      setIsAdmin(true);
    }
  }, [signOut, SignInPage, isAdmin]);

  console.log(path);
  const isDynamicPath = (path: string): boolean => {
    return path.startsWith("/problems/tag/");
  };

  return (
    <div
      className={` ${path === "/profile" ? "mx-12 my-1" : "container m-auto"}`}
    >
      <div className={`flex gap-7 items-center `}>
        <Image src={logo} alt="logo" width={50} />
        {(path === "/problems" ||
          path === "/explore" ||
          path === "/contest" ||
          path === "/profile" ||
          path === "/" ||
          path === "/premium" ||
          isDynamicPath(path)) && (
          <div className={`flex w-full`}>
            {header.map((name, i) => {
              return (
                <>
                  <div className="flex gap-8" key={i}>
                    {name?.navigation?.map((link, i) => (
                      <Link href={link?.url} key={i}>{link?.name}</Link>
                    ))}
                    {isAdmin && (
                      <button onClick={handleOpen}>Add question</button>
                    )}
                  </div>
                </>
              );
            })}
          </div>
        )}

        <div className={`${path!=='/problems' && 'flex w-full justify-end'}`}>
          {header.map((name, i) => (
            <>
              <div className="flex gap-7">
                {name.profileNavigation?.map((name, i) => (
                  <Link key={i}
                    href={`${name.url}`}
                    onClick={(e) => name.url === "/sign-out" && handleLogout(e)}
                  >
                    {name.name}
                  </Link>
                ))}
              </div>
            </>
          ))}
        </div>

        {open && <QuestionModal />}
      </div>
    </div>
  );
};

export default MainHeader;
