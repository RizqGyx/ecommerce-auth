import Link from "next/link";
import { notFound } from "next/navigation";
import { Package, ArrowRight, ShoppingBag, PackageCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import ProductReviewPrompt from "@/components/organisms/ProductReviewPrompt";
import CelebrationBurst from "@/components/atoms/CelebrationBurst";

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string }>;
}) {
  const { orderId } = await searchParams;
  const session = await auth();
  if (!session?.user || !orderId) notFound();

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { payment: true, items: { include: { product: true } } },
  });

  if (!order || order.userId !== session.user.id) notFound();

  const existingReviews = await prisma.review.findMany({
    where: { userId: session.user.id, productId: { in: order.items.map((i) => i.productId) } },
  });
  const reviewedProductIds = new Set(existingReviews.map((r) => r.productId).filter((id): id is string => id !== null));

  const methodName = order.payment?.method ?? "Pembayaran";

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center px-6 pb-16">
      <div className="max-w-md w-full text-center">
        {/* Success icon — package sealed & ready to ship */}
        <div className="relative mb-6 inline-block">
          <CelebrationBurst colors={["#2ecf76", "#00b8ff", "#facc15"]} />
          <div className="relative w-24 h-24 rounded-full bg-green-400/10 border-2 border-green-400/30 flex items-center justify-center mx-auto animate-success-pop">
            <PackageCheck size={44} className="text-green-400" />
          </div>
          <div className="absolute inset-0 rounded-full animate-ping bg-green-400/10" />
        </div>

        <h1 className="text-3xl font-black mb-2">Pesanan Dikemas! 📦</h1>
        <p className="text-muted-foreground mb-8">
          Pembayaran via <strong className="text-foreground">{methodName}</strong> telah dikonfirmasi.
          Tim S-One Store akan segera memproses pesananmu.
        </p>

        {/* Order card */}
        <div className="glass rounded-2xl border border-green-400/20 p-6 text-left mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-xl bg-green-400/10">
              <Package size={20} className="text-green-400" />
            </div>
            <div>
              <div className="font-bold">Nomor Pesanan</div>
              <div className="font-mono text-primary text-sm">{order.id}</div>
            </div>
          </div>

          <div className="space-y-2 text-sm border-t border-border/20 pt-4">
            <div className="flex justify-between text-muted-foreground">
              <span>Metode Pembayaran</span>
              <span className="text-foreground font-medium">{methodName}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Total Dibayar</span>
              <span className="text-primary font-bold">Rp {order.total.toLocaleString("id-ID")}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Status</span>
              <span className="text-green-400 font-semibold">Dikonfirmasi ✓</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="hero" className="flex-1" asChild>
            <Link href="/orders">
              Lacak Pesanan <ArrowRight size={16} />
            </Link>
          </Button>
          <Button variant="neon" className="flex-1" asChild>
            <Link href="/shop">
              <ShoppingBag size={16} /> Belanja Lagi
            </Link>
          </Button>
        </div>

        <ProductReviewPrompt
          orderId={order.id}
          items={order.items.map((i) => ({ productId: i.productId, name: i.product.name }))}
          reviewedProductIds={Array.from(reviewedProductIds)}
        />

        <p className="text-xs text-muted-foreground mt-6">
          Invoice dikirim ke email terdaftar. Cek spam jika tidak muncul dalam 5 menit.
        </p>
      </div>
    </div>
  );
}
