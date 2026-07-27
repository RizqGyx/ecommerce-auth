import Skeleton from "@/components/atoms/Skeleton";

export default function ShopLoading() {
  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <Skeleton className="h-4 w-24 mb-4" />
        <Skeleton className="h-10 w-72 mb-10" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="glass rounded-2xl border border-border/20 overflow-hidden">
              <Skeleton className="h-40 w-full rounded-none" />
              <div className="p-5 space-y-3">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-8 w-full mt-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
