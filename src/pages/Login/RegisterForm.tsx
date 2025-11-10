import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

const registerSchema = z.object({
  nome: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres.'),
  cpf: z.string().length(11, 'CPF deve conter exatamente 11 dígitos.'),
  email: z.string().email('Formato de e-mail inválido.'),
  telefone: z.string().min(10, 'Telefone deve ter no mínimo 10 dígitos.'),
  dataNascimento: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Use o formato AAAA-MM-DD'),
  senha: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres.'),
  codigoEquipe: z.string().optional(),
});

type RegisterSchema = z.infer<typeof registerSchema>;

interface RegisterFormProps {
  onToggleView: () => void;
}

export function RegisterForm({ onToggleView }: RegisterFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      nome: '',
      cpf: '',
      email: '',
      telefone: '',
      dataNascimento: '',
      senha: '',
      codigoEquipe: '',
    },
  });
  const onSubmit = async (data: RegisterSchema) => {
    setIsLoading(true);
    console.log('Dados do Cadastro (Visual):', data);

    await new Promise(resolve => setTimeout(resolve, 1500));

    console.log('Simulação: Cadastro realizado! Voltando para o login.');
    setIsLoading(false);
    onToggleView(); 
  };
  const inputClass = (hasError: boolean) => `
    flex h-10 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm 
    placeholder:text-neutral-500 
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
    ${hasError ? 'border-red-500 ring-red-500' : ''}
  `;

  return (
    <div className="bg-white rounded-xl shadow-lg border border-neutral-200">
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-neutral-900">Criar nova conta</h2>
        <p className="text-neutral-600 mt-1">
          Preencha seus dados para se registrar.
        </p>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4 max-h-[60vh] overflow-y-auto px-6 py-2">
          <div className="space-y-2">
            <label htmlFor="nome" className="block text-sm font-medium text-neutral-700">Nome Completo</label>
            <input
              id="nome"
              type="text"
              placeholder="Seu nome"
              className={inputClass(!!errors.nome)}
              {...register("nome")}
            />
            {errors.nome && <p className="text-sm font-medium text-red-600">{errors.nome.message}</p>}
          </div>
          <div className="space-y-2">
            <label htmlFor="cpf" className="block text-sm font-medium text-neutral-700">CPF</label>
            <input
              id="cpf"
              type="text"
              placeholder="Apenas números"
              className={inputClass(!!errors.cpf)}
              {...register("cpf")}
            />
            {errors.cpf && <p className="text-sm font-medium text-red-600">{errors.cpf.message}</p>}
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-neutral-700">E-mail</label>
            <input
              id="email"
              type="email"
              placeholder="seu.email@exemplo.com"
              className={inputClass(!!errors.email)}
              {...register("email")}
            />
            {errors.email && <p className="text-sm font-medium text-red-600">{errors.email.message}</p>}
          </div>
          <div className="space-y-2">
            <label htmlFor="telefone" className="block text-sm font-medium text-neutral-700">Telefone</label>
            <input
              id="telefone"
              type="tel"
              placeholder="11912345678"
              className={inputClass(!!errors.telefone)}
              {...register("telefone")}
            />
            {errors.telefone && <p className="text-sm font-medium text-red-600">{errors.telefone.message}</p>}
          </div>
          <div className="space-y-2">
            <label htmlFor="dataNascimento" className="block text-sm font-medium text-neutral-700">Data de Nascimento</label>
            <input
              id="dataNascimento"
              type="date"
              className={inputClass(!!errors.dataNascimento)}
              {...register("dataNascimento")}
            />
            {errors.dataNascimento && <p className="text-sm font-medium text-red-600">{errors.dataNascimento.message}</p>}
          </div>
          <div className="space-y-2">
            <label htmlFor="senha" className="block text-sm font-medium text-neutral-700">Senha</label>
            <input
              id="senha"
              type="password"
              placeholder="Mínimo 6 caracteres"
              className={inputClass(!!errors.senha)}
              {...register("senha")}
            />
            {errors.senha && <p className="text-sm font-medium text-red-600">{errors.senha.message}</p>}
          </div>
          <div className="space-y-2">
            <label htmlFor="codigoEquipe" className="block text-sm font-medium text-neutral-700">Código da Equipe (Opcional)</label>
            <input
              id="codigoEquipe"
              type="text"
              placeholder="Ex: A4B9K"
              className={inputClass(!!errors.codigoEquipe)}
              {...register("codigoEquipe")}
            />
            <p className="text-sm text-neutral-600">
              Se você vai criar uma equipe, deixe em branco.
            </p>
            {errors.codigoEquipe && <p className="text-sm font-medium text-red-600">{errors.codigoEquipe.message}</p>}
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