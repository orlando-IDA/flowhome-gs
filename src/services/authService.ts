import type { 
  ILoginRequest, 
  ICadastroRequest, 
  IUserResponse 
} from '../types/usuarioType.ts';

const API_URL = import.meta.env.VITE_API_URL;

async function handleJsonResponse(response: Response, signal?: AbortSignal) {
  if (signal?.aborted) {
    throw new DOMException('AbortError', 'AbortError');
  }
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

async function handleEmptyResponse(response: Response, signal?: AbortSignal) {
  if (signal?.aborted) {
    throw new DOMException('AbortError', 'AbortError');
  }
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


export async function login(data: ILoginRequest, signal?: AbortSignal): Promise<IUserResponse> {
  const response = await fetch(`${API_URL}/usuarios/login`, { 
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    signal,
  });
  return handleJsonResponse(response, signal);
}

export async function cadastrarUsuario(data: ICadastroRequest, signal?: AbortSignal): Promise<IUserResponse> {
  const response = await fetch(`${API_URL}/usuarios`, { // Caminho corrigido
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    signal,
  });
  return handleJsonResponse(response, signal);
}

export async function getUsuarioById(id: number, signal?: AbortSignal): Promise<IUserResponse> {
  const response = await fetch(`${API_URL}/usuarios/${id}`, { // Caminho corrigido
    method: 'GET',
    signal,
  });
  return handleJsonResponse(response, signal);
}

export async function getMembrosDaEquipe(idEquipe: number, signal?: AbortSignal): Promise<IUserResponse[]> {
  const response = await fetch(`${API_URL}/usuarios/equipe/${idEquipe}`, {
    method: 'GET',
    signal,
  });
  const data = await handleJsonResponse(response, signal);
  return data || []; 
}

export async function entrarNaEquipe(idUsuario: number, idEquipe: number, signal?: AbortSignal): Promise<IUserResponse> {
  const response = await fetch(`${API_URL}/usuarios/${idUsuario}/equipe/${idEquipe}`, {
    method: 'PUT',
    signal,
  });
  return handleJsonResponse(response, signal);
}

export async function sairDaEquipe(idUsuario: number, signal?: AbortSignal): Promise<IUserResponse> {
  const response = await fetch(`${API_URL}/usuarios/${idUsuario}/equipe`, {
    method: 'DELETE',
    signal,
  });
  return handleJsonResponse(response, signal);
}