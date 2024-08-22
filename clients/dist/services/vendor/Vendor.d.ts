import { Vendor } from "../../types";
import { ApiClient } from "../../utils/api";
export declare class VendorService {
    private apiClient;
    constructor(apiClient: ApiClient);
    createVendor(vendorData: Omit<Vendor, 'id'>): Promise<Vendor>;
    getVendors(): Promise<Vendor[]>;
    getVendor(id: string): Promise<Vendor>;
    deleteVendor(id: string): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=Vendor.d.ts.map