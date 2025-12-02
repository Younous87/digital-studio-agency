import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex min-h-[50vh] w-full items-center justify-center gap-2">
      <Skeleton className="h-4 w-4 rounded-full" />
      <Skeleton className="h-4 w-4 rounded-full" />
      <Skeleton className="h-4 w-4 rounded-full" />
    </div>
  );
}
