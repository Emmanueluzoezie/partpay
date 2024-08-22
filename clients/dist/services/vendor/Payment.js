var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class PaymentService {
    constructor(apiClient) {
        this.apiClient = apiClient;
    }
    getPaymentAction(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.apiClient.get('/payment/actions', data);
        });
    }
    createPaymentAction(accountPublicKey) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.apiClient.post('/payment/actions', { account: accountPublicKey });
        });
    }
    createSolanaPayLink(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.apiClient.post('/payment/solana-pay', data);
        });
    }
}
//# sourceMappingURL=Payment.js.map