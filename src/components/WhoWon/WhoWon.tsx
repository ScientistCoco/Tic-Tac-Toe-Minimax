import React from 'react';

import './WhoWon.scss';

interface IWhoWon {
    gameState: GameState | undefined;
}

export enum GameState {
    Draw = "Draw",
    Win = "Win",
    Lose = "Lose"
}

export const WhoWon = (props: IWhoWon) => {
    const { gameState } = props;

    return (
            <div className="WhoWon">
                {gameState === "Draw" && "Its a draw!"}
                {gameState === "Win" && "You won!"}
                {gameState === "Lose" && "You lost"}
            </div>
    )
}