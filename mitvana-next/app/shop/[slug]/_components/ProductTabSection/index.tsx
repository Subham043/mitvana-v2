import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductTabReviews from "./ProductTabReviews";
import ProductTabInformation from "./ProductTabInformation";
import ProductTabFaq from "./ProductTabFaq";
import ProductTabHowToUse from "./ProductTabHowToUse";
import ProductTabIngredient from "./ProductTabIngredient";
import ProductTabDescription from "./ProductTabDescription";

function ProductTabSection() {
  return (
    <div className="w-full py-10">
      <Tabs defaultValue="description" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger
            value="description"
            className="w-fit flex-0 px-8 py-4 rounded-full cursor-pointer"
          >
            Description
          </TabsTrigger>
          <TabsTrigger
            value="key-ingredients"
            className="w-fit flex-0 px-8 py-4 rounded-full cursor-pointer"
          >
            Key Ingredients
          </TabsTrigger>
          <TabsTrigger
            value="how-to-use"
            className="w-fit flex-0 px-8 py-4 rounded-full cursor-pointer"
          >
            How to Use
          </TabsTrigger>
          <TabsTrigger
            value="faq"
            className="w-fit flex-0 px-8 py-4 rounded-full cursor-pointer"
          >
            FAQ
          </TabsTrigger>
          <TabsTrigger
            value="additional-information"
            className="w-fit flex-0 px-8 py-4 rounded-full cursor-pointer"
          >
            Additional Information
          </TabsTrigger>
          <TabsTrigger
            value="reviews"
            className="w-fit flex-0 px-8 py-4 rounded-full cursor-pointer"
          >
            Reviews
          </TabsTrigger>
        </TabsList>
        <TabsContent value="description">
          <ProductTabDescription />
        </TabsContent>
        <TabsContent value="key-ingredients">
          <ProductTabIngredient />
        </TabsContent>
        <TabsContent value="how-to-use">
          <ProductTabHowToUse />
        </TabsContent>
        <TabsContent value="faq">
          <ProductTabFaq />
        </TabsContent>
        <TabsContent value="additional-information">
          <ProductTabInformation />
        </TabsContent>
        <TabsContent value="reviews">
          <ProductTabReviews />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default ProductTabSection;
