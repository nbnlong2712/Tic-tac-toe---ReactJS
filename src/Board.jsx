import { useState } from "react";
import Square from "./Square";
import { Switch } from 'antd';

function Board({ isXNext, squares, onPlay, winningSquares }) {
    function handleClick(i) {
        if (squares[i] || calculateWinner(squares)) {
            return;
        }
        const nextSquares = squares.slice();
        nextSquares[i] = isXNext ? 'X' : 'O';

        const row = Math.floor(i / 3) + 1;
        const col = (i % 3) + 1;

        onPlay(nextSquares, { row, col });
    }

    const boardRows = [];

    for (let row = 0; row < 3; row++) {
        const boardChildren = [];
        for (let column = 0; column < 3; column++) {
            let index = 3 * row + column;
            const isWinningSquare = winningSquares && winningSquares.includes(index);
            boardChildren.push(<Square
                key={index}
                value={squares[index]}
                onSquareClick={() => handleClick(index)}
                isWinningSquare={isWinningSquare} />
            )
        }
        boardRows.push(<div key={row} className="board-row">{boardChildren}</div>)
    }

    return (
        <>
            {boardRows}
        </>
    );
}

export function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
            return {
                winner: squares[a],
                winningSquares: [a, b, c]
            };
    }
    return null;
}

export default Board