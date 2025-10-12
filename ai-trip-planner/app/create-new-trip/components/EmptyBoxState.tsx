import { suggestions } from '@/app/_components/Hero'
import React from 'react'

const EmptyBoxState = ({onSelectOption}:any) => {
    return (
        <div >
            <h2 className='font-bold text-3xl text-center'>Start Planning New <strong className='text-primary'>Trip</strong></h2>
            <p className='text-center text-gray-400 mt-0'>Discover amazing places and experiences tailored just for you.</p>

            <div className='mt-4 flex flex-wrap justify-center gap-3 flex-col'>
                {suggestions.map((suggestion, index) => (
                    <div key={index} className='flex items-center gap-2 border px-4 py-2 p-3 rounded-full cursor-pointer  hover:bg-primary hover:shadow-md hover:scale-105 hover:text-white transition-all' onClick={()=>onSelectOption(suggestion.title)}>
                        
                        {suggestion.icon}
                        <h2>{suggestion.title}</h2>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default EmptyBoxState
