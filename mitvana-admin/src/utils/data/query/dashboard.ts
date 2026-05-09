import { useAuthStore } from "@/stores/auth.store";
import type { DashboardType } from "@/utils/types";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { getDashboardHandler } from "../dal/dashboard";
import {
    IconBan,
    IconBox,
    IconCategory,
    IconCheck,
    IconChecklist,
    IconCircleCheck,
    IconCircleDashed,
    IconCircleX,
    IconColorSwatch,
    IconCurrencyDollar,
    IconDiscount2,
    IconFileDollar,
    IconHelpOctagon,
    IconHome,
    IconMapPin,
    IconPackage,
    IconPhoto,
    IconReceipt2,
    IconRefresh,
    IconShoppingBag,
    IconShoppingCart,
    IconStar,
    IconStars,
    IconTag,
    IconTicket,
    IconTruck,
    IconUser,
    IconUserCheck,
    IconUserOff,
    IconUsers,
    IconX,
    type IconProps,
} from "@tabler/icons-react";

const UserGraphContent = [
    "total_verified_users",
    "total_unverified_users",
    "total_blocked_users",
    "total_active_users",
];

const ReviewStatusGraphContent = [
    "total_pending_product_reviews",
    "total_approved_product_reviews",
    "total_rejected_product_reviews",
];

const RatingGraphContent = [
    "total_one_rating",
    "total_two_rating",
    "total_three_rating",
    "total_four_rating",
    "total_five_rating",
];

const ProductGraphContent = [
    "total_active_products",
    "total_inactive_products",
];

const OrderStatusGraphContent = [
    "total_order_created",
    "total_order_placed",
    "total_order_on_hold",
    "total_order_processing",
    "total_order_dispatched",
    "total_order_in_transit",
    "total_order_out_for_delivery",
    "total_order_delivered",
    "total_order_cancelled_by_admin",
    "total_order_cancelled_by_user",
    "total_order_refunded",
    "total_order_payment_failed",
    "total_order_failed",
];

const RevenueGraphContent = [
    "total_refunded_amount",
    "total_amount",
    "total_revenue",
];

const dashboardKeyIconMap: Record<
    keyof DashboardType,
    {
        Icon: React.FC<IconProps>;
        color: string;
    }
> = {
    total_users: {
        Icon: IconUsers,
        color: "var(--mantine-color-blue-filled)",
    },
    total_verified_users: {
        Icon: IconUserCheck,
        color: "var(--mantine-color-green-filled)",
    },
    total_unverified_users: {
        Icon: IconUserOff,
        color: "var(--mantine-color-yellow-filled)",
    },
    total_blocked_users: {
        Icon: IconBan,
        color: "var(--mantine-color-red-filled)",
    },
    total_active_users: {
        Icon: IconUser,
        color: "var(--mantine-color-teal-filled)",
    },
    total_subscriptions: {
        Icon: IconChecklist,
        color: "var(--mantine-color-indigo-filled)",
    },
    total_hero_images: {
        Icon: IconPhoto,
        color: "var(--mantine-color-pink-filled)",
    },
    total_pincodes: {
        Icon: IconMapPin,
        color: "var(--mantine-color-red-filled)",
    },
    total_colors: {
        Icon: IconColorSwatch,
        color: "var(--mantine-color-violet-filled)",
    },
    total_tags: {
        Icon: IconTag,
        color: "var(--mantine-color-orange-filled)",
    },
    total_ingredients: {
        Icon: IconBox,
        color: "var(--mantine-color-cyan-filled)",
    },
    total_categories: {
        Icon: IconCategory,
        color: "var(--mantine-color-grape-filled)",
    },
    total_coupon_codes: {
        Icon: IconTicket,
        color: "var(--mantine-color-yellow-filled)",
    },
    total_active_coupon_codes: {
        Icon: IconDiscount2,
        color: "var(--mantine-color-green-filled)",
    },
    total_offers: {
        Icon: IconStars,
        color: "var(--mantine-color-pink-filled)",
    },
    total_product_reviews: {
        Icon: IconStar,
        color: "var(--mantine-color-yellow-filled)",
    },
    total_pending_product_reviews: {
        Icon: IconCircleDashed,
        color: "var(--mantine-color-orange-filled)",
    },
    total_approved_product_reviews: {
        Icon: IconCircleCheck,
        color: "var(--mantine-color-green-filled)",
    },
    total_rejected_product_reviews: {
        Icon: IconCircleX,
        color: "var(--mantine-color-red-filled)",
    },
    average_rating: {
        Icon: IconStar,
        color: "var(--mantine-color-yellow-filled)",
    },
    total_one_rating: {
        Icon: IconStar,
        color: "var(--mantine-color-red-filled)",
    },
    total_two_rating: {
        Icon: IconStar,
        color: "var(--mantine-color-orange-filled)",
    },
    total_three_rating: {
        Icon: IconStar,
        color: "var(--mantine-color-yellow-filled)",
    },
    total_four_rating: {
        Icon: IconStar,
        color: "var(--mantine-color-lime-filled)",
    },
    total_five_rating: {
        Icon: IconStar,
        color: "var(--mantine-color-green-filled)",
    },
    total_products: {
        Icon: IconPackage,
        color: "var(--mantine-color-blue-filled)",
    },
    total_active_products: {
        Icon: IconCheck,
        color: "var(--mantine-color-green-filled)",
    },
    total_inactive_products: {
        Icon: IconX,
        color: "var(--mantine-color-red-filled)",
    },
    total_orders: {
        Icon: IconShoppingCart,
        color: "var(--mantine-color-blue-filled)",
    },
    total_order_created: {
        Icon: IconShoppingBag,
        color: "var(--mantine-color-gray-filled)",
    },
    total_order_placed: {
        Icon: IconReceipt2,
        color: "var(--mantine-color-blue-filled)",
    },
    total_order_on_hold: {
        Icon: IconCircleDashed,
        color: "var(--mantine-color-yellow-filled)",
    },
    total_order_processing: {
        Icon: IconRefresh,
        color: "var(--mantine-color-orange-filled)",
    },
    total_order_dispatched: {
        Icon: IconTruck,
        color: "var(--mantine-color-indigo-filled)",
    },
    total_order_in_transit: {
        Icon: IconTruck,
        color: "var(--mantine-color-cyan-filled)",
    },
    total_order_out_for_delivery: {
        Icon: IconTruck,
        color: "var(--mantine-color-violet-filled)",
    },
    total_order_delivered: {
        Icon: IconCircleCheck,
        color: "var(--mantine-color-green-filled)",
    },
    total_order_cancelled_by_admin: {
        Icon: IconCircleX,
        color: "var(--mantine-color-red-filled)",
    },
    total_order_cancelled_by_user: {
        Icon: IconX,
        color: "var(--mantine-color-orange-filled)",
    },
    total_order_refunded: {
        Icon: IconRefresh,
        color: "var(--mantine-color-yellow-filled)",
    },
    total_order_payment_failed: {
        Icon: IconFileDollar,
        color: "var(--mantine-color-red-filled)",
    },
    total_order_failed: {
        Icon: IconCircleX,
        color: "var(--mantine-color-dark-filled)",
    },
    total_refunded_amount: {
        Icon: IconRefresh,
        color: "var(--mantine-color-orange-filled)",
    },
    total_amount: {
        Icon: IconCurrencyDollar,
        color: "var(--mantine-color-blue-filled)",
    },
    total_revenue: {
        Icon: IconHome,
        color: "var(--mantine-color-green-filled)",
    },
};

