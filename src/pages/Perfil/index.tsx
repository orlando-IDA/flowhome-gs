import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useAppTheme } from '../../context/useAppTheme';
import { themeClasses } from '../../utils/themeUtils';
import { updateUsuario, deleteUsuario } from '../../services/authService';
import type { IUserResponse } from '../../types/usuarioType'; 
import { Loader2, Trash2 } from 'lucide-react';
import { formatCPF, formatPhone, removeMask } from '../../utils/maskUtils';

const formatarDataParaInput = (dataString?: string | null) => {
  if (!dataString) return '';
  try {
    return new Date(dataString).toISOString().split('T')[0];
  } catch (e) {
    return '';
  }
};

const PerfilPage = () => {
  const { user, reloadUser, logout } = useAuth();
  const { darkActive } = useAppTheme();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: user?.nome || '',
    email: user?.email || '',
    cpf: user?.cpf || '',
    telefone: user?.telefone || '',
    dtNascimento: formatarDataParaInput(user?.dtNascimento),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = removeMask(e.target.value);
    const formattedValue = formatCPF(rawValue);
    
    e.target.value = formattedValue;
    setFormData(prev => ({ ...prev, cpf: rawValue.slice(0, 11) }));
  };

  const handleTelefoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = removeMask(e.target.value);
    const formattedValue = formatPhone(rawValue);
    
    e.target.value = formattedValue;
    setFormData(prev => ({ ...prev, telefone: rawValue.slice(0, 11) }));
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    
    const payload: IUserResponse = {
      ...user, 
      ...formData, 
      dtNascimento: formData.dtNascimento || null,
    };

    try {
      await updateUsuario(user.idUsuario, payload); 
      await reloadUser(user.idUsuario);
      setSuccess("Perfil atualizado com sucesso!");
    } catch (err: any) {
      setError(err.message || "Falha ao atualizar o perfil.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!user) return;

    const confirmDelete = window.confirm(
      "TEM CERTEZA?\nEsta ação é irreversível e irá apagar sua conta e todos os seus dados permanentemente."
    );

    if (confirmDelete) {
      setIsLoading(true);
      setError(null);
      try {
        await deleteUsuario(user.idUsuario);
        logout();
        navigate('/cadastro');
      } catch (err: any) {
        setError(err.message || "Falha ao deletar a conta.");
        setIsLoading(false);
      }
    }
  };

  if (!user) {
    return (
      <main className={`flex items-center justify-center p-8 ${themeClasses.bg(darkActive)} ${themeClasses.text(darkActive)} min-h-screen`}>
        <p>Carregando dados do usuário...</p>
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
            Meu Perfil
          </h1>
        </div>

        {error && (
          <div className="mb-4 max-w-2xl mx-auto p-4 text-center rounded-lg border bg-red-50 border-red-200">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}
        {success && (
          <div className="mb-4 max-w-2xl mx-auto p-4 text-center rounded-lg border bg-green-50 border-green-200">
            <p className="text-green-600 text-sm">{success}</p>
          </div>
        )}

        <div className={`
          p-6 md:p-8 rounded-xl border max-w-2xl mx-auto
          ${themeClasses.bg(darkActive)}
          ${themeClasses.border(darkActive)}
          ${themeClasses.shadow(darkActive)}
        `}>
          
          <form onSubmit={handleUpdate} className="space-y-4">
            <h2 className="text-2xl font-semibold mb-4">Meus Dados</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="nome" className="block text-sm font-medium mb-1">Nome Completo</label>
                <input
                  id="nome"
                  name="nome"
                  type="text"
                  value={formData.nome}
                  onChange={handleChange}
                  className={themeClasses.input(darkActive)}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={themeClasses.input(darkActive)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="cpf" className="block text-sm font-medium mb-1">CPF</label>
                <input
                  id="cpf"
                  name="cpf"
                  type="text"
                  value={formatCPF(formData.cpf || '')}
                  onChange={handleCpfChange}
                  className={themeClasses.input(darkActive)}
                  maxLength={14}
                />
              </div>
              <div>
                <label htmlFor="telefone" className="block text-sm font-medium mb-1">Telefone</label>
                <input
                  id="telefone"
                  name="telefone"
                  type="text"
                  value={formatPhone(formData.telefone || '')}
                  onChange={handleTelefoneChange}
                  className={themeClasses.input(darkActive)}
                  maxLength={15}
                />
              </div>
            </div>

            <div>
              <label htmlFor="dtNascimento" className="block text-sm font-medium mb-1">Data de Nascimento</label>
              <input
                id="dtNascimento"
                name="dtNascimento"
                type="date"
                value={formData.dtNascimento}
                onChange={handleChange}
                className={themeClasses.input(darkActive)}
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full ${themeClasses.btnPrimary(darkActive)} py-3 rounded-lg font-medium flex items-center justify-center gap-2`}
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Salvar Alterações"}
            </button>
          </form>

          <hr className={`my-8 ${themeClasses.border(darkActive)}`} />

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-red-500">Cuidado!!!</h2>
            <p className={`${themeClasses.textMuted(darkActive)} text-sm`}>
              Esta ação não pode ser desfeita. Isso excluirá permanentemente sua conta
              e todos os seus dados (tarefas, equipes, etc).
            </p>
            <button
              onClick={handleDelete}
              disabled={isLoading}
              className="w-full bg-red-600 text-white hover:bg-red-700 disabled:bg-red-400 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Trash2 className="w-5 h-5" />}
              Excluir minha conta
            </button>
          </div>

        </div>
      </div>
    </main>
  );
};

export default PerfilPage;