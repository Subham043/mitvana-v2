import {
  ActionIcon,
  Menu,
  type FloatingPosition,
  type PopoverWidth,
} from "@mantine/core";
import { IconDots } from "@tabler/icons-react";
import type React from "react";

function TrippleDotMenu({
  children,
  width = 100,
  position = "bottom",
  loading = false,
}: {
  children: React.ReactNode;
  width?: PopoverWidth;
  position?: FloatingPosition;
  loading?: boolean;
}) {
  return (
    <Menu
      withArrow
      width={width}
      position={position}
      transitionProps={{ transition: "pop" }}
      withinPortal
    >
      <Menu.Target>
        <ActionIcon variant="default" loading={loading} disabled={loading}>
          <IconDots size={16} stroke={1.5} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>{children}</Menu.Dropdown>
    </Menu>
  );
}

export default TrippleDotMenu;
