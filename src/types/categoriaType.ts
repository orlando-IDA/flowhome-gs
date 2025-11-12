export interface ICategoria {
  idCategoria: number;
  nome: string;
  corHex: string;
  id_usuario: number; 
}

export interface ICategoriaCreate {
  nome: string;
  cor_hex: string; 
  id_usuario: number;
}

export interface ICategoriaUpdate {
  nome: string;
  cor_hex: string; 
}