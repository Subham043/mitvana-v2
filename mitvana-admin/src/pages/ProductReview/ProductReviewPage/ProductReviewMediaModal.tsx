import { ActionIcon, Avatar, Modal, Table } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCameraSpark } from "@tabler/icons-react";
import { PhotoView } from "react-photo-view";

type Props = {
  image: string | null;
  image_link: string | null;
  video: string | null;
  video_link: string | null;
};

function ProductReviewMediaModal({
  image,
  image_link,
  video,
  video_link,
}: Props) {
  const [opened, { open, close }] = useDisclosure(false);
  if (!image && !image_link && !video && !video_link) return "N/A";
  return (
    <>
      <ActionIcon variant="subtle" aria-label="Media" onClick={open}>
        <IconCameraSpark style={{ width: "70%", height: "70%" }} />
      </ActionIcon>
      <Modal opened={opened} onClose={close} title="Media" size="lg">
        <Table variant="vertical" layout="fixed" withTableBorder>
          <Table.Tbody>
            <Table.Tr>
              <Table.Th w={160}>Image</Table.Th>
              <Table.Td>
                {image_link ? (
                  <PhotoView src={image_link}>
                    <Avatar
                      src={image_link}
                      radius="xs"
                      size={90}
                      style={{ cursor: "pointer" }}
                    />
                  </PhotoView>
                ) : (
                  "N/A"
                )}
              </Table.Td>
            </Table.Tr>

            <Table.Tr>
              <Table.Th>Video</Table.Th>
              <Table.Td>
                {video_link ? (
                  <video src={video_link} controls width={350} height={200} />
                ) : (
                  "N/A"
                )}
              </Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
      </Modal>
    </>
  );
}

export default ProductReviewMediaModal;
