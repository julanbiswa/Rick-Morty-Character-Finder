import { useState} from "react";
import { ThemeContext} from "./ThemeContext";
import type { ReactNode } from "react";


interface ThemeProviderProps {
  children: ReactNode;
}


export const ThemeProvider = ({ children }: ThemeProviderProps) => {

  const [Dark, setDark] = useState(false);

  function toggleDark(){
        setDark(prev=>!prev)
  }
  
  return <ThemeContext.Provider value={{Dark,toggleDark}}>{children}</ThemeContext.Provider>;
};