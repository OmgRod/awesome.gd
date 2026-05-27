import { createContext, useContext } from 'react';

export const GuidesContext = createContext({});

export function useGuidesContext() {
  return useContext(GuidesContext);
}
