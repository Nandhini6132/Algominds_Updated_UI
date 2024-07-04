"use client";

import React, { useContext, useState, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeLight } from "@uiw/codemirror-theme-vscode";
import ProblemDescription from "@/components/problemDescription/ProblemDescription";
import { UserContext } from "@/components/context";
import { ToastContainer, toast } from "react-toastify";
import { useClerk } from "@clerk/nextjs";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Solution from "@/components/solution/Solution";
import Discussion from "@/components/discussion/Discussion";
import { AlignJustifyIcon, ArrowLeft, Dot, PlayIcon } from "lucide-react";


function ProblemId() {
  const { desc } = useContext(UserContext);
  const { user } = useClerk();
  const { id } = useParams();
  const [cases, setCases] = useState(0);
  console.log(cases, "cases");

  const [answer, setAnswer] = useState({
    userId: "",
    questionId: "",
    username: "",
    solution: "",
  });
  const [currentSection, setCurrentSection] = useState("description");
  const [filteredSolution, setFilteredSolution] = useState(false);
  const [output1, setOutput1] = useState();
  const [output2, setOutput2] = useState();
  const [output3, setOutput3] = useState();
  const [case1, setCase1] = useState(false);
  const [case2, setCase2] = useState(false);
  const [case3, setCase3] = useState(false);
  const router = useRouter()

  const parseInputVariables = (input) => {
    console.log(typeof input, input, "input");
    if (!input) return "";

    const variables = input
      .split(";")
      .map((variable) => variable.split("=")[0].trim());
    return variables.join(",");
  };

  const parseInputValues = (input) => {
    if (!input) return [];

    const values = input.split(";").map((variable) => {
      const value = variable.split("=")[1].trim();
      console.log(value, "value from line 25", typeof value);
      try {
        if ((value.startsWith('[')) && (value.endsWith(']'))) {
          return JSON.parse(value);
        }
        return JSON.parse(value);
      } catch {
        if (!isNaN(value)) {
          return Number(value);
        }

        if (value.startsWith("'") && value.endsWith("'")) {
          return value.slice(1, -1);
        }

        return eval(value);
      }
    });
    return values;
  };

  const [code, setCode] = useState("");
  const [output, setOutput] = useState();
  const [submit, setSubmit] = useState(false);
  const [result, setResult] = useState();

  useEffect(() => {
    getSolution();

    if (desc && desc.input) {
      const camelCasedTitle = desc.title
        .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
          return index === 0 ? word.toLowerCase() : word.toUpperCase();
        })
        .replace(/\s+/g, "");

      setCode(`function ${camelCasedTitle}(${parseInputVariables(desc.input)}) {
        // Write your code here
      }`);
    }
    if (filteredSolution && result.length > 0) {
      setCode(result[0].solution);
    }
  }, [desc, filteredSolution]);

  const handleRunCode = () => {
    try {
      const testCases = [
        { input: desc.input, output: desc.output },
        { input: desc.input2, output: desc.output2 },
        { input: desc.input3, output: desc.output3 },
      ];

      setSubmit(false);
      let allTestsPassed = true;

      testCases.forEach((testCase, index) => {
        const inputValues = parseInputValues(testCase.input);
        const funcBody = code.substring(
          code.indexOf("{") + 1,
          code.lastIndexOf("}")
        );
        const func = new Function(
          ...parseInputVariables(testCase.input).split(", "),
          funcBody
        );

        const result = func(...inputValues);
        console.log(
          `Test Case ${index + 1}: Result = ${result}, Expected = ${testCase.output
          }`
        );


        console.log(result, "result")
        switch (index) {
          case 0:
            setOutput1(result);
            if (JSON.stringify(result) == JSON.stringify(testCase.output[0])) {

              console.log('Test Case 1 Passed');
            } else {
              console.log('Test Case 1 Failed');
            }
            break;
          case 1:
            setOutput2(result);
            if (JSON.stringify(result) == JSON.stringify(testCase.output[1])) {
              setCase2(true);
            }
            break;
          case 2:
            setOutput3(result);
            if (JSON.stringify(result) === JSON.stringify(testCase.output[2])) {
              setCase3(true);
            }
            break;
          default:
            console.log("Unexpected test case index");
        }

        console.log(case1, case2, case3)

        setCase1(false);
        setCase2(false);
        setCase3(false);

        console.log(case1, case2, case3)
        if (JSON.stringify(result) != testCase.output) {
          setSubmit(false);
          allTestsPassed = false;
          toast.error(
            `Test Case ${index + 1} failed. Expected ${testCase.output
            }, got ${result}`,
            { autoClose: 3000 }
          );

          console.log(output1, result, "output")


          setOutput(JSON.stringify(result));

        }
        console.log(output1, output2, output3);
        setOutput('')
      });

      if (allTestsPassed) {
        toast.success("All test cases passed!", { autoClose: 1000 });
        setSubmit(true);
        setAnswer({
          solution: code,
          userId: user.id,
          questionId: id.toString(),
          userName: user.fullName || user.username,
        });
      }
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
  };

  if (!desc || !desc.input) {
    return <div>Loading...</div>;
  }

  const handleSubmit = async () => {
    const response = await fetch("/api/solutionPostMethod", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(answer),
    });
    const result = await response.json();
    console.log(result);
    toast.success(result.message, {
      autoClose: 1000
    });

    setTimeout(() => { router.back() }, 2000)
  };
  const renderSection = () => {
    switch (currentSection) {
      case "description":
        return <ProblemDescription />;
      case "solution":
        return <Solution />;
      case "discussion":
        return <Discussion />;
      default:
        return <ProblemDescription />;
    }
  };

  async function getSolution() {
    try {
      const res = await fetch(`/api/getParticularSolution?id=${user?.id}`);
      const results = await res.json();

      if (results.data?.filter((a) => a.questionId === id.toString()).length) {
        const a = results.data.filter((a) => a.questionId === id.toString());
        console.log(a, "filtered solution");
        setFilteredSolution(true);
        setResult(a);
        console.log(
          results.data.filter((a) => a.questionId === id.toString()),
          "filtered solution"
        );
      } else {
        setFilteredSolution(false);
      }
    } catch (error) {
      console.error(error);
    }
  }

  console.log(output1, output2, output3);
  



  return (
    <main className="mt-2 border-y-4">
      <ToastContainer />

      <div className="absolute top-2.5 left-[20%] bg-gray-200 rounded py-1.5 px-2 flex gap-1 cursor-pointer" onClick={()=>router.push('/problems')}>
        <AlignJustifyIcon className="text-gray-700 w-5"/>
        <h4>Problem list</h4>
      </div>
      <div className="absolute top-2.5 left-[45%] flex gap-1"> 
        <button
          onClick={handleRunCode}
          className="pt-1.5 pb-1.5 pe-2.5 ps-2.5  bg-gray-200 rounded flex"

        > <span><PlayIcon className="stroke-none rounded-icon w-5" style={{fill:'gray', strokeLinecap:'round'}}/></span>
          Run Code
        </button>
        {submit ? (
          <pre>
            <button
              onClick={handleSubmit}
              disabled={filteredSolution}
              className="bg-gray-200 text-green-900 pt-1.5 pb-1.5 pe-2.5 ps-2.5 font-bold font-sans  rounded cursor-pointer "

              style={{
                pointerEvents: filteredSolution ? "none" : "auto",
                cursor: filteredSolution ? "none" : "pointer",
                opacity: filteredSolution && 0.9,
              }}
            >
              Submit
            </button>
          </pre>
        ) : null}
      </div>
      <div className="flex h-[790px]">
        <div className="w-[50%] border-x-2  flex-col">
          <div className={"flex items-start gap-10 bg-zinc-100 py-2 px-3"}>
            <button
              onClick={() => setCurrentSection("description")}
              className={
                currentSection === "description"
                  ? "text-black font-bold"
                  : "text-gray-900"
              }
            >
              Description
            </button>
            <button
              onClick={() => setCurrentSection("solution")}
              className={
                currentSection === "solution"
                  ? "text-black font-bold"
                  : "text-gray-900"
              }
            >
              Solution
            </button>
            <button
              onClick={() => setCurrentSection("discussion")}
              className={
                currentSection === "discussion"
                  ? "text-black font-bold"
                  : "text-gray-900"
              }
            >
              Discussion
            </button>
          </div>

          <div className="px-3 mt-5 h-[100%]">{renderSection()}</div>
        </div>

        {/* playground */}
        <div className="w-[50%] border-x-2 h-[100%]">
          <CodeMirror
            value={code}
            height="400px"
            width="100%"
            theme={vscodeLight}
            onChange={(value) => setCode(value)}
          />

          <div className="border-2  border-slate-200 h-[50%] ps-3 overflow-auto">
            {submit && <h5 className="font-bold text-green-800">Accepted</h5>}
            <div className="flex gap-8">
              {["Case 1", "Case 2", "Case 3"].map((test, index) => (
                <div key={index}>
                  <h3
                    className={`cursor-pointer hover:bg-slate-200 px-3 py-1 rounded-md mt-3 ${cases === index && "bg-slate-200"
                      }`}
                    onClick={() => setCases(index)}
                  >
                    {" "}
                    <span className="flex"><Dot className={`${!submit && 'hidden'} text-green-900 font-bold`} /> {test}</span>
                  </h3>
                </div>
              ))}
            </div>
            <div className="mt-3 ">
              <h6 className="text-gray-500">Input:</h6>
              <div className="bg-slate-200 h-14 rounded mr-7 px-2 py-3">
                {cases === 0 ? (
                  <>
                    <h5>{desc.input.split("")}</h5>
                  </>
                ) : cases === 1 ? (
                  <h5>{desc.input2}</h5>
                ) : (
                  <h5>{desc.input3}</h5>
                )}
              </div>

              <h6 className="text-gray-500">Expected:</h6>
              <div className="bg-slate-200 h-14 rounded mr-7 px-2 py-3">
                {cases === 0 ? (
                  <>
                    <h5>{desc.output}</h5>
                  </>
                ) : cases === 1 ? (
                  <h5>{desc.output2}</h5>
                ) : (
                  <h5>{desc.output3}</h5>
                )}
              </div>
              {console.log(desc.output, output1, output)}

              <h6 className="text-gray-500">Output:</h6>
              <div className="bg-slate-200 h-14 rounded mr-7 px-2 py-3">
                {cases === 0 ? (

                  <h5
                    className={`font-bold ${output1 === desc.output ? "text-green-600"
                      : "text-red-500"
                      }`}
                  >
                    {submit ? desc.output : output1 || output}
                  </h5>

                ) : cases === 1 ? (
                  <h5 className={`font-bold ${output2 == desc.output2 ? "text-green-600"
                    : "text-red-500"
                    }`}>
                    {submit ? desc.output2 : output2 || output}
                  </h5>
                ) : (
                  <h5 className={`font-bold ${output3 == desc.output3 ? "text-green-600"
                    : "text-red-500"
                    }`}>
                    {submit ? desc.output3 : output3 || output}
                  </h5>
                )}
              </div>
            </div>

            {console.log(filteredSolution)}

          </div>
        </div>
      </div>
    </main>
  );
}

export default ProblemId;

// export async function generateStaticParams() {
//   const posts = await fetch(`https:/localhost:3000/problems/${slug}`).then((res) => res.json())
 
//   return posts.map((post) => ({
//     slug: post.slug,
//   }))
// }
