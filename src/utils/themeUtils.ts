export const themeClasses = {
  // Cores de fundo
  bg: (darkActive: boolean) => 
    darkActive ? 'bg-gray-900' : 'bg-white',
  
  // Cores de texto
  text: (darkActive: boolean) => 
    darkActive ? 'text-gray-100' : 'text-gray-900',
  
  // Cores de borda
  border: (darkActive: boolean) => 
    darkActive ? 'border-gray-700' : 'border-gray-200',
  
  // Cores de texto
  textMuted: (darkActive: boolean) => 
    darkActive ? 'text-gray-400' : 'text-gray-600',
  
  // Botões primários
  btnPrimary: (darkActive: boolean) => 
    darkActive 
      ? 'bg-blue-600 text-white hover:bg-blue-700 border border-blue-600 shadow-md' 
      : 'bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-600 hover:text-white shadow-md',
  
  // Botões secundários
  btnSecondary: (darkActive: boolean) => 
    darkActive 
      ? 'bg-gray-800 text-white hover:bg-gray-700' 
      : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
  
  // Sombras
  shadow: (darkActive: boolean) => 
    darkActive ? 'shadow-lg' : 'shadow-md',
  
  // Logo
  logo: (darkActive: boolean) => 
    darkActive ? 'invert brightness-0' : '',

    input: (darkActive: boolean, hasError: boolean = false) => 
    `flex h-10 w-full rounded-md border px-3 py-2 text-sm placeholder:text-neutral-500 
     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
     ${hasError ? 'border-red-500 ring-red-500' : themeClasses.border(darkActive)}
     ${themeClasses.bg(darkActive)}
     ${themeClasses.text(darkActive)}`
};