var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class VendorService {
    constructor(apiClient) {
        this.apiClient = apiClient;
    }
    createVendor(vendorData) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.apiClient.post('/vendors', vendorData);
        });
    }
    getVendors() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.apiClient.get('/vendors');
        });
    }
    getVendor(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.apiClient.get(`/vendors/${id}`);
        });
    }
    deleteVendor(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.apiClient.delete(`/vendors/${id}`);
        });
    }
}
//# sourceMappingURL=Vendor.js.map