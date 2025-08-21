import { APIRAWGResponse, Result } from "@/interfaces/api-rawg-response.interface";
import { IGame } from '@/interfaces/IGame';
import axios from "axios";

const api = axios.create({
    baseURL: process.env.EXPO_PUBLIC_RAWG_API_URL,
    params: { key: process.env.EXPO_PUBLIC_RAWG_API_KEY }
});

const mapGame = (game: Result) => {
    return {
        id: game.id,
        name: game.name,
        background_image: game.background_image,
        rating: game.rating,
        ratings_count: game.ratings_count,
        reviews_count: game.reviews_count,
        parent_platforms: game.parent_platforms?.map((platform: any) => platform.platform.name) || [],
        genres: game.genres?.map((genre: any) => genre.name) || [],
        tags: game.tags?.slice(0, 2).map((tag: any) => tag.name) || [],
    };
};

/* Fetch all the games */
export const fetchGames = async (url: string): Promise<{ results: IGame[], nextPage: string | null }> => {
    try {
        const { data } = await api.get<APIRAWGResponse>(url);
        return {
            results: data.results.map(mapGame),
            nextPage: data.next
        };
    } catch (error: any) {
        console.warn("Error fetching games:", error.message);
        throw error;
    }
};

/* Fetch most popular games (160) */
export const fetchPopularGames = async (): Promise<IGame[]> => {
    try {
        // Request all at the same time
        const requests = Array.from({ length: 4 }, (_, i) => i + 1).map(page =>
            api.get<APIRAWGResponse>('/games', {
                params: { page, page_size: 40 }
            }));

        // Receive all the previous promises 
        const responses = await Promise.all(requests);

        // maps and flattens the list of games
        return responses.flatMap(({ data }) => data.results.map(mapGame));
    } catch (error: any) {
        console.warn("Error fetching popular games:", error.message);
        throw error;
    }
};