import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaGithub, FaUsers } from 'react-icons/fa6';

const Footer: React.FC = () => {
  const anoAtual = new Date().getFullYear();
  return (
    <footer className="bg-white border-t border-gray-200 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex flex-col items-center">
            <h3 className="font-semibold text-gray-800 mb-3">Flow Home</h3>
            <div className="flex space-x-6">
              <NavLink 
                to="/integrantes"
                className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <FaUsers className="w-4 h-4" />
                <span className="text-sm">Integrantes</span>
              </NavLink>
              <a 
                href="https://github.com/orlando-IDA/flowhome-gs"
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <FaGithub className="w-4 h-4" />
                <span className="text-sm">GitHub</span>
              </a>
            </div>
          </div>
          <div className="text-center">
            <p className="text-gray-500 text-sm">
              © {anoAtual} FlowHome - Global Solutions FIAP.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;