import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  getCategoriasPorUsuario, 
  createCategoria, 
  updateCategoria, 
  deleteCategoria 
} from '../../services/categoriaService';
import type { ICategoria } from '../../types/categoriaType'; 
import { FaPlus, FaTrash, FaPencilAlt, FaTimes } from 'react-icons/fa';
import { Loader2 } from 'lucide-react';
import { useAppTheme } from '../../context/useAppTheme';
import { themeClasses } from '../../utils/themeUtils';

const CategoriasPage = () => {
  const { user } = useAuth(); 
  const { darkActive } = useAppTheme(); 

  const [categorias, setCategorias] = useState<ICategoria[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [novoNome, setNovoNome] = useState('');
  const [novaCor, setNovaCor] = useState('#60A5FA');

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [categoriaEmEdicao, setCategoriaEmEdicao] = useState<ICategoria | null>(null);
  const [editNome, setEditNome] = useState('');
  const [editCor, setEditCor] = useState('');

  useEffect(() => {
    const carregarCategorias = async () => {
      if (!user) return; 
      setIsLoading(true);
      try {
        const dados = await getCategoriasPorUsuario(user.idUsuario);
        setCategorias(dados);
      } catch (err: any) {
        setError(err.message || 'Falha ao buscar categorias.');
      } finally {
        setIsLoading(false);
      }
    };
    carregarCategorias();
  }, [user]); 

  const handleCriarCategoria = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !novoNome) return;
    try {
      const payload = {
        nome: novoNome,
        corHex: novaCor,
        idUsuario: user.idUsuario,
      };
      const novaCategoria = await createCategoria(payload);
      setCategorias([...categorias, novaCategoria]);
      setNovoNome(''); 
      setNovaCor('#60A5FA');
    } catch (err: any) {
      setError(err.message || 'Erro ao criar categoria.');
    }
  };

  const abrirModalEdicao = (categoria: ICategoria) => {
    setCategoriaEmEdicao(categoria);
    setEditNome(categoria.nome);
    setEditCor(categoria.corHex); 
    setIsEditModalOpen(true);
  };

  const fecharModalEdicao = () => {
    setIsEditModalOpen(false);
    setCategoriaEmEdicao(null);
  };

  const handleAtualizarCategoria = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoriaEmEdicao || !user) return;

    try {
      const payload = {
        nome: editNome,
        corHex: editCor,
        idUsuario: user.idUsuario,
      };
      
      const categoriaAtualizada = await updateCategoria(categoriaEmEdicao.idCategoria, payload);
      
      setCategorias(categorias.map(c => 
        c.idCategoria === categoriaAtualizada.idCategoria ? categoriaAtualizada : c
      ));
      
      fecharModalEdicao();
    } catch (err: any) {
      setError(err.message || 'Erro ao atualizar categoria.');
    }
  };

  const handleExcluirCategoria = async (idCategoria: number) => {
    if (!window.confirm("Tem certeza que deseja excluir esta categoria?")) {
      return;
    }
    
    try {
      await deleteCategoria(idCategoria);
      setCategorias(categorias.filter(c => c.idCategoria !== idCategoria));
    } catch (err: any) {
      setError(err.message || 'Erro ao excluir categoria.');
    }
  };

  if (isLoading) {
    return (
      <div className={`container mx-auto p-4 text-center ${themeClasses.text(darkActive)} ${themeClasses.bg(darkActive)} min-h-screen`}>
        <Loader2 className="w-8 h-8 animate-spin inline-block" />
        <p>Carregando categorias...</p>
      </div>
    );
  }

  if (error) {
    return <div className="container mx-auto p-4 text-center text-red-500">{error}</div>;
  }

  return (
    <div className={`container mx-auto p-4 md:p-8 ${themeClasses.text(darkActive)} ${themeClasses.bg(darkActive)} min-h-screen`}>
      <h1 className="text-3xl font-bold mb-6">Minhas Categorias</h1>

      <form 
        onSubmit={handleCriarCategoria} 
        className={`
          mb-8 p-4 rounded-lg flex flex-col md:flex-row gap-4 items-stretch md:items-end
          ${themeClasses.bg(darkActive)} 
          ${themeClasses.border(darkActive)}
          ${themeClasses.shadow(darkActive)}
        `}
      >
        <div className="flex-1">
          <label htmlFor="nome-categoria" className="block text-sm font-medium mb-1">
            Nome da Categoria
          </label>
          <input 
            id="nome-categoria"
            type="text"
            value={novoNome}
            onChange={(e) => setNovoNome(e.target.value)}
            placeholder="Ex: Trabalho, Pessoal..."
            className={themeClasses.input(darkActive)}
          />
        </div>
        
        <div>
          <label htmlFor="cor-categoria" className="block text-sm font-medium mb-1">
            Cor
          </label>
          <input 
            id="cor-categoria"
            type="color"
            value={novaCor}
            onChange={(e) => setNovaCor(e.target.value)}
            className={`
              h-10 w-16 md:w-24 p-1 rounded-md cursor-pointer
              ${themeClasses.border(darkActive)}
              ${darkActive ? 'bg-gray-700' : 'bg-white'}
            `}
          />
        </div>

        <button 
          type="submit" 
          className={`
            flex items-center justify-center gap-2 px-4 py-2 text-sm h-10 rounded-md
            ${themeClasses.btnPrimary(darkActive)}
          `}
        >
          <FaPlus />
          Criar
        </button>
      </form>

      {categorias.length === 0 ? (
        <p className={themeClasses.textMuted(darkActive)}>
          Você ainda não criou nenhuma categoria.
        </p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categorias.map((cat) => (
            <li 
              key={cat.idCategoria} 
              className={`
                p-4 rounded-lg flex justify-between items-center
                ${themeClasses.bg(darkActive)}
                ${themeClasses.border(darkActive)}
                ${themeClasses.shadow(darkActive)}
              `}
              style={{ borderLeftColor: cat.corHex, borderLeftWidth: '6px' }}
            >
              <span className="text-lg font-medium">{cat.nome}</span>
              <div className="flex gap-3">
                <button 
                  onClick={() => abrirModalEdicao(cat)}
                  className="p-2 text-blue-500 hover:text-blue-700" 
                  title="Editar"
                >
                  <FaPencilAlt />
                </button>
                <button 
                  onClick={() => handleExcluirCategoria(cat.idCategoria)}
                  className="p-2 text-red-500 hover:text-red-700" 
                  title="Excluir"
                >
                  <FaTrash />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {isEditModalOpen && categoriaEmEdicao && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className={`
            p-6 rounded-lg w-full max-w-md
            ${themeClasses.bg(darkActive)}
            ${themeClasses.shadow(darkActive)}
            ${themeClasses.border(darkActive)}
          `}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Editar Categoria</h2>
              <button 
                onClick={fecharModalEdicao} 
                className={`p-2 rounded-full ${darkActive ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
              >
                <FaTimes />
              </button>
            </div>
            
            <form onSubmit={handleAtualizarCategoria}>
              <div className="space-y-4">
                <div className="flex-1">
                  <label htmlFor="edit-nome-categoria" className="block text-sm font-medium mb-1">
                    Nome da Categoria
                  </label>
                  <input 
                    id="edit-nome-categoria"
                    type="text"
                    value={editNome}
                    onChange={(e) => setEditNome(e.target.value)}
                    className={themeClasses.input(darkActive)} 
                  />
                </div>
                <div>
                  <label htmlFor="edit-cor-categoria" className="block text-sm font-medium mb-1">
                    Cor
                  </label>
                  <input 
                    id="edit-cor-categoria"
                    type="color"
                    value={editCor}
                    onChange={(e) => setEditCor(e.target.value)}
                    className={`
                      h-10 w-full p-1 rounded-md cursor-pointer
                      ${themeClasses.border(darkActive)}
                      ${darkActive ? 'bg-gray-700' : 'bg-white'}
                    `}
                  />
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <button 
                    type="button" 
                    onClick={fecharModalEdicao}
                    className={`px-4 py-2 text-sm rounded-md ${themeClasses.btnSecondary(darkActive)}`}
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit" 
                    className={`flex items-center justify-center gap-2 px-4 py-2 text-sm rounded-md ${themeClasses.btnPrimary(darkActive)}`}
                  >
                    Salvar Mudanças
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriasPage;