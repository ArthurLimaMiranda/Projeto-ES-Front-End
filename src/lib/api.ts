import axios from "axios";
import { parseCookies } from "nookies";

const urlBase = "http://127.0.0.1:8000/api/"

const { 'rectool.token': token } = parseCookies()

const config = {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
};

export async function createClient(id:number, nome: string, cpf: string, logradouro: string, numero: string, estado: string, cidade: string, cep: string) {
  const response = await api.post('/cliente/create', {
    id: `${id}`,
    nome: nome,
    cpf: cpf,
    logradouro: logradouro,
    numero: numero,
    estado: estado,
    cidade: cidade,
    cep: cep,
  });

  return response;
}

export async function getClientInfo(id: string) {
  const response = await api.get('/cliente/'+id, {});
  return response.data;
}

export async function getClientList() {
  try {
    const response = await api.get('/clientes', {});
    return response.data;
  } 
  catch (error) {
    return false
  }
}

export async function updateClient(id:number, nome: string, cpf: string, logradouro: string, numero: string, estado: string, cidade: string, cep: string) {
  const response = await api.put('/cliente/update', {
    id: `${id}`,
    nome: nome,
    cpf: cpf,
    logradouro: logradouro,
    numero: numero,
    estado: estado,
    cidade: cidade,
    cep: cep,
  });
    return response;
}

export async function deleteClient(id: number) {
  const response = await api.delete('/cliente/'+id, {});
  return response.data;
}

export const api = axios.create({
  baseURL: urlBase
})

if(token){
  api.defaults.headers['Authorization'] = `Bearer ${token}`
}

