import React, { createContext, useContext, ReactNode } from 'react';
import { PartpaySDK } from './sdk';

interface PartpayContextType {
  sdk: PartpaySDK;
}

const PartpayContext = createContext<PartpayContextType | undefined>(undefined);

interface PartpayProviderProps {
  children: ReactNode;
  apiKey: string;
  baseURL?: string;
}

export const PartpayProvider: React.FC<PartpayProviderProps> = ({ 
  children, 
  apiKey, 
  baseURL = 'https://equippay-production.up.railway.app'
}) => {
  const sdk = new PartpaySDK(baseURL, apiKey);

  return (
    <PartpayContext.Provider value={{ sdk }}>
      {children}
    </PartpayContext.Provider>
  );
};

export const usePartpay = () => {
  const context = useContext(PartpayContext);
  if (context === undefined) {
    throw new Error('usePartpay must be used within an PartpayProvider');
  }
  return context.sdk;
};