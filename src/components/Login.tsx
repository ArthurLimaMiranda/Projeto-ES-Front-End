import React from 'react';
import background from '../assets/bg2.jpg';
import Image from 'next/image';
import { Header } from "./Header";

export function Login() {
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
                <form action="">
                    <div className="relative my-4">
                        <input type="email" className=" border-gray-300 rounded-md px-0 py-2.3 w-72 block text-sm text-white bg-transparent border-0 border-b-2 appearance-none dark:focus:border-blue-500 focus:border:outline-none focus:ring-0 focus:text-white focus:border-blue-600" />
                        <label htmlFor='' className='absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>E-mail</label>
                    </div>
                    <div className="relative my-4">
                        <input type="password" className=" border-gray-300 rounded-md px-0 py-2.3 w-72 block text-sm text-white bg-transparent border-0 border-b-2 appearance-none dark:focus:border-blue-500 focus:border:outline-none focus:ring-0 focus:text-white focus:border-blue-600" />
                        <label htmlFor='' className='absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>Senha</label>
                    </div>
                    <div className="flex items-center mb-4">
                        <input type="checkbox" name="" id="" className="mr-2" />
                        <label htmlFor='' className=''>Lembre-se de mim</label>
                    </div>
                    <span className="ml-auto">Esqueceu a senha?</span>
                    <button type="submit" className='w-full mb-4 text-[18px] mt-6 rounded-full border-4 border-[#4BC3B7] px-4 bg-transparent text-white hover:bg-[#F5F5F5] hover:border-[#F5F5F5] hover:text-[#03494E] py-2 transition-colors duration-300'>Login</button>
                    <div className="mt-4">
                        <span>Novo aqui?</span>
                    </div>
                </form>
            </div>
            </div>
        </div>
    );
}
