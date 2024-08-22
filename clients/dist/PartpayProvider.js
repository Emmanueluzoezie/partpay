import React, { createContext, useContext } from 'react';
import { PartpaySDK } from './sdk';
const PartpayContext = createContext(undefined);
export const PartpayProvider = ({ children, apiKey, baseURL = 'https://equippay-production.up.railway.app' }) => {
    const sdk = new PartpaySDK(baseURL, apiKey);
    return (React.createElement(PartpayContext.Provider, { value: { sdk } }, children));
};
export const usePartpay = () => {
    const context = useContext(PartpayContext);
    if (context === undefined) {
        throw new Error('usePartpay must be used within an PartpayProvider');
    }
    return context.sdk;
};
//# sourceMappingURL=PartpayProvider.js.map