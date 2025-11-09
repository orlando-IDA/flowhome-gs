import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FaBoxArchive, 
  FaUsers, 
  FaEnvelope, 
  FaBars,
  FaXmark,
  FaQuestion
} from 'react-icons/fa6';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const baseLinkStyle = "relative font-medium transition-colors duration-300 py-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-blue-600 after:transition-all after:duration-300";
  const activeLinkStyle = "text-blue-600 font-bold after:w-full";
  const inactiveLinkStyle = "text-gray-600 hover:text-blue-600 after:w-0 hover:after:w-full";

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

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          
          <NavLink to="/">
            <img 
              src="/flowhome-logo.png" 
              alt="Logo FlowHome" 
              className="w-32 h-12 md:w-40 md:h-16 object-contain" 
            />
          </NavLink>

          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            <ul className="flex items-center gap-6 lg:gap-8">
              <li><NavLinkIcon to="/sobre" text="SOBRE" icon={<FaBoxArchive />} /></li>
              <li><NavLinkIcon to="/integrantes" text="INTEGRANTES" icon={<FaUsers />} /></li>
              <li><NavLinkIcon to="/contato" text="CONTATO" icon={<FaEnvelope />} /></li>
              <li><NavLinkIcon to="/faq" text="FAQ" icon={<FaQuestion />} /></li>
            </ul>
            
            <NavLink 
              to="/login"
              className="px-4 py-2 text-sm font-semibold text-blue-600 bg-white border border-blue-500 rounded-md hover:bg-blue-500 hover:text-white transition-colors duration-300"
            >
              LOGIN
            </NavLink>
          </nav>

          <button 
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={toggleMenu}
            aria-label="Abrir menu"
          >
            {isMenuOpen ? <FaXmark className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden mt-4 pt-4 border-t border-gray-200">
            <ul className="flex flex-col gap-4">
              <li>
                <NavLink to="/sobre" className={({ isActive }) => `block py-2 ${isActive ? "text-blue-600 font-bold" : "text-gray-700"}`} onClick={() => setIsMenuOpen(false)}>
                  <span className="flex items-center gap-3"><FaBoxArchive /> SOBRE</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/integrantes" className={({ isActive }) => `block py-2 ${isActive ? "text-blue-600 font-bold" : "text-gray-700"}`} onClick={() => setIsMenuOpen(false)}>
                  <span className="flex items-center gap-3"><FaUsers /> INTEGRANTES</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/contato" className={({ isActive }) => `block py-2 ${isActive ? "text-blue-600 font-bold" : "text-gray-700"}`} onClick={() => setIsMenuOpen(false)}>
                  <span className="flex items-center gap-3"><FaEnvelope /> CONTATO</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/faq" className={({ isActive }) => `block py-2 ${isActive ? "text-blue-600 font-bold" : "text-gray-700"}`} onClick={() => setIsMenuOpen(false)}>
                  <span className="flex items-center gap-3"><FaQuestion /> FAQ</span>
                </NavLink>
              </li>
              <li className="pt-4 border-t border-gray-100">
                <NavLink to="/login" className="w-full" onClick={() => setIsMenuOpen(false)}>
                  <button className="w-full px-4 py-2 font-semibold text-blue-600 bg-white border border-blue-500 rounded-md hover:bg-blue-500 hover:text-white transition-colors duration-300">
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