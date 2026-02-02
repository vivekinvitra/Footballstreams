import React, { createContext, ReactNode, useContext, useRef, useEffect } from 'react';

type Collector = string[];

const HeadContext = createContext<{ add: (tag: string) => void }>({ add: () => {} });

export const HeadProvider: React.FC<{ collector?: Collector; children: ReactNode }> = ({ collector, children }) => {
  const clientApplied = useRef(false);

  const add = (tag: string) => {
    if (collector) {
      // server-side: collect head tags
      collector.push(tag);
    } else if (typeof window !== 'undefined') {
      // client-side: append to document.head
      try {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = tag;
        Array.from(wrapper.children).forEach(el => document.head.appendChild(el));
      } catch (err) {
        // ignore
      }
    }
  };

  // Avoid double-applying client head changes when hydrating
  useEffect(() => {
    clientApplied.current = true;
  }, []);

  return (
    <HeadContext.Provider value={{ add }}>
      {children}
    </HeadContext.Provider>
  );
};

export const useHead = () => useContext(HeadContext);

export default HeadContext;
