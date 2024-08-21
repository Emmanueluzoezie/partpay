import { Injectable, Logger } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class EncryptionService {
  private readonly logger = new Logger(EncryptionService.name);
  private readonly algorithm = 'aes-256-cbc';
  private readonly key: Buffer;

  constructor() {
    if (!process.env.ENCRYPTION_KEY) {
      throw new Error('ENCRYPTION_KEY environment variable is not set');
    }
    this.key = crypto.createHash('sha256').update(String(process.env.ENCRYPTION_KEY)).digest();
  }

  private deriveIV(apiKey: string): Buffer {
    return crypto.createHash('sha256').update(apiKey).digest().slice(0, 16);
  }

  encrypt(apiKey: string): string {
    const iv = this.deriveIV(apiKey);
    const cipher = crypto.createCipheriv(this.algorithm, this.key, iv);
    let encrypted = cipher.update(apiKey, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const encryptedData = `${iv.toString('hex')}:${encrypted}`;
    this.logger.debug(`Encrypted API key: ${encryptedData}`); // Added logging
    return encryptedData;
  }

  decrypt(encryptedData: string): string {
    try {
      this.logger.debug(`Attempting to decrypt: ${encryptedData}`);
      
      if (!encryptedData.includes(':')) {
        throw new Error('Invalid encrypted data format. Expected IV:EncryptedData');
      }
  
      const [ivHex, encryptedApiKey] = encryptedData.split(':');
      
      if (!ivHex || !encryptedApiKey) {
        throw new Error('Invalid encrypted data format. Missing IV or encrypted data.');
      }
  
      this.logger.debug(`IV: ${ivHex}, Encrypted API Key: ${encryptedApiKey}`);
  
      const iv = Buffer.from(ivHex, 'hex');
      const decipher = crypto.createDecipheriv(this.algorithm, this.key, iv);
      let decrypted = decipher.update(encryptedApiKey, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      
      this.logger.debug(`Successfully decrypted. Result: ${decrypted}`);
      return decrypted;
    } catch (error) {
      this.logger.error(`Decryption failed: ${error.message}`);
      throw error;
    }
  }
}