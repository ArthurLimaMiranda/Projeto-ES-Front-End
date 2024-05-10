"use client"
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from '../app/icon.png'


export function Header(){


  return (
    <>
      <div 
        className={`flex justify-center w-full bg-[#E9EDF0] py-3 bg-opacity-90 fixed top-0 z-40`} // Set `fixed` and `top: 0`
        style={{
          boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.2)',
          transition: 'opacity 0.3s ease-in-out',
        }}>
        <div className="container h-full px-8 lg:px-0">
          <div className="flex items-center h-full justify-center">
            <Link href="/dashboard/" className="flex flex-row items-center gap-x-5">
              <Image src={logo} alt="Recicletool Logo" width={30} className="hover:opacity-60"/>
              <h1>EngSoftComp LTDA</h1>
            </Link>

          </div>
        </div>
      </div>
    </>
  )
}