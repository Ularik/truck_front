import axiosApi from "@/constants/axiosApi";
import { CategoryType } from "@/types/units";


export async function getCategories(): Promise<CategoryType[]> {
  const result = await axiosApi.get("/truck/units");
  return result.data;
}