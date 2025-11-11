import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FaBoxArchive, FaUsers, FaEnvelope, FaBars, FaXmark, FaQuestion,
  FaMoon, FaSun
} from 'react-icons/fa6';
import { useAppTheme } from '../context/useAppTheme';
import { themeClasses } from '../utils/themeUtils';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { darkActive, switchTheme } = useAppTheme();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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

  const MobileNavLink = ({ to, text, icon }: { to: string, text: string, icon: React.ReactNode }) => (
     <NavLink 
      to={to} 
      className={({ isActive }) => `block py-2 ${isActive ? "text-blue-500 font-bold" : ""}`} 
      onClick={() => setIsMenuOpen(false)}
    >
      <span className="flex items-center gap-3">{icon} {text}</span>
    </NavLink>
  );

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
          
          <NavLink to="/">
            <img 
              src="/flowhome-logo.png" 
              alt="Logo FlowHome" 
              className={`w-32 h-12 md:w-40 md:h-16 object-contain ${themeClasses.logo(darkActive)}`} 
            />
          </NavLink>

          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            <ul className="flex items-center gap-6 lg:gap-8">
              <li><NavLinkIcon to="/sobre" text="SOBRE" icon={<FaBoxArchive />} /></li>
              <li><NavLinkIcon to="/integrantes" text="INTEGRANTES" icon={<FaUsers />} /></li>
              <li><NavLinkIcon to="/contato" text="CONTATO" icon={<FaEnvelope />} /></li>
              <li><NavLinkIcon to="/faq" text="FAQ" icon={<FaQuestion />} /></li>
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
            
            <NavLink 
              to="/login"
              className={`
                px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-300 border
                ${themeClasses.btnPrimary(darkActive)}
              `}
            >
              LOGIN
            </NavLink>
          </nav>

          <button 
            className={`md:hidden focus:outline-none ${themeClasses.text(darkActive)}`}
            onClick={toggleMenu}
            aria-label="Abrir menu"
          >
            {isMenuOpen ? <FaXmark className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <nav className={`md:hidden mt-4 pt-4 border-t ${themeClasses.border(darkActive)}`}>
            <ul className="flex flex-col gap-4">
              <li><MobileNavLink to="/sobre" text="SOBRE" icon={<FaBoxArchive />} /></li>
              <li><MobileNavLink to="/integrantes" text="INTEGRANTES" icon={<FaUsers />} /></li>
              <li><MobileNavLink to="/contato" text="CONTATO" icon={<FaEnvelope />} /></li>
              <li><MobileNavLink to="/faq" text="FAQ" icon={<FaQuestion />} /></li>
              
              <li className={`pt-2 border-t ${themeClasses.border(darkActive)}`}>
                <button
                  onClick={() => {
                    switchTheme();
                    setIsMenuOpen(false);
                  }}
                  className={`
                    w-full flex items-center justify-center gap-3 py-3 rounded-md transition-colors
                    ${themeClasses.btnSecondary(darkActive)}
                  `}
                >
                  {darkActive ? (
                    <>
                      <FaSun className="w-5 h-5" />
                      <span>Tema Claro</span>
                    </>
                  ) : (
                    <>
                      <FaMoon className="w-5 h-5" />
                      <span>Tema Escuro</span>
                    </>
                  )}
                </button>
              </li>
              
              <li className={`pt-2 border-t ${themeClasses.border(darkActive)}`}>
                <NavLink to="/login" className="w-full" onClick={() => setIsMenuOpen(false)}>
                  <button className={`
                    w-full px-4 py-3 font-semibold rounded-md transition-colors duration-300 border
                    ${themeClasses.btnPrimary(darkActive)}
                  `}>
                    LOGIN
                  </button>
                </NavLink>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;