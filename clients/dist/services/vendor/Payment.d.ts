import { PaymentAction, SolanaPayUrl } from "../../types";
import { ApiClient } from "../../utils/api";
export declare class PaymentService {
    private apiClient;
    constructor(apiClient: ApiClient);
    getPaymentAction(data: PaymentAction): Promise<PaymentAction>;
    createPaymentAction(accountPublicKey: string): Promise<any>;
    createSolanaPayLink(data: any): Promise<SolanaPayUrl>;
}
//# sourceMappingURL=Payment.d.ts.map