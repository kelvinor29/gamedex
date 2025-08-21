import { fetchGames } from "@/services/rawg.service";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useInfiniteGames = (searchQuery: string) => {
    return useInfiniteQuery({
        queryKey: ["games", searchQuery],
        queryFn: ({ pageParam }) => fetchGames(pageParam || `/games?search=${searchQuery}`),
        initialPageParam: `/games?search=${searchQuery}`,
        getNextPageParam: (lastPage) => lastPage.nextPage,
        retry: 2,
        staleTime: 1000 * 60 * 5, 
    });
};