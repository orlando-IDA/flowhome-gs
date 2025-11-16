import type { 
  ITarefa, 
  ITarefaCreate, 
  ITarefaUpdate 
} from '../types/tarefaType.ts';
import type {IUsuarioStats, IMembroStats} from '../types/statsType.ts';



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

export async function getTarefasPorUsuario(idUsuario: number, signal?: AbortSignal): Promise<ITarefa[]> {
  const response = await fetch(`${API_URL}/tarefas/usuario/${idUsuario}`, {
    method: 'GET',
    signal: signal,
  });
  const data = await handleJsonResponse(response, signal);
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
  return handleJsonResponse(response, signal);
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
  return handleJsonResponse(response, signal);
}

export async function deleteTarefa(idTarefa: number, signal?: AbortSignal): Promise<void> {
  const response = await fetch(`${API_URL}/tarefas/${idTarefa}`, {
    method: 'DELETE',
    signal: signal,
  });
  return handleEmptyResponse(response, signal);
}

export async function getStatsDoUsuario(idUsuario: number, signal?: AbortSignal): Promise<IUsuarioStats> {
  const response = await fetch(`${API_URL}/tarefas/${idUsuario}/stats`, {
    method: 'GET',
    signal,
  });
  const data = await handleJsonResponse(response, signal);
  return data;
}

export async function getStatsDaEquipe(idEquipe: number, signal?: AbortSignal): Promise<IMembroStats[]> {
  const response = await fetch(`${API_URL}/tarefas/equipe/${idEquipe}/stats`, {
    method: 'GET',
    signal,
  });
  const data = await handleJsonResponse(response, signal);
  return data || []; 
}