import type { FallbackProps } from "react-error-boundary";
import {
  Button,
  Center,
  Container,
  Image,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";
import image from "@/assets/images/error.png";
import classes from "./index.module.css";
import { isAxiosError } from "axios";

export default function ErrorFallback({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  const errorMessage = () => {
    if (isAxiosError(error)) {
      return error.response?.data?.message;
    }
    if (error instanceof Error) {
      return error.message;
    }
    return "Our app is having some issues at the moment. Please try again later.";
  };
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
            <Title className={classes.title}>Something went wrong...</Title>
            <Text c="dimmed" size="lg">
              {errorMessage()}
            </Text>
            <Button
              variant="outline"
              onClick={resetErrorBoundary}
              size="md"
              mt="xl"
              type="button"
              className={classes.control}
            >
              Try again
            </Button>
          </div>
          <Image src={image} className={classes.desktopImage} />
        </SimpleGrid>
      </Center>
    </Container>
  );
}
