"use client";

import React, { useContext, useState } from "react";
// import dLBg from '../../assets/DLbg.svg'
import dLBg from "@/assets/DLbg.svg";
import Image from "next/image";
import arrow from "@/assets/navigativeArrow.svg";
import arrow2 from "@/assets/whiteArrow.svg";
import Link from "next/link";
import { UserContext } from "@/components/context";

const Problem = () => {
  const [isHovered, setIsHovered] = useState<Number | null>(null);
  const difficultLevel = [
    {
      id: 1,
      level: "Easy Coding for Beginners",
      descrp:
        "To help new coders grasp fundamental programming concepts through simple, step-by-step problem-solving exercises.",
      name: "Easy",
    },
    {
      id: 2,
      level: "Intermediate Coding",
      descrp:
        "To help intermediate coders improve their problem-solving skills, understanding of data structures and algorithms, and debugging techniques.",
      name: "Medium",
    },
    {
      id: 3,
      level: "Advanced Coding",
      descrp:
        "To help advanced coders explore new concepts, optimize code, and tackle complex problems.",
      name: "Hard",
    },
  ];

  const {setCategory, setDifficulty}:any=useContext(UserContext)
  return (
    <div className="pl-8">
      <div className="flex flex-col gap-[34px]">
        {difficultLevel?.map((difficulty, index) => (
          <Link href={`/problem/${difficulty?.name}`} onClick={()=>setDifficulty(difficulty?.name)}>
          <div
            key={index}
            className="w-full h-40 difficultyLevelBg p-6 flex justify-between cursor-pointer hover:shadow-[-5px_6px_0px_rgba(0,0,0)] hover:border-[1px] hover:border-black"
            onMouseEnter={() => setIsHovered(index)}
            onMouseLeave={() => setIsHovered(null)}
          >
            <div className="flex flex-col gap-3">
              <h2 className="text-[28px] font-semibold">{difficulty?.level}</h2>
              <p className="text-lg font-normal leading-tight">
                {difficulty?.descrp}
              </p>
            </div>


            <div className="relative">
              <div
                className={`w-24 h-24 rounded-[12px] relative  flex flex-col px-4  pt-4 py-5 items-center justify-between overflow-hidden ${
                  isHovered === index ? " text-white" : "bg-white"
                }`}
              >
                <div
                  className={`absolute inset-0 rounded-[12px] bg-black transition-transform duration-300 ease-in-out flex items-center justify-center gap-2 ${
                    isHovered === index
                    ? "translate-x-full translate-y-full"
                    : "translate-x-0 translate-y-0"
                  }`}
                  style={{
                    zIndex: 10,
                    transformOrigin: 'bottom right',
                    transform: isHovered === index ? 'translate(0, 0)' : 'translate(100%, 100%) skew(-10deg)',
                    
                }}
                />
                <span className="font-semibold relative z-10 ">{difficulty?.name}</span>
                <span
                  className={`relative z-10 ${
                    isHovered === index
                      ? "rotate-[42deg] transition-all duration-100"
                      : ""
                  }`}
                >
                  <Image
                    src={isHovered === index ? arrow2 : arrow}
                    alt="arrow"
                  />
                </span>
              </div>
            </div>
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Problem;
