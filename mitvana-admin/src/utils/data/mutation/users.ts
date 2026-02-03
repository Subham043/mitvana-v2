import { useToast } from "@/hooks/useToast";
import { useMutation } from "@tanstack/react-query";
import { nprogress } from "@mantine/nprogress";
import type { UserCreateFormValuesType, UserStatusFormValuesType, UserUpdateFormValuesType } from "../schema/user";
import { createUserHandler, deleteUserHandler, toggleUserStatusHandler, updateUserHandler, verifyUserHandler } from "../dal/users";
import { usePaginationQueryParam } from "@/hooks/usePaginationQueryParam";
import { useSearchQueryParam } from "@/hooks/useSearchQueryParam";
import type { PaginationType, UserType } from "@/utils/types";
import { UserQueryKey, UsersQueryKey } from "../query/user";
import { useSearchParams } from "react-router";

export const useUserCreateMutation = () => {
    const { toastSuccess } = useToast();
    const [params] = useSearchParams();
    const { page, limit } = usePaginationQueryParam();
    const { search } = useSearchQueryParam();

    return useMutation({
        mutationFn: async (val: UserCreateFormValuesType) => {
            nprogress.start()
            return await createUserHandler(val);
        },
        onSuccess: (data, __, ___, context) => {
            toastSuccess("User created successfully");
            if (page === 1 && !search) {
                context.client.setQueryData(UsersQueryKey(params), (oldData: PaginationType<UserType> | undefined) => {
                    if (!oldData) return oldData;
                    if (oldData.data.length < limit) {
                        return {
                            ...oldData,
                            data: [data, ...oldData.data],
                            meta: {
                                ...oldData.meta,
                                total: oldData.meta.total + 1,
                            },
                        };
                    } else {
                        const newData = [...oldData.data];
                        newData.splice(limit - 1, 0, data);
                        return {
                            ...oldData,
                            data: [data, ...newData],
                            meta: {
                                ...oldData.meta,
                                total: oldData.meta.total + 1,
                            },
                        };
                    }
                });
            } else {
                context.client.invalidateQueries({ queryKey: UsersQueryKey(params) });
            }
        },
        onSettled: () => {
            nprogress.complete();
        }
    });
};

export const useUserUpdateMutation = (id: string) => {
    const { toastSuccess } = useToast();
    const [params] = useSearchParams();

    return useMutation({
        mutationFn: async (val: UserUpdateFormValuesType) => {
            nprogress.start()
            return await updateUserHandler(id, val);
        },
        onSuccess: (data, __, ___, context) => {
            toastSuccess("User updated successfully");
            context.client.setQueryData(UsersQueryKey(params), (oldData: PaginationType<UserType> | undefined) => {
                if (!oldData) return oldData;
                const oldUserDataIndex = oldData.data.findIndex((user) => user.id === id);
                if (oldUserDataIndex !== -1) {
                    const newData = [...oldData.data];
                    newData[oldUserDataIndex] = data;
                    return {
                        ...oldData,
                        data: newData,
                    };
                }
                return oldData;
            });
            context.client.setQueryData(UserQueryKey(id), data);
            context.client.setQueryData(UserQueryKey(id, true), data);
        },
        onSettled: () => {
            nprogress.complete();
        }
    });
};

export const useUserDeleteMutation = (id: string) => {
    const { toastSuccess, toastError } = useToast();
    const [params] = useSearchParams();

    return useMutation({
        mutationFn: async () => {
            nprogress.start()
            return await deleteUserHandler(id);
        },
        onSuccess: (_, __, ___, context) => {
            toastSuccess("User deleted successfully");
            context.client.invalidateQueries({ queryKey: UsersQueryKey(params) });
            context.client.setQueryData(UserQueryKey(id), undefined);
            context.client.setQueryData(UserQueryKey(id, true), undefined);
        },
        onError: (error: any) => {
            toastError(error?.response?.data?.message || "Something went wrong, please try again later.");
        },
        onSettled: () => {
            nprogress.complete();
        }
    });
};

export const useUserVerifyMutation = (id: string) => {
    const { toastSuccess, toastError } = useToast();
    const [params] = useSearchParams();

    return useMutation({
        mutationFn: async () => {
            nprogress.start()
            return await verifyUserHandler(id);
        },
        onSuccess: (_, __, ___, context) => {
            toastSuccess("User verified successfully");
            context.client.setQueryData(UsersQueryKey(params), (oldData: PaginationType<UserType> | undefined) => {
                if (!oldData) return oldData;
                return {
                    ...oldData,
                    data: oldData.data.map((user) => user.id === id ? { ...user, is_verified: true } : user),
                };
            });
            context.client.setQueryData(UserQueryKey(id), (oldData: UserType | undefined) => {
                if (!oldData) return oldData;
                return { ...oldData, is_verified: true };
            });
            context.client.setQueryData(UserQueryKey(id, true), (oldData: UserType | undefined) => {
                if (!oldData) return oldData;
                return { ...oldData, is_verified: true };
            });
        },
        onError: (error: any) => {
            toastError(error?.response?.data?.message || "Something went wrong, please try again later.");
        },
        onSettled: () => {
            nprogress.complete();
        }
    });
};

export const useUserToggleStatusMutation = (id: string) => {
    const { toastSuccess, toastError } = useToast();
    const [params] = useSearchParams();

    return useMutation({
        mutationFn: async (val: UserStatusFormValuesType) => {
            nprogress.start()
            return await toggleUserStatusHandler(id, val);
        },
        onSuccess: (_, dataParams, ___, context) => {
            toastSuccess("User status toggled successfully");
            context.client.setQueryData(UsersQueryKey(params), (oldData: PaginationType<UserType> | undefined) => {
                if (!oldData) return oldData;
                return {
                    ...oldData,
                    data: oldData.data.map((user) => user.id === id ? { ...user, is_blocked: dataParams.is_blocked } : user),
                };
            });
            context.client.setQueryData(UserQueryKey(id), (oldData: UserType | undefined) => {
                if (!oldData) return oldData;
                return { ...oldData, is_blocked: dataParams.is_blocked };
            });
            context.client.setQueryData(UserQueryKey(id, true), (oldData: UserType | undefined) => {
                if (!oldData) return oldData;
                return { ...oldData, is_blocked: dataParams.is_blocked };
            });
        },
        onError: (error: any) => {
            toastError(error?.response?.data?.message || "Something went wrong, please try again later.");
        },
        onSettled: () => {
            nprogress.complete();
        }
    });
};