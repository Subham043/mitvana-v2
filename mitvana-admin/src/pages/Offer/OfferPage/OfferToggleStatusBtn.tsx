import CustomLoading from "@/components/CustomLoading";
import { useOfferToggleStatusMutation } from "@/utils/data/mutation/offers";
import { Menu } from "@mantine/core";
import { IconNotes, IconNotesOff } from "@tabler/icons-react";
import { useCallback } from "react";

const OfferToggleStatusBtn = ({
  id,
  is_draft,
}: {
  id: string;
  is_draft: boolean;
}) => {
  const offerToggleStatus = useOfferToggleStatusMutation(id);

  const onToggleStatus = useCallback(async () => {
    await offerToggleStatus.mutateAsync({
      is_draft: !is_draft,
    });
  }, [offerToggleStatus.mutateAsync]);

  return (
    <Menu.Item
      leftSection={
        !offerToggleStatus.isPending ? (
          is_draft ? (
            <IconNotes size={16} stroke={1.5} />
          ) : (
            <IconNotesOff size={16} stroke={1.5} />
          )
        ) : undefined
      }
      onClick={onToggleStatus}
      disabled={offerToggleStatus.isPending}
    >
      {offerToggleStatus.isPending ? (
        <CustomLoading size="xs" />
      ) : (
        <> {is_draft ? "Publish" : "Draft"} </>
      )}
    </Menu.Item>
  );
};

export default OfferToggleStatusBtn;
