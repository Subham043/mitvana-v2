import { Field, FieldLabel } from "@/components/ui/field";
import { Progress } from "@/components/ui/progress";
import { Star } from "lucide-react";
import ReviewForm from "./ReviewForm";
import { ProductType } from "@/lib/types";
import { useProductReviewStatsQuery } from "@/lib/data/queries/product_review";
import { Spinner } from "@/components/ui/spinner";

function StatsSection({ id }: { id: ProductType["id"] }) {
  const { data, isLoading } = useProductReviewStatsQuery(id, true);

  if (isLoading) {
    return (
      <div className="text-center w-full flex items-center justify-center">
        <Spinner className="size-6" />
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row justify-center gap-7 items-center">
      <div className="text-center">
        <p className="mb-0 text-black">Average</p>
        <h2 className="font-bold text-3xl text-black my-1">
          {data ? data.averageRating : 0}
        </h2>
        <div className="flex gap-3 items-center mb-2">
          <span className="flex gap-1 items-center">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                className="w-4 h-4 text-yellow-500 fill-yellow-500"
              />
            ))}
          </span>
        </div>
        <p className="text-[#878787]">
          {data ? data.total : 0} Review{data && data.total !== 1 ? "s" : ""}
        </p>
        <ReviewForm id={id} />
      </div>
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-2">
          <Field className="w-full max-w-sm gap-1">
            <FieldLabel htmlFor="progress-upload">
              <span>Excellent</span>
              <span className="ml-auto">
                {data ? data.percentages.five : 0}%
              </span>
            </FieldLabel>
            <Progress
              value={data ? data.percentages.five : 0}
              className="bg-[#878787]"
            />
          </Field>
          <Field className="w-full max-w-sm gap-1">
            <FieldLabel htmlFor="progress-upload">
              <span>Very Good</span>
              <span className="ml-auto">
                {data ? data.percentages.four : 0}%
              </span>
            </FieldLabel>
            <Progress
              value={data ? data.percentages.four : 0}
              className="bg-[#878787]"
            />
          </Field>
          <Field className="w-full max-w-sm gap-1">
            <FieldLabel htmlFor="progress-upload">
              <span>Average</span>
              <span className="ml-auto">
                {data ? data.percentages.three : 0}%
              </span>
            </FieldLabel>
            <Progress
              value={data ? data.percentages.three : 0}
              className="bg-[#878787]"
            />
          </Field>
          <Field className="w-full max-w-sm gap-1">
            <FieldLabel htmlFor="progress-upload">
              <span>Poor</span>
              <span className="ml-auto">
                {data ? data.percentages.two : 0}%
              </span>
            </FieldLabel>
            <Progress
              value={data ? data.percentages.two : 0}
              className="bg-[#878787]"
            />
          </Field>
          <Field className="w-full max-w-sm gap-1">
            <FieldLabel htmlFor="progress-upload">
              <span>Terrible</span>
              <span className="ml-auto">
                {data ? data.percentages.one : 0}%
              </span>
            </FieldLabel>
            <Progress
              value={data ? data.percentages.one : 0}
              className="bg-[#878787]"
            />
          </Field>
        </div>
      </div>
    </div>
  );
}

export default StatsSection;
