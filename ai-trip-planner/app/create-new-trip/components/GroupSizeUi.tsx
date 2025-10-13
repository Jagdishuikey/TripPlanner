import React from 'react'

export const SelectTravelesList = [

    {

        id: 1,

        title: 'Just Me',

        desc: 'A sole traveles in exploration',

        icon: '✈️',

        people: '1'

    },

    {

        id: 2,

        title: 'A Couple',

        desc: 'Two traveles in tandem',

        icon: '🥂',

        people: '2 People'

    },

    {

        id: 3,

        title: 'Family',

        desc: 'A group of fun loving adv',

        icon: '🏡',

        people: '3 to 5 People'

    },

    {

        id: 4,

        title: 'Friends',

        desc: 'A bunch of thrill-seekes',

        icon: '⛵',

        people: '5 to 10 People'

    },

]



const GroupSizeUi = ({onSelectedOption}:any) => {
  return (
    <div className='grid grid-cols-2 md:grid-cols-4 gap-2 items-center mt-1'>
      {SelectTravelesList.map((item,index) => (
        <div key={item.id} className="flex items-center space-x-2 p-2 border-b">
          
          <div key={index} className='p-3 border rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:shadow-lg hover:border-primary transition bg-white'
          onClick={()=>{onSelectedOption(item.title+":"+item.people)}}>
           <h2>{item.icon}</h2>
           <h2>{item.title}</h2>
          </div>
        </div>
      ))}
    </div>
  )
}

    

export default GroupSizeUi
