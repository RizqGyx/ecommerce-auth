-- Enable Row Level Security on every table in `public`.
--
-- This app never queries Postgres through Supabase's PostgREST / supabase-js —
-- all data access goes through Prisma over a direct connection (DATABASE_URL),
-- authenticated as the table owner role, which bypasses RLS entirely.
--
-- With RLS disabled, every table here was reachable by anyone through the
-- public PostgREST REST endpoint using the publishable/anon key (which is
-- intentionally public, embedded in client JS). Enabling RLS with zero
-- policies makes PostgREST deny all access by default, closing that hole,
-- while leaving Prisma/the app fully unaffected.
ALTER TABLE "public"."_prisma_migrations" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."Otp" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."Account" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."Session" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."VerificationToken" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."Authenticator" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."Product" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."Category" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."Cart" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."CartItem" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."Order" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."OrderItem" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."Payment" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."Review" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."MembershipPlan" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."GymMembership" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."MemberCard" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."Coach" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."PTBooking" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."ClassType" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."ClassSession" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."ClassRegistration" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."BlogPost" ENABLE ROW LEVEL SECURITY;
