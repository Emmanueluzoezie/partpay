export interface CreateCollection {
    image: string
    fullName: string
    shopName: string
    description: string
    wallet: string
    businessType?: string
}

export interface CreateNft {
    brand?: string
    category?: string
    description: string
    equipmentName: string
    installmentPrice?: number
    numberOfInstallments?: number
    stockQuantity: number
    oneOffPrice: number
    isActive: boolean
    currency: string
    image: string
    images: string[]
    collectionPubkey: string
    wallet: string
    businessType?: string
    weight?: number
    dimensions?: string
    sku: string
}