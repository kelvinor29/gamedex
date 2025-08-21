import { IGame } from '@/interfaces/IGame';
import { useEffect, useState } from 'react';
import { usePopularGames } from './usePopularGames';

const ALLOWED_ATTEMPTS = 5;

const useGameLogic = () => {
    // Fetch 80 popular games based on API RAWG
    const { data: games, isLoading, isError } = usePopularGames();

    // Available games per round. It's getting shorter
    const [availableGames, setAvailableGames] = useState<IGame[] | null>(null);

    const [selectedGameId, setSelectedGameId] = useState<number | null>(null);
    const [isGameOver, setIsGameOver] = useState<boolean>(false);

    // Score counters
    const [correctAnswers, setCorrectAnswers] = useState<number>(0);
    const [incorrectAnswers, setIncorrectAnswers] = useState<number>(0);
    const [attemptsLeft, setAttemptsLeft] = useState<number>(ALLOWED_ATTEMPTS);

    // Store de correct game for the current round
    const [currentGame, setCurrentGame] = useState<IGame | null>(null);
    const [gameOptions, setGameOptions] = useState<IGame[]>([]);
    
    const [optionsDisabled, setOptionsDisabled] = useState<boolean>(false);

    // Fisher-Yates algorithm
    const suffleGameList = (games: IGame[]) => {
        for (let i = games.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [games[i], games[j]] = [games[j], games[i]];
        }
        return games;
    }

    /* Pick games per round (1 correct, 3 incorrects) */
    const pickRandomGame = (games: IGame[]) => {
        if (!games || games.length < 4) {
            setIsGameOver(true);
            return;
        };

        // The first game its gonna be the correct one
        const pickedGame = games[0];

        // Others are incorrects
        const incorrectGames = games.slice(1, 4);

        // Move the used games at a new array
        const remainingGames = games.slice(1);

        // Update available games
        setAvailableGames(suffleGameList(remainingGames));

        // Combine and shuffle options
        const gameOptions = [...incorrectGames, pickedGame];
        gameOptions.sort(() => Math.random() - 0.5);

        setCurrentGame(pickedGame);
        setGameOptions(gameOptions);
    }

    const newRound = (games: IGame[]) => {
        const shuffledGames = suffleGameList([...games]);
        setAvailableGames(shuffledGames);
        pickRandomGame(shuffledGames);
    }

    // If games is already fetched, select and start a round
    useEffect(() => {
        if (games && games.length > 0)
            newRound(games);
    }, [games]);

    const verifyAnswer = (gameId: number) => {
        if (!currentGame || optionsDisabled) return;
        setOptionsDisabled(true); // Disabled buttons
        setSelectedGameId(gameId);

        // Apply score
        if (gameId === currentGame.id) {
            setCorrectAnswers(correctAnswers + 1);
        } else {
            setIncorrectAnswers(incorrectAnswers + 1);
            setAttemptsLeft(attemptsLeft - 1);
        }

        // Wait one second 
        setTimeout(() => {
            // Verify if the game is over
            if (attemptsLeft <= 1 || (!availableGames || availableGames.length < 4))
                setIsGameOver(true);
            else {
                // Next round
                setSelectedGameId(null);
                pickRandomGame(availableGames);
            }
            setOptionsDisabled(false);
        }, 1000);

    }

    const restartGame = () => {
        setCorrectAnswers(0);
        setIncorrectAnswers(0);
        setAttemptsLeft(ALLOWED_ATTEMPTS);
        setSelectedGameId(null);
        setIsGameOver(false);
        if (games)
            newRound(games);
    };

    return {
        isLoading,
        isError,
        selectedGameId,
        correctAnswers,
        incorrectAnswers,
        attemptsLeft,
        currentGame,
        gameOptions,
        isGameOver,
        optionsDisabled,
        ALLOWED_ATTEMPTS,
        verifyAnswer,
        restartGame,
    };
}

export default useGameLogic