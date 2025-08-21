"use client";

import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context";
import { CircleCheckBig, Edit2, Lock, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useClerk } from "@clerk/nextjs";
import { CodeSandboxLogoIcon } from "@radix-ui/react-icons";
import { clerkClient } from "@clerk/nextjs/server";
import { ToastContainer, toast } from "react-toastify";

interface questionType {
  _id: string;
  questionId?: number;
  title: string;
  category: string;
  difficulty: string;
  acceptance?: number;
  isPremium?: boolean;
}

interface solutiontype {
  userId: string;
  questionId: string;
}

//actual
const Questions = async () => {
  const { user } = useClerk();
  console.log(user);
  const [allSolutions, setAllSolutions] = useState<solutiontype[]>([]);
  const [filteredSolution, setFilteredSolution] = useState<solutiontype[]>([]);
  const [numberOfUsers, setNumberOfUsers] = useState<string[]>([]);
  const [rate, setRate] = useState<number | undefined>(undefined);

  const {
    isAdmin,
    setCurrentEditQuestionId,
    question,
    setQuestion,
    handleOpen,
    setDesc,
    sortOrder,
    setSortOrder,
    category,
    setCategory,
  }: any = useContext(UserContext);
  const [checked, setChecked] = useState(true);
  const router = useRouter();
  const [isPremiumUser, setIsPremiumUser]= useState(false)

  async function getAllquestion() {
    if (category !== null) {
      const response = await fetch(
        `/api/getMethod?category=${encodeURIComponent(category)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      console.log(result);
      return result.data;
    } else {
      const response = await fetch("/api/getMethod", {
        method: "GET",
      });
      const result = await response.json();
      return result.data;
    }
  }

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
        `/api/postPremiumMethod?email=${
          user?.emailAddresses[0]?.emailAddress || user?.emailAddresses
        }`,{
          method:'GET',
          headers:{
            'Content-Type':'application/json'
          }
        }
      );

      const result= await response.json()
      console.log(result,'result')
      setIsPremiumUser(result.data[0].isPremium)
    }
    getPremiumStatus();
  }, [user]);



  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/deleteMethod?id=${id}`, {
        method: "DELETE",
      });
      const result = await response.json();
      console.log(result);
      if (result.sucess) {
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (question: any) => {
    setCurrentEditQuestionId(question?._id);
    handleOpen();
    setQuestion({
      title: question.title,
      category: question.category,
      difficulty: question.difficulty,
      input: question.input,
      description: question.description,
      explanation: question.explanation,
      output: question.output,
      input2: question.input2,
      output2: question.output2,
      input3: question.input3,
      output3: question.output3,
    });
  };

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
  var getAll = await getAllquestion();

  //   const ab = getAll.filter((row: questionType) =>
  //   allSolutions.some(solution => solution.questionId === row._id)
  // );

  const calculateAcceptanceRate = (questionId: string) => {
    const totalUsers = new Set(allSolutions.map((solution) => solution.userId))
      .size;

    const usersWithSolution = new Set(
      allSolutions
        .filter((solution) => solution.questionId === questionId)
        .map((solution) => solution.userId)
    ).size;

    
    let acceptanceRate =
      totalUsers > 0 ? (usersWithSolution / totalUsers) * 100 : 10;
    let formattedRate = parseFloat(acceptanceRate.toFixed(1));

    return formattedRate;
  };

  const calculateAcceptanceRateDifficulty = (questionId: string) => {
    const totalUsers = new Set(allSolutions.map((solution) => solution.userId))
      .size;
    console.log(totalUsers);
    const usersWithSolution = new Set(
      allSolutions
        .filter((solution) => solution.questionId === questionId)
        .map((solution) => solution.userId)
    ).size;

    let acceptanceRate =
      totalUsers > 0 ? (usersWithSolution / totalUsers) * 100 : 10;
    let formattedRate = parseFloat(acceptanceRate.toFixed(1));
    let diff;
    let color;


    if (formattedRate < 30) {
      diff = "Hard";
      color = "bg-red-500";
    } else if (formattedRate < 70) {
      diff = "Medium";
      color = "bg-orange-500";
    } else {
      diff = "Easy";
      color = "bg-green-500";
    }

    return { diff, color };
  };

  // if (sortOrder === 1) {
  //   const sortByDifficulty = (a: any, b: any) => {
  //     const difficultyOrder = { Easy: 1, Medium: 2, Hard: 3 };
  //     return (
  //       difficultyOrder[a.difficulty as keyof typeof difficultyOrder] -
  //       difficultyOrder[b.difficulty as keyof typeof difficultyOrder] //3-1 like that
  //     );
  //   };

  //   getAll = getAll.sort(sortByDifficulty);
  // }

  // if (sortOrder === 2) {
  //   const sortByDifficulty = (a: any, b: any) => {
  //     const difficultyOrder = { Easy: 3, Medium: 1, Hard: 2 };
  //     return (
  //       difficultyOrder[a.difficulty as keyof typeof difficultyOrder] -
  //       difficultyOrder[b.difficulty as keyof typeof difficultyOrder]
  //     );
  //   };

  //   getAll = getAll.sort(sortByDifficulty);
  // }

  // if (sortOrder === 0) {
  //   const sortByDifficulty = (a: any, b: any) => {
  //     const difficultyOrder = { Easy: 3, Medium: 2, Hard: 1 };
  //     return (
  //       difficultyOrder[a.difficulty as keyof typeof difficultyOrder] -
  //       difficultyOrder[b.difficulty as keyof typeof difficultyOrder]
  //     );
  //   };

  //   getAll = getAll.sort(sortByDifficulty);
  // }

  console.log(getAll, 'getAll')
  return (
    <>
    <ToastContainer/>
      {getAll.map((row: questionType, index: number) => {
        const { diff, color } = calculateAcceptanceRateDifficulty(row._id);
        return (
          <tr
            key={row._id}
            className={`${
              index % 2 === 0 ? "bg-gray-100" : "bg-white"
            } hover:bg-gray-100`}
          >
            <td className="py-3 px-6 text-left whitespace-nowrap">
              <CircleCheckBig
                className={`${
                  !!filteredSolution.find((a) => a?.questionId === row._id)
                    ? "text-green-500"
                    : "hidden"
                }`}
              />
              {/* <input
              type="checkbox"
              className="checked:bg-blue-500"
              checked={!!filteredSolution.find(a=>a?.questionId===row._id)}
              readOnly
            /> */}
            </td>{" "}
            <td className="py-3 px-6 text-left flex ">
              <Link
                onClick={() => {
                  if(row.isPremium && !isPremiumUser){
                    toast.error('You are not a premium user, Please subscribe to access this question',{
                      autoClose:1000
                    })
                  }
                  else{
                    fetchQuestion(row._id)
                  }
                }}
                href={row.isPremium && !isPremiumUser ? '' : `/problems/${row?._id}`}
              >
                <div className="flex">
                  <span className=" text-center">{row.questionId}. </span>
                  <span className="text-start">{row.title} </span>
                  <span className="">{row?.isPremium && <Lock />} </span>
                </div>
              </Link>
            </td>
            <td className="py-3 px-6 text-left">{row.category}</td>
            <td className={`py-3 px-6 text-left font-medium `}>
              <div
                className={`${color} text-white inline rounded-xl px-2 py-1`}
              >
                {diff}
              </div>
            </td>
            <td className="py-3 px-6 text-left">
              {calculateAcceptanceRate(row._id)}%
            </td>
            {isAdmin && (
              <td className="flex gap-8 py-3 px-6 text-left">
                <div>
                  <Trash2
                    className="text-red-500 cursor-pointer"
                    onClick={() => handleDelete(row._id)}
                  />
                </div>
                <div>
                  <Edit2
                    className="cursor-pointer text-blue-900"
                    onClick={() => handleEdit(row)}
                  />
                </div>
              </td>
            )}
          </tr>
        );
      })}
    </>
  );
};

export default Questions;



