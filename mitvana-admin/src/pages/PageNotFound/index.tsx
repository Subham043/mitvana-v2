import {
  Button,
  Center,
  Container,
  Image,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";
import image from "@/assets/images/page404.svg";
import classes from "./index.module.css";
import { NavLink } from "react-router";
import { page_routes } from "@/utils/routes/page_routes";

/*
 * 404 Page
 */
function PageNotFound() {
  return (
    <Container className={classes.root}>
      <Center w="100%" h="100dvh">
        <SimpleGrid
          spacing={{ base: 40, sm: 80 }}
          cols={{ base: 1, sm: 2 }}
          className={classes.grid_center}
        >
          <Image src={image} className={classes.mobileImage} />
          <div>
            <Title className={classes.title}>Something is not right...</Title>
            <Text c="dimmed" size="lg">
              Page you are trying to open does not exist. You may have mistyped
              the address, or the page has been moved to another URL. If you
              think this is an error contact support.
            </Text>
            <Button
              variant="outline"
              component={NavLink}
              to={page_routes.dashboard.link}
              size="md"
              mt="xl"
              className={classes.control}
            >
              Get back to home page
            </Button>
          </div>
          <Image src={image} className={classes.desktopImage} />
        </SimpleGrid>
      </Center>
    </Container>
  );
}

export default PageNotFound;
