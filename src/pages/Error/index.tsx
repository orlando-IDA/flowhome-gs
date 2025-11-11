import { Link } from 'react-router-dom';
import { useAppTheme } from '../../context/useAppTheme';
import { themeClasses } from '../../utils/themeUtils';

const Error404 = () => {
  const { darkActive } = useAppTheme();

  return (
    <div className={`
      min-h-screen flex items-center justify-center p-6 transition-colors duration-300
      ${themeClasses.bg(darkActive)}
      ${themeClasses.text(darkActive)}
    `}>
      <div className="text-center max-w-md">
        <img 
          src="/404.png"
          alt="Página não encontrada"
          width={310}  
          height={440} 
          className="mx-auto mb-8 w-full max-w-[317px] h-auto"
        />
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-500 mb-3">
            404
          </h1>
          <p className={`
            text-lg mb-4
            ${themeClasses.textMuted(darkActive)}
          `}>
            Página não encontrada
          </p>
          <p className={`
            text-base
            ${themeClasses.textMuted(darkActive)}
          `}>
            A página que você está procurando não existe ou foi movida.
          </p>
        </div>
        <Link 
          to="/"
          className={`
            inline-block px-6 py-3 font-semibold rounded-lg transition-all duration-300
            ${themeClasses.btnPrimary(darkActive)}
          `}
        >
          Voltar para Home
        </Link>
      </div>
    </div>
  );
};

export default Error404;