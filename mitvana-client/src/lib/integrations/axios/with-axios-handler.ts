import { isAxiosError } from "axios";

type HandlerSuccess<T> = {
    error: false;
    status: number;
} & T;

type HandlerError<E> = {
    error: true;
    status?: number;
    message: string;
} & E;

type HandlerResponse<T, E> = HandlerSuccess<T> | HandlerError<E>;

export function withAxiosHandler<
    T extends Record<string, any>,
    E extends Record<string, any> = Record<string, any>,
    Args extends any[] = any[]
>(
    handler: (...args: Args) => Promise<T>
) {
    return async (...args: Args): Promise<HandlerResponse<T, E>> => {
        try {
            const data = await handler(...args);

            return {
                error: false,
                status: 200,
                ...data,
            };
        } catch (err: unknown) {
            if (isAxiosError(err)) {
                return {
                    error: true,
                    status: err.response?.status,
                    message:
                        err.response?.data?.message ||
                        err.message ||
                        "Something went wrong",
                    ...(err.response?.data || {}),
                } as HandlerError<E>;
            }

            return {
                error: true,
                status: 500,
                message:
                    err instanceof Error
                        ? err.message
                        : "Something went wrong",
            } as HandlerError<E>;
        }
    };
}