import axios from "axios";
import { parseCookies } from "nookies";

const urlBase = "to set"

const { 'rectool.token': token } = parseCookies()

const config = {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
};

export async function createClient(nome: string, cpf: string, enderecoDTO: string[]) {
  const response = await api.post('/cliente/create', {
    nome: nome,
    cpf: cpf,
    enderecoDTO: {
      "logradouro": enderecoDTO[0],
      "numero": enderecoDTO[1],
      "estado": enderecoDTO[2],
      "cidade": enderecoDTO[3],
      "cep": enderecoDTO[4]
    },
  });
    return response;
}

export async function getClientInfo(id: string) {
  const response = await api.get('/cliente/'+id, {});
  return response.data;
}

//A fazer ainda//
export async function getClientList(filtro:string) {
  try {
    if(filtro==""){
      const response = await api.post('/redemption/all', [], {
        headers: config.headers,
      })
      return response.data;
    }
    else{
      const response = await api.post('/redemption/all', [filtro], {
        headers: config.headers,
      })
      return response.data;
    }
  } 
  catch (error) {
    return false
  }
}

export async function updateClient(id:string) {
  const response = await api.delete('/cliente/'+id, {});
  return response.data;
}

//////////////////

export const api = axios.create({
  baseURL: urlBase
})

if(token){
  api.defaults.headers['Authorization'] = `Bearer ${token}`
}

