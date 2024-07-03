"use client";

import { UserContext } from "@/components/context";
import Questions from "@/components/questions/Questions";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";


interface Topic {
  category: string;
  count: number;
}

const ProblemPage = () => {
  const { isAdmin, sortOrder, setSortOrder, category, setCategory}: any = useContext(UserContext);
  const [options, setOptions] = useState<Topic[]>([]);
  const [totalQuestionLength, setTotalQuestionLength] =useState()

  const handleSetorder = () => {
    if (sortOrder === 0) {
      setSortOrder(1);
    }
    if (sortOrder === 1) {
      setSortOrder(2);
    }
    if (sortOrder === 2) {
      setSortOrder(0);
    }
  };

  useEffect(() => {
    async function getTopics() {
      const response = await fetch("/api/getMethod", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      console.log(result, "result");
      const length=result.data.length
      setTotalQuestionLength(length);
      const categoryCounts = result.data.reduce((acc:any, item:any) => {
        acc[item.category] = (acc[item.category] || 0) + 1;
        return acc;
      }, {});

    
      const optionsWithCounts = Object.entries(categoryCounts).map(([category, count]) => ({
        category,
        count :count as number,
      }));

      setOptions(optionsWithCounts);
    }

    getTopics();
  }, []);

  const handleSetCategory=async(category:string)=>{
    if(category==='All'){
      setCategory(null)
    }
     else{
      setCategory(category)
     }

    
     
  }




  return (
    <main className="p-4  w-[50%] m-auto">
      <div className="flex gap-6 mb-7">
         {options.map(({ category, count })=>{
          return (
         <Link href={''}> <div className="flex gap-1 cursor-pointer" onClick={()=>handleSetCategory(category)}>
         <div className="hover:text-blue-500 ">{`${category.charAt(0).toUpperCase()}${category.slice(1)}`}</div>
         <span className="bg-gray-200 px-2 text-sm rounded-xl flex items-center">{`${count}`}</span>
       </div></Link>
          )
         })} 
         <div className="flex gap-1 cursor-pointer" onClick={()=>handleSetCategory('All')}>
         <div className="cursor-pointer" >All </div> <span className="bg-gray-200 px-2 text-sm rounded-xl flex items-center">{totalQuestionLength}</span>
         </div>
      </div>

      <div className="overflow-x-auto">
        <table className=" bg-white">
          <thead>
            <tr className=" text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left w-[5%]">Status</th>

              <th className="py-3 px-6 text-left w-[35%]">Title</th>
              <th className="py-3 px-6 text-left w-[20%]">Category</th>
              <th
                className="py-3 px-6 text-left w-[20%] cursor-pointer"
                onClick={handleSetorder}
              >
                Difficulty
              </th>
              <th className="py-3 px-6 text-left w-[10%]">Acceptence</th>
              {isAdmin && (
                <th className="py-3 px-6 text-left w-[10%]">Actions</th>
              )}
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            <Questions />
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default ProblemPage
