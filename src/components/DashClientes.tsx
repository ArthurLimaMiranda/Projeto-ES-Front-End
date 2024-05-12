"use client"
import { Header } from "./Header";

import { useEffect, useState } from "react";
import React from 'react';

import { COLORS } from '../../src/lib/AppStyles'

import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';

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

  const [clients, setClients] = useState<Clients[]>([])

  const [newForm, setNewForm] = useState(0)
  const [delUserID, setDelUserID] = useState(0)
  const [editUserID, setEditUserID] = useState(0)

  const [nome, setNome] = useState('')
  const [cpf, setCPF] = useState('')
  const [logradouro, setLogradouro] = useState('')
  const [numero, setNumero] = useState('')
  const [estado, setEstado] = useState('')
  const [cidade, setCidade] = useState('')
  const [cep, setCEP] = useState('')

  useEffect(() => {
    setClients([
      {
        id: 0,
        nome: "Carlos Medeira Pinheiros",
        cpf: "70516895548",
        enderecoDTO: {
          logradouro: "rua Bisco Cardoso Aires",
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

  function tabChange(tab:number){
    setNome('')
    setCPF('')
    setLogradouro('')
    setNumero('')
    setEstado('')
    setCidade('')
    setCEP('')

    setNewForm(tab)
  }

  function editClient(id: number) {
    const clientToEdit = clients.find(client => client.id === id);
  
    if (clientToEdit) {
      setNome(clientToEdit.nome);
      setCPF(clientToEdit.cpf);
      setLogradouro(clientToEdit.enderecoDTO.logradouro);
      setNumero(clientToEdit.enderecoDTO.numero.toString());
      setEstado(clientToEdit.enderecoDTO.estado);
      setCidade(clientToEdit.enderecoDTO.cidade);
      setCEP(clientToEdit.enderecoDTO.cep);
    }
  }

  function dellID(id:number){
    setNome('')
    setCPF('')
    setLogradouro('')
    setNumero('')
    setEstado('')
    setCidade('')
    setCEP('')
  }

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
                  <div key={clients.id} className="border border-gray-100 flex flex-col w-[25rem] h-[15rem] justify-center p-4 rounded-lg gap-y-5">
                      <div className="flex flex-row justify-between">
                        <p className="font-bold text-xl underline">{clients.nome}</p>
                        {(newForm==0)&&(<button className="bg-red-500 hover:bg-red-300 p-2 rounded-full" onClick={()=>dellID(clients.id)}><DeleteOutlinedIcon/></button>)}
                        {(newForm==1)&&(<button className="bg-green-1300 hover:bg-green-100 p-2 rounded-full" onClick={()=>editClient(clients.id)}><CreateOutlinedIcon/></button>)}
                      
                      </div>
                      <p><span className="font-semibold text-base">CPF:</span> {clients.cpf}</p>
                      <p><span className="font-semibold text-base">Endereço:</span> {clients.enderecoDTO.logradouro}</p>
                      <div className="grid grid-cols-2 gap-y-2 text-base">
                        <p><span className="font-semibold">Numero:</span> {clients.enderecoDTO.numero}</p>
                        <p><span className="font-semibold">CEP:</span> {clients.enderecoDTO.cep}</p>
                        <p><span className="font-semibold">Cidade:</span> {clients.enderecoDTO.cidade}</p>
                        <p><span className="font-semibold">Estado:</span> {clients.enderecoDTO.estado}</p>
                      </div>
                  </div>
              ))}
          </div>
          <div 
            className="rounded-xl w-[25%] flex flex-col items-center"
            style={{
              boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.4), -5px -5px 5px rgba(255, 255, 255, 0.5)',
              transition: 'opacity 0.3s ease-in-out',
            }}>
            <h1 className="font-bold border-b border-b-gray-100 flex flex-row w-full justify-center py-3 text-xl">{(newForm==0)?("Novo usuário"):("Editar usuário")}</h1>
            <div className="flex flex-col items-center w-full overflow-y-scroll">

              <div className="flex flex-row w-full justify-between">
                <button className={`hover:bg-gray-100 w-full text-base py-2 ${newForm==0&&('bg-gray-100')}`} onClick={()=>tabChange(0)}>Adicionar</button>
                <button className={`hover:bg-gray-100 w-full text-base py-2 ${newForm==1&&('bg-gray-100')}`} onClick={()=>tabChange(1)}>Editar</button>
              </div>

              <div>
              <form className="flex flex-col justify-start w-full mt-6 mb-4">
                <label htmlFor="userName" className={`text-generic-fields font-bold`}>Nome</label>
                <div className="relative mt-2 mb-8 w-full">
                  <input className={`focus:ring-0 focus:border-1 focus:outline-none appearance-none leading-tight focus:border-white placeholder:text-generic-fields placeholder:font-semibold w-full border-none outline-none rounded-xl py-[1em] pl-[2em] pr-[4em] text-sm bg-generic-bgLight shadow-input hover:shadow-input-hover-focus focus:shadow-input-hover-focus`} 
                            id="userName" 
                            onChange={(e)=>{setNome(e.target.value)}}
                            value={nome}
                            required/>
                </div>

                <label htmlFor="userCPF" className={`text-generic-fields font-bold`}>CPF</label>
                <div className="relative mt-2 mb-8 w-full">
                  <input className={`focus:ring-0 focus:border-1 focus:outline-none appearance-none leading-tight focus:border-white placeholder:text-generic-fields placeholder:font-semibold w-full border-none outline-none rounded-xl py-[1em] pl-[2em] pr-[4em] text-sm bg-generic-bgLight shadow-input hover:shadow-input-hover-focus focus:shadow-input-hover-focus`} 
                            id="userCPF" 
                            onChange={(e)=>{setCPF(e.target.value)}}
                            value={cpf}
                            required/>
                </div>
        
                <label htmlFor="userLogradouro" className={`text-generic-fields font-bold`}>Logradouro</label>
                <div className="relative mt-2 mb-8 w-full">
                  <input className={`focus:ring-0 focus:border-1 focus:outline-none appearance-none leading-tight focus:border-white placeholder:text-generic-fields placeholder:font-semibold w-full border-none outline-none rounded-xl py-[1em] pl-[2em] pr-[4em] text-sm bg-generic-bgLight shadow-input hover:shadow-input-hover-focus focus:shadow-input-hover-focus`}  
                            id="userLogradouro" 
                            onChange={(e)=>{setLogradouro(e.target.value)}}
                            value={logradouro}
                            required/>
                </div>

                <label htmlFor="userNumero" className={`text-generic-fields font-bold`}>Numero</label>
                <div className="relative mt-2 mb-8 w-full">
                  <input className={`focus:ring-0 focus:border-1 focus:outline-none appearance-none leading-tight focus:border-white placeholder:text-generic-fields placeholder:font-semibold w-full border-none outline-none rounded-xl py-[1em] pl-[2em] pr-[4em] text-sm bg-generic-bgLight shadow-input hover:shadow-input-hover-focus focus:shadow-input-hover-focus`}  
                            id="userNumero" 
                            onChange={(e)=>{setNumero(e.target.value)}}
                            value={numero}
                            required/>
                </div>

                <label htmlFor="userEstado" className={`text-generic-fields font-bold`}>Estado</label>
                <div className="relative mt-2 mb-8 w-full">
                  <input className={`focus:ring-0 focus:border-1 focus:outline-none appearance-none leading-tight focus:border-white placeholder:text-generic-fields placeholder:font-semibold w-full border-none outline-none rounded-xl py-[1em] pl-[2em] pr-[4em] text-sm bg-generic-bgLight shadow-input hover:shadow-input-hover-focus focus:shadow-input-hover-focus`}  
                            id="userEstado" 
                            onChange={(e)=>{setEstado(e.target.value)}}
                            value={estado}
                            required/>
                </div>

                <label htmlFor="userCidade" className={`text-generic-fields font-bold`}>Cidade</label>
                <div className="relative mt-2 mb-8 w-full">
                  <input className={`focus:ring-0 focus:border-1 focus:outline-none appearance-none leading-tight focus:border-white placeholder:text-generic-fields placeholder:font-semibold w-full border-none outline-none rounded-xl py-[1em] pl-[2em] pr-[4em] text-sm bg-generic-bgLight shadow-input hover:shadow-input-hover-focus focus:shadow-input-hover-focus`}  
                            id="userCidade" 
                            onChange={(e)=>{setCidade(e.target.value)}}
                            value={cidade}
                            required/>
                </div>

                <label htmlFor="userCEP" className={`text-generic-fields font-bold`}>CEP</label>
                <div className="relative mt-2 mb-8 w-full">
                  <input className={`focus:ring-0 focus:border-1 focus:outline-none appearance-none leading-tight focus:border-white placeholder:text-generic-fields placeholder:font-semibold w-full border-none outline-none rounded-xl py-[1em] pl-[2em] pr-[4em] text-sm bg-generic-bgLight shadow-input hover:shadow-input-hover-focus focus:shadow-input-hover-focus`}  
                            id="userCEP" 
                            onChange={(e)=>{setCEP(e.target.value)}}
                            value={cep}
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
               
            </div>
          </div>

        </div>
      </div>

  )}