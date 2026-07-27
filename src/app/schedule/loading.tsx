import Skeleton from "@/components/atoms/Skeleton";

export default function ScheduleLoading() {
  return (
    <div className="min-h-screen pt-20 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <Skeleton className="h-4 w-40 mb-4" />
        <Skeleton className="h-12 w-80 max-w-full mb-8" />

        <div className="grid grid-cols-7 gap-2 mb-8">
          {Array.from({ length: 7 }).map((_, i) => (
            <Skeleton key={i} className="h-20 rounded-xl" />
          ))}
        </div>

        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
