import Skeleton from "@/components/atoms/Skeleton";

export default function CoachesLoading() {
  return (
    <div className="min-h-screen bg-background pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6 text-center mb-16">
        <Skeleton className="h-4 w-24 mx-auto mb-6" />
        <Skeleton className="h-14 w-96 max-w-full mx-auto mb-4" />
        <Skeleton className="h-5 w-full max-w-xl mx-auto" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <Skeleton className="h-64 w-full rounded-3xl mb-10" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-border/20 overflow-hidden">
              <Skeleton className="h-28 w-full rounded-none" />
              <div className="p-4 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
