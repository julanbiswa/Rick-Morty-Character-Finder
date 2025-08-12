import { createContext } from "react";


export interface ThemeContextType {
  Dark: boolean;
  toggleDark: () => void;
}

// Create the context with a default null value
export const ThemeContext = createContext<ThemeContextType>({Dark:false,toggleDark:()=>{}});