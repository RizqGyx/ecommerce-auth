"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  Bell, CheckCheck, Star, Trash2, Filter,
  Calendar, CreditCard, Dumbbell, Tag, Info, Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { NotificationType } from "@/generated/prisma";
import type { NotificationView } from "@/lib/serializers";
import {
  getNotifications, markNotificationRead, markNotificationUnread,
  markAllNotificationsRead, toggleNotificationStar, deleteNotification, deleteNotifications,
} from "./actions";

const ICON_MAP: Record<NotificationType, React.ElementType> = {
  BOOKING: Calendar,
  PAYMENT: CreditCard,
  PT: Dumbbell,
  PROMO: Tag,
  SYSTEM: Info,
};

const COLOR_MAP: Record<NotificationType, string> = {
  BOOKING: "text-primary bg-primary/10 border-primary/20",
  PAYMENT: "text-green-400 bg-green-400/10 border-green-400/20",
  PT: "text-accent bg-accent/10 border-accent/20",
  PROMO: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  SYSTEM: "text-muted-foreground bg-muted/40 border-border/20",
};

type FilterTab = "all" | "unread" | "starred";

export default function NotificationsPage() {
  const router = useRouter();
  const { isLoggedIn, isLoading } = useAuth();
  const [notifs, setNotifs] = useState<NotificationView[]>([]);
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!isLoading && !isLoggedIn) router.push("/login");
  }, [isLoading, isLoggedIn, router]);

  useEffect(() => {
    if (isLoggedIn) getNotifications().then(setNotifs);
  }, [isLoggedIn]);

  const filtered = notifs.filter((n) => {
    if (activeTab === "unread") return !n.read;
    if (activeTab === "starred") return n.starred;
    return true;
  });

  const unreadCount = notifs.filter((n) => !n.read).length;

  const markRead = (id: string) => {
    setNotifs((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
    markNotificationRead(id);
  };

  const markUnread = (id: string) => {
    setNotifs((prev) => prev.map((n) => (n.id === id ? { ...n, read: false } : n)));
    markNotificationUnread(id);
  };

  const toggleStar = (id: string) => {
    setNotifs((prev) => prev.map((n) => (n.id === id ? { ...n, starred: !n.starred } : n)));
    toggleNotificationStar(id);
  };

  const deleteNotif = (id: string) => {
    setNotifs((prev) => prev.filter((n) => n.id !== id));
    deleteNotification(id);
  };

  const markAllRead = () => {
    setNotifs((prev) => prev.map((n) => ({ ...n, read: true })));
    markAllNotificationsRead();
  };

  const deleteSelected = () => {
    deleteNotifications(Array.from(selectedIds));
    setNotifs((prev) => prev.filter((n) => !selectedIds.has(n.id)));
    setSelectedIds(new Set());
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === filtered.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filtered.map((n) => n.id)));
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <Bell size={24} className="text-primary" />
              <h1 className="text-2xl font-black">Notifikasi</h1>
              {unreadCount > 0 && (
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-primary text-primary-foreground">
                  {unreadCount} baru
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground">Semua aktivitas & pemberitahuan akun Anda</p>
          </div>

          {unreadCount > 0 && (
            <Button variant="neon" size="sm" onClick={markAllRead} className="shrink-0">
              <CheckCheck size={14} className="mr-1.5" /> Tandai semua dibaca
            </Button>
          )}
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 glass rounded-xl p-1 border border-border/20 mb-6">
          {(["all", "unread", "starred"] as FilterTab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setSelectedIds(new Set()); }}
              className={`flex-1 text-sm font-semibold py-2 px-3 rounded-lg transition-all duration-200 ${
                activeTab === tab
                  ? "bg-primary text-primary-foreground shadow"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              }`}
            >
              {tab === "all" && `Semua (${notifs.length})`}
              {tab === "unread" && `Belum Dibaca (${unreadCount})`}
              {tab === "starred" && `Berbintang (${notifs.filter((n) => n.starred).length})`}
            </button>
          ))}
        </div>

        {/* Bulk action bar */}
        {selectedIds.size > 0 && (
          <div className="flex items-center justify-between glass rounded-xl border border-primary/20 px-4 py-2.5 mb-4 bg-primary/5">
            <div className="flex items-center gap-3">
              <button onClick={toggleSelectAll} className="w-5 h-5 rounded border border-primary flex items-center justify-center bg-primary/20 hover:bg-primary/40 transition-colors">
                <Check size={12} className="text-primary" />
              </button>
              <span className="text-sm font-semibold">{selectedIds.size} dipilih</span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-xs h-7 gap-1.5"
                onClick={() => {
                  selectedIds.forEach(markRead);
                  setSelectedIds(new Set());
                }}
              >
                <CheckCheck size={12} /> Tandai dibaca
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs h-7 gap-1.5 text-destructive hover:text-destructive"
                onClick={deleteSelected}
              >
                <Trash2 size={12} /> Hapus
              </Button>
            </div>
          </div>
        )}

        {/* Notification list */}
        <div className="space-y-3">
          {filtered.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              <Bell size={40} className="mx-auto mb-3 opacity-30" />
              <p className="font-semibold">Tidak ada notifikasi</p>
              <p className="text-sm mt-1">Semuanya sudah beres!</p>
            </div>
          )}

          {filtered.map((notif) => {
            const Icon = ICON_MAP[notif.type];
            const colorCls = COLOR_MAP[notif.type];
            const isSelected = selectedIds.has(notif.id);

            return (
              <div
                key={notif.id}
                className={`group relative glass rounded-2xl border transition-all duration-200 overflow-hidden ${
                  !notif.read
                    ? "border-primary/25 bg-primary/3"
                    : "border-border/20 hover:border-border/40"
                } ${isSelected ? "border-primary/50 bg-primary/8" : ""}`}
              >
                {/* Unread indicator */}
                {!notif.read && (
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary rounded-l-2xl" />
                )}

                <div className="flex gap-4 p-5">
                  {/* Checkbox */}
                  {!notif.isVirtual && (
                    <button
                      onClick={() => toggleSelect(notif.id)}
                      className={`shrink-0 w-5 h-5 rounded border transition-all duration-200 flex items-center justify-center mt-0.5 ${
                        isSelected
                          ? "bg-primary border-primary"
                          : "border-border/40 hover:border-primary/50 bg-transparent"
                      }`}
                    >
                      {isSelected && <Check size={12} className="text-primary-foreground" />}
                    </button>
                  )}

                  {/* Icon */}
                  <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center border ${colorCls}`}>
                    <Icon size={18} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <h3 className={`font-bold text-sm leading-tight ${!notif.read ? "" : "text-muted-foreground"}`}>
                        {notif.title}
                        {!notif.read && (
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary ml-2 align-middle" />
                        )}
                      </h3>
                      <span className="text-[11px] text-muted-foreground shrink-0">{notif.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{notif.body}</p>
                  </div>
                </div>

                {/* Actions — hover reveal (hidden for the synthesized virtual entry) */}
                {!notif.isVirtual && (
                  <div className="flex items-center gap-1 border-t border-border/10 px-5 py-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-card/20">
                    <button
                      onClick={() => (notif.read ? markUnread(notif.id) : markRead(notif.id))}
                      className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-lg hover:bg-white/5 transition-all"
                    >
                      {notif.read ? (
                        <><Bell size={12} /> Tandai belum dibaca</>
                      ) : (
                        <><CheckCheck size={12} /> Tandai dibaca</>
                      )}
                    </button>

                    <button
                      onClick={() => toggleStar(notif.id)}
                      className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg hover:bg-white/5 transition-all ${
                        notif.starred ? "text-yellow-400" : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Star size={12} fill={notif.starred ? "currentColor" : "none"} />
                      {notif.starred ? "Hapus bintang" : "Bintangi"}
                    </button>

                    <div className="flex-1" />

                    <button
                      onClick={() => deleteNotif(notif.id)}
                      className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-destructive px-3 py-1.5 rounded-lg hover:bg-destructive/10 transition-all"
                    >
                      <Trash2 size={12} /> Hapus
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Filter info */}
        {filtered.length > 0 && (
          <div className="flex items-center justify-center gap-2 mt-6 text-xs text-muted-foreground">
            <Filter size={11} />
            <span>Menampilkan {filtered.length} dari {notifs.length} notifikasi</span>
          </div>
        )}
      </div>
    </div>
  );
}
