import HeroSection from "@/components/HeroSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://mitvana.com"),

  title: "Shipping & Delivery Policy",

  description:
    "Learn about Mitvana’s shipping and delivery policy including 3–5 day delivery timelines, courier partners, shipping charges, and order tracking details.",

  keywords: [
    "Mitvana shipping policy",
    "Mitvana delivery time",
    "Mitvana shipping charges",
    "order tracking Mitvana",
    "courier delivery Mitvana India",
    "skincare delivery India 3-5 days",
  ],

  alternates: {
    canonical: "https://mitvana.com/shipping-delivery-policy",
  },

  robots: {
    index: true,
    follow: true,
  },

  // ✅ Open Graph (Facebook, LinkedIn, WhatsApp)
  openGraph: {
    type: "article",
    url: "https://mitvana.com/shipping-delivery-policy",
    title: "Mitvana Shipping & Delivery Policy – Timelines, Charges & Tracking",
    description:
      "Understand Mitvana’s shipping timelines, courier delivery process, and charges before placing your order.",
    siteName: "Mitvana",
    locale: "en_IN",

    images: [
      {
        url: "https://mitvana.com/logo.jpg",
        width: 500,
        height: 380,
        alt: "Mitvana Shipping Policy",
      },
    ],
  },

  // ✅ Twitter (X)
  twitter: {
    card: "summary_large_image",
    title: "Mitvana Shipping Policy – Delivery Time & Order Tracking",
    description:
      "Get details on delivery timelines, shipping charges, and courier tracking for Mitvana orders.",
    images: ["https://mitvana.com/logo.jpg"],
  },

  category: "logistics",
};

export default function ShippingDeliveryPolicy() {
  return (
    <div>
      <HeroSection title="Shipping & Delivery Policy" />
      <section className="py-10">
        <div className="container mx-auto max-w-[90%]">
          <p>
            <b>
              STANDARD SHIPPING TIME:&nbsp; <strong>3-5</strong>&nbsp;
              <strong>BUSINESS DAYS</strong>
            </b>
          </p>
          <br />
          <ul className="list-disc pl-6 space-y-1">
            <li className="font-light" aria-level={1}>
              <span className="font-light">
                All orders are shipped from our facility in Bangalore, Karnataka
                through reputed courier partners.
              </span>
            </li>
            <li className="font-light" aria-level={1}>
              <span className="font-light">
                Shipping information is relayed through email, on the email id
                specified at the time of order placement.
              </span>
            </li>
            <li className="font-light" aria-level={1}>
              <span className="font-light">
                Delivery of each order will be to the registered address of the
                customer as mentioned at the time of order placement only.
              </span>
            </li>
            <li className="font-light" aria-level={1}>
              <span className="font-light">
                Reverse Pick-ups are arranged only for returns of damaged or
                incorrect deliveries. NO reverse pick-up is arranged for any
                kind of exchanges.
              </span>
            </li>
            <li className="font-light" aria-level={1}>
              <span className="font-light">
                Delivery of the shipment is subject to the Courier Company.
                Mitvana only guarantees timely dispatch within the delivery time
                mentioned, post order and/or payment confirmation, and is not
                liable for any delay in delivery by the courier partner.&nbsp;
              </span>
            </li>
            <li className="font-light" aria-level={1}>
              <span className="font-light">
                Shipping and handling rates may vary based on product,
                packaging, size, volume, type and location of delivery. The
                shipping and handling charges are given at the time of check out
                and consumers will know about this before making payments.
              </span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
