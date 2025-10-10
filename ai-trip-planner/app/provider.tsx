"use client"
import Header from './_components/Header';
import {useMutation} from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useEffect } from "react";
import { useUser } from '@clerk/nextjs';
import { UserDetailContext } from '@/context/UserDetailContext';
import { useState } from 'react';




function Provider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const CreateUser=useMutation(api.user.CreateNewUser)

    const [userDetail, setUserDetail] = useState<any>()

    const {user}=useUser();

    useEffect(()=>{
        if(user && user.primaryEmailAddress?.emailAddress){
            CreateNewUser();
        }
    },[user?.id, user?.primaryEmailAddress?.emailAddress])

    const CreateNewUser= async()=>{
        if(user && user.primaryEmailAddress?.emailAddress){
            try {
                console.log("Attempting to create user with data:", {
                    email: user.primaryEmailAddress.emailAddress,
                    imageUrl: user.imageUrl,
                    name: user.fullName
                });
                
                const result = await CreateUser({
                    email: user.primaryEmailAddress.emailAddress,
                    imageUrl: user.imageUrl || "",
                    name: user.fullName || ""
                });
                
                console.log("User creation result:", result);
                setUserDetail(result)
            } catch (error) {
                console.error("Error creating user:", error);
            }
        }
    }
    return (
        <UserDetailContext.Provider value={{userDetail, setUserDetail}}>
        <div>
            <Header/>
            {children}
        </div>
        </UserDetailContext.Provider>
    )
}



export default Provider
