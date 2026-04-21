import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductTabReviews from "./ProductTabReviews";
import ProductTabInformation from "./ProductTabInformation";
import ProductTabFaq from "./ProductTabFaq";
import ProductTabHowToUse from "./ProductTabHowToUse";
import ProductTabIngredient from "./ProductTabIngredient";
import ProductTabDescription from "./ProductTabDescription";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ProductType } from "@/lib/types";

function ProductTabMain({ productInfoData }: { productInfoData: ProductType }) {
  return (
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
        <ProductTabDescription description={productInfoData.description} />
      </TabsContent>
      <TabsContent value="key-ingredients">
        <ProductTabIngredient ingredients={productInfoData.ingredients} />
      </TabsContent>
      <TabsContent value="how-to-use">
        <ProductTabHowToUse how_to_use={productInfoData.how_to_use} />
      </TabsContent>
      <TabsContent value="faq">
        <ProductTabFaq product_faqs={productInfoData.product_faqs} />
      </TabsContent>
      <TabsContent value="additional-information">
        <ProductTabInformation features={productInfoData.features} />
      </TabsContent>
      <TabsContent value="reviews">
        <ProductTabReviews id={productInfoData.id} />
      </TabsContent>
    </Tabs>
  );
}

function ProductAccordionMain({
  productInfoData,
}: {
  productInfoData: ProductType;
}) {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue="description"
      className="max-w-lg"
    >
      <AccordionItem value="description">
        <AccordionTrigger className="text-xl font-semibold text-gray-700">
          Description
        </AccordionTrigger>
        <AccordionContent className="h-fit">
          <ProductTabDescription description={productInfoData.description} />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="key-ingredients">
        <AccordionTrigger className="text-xl font-semibold text-gray-700">
          Key Ingredients
        </AccordionTrigger>
        <AccordionContent className="h-fit">
          <ProductTabIngredient ingredients={productInfoData.ingredients} />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="how-to-use">
        <AccordionTrigger className="text-xl font-semibold text-gray-700">
          How to Use
        </AccordionTrigger>
        <AccordionContent className="h-fit">
          <ProductTabHowToUse how_to_use={productInfoData.how_to_use} />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="faq">
        <AccordionTrigger className="text-xl font-semibold text-gray-700">
          FAQ
        </AccordionTrigger>
        <AccordionContent className="h-fit">
          <ProductTabFaq product_faqs={productInfoData.product_faqs} />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="additional-information">
        <AccordionTrigger className="text-xl font-semibold text-gray-700">
          Additional Information
        </AccordionTrigger>
        <AccordionContent className="h-fit">
          <ProductTabInformation features={productInfoData.features} />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="reviews">
        <AccordionTrigger className="text-xl font-semibold text-gray-700">
          Reviews
        </AccordionTrigger>
        <AccordionContent className="h-fit">
          <ProductTabReviews id={productInfoData.id} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

function ProductTabSection({
  productInfoData,
}: {
  productInfoData: ProductType;
}) {
  return (
    <div className="w-full py-5 md:py-10">
      <div className="w-full hidden md:block">
        <ProductTabMain productInfoData={productInfoData} />
      </div>
      <div className="w-full md:hidden">
        <ProductAccordionMain productInfoData={productInfoData} />
      </div>
    </div>
  );
}

export default ProductTabSection;
