import { APIRAWGResponse } from '@/interfaces/api-rawg-response.interface';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { create, StateCreator } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface IGame {
    id: number;
    name: string;
    background_image: string;
    rating: number;
    ratings_count: number;
    reviews_count: number;
    parent_platforms: string[];
    genres: string[];
    tags: string[];
}

interface IGameStoreState {
    games: IGame[];
    loading: boolean;
    error: string | null;
}

interface IGameStoreActions {
    fetchGames: () => Promise<void>;
}

const API_URL = `${process.env.EXPO_PUBLIC_RAWG_API_URL}/games?key=${process.env.EXPO_PUBLIC_RAWG_API_KEY}`;

export const useGameStore = create<IGameStoreState & IGameStoreActions>(
    persist(
        (set) => ({
            games: [],
            loading: false,
            error: null,

            fetchGames: async () => {
                set({ loading: true, error: null });
                try {
                    const { data } = await axios.get<APIRAWGResponse>(API_URL);

                    const games: IGame[] = data.results.map((game) => ({
                        id: game.id,
                        name: game.name,
                        background_image: game.background_image,
                        rating: game.rating,
                        ratings_count: game.ratings_count,
                        reviews_count: game.reviews_count,
                        parent_platforms: game.parent_platforms?.map((platform) => platform.platform.name) || [],
                        genres: game.genres?.map((genre) => genre.name) || [],
                        tags: game.tags?.slice(0, 2).map((tag) => tag.name) || [],
                    }));

                    set({ games: games, loading: false });
                    console.log('Games fetched successfully.');

                } catch (e: any) {
                    console.error('Error fetching games:', e.message);
                    set({ error: e.message ?? 'Error fetching games.', loading: false });
                }
            }

        }),
        {
            name: 'game-list-storage',
            storage: createJSONStorage(() => AsyncStorage)
        }
    ) as unknown as StateCreator<IGameStoreState & IGameStoreActions>
);