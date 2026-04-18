import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function ProductTabReviews() {
  return (
    <Card className="bg-transparent border-0 outline-none shadow-none rounded-none ring-0 px-0.5 py-2">
      <CardHeader className="px-0">
        <CardTitle>Reviews</CardTitle>
        <CardDescription>
          View your key metrics and recent project activity. Track progress
          across all your active projects.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground px-0">
        You have 12 active projects and 3 pending tasks.
      </CardContent>
    </Card>
  );
}

export default ProductTabReviews;
