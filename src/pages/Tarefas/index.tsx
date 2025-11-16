import { useEffect, useState, useCallback } from 'react';
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


  const carregarDados = useCallback(async (signal?: AbortSignal) => {
    if (!user?.idUsuario) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const dadosTarefas = await getTarefasPorUsuario(user.idUsuario, signal);
      if (signal?.aborted) return; 
      setTarefas(dadosTarefas);

      const dadosCategorias = await getCategoriasPorUsuario(user.idUsuario, signal);
      if (signal?.aborted) return; 
      setCategorias(dadosCategorias);
      if (dadosCategorias.length > 0) {
        setNovaCategoriaId(currentId => {
          if (!currentId) { 
            return dadosCategorias[0].idCategoria.toString();
          }
          return currentId;
        });
      }
      
    } catch (err: any) {
      if (err.name === 'AbortError') {
        console.log("Fetch abortada (Strict Mode)");
        return;
      }
      if (!signal?.aborted) {
        setError(err.message || 'Falha ao buscar dados. Tente novamente.');
      }
    } finally {
      if (!signal?.aborted) {
        setIsLoading(false);
      }
    }
  }, [user]); 

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    carregarDados(signal);
    return () => {
      abortController.abort();
    };
  }, [carregarDados]);

  const handleCriarTarefa = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || !novoTitulo.trim() || !novaCategoriaId) {
      setError("Título e Categoria são obrigatórios.");
      return;
    }
    
    if (categorias.length === 0) {
      setError("Nenhuma categoria disponível. Crie uma categoria primeiro.");
      return;
    }

    setError(null);

    try {
      const payload = {
        titulo: novoTitulo.trim(),
        descricao: novaDescricao.trim() || null,
        idCategoria: parseInt(novaCategoriaId),
        dtVencimento: novaDataVencimento || null,
        tempoEstimadoH: novoTempoEstimado ? parseFloat(novoTempoEstimado) : null,
        idUsuario: user.idUsuario
      };
      
      const novaTarefa = await createTarefa(payload);
      setTarefas(prev => [novaTarefa, ...prev]);
      
      setNovoTitulo('');
      setNovaDescricao('');
      setNovaDataVencimento('');
      setNovoTempoEstimado('');
      
    } catch (err: any) {
      setError(err.message || 'Erro ao criar tarefa. Tente novamente.');
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
    setEditForm(prev => ({ 
      ...prev, 
      [name]: name === 'idCategoria' || name === 'tempoEstimadoH' ? 
        (value ? Number(value) : null) : value 
    }));
  };

  const handleAtualizarTarefa = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tarefaEmEdicao || !editForm.titulo || !editForm.idCategoria || !editForm.status || !user) {
      setError("Preencha todos os campos obrigatórios.");
      return;
    }

    try {
      const payload: ITarefaUpdate = {
        titulo: editForm.titulo.toString(),
        descricao: editForm.descricao?.toString() || null,
        idCategoria: Number(editForm.idCategoria),
        dtVencimento: editForm.dtVencimento?.toString() || null,
        tempoEstimadoH: editForm.tempoEstimadoH ? Number(editForm.tempoEstimadoH) : null,
        status: editForm.status as StatusTarefa,
        idUsuario: user.idUsuario,
      };

      const tarefaAtualizada = await updateTarefa(tarefaEmEdicao.idTarefa, payload);
      
      setTarefas(prev => prev.map(t => 
        t.idTarefa === tarefaAtualizada.idTarefa ? tarefaAtualizada : t
      ));
      
      fecharModalEdicao();
    } catch (err: any) {
      setError(err.message || 'Erro ao atualizar tarefa. Tente novamente.');
    }
  };

  const handleExcluirTarefa = async (idTarefa: number) => {
    if (!window.confirm("Tem certeza que deseja excluir esta tarefa?")) {
      return;
    }
    
    try {
      await deleteTarefa(idTarefa);
      setTarefas(prev => prev.filter(t => t.idTarefa !== idTarefa));
    } catch (err: any) {
      setError(err.message || 'Erro ao excluir tarefa. Tente novamente.');
    }
  };

  const getCategoriaPorId = (idCategoria: number) => {
    return categorias.find(cat => cat.idCategoria === idCategoria);
  };

  if (isLoading) {
    return (
      <main className={`flex flex-col items-center justify-center p-8 ${themeClasses.bg(darkActive)} ${themeClasses.text(darkActive)} min-h-screen`}>
        <Loader2 className="w-8 h-8 animate-spin mb-2" />
        <p>Carregando tarefas...</p>
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
            Minhas Tarefas
          </h1>
        </div>

        {error && (
          <div className={`mb-8 max-w-2xl mx-auto p-4 rounded-lg border ${
            darkActive ? 'bg-red-900/20 border-red-800' : 'bg-red-50 border-red-200'
          }`}>
            <p className="text-red-500 text-sm">{error}</p>
            <button 
              onClick={() => setError(null)}
              className="mt-2 text-red-500 text-sm underline"
            >
              Fechar
            </button>
          </div>
        )}
        
        <form 
          onSubmit={handleCriarTarefa}
          className={`
            mb-12 p-6 md:p-8 rounded-xl border max-w-4xl mx-auto
            ${themeClasses.bg(darkActive)}
            ${themeClasses.border(darkActive)}
            ${themeClasses.shadow(darkActive)}
          `}
        >
          <h2 className={`text-xl font-semibold mb-4 ${themeClasses.text(darkActive)}`}>
            Nova Tarefa
          </h2>
          
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
                  required
                />
              </div>
              <div>
                <label htmlFor="categoria" className="block text-sm font-medium mb-2">Categoria*</label>
                <select 
                  id="categoria"
                  value={novaCategoriaId}
                  onChange={(e) => setNovaCategoriaId(e.target.value)}
                  className={themeClasses.input(darkActive)}
                  required
                >
                  <option value="">Selecione uma categoria</option>
                  {categorias.map(cat => (
                    <option key={cat.idCategoria} value={cat.idCategoria}>
                      {cat.nome}
                    </option>
                  ))}
                </select>
                {categorias.length === 0 && (
                  <p className="text-xs text-orange-500 mt-1">
                    Nenhuma categoria disponível. Crie uma categoria primeiro.
                  </p>
                )}
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
            disabled={!novoTitulo.trim() || !novaCategoriaId || categorias.length === 0}
            className={`flex items-center justify-center gap-2 px-6 py-3 mt-6 rounded-lg font-medium transition-colors ${
              (!novoTitulo.trim() || !novaCategoriaId || categorias.length === 0)
                ? 'bg-gray-400 cursor-not-allowed'
                : themeClasses.btnPrimary(darkActive)
            }`}
          >
            <FaPlus className="w-4 h-4" />
            Criar Tarefa
          </button>
        </form>

        {tarefas.length === 0 ? (
          <div className={`
            text-center mt-16 rounded-xl p-8 max-w-2xl mx-auto border
            ${themeClasses.bg(darkActive)}
            ${themeClasses.border(darkActive)}
            ${themeClasses.shadow(darkActive)}
          `}>
            <p className={`text-lg ${themeClasses.textMuted(darkActive)}`}>
              {categorias.length === 0 
                ? "Crie uma categoria primeiro para adicionar tarefas."
                : "Você ainda não tem nenhuma tarefa."
              }
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:gap-6 max-w-4xl mx-auto">
            {tarefas.map((tarefa) => {
              const categoria = getCategoriaPorId(tarefa.idCategoria);
              return (
                <div
                  key={tarefa.idTarefa}
                  className={`
                    p-6 rounded-xl border transition-all duration-300
                    ${themeClasses.bg(darkActive)}
                    ${themeClasses.border(darkActive)}
                    ${themeClasses.shadow(darkActive)}
                    hover:shadow-xl hover:scale-[1.02]
                  `}
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className={`text-lg font-semibold ${themeClasses.text(darkActive)}`}>{tarefa.titulo}</h3>
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
                        {categoria && (
                          <span className="flex items-center gap-1">
                            <div 
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: categoria.corHex }}
                            />
                            {categoria.nome}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex gap-2 sm:flex-col sm:gap-1">
                      <button 
                        onClick={() => abrirModalEdicao(tarefa)}
                        className={`
                          p-2 rounded-lg transition-all duration-200
                          ${themeClasses.textMuted(darkActive)}
                          hover:text-blue-600 hover:bg-gray-100
                          ${darkActive ? 'dark:hover:text-blue-400 dark:hover:bg-gray-700' : ''}
                        `}
                        title="Editar"
                      >
                        <FaPencilAlt className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleExcluirTarefa(tarefa.idTarefa)}
                        className={`
                          p-2 rounded-lg transition-all duration-200
                          ${themeClasses.textMuted(darkActive)}
                          hover:text-red-600 hover:bg-gray-100
                          ${darkActive ? 'dark:hover:text-red-500 dark:hover:bg-gray-700' : ''}
                        `}
                        title="Excluir"
                      >
                        <FaTrash className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {isEditModalOpen && tarefaEmEdicao && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className={`
            w-full max-w-2xl rounded-xl shadow-2xl max-h-[95vh] overflow-hidden flex flex-col 
            ${themeClasses.bg(darkActive)}
          `}>
            <div className={`shrink-0 flex justify-between items-center p-6 border-b ${themeClasses.border(darkActive)}`}>
              <h2 className={`text-2xl font-bold ${themeClasses.text(darkActive)}`}>
                Editar Tarefa
              </h2>
              <button 
                type="button"
                onClick={fecharModalEdicao} 
                className={`p-2 rounded-full transition-colors ${
                  darkActive ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
              >
                <FaTimes className={`w-5 h-5 ${themeClasses.text(darkActive)}`} />
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
    </main>
  );
};

export default TarefasPage;