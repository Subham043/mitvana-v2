import { IconLogout, IconUser } from "@tabler/icons-react";
import { AppShell, Button, Group, Image, ScrollArea } from "@mantine/core";
import classes from "./index.module.css";
import { NavLink } from "react-router";
import logo from "@/assets/images/cropped-logo.svg";
import { page_routes } from "@/utils/routes/page_routes";
import LinkContainer from "./LinkContainer";
import LinksGroup from "./LinksGroup";
import { menus } from "./menus";
import CustomLoading from "../CustomLoading";
import { useAuthStore } from "@/stores/auth.store";
import { useLogoutMutation } from "@/utils/data/mutation/profile";
import { useCallback } from "react";

export default function Sidebar() {
  const authToken = useAuthStore((state) => state.authToken);
  const logout = useLogoutMutation();

  const onLogoutHandler = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault();
      logout.mutate();
    },
    [logout],
  );

  return (
    <AppShell.Navbar pt="md" pb="md" bg="#535353" className="no-print">
      <Group justify="center">
        <Image h={57} w="auto" fit="contain" src={logo} />
      </Group>
      <AppShell.Section grow my="md" component={ScrollArea}>
        {!authToken ? (
          <CustomLoading color="white" size="sm" type="dots" />
        ) : (
          <>
            {menus.map((item) => (
              <LinksGroup {...item} key={item.label} />
            ))}
          </>
        )}
      </AppShell.Section>
      <AppShell.Section>
        <div className={classes.footer}>
          <NavLink
            to={page_routes.profile.link}
            className={({ isActive }) =>
              `${classes.link} ${isActive ? classes.link_active : ""}`
            }
          >
            <Group justify="space-between" gap={0}>
              <LinkContainer
                icon={IconUser}
                label="Profile"
                canAccess={"User"}
              />
            </Group>
          </NavLink>

          <Button
            variant="transparent"
            fullWidth
            loading={logout.isPending}
            disabled={logout.isPending}
            loaderProps={{ type: "dots" }}
            justify="space-between"
            className={classes.link_button}
            aria-disabled={logout.isPending}
            onClick={onLogoutHandler}
          >
            <Group justify="space-between" gap={0}>
              <LinkContainer
                icon={IconLogout}
                label="Logout"
                canAccess={"User"}
              />
            </Group>
          </Button>
        </div>
      </AppShell.Section>
    </AppShell.Navbar>
  );
}
