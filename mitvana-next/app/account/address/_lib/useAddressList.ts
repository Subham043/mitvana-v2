import { useAddressesQuery } from "@/lib/data/queries/address";
import { ExtendedModalProps } from "@/lib/types";
import { useCallback, useState } from "react";


export const useAddressList = () => {
    const { data, isLoading } = useAddressesQuery();

    const [modal, setModal] = useState<ExtendedModalProps<{ id: string }>>({
        show: false,
        type: "create",
    });

    const handleModalClose = useCallback(
        () => setModal({ show: false, type: "create" }),
        [],
    );

    const handleModalOpen = useCallback(() => {
        setModal({ show: true, type: "create" });
    }, []);

    const handleModalUpdate = useCallback((id: string) => {
        setModal({ show: true, type: "update", id });
    }, []);

    return {
        data,
        isLoading,
        modal,
        handleModalClose,
        handleModalOpen,
        handleModalUpdate,
    };
}