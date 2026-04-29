import { getQueryClient } from "@/lib/get-query-client";
import ProductInfoHydrationBoundary from "./_components/ProductInfoHydrationBoundary";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ProductSlugQueryOptions } from "@/lib/data/queries/product";
import { getSession } from "@/lib/get-session";
import type { Metadata } from "next";
import { getProductBySlugHandler } from "@/lib/data/dal/products"; // adjust path

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  try {
    const product = await getProductBySlugHandler(slug);

    if (!product) {
      return {
        title: "Product Not Found",
        robots: { index: false },
      };
    }

    const title = product.og_site_name || product.title;

    const description =
      product.meta_description ||
      `Buy ${product.title} at best price from Mitvana.`;

    const image = product.thumbnail_link || "https://mitvana.com/logo.jpg";

    return {
      title,
      description,

      keywords: [product.title],

      alternates: {
        canonical: `https://mitvana.com/shop/${product.slug}`,
      },

      openGraph: {
        type: "website",
        url: `https://mitvana.com/shop/${product.slug}`,
        title,
        description: product.facebook_description || description,
        siteName: product.og_site_name || "Mitvana",
        images: [
          {
            url: image,
            width: 1200,
            height: 630,
            alt: product.title,
          },
        ],
      },

      twitter: {
        card: "summary_large_image",
        title,
        description: product.twitter_description || description,
        images: [image],
      },
    };
  } catch (err) {
    return {
      title: "Product",
    };
  }
}

async function ProductInfoPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const session = await getSession();

  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(
    ProductSlugQueryOptions(slug, session ? session.access_token : undefined),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductInfoHydrationBoundary slug={slug} />
    </HydrationBoundary>
  );
}

export default ProductInfoPage;
