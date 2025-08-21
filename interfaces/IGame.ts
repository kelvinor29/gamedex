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