export type StatusTarefa = 'Pendente' | 'Em Andamento' | 'Concluída';


export interface ITarefa {
  idTarefa: number;
  titulo: string;
  descricao?: string | null;
  idCategoria: number; 
  dtVencimento?: string | null; 
  tempoEstimadoH?: number | null; 
  status: StatusTarefa;
  idUsuario: number; 
  dtCriacao: string;
  dtConclusao?: string | null;
}

export interface ITarefaCreate {
  titulo: string;
  descricao?: string | null;
  idCategoria: number; 
  dtVencimento?: string | null; 
  tempoEstimadoH?: number | null; 
  idUsuario: number;
}

export interface ITarefaUpdate {
  titulo: string;
  descricao?: string | null;
  idCategoria: number; 
  dtVencimento?: string | null; 
  tempoEstimadoH?: number | null; 
  status: StatusTarefa;
}