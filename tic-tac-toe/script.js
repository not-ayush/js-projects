/*
GameController object
    - gameboard array
    - scoreboard object
    - get input, and choose computer's play randomly.
    - check termination, return result.
    playGame:
    - playround:
        - get inputs, play input
        - display updated score
    check termination: if terminated announce game winner
*/

const game = (function () {
    let board = [
        [" ", " ", " "],
        [" ", " ", " "],
        [" ", " ", " "],
        ];
        let empty = 9;
        const scoreBoard = {
        // X is the first player
        X_name: prompt("enter player 1 (X) name:"),
        O_name: prompt("enter player 2 (O) name:"),
        X_score: 0,
        O_score: 0,
    };

    const makePlay = (mark) => {
        console.log(`enter your choice (${mark})`);
        let r = parseInt(prompt("enter:<row number>")) - 1;
        let c = parseInt(prompt("enter:<column number>")) - 1;
        while (r > 2 || r < 0 || c < 0 || c > 2 || board[r][c] != " ") {
            alert("invalid input");
            r = parseInt(prompt("enter:<row number>")) - 1;
            c = parseInt(prompt("enter:<column number>")) - 1;
        }
        empty -= 1;
        console.log(r, c);
        board[r][c] = mark;
    };

    const checkEnd = () => {
        // return mark if any side has won, T if tie, else return "" (not ended)
        // rows
        for (let i = 0; i < 3; i++) {
            if (board[i][0] == board[i][1] && board[i][1] == board[i][2] && board[i][1] != " ") return board[i][0];
        }
        // columns
        for (let i = 0; i < 3; i++) {
            if (board[0][i] == board[1][i] && board[1][i] == board[2][i] && board[1][i] != " ") return board[0][i];
        }
        // diagonals
        if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[1][1] != " ") return board[0][0];
        if (board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[1][1] != " ") return board[0][2];

        if (empty == 0) return "T";
        return ""; 
    };

    const handleEnd = (result) => {
        if (result === "X") {
            alert(`${scoreBoard.X_name} wins the round`);
            scoreBoard.X_score += 1;
        } else if (result === "O") {
            alert(`${scoreBoard.O_name} wins the round`);
            scoreBoard.O_score += 1;
        } else if (result === "T") {
            alert("tie");
        } else {
            return;
        }
        console.log("end round");
        board = [
            [" ", " ", " "],
            [" ", " ", " "],
            [" ", " ", " "],
        ];
        empty = 9;
    }


    const playRound = () => {
        while (empty != 0) {
            makePlay("X");
            printBoard();
            let tempRes = checkEnd();
            if (tempRes === "") {
                makePlay("O");
                printBoard();
                let tempRes2 = checkEnd();
                handleEnd(tempRes2);
                if (tempRes2 !== "") break;
            } else {
                handleEnd(tempRes);
                break;
            }

        }
    };

    const printBoard = () => {
        board.forEach((row) => {
            let temp = "";
            row.forEach((elem) => (temp = temp + " " + elem + " "));
            console.log(temp);
        });
    };

    const play = () => {
        for (let i = 0; i < 3; i++) {
            console.log("Round No: ", i+1)
            playRound();
        }
        if (scoreBoard.X_score > scoreBoard.O_score) alert(`${scoreBoard.X_name} wins the game`);
        else if (scoreBoard.O_score > scoreBoard.X_score) alert(`${scoreBoard.O_name} wins the game`);
        else alert("The game is a tie");
    };
    return {
        makePlay,
        checkEnd,
        playRound,
        play,
        scoreBoard
    };
})();

game.play();

