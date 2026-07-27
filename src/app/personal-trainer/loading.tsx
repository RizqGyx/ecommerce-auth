import Skeleton from "@/components/atoms/Skeleton";

export default function PersonalTrainerLoading() {
  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <Skeleton className="h-4 w-40 mb-8" />
          <Skeleton className="h-14 w-full max-w-md mb-4" />
          <Skeleton className="h-14 w-2/3 max-w-md mb-6" />
          <Skeleton className="h-5 w-full max-w-lg mb-2" />
          <Skeleton className="h-5 w-3/4 max-w-lg mb-10" />
          <div className="flex gap-4">
            <Skeleton className="h-14 w-40 rounded-md" />
            <Skeleton className="h-14 w-40 rounded-md" />
          </div>
        </div>
        <div className="hidden lg:flex flex-col gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
