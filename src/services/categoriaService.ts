import type { 
  ICategoria, 
  ICategoriaCreate, 
  ICategoriaUpdate 
} from '../types/categoriaType.ts';

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

export async function getCategoriasPorUsuario(idUsuario: number): Promise<ICategoria[]> {
  const response = await fetch(`${API_URL}/categoria/usuario/${idUsuario}`, {
    method: 'GET',
  });
  return handleJsonResponse(response);
}


export async function createCategoria(data: ICategoriaCreate): Promise<ICategoria> {
  const response = await fetch(`${API_URL}/categoria`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return handleJsonResponse(response);
}

export async function updateCategoria(idCategoria: number, data: ICategoriaUpdate): Promise<ICategoria> {
  const response = await fetch(`${API_URL}/categoria/${idCategoria}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return handleJsonResponse(response);
}

export async function deleteCategoria(idCategoria: number): Promise<void> {
  const response = await fetch(`${API_URL}/categoria/${idCategoria}`, {
    method: 'DELETE',
  });
  return handleEmptyResponse(response);
}