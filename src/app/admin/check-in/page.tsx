import { ScanLine } from "lucide-react";
import { getRecentCheckIns } from "./actions";
import CheckInClient from "./CheckInClient";

export default async function CheckInPage() {
  const recent = await getRecentCheckIns();

  const initialLog = recent.map((entry) => ({
    id: entry.id,
    time: entry.createdAt.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    valid: entry.valid,
    reason: entry.reason ?? "",
    name: entry.user?.name ?? undefined,
  }));

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
          <ScanLine size={18} className="text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-black">Check-In Member</h1>
          <p className="text-sm text-muted-foreground">
            Verifikasi kartu member sebelum masuk gym — scan barcode/QR atau input manual.
          </p>
        </div>
      </div>

      <CheckInClient initialLog={initialLog} />
    </div>
  );
}
