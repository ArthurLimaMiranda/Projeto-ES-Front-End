"use client"
import React, { useState } from 'react';
import { createUser } from '../lib/api';
import {BiUser} from 'react-icons/bi';
import {AiOutlineLock} from 'react-icons/ai';
import background from '../assets/bg2.jpg';
import Image from 'next/image';
import { Header } from "./Header";
import Link from 'next/link';
import {MdOutlineEmail} from 'react-icons/md';

export function Cadastro() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await createUser(name, email, password);
    console.log(response);
    if (response){
        alert("Cadastro Realizado com sucesso!")
    } else {
        alert("Conta já cadastrada")
    }
  }

  return (
    <div className='relative h-screen '>
    <Image
        src={background}
        alt="Descrição da imagem"
        layout="fill"
        objectFit="cover"
        quality={100}
    />
    <Header/>
    <div className='absolute inset-0 flex flex-col justify-center items-center text-black'>
        <div className='bg-slate-800 border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative'>
            <h1 className= 'mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white'>Cadastro</h1>
            <form onSubmit={handleSubmit}>
            <div className="relative my-4">
                <input 
                    type="text" value={name} onChange={(e) => setName(e.target.value)}
                    className="peer border-gray-300 rounded-md px-0 py-2.3 w-72 block text-sm text-white bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-[#4BC3B7]" placeholder=" " />
                <label className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nome Completo</label>
                <BiUser className='absolute top-4 right-4 text-white'/>
            </div>
            <div className="relative my-4">
                <input 
                    type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    className="peer border-gray-300 rounded-md px-0 py-2.3 w-72 block text-sm text-white bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-[#4BC3B7]" placeholder=" " />
                <label className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">E-mail</label>
                <MdOutlineEmail className='absolute top-4 right-4 text-white'/>
            </div>
            <div className="relative my-4">
                <input 
                    type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                    className="peer border-gray-300 rounded-md px-0 py-2.3 w-72 block text-sm text-white bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-[#4BC3B7]" placeholder=" "/>
                <label className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Senha</label>
                <AiOutlineLock className='absolute top-4 right-4 text-white'/>
            </div>
                <button type="submit" className='w-full mb-4 text-[18px] mt-6 rounded-full border-4 border-[#4BC3B7] px-4 bg-transparent text-white hover:bg-[#F5F5F5] hover:border-[#F5F5F5] hover:text-[#03494E] py-2 transition-colors duration-300'>Criar conta</button>
                    <div className="mt-4 ">
                        <span className='text-white'>Já tem uma conta?<Link href={'/login'} className='hover:text-white hover:underline font-bold'> Faça o Login</Link></span>
                    </div>
                </form>
            </div>
        </div>
    </div>
  );
}