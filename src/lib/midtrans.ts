import { createHash } from "crypto";

// Some Midtrans merchant accounts issue sandbox keys without the conventional
// "SB-" prefix, so the environment can't be reliably guessed from the key
// string — it must be set explicitly. Defaults to sandbox (safer default:
// never silently hits production without an explicit opt-in).
function isSandbox() {
  return process.env.MIDTRANS_IS_PRODUCTION !== "true";
}

function snapBaseUrl() {
  return isSandbox() ? "https://app.sandbox.midtrans.com" : "https://app.midtrans.com";
}

function coreBaseUrl() {
  return isSandbox() ? "https://api.sandbox.midtrans.com" : "https://api.midtrans.com";
}

function authHeader() {
  const key = process.env.MIDTRANS_SERVER_KEY ?? "";
  return `Basic ${Buffer.from(`${key}:`).toString("base64")}`;
}

export interface SnapItemDetail {
  id: string;
  price: number;
  quantity: number;
  name: string;
}

export interface CreateSnapTransactionParams {
  orderId: string;
  amount: number;
  customer: { first_name: string; email: string; phone?: string };
  items?: SnapItemDetail[];
}

export async function createSnapTransaction({
  orderId,
  amount,
  customer,
  items,
}: CreateSnapTransactionParams): Promise<{ token: string; redirectUrl: string }> {
  const body: Record<string, unknown> = {
    transaction_details: { order_id: orderId, gross_amount: amount },
    customer_details: customer,
  };
  if (items?.length) body.item_details = items;

  const res = await fetch(`${snapBaseUrl()}/snap/v1/transactions`, {
    method: "POST",
    headers: {
      Authorization: authHeader(),
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`Midtrans Snap transaction failed (${res.status}): ${await res.text()}`);
  }

  const data = await res.json();
  return { token: data.token, redirectUrl: data.redirect_url };
}

export interface MidtransTransactionStatus {
  order_id: string;
  status_code: string;
  gross_amount: string;
  transaction_status: string;
  fraud_status?: string;
}

export async function getTransactionStatus(orderId: string): Promise<MidtransTransactionStatus> {
  const res = await fetch(`${coreBaseUrl()}/v2/${encodeURIComponent(orderId)}/status`, {
    headers: { Authorization: authHeader(), Accept: "application/json" },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Midtrans status check failed (${res.status}): ${await res.text()}`);
  }

  return res.json();
}

export function isTransactionSuccess(status: MidtransTransactionStatus): boolean {
  if (status.transaction_status === "settlement") return true;
  return status.transaction_status === "capture" && status.fraud_status === "accept";
}

export function isTransactionFailed(status: MidtransTransactionStatus): boolean {
  return ["deny", "cancel", "expire", "failure"].includes(status.transaction_status);
}

export function verifyMidtransSignature(params: {
  order_id: string;
  status_code: string;
  gross_amount: string;
  signature_key: string;
}): boolean {
  const serverKey = process.env.MIDTRANS_SERVER_KEY ?? "";
  const expected = createHash("sha512")
    .update(`${params.order_id}${params.status_code}${params.gross_amount}${serverKey}`)
    .digest("hex");
  return expected === params.signature_key;
}
