import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { sql } from 'drizzle-orm';
import { DashboardRepositoryInterface } from '../interface/dashboard.repository.interface';
import { DashboardEntity } from '../entity/dashboard.entity';

@Injectable()
export class DashboardRepository implements DashboardRepositoryInterface {
  constructor(private readonly databaseClient: DatabaseService) { }

  async getStats(): Promise<DashboardEntity> {
    const result = await this.databaseClient.db.execute(sql<DashboardEntity>`
      SELECT
        -- USERS
        (SELECT COUNT(*) FROM users) AS total_users,

        (SELECT COUNT(*)
        FROM users
        WHERE email_verified_at IS NOT NULL
        ) AS total_verified_users,

        (SELECT COUNT(*)
        FROM users
        WHERE email_verified_at IS NULL
        ) AS total_unverified_users,

        (SELECT COUNT(*)
        FROM users
        WHERE is_blocked = true
        ) AS total_blocked_users,

        (SELECT COUNT(*)
        FROM users
        WHERE is_blocked = false
        ) AS total_active_users,

        -- SUBSCRIPTIONS
        (SELECT COUNT(*)
        FROM subscription
        ) AS total_subscriptions,

        -- HERO IMAGES
        (SELECT COUNT(*)
        FROM hero_image
        ) AS total_hero_images,

        -- PINCODES
        (SELECT COUNT(*)
        FROM pincode
        ) AS total_pincodes,

        -- COLORS
        (SELECT COUNT(*)
        FROM color
        ) AS total_colors,

        -- TAGS
        (SELECT COUNT(*)
        FROM tag
        ) AS total_tags,

        -- INGREDIENTS
        (SELECT COUNT(*)
        FROM ingredient
        ) AS total_ingredients,

        -- CATEGORIES
        (SELECT COUNT(*)
        FROM category
        ) AS total_categories,

        -- COUPON CODES
        (SELECT COUNT(*)
        FROM coupon_code
        ) AS total_coupon_codes,

        (SELECT COUNT(*)
        FROM coupon_code
        WHERE is_draft = false
          AND expiration_date >= NOW()
          AND times_redeemed <= maximum_redemptions
        ) AS total_active_coupon_codes,

        -- OFFERS
        (SELECT COUNT(*)
        FROM offer
        ) AS total_offers,

        -- PRODUCT REVIEWS
        (SELECT COUNT(*)
        FROM product_review
        ) AS total_product_reviews,

        (SELECT COUNT(*)
        FROM product_review
        WHERE status = 'pending'
        ) AS total_pending_product_reviews,

        (SELECT COUNT(*)
        FROM product_review
        WHERE status = 'approved'
        ) AS total_approved_product_reviews,

        (SELECT COUNT(*)
        FROM product_review
        WHERE status = 'rejected'
        ) AS total_rejected_product_reviews,

        (SELECT CAST(ROUND(COALESCE(AVG(rating), 0), 1) AS DOUBLE)
        FROM product_review
        WHERE status = 'approved'
        ) AS average_rating,

        (SELECT COUNT(*)
        FROM product_review
        WHERE status = 'approved'
          AND rating = 1
        ) AS total_one_rating,

        (SELECT COUNT(*)
        FROM product_review
        WHERE status = 'approved'
          AND rating = 2
        ) AS total_two_rating,

        (SELECT COUNT(*)
        FROM product_review
        WHERE status = 'approved'
          AND rating = 3
        ) AS total_three_rating,

        (SELECT COUNT(*)
        FROM product_review
        WHERE status = 'approved'
          AND rating = 4
        ) AS total_four_rating,

        (SELECT COUNT(*)
        FROM product_review
        WHERE status = 'approved'
          AND rating = 5
        ) AS total_five_rating,

        -- PRODUCTS
        (SELECT COUNT(*)
        FROM product
        ) AS total_products,

        (SELECT COUNT(*)
        FROM product
        WHERE is_draft = false
        ) AS total_active_products,

        (SELECT COUNT(*)
        FROM product
        WHERE is_draft = true
        ) AS total_inactive_products,

        -- ORDERS
        (SELECT COUNT(*)
        FROM \`order\`
        ) AS total_orders,

        (SELECT COUNT(*)
        FROM \`order\`
        WHERE status = 'Order Created'
        ) AS total_order_created,

        (SELECT COUNT(*)
        FROM \`order\`
        WHERE status = 'Order Placed'
        ) AS total_order_placed,

        (SELECT COUNT(*)
        FROM \`order\`
        WHERE status = 'On Hold'
        ) AS total_order_on_hold,

        (SELECT COUNT(*)
        FROM \`order\`
        WHERE status = 'Processing'
        ) AS total_order_processing,

        (SELECT COUNT(*)
        FROM \`order\`
        WHERE status = 'Dispatched'
        ) AS total_order_dispatched,

        (SELECT COUNT(*)
        FROM \`order\`
        WHERE status = 'In Transit'
        ) AS total_order_in_transit,

        (SELECT COUNT(*)
        FROM \`order\`
        WHERE status = 'Out for Delivery'
        ) AS total_order_out_for_delivery,

        (SELECT COUNT(*)
        FROM \`order\`
        WHERE status = 'Delivered'
        ) AS total_order_delivered,

        (SELECT COUNT(*)
        FROM \`order\`
        WHERE status = 'Cancelled by Admin'
        ) AS total_order_cancelled_by_admin,

        (SELECT COUNT(*)
        FROM \`order\`
        WHERE status = 'Cancelled by user'
        ) AS total_order_cancelled_by_user,

        (SELECT COUNT(*)
        FROM \`order\`
        WHERE status = 'Refunded'
        ) AS total_order_refunded,

        (SELECT COUNT(*)
        FROM \`order\`
        WHERE status = 'Payment Failed'
        ) AS total_order_payment_failed,

        (SELECT COUNT(*)
        FROM \`order\`
        WHERE status = 'Failed'
        ) AS total_order_failed,

        -- REFUNDS
        (SELECT COALESCE(SUM(total_price), 0)
        FROM \`order\`
        WHERE status = 'Refunded'
        ) AS total_refunded_amount,

        -- TOTAL AMOUNT
        (SELECT COALESCE(SUM(total_price), 0)
        FROM \`order\`
        WHERE status != 'Failed'
          AND status != 'Payment Failed'
          AND status != 'Order Created'
        ) AS total_amount,

        -- REVENUE
        (SELECT COALESCE(SUM(total_price), 0)
        FROM \`order\`
        WHERE status IN (
          'Order Placed',
          'On Hold',
          'Processing',
          'Dispatched',
          'In Transit',
          'Out for Delivery',
          'Delivered'
        )
        ) AS total_revenue
    `);
    return result[0][0] as DashboardEntity;
  }
}
