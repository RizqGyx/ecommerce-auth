import Skeleton from "@/components/atoms/Skeleton";

export default function ClassesLoading() {
  return (
    <div className="min-h-screen pt-20 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <Skeleton className="h-4 w-32 mb-6" />
        <Skeleton className="h-12 w-96 max-w-full mb-4" />
        <Skeleton className="h-5 w-full max-w-xl mb-10" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-white/10 overflow-hidden">
              <Skeleton className="h-1 w-full rounded-none" />
              <div className="p-6 space-y-3">
                <Skeleton className="h-16 w-16 rounded-xl" />
                <Skeleton className="h-5 w-2/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
