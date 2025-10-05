import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { SignInButton } from '@clerk/nextjs'

const menuOptions=[{
    name:"Home",
    path:'/'
},
{
    name:'Pricing',
    path:'/pricing'
},{
    name:"Contact",
    path:'/contact'
}
]

const Header = () => {
  return (
    <div className='flex justify-between items-center p-4'>
        <div>
      <Image src={'Logo.svg'} alt="logo" width={150} height={100}/>
      </div>
      {/* menuoptions */}
      <div className='flex gap-8 items-center'>

      {menuOptions.map((menu, index) => {
        return <Link href={menu.path} key={index}><h2 className='text-lg hover:scale-105 transition-all hover:text-primary'>{menu.name}</h2></Link>;
      })}
      </div>
      {/* get started button */}
      <SignInButton mode='modal'>
      <Button>Get Started</Button>
      </SignInButton>
    </div>
  )
}

export default Header
