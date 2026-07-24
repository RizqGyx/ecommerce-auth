import { NextResponse } from "next/server";
import { verifyMidtransSignature, isTransactionSuccess, isTransactionFailed } from "@/lib/midtrans";
import { fulfillPaymentIntent } from "@/lib/paymentIntent";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();

  const valid = verifyMidtransSignature({
    order_id: body.order_id,
    status_code: body.status_code,
    gross_amount: body.gross_amount,
    signature_key: body.signature_key,
  });

  if (!valid) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 403 });
  }

  const status = {
    order_id: body.order_id as string,
    status_code: body.status_code as string,
    gross_amount: body.gross_amount as string,
    transaction_status: body.transaction_status as string,
    fraud_status: body.fraud_status as string | undefined,
  };

  if (isTransactionSuccess(status)) {
    await fulfillPaymentIntent(status.order_id);
  } else if (isTransactionFailed(status)) {
    await prisma.paymentIntent.updateMany({
      where: { id: status.order_id, status: "PENDING" },
      data: { status: "FAILED" },
    });
  }

  return NextResponse.json({ received: true });
}
