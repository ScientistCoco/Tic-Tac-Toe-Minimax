import React from 'react';
import classnames from 'classnames';
import "./Piece.scss";

interface IToggle {
    on: boolean
    piece: string
    id?: string
}

export const Piece = (props: IToggle) => {
    const { id, on, piece } = props;

    return (
        <div className="Piece" id={id}>
            <p className={classnames("Piece__Label", { 'Piece__Label--on' : on })}>{piece}</p>                        
        </div>
    )
}