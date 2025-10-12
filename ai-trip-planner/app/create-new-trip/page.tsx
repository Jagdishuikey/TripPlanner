import React from 'react'
import ChatBox from './components/ChatBox'

const page = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-10'>
      <div><ChatBox /></div>
      <div>Map and Trip Plan to Display</div>
    </div>
  )
}

export default page
