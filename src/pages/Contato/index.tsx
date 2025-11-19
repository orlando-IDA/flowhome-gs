import { useNavigate } from "react-router-dom";
import { Mail, Phone } from "lucide-react";
import { useAppTheme } from '../../context/useAppTheme';
import { themeClasses } from '../../utils/themeUtils';

const Contact = () => {
  const navigate = useNavigate();
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
        </div>
      </div>
    </div>
  );
};

export default Contact;