import { PaymentAction, SolanaPayUrl } from "../../types";
import { ApiClient } from "../../utils/api";


export class PaymentService {
  constructor(private apiClient: ApiClient) {}

  async getPaymentAction(data: PaymentAction): Promise<PaymentAction> {
    return this.apiClient.get<PaymentAction>('/payment/actions', data);
  }

  async createPaymentAction(accountPublicKey: string): Promise<any> {
    return this.apiClient.post<any>('/payment/actions', { account: accountPublicKey });
  }

  async createSolanaPayLink(data: any): Promise<SolanaPayUrl> {
    return this.apiClient.post<SolanaPayUrl>('/payment/solana-pay', data);
  }
}