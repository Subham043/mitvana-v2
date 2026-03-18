import type { ProductFormValuesType } from "@/utils/data/schema/product";
import {
  ActionIcon,
  Box,
  Divider,
  Group,
  Paper,
  Table,
  Textarea,
  Title,
} from "@mantine/core";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { useCallback } from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";

function ProductFaqForm() {
  const { control } = useFormContext<ProductFormValuesType>();

  const {
    fields: faqsFields,
    append: appendFaqs,
    remove: removeFaqs,
  } = useFieldArray({
    control: control,
    name: "faqs",
    keyName: "id",
  });

  const addFaqs = useCallback(() => {
    appendFaqs({
      question: "",
      answer: "",
      id: undefined,
    });
  }, [appendFaqs]);

  const deleteFaqs = useCallback(
    (index: number) => {
      removeFaqs(index);
    },
    [removeFaqs],
  );

  return (
    <Paper shadow="xs" withBorder mt="md">
      <Box p="sm" pos="relative">
        <Group justify="space-between" align="center" gap="md">
          <Title order={4}>Frequently Asked Questions</Title>
          <ActionIcon
            variant="outline"
            color="blue"
            aria-label="Add"
            onClick={() => addFaqs()}
          >
            <IconPlus style={{ width: "70%", height: "70%" }} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Box>
      {faqsFields && faqsFields.length > 0 && (
        <>
          <Divider />
          <Box pos="relative">
            <Table.ScrollContainer minWidth={800} p={undefined} m={undefined}>
              <Table horizontalSpacing="md">
                <Table.Thead>
                  <Table.Tr bg={"var(--mantine-color-blue-light)"}>
                    <Table.Th>QUESTION</Table.Th>
                    <Table.Th>ANSWER</Table.Th>
                    <Table.Th w={10} />
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {faqsFields.map((field, index) => (
                    <Table.Tr key={field.id}>
                      <Table.Td>
                        <Controller
                          control={control}
                          name={`faqs.${index}.question`}
                          render={({ field, fieldState }) => (
                            <Textarea
                              placeholder="Question"
                              value={field.value}
                              onChange={field.onChange}
                              error={fieldState.error?.message}
                              rows={3}
                              withAsterisk
                            />
                          )}
                        />
                      </Table.Td>
                      <Table.Td>
                        <Controller
                          control={control}
                          name={`faqs.${index}.answer`}
                          render={({ field, fieldState }) => (
                            <Textarea
                              placeholder="Answer"
                              value={field.value}
                              onChange={field.onChange}
                              error={fieldState.error?.message}
                              rows={3}
                              withAsterisk
                            />
                          )}
                        />
                      </Table.Td>
                      <Table.Td>
                        <Group align="center" gap="xs" justify="flex-end">
                          <ActionIcon
                            variant="outline"
                            color="red"
                            aria-label="Delete"
                            onClick={() => deleteFaqs(index)}
                          >
                            <IconTrash
                              style={{ width: "70%", height: "70%" }}
                              stroke={1.5}
                            />
                          </ActionIcon>
                        </Group>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </Table.ScrollContainer>
          </Box>
        </>
      )}
    </Paper>
  );
}

export default ProductFaqForm;
