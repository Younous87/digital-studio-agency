import { Loader } from "@/components/retroui/Loader";

export default function Loading() {
  return (
    <div className="flex min-h-[50vh] w-full items-center justify-center">
      <Loader size="lg" />
    </div>
  );
}
