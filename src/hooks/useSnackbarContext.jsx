import { useContext, createContext } from 'react';

export const SnackbarContext = createContext();
export default function useAppContext() {
  return useContext(SnackbarContext);
}
