import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useAppTheme } from '../../context/useAppTheme';
import { themeClasses } from '../../utils/themeUtils';
import { getStatsDaEquipe } from '../../services/tarefaService';
import type { IMembroStats } from '../../types/statsType.ts';
import { FaTrophy, FaClock, FaCheck, FaExclamationTriangle, FaUsers, FaSpinner } from 'react-icons/fa';

const DashboardPage = () => {
  const { user, minhaEquipe, isLoading: isAuthLoading } = useAuth(); 
  const { darkActive } = useAppTheme();
  
  const [stats, setStats] = useState<IMembroStats[]>([]);
  const [isLoading, setIsLoading] = useState(true); 
  const [error, setError] = useState<string | null>(null);

  const carregarStats = useCallback(async (signal: AbortSignal) => {
    if (!user || !minhaEquipe) {
      setIsLoading(false);
      setError("Você precisa estar em uma equipe e ser o gestor para ver o dashboard.");
      return;
    }
    
    if (user.idUsuario !== minhaEquipe.idGestor) {
      setIsLoading(false);
      setError("Acesso restrito ao gestor da equipe.");
      return;
    }

    try {
      const dados = await getStatsDaEquipe(minhaEquipe.idEquipe, signal);
      if (!signal.aborted) {
        dados.sort((a, b) => b.totalHorasProdutivas - a.totalHorasProdutivas);
        setStats(dados);
      }
    } catch (err: any) {
      if (err.name === 'AbortError') return;
      setError(err.message || "Falha ao carregar estatísticas.");
    } finally {
      if (!signal.aborted) {
        setIsLoading(false); 
      }
    }
  }, [user, minhaEquipe]);

  useEffect(() => {
    if (!isAuthLoading) { 
      const controller = new AbortController();
      carregarStats(controller.signal);
      return () => controller.abort();
    }
  }, [isAuthLoading, carregarStats]); 

  const totais = stats.reduce((acc, membro) => {
    acc.concluidas += membro.totalTarefasConcluidas;
    acc.horas += membro.totalHorasProdutivas;
    acc.pendentes += membro.tarefasPendentes;
    return acc;
  }, { concluidas: 0, horas: 0, pendentes: 0 });

  if (isAuthLoading || isLoading) {
    return (
      <main className={`flex flex-col items-center justify-center p-8 ${themeClasses.bg(darkActive)} ${themeClasses.text(darkActive)} min-h-screen`}>
        <FaSpinner className="w-8 h-8 animate-spin mb-2" />
        <p>Carregando dashboard...</p>
      </main>
    );
  }

  return (
    <main className={`
      min-h-screen py-8 transition-colors duration-300
      ${themeClasses.bg(darkActive)}
    `}>
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <FaUsers className="w-6 h-6 text-blue-500" />
            <h1 className={`text-2xl font-bold ${themeClasses.text(darkActive)}`}>
              Dashboard da Equipe
            </h1>
          </div>
          <p className={`text-sm ${themeClasses.textMuted(darkActive)}`}>
            Acompanhe o desempenho da equipe
          </p>
        </div>

        {error ? (
          <div className={`p-6 rounded-lg border ${themeClasses.bg(darkActive)} ${themeClasses.border(darkActive)}`}>
            <div className="flex items-center gap-3 text-red-500 mb-2">
              <FaExclamationTriangle className="w-5 h-5" />
              <h3 className="font-semibold">Atenção</h3>
            </div>
            <p className={themeClasses.text(darkActive)}>{error}</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className={`p-5 rounded-lg border ${themeClasses.bg(darkActive)} ${themeClasses.border(darkActive)}`}>
                <div className="flex items-center gap-3 mb-3">
                  <FaCheck className="w-5 h-5 text-green-500" />
                  <h3 className="font-medium">Concluídas</h3>
                </div>
                <div className="text-2xl font-bold text-green-500">{totais.concluidas}</div>
              </div>

              <div className={`p-5 rounded-lg border ${themeClasses.bg(darkActive)} ${themeClasses.border(darkActive)}`}>
                <div className="flex items-center gap-3 mb-3">
                  <FaClock className="w-5 h-5 text-blue-500" />
                  <h3 className="font-medium">Horas</h3>
                </div>
                <div className="text-2xl font-bold text-blue-500">{totais.horas.toFixed(1)}h</div>
              </div>

              <div className={`p-5 rounded-lg border ${themeClasses.bg(darkActive)} ${themeClasses.border(darkActive)}`}>
                <div className="flex items-center gap-3 mb-3">
                  <FaExclamationTriangle className="w-5 h-5 text-yellow-500" />
                  <h3 className="font-medium">Pendentes</h3>
                </div>
                <div className="text-2xl font-bold text-yellow-500">{totais.pendentes}</div>
              </div>
            </div>

            <div className={`rounded-lg border ${themeClasses.bg(darkActive)} ${themeClasses.border(darkActive)}`}>
              <div className="p-5 border-b border-gray-700">
                <div className="flex items-center gap-3">
                  <FaTrophy className="w-5 h-5 text-yellow-500" />
                  <h2 className="text-lg font-semibold">Ranking da Equipe</h2>
                </div>
              </div>

              <div className="p-4">
                {stats.length === 0 ? (
                  <div className="text-center py-6">
                    <p className={themeClasses.textMuted(darkActive)}>
                      Nenhum dado disponível
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {stats.map((membro, index) => (
                      <div 
                        key={membro.idUsuario}
                        className={`p-4 rounded-lg flex items-center gap-4 ${
                          darkActive ? 'bg-gray-800' : 'bg-gray-50'
                        }`}
                      >
                        <div className={`
                          w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                          ${index === 0 ? 'bg-yellow-500 text-white' :
                            index === 1 ? 'bg-gray-400 text-white' :
                            index === 2 ? 'bg-orange-500 text-white' :
                            'bg-gray-600 text-white'}
                        `}>
                          {index + 1}
                        </div>
                        
                        <div className="flex-1">
                          <h3 className={`font-medium ${themeClasses.text(darkActive)}`}>
                            {membro.nomeUsuario}
                          </h3>
                          <div className="flex gap-4 text-sm mt-1">
                            <span className={themeClasses.textMuted(darkActive)}>
                              {membro.totalHorasProdutivas.toFixed(1)}h
                            </span>
                            <span className={themeClasses.textMuted(darkActive)}>
                              {membro.totalTarefasConcluidas} concluídas
                            </span>
                            <span className={themeClasses.textMuted(darkActive)}>
                              {membro.tarefasPendentes} pendentes
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default DashboardPage;