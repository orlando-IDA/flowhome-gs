import { Outlet } from 'react-router-dom';


const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="p-4 bg-blue-600 text-white">
        (Nav - FlowHome)
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;