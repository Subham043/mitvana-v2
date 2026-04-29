import { registerAs } from "@nestjs/config";

export default registerAs('bluedart', () => ({
    shipping_api_token: process.env.SHIPPING_API_TOKEN,
}));