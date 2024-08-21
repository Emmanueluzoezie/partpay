import type {
    CornerDotType,
    CornerSquareType,
    DotType,
    DrawType,
    ErrorCorrectionLevel,
    Mode,
    Options,
    TypeNumber,
} from '@solana/qr-code-styling';
import QRCodeStyling from '@solana/qr-code-styling';

export function createQR(
    url: string | URL,
    size = 512,
    background = 'none',
    color = 'black',
    image: string
): QRCodeStyling {
    return new QRCodeStyling(createQROptions(url, size, background, color, image));
}

/** @ignore */
export function createQROptions(
    url: string | URL,
    size = 510,
    background = "none",
    color = 'black',
    image: string
): Options {
    return {
        type: 'svg' as DrawType,
        width: size,
        height: size,
        data: String(url),
        margin: 16,
        qrOptions: {
            typeNumber: 0 as TypeNumber,
            mode: 'Byte' as Mode,
            errorCorrectionLevel: 'Q' as ErrorCorrectionLevel,
        },
        backgroundOptions: { color: background },
        dotsOptions: { type: 'extra-rounded' as DotType, color },
        cornersSquareOptions: {
            type: 'extra-rounded' as CornerSquareType,
            color,
        },
        cornersDotOptions: { type: 'square' as CornerDotType, color },
        imageOptions: { hideBackgroundDots: true, imageSize: 0.3, margin: 0 },
        image: image,
    };
}

