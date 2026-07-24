import { prisma } from "@/lib/prisma";
import AdminTable from "@/components/admin/AdminTable";
import { markPtSessionComplete } from "./actions";

export default async function AdminPtBookingsPage() {
  const bookings = await prisma.pTBooking.findMany({
    include: { user: true, coach: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-black mb-1">PT Bookings</h1>
        <p className="text-sm text-muted-foreground">{bookings.length} booking personal trainer</p>
      </div>

      <AdminTable
        rows={bookings}
        rowKey={(b) => b.id}
        columns={[
          { header: "Member", render: (b) => <span className="font-semibold">{b.user.name ?? b.user.email}</span> },
          { header: "Coach", render: (b) => b.coach.name },
          { header: "Paket", render: (b) => b.packageName },
          {
            header: "Sesi",
            render: (b) => (
              <span className="font-mono">
                {b.sessionsUsed}/{b.sessionsTotal}
              </span>
            ),
          },
          {
            header: "Status",
            render: (b) => (
              <span
                className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${
                  b.status === "COMPLETED"
                    ? "text-green-400 border-green-400/30 bg-green-400/10"
                    : b.status === "CANCELED"
                    ? "text-red-400 border-red-400/30 bg-red-400/10"
                    : "text-primary border-primary/30 bg-primary/10"
                }`}
              >
                {b.status}
              </span>
            ),
          },
          {
            header: "Aksi",
            render: (b) =>
              b.sessionsUsed >= b.sessionsTotal ? (
                <span className="text-xs text-muted-foreground">Selesai</span>
              ) : (
                <form action={markPtSessionComplete.bind(null, b.id)}>
                  <button
                    type="submit"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
                  >
                    Tandai Sesi Selesai
                  </button>
                </form>
              ),
          },
        ]}
      />
    </div>
  );
}
