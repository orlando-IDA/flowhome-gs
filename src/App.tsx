import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';

import ProtectedRoute from './components/ProtectedRoute';

// pages
import DashboardPage from './pages/Dashboard';
import SobrePage from './pages/Sobre';
import ContatoPage from './pages/Contato';
import IntegrantesPage from './pages/Integrantes';
import LoginPage from './pages/Login';
import PerfilPage from './pages/Perfil';
import IntegranteDetail from './pages/IntegranteDetail';
import CategoriasPage from './pages/Categorias';
import Error404 from './pages/Error';
import TarefasPage from './pages/Tarefas';
import EquipesPage from './pages/Equipes';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<Error404 />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<DashboardPage />} /> 
          <Route path="sobre" element={<SobrePage />} />
          <Route path="contato" element={<ContatoPage />} />
          <Route path="integrantes" element={<IntegrantesPage />} />
          <Route path="/integrantes/:id" element={<IntegranteDetail />} />
          <Route path="categorias" element={<CategoriasPage />} />
          <Route path="tarefas" element={<TarefasPage />} />
          <Route path="equipes" element={<EquipesPage />} />
          <Route path="perfil" element={<PerfilPage />} />
        </Route>

        

      </Route>
    </Routes>
  );
}

export default App;