import { useClerk } from "@clerk/nextjs";
import { CircularProgress } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import arrow from "../assets/rightArrow.svg";
import { UserContext } from "./context";

interface userQuestionType {
  title: string;
  _id: string;
  category: string;
  questionId: number;
}

const ListMenu = () => {
  const path = usePathname();
  const { user } = useClerk();
  const router = useRouter();
  const { setSelectedType }: any = useContext(UserContext)
  const [userSolvedQuestion, setUserSolvedQuestion] = useState<
    userQuestionType[]
  >([]);
  const [questions, setQuestions] = useState<any[]>([]);
  const [usersSolution, setUsersSolution] = useState<any[]>([]);
  const [isHovered, setIsHovered] = useState(true);

  useEffect(() => {
    async function getLists() {
      const response = await fetch(`/api/getParticularSolution?id=${user?.id}`);
      const data = await response.json();

      setUsersSolution(data.data);
    }

    getLists();

    async function getAllQuestions() {
      const response = await fetch(`/api/getMethod`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      setQuestions(data.data);
    }
    getAllQuestions();
  }, [user]);

  useEffect(() => {
    if (questions?.length > 0 && usersSolution?.length > 0) {
      console.log(
        usersSolution
          .map((a: any) => questions?.find((b: any) => b._id === a?.questionId))
          .filter((item: any) => item !== undefined),
        "iuo"
      );
      const ab = usersSolution
        .map((a: any) => questions?.find((b: any) => b._id === a?.questionId))
        .filter((item: any) => item !== undefined);
      setUserSolvedQuestion(ab);
    }
  }, [questions, usersSolution]);

  return (
    <div className="relative flex flex-col gap-7 border-r-2">
      <div
        className={`relative w-[280px] h-[52px] transition-all cursor-pointer bg-[#F6F6F6] ${path === "/profile"
            ? "hover:shadow-[-5px_6px_0px_rgba(119,119,119,0.38)] hover:-translate-y-1 hover:translate-x-1"
            : ""
          } duration-300 ease-in-out text-black overflow-hidden`}
        onClick={() => {
          setSelectedType('')
          router.push("/profile")
        }}
      >
        <span
          className={`absolute inset-0 bg-black transition-transform duration-700 ease-in-out ${path === "/profile" ? "translate-x-0" : "-translate-x-full"
            }`}
          style={{ height: "100%", zIndex: 0 }}
        />
        <h2
          className={`relative z-10 flex items-center gap-4 h-full ${path === "/profile" ? "text-white" : "text-black"
            }`}
        >
          <span
            className={`${path !== "/profile"
                ? "w-2 bg-black h-full transition-all duration-300"
                : "w-0"
              }`}
          ></span>
          <span className="pl-1 flex gap-4">
            <span className={`${path === "/profile" ? "block" : "hidden"}`}>
              &bull;
            </span>
            <span>My List</span>
          </span>
        </h2>
      </div>

      <hr className="w-[86%]" />
      <div>
        <div
          className={`bg-black text-white p-3 w-[280px] cursor-pointer hover:shadow-[-5px_6px_0px_rgba(0,0,0,0.38)] hover:-translate-y-1 hover:translate-x-1`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => {
            setSelectedType('')
            router.push('/problem')
          }}
        >
          <h2 className="pl-6">Solve Problems</h2>
          <hr className="mt-2 " />
          <p className="text-xs mt-2 leading-5">
            "Fix and Learn Code Problems" it is an interactive platform that
            helps beginner’s identify, troubleshoot, and solve coding challenges
            efficiently.
          </p>

          <div className="my-3 bg-white">
            <h2 className="text-black p-2 pl-10">My Progress</h2>

            <div className="h-full flex items-center justify-center flex-col gap-12">
              <div className="ml-16" style={{ position: "relative" }}>
                {/* <div className={`absolute w-[40px] h-[40px] flex justify-center rounded-full bg-white items-center z-10 top-[8%] left-[7%] border-2`}></div> */}
                <div
                  className={`text-black absolute w-[50px] h-[50px] flex justify-center rounded-full bg-white items-center z-10 top-[8%] left-[22%] ${isHovered ? "border-8" : "border-2"
                    } ${isHovered && "border-black"} ${isHovered && "border-opacity-30"
                    }`}
                >
                  <span className="text-black">
                    {userSolvedQuestion.length}/
                  </span>
                  <span>{questions?.length}</span>
                </div>
                <PieChart
                  series={[
                    {
                      data: [
                        { id: 0, value: userSolvedQuestion?.length },
                        {
                          id: 1,
                          value: questions?.length - userSolvedQuestion?.length,
                        },
                      ],
                    },
                  ]}
                  width={250}
                  height={180}
                  colors={["#000000", "#ffffff"]}
                />
              </div>
            </div>
          </div>

          <div>
            <div className="p-3 border-[1px] flex justify-between items-center">
              <h2>Solve Problems</h2>
              <span
                className={`${isHovered ? "rotate-[35deg] transition-all duration-100" : ""
                  }`}
              >
                <Image src={arrow} alt="arrow" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListMenu;
