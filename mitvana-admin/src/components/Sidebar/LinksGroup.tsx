import { useState } from "react";
import PermittedLayout from "@/layouts/PermittedLayout";
import { NavLink } from "react-router";
import { Collapse, Group, rem, UnstyledButton } from "@mantine/core";
import LinkContainer from "./LinkContainer";
import { IconChevronRight } from "@tabler/icons-react";
import classes from "./index.module.css";
import type { LinksGroupProps } from "./menus";

export default function LinksGroup({
  icon: Icon,
  label,
  initiallyOpened,
  links,
  link,
  canAccess,
}: LinksGroupProps) {
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const items = (hasLinks ? links : []).map((link) => (
    <PermittedLayout
      outletType="children"
      allowedRoles={link.canAccess}
      allowLoading={false}
      key={link.label}
    >
      <NavLink
        className={({ isActive }) =>
          `${classes.sub_link} ${isActive ? classes.active : ""}`
        }
        to={link.link}
        key={link.label}
      >
        {link.label}
      </NavLink>
    </PermittedLayout>
  ));

  return hasLinks ? (
    <PermittedLayout
      outletType="children"
      allowedRoles={canAccess}
      allowLoading={false}
    >
      <UnstyledButton
        onClick={() => setOpened((o) => !o)}
        className={classes.control_button}
      >
        <Group
          justify="space-between"
          gap={0}
          className={`${classes.control} ${classes.control_group_btn}`}
        >
          <LinkContainer icon={Icon} label={label} canAccess={canAccess} />
          {hasLinks && (
            <IconChevronRight
              className={classes.chevron}
              stroke={1.5}
              style={{
                width: rem(16),
                height: rem(16),
                transform: opened ? "rotate(-90deg)" : "none",
              }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </PermittedLayout>
  ) : (
    <PermittedLayout
      outletType="children"
      allowedRoles={canAccess}
      allowLoading={false}
    >
      <NavLink
        to={link ? link : "/"}
        className={({ isActive }) =>
          `${classes.control} ${isActive ? classes.active : ""}`
        }
      >
        <Group justify="space-between" gap={0}>
          <LinkContainer icon={Icon} label={label} canAccess={canAccess} />
        </Group>
      </NavLink>
    </PermittedLayout>
  );
}
