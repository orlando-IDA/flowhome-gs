import type { 
  IEquipe, 
  IEquipeCreate, 
  IEquipeUpdate 
} from '../types/equipeType.ts';

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

export async function createEquipe(data: IEquipeCreate, signal?: AbortSignal): Promise<IEquipe> {
  const response = await fetch(`${API_URL}/equipes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    signal,
  });
  return handleJsonResponse(response, signal);
}

export async function getEquipesPorGestor(idGestor: number, signal?: AbortSignal): Promise<IEquipe[]> {
  const response = await fetch(`${API_URL}/equipes/gestor/${idGestor}`, {
    method: 'GET',
    signal,
  });
  return handleJsonResponse(response, signal);
}

export async function getEquipePorCodigo(codigoEquipe: string, signal?: AbortSignal): Promise<IEquipe> {
  const response = await fetch(`${API_URL}/equipes/buscar/${codigoEquipe}`, {
    method: 'GET',
    signal,
  });
  return handleJsonResponse(response, signal);
}

export async function getEquipePorId(idEquipe: number, signal?: AbortSignal): Promise<IEquipe> {
  const response = await fetch(`${API_URL}/equipes/${idEquipe}`, {
    method: 'GET',
    signal,
  });
  return handleJsonResponse(response, signal);
}

export async function updateEquipe(idEquipe: number, data: IEquipeUpdate, signal?: AbortSignal): Promise<IEquipe> {
  const response = await fetch(`${API_URL}/equipes/${idEquipe}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    signal,
  });
  return handleJsonResponse(response, signal);
}

export async function deleteEquipe(idEquipe: number, signal?: AbortSignal): Promise<void> {
  const response = await fetch(`${API_URL}/equipes/${idEquipe}`, {
    method: 'DELETE',
    signal,
  });
  return handleEmptyResponse(response, signal);
}