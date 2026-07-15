import axiosApi from "@/constants/axiosApi";
import { SearchFilters, SparesApiResponse, SparesMutation } from "@/types/truck";

const productUpdateForm = (data: SparesMutation) => {
 const formData = new FormData();

 const keys = Object.keys(data) as (keyof SparesMutation)[];
 keys.forEach((key) => {
   const value = data[key];

   if (key === "images" && data.images.length > 0) {
     data.images.forEach((item) => {
       if (typeof item === "string") {
         formData.append("images", item);
       } else {
         formData.append("images", item);
       }
     });
   } else if (Array.isArray(value)) {
     value.forEach((item) => {
       if (item instanceof Blob) {
         formData.append(key, item);
       } else {
         formData.append(key, String(item));
       }
     });
   } else if (value) {
     formData.append(key, String(value));
   }
 });

 return formData;
}


export async function getSpares(
  filters: SearchFilters = { page: 1, limit: 10 },
): Promise<SparesApiResponse> {
  const limit = filters.limit || 10;
  const page = filters.page || 1;
  const offset = (page - 1) * limit;

  const queryParams = {
    ...filters,
    limit,
    offset,
  };
  const result = await axiosApi.get("/truck/get-spares", {
    params: queryParams,
  });
  return result.data;
}

export async function getOneSpare(id: string): Promise<SparesMutation> {
  const result = await axiosApi.get(`/truck/get-spares/${id}`);
  return result.data;
}

export async function createSpare(data: SparesMutation) {
  const formData = productUpdateForm(data);

  const result = await axiosApi.post('/truck/spares', formData);
  return result.data;
}

export async function updateSpare(data: SparesMutation) {
  const formData = productUpdateForm(data);

  const result = await axiosApi.put(`/truck/spares${data.id}`, formData);
  return result.data;
}


export async function deleteSpare(id: number) {
  await axiosApi.delete(`/truck/spares/${id}`);
}