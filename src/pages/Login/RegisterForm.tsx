import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useAppTheme } from '../../context/useAppTheme';
import { themeClasses } from '../../utils/themeUtils';
import { cadastrarUsuario } from '../../services/authService';
import type { ICadastroRequest } from '../../types/usuarioType';
import { formatCPF, formatPhone, removeMask, validateCPF, validatePhone } from '../../utils/maskUtils';

const registerSchema = z.object({
  nome: z.string()
    .min(3, 'Nome deve ter no mínimo 3 caracteres.')
    .max(100, 'Nome deve ter no máximo 100 caracteres.'),
  cpf: z.string()
    .length(11, 'CPF deve conter exatamente 11 dígitos.')
    .regex(/^\d{11}$/, 'CPF deve conter apenas números.')
    .refine(validateCPF, 'CPF inválido.'),
  email: z.string()
    .email('Formato de e-mail inválido.')
    .max(100, 'E-mail deve ter no máximo 100 caracteres.'),
  telefone: z.string()
    .min(10, 'Telefone deve ter no mínimo 10 dígitos.')
    .max(11, 'Telefone deve ter no máximo 11 dígitos.')
    .regex(/^\d+$/, 'Telefone deve conter apenas números.')
    .refine(validatePhone, 'Telefone inválido.'),
  dtNascimento: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Use o formato AAAA-MM-DD')
    .refine((date) => {
      const birthDate = new Date(date);
      const today = new Date();
      const minDate = new Date();
      minDate.setFullYear(today.getFullYear() - 120);
      return birthDate <= today && birthDate >= minDate;
    }, 'Data de nascimento inválida.'),
  senha: z.string()
    .min(6, 'Senha deve ter no mínimo 6 caracteres.')
    .max(50, 'Senha deve ter no máximo 50 caracteres.'),
});

type RegisterFormData = z.infer<typeof registerSchema>;

interface RegisterFormProps {
  onToggleView: () => void;
}

export function RegisterForm({ onToggleView }: RegisterFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const { darkActive } = useAppTheme();

  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    setValue,
    watch,
  } = useForm<RegisterFormData>({
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

  const cpfValue = watch('cpf');
  const telefoneValue = watch('telefone');

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = removeMask(e.target.value);
    const formattedValue = formatCPF(rawValue);
    
    e.target.value = formattedValue;
    
    setValue('cpf', rawValue.slice(0, 11), { shouldValidate: true });
  };

  const handleTelefoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = removeMask(e.target.value);
    const formattedValue = formatPhone(rawValue);
    
    e.target.value = formattedValue;
    
    setValue('telefone', rawValue.slice(0, 11), { shouldValidate: true });
  };

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setApiError(null);

    try {
      const submitData: ICadastroRequest = {
        ...data,
        cpf: removeMask(data.cpf),
        telefone: removeMask(data.telefone)
      };

      await cadastrarUsuario(submitData);

      console.log('Cadastro realizado! Voltando para o login.');
      onToggleView();

    } catch (error: any) {
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
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
              <p className="text-sm font-medium text-red-600 text-center">
                {apiError}
              </p>
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="nome" className={`block text-sm font-medium ${themeClasses.text(darkActive)}`}>
              Nome Completo *
            </label>
            <input
              id="nome"
              type="text"
              placeholder="Seu nome completo"
              className={themeClasses.input(darkActive, !!errors.nome)}
              {...register("nome")}
              maxLength={100}
            />
            {errors.nome && <p className="text-sm font-medium text-red-600">{errors.nome.message}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="cpf" className={`block text-sm font-medium ${themeClasses.text(darkActive)}`}>
              CPF *
            </label>
            <input
              id="cpf"
              type="text"
              placeholder="000.000.000-00"
              className={themeClasses.input(darkActive, !!errors.cpf)}
              onChange={handleCpfChange}
              defaultValue={formatCPF(cpfValue || '')}
              maxLength={14}
            />
            {errors.cpf && <p className="text-sm font-medium text-red-600">{errors.cpf.message}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className={`block text-sm font-medium ${themeClasses.text(darkActive)}`}>
              E-mail *
            </label>
            <input
              id="email"
              type="email"
              placeholder="seu.email@exemplo.com"
              className={themeClasses.input(darkActive, !!errors.email)}
              {...register("email")}
              maxLength={100}
            />
            {errors.email && <p className="text-sm font-medium text-red-600">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="telefone" className={`block text-sm font-medium ${themeClasses.text(darkActive)}`}>
              Telefone *
            </label>
            <input
              id="telefone"
              type="text"
              placeholder="(00) 00000-0000"
              className={themeClasses.input(darkActive, !!errors.telefone)}
              onChange={handleTelefoneChange}
              defaultValue={formatPhone(telefoneValue || '')}
              maxLength={15}
            />
            {errors.telefone && <p className="text-sm font-medium text-red-600">{errors.telefone.message}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="dtNascimento" className={`block text-sm font-medium ${themeClasses.text(darkActive)}`}>
              Data de Nascimento *
            </label>
            <input
              id="dtNascimento"
              type="date"
              className={themeClasses.input(darkActive, !!errors.dtNascimento)}
              {...register("dtNascimento")}
              max={new Date().toISOString().split('T')[0]}
            />
            {errors.dtNascimento && <p className="text-sm font-medium text-red-600">{errors.dtNascimento.message}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="senha" className={`block text-sm font-medium ${themeClasses.text(darkActive)}`}>
              Senha *
            </label>
            <input
              id="senha"
              type="password"
              placeholder="Mínimo 6 caracteres"
              className={themeClasses.input(darkActive, !!errors.senha)}
              {...register("senha")}
              maxLength={50}
            />
            {errors.senha && (
              <p className="text-sm font-medium text-red-600">
                {errors.senha.message}
              </p>
            )}
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
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Cadastrando...
              </>
            ) : (
              'Finalizar Cadastro'
            )}
          </button>
          
          <button 
            type="button" 
            onClick={onToggleView} 
            className="font-normal text-blue-600 hover:text-blue-700 text-sm transition-colors"
          >
            Já tenho uma conta. Fazer login
          </button>
        </div>
      </form>
    </div>
  );
}