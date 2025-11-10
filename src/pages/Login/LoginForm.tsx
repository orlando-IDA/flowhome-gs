import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; 

const loginSchema = z.object({
  cpf: z.string().length(11, 'CPF deve conter exatamente 11 dígitos.'),
  senha: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres.'),
});

type LoginSchema = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onToggleView: () => void;
}

export function LoginForm({ onToggleView }: LoginFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); 
  const { register, handleSubmit, formState: { errors } } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      cpf: '',
      senha: '',
    },
  });

  const onSubmit = async (data: LoginSchema) => {
    setIsLoading(true);
    console.log('Dados do Login (Apenas Validação):', data);
    await new Promise(resolve => setTimeout(resolve, 500));
    navigate('/');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-neutral-200">
      
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-neutral-900">Acessar Plataforma</h2>
        <p className="text-neutral-600 mt-1">
          Insira seu CPF e senha para continuar.
        </p>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-6 pt-0 space-y-4">
          <div className="space-y-2">
            <label 
              htmlFor="cpf" 
              className="block text-sm font-medium text-neutral-700"
            >
              CPF
            </label>
            <input
              id="cpf"
              type="text"
              placeholder="000.000.000-00"
              className={`
                flex h-10 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm 
                placeholder:text-neutral-500 
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
                ${errors.cpf ? 'border-red-500 ring-red-500' : ''}
              `}
              {...register("cpf")}
            />
            {errors.cpf && (
              <p className="text-sm font-medium text-red-600">
                {errors.cpf.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label 
              htmlFor="senha" 
              className="block text-sm font-medium text-neutral-700"
            >
              Senha
            </label>
            <input
              id="senha"
              type="password"
              placeholder="••••••••"
              className={`
                flex h-10 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm 
                placeholder:text-neutral-500 
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
                ${errors.senha ? 'border-red-500 ring-red-500' : ''}
              `}
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