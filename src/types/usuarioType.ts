export interface User {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  isGestor: boolean;
  idEquipe: number | null;
}