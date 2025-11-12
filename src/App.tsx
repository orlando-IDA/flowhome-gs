import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';

// 1. IMPORTAR O NOVO COMPONENTE
import ProtectedRoute from './components/ProtectedRoute';

// pages
import DashboardPage from './pages/Dashboard';
import SobrePage from './pages/Sobre';
import ContatoPage from './pages/Contato';
import FaqPage from './pages/FAQ';
import IntegrantesPage from './pages/Integrantes';
import LoginPage from './pages/Login';
import PerfilPage from './pages/Perfil';
import IntegranteDetail from './pages/IntegranteDetail';
import CategoriasPage from './pages/Categorias';
import Error404 from './pages/Error';

function App() {
  return (
    <Routes>
     
      {/* Rotas Públicas: 
        Qualquer um pode acessar.
      */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<Error404 />} />

      {/* Rotas Protegidas:
        O <ProtectedRoute> agora é o "pai". Ele vai checar o localStorage.
        Se o usuário estiver logado, ele renderiza o <Outlet />, que 
        são as rotas <Route> filhas abaixo.
      */}
      <Route element={<ProtectedRoute />}>

        {/* Grupo 1: Rotas que usam o MainLayout (navbar, etc.) */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<DashboardPage />} /> 
          <Route path="sobre" element={<SobrePage />} />
          <Route path="contato" element={<ContatoPage />} />
          <Route path="faq" element={<FaqPage />} />
          <Route path="integrantes" element={<IntegrantesPage />} />
          <Route path="/integrantes/:id" element={<IntegranteDetail />} />
          <Route path="categorias" element={<CategoriasPage />} />
        </Route>

        {/* Grupo 2: Rotas protegidas que NÃO usam o MainLayout */}
        <Route path="/perfil" element={<PerfilPage />} />

      </Route>
    </Routes>
  );
}

export default App;