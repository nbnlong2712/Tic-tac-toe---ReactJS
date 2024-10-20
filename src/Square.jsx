import { useState } from "react";

function Square({ value, onSquareClick, isWinningSquare }) {
    const backgroundColor = isWinningSquare ? 'yellow' : 'white';
    return (
        <>
            <button
                style={{ backgroundColor: backgroundColor }}
                className="square"
                onClick={onSquareClick}>
                {value}
            </button>
        </>
    );
}



export default Square