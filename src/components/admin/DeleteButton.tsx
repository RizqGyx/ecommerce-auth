"use client";

import { Trash2 } from "lucide-react";
import ConfirmDialog from "@/components/molecules/ConfirmDialog";

export default function DeleteButton({
  action,
  confirmMessage = "Hapus data ini? Aksi ini tidak bisa dibatalkan.",
}: {
  action: () => Promise<void>;
  confirmMessage?: string;
}) {
  return (
    <ConfirmDialog
      trigger={
        <button
          type="button"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-400 hover:text-red-300 transition-colors"
        >
          <Trash2 size={13} />
          Hapus
        </button>
      }
      title="Konfirmasi Hapus"
      description={confirmMessage}
      confirmLabel="Hapus"
      onConfirm={action}
    />
  );
}
