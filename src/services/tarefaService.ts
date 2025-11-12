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

export async function getTarefasPorUsuario(idUsuario: number): Promise<ITarefa[]> {
  const response = await fetch(`${API_URL}/tarefas/usuario/${idUsuario}`, {
    method: 'GET',
  });
  return handleJsonResponse(response);
}

export async function createTarefa(data: ITarefaCreate): Promise<ITarefa> {
  const response = await fetch(`${API_URL}/tarefas`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return handleJsonResponse(response);
}

export async function updateTarefa(idTarefa: number, data: ITarefaUpdate): Promise<ITarefa> {
  const response = await fetch(`${API_URL}/tarefas/${idTarefa}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return handleJsonResponse(response);
}

export async function deleteTarefa(idTarefa: number): Promise<void> {
  const response = await fetch(`${API_URL}/tarefas/${idTarefa}`, {
    method: 'DELETE',
  });
  return handleEmptyResponse(response);
}