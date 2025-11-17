import type { 
  ILoginRequest, 
  ICadastroRequest, 
  IUserResponse
} from '../types/usuarioType.ts';

const API_URL = import.meta.env.VITE_API_URL;

async function handleResponse(response: Response, signal?: AbortSignal) {
  if (signal?.aborted) {
    throw new DOMException('AbortError', 'AbortError');
  }

  if (!response.ok) {
    const errorText = await response.text();
    let errorMessage;
    
    try {
      const errorData = JSON.parse(errorText);
      errorMessage = errorData.message || errorData.error;
    } catch {
      errorMessage = errorText || response.statusText;
    }
    
    if (response.status === 401) {
      errorMessage = 'Email ou senha incorretos';
    } else if (response.status === 404) {
      errorMessage = 'Recurso não encontrado';
    } else if (response.status >= 500) {
      errorMessage = 'Erro no servidor. Tente novamente.';
    }
    
    throw new Error(errorMessage || `Erro ${response.status}`);
  }
  
  if (response.status === 204) return null;
  return response.json();
}

export async function login(data: ILoginRequest, signal?: AbortSignal): Promise<IUserResponse> {
  const response = await fetch(`${API_URL}/usuarios/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    signal,
  });
  return handleResponse(response, signal);
}

export async function cadastrarUsuario(data: ICadastroRequest, signal?: AbortSignal): Promise<IUserResponse> {
  const response = await fetch(`${API_URL}/usuarios`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    signal,
  });
  return handleResponse(response, signal);
}

export async function getUsuarioById(id: number, signal?: AbortSignal): Promise<IUserResponse> {
  const response = await fetch(`${API_URL}/usuarios/${id}`, {
    method: 'GET',
    signal,
  });
  return handleResponse(response, signal);
}

export async function getMembrosDaEquipe(idEquipe: number, signal?: AbortSignal): Promise<IUserResponse[]> {
  const response = await fetch(`${API_URL}/usuarios/equipe/${idEquipe}`, {
    method: 'GET',
    signal,
  });
  const data = await handleResponse(response, signal);
  return data || [];
}

export async function entrarNaEquipe(idUsuario: number, idEquipe: number, signal?: AbortSignal): Promise<IUserResponse> {
  const response = await fetch(`${API_URL}/usuarios/${idUsuario}/equipe/${idEquipe}`, {
    method: 'PUT',
    signal,
  });
  return handleResponse(response, signal);
}

export async function sairDaEquipe(idUsuario: number, signal?: AbortSignal): Promise<IUserResponse> {
  const response = await fetch(`${API_URL}/usuarios/${idUsuario}/equipe`, {
    method: 'DELETE',
    signal,
  });
  return handleResponse(response, signal);
}

export async function updateUsuario(id: number, data: IUserResponse, signal?: AbortSignal): Promise<IUserResponse> {
  const response = await fetch(`${API_URL}/usuarios/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    signal,
  });
  return handleResponse(response, signal);
}

export async function deleteUsuario(id: number, signal?: AbortSignal): Promise<void> {
  const response = await fetch(`${API_URL}/usuarios/${id}`, {
    method: 'DELETE',
    signal,
  });
  await handleResponse(response, signal);
}