export interface IEquipe {
  idEquipe: number;
  nomeEquipe: string;
  codigoEquipe: string;
  idGestor: number;
  dtCriacao: string;
}


export interface IEquipeCreate {
  nomeEquipe: string; 
  idGestor: number;   
}

export interface IEquipeUpdate {
  nomeEquipe: string; 
}