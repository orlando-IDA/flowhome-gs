import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaGithub, FaUsers,FaPhone } from 'react-icons/fa6';
import { useAppTheme } from '../context/useAppTheme';
import { themeClasses } from '../utils/themeUtils';

const Footer: React.FC = () => {
  const anoAtual = new Date().getFullYear();
  const { darkActive } = useAppTheme();

  return (
    <footer className={`
      border-t py-6 transition-colors duration-300
      ${themeClasses.bg(darkActive)}
      ${themeClasses.border(darkActive)}
      ${themeClasses.text(darkActive)}
    `}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex flex-col items-center">
            <h3 className="font-semibold mb-3">Flow Home</h3>
            <div className="flex flex-col items-center space-y-2 sm:flex-row sm:space-y-0 sm:space-x-6">
   
              <NavLink 
                to="/integrantes"
                className={`
                  flex items-center space-x-2 transition-colors duration-300
                  ${themeClasses.textMuted(darkActive)}
                  hover:text-blue-500
                `}
              >
                <FaUsers className="w-4 h-4" />
                <span className="text-sm">Integrantes</span>
              </NavLink>
              <NavLink 
                to="/contato"
                className={`
                  flex items-center space-x-2 transition-colors duration-300
                  ${themeClasses.textMuted(darkActive)}
                  hover:text-blue-500
                `}
              >
                <FaPhone className="w-4 h-4" />
                <span className="text-sm">Contato</span>
              </NavLink>
              <a 
                href="https://github.com/orlando-IDA/flowhome-gs"
                target="_blank" 
                rel="noopener noreferrer"
                className={`
                  flex items-center space-x-2 transition-colors duration-300
                  ${themeClasses.textMuted(darkActive)}
                  hover:text-blue-500
                `}
              >
                <FaGithub className="w-4 h-4" />
                <span className="text-sm">GitHub</span>
              </a>
            </div>
          </div>
          <div className="text-center">
            <p className={`
              text-sm transition-colors duration-300
              ${themeClasses.textMuted(darkActive)}
            `}>
              © {anoAtual} FlowHome - Global Solutions FIAP.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;