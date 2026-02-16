import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, type Resolver } from "react-hook-form";
import { handleFormServerErrors } from "@/utils/helper";
import { useCallback, useEffect } from "react";
import { productSchema, type ProductFormValuesType } from "@/utils/data/schema/product";
import { useProductCreateMutation, useProductUpdateMutation } from "@/utils/data/mutation/products";
import { useProductQuery } from "@/utils/data/query/product";
import type { ProductType } from "@/utils/types";

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
  images: [],
  is_draft: true,
}

const updateFormResetValues = (data?: ProductType) => {
  if (data) {
    return {
      is_update: true,
      title: data ? data.title : "",
      sub_title: data && data.sub_title ? data.sub_title : undefined,
      name: data && data.name ? data.name : undefined,
      slug: data && data.slug ? data.slug : "",
      sku: data && data.sku ? data.sku : undefined,
      hsn: data && data.hsn ? data.hsn : undefined,
      price: data && data.price ? data.price : 0,
      discounted_price: data && data.discounted_price ? data.discounted_price : 0,
      tax: data && data.tax ? data.tax : 18,
      stock: data && data.stock ? data.stock : 0,
      description: data && data.description ? data.description : "",
      thumbnail: undefined,
      images: [],
      variant: (data && data.size_or_color && data.size_or_color.length > 0 ? "size" : "color") as "size" | "color",
      size_or_color: data && data.size_or_color ? data.size_or_color : undefined,
      bought_text: data && data.bought_text ? data.bought_text as "notDisplay" | "automatic" | "manual" : "notDisplay",
      product_bought: data && data.product_bought ? data.product_bought : undefined,
      og_site_name: data && data.og_site_name ? data.og_site_name : undefined,
      how_to_use: data && data.how_to_use ? data.how_to_use : undefined,
      meta_description: data && data.meta_description ? data.meta_description : undefined,
      facebook_description: data && data.facebook_description ? data.facebook_description : undefined,
      twitter_description: data && data.twitter_description ? data.twitter_description : undefined,
      custom_script: data && data.custom_script ? data.custom_script : undefined,
      product_selected: data && data.parent_product ? { label: data.parent_product.title, value: data.parent_product.id } : undefined,
      related_products: data && data.related_products && data.related_products.length > 0 ? data.related_products.map((item) => ({ label: item.related_product.title, value: item.related_product.id })) : [],
      ingredients: data && data.ingredients && data.ingredients.length > 0 ? data.ingredients.map((item) => ({ label: item.ingredient.title, value: item.ingredient.id })) : [],
      tags: data && data.tags && data.tags.length > 0 ? data.tags.map((item) => ({ label: item.tag.name, value: item.tag.id })) : [],
      colors: data && data.colors && data.colors.length > 0 ? data.colors.map((item) => ({ label: item.color.name, value: item.color.id })) : [],
      categories: data && data.categories && data.categories.length > 0 ? data.categories.map((item) => ({ label: item.category.name, value: item.category.id })) : [],
      faqs: data && data.product_faqs && data.product_faqs.length > 0 ? data.product_faqs.map((item) => ({ question: item.question, answer: item.answer, id: item.id })) : [],
      is_draft: data ? data.is_draft : true,
    }
  }
  return productFormDefaultValues;
}

export function useManageProductForm({ type, id }: { type: "add" | "edit" | "clone", id?: string }) {

  const { data, isLoading, isFetching, isRefetching } = useProductQuery(
    type !== "add" && id ? id : "",
    type !== "add" && !!id
  );

  const productCreate = useProductCreateMutation();
  const productUpdate = useProductUpdateMutation(type === "edit" && id ? id : "");

  const form = useForm<ProductFormValuesType>({
    resolver: yupResolver(productSchema) as Resolver<ProductFormValuesType>,
    defaultValues: productFormDefaultValues,
  });

  useEffect(() => {
    if (type !== "add" && data) {
      form.reset(updateFormResetValues(data));
    }
  }, [type, data]);

  const onSubmit = useCallback(
    form.handleSubmit(async (values) => {
      if (type === "edit") {
        await productUpdate.mutateAsync(values, {
          onError: (error) => {
            handleFormServerErrors(error, form);
          },
          onSuccess: (data) => {
            form.reset(updateFormResetValues(data));
          }
        });
      } else {
        await productCreate.mutateAsync(values, {
          onError: (error) => {
            handleFormServerErrors(error, form);
          },
          onSuccess: () => {
            form.reset(updateFormResetValues());
          }
        });
      }
    }), [form.handleSubmit, productCreate.mutate, productUpdate.mutate]);

  return {
    form,
    data,
    isLoading: isLoading || isFetching || isRefetching,
    loading: productCreate.isPending || productUpdate.isPending,
    onSubmit,
  };
}
