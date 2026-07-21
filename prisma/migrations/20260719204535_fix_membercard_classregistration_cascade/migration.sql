-- DropForeignKey
ALTER TABLE "public"."ClassRegistration" DROP CONSTRAINT "ClassRegistration_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."MemberCard" DROP CONSTRAINT "MemberCard_membershipId_fkey";

-- DropForeignKey
ALTER TABLE "public"."MemberCard" DROP CONSTRAINT "MemberCard_userId_fkey";

-- AddForeignKey
ALTER TABLE "public"."MemberCard" ADD CONSTRAINT "MemberCard_membershipId_fkey" FOREIGN KEY ("membershipId") REFERENCES "public"."GymMembership"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MemberCard" ADD CONSTRAINT "MemberCard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ClassRegistration" ADD CONSTRAINT "ClassRegistration_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
