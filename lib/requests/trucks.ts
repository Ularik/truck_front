import axiosApi from "@/constants/axiosApi";
import { TruckType } from "@/types/truck";

export async function getTrucks(): Promise<TruckType[]> {
    const result = await axiosApi.get('/truck/get-trucks');
    return result.data;
}