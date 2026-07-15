import type { ReactNode } from "react";

export interface AdminTableColumn<T> {
  header: string;
  render: (row: T) => ReactNode;
  className?: string;
}

interface AdminTableProps<T> {
  columns: AdminTableColumn<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  emptyLabel?: string;
}

export default function AdminTable<T>({
  columns,
  rows,
  rowKey,
  emptyLabel = "Belum ada data.",
}: AdminTableProps<T>) {
  if (rows.length === 0) {
    return (
      <div className="glass rounded-2xl border border-border/20 p-12 text-center text-sm text-muted-foreground">
        {emptyLabel}
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl border border-border/20 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/20 bg-white/[0.02]">
              {columns.map((col) => (
                <th
                  key={col.header}
                  className="text-left font-semibold text-xs uppercase tracking-wide text-muted-foreground px-5 py-3 whitespace-nowrap"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border/10">
            {rows.map((row) => (
              <tr key={rowKey(row)} className="hover:bg-white/5 transition-colors">
                {columns.map((col) => (
                  <td key={col.header} className={`px-5 py-3.5 align-middle ${col.className ?? ""}`}>
                    {col.render(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
