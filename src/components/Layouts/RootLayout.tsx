import { Toaster } from "react-hot-toast";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import React from "react";
import { Inter } from 'next/font/google'
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useGetUserProfileQuery } from "@/redux/features/user/userApi";
import { removeUser, saveUser, setAccessToken } from "@/redux/features/user/userSlice";
import { useRouter } from "next/router";


const inter = Inter({ subsets: ['latin'] })

const RootLayout = ({ children }:{children:React.ReactNode}) => {
    const dispatch = useAppDispatch();
    const router= useRouter();
    const {userLoader} = useAppSelector(state=>state.user);
    const {data:user,isError,isLoading,}=useGetUserProfileQuery({});
    let token=null;
    if(typeof window !== 'undefined'){
        token=localStorage.getItem("quizAccessToken");
    }

    if(token){
        dispatch(setAccessToken(token))
    }
    
    if(user){
        dispatch(saveUser({
            userLoader:false,
            accessToken:token,
            email:user.data?.email,
            role:user.data?.role,
        }))
    }
   /*  if(isError){
        dispatch(removeUser());
    } */
    return (
        <>
      <Navbar />
      <main className={`${inter.className} max-w-[1500px] mx-auto`}>{children}</main>
      <Toaster />
      <Footer />
    </>
    );
};

export default RootLayout;