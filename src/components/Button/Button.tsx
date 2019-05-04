import React from 'react';

import './Button.scss';

export const Button = (props: any) => {
    return (
        <div className="Button">
            <button className="Button__Btn" {...props}>
                {props.label}
            </button>
        </div>
    )
}