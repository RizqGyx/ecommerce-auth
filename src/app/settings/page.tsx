"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, User, Bell, Lock, Shield, ChevronRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const MOCK_USER = {
  name: "Ahmad Berzki",
  email: "berzki@s-onegym.id",
  phone: "+62 812-3456-7890",
  memberId: "S1G-2025-0042",
};

type Section = "profile" | "notifications" | "security";

const SECTIONS: { id: Section; label: string; icon: typeof User; desc: string }[] = [
  { id: "profile", label: "Profil", icon: User, desc: "Nama, email, dan nomor telepon" },
  { id: "notifications", label: "Notifikasi", icon: Bell, desc: "Atur preferensi notifikasi" },
  { id: "security", label: "Keamanan", icon: Lock, desc: "Password dan keamanan akun" },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState<Section>("profile");
  const [saved, setSaved] = useState(false);
  const [name, setName] = useState(MOCK_USER.name);
  const [phone, setPhone] = useState(MOCK_USER.phone);

  const [notifPrefs, setNotifPrefs] = useState({
    booking: true,
    payment: true,
    promo: false,
    pt: true,
    membership: true,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const toggleNotif = (key: keyof typeof notifPrefs) => {
    setNotifPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-6 py-10">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft size={14} /> Kembali ke Dashboard
        </Link>

        <h1 className="text-3xl font-black mb-8">
          <span className="gradient-text">Pengaturan</span> Akun
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar nav */}
          <div className="md:col-span-1">
            <div className="glass rounded-2xl border border-border/20 p-2">
              {SECTIONS.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => { setActiveSection(section.id); setSaved(false); }}
                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all duration-200 ${
                      activeSection === section.id
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                    }`}
                  >
                    <Icon size={16} />
                    <span className="text-sm font-medium">{section.label}</span>
                    {activeSection === section.id && (
                      <ChevronRight size={14} className="ml-auto" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <div className="md:col-span-3">
            {activeSection === "profile" && (
              <div className="glass rounded-2xl border border-border/20 p-6 space-y-5">
                <div>
                  <h2 className="text-xl font-black mb-1">Profil</h2>
                  <p className="text-sm text-muted-foreground">Informasi dasar akunmu</p>
                </div>

                <div className="flex items-center gap-4 pb-5 border-b border-border/20">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-2xl font-black gradient-text border border-primary/20">
                    AB
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{MOCK_USER.name}</p>
                    <p className="text-xs text-muted-foreground">{MOCK_USER.memberId}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Nama Lengkap</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-secondary/30 border border-border/30 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Email</label>
                    <input
                      type="email"
                      defaultValue={MOCK_USER.email}
                      disabled
                      className="w-full bg-secondary/20 border border-border/20 rounded-xl px-4 py-2.5 text-sm text-muted-foreground cursor-not-allowed"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Email tidak dapat diubah.</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Nomor Telepon</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-secondary/30 border border-border/30 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                    />
                  </div>
                </div>

                <Button variant="hero" onClick={handleSave} className="gap-2">
                  {saved ? <><Check size={14} /> Tersimpan!</> : "Simpan Perubahan"}
                </Button>
              </div>
            )}

            {activeSection === "notifications" && (
              <div className="glass rounded-2xl border border-border/20 p-6 space-y-5">
                <div>
                  <h2 className="text-xl font-black mb-1">Notifikasi</h2>
                  <p className="text-sm text-muted-foreground">Pilih notifikasi yang ingin kamu terima</p>
                </div>

                <div className="space-y-3">
                  {[
                    { key: "booking" as const, label: "Konfirmasi Booking", desc: "Notifikasi saat booking kelas berhasil" },
                    { key: "payment" as const, label: "Pembayaran", desc: "Pengingat pembayaran dan status transaksi" },
                    { key: "pt" as const, label: "Personal Training", desc: "Update jadwal dan sesi PT kamu" },
                    { key: "membership" as const, label: "Membership", desc: "Pengingat jatuh tempo dan promo perpanjangan" },
                    { key: "promo" as const, label: "Promo & News", desc: "Penawaran spesial dan berita terbaru S-One Gym" },
                  ].map(({ key, label, desc }) => (
                    <div
                      key={key}
                      className="flex items-center justify-between p-4 rounded-xl border border-border/20 hover:border-border/40 transition-colors"
                    >
                      <div>
                        <p className="font-medium text-sm">{label}</p>
                        <p className="text-xs text-muted-foreground">{desc}</p>
                      </div>
                      <button
                        onClick={() => toggleNotif(key)}
                        className={`relative w-11 h-6 rounded-full transition-all duration-200 shrink-0 ${
                          notifPrefs[key] ? "bg-primary" : "bg-border/40"
                        }`}
                      >
                        <span
                          className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-200 ${
                            notifPrefs[key] ? "left-6" : "left-1"
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>

                <Button variant="hero" onClick={handleSave} className="gap-2">
                  {saved ? <><Check size={14} /> Tersimpan!</> : "Simpan Preferensi"}
                </Button>
              </div>
            )}

            {activeSection === "security" && (
              <div className="glass rounded-2xl border border-border/20 p-6 space-y-5">
                <div>
                  <h2 className="text-xl font-black mb-1">Keamanan</h2>
                  <p className="text-sm text-muted-foreground">Kelola password dan keamanan akun</p>
                </div>

                <div className="space-y-4">
                  {[
                    { label: "Password Saat Ini", placeholder: "Masukkan password lama" },
                    { label: "Password Baru", placeholder: "Minimal 8 karakter" },
                    { label: "Konfirmasi Password Baru", placeholder: "Ulangi password baru" },
                  ].map(({ label, placeholder }) => (
                    <div key={label}>
                      <label className="block text-sm font-medium mb-1.5">{label}</label>
                      <input
                        type="password"
                        placeholder={placeholder}
                        className="w-full bg-secondary/30 border border-border/30 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                      />
                    </div>
                  ))}
                </div>

                <Button variant="hero" onClick={handleSave} className="gap-2">
                  {saved ? <><Check size={14} /> Tersimpan!</> : "Ubah Password"}
                </Button>

                <div className="border-t border-border/20 pt-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield size={16} className="text-red-400" />
                    <h3 className="font-bold text-sm text-red-400">Zona Berbahaya</h3>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">
                    Menghapus akun bersifat permanen dan tidak dapat dibatalkan.
                  </p>
                  <Button
                    variant="ghost"
                    className="text-red-400 hover:text-red-300 hover:bg-red-400/10 border border-red-400/20"
                  >
                    Hapus Akun
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
