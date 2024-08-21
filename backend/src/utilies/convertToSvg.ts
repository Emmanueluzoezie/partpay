export function qrCodeToSvgString(qrCode: any): Promise<string> {
    return new Promise((resolve) => {
      qrCode.update({ type: 'svg' });
      qrCode.getRawData((data: string) => {
        resolve(data);
      });
    });
  }