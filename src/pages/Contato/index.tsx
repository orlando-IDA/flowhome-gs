import { Mail, Phone } from "lucide-react";
import { useAppTheme } from '../../context/useAppTheme';
import { themeClasses } from '../../utils/themeUtils';

const Contact = () => {
  const { darkActive } = useAppTheme(); 

  return (
    <div className={`min-h-screen w-full transition-colors duration-300 flex flex-col ${themeClasses.bg(darkActive)}`}>
      <div className="container mx-auto px-4 py-8 max-w-5xl flex-1 flex flex-col items-center justify-center -mt-32"> 
        <div className="text-center mb-20 max-w-2xl">
            <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${themeClasses.text(darkActive)}`}>
              Entre em Contato
            </h1>
            <p className={`text-lg ${themeClasses.textMuted(darkActive)}`}>
              Tem dúvidas ou sugestões sobre o FlowHome? Adoraríamos ouvir você.
            </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 w-full max-w-3xl">
            <div className={`flex flex-col items-center text-center p-8 rounded-xl border transition-all duration-300 hover:-translate-y-1
              ${themeClasses.bg(darkActive)} 
              ${themeClasses.border(darkActive)} 
              ${themeClasses.shadow(darkActive)}`}
            >
              <div className="p-4 rounded-full bg-blue-500/10 mb-4">
                <Mail className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className={`text-xl font-bold mb-1 ${themeClasses.text(darkActive)}`}>
                E-mail
              </h3>
              <p className={`text-sm mb-4 ${themeClasses.textMuted(darkActive)}`}>
                Envie sua mensagem diretamente
              </p>
              <a 
                href="mailto:contato@email.com" 
                className="text-blue-500 font-semibold hover:underline text-lg"
              >
                flowhome@email.com
              </a>
            </div>

            <div className={`flex flex-col items-center text-center p-8 rounded-xl border transition-all duration-300 hover:-translate-y-1
              ${themeClasses.bg(darkActive)} 
              ${themeClasses.border(darkActive)} 
              ${themeClasses.shadow(darkActive)}`}
            >
              <div className="p-4 rounded-full bg-green-500/10 mb-4">
                <Phone className="h-8 w-8 text-green-500" />
              </div>
              <h3 className={`text-xl font-bold mb-1 ${themeClasses.text(darkActive)}`}>
                Telefone
              </h3>
              <p className={`text-sm mb-4 ${themeClasses.textMuted(darkActive)}`}>
                Ligue para nós (Horário Comercial)
              </p>
              <a 
                href="tel:+5512999999999" 
                className="text-blue-500 font-semibold hover:underline text-lg"
              >
                +55 (11) 99999-9999
              </a>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;