import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import useSWR from "swr";
import SingleSolution from "../signleSolution/SingleSolution";
import { useClerk } from "@clerk/nextjs";
import { UserContext } from "../context";
import { Avatar } from "@mui/material";

interface SolutionType {
  userName: string;
  userId: string;
}

const Solution = () => {
  const { user } = useClerk();
  console.log(user);
  const { id } = useParams();
  const [solutions, setSolutions] = useState<SolutionType[]>([]);

  const [singleSolution, setSingleSolution] = useState("");
  const { desc }: any = useContext(UserContext);
  console.log(desc, "desc");
  useEffect(() => {
    async function fetchData() {
      console.log(id, "id");
      const response = await fetch(`/api/getParticularSolution?id=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      setSolutions(result.data);
      console.log(result, "result");
    }
    fetchData();
  }, []);
  console.log(solutions, "setSolutions");

  if (solutions?.length == 0) return <h1>No Solutions found</h1>;
  if (singleSolution) {
    const selectedSolution = solutions.find(
      (sol) => sol?.userId === singleSolution
    );
    return <SingleSolution solution={selectedSolution} />;
  }
  console.log(solutions, "setSolutions");

  return (
    <>
      <div className="flex flex-col gap-10">
        {solutions?.map((sol: SolutionType, i) => {
          return (
            <div key={i}>
              <div className="flex flex-col gap-1 cursor-pointer" onClick={() => setSingleSolution(sol?.userId)}>
                <div className="flex gap-2">
                  <Avatar
                    src={desc.imageUrl}
                    style={{ width: "25px", height: "25px" }}
                  />
                  <p className="text-slate-900 text-sm">{sol?.userName}</p>
                </div>
                <div className="flex flex-col ml-8 gap-1 mb-3">
                <h1
                  
                  className="cursor-pointer font-semibold"
                >
                  {desc.title && `${desc.title.charAt(0).toUpperCase()}${desc.title.slice(1)}`}| {desc.difficulty}
                </h1>
                <div className="">
                  <small className="bg-slate-900 text-white inline-block px-2 py-0 rounded-full align-text-top">Javascript </small>
                </div>
                </div>
              </div>
              <hr />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Solution;
