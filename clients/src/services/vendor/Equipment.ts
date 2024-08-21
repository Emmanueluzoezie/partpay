import { ApiClient } from '../../utils/api';
import { Equipment } from '../../types';

export class EquipmentService {
  constructor(private apiClient: ApiClient) {}

  async createEquipment(equipmentData: Omit<Equipment, 'id'>): Promise<Equipment> {
    return this.apiClient.post<Equipment>('/equipment', equipmentData);
  }

  async getEquipment(id: string): Promise<Equipment> {
    return this.apiClient.get<Equipment>(`/equipment/get_equipment?id=${id}`);
  }

  async getAllEquipment(vendorId: string): Promise<Equipment[]> {
    return this.apiClient.get<Equipment[]>(`/equipment/vendor/${vendorId}`);
  }
}