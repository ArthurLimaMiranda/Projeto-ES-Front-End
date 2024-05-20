"use client"
import React, { useState } from 'react';
import background from '../assets/bg2.jpg';
import Image from 'next/image';
import { Header } from "./Header";
import {MdOutlineEmail} from 'react-icons/md'
import {AiOutlineLock} from 'react-icons/ai';
import { loginUser } from '@/lib/api';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function generateRandomToken() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < 25; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    token += characters[randomIndex];
  }
  return token;
}

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter()
  
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const success = await loginUser(email, password);
      if (success == true) {
        const token = generateRandomToken();
        localStorage.setItem('token', token);
        router.push('/dashclientes'); 
      } else {
        alert("Credencial inválida!")
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

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
                <h1 className= 'mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white'>Entrar</h1>
                <form onSubmit={handleSubmit}>
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
                    <div className='justify-center items-center text-center'>
                        <span className="ml-auto text-sm text-white hover:text-[#4BC3B7] hover:underline"><a href='forgotpassword'>Esqueceu a senha?</a></span>
                    </div>
                    <button type="submit" className='w-full mb-4 text-[18px] mt-6 rounded-full border-4 border-[#4BC3B7] px-4 bg-transparent text-white hover:bg-[#F5F5F5] hover:border-[#F5F5F5] hover:text-[#03494E] py-2 transition-colors duration-300'>Login</button>
                    <div className="flex mb-4 gap-1.5 items-center">
                            <input type="checkbox" name="" id="" className='mr-2 appearance-none border-[#03494E] rounded-sm focus:ring-1 focus:ring-[#4BC3B7] checked:bg-[#4BC3B7]'  />
                            <label htmlFor='' className='text-white'>Lembre-se de mim</label>
                        </div>
                        <div className="mt-4 ">
                            <span className='text-white'>Novo aqui?<Link className='hover:text-white hover:underline font-bold' href={'/cadastro'}> Crie uma conta</Link></span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

