-- CreateEnum
CREATE TYPE "PaymentInstallment" AS ENUM ('ONE', 'TWO', 'THREE', 'FOUR');

-- CreateEnum
CREATE TYPE "PaymentStructure" AS ENUM ('FULL', 'QUARTER', 'HALF', 'HALF_QUARTER');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PAID', 'OVERDUE', 'CANCELLED', 'FAILED');

-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('EQUIPMENT_PURCHASE', 'EQUIPMENT_INSTALLMENT', 'PLATFORM_FEE', 'REFUND', 'OTHER');

-- CreateEnum
CREATE TYPE "EntityType" AS ENUM ('VENDOR', 'BORROWER', 'LENDER', 'PLATFORM', 'OTHER');

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "apiKey" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "userName" TEXT,
    "password" TEXT,
    "admin" BOOLEAN NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USDC',
    "dueDate" TIMESTAMP(3),
    "paidDate" TIMESTAMP(3),
    "status" "PaymentStatus" NOT NULL,
    "type" "PaymentType" NOT NULL,
    "fromId" TEXT NOT NULL,
    "fromType" "EntityType" NOT NULL,
    "toId" TEXT NOT NULL,
    "toType" "EntityType" NOT NULL,
    "equipmentId" TEXT,
    "transactionHash" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vendor" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fullName" TEXT NOT NULL,
    "shopName" TEXT,
    "description" TEXT NOT NULL,
    "transaction" TEXT NOT NULL,
    "wallet" TEXT NOT NULL,
    "collectionPubkey" TEXT NOT NULL,
    "uri" TEXT NOT NULL,
    "location" TEXT,
    "phoneNumber" TEXT,
    "email" TEXT,
    "status" BOOLEAN NOT NULL,
    "businessType" TEXT,
    "socialMedia" JSONB,
    "operatingHours" JSONB,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "Vendor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Equipment" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "equipmentName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "sku" TEXT,
    "category" TEXT,
    "brand" TEXT,
    "oneOffPrice" DOUBLE PRECISION NOT NULL,
    "installmentPrice" DOUBLE PRECISION,
    "numberOfInstallments" INTEGER,
    "currency" TEXT NOT NULL DEFAULT 'USDC',
    "stockQuantity" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "images" TEXT[],
    "weight" DOUBLE PRECISION,
    "dimensions" TEXT,
    "assetPubkey" TEXT NOT NULL,
    "uri" TEXT NOT NULL,
    "transaction" TEXT NOT NULL,
    "vendorId" TEXT NOT NULL,
    "insuranceId" TEXT,
    "paymentTypes" "PaymentType"[],

    CONSTRAINT "Equipment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InstallmentPlan" (
    "id" TEXT NOT NULL,
    "equipmentId" TEXT NOT NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "remainingAmount" DOUBLE PRECISION NOT NULL,
    "transaction" TEXT NOT NULL,
    "numberOfInstallments" INTEGER NOT NULL,
    "paymentFrequency" TEXT NOT NULL,
    "nextPaymentDue" TIMESTAMP(3) NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "InstallmentPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SoldEquipment" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "productId" TEXT NOT NULL,
    "vendorId" TEXT NOT NULL,
    "borrowerId" TEXT NOT NULL,
    "isPaymentComplete" BOOLEAN NOT NULL,

    CONSTRAINT "SoldEquipment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Insurance" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "provider" TEXT NOT NULL,
    "policyNumber" TEXT NOT NULL,
    "coverageAmount" DOUBLE PRECISION NOT NULL,
    "expirationDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Insurance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_apiKey_key" ON "Project"("apiKey");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Equipment_sku_key" ON "Equipment"("sku");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vendor" ADD CONSTRAINT "Vendor_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Equipment" ADD CONSTRAINT "Equipment_insuranceId_fkey" FOREIGN KEY ("insuranceId") REFERENCES "Insurance"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstallmentPlan" ADD CONSTRAINT "InstallmentPlan_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "Equipment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
