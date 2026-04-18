import { Mail, Map, Phone } from "lucide-react";
import Link from "next/link";
import Subscribe from "../Subscribe";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function MobileLinks() {
  return (
    <div className="block lg:hidden container mx-auto max-w-[90%]">
      <Accordion
        type="single"
        collapsible
        defaultValue="get-in-touch"
        className="max-w-lg"
      >
        <AccordionItem value="get-in-touch">
          <AccordionTrigger className="text-xl font-semibold text-gray-700">
            Get In Touch
          </AccordionTrigger>
          <AccordionContent className="h-fit">
            <div className="text-left flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Phone className="text-zinc-500 w-5 h-5" />
                <span className="text-zinc-700 font-light">+918025203871</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="text-zinc-500 w-5 h-5" />
                <span className="text-zinc-700 font-light">
                  info@matxinlabs.com
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <Map className="text-zinc-500 w-5 h-5" />
                  <h6 className="text-base text-zinc-700 font-light">
                    Matxin Labs Pvt Ltd
                  </h6>
                </div>
                <p className="text-zinc-700 font-light m-0! p-0!">
                  L-21, F-4, Sector 14, LIC Colony,
                </p>
                <p className="text-zinc-700 font-light m-0! p-0!">
                  Jeevan Bima Nagar, Bengaluru,
                </p>
                <p className="text-zinc-700 font-light m-0! p-0!">
                  Karnataka 560075, India
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="categories">
          <AccordionTrigger className="text-xl font-semibold text-gray-700">
            Categories
          </AccordionTrigger>
          <AccordionContent className="h-fit">
            <div className="text-left flex flex-col gap-3">
              <Link
                href="/about"
                className="text-zinc-700 font-light no-underline!"
              >
                Skin Care
              </Link>
              <Link
                href="/about"
                className="text-zinc-700 font-light no-underline!"
              >
                Hair Care
              </Link>
              <Link
                href="/about"
                className="text-zinc-700 font-light no-underline!"
              >
                Hair Cleanser
              </Link>
              <Link
                href="/about"
                className="text-zinc-700 font-light no-underline!"
              >
                Baby & Bath
              </Link>
              <Link
                href="/about"
                className="text-zinc-700 font-light no-underline!"
              >
                Oil & Treatment
              </Link>
              <Link
                href="/about"
                className="text-zinc-700 font-light no-underline!"
              >
                Face Care
              </Link>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="more-categories">
          <AccordionTrigger className="text-xl font-semibold text-gray-700">
            More Categories
          </AccordionTrigger>
          <AccordionContent className="h-fit">
            <div className="text-left flex flex-col gap-3">
              <Link
                href="/about"
                className="text-zinc-700 font-light no-underline!"
              >
                Body Butters
              </Link>
              <Link
                href="/about"
                className="text-zinc-700 font-light no-underline!"
              >
                Serum & Treatment
              </Link>
              <Link
                href="/about"
                className="text-zinc-700 font-light no-underline!"
              >
                Mens Range
              </Link>
              <Link
                href="/about"
                className="text-zinc-700 font-light no-underline!"
              >
                Hair Creams
              </Link>
              <Link
                href="/about"
                className="text-zinc-700 font-light no-underline!"
              >
                Hand Care
              </Link>
              <Link
                href="/about"
                className="text-zinc-700 font-light no-underline!"
              >
                Hair Serums
              </Link>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="information">
          <AccordionTrigger className="text-xl font-semibold text-gray-700">
            Information
          </AccordionTrigger>
          <AccordionContent className="h-fit">
            <div className="text-left flex flex-col gap-3">
              <Link
                href="/about"
                className="text-zinc-700 font-light no-underline!"
              >
                About Us
              </Link>
              <Link
                href="/faq"
                className="text-zinc-700 font-light no-underline!"
              >
                FAQs
              </Link>
              <Link
                href="/terms-of-service"
                className="text-zinc-700 font-light no-underline!"
              >
                Terms & Conditions
              </Link>
              <Link
                href="/return-refunds"
                className="text-zinc-700 font-light no-underline!"
              >
                Returns & Exchanges
              </Link>
              <Link
                href="/shipping-delivery-policy"
                className="text-zinc-700 font-light no-underline!"
              >
                Shipping & Delivery
              </Link>
              <Link
                href="/privacy-policy"
                className="text-zinc-700 font-light no-underline!"
              >
                Privacy Policy
              </Link>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="keep-in-touch">
          <AccordionTrigger className="text-xl font-semibold text-gray-700">
            Keep In Touch
          </AccordionTrigger>
          <AccordionContent className="h-fit">
            <div className="text-left flex flex-col gap-2">
              <p className="text-zinc-700 font-semibold p-0! m-0!">
                Get Special discounts to your inbox
              </p>
              <Subscribe />
              <div className="w-full mt-3">
                <img
                  src="/images/footer-icons.png"
                  alt="icons"
                  width={"100%"}
                  height={100}
                  className="w-2/3 mx-auto"
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default MobileLinks;
