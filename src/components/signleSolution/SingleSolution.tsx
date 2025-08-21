import { ArrowLeft, ArrowUp } from "lucide-react";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";
import ProblemDescription from "../problemDescription/ProblemDescription";
import Solution from "../solution/Solution";
import Image from "next/image";
import upArrow from "../../assets/upArrow.svg";

interface QuestionType {
  title: string;
  description: string;
  input: string;
}

const SingleSolution = ({ solution }: any) => {
  console.log(solution, "solution");

  const [question, setQuestion] = useState<QuestionType>();
  const [back, setBack] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `/api/getOneQuestion?id=${solution.questionId}`
      );
      const data = await response.json();
      console.log(data, "data");
      setQuestion(data.data);
    }
    fetchData();
  }, []);

  if (back) return <Solution />;
  return (
    <div className="h-[540px] overflow-scroll pt-3 font-mono">
      <div className="flex ">
        <h5
          className="flex cursor-pointer items-center"
          onClick={() => setBack(true)}
        >
          <Image src={upArrow} alt="back arrow" className="-rotate-[150deg]" />
          All Solutions
        </h5>
        {/* <h2 className="">Solution</h2> */}
      </div>
      <div className="mt-2">
        <h2 className="font-semibold">{question?.title}</h2>
        <p>{question?.description}</p>
        <h5 className="mt-2">
          {" "}
          <span className="font-semibold">Input :</span> {question?.input}
        </h5>
        <div className="mt-3">
          {/* <h3 className="font-bold mt-3">Solution</h3> */}
          <div className="h-fit w-fit bg-slate-200 px-9 py-5 rounded ">
            <pre>{solution.solution}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleSolution;
