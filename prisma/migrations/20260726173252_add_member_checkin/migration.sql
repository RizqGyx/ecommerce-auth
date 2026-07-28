-- CreateTable
CREATE TABLE "public"."MemberCheckIn" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "scannedCode" TEXT NOT NULL,
    "valid" BOOLEAN NOT NULL,
    "reason" TEXT,
    "scannedBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MemberCheckIn_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "MemberCheckIn_userId_idx" ON "public"."MemberCheckIn"("userId");

-- CreateIndex
CREATE INDEX "MemberCheckIn_createdAt_idx" ON "public"."MemberCheckIn"("createdAt");

-- AddForeignKey
ALTER TABLE "public"."MemberCheckIn" ADD CONSTRAINT "MemberCheckIn_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- Close the public-PostgREST hole like every other table (see 20260719210000_enable_rls_all_tables)
ALTER TABLE "public"."MemberCheckIn" ENABLE ROW LEVEL SECURITY;
