import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useAppTheme } from '../../context/useAppTheme';
import { themeClasses } from '../../utils/themeUtils';
import { getTarefasPorUsuario, createTarefa, updateTarefa, deleteTarefa } from '../../services/tarefaService';
import { getCategoriasPorUsuario } from '../../services/categoriaService';
import type { ITarefa, ITarefaUpdate, StatusTarefa } from '../../types/tarefaType';
import type { ICategoria } from '../../types/categoriaType';
import { Loader2 } from 'lucide-react';
import { FaPlus, FaTrash, FaPencilAlt, FaTimes } from 'react-icons/fa';

const formatarDataParaInput = (dataString?: string | null) => {
  if (!dataString) return '';
  try {
    return new Date(dataString).toISOString().split('T')[0];
  } catch (e) {
    return '';
  }
};

const TarefasPage = () => {
  const { user } = useAuth();
  const { darkActive } = useAppTheme();

  const [tarefas, setTarefas] = useState<ITarefa[]>([]);
  const [categorias, setCategorias] = useState<ICategoria[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [novoTitulo, setNovoTitulo] = useState('');
  const [novaDescricao, setNovaDescricao] = useState('');
  const [novaCategoriaId, setNovaCategoriaId] = useState<string>('');
  const [novaDataVencimento, setNovaDataVencimento] = useState('');
  const [novoTempoEstimado, setNovoTempoEstimado] = useState('');

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [tarefaEmEdicao, setTarefaEmEdicao] = useState<ITarefa | null>(null);
  const [editForm, setEditForm] = useState<Partial<ITarefaUpdate>>({});

  useEffect(() => {
    const carregarDados = async () => {
      if (!user) return;
      setIsLoading(true);
      setError(null);
      
      try {
        const [dadosTarefas, dadosCategorias] = await Promise.all([
          getTarefasPorUsuario(user.idUsuario),
          getCategoriasPorUsuario(user.idUsuario)
        ]);
        
        setTarefas(dadosTarefas);
        setCategorias(dadosCategorias);

        if (dadosCategorias.length > 0) {
          setNovaCategoriaId(dadosCategorias[0].idCategoria.toString());
        }
        
      } catch (err: any) {
        setError(err.message || 'Falha ao buscar dados.');
      } finally {
        setIsLoading(false);
      }
    };
    carregarDados();
  }, [user]);

  const handleCriarTarefa = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !novoTitulo || !novaCategoriaId) {
      setError("Título e Categoria são obrigatórios.");
      return;
    }
    setError(null);

    try {
      const payload = {
        titulo: novoTitulo,
        descricao: novaDescricao || null,
        idCategoria: parseInt(novaCategoriaId),
        dtVencimento: novaDataVencimento || null,
        tempoEstimadoH: novoTempoEstimado ? parseFloat(novoTempoEstimado) : null,
        idUsuario: user.idUsuario
      };
      
      const novaTarefa = await createTarefa(payload);
      setTarefas([novaTarefa, ...tarefas]);
      
      setNovoTitulo('');
      setNovaDescricao('');
      setNovaDataVencimento('');
      setNovoTempoEstimado('');
      
    } catch (err: any) {
      setError(err.message || 'Erro ao criar tarefa.');
    }
  };

  const abrirModalEdicao = (tarefa: ITarefa) => {
    setTarefaEmEdicao(tarefa);
    setEditForm({
      titulo: tarefa.titulo,
      descricao: tarefa.descricao,
      idCategoria: tarefa.idCategoria,
      dtVencimento: formatarDataParaInput(tarefa.dtVencimento),
      tempoEstimadoH: tarefa.tempoEstimadoH,
      status: tarefa.status,
    });
    setIsEditModalOpen(true);
  };

  const fecharModalEdicao = () => {
    setIsEditModalOpen(false);
    setTarefaEmEdicao(null);
    setEditForm({});
  };

  const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const handleAtualizarTarefa = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tarefaEmEdicao || !editForm.titulo || !editForm.idCategoria || !editForm.status) {
      return;
    }

    try {
      const payload: ITarefaUpdate = {
        titulo: editForm.titulo,
        descricao: editForm.descricao || null,
        idCategoria: Number(editForm.idCategoria),
        dtVencimento: editForm.dtVencimento || null,
        tempoEstimadoH: editForm.tempoEstimadoH ? Number(editForm.tempoEstimadoH) : null,
        status: editForm.status as StatusTarefa,
      };

      const tarefaAtualizada = await updateTarefa(tarefaEmEdicao.idTarefa, payload);
      
      setTarefas(tarefas.map(t => 
        t.idTarefa === tarefaAtualizada.idTarefa ? tarefaAtualizada : t
      ));
      
      fecharModalEdicao();
    } catch (err: any) {
      setError(err.message || 'Erro ao atualizar tarefa.');
    }
  };

  const handleExcluirTarefa = async (idTarefa: number) => {
    if (!window.confirm("Tem certeza que deseja excluir esta tarefa?")) {
      return;
    }
    
    try {
      await deleteTarefa(idTarefa);
      setTarefas(tarefas.filter(t => t.idTarefa !== idTarefa));
    } catch (err: any) {
      setError(err.message || 'Erro ao excluir tarefa.');
    }
  };

  if (isLoading) {
    return (
      <div className={`flex flex-col items-center justify-center p-8 ${themeClasses.bg(darkActive)} ${themeClasses.text(darkActive)}`}>
        <Loader2 className="w-8 h-8 animate-spin mb-2" />
        <p>Carregando tarefas...</p>
      </div>
    );
  }

  return (
    <div className={`p-4 md:p-8 ${themeClasses.bg(darkActive)} ${themeClasses.text(darkActive)}`}>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 md:mb-8">Minhas Tarefas</h1>
        
        <form 
          onSubmit={handleCriarTarefa}
          className={`mb-8 p-4 md:p-6 rounded-lg ${darkActive ? 'bg-gray-800' : 'bg-gray-50'} border ${themeClasses.border(darkActive)} shadow-sm`}
        >
          <h2 className="text-xl font-semibold mb-4">Nova Tarefa</h2>
          
          {error && <p className="text-red-500 text-sm mb-4 p-2 rounded bg-red-500/10">{error}</p>}
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="titulo" className="block text-sm font-medium mb-2">Título*</label>
                <input 
                  id="titulo"
                  type="text"
                  value={novoTitulo}
                  onChange={(e) => setNovoTitulo(e.target.value)}
                  className={themeClasses.input(darkActive)}
                  placeholder="Digite o título da tarefa"
                />
              </div>
              <div>
                <label htmlFor="categoria" className="block text-sm font-medium mb-2">Categoria*</label>
                <select 
                  id="categoria"
                  value={novaCategoriaId}
                  onChange={(e) => setNovaCategoriaId(e.target.value)}
                  className={themeClasses.input(darkActive)}
                >
                  {categorias.map(cat => (
                    <option key={cat.idCategoria} value={cat.idCategoria}>
                      {cat.nome}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label htmlFor="data_vencimento" className="block text-sm font-medium mb-2">Data de Vencimento</label>
                <input 
                  id="data_vencimento"
                  type="date"
                  value={novaDataVencimento}
                  onChange={(e) => setNovaDataVencimento(e.target.value)}
                  className={themeClasses.input(darkActive)}
                />
              </div>
              <div>
                <label htmlFor="tempo_estimado" className="block text-sm font-medium mb-2">Tempo Estimado (horas)</label>
                <input 
                  id="tempo_estimado"
                  type="number"
                  step="0.5"
                  min="0"
                  value={novoTempoEstimado}
                  onChange={(e) => setNovoTempoEstimado(e.target.value)}
                  placeholder="Ex: 1.5"
                  className={themeClasses.input(darkActive)}
                />
              </div>
            </div>
            <div className="lg:col-span-2">
              <label htmlFor="descricao" className="block text-sm font-medium mb-2">Descrição</label>
              <textarea
                id="descricao"
                value={novaDescricao}
                onChange={(e) => setNovaDescricao(e.target.value)}
                rows={3}
                className={themeClasses.input(darkActive).replace('h-10', '')}
                placeholder="Digite a descrição da tarefa"
              />
            </div>
          </div>
          <button 
            type="submit" 
            className={`flex items-center justify-center gap-2 px-6 py-3 mt-6 rounded-lg font-medium transition-colors ${themeClasses.btnPrimary(darkActive)}`}
          >
            <FaPlus className="w-4 h-4" />
            Criar Tarefa
          </button>
        </form>

        {tarefas.length === 0 ? (
          <div className={`text-center py-12 rounded-lg ${darkActive ? 'bg-gray-800' : 'bg-gray-50'}`}>
            <p className={`text-lg ${themeClasses.textMuted(darkActive)}`}>
              Você ainda não tem nenhuma tarefa.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:gap-6">
            {tarefas.map((tarefa) => (
              <div
                key={tarefa.idTarefa}
                className={`p-4 md:p-6 rounded-lg border transition-all hover:shadow-lg ${
                  darkActive 
                    ? 'bg-gray-800 hover:border-gray-600' 
                    : 'bg-white hover:border-gray-300'
                } ${themeClasses.border(darkActive)}`}
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold">{tarefa.titulo}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        tarefa.status === 'Concluída' 
                          ? 'bg-green-500/20 text-green-600'
                          : tarefa.status === 'Em Andamento'
                          ? 'bg-yellow-500/20 text-yellow-600'
                          : 'bg-gray-500/20 text-gray-600'
                      }`}>
                        {tarefa.status}
                      </span>
                    </div>
                    
                    {tarefa.descricao && (
                      <p className={`mb-3 ${themeClasses.textMuted(darkActive)}`}>{tarefa.descricao}</p>
                    )}
                    
                    <div className={`flex flex-wrap gap-4 text-sm ${themeClasses.textMuted(darkActive)}`}>
                      {tarefa.dtVencimento && (
                        <span>Vencimento: {new Date(tarefa.dtVencimento).toLocaleDateString('pt-BR')}</span>
                      )}
                      {tarefa.tempoEstimadoH && (
                        <span>Tempo estimado: {tarefa.tempoEstimadoH}h</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-2 sm:flex-col sm:gap-1">
                    <button 
                      onClick={() => abrirModalEdicao(tarefa)}
                      className="p-2 rounded-lg bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 transition-colors"
                      title="Editar"
                    >
                      <FaPencilAlt className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleExcluirTarefa(tarefa.idTarefa)}
                      className="p-2 rounded-lg bg-red-500/10 text-red-600 hover:bg-red-500/20 transition-colors"
                      title="Excluir"
                    >
                      <FaTrash className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {isEditModalOpen && tarefaEmEdicao && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className={`w-full max-w-2xl rounded-xl shadow-2xl max-h-[95vh] overflow-hidden flex flex-col ${
              darkActive ? 'bg-gray-800' : 'bg-white'
            }`}>
              <div className={`shrink-0 flex justify-between items-center p-6 border-b ${themeClasses.border(darkActive)}`}>
                <h2 className="text-2xl font-bold">Editar Tarefa</h2>
                <button 
                  type="button"
                  onClick={fecharModalEdicao} 
                  className={`p-2 rounded-full transition-colors ${
                    darkActive ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
                  }`}
                >
                  <FaTimes className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto">
                <form onSubmit={handleAtualizarTarefa} className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div className="md:col-span-2">
                      <label htmlFor="edit_titulo" className="block text-sm font-medium mb-2">Título*</label>
                      <input 
                        id="edit_titulo"
                        name="titulo"
                        type="text"
                        value={editForm.titulo || ''}
                        onChange={handleEditFormChange}
                        className={themeClasses.input(darkActive)}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="edit_categoria" className="block text-sm font-medium mb-2">Categoria*</label>
                      <select 
                        id="edit_categoria"
                        name="idCategoria"
                        value={editForm.idCategoria || ''}
                        onChange={handleEditFormChange}
                        className={themeClasses.input(darkActive)}
                      >
                        {categorias.map(cat => (
                          <option key={cat.idCategoria} value={cat.idCategoria}>
                            {cat.nome}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="edit_status" className="block text-sm font-medium mb-2">Status*</label>
                      <select 
                        id="edit_status"
                        name="status"
                        value={editForm.status || 'Pendente'}
                        onChange={handleEditFormChange}
                        className={themeClasses.input(darkActive)}
                      >
                        <option value="Pendente">Pendente</option>
                        <option value="Em Andamento">Em Andamento</option>
                        <option value="Concluída">Concluída</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="edit_data_vencimento" className="block text-sm font-medium mb-2">Data de Vencimento</label>
                      <input 
                        id="edit_data_vencimento"
                        name="dtVencimento"
                        type="date"
                        value={editForm.dtVencimento || ''}
                        onChange={handleEditFormChange}
                        className={themeClasses.input(darkActive)}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="edit_tempo_estimado" className="block text-sm font-medium mb-2">Tempo Estimado (horas)</label>
                      <input 
                        id="edit_tempo_estimado"
                        name="tempoEstimadoH"
                        type="number"
                        step="0.5"
                        min="0"
                        value={editForm.tempoEstimadoH || ''}
                        onChange={handleEditFormChange}
                        placeholder="Ex: 1.5"
                        className={themeClasses.input(darkActive)}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="edit_descricao" className="block text-sm font-medium mb-2">Descrição</label>
                      <textarea
                        id="edit_descricao"
                        name="descricao"
                        value={editForm.descricao || ''}
                        onChange={handleEditFormChange}
                        rows={4}
                        className={themeClasses.input(darkActive).replace('h-10', '')}
                      />
                    </div>
                  </div>

                  <div className={`flex flex-col sm:flex-row justify-end gap-3 pt-6 mt-4 border-t ${themeClasses.border(darkActive)}`}>
                    <button 
                      type="button" 
                      onClick={fecharModalEdicao}
                      className={`px-6 py-3 rounded-lg font-medium transition-colors ${themeClasses.btnSecondary(darkActive)}`}
                    >
                      Cancelar
                    </button>
                    <button 
                      type="submit" 
                      className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${themeClasses.btnPrimary(darkActive)}`}
                    >
                      Salvar Alterações
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TarefasPage;