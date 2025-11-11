import { Link } from 'react-router-dom';
import { useAppTheme } from '../../context/useAppTheme';
import { themeClasses } from '../../utils/themeUtils';

const SobrePage = () => {
  const { darkActive } = useAppTheme();

  return (
    <div className={`
      min-h-screen transition-colors duration-300
      ${themeClasses.bg(darkActive)}
      ${themeClasses.text(darkActive)}
    `}>
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12 text-center">
              <img 
                src="/hero.jpg"
                alt="Gestão de equipes moderna e eficiente"
                width={1200}
                height={600}
                className="mx-auto w-full max-w-4xl h-auto rounded-lg shadow-sm"
              />
            </div>
            
            <div className="text-center max-w-2xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-medium mb-6">
                FlowHome
              </h1>
              <div className="w-20 h-1 bg-blue-500 mx-auto mb-8"></div>
              <p className={`
                text-lg leading-relaxed mb-8
                ${themeClasses.textMuted(darkActive)}
              `}>
                Uma nova abordagem para a gestão de equipes. Simples, eficiente e humana.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-20">
            <section className="flex flex-col lg:flex-row items-center gap-12">
              <div className="flex-1">
                <img 
                  src="/workflow.jpg"
                  alt="Fluxo de trabalho simplificado"
                  width={800}
                  height={400}
                  className="w-full h-auto rounded-lg shadow-sm"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-6">Nossa Proposta</h2>
                <p className={`
                  leading-relaxed
                  ${themeClasses.textMuted(darkActive)}
                `}>
                  No FlowHome, acreditamos que a gestão de equipes deve ser tão fluida quanto o trabalho 
                  em si. Criamos uma plataforma que elimina complexidades desnecessárias e foca no que 
                  realmente importa: pessoas trabalhando juntas de forma eficaz.
                </p>
              </div>
            </section>
            <section>
              <h2 className="text-2xl font-bold mb-6">Para Quem é o FlowHome?</h2>
              <p className={`
                leading-relaxed mb-4
                ${themeClasses.textMuted(darkActive)}
              `}>
                Para equipes que valorizam a simplicidade sem abrir mão da eficiência. Seja você um 
                startup em crescimento ou uma empresa consolidada, o FlowHome se adapta ao seu ritmo.
              </p>
              <ul className={`
                space-y-2 mt-4
                ${themeClasses.textMuted(darkActive)}
              `}>
                <li>• Equipes remotas e híbridas</li>
                <li>• Startups em escala</li>
                <li>• Empresas que valorizam o bem-estar</li>
                <li>• Líderes que acreditam em gestão humanizada</li>
              </ul>
            </section>
            <section className="text-center">    
              <h2 className="text-2xl font-bold mb-6">Junte-se a Nós</h2>
              <p className={`
                leading-relaxed mb-8
                ${themeClasses.textMuted(darkActive)}
              `}>
                Estamos construindo o futuro do trabalho. Uma ferramenta de cada vez, uma equipe de cada vez.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/integrantes"
                  className={`
                    px-6 py-3 font-medium rounded transition-all duration-300 text-center
                    ${themeClasses.btnPrimary(darkActive)}
                  `}
                >
                  Conheça a Equipe
                </Link>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
};

export default SobrePage;