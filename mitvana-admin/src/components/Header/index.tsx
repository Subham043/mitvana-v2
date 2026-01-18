import {
  AppShell,
  Avatar,
  Box,
  Burger,
  Button,
  Group,
  Menu,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { IconChevronDown, IconLogout, IconUser } from "@tabler/icons-react";
import { useCallback, useMemo } from "react";
import { Link, useLocation } from "react-router";
import { page_routes } from "@/utils/routes/page_routes";
import { useAuthStore } from "@/stores/auth.store";
import { useLogoutMutation } from "@/utils/data/mutation/profile";

type Props = {
  opened: boolean;
  toggle: () => void;
};

function Header({ opened, toggle }: Props) {
  const theme = useMantineTheme();
  const location = useLocation();
  // const { colorScheme, setColorScheme } = useMantineColorScheme();
  const authUser = useAuthStore((state) => state.authUser);
  const logout = useLogoutMutation();

  const page_name = useMemo(() => {
    const activeRoute = Object.values(page_routes).find((route) =>
      location.pathname.includes(route.link),
    );
    return activeRoute?.name || page_routes.dashboard.name;
  }, [location.pathname]);

  const onLogoutHandler = useCallback(() => logout.mutate(), [logout]);

  return (
    <AppShell.Header className="no-print">
      <Group h="100%" px="md" justify="space-between">
        <Box>
          {/* <Title order={3} ml="5px" tt="uppercase">AAAEDU</Title> */}
          <Group gap={10} align="center">
            <Burger opened={opened} onClick={toggle} size="md" />
            <Title order={3} lh={0}>
              {page_name.toLocaleUpperCase()}
            </Title>
          </Group>
        </Box>
        <Group gap={20}>
          <Menu
            width={160}
            position="bottom-end"
            transitionProps={{ transition: "pop-top-right" }}
            withinPortal={false}
          >
            <Menu.Target>
              <Button variant="default" px="xs" disabled={!authUser}>
                <Group gap={7}>
                  <Text fw={500} size="sm" lh={1} mr={3}>
                    {authUser ? authUser.name : "User"}
                  </Text>
                  <Avatar
                    name={authUser ? authUser.name : "User"}
                    color="initials"
                    alt={authUser ? authUser.name : "User"}
                    radius="xl"
                    size={20}
                  />
                  <IconChevronDown size={12} stroke={1.5} />
                </Group>
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                leftSection={
                  <IconUser
                    size={16}
                    color={theme.colors.blue[6]}
                    stroke={1.5}
                  />
                }
                component={Link}
                to={page_routes.profile.link}
              >
                {page_routes.profile.name}
              </Menu.Item>
              <Menu.Item
                leftSection={
                  <IconLogout
                    size={16}
                    color={theme.colors.red[6]}
                    stroke={1.5}
                  />
                }
                disabled={logout.isPending || !authUser}
                onClick={() => onLogoutHandler()}
              >
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Group>
    </AppShell.Header>
  );
}

export default Header;
