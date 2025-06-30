import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-stone-50 dark:bg-slate-900 animate-pulse">
      <Skeleton className="h-12 w-full" />
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Image Skeleton */}
          <div className="space-y-6">
            <Skeleton className="aspect-square w-full rounded-2xl" />
            <div className="grid grid-cols-4 gap-3">
              <Skeleton className="aspect-square w-full rounded-xl" />
              <Skeleton className="aspect-square w-full rounded-xl" />
              <Skeleton className="aspect-square w-full rounded-xl" />
              <Skeleton className="aspect-square w-full rounded-xl" />
            </div>
          </div>
          {/* Details Skeleton */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
            <Skeleton className="h-20 w-full rounded-xl" />
            <div className="space-y-4">
              <Skeleton className="h-6 w-1/3" />
              <div className="flex gap-3">
                <Skeleton className="h-12 w-16 rounded-xl" />
                <Skeleton className="h-12 w-16 rounded-xl" />
                <Skeleton className="h-12 w-16 rounded-xl" />
              </div>
            </div>
            <div className="space-y-4">
              <Skeleton className="h-6 w-1/3" />
              <div className="flex gap-3">
                <Skeleton className="h-10 w-24 rounded-full" />
                <Skeleton className="h-10 w-24 rounded-full" />
                <Skeleton className="h-10 w-24 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
