import { page_routes } from "@/utils/routes/page_routes";
import type { AvailableRoles } from "@/utils/types";
import {
  IconCategory2,
  IconColorFilter,
  IconContract,
  // IconHelpHexagon,
  IconHome,
  IconMailbox,
  IconPolaroidFilled,
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
  {
    link: page_routes.pincode.link,
    label: page_routes.pincode.name,
    icon: IconMailbox,
    canAccess: "Admin",
  },
  {
    link: page_routes.heroImage.link,
    label: page_routes.heroImage.name,
    icon: IconPolaroidFilled,
    canAccess: "Admin",
  },
  {
    link: page_routes.categories.link,
    label: page_routes.categories.name,
    icon: IconCategory2,
    canAccess: "Admin",
  },
  {
    link: page_routes.ingredients.link,
    label: page_routes.ingredients.name,
    icon: IconContract,
    canAccess: "Admin",
  },
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