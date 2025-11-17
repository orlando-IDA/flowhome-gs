export interface ICategoria {
  idCategoria: number;
  nome: string;
  corHex: string;
  idUsuario: number; 
}

export interface ICategoriaCreate {
  nome: string;
  corHex: string;
  idUsuario: number;
}

export interface ICategoriaUpdate {
  nome: string;
  corHex: string;
  idUsuario: number;
}