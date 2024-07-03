import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

import React, { useEffect, useState } from 'react'
import ProblemDescription from '../problemDescription/ProblemDescription'
import Solution from '../solution/Solution'

interface QuestionType{
  title: string,
  description:string,
  input:string
}

const SingleSolution = ({solution}:any) => {
  console.log(solution,'solution')

  const [question, setQuestion]= useState<QuestionType>()
  const [back, setBack]= useState(false)


  useEffect(()=>{
    async function fetchData(){
      const response = await fetch(`/api/getOneQuestion?id=${solution.questionId}`)
      const data = await response.json()
      console.log(data, 'data')
      setQuestion(data.data)

    }
    fetchData()
  },[])
 

  if(back) return <Solution/>
  return (
    <div>
         <h5 className='flex gap-3 cursor-pointer' onClick={()=>setBack(true)} ><ArrowLeft />All Solutions</h5>

         <div className='mt-8 container'>
          <h2 className='font-bold'>{question?.title} Solution</h2>
          <p>{question?.description}</p>
          <h5> <span className='font-bold'>Input :</span> {question?.input}</h5>
          <div>
          <h3 className='font-bold mt-3'>Solution</h3>
          <div className='h-[300px] bg-slate-200 px-9 py-5 rounded '>
            <pre>{solution.solution}</pre>
          </div>
          </div>
         </div>
    </div>
  )
}

export default SingleSolution