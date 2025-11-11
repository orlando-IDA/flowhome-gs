import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';

// pages
import DashboardPage from './pages/Dashboard';
import SobrePage from './pages/Sobre';
import ContatoPage from './pages/Contato';
import FaqPage from './pages/FAQ';
import IntegrantesPage from './pages/Integrantes';
import LoginPage from './pages/Login';
import PerfilPage from './pages/Perfil';
import IntegranteDetail from './pages/IntegranteDetail';
import Error404 from './pages/Error';


function App() {
  return (
    <Routes>
     
      <Route path="/" element={<MainLayout />}>
        <Route index element={<DashboardPage />} /> 
        <Route path="sobre" element={<SobrePage />} />
        <Route path="contato" element={<ContatoPage />} />
        <Route path="faq" element={<FaqPage />} />
        <Route path="integrantes" element={<IntegrantesPage />} />
        <Route path="/integrantes/:id" element={<IntegranteDetail />} />
      </Route>

      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<Error404 />} />
   
      <Route path="/perfil" element={<PerfilPage />} />
    </Routes>
  );
}

export default App;