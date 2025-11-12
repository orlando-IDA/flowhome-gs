export interface ILoginRequest {
  login: string;
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

export interface IUserResponse {
  idUsuario: number;
  nome: string;
  email: string;
  idEquipe: number | null;
  isGestor: boolean;
}
