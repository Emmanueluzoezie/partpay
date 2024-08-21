export interface Vendor {
    id: string;
    createdAt?: string;
    fullName: string;
    shopName?: string;
    description: string;
    wallet: string;
    location?: string;
    phoneNumber?: string;
    email?: string;
    status: boolean;
    businessType?: string;
    socialMedia?: Record<string, any>;
    operatingHours?: Record<string, any>;
}

export interface Equipment {
    id: string;
    createdAt: string;
    updatedAt: string;
    equipmentName: string;
    description: string;
    sku?: string;
    category?: string;
    brand?: string;
    oneOffPrice: number;
    installmentPrice?: number;
    numberOfInstallments?: number;
    currency: string;
    stockQuantity: number;
    isActive: boolean;
    images: string[];
    weight?: number;
    dimensions?: string;
    vendorId: string;
    insuranceId?: string;
    paymentTypes: []
}

export interface PaymentAction {
    icon: string;
    description: string;
    title: string;
    label: string;
  }
  
  export interface SolanaPayUrl {
    url: string;
  }