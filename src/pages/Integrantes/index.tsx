import { Link } from 'react-router-dom';
import type { IntegranteProps } from '../../types/integranteType';
import { useAppTheme } from '../../context/useAppTheme';
import { themeClasses } from '../../utils/themeUtils';

const GitHubIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg 
    className={className} 
    fill="currentColor" 
    viewBox="0 0 24 24" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const LinkedInIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg 
    className={className} 
    fill="currentColor" 
    viewBox="0 0 24 24" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

const IntegranteCard = ({ id, nome, rm, turma, funcao, imgUrl, githubUrl, linkedinUrl }: IntegranteProps) => {
  const { darkActive } = useAppTheme();

  return (
    <Link 
      to={`/integrantes/${id}`}
      className="block transition-all duration-300 hover:scale-105"
    >
      <div className={`
        rounded-xl w-[280px] md:w-[300px] aspect-3/4 p-12 flex flex-col items-center justify-between text-center shadow-lg hover:shadow-xl border transition-all duration-300
        ${themeClasses.bg(darkActive)}
        ${themeClasses.border(darkActive)}
        ${themeClasses.text(darkActive)}
        ${themeClasses.shadow(darkActive)}
      `}>
        <div className="flex flex-col items-center gap-4">
          <div 
            className="w-28 h-28 md:w-32 md:h-32 bg-cover bg-center rounded-full border-4 border-blue-100 shadow-inner"
            style={{ backgroundImage: `url(${imgUrl})` }}
          />
          <div className="flex flex-col gap-2">
            <h3 className="text-lg md:text-xl font-semibold">{nome}</h3>
            <div className="flex flex-col gap-1 text-sm">
              <p className={themeClasses.textMuted(darkActive)}>{`RM: ${rm} | ${turma}`}</p>
              <p className="font-medium text-blue-500">{funcao}</p>
            </div>
          </div>
        </div>

        <div className={`w-full pt-4 border-t ${themeClasses.border(darkActive)}`}>
          <div className="flex items-center justify-center gap-4">
            <a 
              href={githubUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="GitHub"
              className={`
                p-2 rounded-lg transition-all duration-200
                ${themeClasses.textMuted(darkActive)}
                hover:text-gray-900 hover:bg-gray-100
                ${darkActive ? 'dark:hover:text-white dark:hover:bg-gray-700' : ''}
              `}
              onClick={(e) => e.stopPropagation()}
            >
              <GitHubIcon />
            </a>
            <a 
              href={linkedinUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="LinkedIn"
              className={`
                p-2 rounded-lg transition-all duration-200
                ${themeClasses.textMuted(darkActive)}
                hover:text-blue-600 hover:bg-gray-100
                ${darkActive ? 'dark:hover:text-blue-400 dark:hover:bg-gray-700' : ''}
              `}
              onClick={(e) => e.stopPropagation()}
            >
              <LinkedInIcon />
            </a>
          </div>
        </div>
      </div>
    </Link>
  );
};

const IntegrantesPage = () => {
  const { darkActive } = useAppTheme();

  const integrantes: IntegranteProps[] = [
    {
      id: '1',
      nome: 'Gabriel Martins',
      rm: '562194',
      turma: '1TDSPG',
      funcao: 'Dev Back-End',
      imgUrl: '/assets/img/gabriel.jpg',
      githubUrl: 'https://github.com/ggabmartins',
      linkedinUrl: 'https://www.linkedin.com/in/gabriel-lourenço-5a4280353/',
      bio: 'Desenvolvedor back-end especializado em Java.'
    },
    {
      id: '2',
      nome: 'Orlando Gonçalves',
      rm: '561584',
      turma: '1TDSPG',
      funcao: 'Dev Back-End',
      imgUrl: '/assets/img/orlando.png',
      githubUrl: 'https://github.com/orlando-IDA',
      linkedinUrl: 'https://www.linkedin.com/in/orlando-gonçalves-de-arruda-934078236/',
      bio: 'Desenvolvedor back-end com foco em Java e Python.'
    }
  ];

  return (
    <main className={`
      min-h-screen py-12 transition-colors duration-300
      ${themeClasses.bg(darkActive)}
    `}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className={`
            text-3xl md:text-4xl font-bold mb-4
            ${themeClasses.text(darkActive)}
          `}>
            Nossa Equipe
          </h1>
        </div>
        
        <section className="flex flex-wrap justify-center gap-8 md:gap-10">
          {integrantes.map((integrante) => (
            <IntegranteCard 
              key={integrante.id}
              {...integrante}
            />
          ))}
        </section>

        <div className={`
          text-center mt-16 rounded-xl p-6 max-w-2xl mx-auto border transition-colors duration-300
          ${themeClasses.bg(darkActive)}
          ${themeClasses.border(darkActive)}
          ${themeClasses.shadow(darkActive)}
        `}>
          <h2 className={`
            text-xl font-bold mb-4
            ${themeClasses.text(darkActive)}
          `}>
            Sobre o Projeto
          </h2>
          <p className={`
            text-base mb-4
            ${themeClasses.textMuted(darkActive)}
          `}>
            O FlowHome foi desenvolvido para a Global Solution da FIAP,
            com o objetivo de explorar o tema "O Futuro do Trabalho".
          </p>
          <p className={`
            text-base
            ${themeClasses.textMuted(darkActive)}
          `}>
            Nossa missão é promover o bem-estar,
            produtividade e a saúde mental na era do trabalho remoto e híbrido.
          </p>
        </div>
      </div>
    </main>
  );
};

export default IntegrantesPage;