// useHeroImageTable.ts

import { useHeroImagesQuery } from "@/utils/data/query/hero_image";

export function useHeroImageTable() {

  const query = useHeroImagesQuery();

  return {
    ...query,
  };
}
