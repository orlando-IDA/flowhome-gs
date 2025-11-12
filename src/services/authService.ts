import type { 
  ILoginRequest, 
  ICadastroRequest, 
  IUserResponse 
} from '../types/usuarioType.ts';

const API_URL = import.meta.env.VITE_API_URL;

async function handleJsonResponse(response: Response) {
  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
    } catch (e) {
      errorData = { message: response.statusText };
    }
    throw new Error(errorData.message || `Erro ${response.status}`);
  }
  if (response.status === 204) {
    return null;
  }
  return response.json();
}

async function handleEmptyResponse(response: Response) {
  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
    } catch (e) {
      errorData = { message: response.statusText };
    }
    throw new Error(errorData.message || `Erro ${response.status}`);
  }
  return; 
}


export async function login(data: ILoginRequest): Promise<IUserResponse> {
  const response = await fetch(`${API_URL}/flowhome/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  // Login retorna o objeto do usuário, usamos o handler de JSON
  return handleJsonResponse(response);
}


export async function cadastrarUsuario(data: ICadastroRequest): Promise<void> {
  const response = await fetch(`${API_URL}/flowhome/cadastro`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  // Cadastro retorna 201 (Created) mas sem corpo, usamos o handler vazio
  return handleEmptyResponse(response);
}


export async function getUserById(id: number): Promise<IUserResponse> {
  const response = await fetch(`${API_URL}/flowhome/${id}`, {
    method: 'GET',
  });
  // Retorna os dados do usuário, então usamos o handler de JSON
  return handleJsonResponse(response);
}

