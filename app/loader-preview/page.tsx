import { Skeleton } from "@/components/ui/skeleton";
 
export default function LoaderPreview() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-8">Loading State Preview</h1>
      <div className="flex flex-col gap-8">
        <div>
          <h2 className="text-lg font-semibold mb-4">Content Loading</h2>
          <div className="flex flex-col gap-4">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[300px]" />
          </div>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-4">Card Loading</h2>
          <div className="flex items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[150px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
