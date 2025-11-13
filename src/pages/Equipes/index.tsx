import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useAppTheme } from '../../context/useAppTheme';
import { themeClasses } from '../../utils/themeUtils';
import { 
  getEquipesPorGestor, 
  createEquipe, 
  getEquipePorCodigo, 
} from '../../services/equipeService';
import type { IEquipe } from '../../types/equipeType';
import type { IUserResponse } from '../../types/usuarioType';
import { Loader2 } from 'lucide-react';

const EquipesPage = () => {
  const { user, reloadUser } = useAuth();
  const { darkActive } = useAppTheme();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [minhaEquipe, setMinhaEquipe] = useState<IEquipe | null>(null);
  const [membros, setMembros] = useState<IUserResponse[]>([]);
  
  const [nomeNovaEquipe, setNomeNovaEquipe] = useState('');
  const [codigoEquipe, setCodigoEquipe] = useState('');

  useEffect(() => {
    const carregarDadosEquipe = async () => {
      if (!user) return;

      setIsLoading(true);
      setError(null);
      setMembros([]);

      if (user.idEquipe) {
        try {
          if (user.isGestor) {
            const equipes = await getEquipesPorGestor(user.idUsuario);
            const equipaAtual = equipes.find(e => e.idEquipe === user.idEquipe);
            if (equipaAtual) {
              setMinhaEquipe(equipaAtual);
            }
          } else {
             setMinhaEquipe({
                idEquipe: user.idEquipe,
                nomeEquipe: `Equipe ${user.idEquipe}`,
                codigoEquipe: '...',
                idGestor: 0,
                dtCriacao: ''
             });
             setError("API GET /equipe/{id} em falta para carregar detalhes completos.");
          }
        } catch (err: any) {
          setError(err.message || "Erro ao buscar dados da sua equipe.");
        }
      }
      
      setIsLoading(false);
    };

    carregarDadosEquipe();
  }, [user]);

  const handleCriarEquipe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !nomeNovaEquipe) {
      setError("O nome da equipe é obrigatório.");
      return;
    }
    setError(null);

    try {
      const payload = {
        nome_equipe: nomeNovaEquipe,
        id_gestor: user.idUsuario,
      };

      const novaEquipe = await createEquipe(payload);
      
      setMinhaEquipe(novaEquipe); 
      
      await reloadUser(user.idUsuario); 
      
    } catch (err: any) {
      setError(err.message || "Erro ao criar a equipe. Você já pertence a uma equipe?");
    }
  };

  const handleEntrarComCodigo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !codigoEquipe) {
      setError("O código é obrigatório.");
      return;
    }
    setError(null);

    try {
      const equipeEncontrada = await getEquipePorCodigo(codigoEquipe);
      
    } catch (err: any) {
      setError(err.message || "Código inválido ou equipe não encontrada.");
    }
  };

  if (isLoading) {
    return (
      <div className={`container mx-auto p-4 text-center ${themeClasses.text(darkActive)} ${themeClasses.bg(darkActive)} min-h-screen`}>
        <Loader2 className="w-8 h-8 animate-spin inline-block" />
        <p>Carregando dados da equipe...</p>
      </div>
    );
  }

  return (
    <div className={`container mx-auto p-4 md:p-8 ${themeClasses.text(darkActive)} ${themeClasses.bg(darkActive)} min-h-screen`}>
      <h1 className="text-3xl font-bold mb-6">Gestão de Equipe</h1>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      {user && user.idEquipe ? (
        <div className={`p-6 rounded-lg ${themeClasses.bg(darkActive)} ${themeClasses.border(darkActive)} ${themeClasses.shadow(darkActive)}`}>
          
          {minhaEquipe ? (
            <>
              <h2 className="text-2xl font-semibold mb-4">{minhaEquipe.nomeEquipe}</h2>
              <p className={themeClasses.textMuted(darkActive)}>
                Código de Convite: 
                <strong className="ml-2 font-mono text-lg text-blue-400">{minhaEquipe.codigoEquipe}</strong>
              </p>
            </>
          ) : (
            <h2 className="text-2xl font-semibold mb-4">Equipe ID: {user.idEquipe}</h2>
          )}
          
          <h3 className="text-lg font-semibold mt-6 mb-3">Membros</h3>
          <p className={themeClasses.textMuted(darkActive)}>
          </p>
        </div>
        
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <form 
            onSubmit={handleCriarEquipe}
            className={`p-6 rounded-lg ${themeClasses.bg(darkActive)} ${themeClasses.border(darkActive)} ${themeClasses.shadow(darkActive)}`}
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
                className={`w-full ${themeClasses.btnPrimary(darkActive)} py-2`}
              >
                Criar Equipe
              </button>
            </div>
          </form>

          <form 
            onSubmit={handleEntrarComCodigo}
            className={`p-6 rounded-lg ${themeClasses.bg(darkActive)} ${themeClasses.border(darkActive)} ${themeClasses.shadow(darkActive)}`}
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
                className={`w-full ${themeClasses.btnSecondary(darkActive)} py-2`}
              >
                Entrar com Código
              </button>
            </div>
          </form>

        </div>
      )}
    </div>
  );
};

export default EquipesPage;