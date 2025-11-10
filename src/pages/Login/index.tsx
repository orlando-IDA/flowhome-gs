import { useState } from 'react';
import { LoginForm } from './LoginForm'; 
import { RegisterForm } from './Registerform';

const Logo = () => (
  <img 
    src="/flowhome-logo.png" 
    alt="Logo FlowHome" 
    className="w-40 h-16 md:w-48 md:h-20 object-contain"
  />
);

export function LoginPage() {
  const [isLoginView, setIsLoginView] = useState(true);

  const toggleView = () => setIsLoginView(!isLoginView);

  return (
    <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-2 font-sans">
      <div className="hidden md:flex flex-col items-center justify-center bg-blue-50 p-12 border-r border-neutral-200">
        <div className="flex flex-col gap-4 items-center text-center">
          <Logo />
          <p className="text-xl text-blue-800 mt-4 font-medium">
            Gestão de equipes e relatórios em um só lugar.
          </p>
          <p className="text-neutral-600 font-light">
            Acesse sua conta ou cadastre-se para começar.
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-start md:justify-center p-8 pt-20 md:pt-8 bg-white">
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