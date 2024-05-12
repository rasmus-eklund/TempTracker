import { Skeleton } from "~/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="flex h-full flex-col gap-5 bg-c1">
      <div className="mt-2 flex flex-col gap-4 rounded-md bg-white px-5 py-8 shadow-sm">
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold leading-none tracking-tight">
            Temperature by date
          </h1>
          <Skeleton className="h-10 w-28" />
        </div>
        <Skeleton className="h-40 w-full" />
      </div>
      <div className="flex h-14 w-full items-center gap-4 rounded-md bg-c4/40 p-2">
        <Skeleton className="size-10 rounded-full" />
        <Skeleton className="h-10 w-36" />
      </div>
      <div className="flex flex-col gap-2 bg-inherit">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="h-12 w-full rounded-md bg-c4">
              <Skeleton className="h-12 w-full" />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Loading;
