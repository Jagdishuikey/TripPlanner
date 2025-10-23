import React from 'react'
import ChatBox from './components/ChatBox'
import Itirnerary from './components/Itirnerary'

const page = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-10'>
      <div><ChatBox /></div>
      <div>
        <Itirnerary/>
      </div>
    </div>
  )
}

export default page