const formatLabel = (key: string) =>
    key
        .replace(/[_-]/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());

const createGraphData = (
    resp: DashboardType,
    keys: string[],
) => {
    return Object.entries(resp)
        .filter(([key]) => keys.includes(key))
        .map(([key, value]) => ({
            name: formatLabel(key),
            y: Number(value ?? 0),
            color:
                dashboardKeyIconMap[key as keyof DashboardType]?.color ??
                "var(--mantine-color-blue-filled)",
        }));
};


export const DashboardQueryKey = ["dashboard"];

export const DashboardQueryFn = async ({ signal }: { signal?: AbortSignal }) => {
    const resp = await getDashboardHandler(signal);

    const result = Object.entries(resp).map(([key, value]) => ({
        label: formatLabel(key),
        value: Number(value ?? 0),
        icon:
            dashboardKeyIconMap[key as keyof DashboardType]?.Icon ??
            IconHelpOctagon,
        color:
            dashboardKeyIconMap[key as keyof DashboardType]?.color ??
            "var(--mantine-color-blue-filled)",
    }));

    return {
        result,
        graphs: [
            {
                chartTitle: "User Summary",
                data: createGraphData(resp, UserGraphContent),
            },
            {
                chartTitle: "Review Status Summary",
                data: createGraphData(resp, ReviewStatusGraphContent),
            },
            {
                chartTitle: "Rating Summary",
                data: createGraphData(resp, RatingGraphContent),
            },
            {
                chartTitle: "Product Summary",
                data: createGraphData(resp, ProductGraphContent),
            },
            {
                chartTitle: "Order Status Summary",
                data: createGraphData(resp, OrderStatusGraphContent),
            },
            {
                chartTitle: "Revenue Summary",
                data: createGraphData(resp, RevenueGraphContent),
            },
        ],
    };
}

/*
  Dashboard Query Hook Function: This hook is used to fetch information of the logged in user
*/
export const useDashboardQuery: (enabled: boolean) => UseQueryResult<
    {
        result: {
            label: string;
            value: number;
            icon: React.FC<IconProps>;
            color: string;
        }[];
        graphs: {
            chartTitle: string;
            data: {
                name: string;
                y: number;
                color: string;
            }[];
        }[];
    } | undefined,
    unknown
> = (enabled) => {
    const authToken = useAuthStore((state) => state.authToken)

    return useQuery({
        queryKey: DashboardQueryKey,
        queryFn: ({ signal }) => DashboardQueryFn({ signal }),
        enabled: authToken !== null && enabled,
    });
};