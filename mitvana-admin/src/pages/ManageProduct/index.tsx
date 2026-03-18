import { FormProvider, useWatch } from "react-hook-form";
import { Box, Button, Group, Loader, Center } from "@mantine/core";
import { useManageProductForm } from "./useManageProductForm";
import { useNavigate, useParams } from "react-router";
import { useCallback } from "react";
import type { ProductFormValuesType } from "@/utils/data/schema/product";
import ProductInfoForm from "./sections/ProductInfoForm";
import ProductInventoryForm from "./sections/ProductInventoryForm";
import ProductOtherInfoForm from "./sections/ProductOtherInfoForm";
import ProductVariantInfoForm from "./sections/ProductVariantInfoForm";
import ProductNotificationInfoForm from "./sections/ProductNotificationInfoForm";
import ProductFaqForm from "./sections/ProductFaqForm";
import ProductImagesForm from "./sections/ProductImagesForm";
import ProductSeoForm from "./sections/ProductSeoForm";

/*
 * Tag Form Drawer
 */
export default function ManageProduct({
  type = "add",
}: {
  type: "add" | "edit" | "clone";
}) {
  const { id } = useParams<{ id: string }>();
  const { form, data, isLoading, loading, onSubmit } = useManageProductForm({
    type,
    id,
  });

  const navigate = useNavigate();

  const is_draft = useWatch({
    control: form.control,
    name: "is_draft",
  });

  const handleCancel = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <Box pos="relative">
      {isLoading ? (
        <Center p="sm">
          <Loader size="sm" color="blue" />
        </Center>
      ) : (
        <FormProvider<ProductFormValuesType> {...form}>
          <form onSubmit={onSubmit}>
            <ProductInfoForm />
            <ProductInventoryForm />
            <ProductOtherInfoForm />
            <ProductVariantInfoForm />
            <ProductNotificationInfoForm />
            <ProductFaqForm />
            <ProductImagesForm data={data} type={type} />
            <ProductSeoForm />
            <Group gap="xs" mt="md">
              <Button
                type="submit"
                variant="filled"
                color={is_draft ? "blue" : "green"}
                disabled={loading}
                loading={loading}
              >
                {is_draft ? "Save as Draft" : "Save"}
              </Button>
              <Button
                type="button"
                variant="filled"
                color="red"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </Group>
          </form>
        </FormProvider>
      )}
    </Box>
  );
}
