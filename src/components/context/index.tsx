"use client";

import React, {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface UserContextType {
  isAdmin: boolean;
  setIsAdmin: Dispatch<SetStateAction<boolean>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;

  currentEditQuestionId: string | null;
  setCurrentEditQuestionId: Dispatch<SetStateAction<string | null>>;
  question: object;
  setQuestion: object;
  openDialogue: boolean;
  setOpenDialogue: Dispatch<SetStateAction<boolean>>;
  desc: object | null;
  setDesc: Dispatch<SetStateAction<object | null>>;
  sortOrder:number;
  setSortOrder:Dispatch<SetStateAction<number>>;

  category:string | null;
  setCategory: Dispatch<SetStateAction<string | null>>;

  difficulty:string | null;
  setDifficulty: Dispatch<SetStateAction<string | null>>;

  selectedCategory:string | null;
  setSelectedCategory: Dispatch<SetStateAction<string | null>>;

  selectedType:string | null;
  setSelectedType: Dispatch<SetStateAction<string | null>>;
}

export const UserContext = createContext<UserContextType | null>(null);

const ContextAPI = ({ children }: { children: ReactNode }) => {
  //edit part
  const [currentEditQuestionId, setCurrentEditQuestionId] = useState<
    string | null
  >(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [desc, setDesc] = useState<object | null>(null);

  const [openDialogue, setOpenDialogue] = useState(false);
  const [category, setCategory]= useState<string | null>(null)
  const [difficulty, setDifficulty]= useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState<number>(0);
  const [question, setQuestion] = useState({
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

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedType, setSelectedType]=useState<any | null>('');
  //desc
  // const desc = {
  //   title: "Add two numbers",
  //   no: "Example 1",
  //   description:
  //     "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.  You may assume the two numbers do not contain any leading zero, except the number 0 itself. ",
  //   input: [[2,4,3], [5,6,4]],
  //   output: [7,0,8],
  //   explanation: "Explanation: 342 + 465 = 807",
  // };

  return (
    <UserContext.Provider
      value={{
        setIsAdmin,
        isAdmin,
        setOpen,
        open,
        handleOpen,
        handleClose,
        currentEditQuestionId,
        setCurrentEditQuestionId,
        question,
        setQuestion,
        openDialogue,
        setOpenDialogue,
        desc,
        setDesc,
        sortOrder,
        setSortOrder,
        category,
        setCategory,
        difficulty,
        setDifficulty,
        selectedCategory,
        setSelectedCategory,
        selectedType,
        setSelectedType,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default ContextAPI;
