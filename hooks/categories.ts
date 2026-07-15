import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/lib/requests/categories";


export function useCategories() {
    return useQuery({
      queryKey: ["categories"],
      queryFn: getCategories,
    });
}