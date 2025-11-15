import type { 
  ILoginRequest, 
  ICadastroRequest,
  IUserResponse 
} from '../types/usuarioType.ts';

const API_URL = import.meta.env.VITE_API_URL;

// --- Helpers de Resposta (Sem alteração) ---
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
  const response = await fetch(`${API_URL}/usuarios/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return handleJsonResponse(response);
}

export async function cadastrarUsuario(data: ICadastroRequest): Promise<IUserResponse> {
  const response = await fetch(`${API_URL}/usuarios`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return handleJsonResponse(response);
}

export async function getUsuarioById(id: number): Promise<IUserResponse> {
  const response = await fetch(`${API_URL}/usuarios/${id}`, {
    method: 'GET',
  });
  return handleJsonResponse(response);
}


export async function getMembrosDaEquipe(idEquipe: number): Promise<IUserResponse[]> {
  const response = await fetch(`${API_URL}/usuarios/equipe/${idEquipe}`, {
    method: 'GET',
  });
  return handleJsonResponse(response);
}

export async function entrarNaEquipe(idUsuario: number, idEquipe: number): Promise<IUserResponse> {
  const response = await fetch(`${API_URL}/usuarios/${idUsuario}/equipe/${idEquipe}`, {
    method: 'PUT',
  });
  return handleJsonResponse(response);
}

export async function sairDaEquipe(idUsuario: number): Promise<IUserResponse> {
  const response = await fetch(`${API_URL}/usuarios/${idUsuario}/equipe`, {
    method: 'DELETE',
  });
  return handleJsonResponse(response);
}