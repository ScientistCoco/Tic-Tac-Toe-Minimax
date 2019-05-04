import React from 'react';
import { Board, Piece, WhoWon, GameState, Button } from './components'
import { findEmptySquares, minimax, hasPlayerWon } from './Mechanics';
import Modal from 'react-modal';

interface IState {
    grid: Array<string>;
    turn: Pieces,
    playerPiece: Pieces,
    computerPiece: Pieces,
    showModal: boolean
    gameState: GameState | undefined
}

export enum Pieces {
    X = 'X',
    O = 'O'
}

Modal.setAppElement("#root");

export class Game extends React.Component<any, IState> {
    constructor(props: any) {
        super(props);
        
        this.state = {
            grid: Array(9).fill(''),
            turn: Pieces.X,
            playerPiece: Pieces.X,
            computerPiece: Pieces.O,
            showModal: false,
            gameState: undefined
        }
    }

    hasGameEnded = () => {
        const { grid, computerPiece, playerPiece } = this.state;  
        if (hasPlayerWon(grid, computerPiece)) {
            this.setState({ gameState: GameState.Lose });
        } else if (hasPlayerWon(grid, playerPiece)) {
            this.setState({ gameState: GameState.Win });
        } else if (findEmptySquares(grid).length === 0 ) {
            this.setState({ gameState: GameState.Draw });
        }
        
        return hasPlayerWon(grid, computerPiece) || hasPlayerWon(grid, playerPiece) || findEmptySquares(grid).length === 0;            
    }

    closeWhoWonModal = () => {
        this.setState({ showModal: false });
    }

    openWhoWonModal = () => {
        this.setState({ showModal: true });
    }

    onSquareClicked = async (index: number) => {
        const { grid, turn, computerPiece, gameState } = this.state;
        
        if (grid[index] != '' || gameState !== undefined ) { return; }

        grid.splice(index, 1, turn);
        const nextPlayer = turn === Pieces.X ? Pieces.O : Pieces.X;

        await this.setState({
            grid: grid,
            turn: nextPlayer
        });

        if (this.hasGameEnded()) {
            this.openWhoWonModal();
            return;
        }

        if (nextPlayer === computerPiece) {
            this.getComputerMove();
        }        
    }

    getComputerMove = () => {
        const { grid, computerPiece, playerPiece } = this.state;

        const emptySquares = findEmptySquares(grid).length;
        const move = minimax(grid, computerPiece, playerPiece, computerPiece, emptySquares).move;
        this.onSquareClicked(move);
    }

    resetGame = () => {
        this.setState({
            grid: Array(9).fill(''),
            gameState: undefined,
            turn: Pieces.X
        })
    }

    render() {
        const { grid, showModal, turn, gameState } = this.state;

        return (
            <div className="Game">          
                <Modal
                    className="WhoWon__Modal"
                    overlayClassName="WhoWon__Modal__Overlay"                        
                    isOpen={showModal}
                    shouldCloseOnEsc={true}
                    shouldCloseOnOverlayClick={true}
                    onRequestClose={this.closeWhoWonModal}
                > 
                    <i className="material-icons WhoWon__Modal__Close__Icon" onClick={this.closeWhoWonModal}>close</i>
                    <WhoWon gameState={gameState}/>          
                </Modal>
                <div className="Game__Pieces">
                    <Piece id="X_Piece" on={ turn == Pieces.X } piece="x"/>         
                    <Piece id="O_Piece" on={ turn == Pieces.O} piece="o"/>  
                </div>  
                <Board grid={grid} onClicked={this.onSquareClicked}/> 
                <Button onClick={this.resetGame} label="Restart"/>
            </div>
        )
    }
}