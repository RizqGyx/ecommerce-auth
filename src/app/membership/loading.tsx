import Skeleton from "@/components/atoms/Skeleton";

export default function MembershipLoading() {
  return (
    <div className="min-h-screen pt-20 bg-background">
      <div className="max-w-4xl mx-auto px-6 py-24 text-center">
        <Skeleton className="h-4 w-40 mx-auto mb-6" />
        <Skeleton className="h-16 w-full max-w-lg mx-auto mb-4" />
        <Skeleton className="h-5 w-full max-w-md mx-auto" />
      </div>
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className={`rounded-3xl ${i === 1 ? "h-[480px]" : "h-[420px]"}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
