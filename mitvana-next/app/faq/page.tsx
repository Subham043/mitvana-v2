import HeroSection from "@/components/HeroSection";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://mitvana.com"),

  title: "FAQ",

  description:
    "Find answers to common questions about Mitvana products, orders, shipping, returns, and ingredient safety. Learn about our natural skincare and wellness solutions.",

  keywords: [
    "Mitvana FAQ",
    "Mitvana shipping time",
    "Mitvana return policy",
    "Mitvana product safety",
    "herbal skincare FAQ",
    "natural skincare questions India",
    "order tracking Mitvana",
  ],

  alternates: {
    canonical: "https://mitvana.com/faq",
  },

  robots: {
    index: true,
    follow: true,
  },

  // ✅ Open Graph (Facebook, LinkedIn, WhatsApp)
  openGraph: {
    type: "website",
    url: "https://mitvana.com/faq",
    title: "Mitvana FAQ – Orders, Shipping & Product Information",
    description:
      "Get answers to frequently asked questions about Mitvana products, delivery, cancellations, and more.",
    siteName: "Mitvana",
    locale: "en_IN",

    images: [
      {
        url: "/logo.jpg",
        width: 500,
        height: 380,
        alt: "Mitvana Natural Products",
      },
    ],
  },

  // ✅ Twitter (X)
  twitter: {
    card: "summary_large_image",
    title: "Mitvana FAQ – Shipping, Orders & Product Info",
    description:
      "Everything you need to know about Mitvana products, delivery, and returns.",
    images: ["https://mitvana.com/logo.jpg"],
  },

  category: "support",
};

export default function Faq() {
  return (
    <div>
      <HeroSection title="FAQ" />
      <section className="py-10">
        <div className="container mx-auto max-w-[90%]">
          <p>
            <b>PRODUCTS AND STORE</b>
          </p>
          <p>&nbsp;</p>
          <p>
            <b>
              <i>Have you tested your product on animals?</i>
            </b>
          </p>
          <ol className="list-disc pl-6 space-y-1">
            <li>
              <span className="font-light">
                {" "}
                We do not support animal testing. We have clinically tested our
                products at Matxin Labs to ensure safe usage. We count on
                extensive feedback from doctors, patients and consumers to get
                insights on product performance to be able to make improvements.
              </span>
            </li>
          </ol>
          <span className="font-light">
            <br />
          </span>
          <p>
            <b>
              <i>What is your product range?</i>
            </b>
          </p>
          <p>
            <span className="font-light">
              We have products for body care, skincare, hair care, and grooming
              products for men that are backed by scientific research and
              include natural ingredients in their recipes.
            </span>
          </p>
          <span className="font-light">
            <br />
          </span>
          <p>
            <b>
              <i>How do you source your product ingredients?</i>
            </b>
          </p>
          <p>
            <span className="font-light">
              All our herbal actives are Organic and{" "}
            </span>
            <span className="font-light">
              we ensure ethical sourcing and production of each
              ingredient.&nbsp;
            </span>
          </p>
          <p>
            <span className="font-light">
              The procurement of the herbs are from suppliers who cultivate the
              plants under good agricultural practices. All the plants are free
              from heavy metal contamination and also free from pesticides and
              any other toxic chemicals.
            </span>
          </p>
          <span className="font-light">
            <br />
          </span>
          <p>
            <b>
              <i>How do you ensure safety and quality of products?</i>
            </b>
          </p>
          <p>
            <span className="font-light">
              We are here to make sure you trust our brand and love the products
              that you use. To ensure this, Mitvana products are manufactured
              under the following quality certifications:
            </span>
          </p>
          <ol className="list-disc pl-6 space-y-1">
            <li>
              <span className="font-light">
                {" "}
                Good Manufacturing Practices (GMP): Government of Karnataka
                (India)&nbsp;
              </span>
            </li>
            <li>
              <span className="font-light"> ISO 9001.2015</span>
            </li>
            <li>
              <span className="font-light"> Halal certification</span>
            </li>
            <li>
              <span className="font-light">
                The products go through a robust Quality Management System (QMS)
                right from sourcing raw material&nbsp; to the finished
                product&nbsp;
              </span>
            </li>
          </ol>
          <p>
            <span className="font-light">&nbsp;</span>
          </p>
          <p>
            <b>ORDERS AND SHIPPING</b>
          </p>
          <p>&nbsp;</p>
          <p>
            <span className="font-light">&nbsp;</span>
            <b>
              <i>How do I place an order?</i>
            </b>
          </p>
          <p>
            <span className="font-light">
              Placing your order on our website is very easy. First, add to the
              cart the product(s) you want to order. For product selection, you
              navigate to our menu and select as per your skin or hair type of
              particular concern. Next, fill in your address information.
              Finally, select your preferred payment method and your order will
              be placed. For any assistance, please feel free to contact our
              customer support team, phone support at +91 8025203871, or&nbsp;by
              emailing us at{" "}
              <a href="mailto:info@matxinlabs.com">
                <b>
                  <i>info@matxinlabs.com</i>
                </b>
              </a>
              .&nbsp;{" "}
            </span>
          </p>
          <span className="font-light">
            <br />
          </span>
          <p>
            <b>
              <i>How do I track my order?</i>
            </b>
            <span className="font-light">&nbsp;</span>
          </p>
          <p>
            <span className="font-light">
              You will receive email correspondence after placing your order
              with all the tracking details once it has been shipped from our
              facility.
            </span>
          </p>
          <span className="font-light">
            <br />
          </span>
          <p>
            <b>
              <i>How can I cancel my order?</i>
            </b>
          </p>
          <p>
            <span className="font-light">
              If any case, you wish to cancel your order, please raise a request
              via live chat, phone support, or by emailing us at{" "}
            </span>
            <a href="mailto:info@matxinlabs.com">
              <b>
                <i>info@matxinlabs.com</i>
              </b>
            </a>
            <span className="font-light">
              . Your order would be canceled only if it has not been shipped.
              Refunds for accepted cancellations are credited back to your
              original payment method in 15-21 business days.&nbsp;
            </span>
          </p>
          <span className="font-light">
            <br />
          </span>
          <p>
            <b>
              <i>How many days does it take for shipping/ delivery?</i>
            </b>
            <span className="font-light">&nbsp;</span>
          </p>
          <p>
            <span className="font-light">
              All orders are shipped from our warehouse in Bangalore, Karnataka
              through a reputed courier partner.&nbsp;
            </span>
          </p>
          <p>
            <span className="font-light">
              Shipping information is relayed through email, on the email id
              specified at the time of order placement.
            </span>
          </p>
          <p>
            <span className="font-light">
              Delivery of each order will be to the registered address of the
              customer within 3-5 business days depending on your location.
            </span>
          </p>
          <p>&nbsp;</p>
          <p>
            <b>RETURNS AND REFUNDS</b>
          </p>
          <p>&nbsp;</p>
          <p>
            <span className="font-light">
              Please refer to the Returns and Refund Policy section{" "}
            </span>
            <Link href="/return-refunds" className="underline text-blue-500">
              <span className="font-light">here.</span>
            </Link>
          </p>{" "}
        </div>
      </section>
    </div>
  );
}
