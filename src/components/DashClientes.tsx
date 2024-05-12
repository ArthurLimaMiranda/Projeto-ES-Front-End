"use client"
import { Header } from "./Header";

import { useEffect, useState } from "react";
import React from 'react';

import { COLORS } from '../../src/lib/AppStyles'

import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import { createClient, deleteClient, getClientList, updateClient } from "@/lib/api";

interface Clients {
  id: number;
  nome: string;
  cpf: string;
  logradouro: string;
  numero: number;
  estado: string;
  cidade: string;
  cep: string;
}

export function DashClientes(){

  const [clients, setClients] = useState<Clients[]>([])

  const [newForm, setNewForm] = useState(0)

  const [idToEdit, setIDToEdit] = useState(-1);
  const [nome, setNome] = useState('')
  const [cpf, setCPF] = useState('')
  const [logradouro, setLogradouro] = useState('')
  const [numero, setNumero] = useState('')
  const [estado, setEstado] = useState('')
  const [cidade, setCidade] = useState('')
  const [cep, setCEP] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientList = await getClientList();
        if (clientList) {
          const formattedClients = clientList.map((client: Clients) => ({
            id: client.id,
            nome: client.nome,
            cpf: client.cpf,
            logradouro: client.logradouro,
            numero: client.numero,
            estado: client.estado,
            cidade: client.cidade,
            cep: client.cep
          }));
          
          setClients(formattedClients);
        }
      } catch (error) {
        console.error('Error fetching client list:', error);
      }
    };
  
    fetchData();
  }, []);

  function tabChange(tab:number){
    resetInfo()
    setNewForm(tab)
  }

  function resetInfo(){
    setIDToEdit(-1)
    setNome('')
    setCPF('')
    setLogradouro('')
    setNumero('')
    setEstado('')
    setCidade('')
    setCEP('')
  }

  async function handleCreateClient(nome: string, cpf: string, logradouro: string, numero: string, estado: string, cidade: string, cep: string) {
    try {
      const id = Date.now() * Math.floor(Math.random() * 1000000);
      const newClient: Clients = {
        id: id,
        nome: nome,
        cpf: cpf,
        logradouro: logradouro,
        numero: parseInt(numero), // Convert string to number
        estado: estado,
        cidade: cidade,
        cep: cep
      };
  
      await createClient(id, nome, cpf, logradouro, numero, estado, cidade, cep);
      setClients(prevClients => [...prevClients, newClient]);
    } catch (error) {
      console.error('Error creating client:', error);
    }    
  }
  

  async function handleEditClient(id: number, nome: string, cpf: string, logradouro: string, numero: string, estado: string, cidade: string, cep: string) {
    try {
      const updatedClients = clients.map(client => {
        if (client.id === id) {
          return {
            id: id,
            nome: nome,
            cpf: cpf,
            logradouro: logradouro,
            numero: parseInt(numero), // Convert string to number
            estado: estado,
            cidade: cidade,
            cep: cep
          };
        } else {
          return client;
        }
      });
      setClients(updatedClients);
      await updateClient(id, nome, cpf, logradouro, numero, estado, cidade, cep);
      resetInfo();
    } catch (error) {
      console.error('Error updating client:', error);
    }  
  }
  
  
  function editClient(id: number) {
    const clientToEdit = clients.find(client => client.id === id);
    setIDToEdit(id)
    if (clientToEdit) {
      setNome(clientToEdit.nome);
      setCPF(clientToEdit.cpf);
      setLogradouro(clientToEdit.logradouro);
      setNumero(clientToEdit.numero.toString());
      setEstado(clientToEdit.estado);
      setCidade(clientToEdit.cidade);
      setCEP(clientToEdit.cep);
    }
  }

  async function dellID(id:number){

    if (confirm(`Deseja apagar o usuario?`) == true) {
      try {
        await deleteClient(id);
        setClients(prevClients => prevClients.filter(client => client.id !== id));
        }
      catch (error) {
        console.error('Error deleting client:', error);
      }
      alert("Usuário remodivo!");
    } 
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
                      <p><span className="font-semibold text-base">Endereço:</span> {clients.logradouro}</p>
                      <div className="grid grid-cols-2 gap-y-2 text-base">
                        <p><span className="font-semibold">Numero:</span> {clients.numero}</p>
                        <p><span className="font-semibold">CEP:</span> {clients.cep}</p>
                        <p><span className="font-semibold">Cidade:</span> {clients.cidade}</p>
                        <p><span className="font-semibold">Estado:</span> {clients.estado}</p>
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
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if(newForm==0){
                    handleCreateClient(nome, cpf, logradouro, numero, estado, cidade, cep);
                  }

                  if(newForm==1){
                    handleEditClient(idToEdit, nome, cpf, logradouro, numero, estado, cidade, cep);
                  }
                }}
                className="flex flex-col justify-start w-full mt-6 mb-4"
              >
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

                {newForm === 0 && (
                  <button 
                    title="Cadastrar"
                    type="submit" 
                    className={`leading-none w-full border-none outline-none rounded-xl bg-generic-tittleButton p-4 text-generic-bgLight font-bold cursor-pointer mb-6 shadow-button hover:shadow-button-hover-focus focus:shadow-button-hover-focus`}
                  >
                    Cadastrar
                  </button>
                )}

                {newForm === 1 && (
                  <button 
                    title="Editar"
                    type="submit" 
                    className={`leading-none w-full border-none outline-none rounded-xl bg-generic-tittleButton p-4 text-generic-bgLight font-bold cursor-pointer mb-6 shadow-button hover:shadow-button-hover-focus focus:shadow-button-hover-focus`}
                  >
                    Editar
                  </button>
                )}
              </form>
            </div>
               
            </div>
          </div>

        </div>
      </div>

  )}