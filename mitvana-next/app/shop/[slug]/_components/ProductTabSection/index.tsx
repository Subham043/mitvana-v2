import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function ProductTabSection() {
  return (
    <div className="w-full py-10">
      <Tabs defaultValue="description" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger
            value="description"
            className="w-fit flex-0 px-8 py-4 rounded-full"
          >
            Description
          </TabsTrigger>
          <TabsTrigger
            value="key-ingredients"
            className="w-fit flex-0 px-8 py-4 rounded-full"
          >
            Key Ingredients
          </TabsTrigger>
          <TabsTrigger
            value="how-to-use"
            className="w-fit flex-0 px-8 py-4 rounded-full"
          >
            How to Use
          </TabsTrigger>
          <TabsTrigger
            value="faq"
            className="w-fit flex-0 px-8 py-4 rounded-full"
          >
            FAQ
          </TabsTrigger>
          <TabsTrigger
            value="additional-information"
            className="w-fit flex-0 px-8 py-4 rounded-full"
          >
            Additional Information
          </TabsTrigger>
          <TabsTrigger
            value="reviews"
            className="w-fit flex-0 px-8 py-4 rounded-full"
          >
            Reviews
          </TabsTrigger>
        </TabsList>
        <TabsContent value="description">
          <Card className="bg-transparent border-0 outline-none shadow-none rounded-none ring-0">
            <CardHeader>
              <CardTitle>Description</CardTitle>
              <CardDescription>
                View your key metrics and recent project activity. Track
                progress across all your active projects.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              You have 12 active projects and 3 pending tasks.
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="key-ingredients">
          <Card className="bg-transparent border-0 outline-none shadow-none rounded-none ring-0">
            <CardHeader>
              <CardTitle>Key Ingredients</CardTitle>
              <CardDescription>
                Track performance and user engagement metrics. Monitor trends
                and identify growth opportunities.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Page views are up 25% compared to last month.
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="how-to-use">
          <Card className="bg-transparent border-0 outline-none shadow-none rounded-none ring-0">
            <CardHeader>
              <CardTitle>How to Use</CardTitle>
              <CardDescription>
                Generate and download your detailed reports. Export data in
                multiple formats for analysis.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              You have 5 reports ready and available to export.
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="faq">
          <Card className="bg-transparent border-0 outline-none shadow-none rounded-none ring-0">
            <CardHeader>
              <CardTitle>FAQ</CardTitle>
              <CardDescription>
                Generate and download your detailed reports. Export data in
                multiple formats for analysis.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              You have 5 reports ready and available to export.
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="additional-information">
          <Card className="bg-transparent border-0 outline-none shadow-none rounded-none ring-0">
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
              <CardDescription>
                Manage your account preferences and options. Customize your
                experience to fit your needs.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Configure notifications, security, and themes.
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reviews">
          <Card className="bg-transparent border-0 outline-none shadow-none rounded-none ring-0">
            <CardHeader>
              <CardTitle>Reviews</CardTitle>
              <CardDescription>
                Manage your account preferences and options. Customize your
                experience to fit your needs.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Configure notifications, security, and themes.
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default ProductTabSection;
