import { 
  createContext, 
  useContext, 
  useState, 
  useEffect 
} from 'react';
import type { ReactNode } from 'react';
import type { ILoginRequest, IUserResponse } from '../types/usuarioType';
import { login as apiLogin, getUserById } from '../services/authService'; // Vamos assumir que 'getUserById' existe em authService

interface IAuthContext {
  user: IUserResponse | null;
  isLoading: boolean;
  login: (credentials: ILoginRequest) => Promise<void>;
  logout: () => void;
  reloadUser: (id: number) => Promise<void>;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUserResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('flowhome_user');
    
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Falha ao ler usuário do localStorage", error);
        localStorage.removeItem('flowhome_user');
      }
    }
    setIsLoading(false); 
  }, []);

  const login = async (credentials: ILoginRequest) => {
    try {
      const userData = await apiLogin(credentials);
      setUser(userData);
      localStorage.setItem('flowhome_user', JSON.stringify(userData));
    } catch (error) {
      console.error("Erro no login:", error);
      throw error; 
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('flowhome_user');
  };

  const reloadUser = async (id: number) => {
    try {
      const updatedUser = await getUserById(id); 
      setUser(updatedUser);
      localStorage.setItem('flowhome_user', JSON.stringify(updatedUser));
    } catch (error) {
      console.error("Falha ao recarregar dados do usuário", error);
      logout(); 
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, reloadUser }}>
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