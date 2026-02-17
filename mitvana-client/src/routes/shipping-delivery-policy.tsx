import PolicyHeroSection from '@/components/PolicyHeroSection'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/shipping-delivery-policy')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <PolicyHeroSection title="Shipping & Delivery Policy" />
      <section className="py-10">
        <div className="container mx-auto">
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
  )
}
