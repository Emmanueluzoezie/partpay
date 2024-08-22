import { ApiClient } from '../../utils/api';
import { Equipment } from '../../types';
export declare class EquipmentService {
    private apiClient;
    constructor(apiClient: ApiClient);
    createEquipment(equipmentData: Omit<Equipment, 'id'>): Promise<Equipment>;
    getEquipment(id: string): Promise<Equipment>;
    getAllEquipment(vendorId: string): Promise<Equipment[]>;
}
//# sourceMappingURL=Equipment.d.ts.map