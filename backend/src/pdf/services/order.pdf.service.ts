import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import * as pug from 'pug';
import * as path from 'path';
import { FileHelperUtil } from 'src/utils/file.util';
import { OrderInfoEntity } from 'src/api/orders/entity/order.entity';
import { HelperUtil } from 'src/utils/helper.util';

@Injectable()
export class OrderPdfService {
    async generateInvoicePdf(order: OrderInfoEntity): Promise<Uint8Array<ArrayBufferLike>> {
        // 1. Compile Pug to HTML
        const filePath = path.join(FileHelperUtil.pdfTemplatePath, 'invoice.pug');

        const currentDate = new Date();
        const formattedDate = `${currentDate
            .getDate()
            .toString()
            .padStart(2, "0")}${(currentDate.getMonth() + 1)
                .toString()
                .padStart(2, "0")}${currentDate.getFullYear()}`;

        const uniqueNumber = Math.floor(100 + Math.random() * 900);
        const ackNo = `${formattedDate}${(order.orderId || uniqueNumber.toString()).replace(
            "#",
            "",
        )}`;

        let taxableProductTotal = 0;
        let totalProductQuantity = 0;

        let cgst = 0;
        let sgst = 0;
        let igst = 0;
        let cgstTotal = 0;
        let sgstTotal = 0;
        let igstTotal = 0;

        const isIntraState = !order.is_igst_applicable;

        const orderItems = order.order_items.map((item, index) => {

            const gstRate = (item.product_tax || 0) / 100 || 0.18; // fallback

            const productPriceInclGST = item.product_discounted_price
                ? parseFloat(item.product_discounted_price.toString())
                : parseFloat(item.product_price.toString());

            const itemTotalInclGST = productPriceInclGST * item.quantity;

            // Extract taxable value
            const totalPriceAfterTax = itemTotalInclGST / (1 + gstRate);

            // Extract taxable value
            const itemTaxableValue = itemTotalInclGST / (1 + gstRate);

            const itemTax = itemTotalInclGST - itemTaxableValue;

            taxableProductTotal += itemTaxableValue;
            totalProductQuantity += item.quantity;

            if (isIntraState) {
                cgst += itemTax / 2;
                sgst += itemTax / 2;
            } else {
                igst += itemTax;
            }

            return {
                ...item,
                index: index + 1,
                totalPriceAfterTax: totalPriceAfterTax.toFixed(2),
                gstRate: gstRate * 100,
                itemTaxableValue: itemTaxableValue.toFixed(2),
                itemTax: isIntraState ? (itemTax / 2).toFixed(2) : itemTax.toFixed(2),
            }
        });

        const shippingPriceInclGST = parseFloat(order.shipping_charges.toString() || '0.00');

        // assume shipping GST same as 18% (or make dynamic if needed)
        const SHIPPING_GST = 0.18;

        const taxableShippingCharge = shippingPriceInclGST > 0 ? shippingPriceInclGST / (1 + SHIPPING_GST) : 0;

        const shippingTax = shippingPriceInclGST - taxableShippingCharge;

        if (isIntraState) {
            cgstTotal = cgst + (shippingTax / 2);
            sgstTotal = sgst + (shippingTax / 2);
        } else {
            igstTotal = igst + shippingTax;
        }

        // ---------------- SUBTOTAL ----------------
        const subTotalCharges = taxableProductTotal + taxableShippingCharge;

        // ---------------- TOTAL TAX ----------------
        const totalTax = cgstTotal + sgstTotal + igstTotal;

        // ---------------- TOTALS ----------------
        const totalPriceWithoutTax = taxableProductTotal;
        const totalPriceWithoutTaxIncludingShipping = subTotalCharges;

        const discountPrice = parseFloat(order.discount.toString() || '0');

        // Final payable amount
        const totalOrderValue = subTotalCharges + totalTax - discountPrice;

        const payload = {
            ackDate: HelperUtil.formatDate(currentDate.toISOString()),
            ackNumber: ackNo,
            userName: order.user?.name,
            userAddress: order.order_address?.address,
            userCity: order.order_address?.city,
            userPostalCode: order.order_address?.postal_code,
            userState: order.order_address?.state,
            isIntraState,
            orderItems,
            taxableShippingCharge: taxableShippingCharge.toFixed(2),
            SHIPPING_GST: SHIPPING_GST * 100,
            shippingTax: isIntraState ? (shippingTax / 2).toFixed(2) : shippingTax.toFixed(2),
            totalShippingTax: shippingTax.toFixed(2),
            totalPriceWithoutTaxIncludingShipping: totalPriceWithoutTaxIncludingShipping.toFixed(2),
            totalPriceWithoutTax: totalPriceWithoutTax.toFixed(2),
            cgstTotal: cgstTotal.toFixed(2),
            sgstTotal: sgstTotal.toFixed(2),
            igstTotal: igstTotal.toFixed(2),
            totalTax: totalTax.toFixed(2),
            totalOrderValue: totalOrderValue.toFixed(2),
            totalProductQuantity: totalProductQuantity,
            totalAmountInWords: HelperUtil.numberToWord(totalOrderValue),
            totalTaxInWords: HelperUtil.numberToWord(parseFloat(totalTax.toFixed(2))),
            subTotalCharges: subTotalCharges.toFixed(2),
            discountPrice: discountPrice.toFixed(2),
            shippingCharges: order.shipping_charges.toFixed(2),
        }

        const html = pug.renderFile(filePath, payload);

        // 2. Launch browser
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });

        const page = await browser.newPage();

        // 3. Set content
        await page.setContent(html, { waitUntil: 'networkidle0' });

        // 4. Generate PDF
        const pdfBuffer = await page.pdf({
            width: "12in",
            height: "18in",
            printBackground: true,
            margin: {
                top: '5mm',
                bottom: '5mm',
                left: '5mm',
                right: '5mm',
            },
        });

        await browser.close();

        return pdfBuffer;
    }
}