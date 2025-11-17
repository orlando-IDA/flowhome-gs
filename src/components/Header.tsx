import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  FaListCheck, FaUsers, FaFolder, FaBars, FaXmark, FaMoon, FaSun,
  FaHouse, FaUser, FaSignal, FaAddressCard, FaArrowRightToBracket
} from 'react-icons/fa6';
import { useAppTheme } from '../context/useAppTheme';
import { themeClasses } from '../utils/themeUtils';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { darkActive, switchTheme } = useAppTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false); 
    navigate('/login'); 
  };


  const baseLinkStyle = "relative font-medium transition-colors duration-300 py-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-blue-500 after:transition-all after:duration-300";
  const activeLinkStyle = "text-blue-500 font-bold after:w-full";
  const inactiveLinkStyle = "hover:text-blue-500 after:w-0 hover:after:w-full";

  const NavLinkIcon = ({ to, text, icon }: { to: string, text: string, icon: React.ReactNode }) => (
    <NavLink 
      to={to} 
      className={({ isActive }) => `${baseLinkStyle} ${isActive ? activeLinkStyle : inactiveLinkStyle}`}
    >
      <span className="flex items-center gap-2">
        {icon}
        {text}
      </span>
    </NavLink>
  );

  const MobileNavLink = ({ to, text, icon }: { to: string, text: string, icon: React.ReactNode }) => {
    const { darkActive } = useAppTheme();
    
    return (
      <NavLink 
        to={to} 
        className={({ isActive }) => `
          flex items-center gap-4 p-4 rounded-xl transition-all duration-300
          ${isActive 
            ? 'bg-blue-500 text-white shadow-lg transform scale-105' 
            : `${themeClasses.text(darkActive)} ${darkActive ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`
          }
        `} 
        onClick={() => setIsMenuOpen(false)}
      >
        {({ isActive }) => (
          <>
            <div className={`p-2 rounded-lg ${isActive ? 'bg-white/20' : darkActive ? 'bg-gray-700' : 'bg-gray-100'}`}>
              {icon}
            </div>
            <span className="text-lg font-medium">{text}</span>
          </>
        )}
      </NavLink>
    );
  };

  return (
    <header className={`
      sticky top-0 z-50 transition-all duration-300 border-b
      ${themeClasses.bg(darkActive)}
      ${themeClasses.border(darkActive)}
      ${themeClasses.text(darkActive)}
      ${themeClasses.shadow(darkActive)}
    `}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          
          <NavLink to="/" className="flex items-center gap-3">
            <img 
              src="/flowhome-logo.png" 
              alt="Logo FlowHome" 
              className={`w-32 h-12 md:w-40 md:h-16 object-contain ${themeClasses.logo(darkActive)}`} 
            />
          </NavLink>

          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            <ul className="flex items-center gap-6 lg:gap-8">
              <li><NavLinkIcon to="/tarefas" text="TAREFAS" icon={<FaListCheck />} /></li>
              <li><NavLinkIcon to="/equipes" text="EQUIPES" icon={<FaUsers />} /></li>
              <li><NavLinkIcon to="/categorias" text="CATEGORIAS" icon={<FaFolder />} /></li>
              <li><NavLinkIcon to="/sobre" text="SOBRE" icon={<FaHouse />} /></li>
              <li><NavLinkIcon to="/integrantes" text="INTEGRANTES" icon={<FaUser />} /></li>
            </ul>
            
            <button
              onClick={switchTheme}
              className={`
                p-3 rounded-full transition-all duration-300
                ${themeClasses.btnSecondary(darkActive)}
              `}
              aria-label="Alternar tema"
            >
              {darkActive ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
            </button>
            {user ? (
              <>
                <NavLink 
                  to="/perfil" 
                  className="font-medium text-sm text-right hidden lg:block hover:text-blue-500 transition-colors"
                  title="Ver Perfil"
                >
                  Olá, {user.nome.split(' ')[0]}
                </NavLink>
                
                <button
                  onClick={handleLogout}
                  title="Sair"
                  className={`
                    px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-300 border
                    ${themeClasses.btnPrimary(darkActive)}
                  `}
                >
                  <FaArrowRightToBracket className="w-4 h-4" /> 
                </button>
              </>
            ) : (
              <NavLink 
                to="/login"
                className={`
                  px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-300 border
                  ${themeClasses.btnPrimary(darkActive)}
                `}
              >
                LOGIN
              </NavLink>
            )}
          </nav>

          <button 
            className={`md:hidden p-2 rounded-lg transition-all duration-300 ${darkActive ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
            onClick={toggleMenu}
            aria-label="Abrir menu"
          >
            {isMenuOpen ? <FaXmark className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className={`
            md:hidden fixed inset-0 top-0 left-0 z-50 transition-all duration-300
            ${darkActive ? 'bg-black/50' : 'bg-black/30'}
          `}>
            <div className={`
              absolute top-0 right-0 h-full w-80 max-w-full transform transition-transform duration-300
              ${themeClasses.bg(darkActive)}
              ${themeClasses.shadow(darkActive)}
            `}>
              <div className="flex flex-col h-full">
                <div className={`flex items-center justify-between p-6 border-b ${themeClasses.border(darkActive)}`}>
                  <div className="flex items-center gap-3">
                    {user ? (
                      <span className="text-xl font-bold">Olá, {user.nome.split(' ')[0]}</span>
                    ) : (
                      <span className="text-xl font-bold">Menu</span>
                    )}
                  </div>
                  <button 
                    onClick={toggleMenu}
                    className={`p-2 rounded-lg transition-all duration-300 ${darkActive ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
                  >
                    <FaXmark className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-3">
                  <MobileNavLink to="/" text="INÍCIO" icon={<FaHouse />} />
                  {user && (
                    <MobileNavLink to="/perfil" text="MEU PERFIL" icon={<FaAddressCard />} />
                  )}
                  <MobileNavLink to="/tarefas" text="TAREFAS" icon={<FaListCheck />} />
                  <MobileNavLink to="/equipes" text="EQUIPES" icon={<FaUsers />} />
                  <MobileNavLink to="/categorias" text="CATEGORIAS" icon={<FaFolder />} />
                  <MobileNavLink to="/sobre" text="SOBRE" icon={<FaHouse />} />
                  <MobileNavLink to="/integrantes" text="INTEGRANTES" icon={<FaUser />} />
                </div>

                <div className={`p-6 space-y-4 border-t ${themeClasses.border(darkActive)}`}>
                  <button
                    onClick={() => {
                      switchTheme();
                      setIsMenuOpen(false);
                    }}
                    className={`
                      w-full flex items-center justify-center gap-3 p-4 rounded-xl transition-all duration-300
                      ${themeClasses.btnSecondary(darkActive)}
                    `}
                  >
                    {darkActive ? (
                      <>
                        <FaSun className="w-5 h-5" />
                        <span className="font-medium">Tema Claro</span>
                      </>
                    ) : (
                      <>
                        <FaMoon className="w-5 h-5" />
                        <span className="font-medium">Tema Escuro</span>
                      </>
                    )}
                  </button>
                  {user ? (
                    <button 
                      onClick={handleLogout}
                      className={`
                        w-full flex items-center justify-center gap-3 p-4 font-semibold rounded-xl transition-all duration-300 border
                        ${themeClasses.btnPrimary(darkActive)}
                      `}
                    >
                      <FaArrowRightToBracket className="w-5 h-5" />
                      <span>SAIR</span>
                    </button>
                  ) : (
                    <NavLink to="/login" className="w-full" onClick={() => setIsMenuOpen(false)}>
                      <button className={`
                        w-full flex items-center justify-center gap-3 p-4 font-semibold rounded-xl transition-all duration-300 border
                        ${themeClasses.btnPrimary(darkActive)}
                      `}>
                        <FaSignal className="w-5 h-5" />
                        <span>ENTRAR</span>
                      </button>
                    </NavLink>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;