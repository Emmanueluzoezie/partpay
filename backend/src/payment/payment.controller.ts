import { Controller, Get, Post, Options, Body, Query, HttpException, HttpStatus, UseInterceptors, HttpCode } from '@nestjs/common';
import { ActionPostRequest, ActionGetResponse, ActionPostResponse, ACTIONS_CORS_HEADERS } from '@solana/actions';
import { CorsInterceptor } from './cors.interface';
import { PaymentsService } from './payment.service';
import { SolanaPayService } from './solanapay.service';
import { PaymentActionType } from '../types/payment';
import { GenerateUrlType } from '../types/solanaPay';

@Controller('payment')
@UseInterceptors(CorsInterceptor)
export class PaymentsController {
  constructor(
    private readonly paymentsService: PaymentsService,
    private readonly solanaPayService: SolanaPayService
  ) { }

  @Get("/actions")
  async getPaymentAction(@Query() data: PaymentActionType): Promise<ActionGetResponse> {
    return this.paymentsService.getPaymentActionMetadata(data);
  }

  @Post("/actions")
async createPaymentAction(@Body() body: ActionPostRequest): Promise<ActionPostResponse> {
  try {
    if (!body.account) {
      throw new HttpException('Account is required', HttpStatus.BAD_REQUEST);
    }
    return await this.paymentsService.createPaymentAction(body);
  } catch (error) {
    console.error('Error in createPaymentAction:', error);
    throw new HttpException(error.message || 'An unknown error occurred', HttpStatus.BAD_REQUEST);
  }
}

  @Post("/solana-pay")
  @HttpCode(HttpStatus.OK)  // This explicitly sets the status code to 200
  async createSolanaPayLink(@Body() data: GenerateUrlType): Promise<string> {
    try {
      const qrCodeUrl = await this.solanaPayService.generatePaymentUrl(data);
      return qrCodeUrl;
    } catch (error) {
      throw new HttpException(error.message || 'An unknown error occurred', HttpStatus.BAD_REQUEST);
    }
  }

  @Options()
  handleOptions() {
    return '';
  }
}