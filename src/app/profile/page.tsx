"use client";

import { UserContext } from "@/components/context";
import { Button } from "@/components/ui/button";
import { useClerk } from "@clerk/nextjs";
import { Avatar, CircularProgress } from "@mui/material";
import {
  AlignJustifyIcon,
  CircleCheckBig,
  CircleFadingPlus,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

interface userQuestionType {
  title: string;
  _id: string;
  category: string;
  questionId: number;
}

const ProfilePage = () => {
  const { user } = useClerk();
  const router = useRouter();

  const [usersSolution, setUsersSolution] = useState<any[]>([]);
  const [questions, setQuestions] = useState<any[]>([]);

  const [userSolvedQuestion, setUserSolvedQuestion] = useState<
    userQuestionType[]
  >([]);
  const [profileComponent, setProfileComponent] = useState<string>("");

  useEffect(() => {
    async function getLists() {
      const response = await fetch(
        `/api/getParticularSolution?id=${user?.id}`
      );
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
    if (questions.length > 0 && usersSolution.length > 0) {
      console.log(
        usersSolution
          .map((a: any) => questions.find((b: any) => b._id === a.questionId))
          .filter((item: any) => item !== undefined),'iuo'
      );
      const ab = usersSolution
        .map((a: any) => questions.find((b: any) => b._id === a.questionId))
        .filter((item: any) => item !== undefined);
      setUserSolvedQuestion(ab);
    }
  }, [questions, usersSolution]);

  const fetchQuestion = async (id: string) => {
    const response = await fetch(`/api/getOneQuestion?id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const menus = [
    {
      name: "My Lists",
      icon: <AlignJustifyIcon />,
    },
    {
      name: "Progress",
      icon: <CircleFadingPlus />,
    },
  ];


  console.log(userSolvedQuestion,'userSolvedQuestion')
  return (
    <main>
      <div className="h-[90vh]">
        <div className="flex gap-12 h-[100%] border-slate-400 border-t-2">
          <div className="w-[12%] border-2 border-s-transparent border-y-transparent border-e-slate-400 pt-7">
            <div className="px-2 flex flex-col gap-5">
              <div className="flex gap-4 items-center pt-3">
                <Avatar src={user?.imageUrl} />
                <h5>
                  {user?.fullName ||
                    (user?.username &&
                      user.username.charAt(0).toUpperCase() +
                        user.username.slice(1))}
                </h5>
              </div>

              <div className="flex flex-col gap-5">
                {menus.map((a: any, i: number) => {
                  return (
                    <div
                      key={i}
                      className="flex gap-4 cursor-pointer"
                      onClick={() => setProfileComponent(a.name)}
                    >
                      {a.icon}
                      <h4> {a.name}</h4>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="w-[70%] pt-7">
            <div className="w-[45%] m-auto">
              {profileComponent === "My Lists" ? (
                <table className=" bg-white">
                  <thead>
                    <tr className=" text-gray-600 uppercase text-sm leading-normal">
                      <th className="py-3 px-6 text-center w-[10%]">Status</th>

                      <th className="py-3 px-6 text-left w-[30%]">Title</th>
                      <th className="py-3 px-6 text-center w-[20%]">
                        Category
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 text-sm font-light">
                    {userSolvedQuestion.map((a, index) => {
                      return (
                        a !== undefined && (
                          <>
                            <tr
                              key={a._id}
                              className={`${
                                index % 2 === 0 ? "bg-gray-100" : "bg-white"
                              } hover:bg-gray-100`}
                            >
                              <td className="flex justify-center py-3">
                                <CircleCheckBig className="text-green-600" />
                              </td>
                              <td>
                                {" "}
                                <Link
                                  onClick={() => fetchQuestion(a._id)}
                                  href={`../problems/${a?._id}`}
                                >
                                  <span className=" text-center">
                                    {a.questionId}.{" "}
                                  </span>
                                  <span className="text-start">{a.title}</span>
                                </Link>
                              </td>
                              <td className="flex justify-center ">
                                {a.category}
                              </td>
                            </tr>
                          </>
                        )
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <div className="flex  mt-6 ">
                  <div className="h-[500px] w-[400px] bg-slate-50 rounded">
                    <h1 className="pt-6 px-8 text-xl">My Progress</h1>
                    <div className="h-full flex items-center justify-center flex-col gap-12">
                      <div
                        style={{ position: "relative", display: "inline-flex" }}
                      >
                        <CircularProgress
                          variant="determinate"
                          value={100}
                          size={200}
                          thickness={2}
                          style={{ color: "lightgray" }}
                        />
                        <CircularProgress
                          variant="determinate"
                          value={
                            (userSolvedQuestion.length / questions.length) * 100
                          }
                          size={200}
                          thickness={2}
                          style={{
                            color: "blue",
                            position: "absolute",
                            top: 0,
                            left: 0,
                            zIndex: 1,
                          }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            textAlign: "center",
                            width: "100%",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "1.5em",
                              fontWeight: "bold",
                              color: "black",
                            }}
                          >{`${userSolvedQuestion.length}/${questions.length}`}</span>
                        </div>
                      </div>
                      <p>
                        You have solved {userSolvedQuestion.length} questions
                        out of {questions.length}
                      </p>
                    </div>
                  </div>

                  <div className="h-[500px] w-[400px] flex items-center justify-end">
                    <Button onClick={() => router.push("/problems")}>
                      View All Questions
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
