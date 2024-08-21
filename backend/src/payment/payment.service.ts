import { Injectable } from '@nestjs/common';
import {
  ActionGetResponse,
  MEMO_PROGRAM_ID,
  createPostResponse,
  ActionPostResponse,
  ActionPostRequest,
} from "@solana/actions";
import {
  Transaction,
  PublicKey,
  TransactionInstruction,
  ComputeBudgetProgram,
  Connection,
  clusterApiUrl,
} from "@solana/web3.js";
import { PaymentActionType } from '../types/payment';

@Injectable()
export class PaymentsService {

  getPaymentActionMetadata(data: PaymentActionType): ActionGetResponse {
    return {
      type: "action",
      icon: data.icon,
      description: data.description,
      title: data.title,
      label: data.label,
    };
  }

  async createPaymentAction(data: ActionPostRequest): Promise<ActionPostResponse> {
    const receiver: PublicKey = new PublicKey(data.account);

    
    const transaction = new Transaction();
    transaction.add(
      ComputeBudgetProgram.setComputeUnitPrice({
        microLamports: 1000,
      }),
      new TransactionInstruction({
        programId: new PublicKey(MEMO_PROGRAM_ID),
        data: Buffer.from("this is a simple message", "utf8"),
        keys: [],
      })
    );
    transaction.feePayer = receiver;
    const connection = new Connection(clusterApiUrl("devnet"));
    transaction.recentBlockhash = (
      await connection.getLatestBlockhash()
    ).blockhash;

    return await createPostResponse({
      fields: {
        transaction,
      },
    });
  }

}