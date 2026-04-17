import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function ProductTabHowToUse() {
  return (
    <Card className="bg-transparent border-0 outline-none shadow-none rounded-none ring-0">
      <CardHeader>
        <CardTitle>How to Use</CardTitle>
        <CardDescription>
          View your key metrics and recent project activity. Track progress
          across all your active projects.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        You have 12 active projects and 3 pending tasks.
      </CardContent>
    </Card>
  );
}

export default ProductTabHowToUse;
