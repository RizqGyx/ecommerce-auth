-- CreateEnum
CREATE TYPE "public"."PaymentIntentType" AS ENUM ('SHOP', 'CLASS_BOOKING', 'PT_BOOKING', 'MEMBERSHIP');

-- CreateEnum
CREATE TYPE "public"."PaymentIntentStatus" AS ENUM ('PENDING', 'SUCCESS', 'FAILED');

-- CreateTable
CREATE TABLE "public"."PaymentIntent" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "public"."PaymentIntentType" NOT NULL,
    "status" "public"."PaymentIntentStatus" NOT NULL DEFAULT 'PENDING',
    "amount" INTEGER NOT NULL,
    "payload" JSONB NOT NULL,
    "snapToken" TEXT,
    "resultRef" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PaymentIntent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PaymentIntent_userId_idx" ON "public"."PaymentIntent"("userId");

-- CreateIndex
CREATE INDEX "PaymentIntent_status_idx" ON "public"."PaymentIntent"("status");

-- AddForeignKey
ALTER TABLE "public"."PaymentIntent" ADD CONSTRAINT "PaymentIntent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Close the public-PostgREST hole like every other table (see 20260719210000_enable_rls_all_tables)
ALTER TABLE "public"."PaymentIntent" ENABLE ROW LEVEL SECURITY;

-- DropColumn: ClassType.level is being removed entirely (no more class difficulty levels)
ALTER TABLE "public"."ClassType" DROP COLUMN "level";

-- DropEnum
DROP TYPE "public"."ClassLevel";
