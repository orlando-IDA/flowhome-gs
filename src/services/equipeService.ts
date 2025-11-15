import type { 
  IEquipe, 
  IEquipeCreate, 
  IEquipeUpdate 
} from '../types/equipeType.ts';


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





export async function createEquipe(data: IEquipeCreate): Promise<IEquipe> {
  const response = await fetch(`${API_URL}/equipe`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return handleJsonResponse(response);
}

export async function getEquipesPorGestor(idGestor: number): Promise<IEquipe[]> {
  const response = await fetch(`${API_URL}/equipe/gestor/${idGestor}`, {
    method: 'GET',
  });
  return handleJsonResponse(response);
}

export async function getEquipePorCodigo(codigoEquipe: string): Promise<IEquipe> {
  const response = await fetch(`${API_URL}/equipe/buscar/${codigoEquipe}`, {
    method: 'GET',
  });
  return handleJsonResponse(response);
}

export async function updateEquipe(idEquipe: number, data: IEquipeUpdate): Promise<IEquipe> {
  const response = await fetch(`${API_URL}/equipe/${idEquipe}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return handleJsonResponse(response);
}

export async function deleteEquipe(idEquipe: number): Promise<void> {
  const response = await fetch(`${API_URL}/equipe/${idEquipe}`, {
    method: 'DELETE',
  });
  return handleEmptyResponse(response);
}

// REMOVIDA A FUNÇÃO 'getMembrosDaEquipe'
// (Ela foi movida para authService.ts)