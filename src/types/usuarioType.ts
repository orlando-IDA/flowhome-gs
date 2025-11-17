export interface IUserResponse {
  idUsuario: number;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  dtNascimento?: string | null;
  senha?: string; 
  isGestor: number;
  idEquipe?: number | null;
  dtCadastro: string;
}

export interface ILoginRequest {
  email: string;
  senha: string;
}

export interface ICadastroRequest {
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  dtNascimento: string;
  senha: string;

}

export interface IUserUpdate {
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  dtNascimento: string | null;
}