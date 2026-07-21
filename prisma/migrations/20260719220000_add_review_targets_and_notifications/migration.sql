-- CreateEnum
CREATE TYPE "public"."ReviewTargetType" AS ENUM ('PRODUCT', 'CLASS_SESSION', 'PT_BOOKING');

-- CreateEnum
CREATE TYPE "public"."NotificationType" AS ENUM ('BOOKING', 'PAYMENT', 'PT', 'PROMO', 'SYSTEM');

-- Review table is confirmed empty (never wired to any UI) — safe to drop and recreate
-- with the new multi-target shape rather than a fiddly in-place ALTER sequence.
-- DropForeignKey
ALTER TABLE "public"."Review" DROP CONSTRAINT IF EXISTS "Review_userId_fkey";
ALTER TABLE "public"."Review" DROP CONSTRAINT IF EXISTS "Review_productId_fkey";

-- DropTable
DROP TABLE "public"."Review";

-- CreateTable
CREATE TABLE "public"."Review" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "targetType" "public"."ReviewTargetType" NOT NULL,
    "productId" TEXT,
    "classSessionId" TEXT,
    "ptBookingId" TEXT,
    "rating" INTEGER NOT NULL DEFAULT 5,
    "comment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Review_userId_productId_key" ON "public"."Review"("userId", "productId");

-- CreateIndex
CREATE UNIQUE INDEX "Review_userId_classSessionId_key" ON "public"."Review"("userId", "classSessionId");

-- CreateIndex
CREATE UNIQUE INDEX "Review_userId_ptBookingId_key" ON "public"."Review"("userId", "ptBookingId");

-- CreateIndex
CREATE INDEX "Review_productId_idx" ON "public"."Review"("productId");

-- CreateIndex
CREATE INDEX "Review_classSessionId_idx" ON "public"."Review"("classSessionId");

-- CreateIndex
CREATE INDEX "Review_ptBookingId_idx" ON "public"."Review"("ptBookingId");

-- AddForeignKey
ALTER TABLE "public"."Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Review" ADD CONSTRAINT "Review_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Review" ADD CONSTRAINT "Review_classSessionId_fkey" FOREIGN KEY ("classSessionId") REFERENCES "public"."ClassSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Review" ADD CONSTRAINT "Review_ptBookingId_fkey" FOREIGN KEY ("ptBookingId") REFERENCES "public"."PTBooking"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Invariant: exactly one of the three target FKs must be set, matching `targetType`.
-- Prisma has no declarative CHECK-constraint syntax, so this is hand-appended
-- (same precedent as the RLS migration's hand-written raw SQL).
ALTER TABLE "public"."Review" ADD CONSTRAINT "review_exactly_one_target"
  CHECK (num_nonnulls("productId", "classSessionId", "ptBookingId") = 1);

-- CreateTable
CREATE TABLE "public"."Notification" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "public"."NotificationType" NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "starred" BOOLEAN NOT NULL DEFAULT false,
    "sourceId" TEXT,
    "actionUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Notification_userId_type_sourceId_key" ON "public"."Notification"("userId", "type", "sourceId");

-- CreateIndex
CREATE INDEX "Notification_userId_createdAt_idx" ON "public"."Notification"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "Notification_userId_read_idx" ON "public"."Notification"("userId", "read");

-- AddForeignKey
ALTER TABLE "public"."Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Close the same public-PostgREST hole as every other table (see the
-- 20260719210000_enable_rls_all_tables migration) — no policies needed since
-- the app only ever reads/writes this table via Prisma as the table owner.
ALTER TABLE "public"."Notification" ENABLE ROW LEVEL SECURITY;
