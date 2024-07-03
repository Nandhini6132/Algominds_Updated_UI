import { CircleCheckBig } from 'lucide-react';
import Link from 'next/link';
import React from 'react'



const MyLists = ({userSolvedQuestion}:any) => {

    

    const fetchQuestion= async(id:string)=>{
        const response= await fetch(`/api/getOneQuestion?id=${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
  
    }
  
  return (
    <div className="w-[45%] m-auto">
              <table className=" bg-white">
                <thead>
                  <tr className=" text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-center w-[10%]">Status</th>

                    <th className="py-3 px-6 text-left w-[30%]">Title</th>
                    <th className="py-3 px-6 text-center w-[20%]">Category</th>
             
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {userSolvedQuestion?.map((a:any, index:number) => {
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
                                href={`@/app/problems/${a?._id}`}
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
            </div>
  )
}

export default MyLists