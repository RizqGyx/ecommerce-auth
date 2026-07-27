import { buildMetadata } from "@/lib/seo";
import FAQPageClient from "./FAQPageClient";

export const metadata = buildMetadata({
  title: "FAQ",
  description: "Pertanyaan seputar membership, kelas, pembayaran, dan akun di S-One Gym Bukittinggi.",
  path: "/faq",
});

const FAQ_GROUPS = [
  {
    category: "Membership",
    faqs: [
      {
        q: "Apakah bisa berhenti kapan saja?",
        a: "Bisa. Tidak ada kontrak jangka panjang. Batalkan online atau langsung di gym, berlaku efektif di akhir periode tagihan berjalan.",
      },
      {
        q: "Bisakah membership dibekukan sementara?",
        a: "Bisa untuk member Premium dan Elite — pembekuan hingga 1 bulan per tahun tanpa biaya tambahan.",
      },
      {
        q: "Bagaimana cara upgrade paket?",
        a: "Upgrade kapan saja dari dashboard akunmu di halaman Membership. Selisih harga dihitung prorata untuk bulan berjalan.",
      },
      {
        q: "Bagaimana cara kerja akses QR code?",
        a: "Setelah berlangganan, kamu mendapat kartu member digital dengan QR code unik di dashboard. Tinggal scan di gerbang masuk untuk akses gym.",
      },
    ],
  },
  {
    category: "Kelas & Booking",
    faqs: [
      {
        q: "Berapa lama sebelum kelas harus booking?",
        a: "Booking minimal 30 menit sebelum kelas dimulai. Pembatalan bisa dilakukan hingga 2 jam sebelum sesi untuk refund penuh.",
      },
      {
        q: "Apa yang terjadi kalau tidak hadir setelah booking?",
        a: "No-show tanpa pembatalan sebelumnya dapat dikenakan biaya. Member Premium dan Elite mendapat prioritas booking untuk kelas yang penuh.",
      },
      {
        q: "Apakah bisa booking personal trainer langsung dari coach favorit?",
        a: "Bisa — pilih paket PT (Starter/Transform/Elite) lalu pilih trainer dari dropdown. Harga sama untuk semua trainer per paket yang sama, jadi kamu bebas memilih siapa saja.",
      },
    ],
  },
  {
    category: "Pembayaran",
    faqs: [
      {
        q: "Metode pembayaran apa saja yang diterima?",
        a: "Semua pembayaran diproses aman melalui Midtrans — mendukung transfer bank, GoPay, OVO, DANA, ShopeePay, dan kartu kredit/debit utama.",
      },
      {
        q: "Apakah aman memasukkan data pembayaran di sini?",
        a: "Aman. Kami tidak pernah menyimpan data kartu atau rekeningmu — semua transaksi diproses langsung oleh Midtrans sebagai payment gateway resmi.",
      },
      {
        q: "Pembayaran saya belum terkonfirmasi, harus bagaimana?",
        a: "Beberapa metode seperti transfer bank butuh waktu lebih lama untuk dikonfirmasi. Halaman status pembayaran akan update otomatis — atau klik \"Cek Status Lagi\" untuk memeriksa manual.",
      },
    ],
  },
  {
    category: "Akun",
    faqs: [
      {
        q: "Kenapa saya perlu verifikasi email?",
        a: "Verifikasi email memastikan akunmu aman dan memastikan notifikasi penting (konfirmasi booking, pembayaran) sampai ke inbox yang benar.",
      },
      {
        q: "Bisakah masuk pakai akun Google?",
        a: "Bisa — gunakan tombol \"Continue with Google\" di halaman masuk atau daftar.",
      },
      {
        q: "Bagaimana cara menghapus akun?",
        a: "Buka Pengaturan Akun → Keamanan → Hapus Akun. Tindakan ini permanen dan menghapus seluruh data membership, riwayat pesanan, dan booking.",
      },
    ],
  },
];

export default function FAQPage() {
  return <FAQPageClient groups={FAQ_GROUPS} />;
}
