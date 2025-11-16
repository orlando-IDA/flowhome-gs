import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useAppTheme } from '../../context/useAppTheme';
import { themeClasses } from '../../utils/themeUtils';
import { getStatsDaEquipe } from '../../services/tarefaService';
import type { IMembroStats } from '../../types/statsType.ts';
import { Loader2 } from 'lucide-react';

const DashboardPage = () => {
  const { user, minhaEquipe, isLoading: isAuthLoading } = useAuth(); 
  const { darkActive } = useAppTheme();
  
  const [stats, setStats] = useState<IMembroStats[]>([]);
  const [isLoading, setIsLoading] = useState(true); 
  const [error, setError] = useState<string | null>(null);

  const carregarStats = useCallback(async (signal: AbortSignal) => {
    if (!user || !minhaEquipe) {
      setIsLoading(false);
      setError("Você precisa estar em uma equipe para ver o dashboard.");
      return;
    }
    
    if (user.idUsuario !== minhaEquipe.idGestor) {
      setIsLoading(false);
      setError("Acesso negado. Apenas o gestor da equipe pode ver esta página.");
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
        <Loader2 className="w-8 h-8 animate-spin mb-2" />
        <p>Carregando dashboard...</p>
      </main>
    );
  }

  return (
    <main className={`
      min-h-screen py-12 transition-colors duration-300
      ${themeClasses.bg(darkActive)}
    `}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className={`
            text-3xl md:text-4xl font-bold mb-4
            ${themeClasses.text(darkActive)}
          `}>
            Dashboard da Equipe
          </h1>
        </div>

        {error ? (
          <div className={`
            text-center p-8 rounded-xl border max-w-2xl mx-auto
            ${themeClasses.bg(darkActive)}
            ${themeClasses.border(darkActive)}
            ${themeClasses.shadow(darkActive)}
          `}>
            <p className="text-lg text-red-500">{error}</p>
          </div>
        ) : (
          <>
            <div className={`
              p-6 md:p-8 rounded-xl border max-w-4xl mx-auto mb-8
              ${themeClasses.bg(darkActive)}
              ${themeClasses.border(darkActive)}
              ${themeClasses.shadow(darkActive)}
            `}>
              <h2 className="text-2xl font-semibold mb-4">Totais da Equipe</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div>
                  <span className="block text-3xl font-bold text-green-500">{totais.concluidas}</span>
                  <span className={themeClasses.textMuted(darkActive)}>Tarefas Concluídas</span>
                </div>
                <div>
                  <span className="block text-3xl font-bold text-blue-500">{totais.horas.toFixed(1)}h</span>
                  <span className={themeClasses.textMuted(darkActive)}>Horas Produtivas</span>
                </div>
                <div>
                  <span className="block text-3xl font-bold text-yellow-500">{totais.pendentes}</span>
                  <span className={themeClasses.textMuted(darkActive)}>Tarefas Pendentes</span>
                </div>
              </div>
            </div>

            <div className={`
              p-6 md:p-8 rounded-xl border max-w-4xl mx-auto
              ${themeClasses.bg(darkActive)}
              ${themeClasses.border(darkActive)}
              ${themeClasses.shadow(darkActive)}
            `}>
              <h2 className="text-2xl font-semibold mb-4">Ranking da Equipe</h2>
              <ul className="space-y-3">
                {stats.map((membro, index) => (
                  <li 
                    key={membro.idUsuario}
                    className={`
                      p-4 rounded-lg flex items-center gap-4
                      ${darkActive ? 'bg-gray-800' : 'bg-gray-100'}
                    `}
                  >
                    <span className={`text-xl font-bold ${themeClasses.textMuted(darkActive)} w-6`}>{index + 1}.</span>
                    <div className="flex-1">
                      <h3 className={`font-semibold ${themeClasses.text(darkActive)}`}>{membro.nomeUsuario}</h3>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <span title="Horas Produtivas">🚀 {membro.totalHorasProdutivas.toFixed(1)}h</span>
                        <span title="Tarefas Concluídas">✅ {membro.totalTarefasConcluidas}</span>
                        <span title="Tarefas Pendentes">⏳ {membro.tarefasPendentes}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default DashboardPage;