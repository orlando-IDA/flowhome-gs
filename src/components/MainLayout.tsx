import { Outlet } from 'react-router-dom';
import Header from './Header.tsx';
import Footer from './Footer.tsx'; 

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="grow">
        <Outlet /> 
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;