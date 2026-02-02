
import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      if (typeof window === 'undefined' || typeof window.localStorage === 'undefined') return 'light';
      const saved = window.localStorage.getItem('theme');
      return (saved as Theme) || 'light';
    } catch (err) {
      return 'light';
    }
  });

  useEffect(() => {
    const root = typeof window !== 'undefined' ? window.document.documentElement : null;
    if (root) {
      if (theme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }

    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem('theme', theme);
      }
    } catch (err) {
      // ignore in server or restricted environments
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
