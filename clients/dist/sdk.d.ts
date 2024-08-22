import { EquipmentService } from './services/vendor/Equipment';
import { PaymentService } from './services/vendor/Payment';
import { VendorService } from './services/vendor/Vendor';
export declare class PartpaySDK {
    vendor: VendorService;
    equipment: EquipmentService;
    payment: PaymentService;
    constructor(baseURL: string, apiKey: string);
}
//# sourceMappingURL=sdk.d.ts.map