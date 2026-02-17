import PolicyHeroSection from '@/components/PolicyHeroSection'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/return-refunds')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <PolicyHeroSection title="Refund and Returns Policy" />
      <section className="py-10">
        <div className="container mx-auto">
          <p>
            <b>Under what conditions can I return/ replace my product?</b>
          </p>
          <p>
            <span className="font-light">
              Only under the following circumstances will we initiate a return
              of the goods.
            </span>
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li className="font-light" aria-level={1}>
              <span className="font-light">
                If the sold products have reached the customer in a damaged
                condition.
              </span>
            </li>
            <li className="font-light" aria-level={1}>
              <span className="font-light">
                The intimation about the damage of the goods have to be reported
                to the courier company which delivers the goods and the packet
                needs to be returned to the courier company at the time of
                delivery of the goods.
              </span>
            </li>
            <li className="font-light" aria-level={1}>
              <span className="font-light">
                Under a rare circumstance that the goods delivered are past
                their stated expiry period will the company take back the goods.
              </span>
            </li>
          </ul>
          <p>&nbsp;</p>
          <p>
            <span className="font-light">
              Note: Our policy lasts 7 (Seven) days from the receipt of the
              product. To be eligible for a return, your item must be unused and
              in the same condition that you received it. It must also be in the
              original packaging.
            </span>
          </p>
          <span className="font-light">
            <br />
          </span>
          <p>
            <b>
              Under what conditions return/ replacement requests will not be
              accepted?
            </b>
          </p>
          <p>
            <span className="font-light">
              Any item not in its original condition, is damaged or missing
              parts for reasons not due to our error will not be taken back.
            </span>
          </p>
          <p>
            <span className="font-light">
              Any item that is returned more than 7(seven) days after delivery
              will not be taken back.
            </span>
          </p>
          <span className="font-light">
            <br />
          </span>
          <p>
            <b>How are returns processed?</b>
          </p>
          <p>
            <span className="font-light">
              To complete your return, we require a receipt or proof of
              purchase. If your order is eligible and falls under any of the
              previously mentioned conditions, we will initiate a return from
              our end.{' '}
            </span>
            <span className="font-light">
              <br />
            </span>
            <span className="font-light">
              Please do not send your purchase back to the manufacturer. You
              will be informed by our courier company when they will come and
              collect the goods from your delivery address.
            </span>
            <span className="font-light">
              <br />
            </span>
            <span className="font-light">
              <br />
            </span>
            <b>Can I cancel my order?</b>
          </p>
          <p>
            <span className="font-light">
              Orders that have not been shipped or not in transit, can be
              cancelled. Once, shipped by our courier partners, orders cannot be
              cancelled.
            </span>
            <span className="font-light">
              <br />
            </span>
            <span className="font-light">
              <br />
            </span>
            <b>
              How will I receive the refund for my cancelled or returned
              product?
            </b>
          </p>
          <p>
            <span className="font-light">
              Once your return is received and inspected, we will send you an
              email to notify you that we have received your returned item. We
              will also notify you of the approval or rejection of your refund.
            </span>
            <span className="font-light">
              <br />
            </span>
            <span className="font-light">
              <br />
            </span>
            <b>
              How long does it take to receive a refund for a cancelled order or
              returned product?
            </b>
          </p>
          <p>
            <span className="font-light">
              If you are approved, then your refund will be processed, and a
              credit will automatically be applied to your credit card or
              original method of payment, within 15 to 21 working days.
            </span>
            <span className="font-light">
              <br />
            </span>
            <span className="font-light">
              <br />
            </span>
            <b>Under what conditions can I exchange my product?</b>
          </p>
          <p>
            <span className="font-light">
              We only exchange items if they are defective or damaged and is
              intimated to the courier company at the time of delivery and
              returned or an expired product has been delivered to you and if
              you need to exchange it for the same item, send us an email at the
              Company Contact Email: info@mitvanastores.com
            </span>
          </p>
          <p>
            <span className="font-light">With the following details:</span>
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li className="font-light" aria-level={1}>
              <span className="font-light">Order ID Number</span>
            </li>
            <li className="font-light" aria-level={1}>
              <span className="font-light">Date of placing the order</span>
            </li>
            <li className="font-light" aria-level={1}>
              <span className="font-light">Products ordered and quantity</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  )
}
