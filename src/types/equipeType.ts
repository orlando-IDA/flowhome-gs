export interface IEquipe {
  idEquipe: number;
  nomeEquipe: string;
  codigoEquipe: string;
  idGestor: number;
  dtCriacao: string;
}


export interface IEquipeCreate {
  nome_equipe: string; 
  id_gestor: number;   
}

export interface IEquipeUpdate {
  nome_equipe: string; 
}