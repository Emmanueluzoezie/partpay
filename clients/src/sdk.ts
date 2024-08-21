import { ApiClient } from './utils/api';
import { EquipmentService } from './services/vendor/Equipment';
import { PaymentService } from './services/vendor/Payment';
import { VendorService } from './services/vendor/Vendor';

export class EquippaySDK {
  public vendor: VendorService;
  public equipment: EquipmentService;
  public payment: PaymentService;

  constructor(baseURL: string, apiKey: string) {
    const apiClient = new ApiClient(baseURL, apiKey);
    this.vendor = new VendorService(apiClient);
    this.equipment = new EquipmentService(apiClient);
    this.payment = new PaymentService(apiClient);
  }
}