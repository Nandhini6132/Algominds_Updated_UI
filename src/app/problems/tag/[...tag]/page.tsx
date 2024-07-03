'use client'

import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'

const ProblemTagPage = () => {
    const {tag}=useParams()
    console.log(tag.toString())
    

    useEffect(()=>{
        async function getCategoryQuestions(){
            const response= await fetch(`/api/getCategoryQuestion?category=${tag.toString()}`, {
                method:'GET',
                headers:{
                    'Content-Type':'application/json'
                }
            })
            const data=await response.json()
            console.log(data,'data')
        }

        getCategoryQuestions()
    },[])
  return (
    <div className='w-[50%] m-auto'>
         <div className="overflow-x-auto">
        <table className=" bg-white">
          <thead>
            <tr className=" text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left w-[10%]">Status</th>

              <th className="py-3 px-6 text-left w-[30%]">Title</th>
              <th className="py-3 px-6 text-left w-[20%]">Category</th>
              <th
                className="py-3 px-6 text-left w-[20%] cursor-pointer"
                // onClick={handleSetorder}
              >
                Difficulty
              </th>
              <th className="py-3 px-6 text-left w-[10%]">Acceptence</th>
              {/* {isAdmin && (
                <th className="py-3 px-6 text-left w-[10%]">Actions</th>
              )} */}
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ProblemTagPage