export interface IUsuarioStats {
  totalTarefasConcluidas: number;
  totalHorasProdutivas: number;
  tarefasPendentes: number;
}

export interface IMembroStats extends IUsuarioStats {
  idUsuario: number;
  nomeUsuario: string;
}