"use client";

import { UserContext } from "@/components/context";
import Image from "next/image";
import { useParams } from "next/navigation";
import upArrow from "../../../assets/upArrow.svg";
import whiteArrow from "../../../assets/whiteUpArrow.svg";
import lock from "../../../assets/lock.svg";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import { useClerk } from "@clerk/nextjs";



interface solutiontype {
  userId: string;
  questionId: string;
}



const Page = () => {
  const {
    category,
    difficulty,
    setSelectedCategory,
    selectedCategory,
    selectedType,
    setSelectedType,
    setDesc
  }: any = useContext(UserContext);
  const { user } = useClerk();
  const difficultyLevel = useParams().difficulty.toString();
  const [allQuestion, setAllQuestion] = useState<any[]>([]);
  const [isHovered, setIsHovered] = useState<Number | null>(null);
  const [isPremiumUser, setIsPremiumUser] = useState(false)
  const [numberOfUsers, setNumberOfUsers] = useState<string[]>([]);
  const [allSolutions, setAllSolutions] = useState<solutiontype[]>([]);
  const [filteredSolution, setFilteredSolution] = useState<solutiontype[]>([]);
  const [isCategoryHovered, setIsCategoryHovered] = useState<Number | null>(
    null
  );

  console.log(allQuestion, selectedCategory, "ques");

  useEffect(() => {
    async function getAllQuestions() {
      try {
        let url = "/api/getMethod";
        if (category !== null) {
          url += `?category=${encodeURIComponent(category)}`;
        }
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result = await response.json();
        if (category !== null) {
          setAllQuestion(result.data);
        } else {
          setAllQuestion(
            result.data?.filter((q: any) => q.difficulty === difficultyLevel)
          );
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    }

    getAllQuestions();
  }, [category, difficultyLevel]);

  const uniqueCategories = Array.from(
    new Set(allQuestion.map((q) => q.category))
  );

  console.log(uniqueCategories, "unique");

  const filteredCategoryQuestions = allQuestion.filter(
    (a) => a.category === selectedType
  );
  console.log(filteredCategoryQuestions, "filtered");


  const fetchQuestion = async (id: any) => {
    const res = await fetch(`/api/getOneQuestion?id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    setDesc(data.data);
  };

  useEffect(() => {
    async function getCurrentUserSolution() {
      const response = await fetch(`/api/getAllSolution`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      console.log(result);
      const a = result.data.map((a: any) => a?.userId);
      console.log(a);
      const newS = Array.from(new Set(a)) as string[];
      setNumberOfUsers(newS);
      console.log(numberOfUsers);

      const allSolutions = result.data || [];
      setAllSolutions(allSolutions);
      console.log(allSolutions, "allSolutions");

      const filteredSolutions = allSolutions.filter(
        (solution: any) => solution.userId === user?.id
      );
      setFilteredSolution(filteredSolutions);

      console.log(filteredSolutions, "filteredSolution");
    }

    getCurrentUserSolution();

    async function getPremiumStatus() {
      const response = await fetch(
        `/api/postPremiumMethod?email=${user?.emailAddresses[0]?.emailAddress || user?.emailAddresses
        }`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
      );

      const result = await response.json()
      console.log(result, 'result')
      setIsPremiumUser(result.data[0].isPremium)
    }
    getPremiumStatus();
  }, [user]);

  return (
    <>

    

        <div>
          {selectedType !== "" ? (
            <div>
              <div className="flex gap-10">
                {filteredCategoryQuestions?.map((ques, i) => (
                  <Link href={ques.isPremium && !isPremiumUser ? '' : `/problems/${ques?._id}`} onClick={() => {
                    if (ques.isPremium && !isPremiumUser) {
                      alert('You are not a premium user, Please subscribe to access this question')
                    }
                    else {
                      fetchQuestion(ques._id)
                    }
                  }}>
                    <div
                      key={i}
                      className="w-[285px] h-[180px] bg-[#f6f6f6] p-3 cursor-pointer hover:border-[3px] transition-all duration-100 ease-in-out"
                      onMouseEnter={() => setIsCategoryHovered(i)}
                      onMouseLeave={() => setIsCategoryHovered(null)}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex gap-2">
                          <h1 className="h-[20%] pl-3 font-semibold text-[16px]">
                            Solve
                          </h1>
                          {ques?.isPremium && <Image src={lock} alt="lock" />}
                        </div>
                        <span
                          className={`w-1.5 h-1.5 rounded-full block`}
                          style={{
                            background:
                              ques?.difficulty === "Hard"
                                ? "red"
                                : ques?.difficulty === "Medium"
                                  ? "rgb(245 158 11)"
                                  : ques?.difficulty === "Easy"
                                    ? "green"
                                    : "transparent",
                          }}
                        ></span>
                      </div>
                      <div
                        className={`h-[80%] transition-all duration-100 ease-in-out ${isCategoryHovered === i
                          ? "bg-black text-white"
                          : "bg-white "
                          } px-3 py-2 mt-1 w-full flex items-center`}
                      >
                        <div className="w-[85%]">
                          <h2 className=" font-[500] text-[16px]">{ques?.title}</h2>
                          <p className="mt-2 font-normal text-[16px]">Acceptance</p>
                          <p>60%</p>
                        </div>
                        <div className="w-[15%]">
                          <Image
                            src={isCategoryHovered === i ? whiteArrow : upArrow}
                            alt="arrow"
                            className={`${isCategoryHovered === i ? "rotate-[30deg]" : ""
                              } transition-all duration-100`}
                          />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex gap-8 ml-10 flex-wrap">
              {difficultyLevel === "Easy" &&
                uniqueCategories.map((category, i) => (
                  <div
                    key={category}
                    className={`w-[280px] h-[130px] bg-[#F6F6F6] flex flex-col gap-3 p-3 hover:border-[1px] hover:border-black cursor-pointer ${i === isHovered ? "hoveredBg" : ""
                      }`}
                    onMouseEnter={() => setIsHovered(i)}
                    onMouseLeave={() => setIsHovered(null)}
                    onClick={() => {
                      setSelectedCategory(category);
                      setSelectedType(category);
                    }}
                  >
                    <div className="flex justify-between">
                      <div className="font-bold">{category}</div>
                      <div>
                        <Image
                          src={upArrow}
                          alt="uparrow"
                          className={`${isHovered === i ? "rotate-[31deg]" : ""}`}
                        />
                      </div>
                    </div>
                    <p className="font-normal">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Labore, autem.
                    </p>
                  </div>
                ))}
              {difficultyLevel === "Medium" &&
                uniqueCategories.map((category, i) => (
                  <div
                    key={category}
                    className={`w-[280px] h-[130px] bg-[#F6F6F6] flex flex-col gap-3 p-3 hover:border-[1px] hover:border-black cursor-pointer ${i === isHovered ? "hoveredBg" : ""
                      }`}
                    onMouseEnter={() => setIsHovered(i)}
                    onMouseLeave={() => setIsHovered(null)}
                    onClick={() => {
                      setSelectedCategory(category);
                      setSelectedType(category);
                    }}
                  >
                    <div className="flex justify-between">
                      <div className="font-bold">{category}</div>
                      <div>
                        <Image
                          src={upArrow}
                          alt="uparrow"
                          className={`${isHovered === i ? "rotate-[31deg]" : ""}`}
                        />
                      </div>
                    </div>
                    <p className="font-normal">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Labore, autem.
                    </p>
                  </div>
                ))}
              {difficultyLevel === "Hard" &&
                uniqueCategories.map((category, i) => (
                  <div
                    key={category}
                    className={`w-[280px] h-[130px] bg-[#F6F6F6] flex flex-col gap-3 p-3 hover:border-[1px] hover:border-black cursor-pointer ${i === isHovered ? "hoveredBg" : ""
                      }`}
                    onMouseEnter={() => setIsHovered(i)}
                    onMouseLeave={() => setIsHovered(null)}
                    onClick={() => {
                      setSelectedCategory(category);
                      setSelectedType(category);
                    }}
                  >
                    <div className="flex justify-between">
                      <div className="font-bold">{category}</div>
                      <div>
                        <Image
                          src={upArrow}
                          alt="uparrow"
                          className={`${isHovered === i ? "rotate-[31deg]" : ""}`}
                        />
                      </div>
                    </div>
                    <p className="font-normal">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Labore, autem.
                    </p>
                  </div>
                ))}
            </div>
          )}
        </div>
     

    </>
  );
};

export default Page;
