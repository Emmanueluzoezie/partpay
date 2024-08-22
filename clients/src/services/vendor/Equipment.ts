import { ApiClient } from '../../utils/api';
import { Equipment } from '../../types';

export class EquipmentService {
  constructor(private apiClient: ApiClient) {}

  async createEquipment(equipmentData: Omit<Equipment, 'id'>): Promise<Equipment> {
    return this.apiClient.post<Equipment>('/equipments', equipmentData);
  }

  async getEquipment(id: string): Promise<Equipment> {
    return this.apiClient.get<Equipment>(`/equipments?id=${id}`);
  }

  async getAllVendorEquipments(vendorId: string): Promise<Equipment[]> {
    return this.apiClient.get<Equipment[]>(`/equipments?vendorId=${vendorId}`);
  }
}