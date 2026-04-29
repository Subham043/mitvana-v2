import { registerAs } from "@nestjs/config";

export default registerAs('razorpay', () => ({
    razorpay_key_secret: process.env.RAZORPAY_KEY_SECRET,
    razorpay_key_id: process.env.RAZORPAY_KEY_ID,
}));