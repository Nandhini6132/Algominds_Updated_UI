'use client'

import React, { useContext, useEffect } from 'react'
import HomeComponent from '../components/home/HomeComponent' 
import ExplorePage from './explore/page'
import {UserContext}  from '@/components/context'
import { useRouter } from 'next/navigation'

const App = () => {
  const router= useRouter()
useEffect(()=>{
  router.replace('/problems')
},[])
  return (
      <div>  
      
        
      </div>
    )
}

export default App