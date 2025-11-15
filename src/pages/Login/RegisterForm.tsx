import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useAppTheme } from '../../context/useAppTheme';
import { themeClasses } from '../../utils/themeUtils';
import { cadastrarUsuario } from '../../services/authService';
import type { ICadastroRequest } from '../../types/usuarioType';

const registerSchema = z.object({
  nome: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres.'),
  cpf: z.string().length(11, 'CPF deve conter exatamente 11 dígitos.'),
  email: z.string().email('Formato de e-mail inválido.'),
  telefone: z.string().min(10, 'Telefone deve ter no mínimo 10 dígitos.'),
  dtNascimento: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Use o formato AAAA-MM-DD'),
  senha: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres.'),
});

type RegisterFormData = z.infer<typeof registerSchema>;

interface RegisterFormProps {
  onToggleView: () => void;
}

export function RegisterForm({ onToggleView }: RegisterFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const { darkActive } = useAppTheme();

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      nome: '',
      cpf: '',
      email: '',
      telefone: '',
      dtNascimento: '',
      senha: '',
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setApiError(null);

    try {
      await cadastrarUsuario(data as ICadastroRequest);

      console.log('Cadastro realizado! Voltando para o login.');
      onToggleView(); 

    } catch (error: any)
    {
      console.error('Erro no cadastro:', error);
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
          Criar nova conta
        </h2>
        <p className={`
          mt-1 transition-colors duration-300
          ${themeClasses.textMuted(darkActive)}
        `}>
          Preencha seus dados para se registrar.
        </p>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4 max-h-[60vh] overflow-y-auto px-6 py-2">
          {apiError && (
            <p className="text-sm font-medium text-red-600 text-center">
              {apiError}
            </p>
          )}

          <div className="space-y-2">
            <label htmlFor="nome" className={`block text-sm font-medium ${themeClasses.text(darkActive)}`}>
              Nome Completo
            </label>
            <input
              id="nome"
              type="text"
              placeholder="Seu nome"
              className={themeClasses.input(darkActive, !!errors.nome)}
              {...register("nome")}
            />
            {errors.nome && <p className="text-sm font-medium text-red-600">{errors.nome.message}</p>}
          </div>
          <div className="space-y-2">
            <label htmlFor="cpf" className={`block text-sm font-medium ${themeClasses.text(darkActive)}`}>
              CPF
            </label>
            <input
              id="cpf"
              type="text"
              placeholder="Apenas números"
              className={themeClasses.input(darkActive, !!errors.cpf)}
              {...register("cpf")}
            />
            {errors.cpf && <p className="text-sm font-medium text-red-600">{errors.cpf.message}</p>}
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className={`block text-sm font-medium ${themeClasses.text(darkActive)}`}>
              E-mail
            </label>
            <input
              id="email"
              type="email"
              placeholder="seu.email@exemplo.com"
              className={themeClasses.input(darkActive, !!errors.email)}
              {...register("email")}
            />
            {errors.email && <p className="text-sm font-medium text-red-600">{errors.email.message}</p>}
          </div>
          <div className="space-y-2">
            <label htmlFor="telefone" className={`block text-sm font-medium ${themeClasses.text(darkActive)}`}>
              Telefone
            </label>
            <input
              id="telefone"
              type="tel"
              placeholder="11912345678"
              className={themeClasses.input(darkActive, !!errors.telefone)}
              {...register("telefone")}
            />
            {errors.telefone && <p className="text-sm font-medium text-red-600">{errors.telefone.message}</p>}
          </div>
          <div className="space-y-2">
            <label htmlFor="dtNascimento" className={`block text-sm font-medium ${themeClasses.text(darkActive)}`}>
              Data de Nascimento
            </label>
            <input
              id="dtNascimento"
              type="date"
              className={themeClasses.input(darkActive, !!errors.dtNascimento)}
              {...register("dtNascimento")}
            />
            {errors.dtNascimento && <p className="text-sm font-medium text-red-600">{errors.dtNascimento.message}</p>}
          </div>
          <div className="space-y-2">
            <label htmlFor="senha" className={`block text-sm font-medium ${themeClasses.text(darkActive)}`}>
              Senha
            </label>
            <input
              id="senha"
              type="password"
              placeholder="Mínimo 6 caracteres"
              className={themeClasses.input(darkActive, !!errors.senha)}
              {...register("senha")}
            />
            {errors.senha && <p className="text-sm font-medium text-red-600">{errors.senha.message}</p>}
          </div>
        </div>
        <div className="p-6 pt-6 flex flex-col gap-4">
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
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Finalizar Cadastro'}
          </button>
          
          <button 
            type="button" 
            onClick={onToggleView} 
            className="font-normal text-blue-600 hover:text-blue-700 text-sm"
          >
            Já tenho uma conta. Fazer login
          </button>
        </div>
      </form>
    </div>
  );
}