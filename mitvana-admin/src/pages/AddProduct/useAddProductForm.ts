import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, type Resolver } from "react-hook-form";
import { handleFormServerErrors } from "@/utils/helper";
import { useCallback } from "react";
import { productSchema, type ProductFormValuesType } from "@/utils/data/schema/product";
import { useProductCreateMutation } from "@/utils/data/mutation/products";

const productFormDefaultValues: ProductFormValuesType = {
  is_update: false,
  title: "",
  sub_title: undefined,
  name: undefined,
  slug: undefined,
  sku: undefined,
  hsn: undefined,
  price: 0,
  discounted_price: 0,
  tax: 18,
  stock: 0,
  description: "",
  thumbnail: undefined,
  variant: "size",
  size_or_color: undefined,
  bought_text: "notDisplay",
  product_bought: undefined,
  og_site_name: undefined,
  how_to_use: undefined,
  meta_description: undefined,
  facebook_description: undefined,
  twitter_description: undefined,
  custom_script: undefined,
  product_selected: undefined,
  related_products: [],
  ingredients: [],
  tags: [],
  colors: [],
  categories: [],
  faqs: [],
  is_draft: true,
}

export function useAddProductForm() {

  const productCreate = useProductCreateMutation();

  const form = useForm<ProductFormValuesType>({
    resolver: yupResolver(productSchema) as Resolver<ProductFormValuesType>,
    defaultValues: productFormDefaultValues,
  });

  const onSubmit = useCallback(
    form.handleSubmit(async (values) => {
      await productCreate.mutateAsync(values, {
        onError: (error) => {
          handleFormServerErrors(error, form);
        },
        onSuccess: () => {
          form.reset(productFormDefaultValues);
        }
      });
    }), [form.handleSubmit, productCreate.mutate]);

  return {
    form,
    loading: productCreate.isPending,
    onSubmit,
  };
}
