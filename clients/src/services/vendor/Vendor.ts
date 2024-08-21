import { Vendor } from "../../types";
import { ApiClient } from "../../utils/api";


export class VendorService {
  constructor(private apiClient: ApiClient) {}

  async createVendor(vendorData: Omit<Vendor, 'id'>): Promise<Vendor> {
    return this.apiClient.post<Vendor>('/vendors', vendorData);
  }

  async getVendors(): Promise<Vendor[]> {
    return this.apiClient.get<Vendor[]>('/vendors');
  }

  async getVendor(id: string): Promise<Vendor> {
    return this.apiClient.get<Vendor>(`/vendors/${id}`);
  }

  async deleteVendor(id: string): Promise<{ message: string }> {
    return this.apiClient.delete<{ message: string }>(`/vendors/${id}`);
  }
}