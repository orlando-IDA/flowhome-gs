import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useAppTheme } from '../../context/useAppTheme';
import { themeClasses } from '../../utils/themeUtils';
import { createEquipe, getEquipePorCodigo } from '../../services/equipeService';
import { getMembrosDaEquipe, entrarNaEquipe } from '../../services/authService'; 
import type { IEquipeCreate } from '../../types/equipeType';
import type { IUserResponse } from '../../types/usuarioType';
import { Loader2, Users, Copy, Check } from 'lucide-react';

const EquipesPage = () => {
  const { user, minhaEquipe, reloadUser } = useAuth(); 
  const { darkActive } = useAppTheme();
  const [isLoading, setIsLoading] = useState(true); 
  const [error, setError] = useState<string | null>(null);
  const [membros, setMembros] = useState<IUserResponse[]>([]);
  const [nomeNovaEquipe, setNomeNovaEquipe] = useState('');
  const [codigoEquipe, setCodigoEquipe] = useState('');
  const [hasCopied, setHasCopied] = useState(false);
  const carregarMembros = useCallback(async (signal: AbortSignal) => {
    if (!minhaEquipe) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const dadosMembros = await getMembrosDaEquipe(minhaEquipe.idEquipe, signal);
      if (!signal.aborted) {
        setMembros(dadosMembros);
      }
    } catch (err: any) {
      if (err.name === 'AbortError') return;
      setError(err.message || "Erro ao buscar membros da equipe.");
    } finally {
      if (!signal.aborted) {
        setIsLoading(false);
      }
    }
  }, [minhaEquipe]);

  useEffect(() => {
    const abortController = new AbortController();
    carregarMembros(abortController.signal);
    return () => {
      abortController.abort();
    };
  }, [carregarMembros]);

  const handleCriarEquipe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !nomeNovaEquipe.trim()) {
      setError("O nome da equipe é obrigatório.");
      return;
    }
    setError(null);
    setIsLoading(true);

    try {
      const payload: IEquipeCreate = {
        nomeEquipe: nomeNovaEquipe.trim(),
        idGestor: user.idUsuario,
      };

      const abortController = new AbortController();
      const novaEquipe = await createEquipe(payload, abortController.signal);
      if (!novaEquipe || !novaEquipe.codigoEquipe) {
        throw new Error("A criação da equipe falhou em retornar o código.");
      }
      
      const equipeCompleta = await getEquipePorCodigo(
        novaEquipe.codigoEquipe, 
        abortController.signal
      );

      await entrarNaEquipe(
        user.idUsuario, 
        equipeCompleta.idEquipe, 
        abortController.signal
      );
      
      await reloadUser(user.idUsuario); 
      setNomeNovaEquipe('');
      
    } catch (err: any) {
      if (err.name === 'AbortError') return;
      setError(err.message || "Erro ao criar ou entrar na equipe.");
      setIsLoading(false);
    }
  };

  const handleEntrarComCodigo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !codigoEquipe.trim()) {
      setError("O código é obrigatório.");
      return;
    }
    setError(null);
    setIsLoading(true);

    try {
      const equipeEncontrada = await getEquipePorCodigo(codigoEquipe.trim());
      await entrarNaEquipe(user.idUsuario, equipeEncontrada.idEquipe);
      await reloadUser(user.idUsuario);
      setCodigoEquipe('');

    } catch (err: any) {
      if (err.name === 'AbortError') return;
      setError(err.message || "Código inválido ou equipe não encontrada.");
      setIsLoading(false);
    }
  };

  const handleCopyCode = () => {
    if (!minhaEquipe?.codigoEquipe) return;
    navigator.clipboard.writeText(minhaEquipe.codigoEquipe);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  if (isLoading) {
    return (
      <main className={`flex flex-col items-center justify-center p-8 ${themeClasses.bg(darkActive)} ${themeClasses.text(darkActive)} min-h-screen`}>
        <Loader2 className="w-8 h-8 animate-spin mb-2" />
        <p>Carregando dados da equipe...</p>
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
            Gestão de Equipe
          </h1>
        </div>

        {error && (
          <div className={`mb-8 max-w-2xl mx-auto p-4 rounded-lg border ${
            darkActive ? 'bg-red-900/20 border-red-800' : 'bg-red-50 border-red-200'
          }`}>
            <p className="text-red-500 text-sm">{error}</p>
            <button 
              onClick={() => setError(null)}
              className="mt-2 text-red-500 text-sm underline"
            >
              Fechar
            </button>
          </div>
        )}

        {user && user.idEquipe && minhaEquipe ? (
          <div className={`
            p-6 md:p-8 rounded-xl border max-w-2xl mx-auto
            ${themeClasses.bg(darkActive)}
            ${themeClasses.border(darkActive)}
            ${themeClasses.shadow(darkActive)}
          `}>
            
            <h2 className={`text-2xl font-semibold mb-2 ${themeClasses.text(darkActive)}`}>
              {minhaEquipe.nomeEquipe}
            </h2>
            
            {(user.isGestor || user.idUsuario === minhaEquipe?.idGestor) && (
              <div className="mb-6">
                <span className={themeClasses.textMuted(darkActive)}>
                  Código de Convite:
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`font-mono text-lg p-2 rounded-md ${darkActive ? 'bg-gray-800' : 'bg-gray-100'} ${themeClasses.text(darkActive)}`}>
                    {minhaEquipe.codigoEquipe}
                  </span>
                  <button
                    onClick={handleCopyCode}
                    className={`p-2 rounded-lg transition-colors ${themeClasses.btnSecondary(darkActive)}`}
                  >
                    {hasCopied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}
            
            <div className={`border-t ${themeClasses.border(darkActive)} pt-4`}>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Membros ({membros.length})
              </h3>
              <ul className="space-y-2">
                {membros.map(membro => (
                  <li 
                    key={membro.idUsuario}
                    className={`p-3 rounded-md flex justify-between items-center ${darkActive ? 'bg-gray-800' : 'bg-gray-100'}`}
                  >
                    <span className={themeClasses.text(darkActive)}>{membro.nome}</span>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      (membro.isGestor || membro.idUsuario === minhaEquipe?.idGestor)
                        ? 'bg-blue-500/20 text-blue-500' 
                        : 'bg-gray-500/20 text-gray-500'
                    }`}>
                      {(membro.isGestor || membro.idUsuario === minhaEquipe?.idGestor)
                        ? 'Gestor' 
                        : 'Membro'}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            <form 
              onSubmit={handleCriarEquipe}
              className={`
                p-6 md:p-8 rounded-xl border
                ${themeClasses.bg(darkActive)}
                ${themeClasses.border(darkActive)}
                ${themeClasses.shadow(darkActive)}
              `}
            >
              <h2 className="text-2xl font-semibold mb-4">Criar uma Nova Equipe</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="nome-equipe" className="block text-sm font-medium mb-1">
                    Nome da Equipe
                  </label>
                  <input 
                    id="nome-equipe"
                    type="text"
                    value={nomeNovaEquipe}
                    onChange={(e) => setNomeNovaEquipe(e.target.value)}
                    className={themeClasses.input(darkActive)}
                    placeholder="Ex: Equipe Rocket"
                  />
                </div>
                <button 
                  type="submit" 
                  className={`w-full ${themeClasses.btnPrimary(darkActive)} py-3 rounded-lg font-medium`}
                >
                  Criar Equipe
                </button>
              </div>
            </form>

            <form 
              onSubmit={handleEntrarComCodigo}
              className={`
                p-6 md:p-8 rounded-xl border
                ${themeClasses.bg(darkActive)}
                ${themeClasses.border(darkActive)}
                ${themeClasses.shadow(darkActive)}
              `}
            >
              <h2 className="text-2xl font-semibold mb-4">Entrar numa Equipe</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="codigo-equipe" className="block text-sm font-medium mb-1">
                    Código de Convite
                  </label>
                  <input 
                    id="codigo-equipe"
                    type="text"
                    value={codigoEquipe}
                    onChange={(e) => setCodigoEquipe(e.target.value)}
                    className={themeClasses.input(darkActive)}
                    placeholder="Ex: A1B2C3"
                  />
                </div>
                <button 
                  type="submit" 
                  className={`w-full ${themeClasses.btnSecondary(darkActive)} py-3 rounded-lg font-medium`}
                >
                  Entrar com Código
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </main>
  );
};

export default EquipesPage;