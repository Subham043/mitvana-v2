import { Box } from "@mantine/core";
import classes from "./index.module.css";
import type { LinksGroupProps } from "./menus";

export default function LinkContainer({ icon: Icon, label }: LinksGroupProps) {
  return (
    <Box style={{ display: "flex", alignItems: "center" }}>
      <Icon className={classes.linkIcon} stroke={1.5} />
      <Box ml="md">{label}</Box>
    </Box>
  );
}
