import { useState } from "react";
import Board from "./Board";
import { calculateWinner } from "./Board";
import { Switch } from "antd";

function Game() {
    const [history, setHistory] = useState([{ squares: Array(9).fill(null), location: null }]);
    const [currentMove, setCurrentMove] = useState(0);
    const isXNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove].squares;
    const [isAscending, setIsAscending] = useState(true);

    function handlePlay(nextSquares, location) {
        const nextHistory = [...history.slice(0, currentMove + 1), { squares: nextSquares, location: location }];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1)
    }

    function jumpTo(nextMove) {
        setCurrentMove(nextMove)
    }

    function handleAscending() {
        setIsAscending(!isAscending);
    }

    const winner = calculateWinner(currentSquares);
    const winningSquares = winner ? winner.winningSquares : [];
    const isBoardFull = currentSquares.every(square => square !== null);

    let status;
    if (winner) {
        status = "Winner: " + winner.winner;
    } else if (isBoardFull) {
        status = 'The game is draw!';
    }
    else {
        status = "Next player: " + (isXNext ? "X" : "O");
    }

    const moves = history.map((squares, move) => {
        let desc;
        let location = squares.location;
        if (move == 0) {
            desc = 'Jump to start';
        }
        else {
            desc = `Jump to move (${location.row}, ${location.col})`;
        }
        if (currentMove === move) {
            desc = `You are at move (${location ? location.row : 0}, ${location ? location.col : 0})`;
            return <li key={move}>
                <span>{desc}</span>
            </li>
        }
        return <li key={move}>
            <button className="button-jump" onClick={() => jumpTo(move)}>{desc}</button>
        </li>
    });
    const desArr = isAscending ? moves : [...moves].reverse();

    return (
        <div className="game">
            <div className="game-board">
                <Board isXNext={isXNext} squares={currentSquares} onPlay={handlePlay} winningSquares={winningSquares} />
            </div>
            <div className="game-info">
                <span style={{ marginBottom: 8, fontSize: 20 }}>
                    Ascending <Switch checked={!isAscending} onChange={handleAscending} /> Descending
                </span>
                <h1 className="status">{status}</h1>
                <ol>{desArr}</ol>
            </div>
        </div>
    );
}

export default Game