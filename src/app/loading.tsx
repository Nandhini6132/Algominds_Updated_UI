import { CircularProgress } from '@mui/material'

import React from 'react'

const Loading = () => {
  return (
    <div className='bg-slate-50 h-[100vh]'>
      <div className="container h-[100%] flex items-center justify-center">
      <CircularProgress size={100}/>
   
      </div>
    </div>
  )
}

export default Loading