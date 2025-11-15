import type { 
  ITarefa, 
  ITarefaCreate, 
  ITarefaUpdate 
} from '../types/tarefaType.ts';

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

export async function getTarefasPorUsuario(idUsuario: number, signal?: AbortSignal): Promise<ITarefa[]> {
  const response = await fetch(`${API_URL}/tarefas/usuario/${idUsuario}`, {
    method: 'GET',
    signal: signal,
  });
  const data = await handleJsonResponse(response);
  return data || [];
}

export async function createTarefa(data: ITarefaCreate, signal?: AbortSignal): Promise<ITarefa> {
  const response = await fetch(`${API_URL}/tarefas`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    signal: signal,
  });
  return handleJsonResponse(response);
}

export async function updateTarefa(idTarefa: number, data: ITarefaUpdate, signal?: AbortSignal): Promise<ITarefa> {
  const response = await fetch(`${API_URL}/tarefas/${idTarefa}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    signal: signal,
  });
  return handleJsonResponse(response);
}

export async function deleteTarefa(idTarefa: number, signal?: AbortSignal): Promise<void> {
  const response = await fetch(`${API_URL}/tarefas/${idTarefa}`, {
    method: 'DELETE',
    signal: signal,
  });
  return handleEmptyResponse(response);
}