"use client";

import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Switch from '@mui/material/Switch';
import Modal from "@mui/material/Modal";
import { UserContext } from "../context";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { DialogTitle } from "@mui/material";
import { Textarea } from "../ui/textarea";

const QuestionModal = () => {
  const {
    handleClose,
    open,
    question,
    setQuestion,
    currentEditQuestionId,
    setCurrentEditQuestionId,
    setOpen,
    openDialogue,
    setOpenDialogue,
  }: any = useContext(UserContext);
  const [categoryValue, setCategoryValue] = useState("");
  const [questionId, setQuestionId] = useState();
  const [isPremium, setIsPremium] = useState(false)
  console.log(isPremium ,"Premium")

  useEffect(() => {
    const getCount = async () => {
      try {
        const countResponse = await fetch("/api/getMethod");
        if (countResponse.ok) {
          const countNo = await countResponse.json();
          const questionCount = countNo?.data.length;
          const newQuestionId = questionCount + 1;
          setQuestionId(newQuestionId);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (!currentEditQuestionId) {
      getCount();
    }
  }, [currentEditQuestionId]);

  const handleSubmit = async () => {

    try {
      const questionWithId = { ...question, questionId: questionId, isPremium: isPremium };
 
      const response =
        currentEditQuestionId !== null
          ? await fetch(`/api/editMethod?id=${currentEditQuestionId}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(questionWithId),
            })
          : await fetch("/api/postMethod", {
              method: "POST",
              body: JSON.stringify(questionWithId),
            });

      const result = await response.json();
  

      if (result.success) {
        setQuestion({
          title: "",
          category: "",
          difficulty: "",
          input: "",
          output: "",
          description: "",
          input2: "",
          output2: "",
          input3: "",
          output3: "",
          explanation: "",
          
        });
        setCurrentEditQuestionId(null);

        toast.success("Question added successfully");
        handleClose();
      }
    } catch (error) {
      console.error(error, "Failed to add question. Please try again.");
      toast.error("Failed to add question. Please try again.");
      setQuestion({
        title: "",
        category: "",
        difficulty: "",
        input: "",
        output: "",
        description: "",
        input2: "",
        output2: "",
        input3: "",
        output3: "",
        explanation: "",
      });
      setCurrentEditQuestionId(null);
    }
  };

  return (
    <main>
      <ToastContainer />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="flex flex-col gap-8">
          <div id="modal-modal-title" className="flex">
            <Label className="flex-1">Title</Label>
            <Input
              type="text"
              className="w-[70%]"
              value={question?.title}
              onChange={(e) =>
                setQuestion({ ...question, title: e.target.value })
              }
            />
          </div>
          <div id="modal-modal-description" className="flex">
            <Label className="flex-1">Category</Label>
            <Input
              type="text"
              className="w-[70%]"
              value={question?.category}
              onChange={(e) =>
                setQuestion({ ...question, category: e.target.value })
              }
            />
          </div>

          {/* <div className="flex">
            <Label className="flex-1">Difficulty</Label>
            <div className="w-[70%] flex gap-10">
              {["Hard", "Medium", "Easy"].map((category) => {
                return (
                  <div
                    className={`w-20 h-9 rounded-2xl text-center flex justify-center border
                  ${
                    category === "Hard"
                      ? "hover:bg-red-500"
                      : category === "Medium"
                      ? "hover:bg-amber-500"
                      : "hover:bg-green-700"
                  }
                  ${categoryValue === category && changeBg(category)} 
                  `}
                  >
                    <button
                      className="align-baseline"
                      value={question?.difficulty}
                      onClick={() => {
                        setCategoryValue(category);
                        setQuestion({ ...question, difficulty: category });
                      }}
                    >
                      {category}
                    </button>
                  </div>
                );
              })}
            </div>
          </div> */}
          {/* desc */}
          <div className="flex">
            <Label className="flex-1">Description</Label>
            <Textarea
              value={question?.description}
              className="w-[70%]"
              onChange={(e) =>
                setQuestion({ ...question, description: e.target.value })
              }
            />
          </div>

          {/* explanation */}
          <div className="flex">
            <Label className="flex-1">Explanation</Label>
            <Input
              className="w-[70%]"
              value={question?.explanation}
              onChange={(e) =>
                setQuestion({ ...question, explanation: e.target.value })
              }
            />
          </div>

          {/* ip,op,desc */}

          <div className="flex justify-between gap-8">
            <div className="flex gap-8 w-1/2">
              <Label className="">Input</Label>
              <Input
                className="w-[90%]"
                value={question?.input}
                onChange={(e) => {
                  const inputValue = e.target.value;

                  // Check the type of input value and handle accordingly
                  if (Array.isArray(inputValue)) {
                    setQuestion({ ...question, input: inputValue });
                  } else if (!isNaN(Number(inputValue))) {
                    setQuestion({ ...question, input: parseInt(inputValue) });
                  } else {
                    setQuestion({ ...question, input: inputValue });
                  }
                }}
              />
            </div>
            <div className="flex gap-8 w-1/2">
              <Label>Output</Label>
              <Input
                className="w-[90%]"
                value={question?.output}
                onChange={(e) => {
                  const outputValue = e.target.value;

                  // Check the type of input value and handle accordingly
                  if (Array.isArray(outputValue)) {
                    setQuestion({ ...question, output: outputValue });
                  } else if (!isNaN(Number(outputValue))) {
                    setQuestion({ ...question, output: parseInt(outputValue) });
                  } else {
                    setQuestion({ ...question, output: outputValue });
                  }
                }}
              />
            </div>
          </div>

          {/* input2 */}
          <div className="flex justify-between gap-8">
            <div className="flex gap-8 w-1/2">
              <Label className="">Input</Label>
              <Input
                type=""
                className="w-[90%]"
                value={question.input2}
                onChange={(e) =>
                  setQuestion({ ...question, input2: e.target.value })
                }
              />
            </div>
            <div className="flex gap-8 w-1/2">
              <Label>Output</Label>
              <Input
                className="w-[90%]"
                value={question?.output2}
                onChange={(e) =>
                  setQuestion({ ...question, output2: e.target.value })
                }
              />
            </div>
          </div>

          {/* input3 */}
          <div className="flex justify-between gap-8">
            <div className="flex gap-8 w-1/2">
              <Label className="">Input</Label>
              <Input
                type=""
                className="w-[90%]"
                value={question.input3}
                onChange={(e) =>
                  setQuestion({ ...question, input3: e.target.value })
                }
              />
            </div>
            <div className="flex gap-8 w-1/2">
              <Label>Output</Label>
              <Input
                className="w-[90%]"
                value={question?.output3}
                onChange={(e) =>
                  setQuestion({ ...question, output3: e.target.value })
                }
              />
            </div>
          </div>


          {/* premium question */}
          <div className="flex">
            <Label>Is Premium Question?</Label>
            <Switch value={isPremium} onChange={()=>setIsPremium(!isPremium)}/>
          </div>

          <div className="text-center">
            <Button type="submit" onClick={handleSubmit}>
              {currentEditQuestionId !== null ? "Save Changes" : "Add"}
            </Button>{" "}
          </div>
        </Box>
      </Modal>
    </main>
  );
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const changeBg = (category: string) => {
  switch (category) {
    case "Hard":
      return "bg-red-500";
    case "Medium":
      return "bg-amber-500";
    case "Easy":
      return "bg-green-700";
    default:
      return "bg-white";
  }
};

export default QuestionModal;
