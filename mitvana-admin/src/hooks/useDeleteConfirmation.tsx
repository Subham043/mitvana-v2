import { DeleteContext } from "@/contexts/DeleteProvider";
import { useContext } from "react";

export const useDeleteConfirmation = () => useContext(DeleteContext);