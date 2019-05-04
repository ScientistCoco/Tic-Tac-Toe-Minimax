import { Pieces } from "./Game";

const winningSquares = [
    [0, 1, 2],
    [3, 4, 5], 
    [6, 7, 8], 
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
];

// Determine if the given piece has won for a 3x3 tic tac toe game
export const hasPlayerWon = (board: Array<string>, piece: Pieces): boolean => {
    for (let i = 0; i < winningSquares.length; i++) {
        if (board[winningSquares[i][0]] === piece &&
            board[winningSquares[i][1]] === piece &&
            board[winningSquares[i][2]] === piece) {
                return true;
            }
    }

    return false;
}

export const findEmptySquares = (board: Array<string>): Array<number> => {
    let emptySquares = [];
    for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
            emptySquares.push(i);
        }
    }
    
    return emptySquares;
}

// Minimax: 
// 1. Check if the board has a winner. If the winner is the given player
// then return a positive score (1) else return a negative score (-1).
// 2. Try every move possible and recursively calculate the minimax score for it.
//      Recursion continues until it reaches a terminal state that allows it to
//      return a score
// 3. Return 0 if there is a draw
// When recursion has finished the algorithm will return the index of the best move
interface IBestMoveAndScore { 
    move: number;
    score: number;
}

const evaluateGame = (board: Array<string>, computerPlayer: Pieces, humanPlayer: Pieces) => {
    let score = 0;
    if (hasPlayerWon(board, computerPlayer)) {
        score++;
    } else if (hasPlayerWon(board, humanPlayer)) {
        score--;
    } 
    return score;
}

export const minimax = (board: Array<string>, computerPlayer: Pieces, humanPlayer: Pieces, player: Pieces, depth: number) => {
    let bestMoveAndScore: IBestMoveAndScore = {move: -1, score: 0};

    const emptySquares = findEmptySquares(board);

    bestMoveAndScore.score = player === computerPlayer ? -1000 : 1000;

    if (depth === 0 || hasPlayerWon(board, computerPlayer) || hasPlayerWon(board, humanPlayer)) {
        return {move: -1, score: evaluateGame(board, computerPlayer, humanPlayer)};
    }

    emptySquares.forEach(index => {
        board[index] = player;

        let nextPlayer = player === computerPlayer ? humanPlayer : computerPlayer;
        let tempMoveAndScore = minimax(board, computerPlayer, humanPlayer, nextPlayer, depth-1);

        board[index] = '';

        if (player === computerPlayer && tempMoveAndScore.score > bestMoveAndScore.score) {
            bestMoveAndScore.score = tempMoveAndScore.score;
            bestMoveAndScore.move = index;
        } else if (player === humanPlayer && tempMoveAndScore.score < bestMoveAndScore.score) {
            bestMoveAndScore.score = tempMoveAndScore.score;
            bestMoveAndScore.move = index;
        }
    });

    return bestMoveAndScore;
}