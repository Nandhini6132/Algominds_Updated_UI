"use client";

import Image from "next/image";
import React, { useContext, useEffect } from "react";
import logo from "@/assets/idea.png";
import Link from "next/link";
import { SignIn, useClerk } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { UserContext } from "../context";
import SignInPage from "@/app/sign-in/[[...sign-in]]/page";
import { Avatar } from "@mui/material";

import QuestionModal from "../questionModal/QuestionModal";

const MainHeader = () => {
  const { signOut, user } = useClerk();
  const {setSelectedType,selectedType}:any=useContext(UserContext)


  const header = [
    {
      id: 1,
      navigation: [
        // {
        //   id: 1,
        //   name: "Explore",
        //   url: "/explore",
        // },
        // {
        //   id: 2,
        //   name: "Problems",
        //   url: "/problems",
        // },
        // {
        //   id: 3,
        //   name: "Contest",
        //   url: "/contest",
        // },
      ],

      profileNavigation: [
        // {
        //   id: 1,
        //   name: <Avatar sx={{ width: "30px", height: "30px" }} />,
        //   // url: "/profile",
        //   // click:handleOpens
        // },
        {
          id: 2,
          name: "Home",
          url: "/problem",
        },
        {
          id: 2,
          name: "Pricing",
          url: "/premium",
        },
        // {
        //   id: 3,
        //   name: "Logout",
        //   url: "/sign-out",
        // },
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
      className={` ${path === "/profile" || selectedType==='' ? "w-[1360px]" : "container w-[1223px]"} m-auto `}
    >
      <div className={`flex gap-3 items-center border-b-2 pb-3 mt-3 border-black border-opacity-10`}>
        <Image src={logo} alt="logo" width={50} />
        <span className="font-mono font-semibold text-xl -tracking-tighter">
          AlgoMinds
        </span>
        {(path === "/problems" ||
          path === "/explore" ||
          path === "/contest" ||
          path === "/profile" ||
          path === "/" ||
          path === "/premium" ||
          isDynamicPath(path)) && (
            <div className={`flex ml-10`}>
              {isAdmin && <button onClick={handleOpen}>Add question</button>}
              {/* {header.map((name, i) => {
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
            })} */}
            </div>
          )}

        <div className="ml-auto flex items-center gap-20">
          <div
            className={` ${path !== "/problems" && "flex w-full justify-end"}`}
          >
            {header.map((name, i) => (
              <>
                <div className={`flex gap-20`}>
                  {name.profileNavigation?.map((name, i) => (
                    <div>
                      <Link
                        key={i}
                        className={`relative ${path === name?.url ? "font-bold pb-0.5" : ""
                          }`}
                        href={`${name.url}`}
                        onClick={(e) =>
                          { setSelectedType('')
                            name.url === "/sign-out" && handleLogout(e)
                          }
                        }
                        style={{
                          position: "relative",
                          textDecoration: "none",
                          color: "inherit",
                        }}
                      >
                        {name.name}
                        <span
                          className="absolute left-0 -bottom-1 w-0 h-0 bg-black transition-all duration-300"
                          style={{
                            height: path === name?.url ? "4px" : "3px",
                            width: path === name?.url ? "100%" : "3px",
                            borderRadius: path !== name?.url ? '100%' : ''
                          }}
                        ></span>
                      </Link>
                    </div>
                  ))}
                </div>
              </>
            ))}
          </div>

          <div className="border-l-2 pl-16 border-black border-opacity-15">
            <Avatar sx={{ width: "30px", height: "30px" }} />
          </div>
        </div>

        {open && <QuestionModal />}
      </div>
    </div>

  );
};

export default MainHeader;
