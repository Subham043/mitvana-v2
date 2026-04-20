import { Skeleton } from "@/components/ui/skeleton";

const ARRAY_LIST = Array.from({ length: 5 }, (_, index) => index + 1);

function ProductInfoPageSkeleton() {
  return (
    <div className="container mx-auto max-w-[90%]">
      <div className="flex flex-col md:flex-row justify-between gap-5 md:gap-10 py-10">
        <div className="flex-1">
          <div className="flex flex-col-reverse md:flex-row gap-6">
            <div className="w-fit flex flex-row md:flex-col gap-2 overflow-x-auto">
              {ARRAY_LIST.map((item) => (
                <Skeleton className="w-[100px] h-[100px]" key={item} />
              ))}
            </div>
            <div className="flex-1">
              <Skeleton className="h-[400px] md:h-full w-full" />
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/3 leading-4">
          <Skeleton className="h-4 w-2/3 mb-2" />
          <Skeleton className="h-4 w-1/2 mb-2" />
          <Skeleton className="h-4 w-1/3 mb-2" />
          <hr className="my-5 border-gray-300" />
          <Skeleton className="h-4 w-1/4 mb-2" />
          <Skeleton className="h-4 w-1/3 mb-2" />
          <Skeleton className="h-4 w-1/2 mb-2" />
          <Skeleton className="h-4 w-1/4 mb-2" />
          <hr className="my-5 border-gray-300" />
          <Skeleton className="h-4 w-1/2 mb-2" />
          <div className="mt-2 gap-1 md:gap-2 flex flex-wrap items-center">
            {ARRAY_LIST.map((item) => (
              <Skeleton className=" w-25 md:w-40 h-[150px]" key={item} />
            ))}
          </div>
          <hr className="my-5 border-gray-300" />
          <Skeleton className="h-4 w-1/2 mb-2" />
        </div>
      </div>
    </div>
  );
}

export default ProductInfoPageSkeleton;
