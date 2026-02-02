import React, { createContext, ReactNode, useContext } from 'react';

type SSRData = any;

const SSRDataContext = createContext<SSRData | null>(null);

export const SSRDataProvider: React.FC<{ data: SSRData, children: ReactNode }> = ({ data, children }) => {
  return (
    <SSRDataContext.Provider value={data}>
      {children}
    </SSRDataContext.Provider>
  );
};

export const useSSRData = () => useContext(SSRDataContext);

export default SSRDataContext;
