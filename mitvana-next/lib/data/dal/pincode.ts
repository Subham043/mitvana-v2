import axios from "@/lib/axios";
import { GenericAbortSignal } from "axios";
import { api_routes } from "@/lib/constants/routes.option";
import { PincodeType } from "@/lib/types";
import { PincodeFormValuesType } from "../schemas/pincode";


export const checkPincodeHandler = async (val: PincodeFormValuesType, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.get<{ data: PincodeType }>(api_routes.pincode.check + `/${val.pincode}`, { signal });
    return response.data.data;
}