import './Board.scss';
import React, { Component } from 'react';

interface IBoard {
    grid: Array<string>,
    onClicked: (key: number) => void
}

export const Board = (props: IBoard) => {     
    const { grid, onClicked } = props;

    return (
        <div className="Board">
            {grid.map((item: any, key: number) =>                               
                <button className="Board__Item" key={key} data-index={key} onClick={() => onClicked(key)}>
                    {item ? item : "" }
                </button>
            )}
        </div>
    )
}
