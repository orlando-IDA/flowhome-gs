import { useNavigate } from "react-router-dom";
import { Mail, Phone } from "lucide-react";
import { useAppTheme } from '../../context/useAppTheme';
import { themeClasses } from '../../utils/themeUtils';

const Contact = () => {
  const navigate = useNavigate();
  const { darkActive } = useAppTheme(); 

  return (
    <div className={`min-h-screen w-full transition-colors duration-300 flex flex-col ${themeClasses.bg(darkActive)}`}>
    
    </div>
  );
};

export default Contact;