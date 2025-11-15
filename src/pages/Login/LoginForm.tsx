import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; 
import { useAppTheme } from '../../context/useAppTheme';
import { themeClasses } from '../../utils/themeUtils';
import { useAuth } from '../../context/AuthContext';

const loginSchema = z.object({
  email: z.string().email('Formato de e-mail inválido.'),
  senha: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres.'),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onToggleView: () => void;
}

export function LoginForm({ onToggleView }: LoginFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const { darkActive } = useAppTheme();
  const navigate = useNavigate(); 
  const { login } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      senha: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setApiError(null);

    try {
      await login(data);
      navigate('/');

    } catch (error: any) {
      console.error('Erro no login:', error);
      setApiError(error.message || 'Falha ao conectar. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`
      rounded-xl shadow-lg border transition-colors duration-300
      ${themeClasses.bg(darkActive)}
      ${themeClasses.border(darkActive)}
      ${themeClasses.shadow(darkActive)}
    `}>
      
      <div className="p-6">
        <h2 className={`
          text-2xl font-semibold transition-colors duration-300
          ${themeClasses.text(darkActive)}
        `}>
          Acessar Plataforma
        </h2>
        <p className={`
          mt-1 transition-colors duration-300
          ${themeClasses.textMuted(darkActive)}
        `}>
          Insira seu e-mail e senha para continuar.
        </p>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-6 pt-0 space-y-4">
          <div className="space-y-2">
            <label 
              htmlFor="email" 
              className={`
                block text-sm font-medium transition-colors duration-300
                ${themeClasses.text(darkActive)}
              `}
            >
              E-mail
            </label>
            <input
              id="email"
              type="email"
              placeholder="seu.email@exemplo.com"
              className={themeClasses.input(darkActive, !!errors.email)}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm font-medium text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label 
              htmlFor="senha" 
              className={`
                block text-sm font-medium transition-colors duration-300
                ${themeClasses.text(darkActive)}
              `}
            >
              Senha
            </label>
            <input
              id="senha"
              type="password"
              placeholder="••••••••"
              className={themeClasses.input(darkActive, !!errors.senha)}
              {...register("senha")}
            />
            {errors.senha && (
              <p className="text-sm font-medium text-red-600">
                {errors.senha.message}
              </p>
            )}
          </div>
        </div>
        <div className="px-6 pb-4 pt-0 flex flex-col gap-4">
          {apiError && (
            <p className="text-sm font-medium text-red-600 text-center">
              {apiError}
            </p>
          )}
          
          <button 
            type="submit" 
            className={`
              w-full inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-semibold text-white 
              bg-blue-600 hover:bg-blue-700 transition-colors
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Entrar'}
          </button>
          <button 
            type="button" 
            onClick={onToggleView} 
            className="font-normal text-blue-600 hover:text-blue-700 text-sm"
          >
            Não tem uma conta? Cadastre-se
          </button>
        </div>
      </form>
    </div>
  );
}