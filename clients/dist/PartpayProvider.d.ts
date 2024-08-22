import React, { ReactNode } from 'react';
import { PartpaySDK } from './sdk';
interface PartpayProviderProps {
    children: ReactNode;
    apiKey: string;
    baseURL?: string;
}
export declare const PartpayProvider: React.FC<PartpayProviderProps>;
export declare const usePartpay: () => PartpaySDK;
export {};
//# sourceMappingURL=PartpayProvider.d.ts.map