import Skeleton from "@/components/atoms/Skeleton";

export default function NewsLoading() {
  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <Skeleton className="h-4 w-40 mb-4" />
        <Skeleton className="h-20 w-full max-w-xl mb-6" />
        <Skeleton className="h-5 w-full max-w-md mb-10" />

        <div className="grid lg:grid-cols-3 gap-6 mb-10">
          <Skeleton className="lg:col-span-2 h-72 rounded-2xl" />
          <div className="flex flex-col gap-4">
            <Skeleton className="h-32 rounded-2xl" />
            <Skeleton className="h-32 rounded-2xl" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-56 rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
