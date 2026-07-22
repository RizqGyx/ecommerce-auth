"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu, X, ShoppingCart, User, Bell,
  LayoutDashboard, Settings, LogOut, ReceiptText, ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import type { NotificationView } from "@/lib/serializers";
import { getNotifications, markNotificationRead } from "@/app/notifications/actions";

const NAV_ITEMS = [
  { name: "Home", href: "/" },
  { name: "Classes", href: "/classes" },
  { name: "Schedule", href: "/schedule" },
  { name: "Membership", href: "/membership" },
  { name: "Coaches", href: "/coaches" },
  { name: "Shop", href: "/shop" },
  { name: "News", href: "/news" },
];

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openNotifications, setOpenNotifications] = useState(false);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [notifications, setNotifications] = useState<NotificationView[]>([]);

  const notifRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const { totalItems } = useCart();
  const { isLoggedIn, user, logout } = useAuth();

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    if (isLoggedIn) getNotifications().then(setNotifications);
  }, [isLoggedIn]);

  const handleOpenNotifications = () => {
    setOpenNotifications((v) => !v);
    setOpenUserMenu(false);
    getNotifications().then(setNotifications);
  };

  const handleNotificationClick = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
    markNotificationRead(id);
  };

  const userInitials = user?.name
    .split(" ")
    .map((n) => n[0])
    .join("") ?? "?";

  useEffect(() => {
    const controlHeader = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);
      if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
        setIsMenuOpen(false);
        setOpenNotifications(false);
        setOpenUserMenu(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", controlHeader);
    return () => window.removeEventListener("scroll", controlHeader);
  }, [lastScrollY]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setOpenNotifications(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setOpenUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setOpenUserMenu(false);
    logout();
  };

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${
        isScrolled
          ? "bg-background/95 backdrop-blur-xl border-b border-border/30 shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 hover:scale-105 transition-transform duration-300 shrink-0"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-primary/30 blur-md"></div>
              <Image
                src="/Icon.png"
                alt="S-One Gym Logo"
                width={36}
                height={36}
                className="relative rounded-full"
              />
            </div>
            <div className="hidden sm:block">
              <span className="block text-lg font-bold gradient-text leading-none">S-One Gym</span>
              <p className="text-[10px] text-muted-foreground tracking-widest uppercase">
                Bukittinggi
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(item.href)
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2.5">
            {/* Cart (logged in only) */}
            {isLoggedIn && (
              <Link
                href="/cart"
                className="hidden md:flex items-center justify-center w-9 h-9 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors relative"
              >
                <ShoppingCart size={18} />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                    {totalItems > 9 ? "9+" : totalItems}
                  </span>
                )}
              </Link>
            )}

            {isLoggedIn ? (
              <>
                {/* Notification Bell (logged in only) */}
                <div className="relative hidden md:block" ref={notifRef}>
                  <button
                    onClick={handleOpenNotifications}
                    className="flex items-center justify-center w-9 h-9 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors relative"
                  >
                    <Bell size={18} />
                    {unreadCount > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                        {unreadCount}
                      </span>
                    )}
                  </button>

                  {openNotifications && (
                    <div className="absolute top-full right-0 pt-2 w-80 z-50">
                      <div className="glass rounded-xl border border-border/20 shadow-xl shadow-black/40 overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-3 border-b border-border/20">
                          <span className="font-bold text-sm">Notifikasi</span>
                          {unreadCount > 0 && (
                            <span className="text-xs text-muted-foreground">{unreadCount} belum dibaca</span>
                          )}
                        </div>
                        <div className="divide-y divide-border/10 max-h-72 overflow-y-auto">
                          {notifications.length === 0 ? (
                            <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                              Belum ada notifikasi.
                            </div>
                          ) : (
                            notifications.map((n) => (
                              <button
                                key={n.id}
                                onClick={() => handleNotificationClick(n.id)}
                                className={`w-full text-left px-4 py-3 hover:bg-white/5 transition-colors ${!n.read ? "bg-primary/5" : ""}`}
                              >
                                <div className="flex items-start gap-2.5">
                                  <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${!n.read ? "bg-primary" : "bg-transparent"}`} />
                                  <div className="flex-1 min-w-0">
                                    <p className={`text-sm font-semibold leading-tight ${n.read ? "text-muted-foreground" : ""}`}>
                                      {n.title}
                                    </p>
                                    <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">{n.body}</p>
                                    <p className="text-[10px] text-muted-foreground/60 mt-1">{n.time}</p>
                                  </div>
                                </div>
                              </button>
                            ))
                          )}
                        </div>
                        <div className="px-4 py-2.5 border-t border-border/20 bg-secondary/10">
                          <Link href="/notifications" className="text-xs text-primary hover:underline" onClick={() => setOpenNotifications(false)}>
                            Lihat semua notifikasi →
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* User Avatar Dropdown */}
                <div className="relative hidden md:block ml-1.5" ref={userMenuRef}>
                  <button
                    onClick={() => { setOpenUserMenu((v) => !v); setOpenNotifications(false); }}
                    className="flex items-center justify-center w-9 h-9 rounded-full border border-primary/30 bg-gradient-to-br from-primary/20 to-accent/20 hover:border-primary/60 transition-all duration-200"
                  >
                    <span className="text-xs font-bold gradient-text">{userInitials}</span>
                  </button>

                  {openUserMenu && (
                    <div className="absolute top-full right-0 pt-2 w-60 z-50">
                      <div className="glass rounded-xl border border-border/20 shadow-xl shadow-black/40 overflow-hidden">
                        {/* User info */}
                        <div className="px-4 py-3.5 border-b border-border/20">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 border border-primary/30 flex items-center justify-center shrink-0">
                              <span className="text-sm font-bold gradient-text">{userInitials}</span>
                            </div>
                            <div className="min-w-0">
                              <p className="font-bold text-sm truncate">{user?.name}</p>
                              <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                            </div>
                          </div>
                          <div className="mt-2.5">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                              {user?.plan ? `${user.plan} Member` : "Belum Berlangganan"}
                            </span>
                          </div>
                        </div>

                        {/* Menu links */}
                        <div className="py-1">
                          {[
                            ...(user?.role === "ADMIN"
                              ? [{ label: "Admin Panel", href: "/admin", icon: ShieldCheck }]
                              : []),
                            { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
                            { label: "Transaksi", href: "/transactions", icon: ReceiptText },
                            { label: "Profil & Settings", href: "/settings", icon: Settings },
                          ].map(({ label, href, icon: Icon }) => (
                            <Link
                              key={label}
                              href={href}
                              onClick={() => setOpenUserMenu(false)}
                              className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
                            >
                              <Icon size={14} />
                              {label}
                            </Link>
                          ))}
                        </div>

                        <div className="border-t border-border/20 py-1">
                          <button
                            onClick={handleLogout}
                            className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-400/5 transition-colors w-full"
                          >
                            <LogOut size={14} />
                            Keluar
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* Not logged in: Sign In + Join Now */}
                <Link
                  href="/login"
                  className="hidden md:flex items-center justify-center w-9 h-9 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
                >
                  <User size={18} />
                </Link>

                <div className="hidden md:block">
                  <Button variant="hero" size="sm" className="text-xs px-4" asChild>
                    <Link href="/register">Join Now</Link>
                  </Button>
                </div>
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="lg:hidden p-2 rounded-lg hover:bg-white/5 transition-colors text-muted-foreground hover:text-foreground"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden bg-background/98 backdrop-blur-xl border-b border-border/20">
          <nav className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {NAV_ITEMS.map((item) => (
              <div key={item.name}>
                <Link
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                  }`}
                >
                  {item.name}
                </Link>
              </div>
            ))}
            <div className="pt-4 border-t border-border/20 flex flex-col gap-2">
              {isLoggedIn ? (
                <>
                  <div className="px-4 py-2 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 border border-primary/30 flex items-center justify-center shrink-0">
                      <span className="text-xs font-bold gradient-text">{userInitials}</span>
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-sm truncate">{user?.name}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {user?.plan ? `${user.plan} Member` : "Belum Berlangganan"}
                      </p>
                    </div>
                  </div>
                  {user?.role === "ADMIN" && (
                    <Button variant="glass" className="w-full" asChild>
                      <Link href="/admin" onClick={() => setIsMenuOpen(false)}>
                        <ShieldCheck size={15} /> Admin Panel
                      </Link>
                    </Button>
                  )}
                  <Button variant="glass" className="w-full" asChild>
                    <Link href="/notifications" onClick={() => setIsMenuOpen(false)} className="relative">
                      <Bell size={15} /> Notifikasi
                      {unreadCount > 0 && (
                        <span className="absolute top-1 right-4 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                          {unreadCount}
                        </span>
                      )}
                    </Link>
                  </Button>
                  <Button variant="neon" className="w-full" asChild>
                    <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>
                      <LayoutDashboard size={15} /> Dashboard
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full text-red-400 hover:text-red-300 hover:bg-red-400/5" onClick={() => { handleLogout(); setIsMenuOpen(false); }}>
                    <LogOut size={15} /> Keluar
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="hero" className="w-full" asChild>
                    <Link href="/register" onClick={() => setIsMenuOpen(false)}>Join Now</Link>
                  </Button>
                  <Button variant="neon" className="w-full" asChild>
                    <Link href="/login" onClick={() => setIsMenuOpen(false)}>Sign In</Link>
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
