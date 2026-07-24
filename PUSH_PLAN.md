# Push Plan — Real Midtrans Payments, PT Redesign, Admin PT Tracking, Remove Class Levels

Semua perubahan masih dalam bentuk uncommitted changes di `develop`. Jalankan semua ini sendiri di terminalmu.

## Branch

```bash
git checkout -b feat/midtrans-payments
```

## Commit 1 — fix OTP + README

```bash
git add src/lib/mailer.ts README.md
git commit -m "Fixing[fix]: OTP email delivery reliability and refreshed README"
```

## Commit 2 — fitur besar (Midtrans, PT redesign, admin tracking, drop class levels)

```bash
git add -A
git commit -m "Adding[feat]: Real Midtrans Snap payments, PT redesign, admin PT tracking, drop class levels"
```

`git add -A` aman dipakai di sini karena semua sisa perubahan (yang tidak masuk Commit 1) memang satu paket fitur ini — lihat daftar lengkap di bagian bawah kalau mau add manual/selektif.

## Rebase & push

```bash
git fetch --prune
git rebase origin/main          # seharusnya no-op, origin/main sudah ancestor dari branch ini

git checkout main
git merge --ff-only feat/midtrans-payments
git push origin main

git checkout develop
git merge --ff-only feat/midtrans-payments
git push origin develop

git branch -d feat/midtrans-payments
```

---

## Catatan

- **2 file dead code muncul lagi**: `src/components/molecules/PaymentMethodCard.tsx` dan `src/components/molecules/payment/PaymentTimer.tsx` sempat saya hapus (sudah tidak dipakai sejak diganti Midtrans Snap), tapi sekarang balik ada di working tree kamu dan tidak lagi ke-track sebagai deleted. Sudah saya cek — tidak dipakai di manapun (`grep` bersih), jadi build tetap jalan. Kalau mau ikut dibersihkan di Commit 2, tinggal:
  ```bash
  git rm src/components/molecules/PaymentMethodCard.tsx src/components/molecules/payment/PaymentTimer.tsx
  ```
  sebelum `git add -A`. Kalau tidak dihapus juga tidak masalah, cuma dead code menganggur.
- `.env.local` tidak akan ikut ke-commit (sudah di `.gitignore`).
- Dependency `qrcode` (bekas komponen QRIS lama) sudah saya uninstall duluan, `package.json`/`package-lock.json` sudah bersih.

## Daftar lengkap perubahan Commit 2 (kalau mau add manual/selektif)

```
.env.example
prisma/schema.prisma
prisma/seed.ts
prisma/migrations/20260722160000_add_payment_intent_drop_class_level/   (baru)
src/app/admin/classes/ClassTypeForm.tsx
src/app/admin/classes/actions.ts
src/app/admin/classes/page.tsx
src/app/admin/pt-bookings/                                              (baru)
src/app/api/midtrans/                                                   (baru)
src/app/booking/BookingPageClient.tsx
src/app/booking/actions.ts
src/app/booking/success/page.tsx
src/app/checkout/actions.ts
src/app/checkout/page.tsx
src/app/classes/ClassesPageClient.tsx
src/app/classes/[id]/page.tsx
src/app/membership/actions.ts
src/app/membership/page.tsx
src/app/membership/MembershipPurchaseButton.tsx                         (baru)
src/app/payment/page.tsx                                                (dihapus)
src/app/payment/processing/                                             (baru)
src/app/personal-trainer/book/PTBookPageClient.tsx
src/app/personal-trainer/book/actions.ts
src/app/schedule/SchedulePageClient.tsx
src/components/molecules/BookingClassCard.tsx
src/components/molecules/BookingSummaryPanel.tsx
src/components/molecules/ClassCard.tsx
src/components/molecules/ScheduleSessionCard.tsx
src/components/molecules/checkout/CheckoutSummary.tsx
src/components/molecules/checkout/PaymentStep.tsx
src/components/molecules/payment/CardPayment.tsx                       (dihapus)
src/components/molecules/payment/EWalletPayment.tsx                    (dihapus)
src/components/molecules/payment/QRISPayment.tsx                       (dihapus)
src/components/molecules/payment/RetailPayment.tsx                     (dihapus)
src/components/molecules/payment/VAPayment.tsx                         (dihapus)
src/components/organisms/AdminSidebar.tsx
src/components/organisms/FeaturedClassesSection.tsx
src/components/organisms/MidtransPayButton.tsx                         (baru)
src/lib/data.ts
src/lib/midtrans.ts                                                     (baru)
src/lib/paymentIntent.ts                                                (baru)
src/lib/serializers.ts
```
