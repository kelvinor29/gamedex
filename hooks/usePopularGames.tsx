import { fetchPopularGames } from "@/services/rawg.service";
import { useQuery } from "@tanstack/react-query"

export const usePopularGames = ()=> {
    return useQuery({
        queryKey: ['popularGames'],
        queryFn: fetchPopularGames,
        retry: 1,
        staleTime: 1000 * 60 * 5, 
    });
}