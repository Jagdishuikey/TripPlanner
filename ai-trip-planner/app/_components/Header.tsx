import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { SignInButton, useUser } from '@clerk/nextjs'


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
  const { user } = useUser();
  const router = useRouter();
  
  return (
    <div className='flex justify-between items-center p-4'>
        <div onClick={()=>router.push('/')}>
      <Image src={'Logo.svg'} alt="logo" width={150} height={100}/>
      </div>
      {/* menuoptions */}
      <div className='flex gap-8 items-center'>

      {menuOptions.map((menu, index) => {
        return <Link href={menu.path} key={index}><h2 className='text-lg hover:scale-105 transition-all hover:text-primary'>{menu.name}</h2></Link>;
      })}
      </div>
      {/* get started button */}
      {!user?<SignInButton mode='modal'>
      <Button>Get Started</Button>
      </SignInButton>:
      <Link href={'/create-new-trip'}>
      <Button>Create New Trip</Button>
      </Link>}
    </div>
  )
}

export default Header
