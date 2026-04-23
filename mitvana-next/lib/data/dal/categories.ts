import axios from "@/lib/axios";
import { api_routes } from "@/lib/constants/routes.option";
import { CategoryType, PaginationType } from "@/lib/types";
import { GenericAbortSignal } from "axios";


export const getCategoriesHandler = async (params: URLSearchParams, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.get<{ data: PaginationType<CategoryType> }>(api_routes.category.paginate, { params, signal });
    return response.data.data;
}