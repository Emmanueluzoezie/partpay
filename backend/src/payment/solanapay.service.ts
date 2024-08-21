import { Injectable } from '@nestjs/common';
import { PublicKey, Connection, Keypair } from "@solana/web3.js";
import { encodeURL, createTransfer, validateTransfer } from "@solana/pay";
import BigNumber from 'bignumber.js';
import { GenerateUrlType } from '../types/solanaPay';
import * as QRCode from 'qrcode';

@Injectable()
export class SolanaPayService {
    private QRCode: any;

    constructor() {
        import('qrcode').then(module => {
            this.QRCode = module.default || module;
        });
    }

    async generatePaymentUrl(data: GenerateUrlType): Promise<string> {
        try {
            if (!this.QRCode) {
                await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for QRCode to load
                if (!this.QRCode) {
                    throw new Error('QRCode module not loaded');
                }
            }

            const reference = Keypair.generate().publicKey;

            const urlParams = {
                recipient: new PublicKey(data.recipient),
                amount: new BigNumber(data.amount),
                reference: new PublicKey(reference.toBase58()),
                label: data.label,
                message: `Payment for Equipment ID: ${data.equipmentId}`,
                memo: data.memo
            };

            const solanaUrl = encodeURL(urlParams);
            
            // Generate QR code as a data URL
            const qrCodeDataUrl = await this.QRCode.toDataURL(solanaUrl.toString(), {
                width: 300,
                margin: 2,
                color: {
                    dark: '#000000',
                    light: '#ffffff'
                }
            });

            return qrCodeDataUrl;
        } catch (error) {
            console.error('Error generating payment URL:', error);
            throw error;
        }
    }

    async createPaymentTransaction(connectionUrl: string, paymentData: any) {
        const connection = new Connection(connectionUrl);
        const { recipient, amount, reference, memo } = paymentData;

        const recipientPublicKey = new PublicKey(recipient);
        const referencePublicKey = new PublicKey(reference);

        const transaction = await createTransfer(
            connection,
            recipientPublicKey,
            {
                recipient: recipient,
                amount: amount,
                reference: reference,
                memo: memo
            }
        );

        return transaction;
    }

    // async validatePayment(connectionUrl: string, reference: string, recipient: string, amount: number): Promise<boolean> {
    //     const connection = new Connection(connectionUrl);
    //     const referencePublicKey = new PublicKey(reference);
    //     const recipientPublicKey = new PublicKey(recipient);

    //     const signatureInfo = await findTransactionSignature(connection, referencePublicKey);
    //     if (!signatureInfo) {
    //         return false;
    //     }

    //     const { signature } = signatureInfo;

    //     try {
    //         await validateTransfer(
    //             connection,
    //             signature,
    //             {
    //                 recipient: recipientPublicKey,
    //                 amount: new BigNumber(amount),
    //                 reference: referencePublicKey,
    //             }
    //         );
    //         return true;
    //     } catch (error) {
    //         console.error('Payment validation failed:', error);
    //         return false;
    //     }
    // }
}