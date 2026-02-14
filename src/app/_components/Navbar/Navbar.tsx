"use client";
import Link from 'next/link';
import React, { useContext, useState } from 'react';
import { signOut, useSession } from "next-auth/react";
import { CartContext } from '@/context/CartContext';



export default function Navbar() {
   const [isOpen, setIsOpen] = useState(false);
   
 const context = useContext(CartContext)

  if (!context) throw new Error('not exist')

  const {numberOfCartItem } = context;


   const { data: session, status } = useSession()
   
   
   

   function logout(){
    signOut({ callbackUrl : '/login'})

   }



  return (
    <>

   <nav className="bg-emerald-600 text-white shadow-md sticky top-0 z-50">
  <div className="container w-full lg:w-[80%] mx-auto p-4 flex justify-between items-center">
 
    <div className="flex items-center gap-2 text-2xl font-bold">
      <Link href="/" className="flex items-center gap-2">
        <i className="fa-solid fa-cart-shopping"></i>
        <span>FreshCart</span>
      </Link>
    </div>

    <button
      className="lg:hidden text-2xl"
      onClick={() => setIsOpen(!isOpen)}
    >
      <i className={isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars"}></i>
    </button>

   
    <div
      className={`${
        isOpen ? "flex" : "hidden"
      } flex-col lg:flex lg:flex-row lg:items-center gap-6 absolute lg:static top-16 left-0 w-full lg:w-auto bg-emerald-600 lg:bg-transparent p-4 lg:p-0`}
    >
     
      <ul className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-start lg:items-center font-medium">
        <li>
          <Link href="/">Home</Link>
        </li>

        {session && (
          <li className="relative">
            <Link href="/cart" className="flex items-center gap-1">
              <i className="fa-solid fa-cart-plus"></i>
              Cart
              {numberOfCartItem > 0 && (
                <span className="absolute -top-2 -end-3 flex h-5 w-5 text-xs  font-bold rounded-full justify-center items-center bg-white text-emerald-600 shadow">
                  {numberOfCartItem}
                </span>
              )}
            </Link>
          </li>
        )}

        {session && (
  <li className="relative">
    <Link href="/allorders" className="flex items-center gap-1">
      <i className="fa-solid fa-box"></i>
      All Orders
    </Link>

  </li>
  
)}

   {session && (
  <li className="relative">
 <Link href="/orders" className=" flex items-center gap-1">
  <i className="fa-solid fa-box"></i>
  My Orders
</Link>

  </li>
  
)}


        <li>
          <Link href="/products">Products</Link>
        </li>
        <li>
          <Link href="/category">Categories</Link>
        </li>
        <li>
          <Link href="/brands">Brands</Link>
        </li>
        {session && (
  <li className="relative">
    <Link href="/whislist" className="flex items-center gap-1">
      <i className="fa-solid fa-heart"></i>
      Wishlist
     
    </Link>
  </li>
)}
      </ul>

     
      <ul className="flex flex-col lg:flex-row gap-4 lg:gap-8 mt-4 lg:mt-0 items-start lg:items-center">
        {status === "unauthenticated" ? (
          <>
            <li className="flex gap-3 text-lg">
              <i className="fab fa-facebook hover:text-gray-200 cursor-pointer"></i>
              <i className="fab fa-twitter hover:text-gray-200 cursor-pointer"></i>
              <i className="fab fa-instagram hover:text-gray-200 cursor-pointer"></i>
              <i className="fab fa-tiktok hover:text-gray-200 cursor-pointer"></i>
              <i className="fab fa-linkedin hover:text-gray-200 cursor-pointer"></i>
            </li>
            <li>
              <Link href="/register">  Register      </Link>
            </li>
            <li>
              <Link href="/login" >  Login </Link>
            </li>
          </>
        ) : (
          <>
         
            <li className="font-semibold">Hi, {session?.user?.name}</li>
               <li>
              <button
                className="cursor-pointer bg-white text-emerald-600 px-3 py-1 rounded-lg hover:bg-gray-100 flex items-center gap-2"
                onClick={logout}
              >
                <i className="fa-solid fa-right-from-bracket"></i>
                Sign out
              </button>
            </li>
          </>
        )}
      </ul>
    </div>
  </div>
</nav>



    </>
  )
}
