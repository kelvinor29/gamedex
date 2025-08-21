import { IGame } from '@/interfaces/IGame';
import React from 'react';
import { View } from 'react-native';
import AppGameOptionButton from './AppGameOptionButton';

type GameOptionsProps = {
    gameOptions: IGame[];
    currentGame: IGame;
    selectedGameId: number | null;
    verifyAnswer: (gameId: number) => void;
}

const AppGameOptions = ({ gameOptions, currentGame, selectedGameId, verifyAnswer }: GameOptionsProps) => {

    return (
        <View className='flex flex-col gap-3'>

            {gameOptions.map((game) => {
                let state: 'default' | 'correct' | 'wrong' = 'default';

                if (selectedGameId) {
                    if (game.id === currentGame?.id) state = 'correct';
                    else if (game.id === selectedGameId) state = 'wrong';
                }

                return (
                    <AppGameOptionButton
                        key={game.id}
                        text={game.name}
                        onPress={() => verifyAnswer(game.id)}
                        state={state}
                    />
                );
            })}

        </View>
    )
}

export default AppGameOptions