import { useHeroImagesExportMutation } from "@/utils/data/mutation/hero_images";
import { Button } from "@mantine/core";
import { useCallback } from "react";

const HeroImageExportBtn = () => {
  const heroImageExportMutation = useHeroImagesExportMutation();

  const onExport = useCallback(async () => {
    await heroImageExportMutation.mutateAsync();
  }, [heroImageExportMutation.mutateAsync]);

  return (
    <Button
      variant="filled"
      color="cyan"
      onClick={onExport}
      disabled={heroImageExportMutation.isPending}
      loading={heroImageExportMutation.isPending}
    >
      Export
    </Button>
  );
};

export default HeroImageExportBtn;
