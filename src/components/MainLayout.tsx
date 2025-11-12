import { Outlet } from 'react-router-dom';
import Header from './Header.tsx';
import Footer from './Footer.tsx'; 

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 overflow-auto min-h-0">
        <Outlet /> 
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;