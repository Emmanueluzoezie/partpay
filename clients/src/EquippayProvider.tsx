import React, { createContext, useContext, ReactNode } from 'react';
import { EquippaySDK } from './sdk';

interface EquippayContextType {
  sdk: EquippaySDK;
}

const EquippayContext = createContext<EquippayContextType | undefined>(undefined);

interface EquippayProviderProps {
  children: ReactNode;
  apiKey: string;
  baseURL?: string;
}

export const EquippayProvider: React.FC<EquippayProviderProps> = ({ 
  children, 
  apiKey, 
  baseURL = 'https://partpay.io'
}) => {
  const sdk = new EquippaySDK(baseURL, apiKey);

  return (
    <EquippayContext.Provider value={{ sdk }}>
      {children}
    </EquippayContext.Provider>
  );
};

export const useEquippay = () => {
  const context = useContext(EquippayContext);
  if (context === undefined) {
    throw new Error('useEquippay must be used within an EquippayProvider');
  }
  return context.sdk;
};