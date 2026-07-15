import { getTrucks } from "@/lib/requests/trucks";
import { useQuery } from "@tanstack/react-query";


export function useTrucks() {
    return useQuery({
        queryKey: ['trucks'],
        queryFn: getTrucks
    })
}