import { useState } from 'react';
import { LoginForm } from './LoginForm'; 
import { RegisterForm } from './RegisterForm';
import { useAppTheme } from '../../context/useAppTheme';
import { themeClasses } from '../../utils/themeUtils';

const Logo = () => {
  const { darkActive } = useAppTheme();
  
  return (
    <img 
      src="/flowhome-logo.png" 
      alt="Logo FlowHome" 
      className={`w-40 h-16 md:w-48 md:h-20 object-contain ${themeClasses.logo(darkActive)}`}
    />
  );
};

export function LoginPage() {
  const [isLoginView, setIsLoginView] = useState(true);
  const { darkActive } = useAppTheme();

  const toggleView = () => setIsLoginView(!isLoginView);

  return (
    <div className={`
      min-h-screen w-full grid grid-cols-1 md:grid-cols-2 font-sans transition-colors duration-300
      ${themeClasses.bg(darkActive)}
    `}>
      <div className={`
        hidden md:flex flex-col items-center justify-center p-12 border-r transition-colors duration-300
        ${darkActive ? 'bg-gray-800 border-gray-700' : 'bg-blue-50 border-neutral-200'}
      `}>
        <div className="flex flex-col gap-4 items-center text-center">
          <Logo />
          <p className={`
            text-xl mt-4 font-medium transition-colors duration-300
            ${darkActive ? 'text-blue-300' : 'text-blue-800'}
          `}>
            Gestão de equipes e relatórios em um só lugar.
          </p>
          <p className={`
            font-light transition-colors duration-300
            ${themeClasses.textMuted(darkActive)}
          `}>
            Acesse sua conta ou cadastre-se para começar.
          </p>
        </div>
      </div>
      <div className={`
        flex flex-col items-center justify-start md:justify-center p-8 pt-20 md:pt-8 transition-colors duration-300
        ${themeClasses.bg(darkActive)}
      `}>
        <div className="md:hidden flex flex-col items-center mb-8">
          <Logo />
        </div>
        <div className="w-full max-w-md">
          {isLoginView ? (
            <LoginForm onToggleView={toggleView} />
          ) : (
            <RegisterForm onToggleView={toggleView} />
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;