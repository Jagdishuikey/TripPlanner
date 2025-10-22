import React from 'react'
import { Globe2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

const FinalUi = ({ viewTrip }: { viewTrip: () => void }) => {
  return (
    <div className='flex flex-col items-center justify-center mt-6 p-6 bg-white rounded-2xl'>
        <Globe2 className='text-primary text-4xl animate-bounce'/>
        <h2 className='mt-3  text-lg font-semibold text-primary'>
            Planning Your Dream Trip...
        </h2>
        <p className='text-gray-500 text-sm text center mt-1'>
            Gathering best options and creating an unforgettable itinerary tailored just for you.
        </p>
        <Button disabled onClick={viewTrip} className='mt-2 w-full'>View Trip</Button>

    </div>
  )
}

export default FinalUi
