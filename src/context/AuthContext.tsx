import { 
  createContext, 
  useContext, 
  useState, 
  useEffect 
} from 'react';
import type { ReactNode } from 'react';
import type { ILoginRequest, IUserResponse } from '../types/usuarioType';
import type { IEquipe } from '../types/equipeType'; 
import { login as apiLogin, getUsuarioById } from '../services/authService'; 
import { getEquipePorId, getEquipesPorGestor } from '../services/equipeService'; 

interface IAuthContext {
  user: IUserResponse | null;
  minhaEquipe: IEquipe | null; 
  isLoading: boolean;
  login: (credentials: ILoginRequest) => Promise<void>;
  logout: () => void;
  reloadUser: (id: number) => Promise<void>;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUserResponse | null>(null);
  const [minhaEquipe, setMinhaEquipe] = useState<IEquipe | null>(null);
  const [isLoading, setIsLoading] = useState(true); 

  const fetchMinhaEquipe = async (usuario: IUserResponse) => {
    if (usuario.idEquipe) {
      try {
        let equipeData: IEquipe | null = null;
        if (usuario.isGestor) {
          const equipesGestor = await getEquipesPorGestor(usuario.idUsuario);
          equipeData = equipesGestor.find(e => e.idEquipe === usuario.idEquipe) || null;
        } else {
          equipeData = await getEquipePorId(usuario.idEquipe);
        }
        setMinhaEquipe(equipeData);
      } catch (error) {
        console.error("Falha ao buscar dados da equipe", error);
        setMinhaEquipe(null); 
      }
    } else {
      setMinhaEquipe(null); 
    }
  };


  useEffect(() => {
    const loadInitialData = async () => {
      const storedUser = localStorage.getItem('flowhome_user');
      
      if (storedUser) {
        try {
          const parsedUser: IUserResponse = JSON.parse(storedUser);
          setUser(parsedUser);
          await fetchMinhaEquipe(parsedUser); 
        } catch (error) {
          console.error("Falha ao ler dados do localStorage", error);
          localStorage.removeItem('flowhome_user');
        }
      }
      setIsLoading(false);
    };
    
    loadInitialData();
  }, []);

  const login = async (credentials: ILoginRequest) => {
    try {
      const userData = await apiLogin(credentials);
      setUser(userData);
      await fetchMinhaEquipe(userData); 
      localStorage.setItem('flowhome_user', JSON.stringify(userData));
    } catch (error) {
      console.error("Erro no login:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setMinhaEquipe(null); 
    localStorage.removeItem('flowhome_user');
  };

  const reloadUser = async (id: number) => {
    try {
      const updatedUser = await getUsuarioById(id); 
      setUser(updatedUser);
      await fetchMinhaEquipe(updatedUser); 
      localStorage.setItem('flowhome_user', JSON.stringify(updatedUser));
    } catch (error) {
      console.error("Falha ao recarregar dados do usuário", error);
      logout();
    }
  }

  return (
    <AuthContext.Provider value={{ user, minhaEquipe, isLoading, login, logout, reloadUser }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};