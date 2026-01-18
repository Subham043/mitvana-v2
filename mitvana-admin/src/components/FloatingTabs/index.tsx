import { NavLink } from "react-router";
import { FloatingIndicator } from "@mantine/core";
import classes from "./index.module.css";
import { useState } from "react";

type Props = {
  links: { name: string; link: string }[];
};

const FloatingTabs = ({ links }: Props) => {
  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  const [controlsRefs, setControlsRefs] = useState<
    Record<string, HTMLAnchorElement | null>
  >({});
  const [active, setActive] = useState(0);

  const setControlRef = (index: number) => (node: HTMLAnchorElement) => {
    controlsRefs[index] = node;
    setControlsRefs(controlsRefs);
  };

  return (
    <div className={classes.root} ref={setRootRef}>
      {links.map((item, index) => (
        <NavLink
          key={item.name}
          to={item.link}
          className={({ isActive }) => {
            if (isActive) {
              setActive(index);
            }
            return `${classes.control} ${isActive ? classes.active : ""}`;
          }}
          ref={setControlRef(index)}
        >
          <span className={classes.controlLabel}>
            {item.name.toLocaleUpperCase()}
          </span>
        </NavLink>
      ))}

      <FloatingIndicator
        target={controlsRefs[active]}
        parent={rootRef}
        className={classes.indicator}
      />
    </div>
  );
};

export default FloatingTabs;
