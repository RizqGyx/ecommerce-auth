"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";

export default function DeleteButton({
  action,
  confirmMessage = "Hapus data ini? Aksi ini tidak bisa dibatalkan.",
}: {
  action: () => Promise<void>;
  confirmMessage?: string;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => {
        if (confirm(confirmMessage)) {
          startTransition(async () => {
            try {
              await action();
            } catch (err) {
              alert(err instanceof Error ? err.message : "Gagal menghapus data.");
            }
          });
        }
      }}
      className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-400 hover:text-red-300 disabled:opacity-50 transition-colors"
    >
      <Trash2 size={13} />
      Hapus
    </button>
  );
}
