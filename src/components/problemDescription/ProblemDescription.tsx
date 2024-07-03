import React, { useContext } from "react";
import { UserContext } from "../context";

const ProblemDescription = () => {
  const { desc }: any = useContext(UserContext);
  console.log(desc, 'desc');
  return (
    <div className="w-[100%] ">
      <div>
        <h2>{desc?.questionId}.{desc?.title}</h2>
        <p>{desc?.description}</p>

        <div className="mt-9">
          <h5 className="font-bold">Example 1:</h5>
          <div className="mt-3 border-l-2 border-slate-300 pl-4">
            <h6><span className="font-medium">Input: &nbsp;</span>{desc?.input}</h6>
            <h6><span className="font-medium">Output: &nbsp;</span>{desc?.output}</h6>
            <h6><span className="font-medium">Explanation: &nbsp;</span>{desc?.explanation}</h6>
          </div>
        </div>
      
        <div className="mt-9">
          <h5 className="font-bold">Example 2:</h5>
          <div className="mt-3 border-l-2 border-slate-300 pl-4">
            <h6><span className="font-medium">Input: &nbsp;</span>{desc?.input2}</h6>
            <h6><span className="font-medium">Output: &nbsp;</span>{desc?.output2}</h6>
          
          </div>
        </div>

        {/* example3 */}
        <div className="mt-9">
          <h5 className="font-bold">Example 3:</h5>
          <div className="mt-3 border-l-2 border-slate-300 pl-4">
            <h6><span className="font-medium">Input: &nbsp;</span>{desc?.input3}</h6>
            <h6><span className="font-medium">Output: &nbsp;</span>{desc?.output3}</h6>
          
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProblemDescription;
