"use client"
import { Header } from "./Header";

import { useEffect, useState } from "react";
import React from 'react';

import { COLORS } from '../../src/lib/AppStyles'

import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';

interface Clients {
  id: number;
  nome: string;
  cpf: string;
  enderecoDTO: {
    logradouro: string;
    numero: number;
    estado: string;
    cidade: string;
    cep: string;
  };
}

export function DashClientes(){

  const [newForm, setNewForm] = useState(0)
  const [clients, setClients] = useState<Clients[]>([])

  useEffect(() => {
    
    setClients([
      {
        id: 0,
        nome: "teste",
        cpf: "99999",
        enderecoDTO: {
          logradouro: "rua..",
          numero: 99,
          estado: "PE",
          cidade: "cidade",
          cep: "55299-497",
        },
      },
      {
        id: 1,
        nome: "teste2",
        cpf: "999899",
        enderecoDTO: {
          logradouro: "rua..",
          numero: 99,
          estado: "PE",
          cidade: "cidade",
          cep: "55299-497",
        },
      },
    ]);
  }, []);

  return(

      <div className={`bg-[${COLORS.bgDark}] h-[100vh] py-24`}>
        <Header/>

        <div className="mx-11 h-full flex flex-row justify-between gap-x-10">

          <div 
            className="grid grid-cols-2 gap-8 rounded-xl w-[80%] p-10 overflow-y-scroll"
            style={{
              boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.4), -5px -5px 5px rgba(255, 255, 255, 0.5)',
              transition: 'opacity 0.3s ease-in-out',
            }}>

              {clients.map((clients) => (
                  <div key={clients.id} className="border border-gray-100 flex flex-col w-[25rem] h-[10rem] justify-center p-4 rounded-lg gap-y-5">
                      <p className="font-bold text-lg">{clients.nome}</p>
                      <p>Endereço: {clients.cpf}</p>
                      <a href={clients.enderecoDTO.cep} target="blank">
                        <LinkOutlinedIcon/>
                      </a>
                  </div>
              ))}
          </div>
          <div 
            className="rounded-xl w-[25%] flex flex-col items-center"
            style={{
              boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.4), -5px -5px 5px rgba(255, 255, 255, 0.5)',
              transition: 'opacity 0.3s ease-in-out',
            }}>
            <h1 className="font-bold border-b border-b-gray-100 flex flex-row w-full justify-center py-3 text-xl">Novo usuário</h1>
            <div className="flex flex-col items-center w-full">

              <div className="flex flex-row w-full justify-between">
                <button className={`hover:bg-gray-100 w-full text-base py-2 ${newForm==0&&('bg-gray-100')}`} onClick={()=>setNewForm(0)}>Adicionar</button>
                <button className={`hover:bg-gray-100 w-full text-base py-2 ${newForm==1&&('bg-gray-100')}`} onClick={()=>setNewForm(1)}>Editor</button>
              </div>

              {newForm==0&&(
                <div>
                <form className="flex flex-col justify-start w-full mt-6 mb-4">
                  <label htmlFor="userEmail" className={`text-generic-fields font-bold`}>Nome</label>
                  <div className="relative mt-2 mb-8 w-full">
                    <input className={`focus:ring-0 focus:border-1 focus:outline-none appearance-none leading-tight focus:border-white placeholder:text-generic-fields placeholder:font-semibold w-full border-none outline-none rounded-xl py-[1em] pl-[2em] pr-[4em] text-sm bg-generic-bgLight shadow-input hover:shadow-input-hover-focus focus:shadow-input-hover-focus`} 
                              id="userEmail" 
                              type="" 
                              autoComplete=""
                              placeholder=""
                              title=""
                              required/>
                  </div>
          
                  <label htmlFor="userPassword" className={`text-generic-fields font-bold`}>CPF</label>
                  <div className="relative mt-2 mb-8 w-full">
                    <input className={`focus:ring-0 focus:border-1 focus:outline-none appearance-none leading-tight focus:border-white placeholder:text-generic-fields placeholder:font-semibold w-full border-none outline-none rounded-xl py-[1em] pl-[2em] pr-[4em] text-sm bg-generic-bgLight shadow-input hover:shadow-input-hover-focus focus:shadow-input-hover-focus`}  
                              id="userPassword" 
                              type="" 
                              autoComplete=""
                              placeholder=""
                              title=""
                              required/>
                  </div>
                  
                  <button 
                    title="Cadastrar"
                    type="submit" 
                    className={`leading-none w-full border-none outline-none rounded-xl bg-generic-tittleButton p-4 text-generic-bgLight font-bold cursor-pointer mb-6 shadow-button hover:shadow-button-hover-focus focus:shadow-button-hover-focus`}>
                    Cadastrar
                  </button>
                </form>
              </div>
              )}
               
            </div>
          </div>

        </div>
      </div>

  )}