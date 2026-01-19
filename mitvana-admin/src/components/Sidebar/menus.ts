import { page_routes } from "@/utils/routes/page_routes";
import type { AvailableRoles } from "@/utils/types";
import {
  IconColorFilter,
  // IconHelpHexagon,
  IconHome,
  IconTag,
  IconUserPlus,
  IconUsers,
} from "@tabler/icons-react";



export interface LinksGroupProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: React.FC<any>;
  label: string;
  link?: string;
  initiallyOpened?: boolean;
  canAccess: AvailableRoles;
  links?: {
    label: string;
    link: string;
    canAccess: AvailableRoles;
  }[];
}

export const menus: LinksGroupProps[] = [
  {
    link: page_routes.dashboard.link,
    label: page_routes.dashboard.name,
    icon: IconHome,
    canAccess: "Admin",
  },
  {
    link: page_routes.users.link,
    label: page_routes.users.name,
    icon: IconUsers,
    canAccess: "Admin",
  },
  {
    link: page_routes.colors.link,
    label: page_routes.colors.name,
    icon: IconColorFilter,
    canAccess: "Admin",
  },
  {
    link: page_routes.tags.link,
    label: page_routes.tags.name,
    icon: IconTag,
    canAccess: "Admin",
  },
  {
    link: page_routes.subscriptions.link,
    label: page_routes.subscriptions.name,
    icon: IconUserPlus,
    canAccess: "Admin",
  },
  // {
  //   link: page_routes.faqs.link,
  //   label: page_routes.faqs.name,
  //   icon: IconHelpHexagon,
  //   canAccess: "Admin",
  // },
  // {
  //   label: "Admin",
  //   icon: IconUserHexagon,
  //   initiallyOpened: false,
  //   canAccess: ["ORG_ADMIN", "SUPER_ADMIN"],
  //   links: [
  //     {
  //       label: page_routes.users.name,
  //       link: page_routes.users.link,
  //       canAccess: ["ORG_ADMIN", "SUPER_ADMIN"],
  //     },
  //     {
  //       label: page_routes.departments.name,
  //       link: page_routes.departments.link,
  //       canAccess: ["ORG_ADMIN", "SUPER_ADMIN"],
  //     },
  //     {
  //       label: page_routes.organizations.name,
  //       link: page_routes.organizations.link,
  //       canAccess: ["SUPER_ADMIN"],
  //     },
  //     {
  //       label: page_routes.applications.name,
  //       link: page_routes.applications.link,
  //       canAccess: ["ORG_ADMIN", "SUPER_ADMIN"],
  //     },
  //     {
  //       label: page_routes.manageDocs.name,
  //       link: page_routes.manageDocs.link,
  //       canAccess: ["ORG_ADMIN", "SUPER_ADMIN"],
  //     },
  //   ],
  // },
];