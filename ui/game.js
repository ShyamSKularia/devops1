document.addEventListener('DOMContentLoaded', () => {
    const boardEl = document.getElementById('board');
    const rollBtn = document.getElementById('rollBtn');
    const resetBtn = document.getElementById('resetBtn');
    const diceContainer = document.getElementById('diceContainer');
    const messageBox = document.getElementById('messageBox');
    const turnIndicator = document.getElementById('turnIndicator');
    const victoryModal = document.getElementById('victoryModal');
    const winnerTitle = document.getElementById('winnerTitle');
    const newGameBtn = document.getElementById('newGameBtn');

    // Game State
    const boardSize = 100;
    let currentPlayer = 1; // 1 or 2
    let players = {
        1: { pos: 1, color: 'blue', name: 'Player 1', avatar: 'p1-avatar' },
        2: { pos: 1, color: 'red', name: 'Player 2', avatar: 'p2-avatar' }
    };
    let isRolling = false;

    // Snakes and Ladders Configuration
    const snakes = {
        16: 6,
        47: 26,
        49: 11,
        56: 53,
        62: 19,
        64: 60,
        87: 24,
        93: 73,
        95: 75,
        98: 78
    };

    const ladders = {
        1: 38,
        4: 14,
        9: 31,
        21: 42,
        28: 84,
        36: 44,
        51: 67,
        71: 91,
        80: 100
    };

    // Initialize Board
    function initBoard() {
        boardEl.innerHTML = '';
        // 10x10 Grid. Rows go 100-91, 81-90, etc.
        // CSS Grid fills top-left to bottom-right.
        // We need to calculate the correct number for each cell visualily.

        for (let row = 9; row >= 0; row--) {
            const isEvenRow = (row % 2 === 0); // 0-indexed row from bottom. 9 is top which is odd. 
            // Wait, standard snake ladder: 1 is bottom left. 
            // Row 0 (bottom): 1 to 10.
            // Row 1: 20 to 11.
            // Let's generate cells and use CSS order or just calculate IDs.

            // Visual row index 0 (top) corresponds to math row 9.
            // Let's loop visual rows 0 to 9.
        }

        // Easier approach: Generate flat list and style with grid. 
        // Logic: Total 10 rows. 
        // Row 0 (Top): 100, 99, ... 91
        // Row 1: 81, 82, ... 90

        for (let r = 0; r < 10; r++) {
            let rowStart, rowEnd, increment;

            // If row is even (0, 2, 4...) it goes Left to Right (Descending numbers because we start from top 100)
            // Wait, top row (row 0) is 100 -> 91.
            // Next row (row 1) is 81 -> 90.

            if (r % 2 === 0) {
                // Even visual row: 100-91, 80-71, etc
                // Formula for Leftmost of even row r: 100 - (r * 10)
                // NO, Row 0: 100..91. Row 2: 80..71.
                for (let c = 0; c < 10; c++) {
                    const cellNum = 100 - (r * 10) - c;
                    createCell(cellNum);
                }
            } else {
                // Odd visual row: 81..90, 61..70.
                // Formula: (100 - (r * 10) - 9) + c
                // e.g r=1. (100 - 10 - 9) = 81. + c.
                for (let c = 0; c < 10; c++) {
                    const cellNum = (100 - (r * 10) - 9) + c;
                    createCell(cellNum);
                }
            }
        }

        updatePlayerPositions();
    }

    function createCell(num) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-num', num);
        cell.innerText = num;

        if (snakes[num]) {
            cell.classList.add('snake-start');
            cell.title = `Snake: Go down to ${snakes[num]}`;
        }
        if (ladders[num]) {
            cell.classList.add('ladder-start');
            cell.title = `Ladder: Go up to ${ladders[num]}`;
        }

        boardEl.appendChild(cell);
    }

    function updatePlayerPositions() {
        // Remove existing tokens
        document.querySelectorAll('.player-token').forEach(el => el.remove());

        // Add tokens to new positions
        [1, 2].forEach(pId => {
            const pos = players[pId].pos;
            const cell = document.querySelector(`.cell[data-num="${pos}"]`);
            if (cell) {
                const token = document.createElement('div');
                token.classList.add('player-token');
                token.classList.add(pId === 1 ? 'p1-token' : 'p2-token');
                cell.appendChild(token);
            }
        });

        // Update UI Stats
        document.getElementById('p1-pos').innerText = `Pos: ${players[1].pos}`;
        document.getElementById('p2-pos').innerText = `Pos: ${players[2].pos}`;

        // Highlight active card
        document.getElementById('p1-card').classList.toggle('active', currentPlayer === 1);
        document.getElementById('p2-card').classList.toggle('active', currentPlayer === 2);

        turnIndicator.innerText = `${players[currentPlayer].name}'s Turn`;
    }

    async function rollDice() {
        if (isRolling) return;
        isRolling = true;
        rollBtn.disabled = true;
        messageBox.innerText = '';
        diceContainer.classList.add('dice-rolling');

        // Animation duration
        await new Promise(r => setTimeout(r, 600));

        const diceVal = Math.floor(Math.random() * 6) + 1;
        diceContainer.innerText = getDiceEmoji(diceVal);
        diceContainer.classList.remove('dice-rolling');

        await movePlayer(currentPlayer, diceVal);

        // Check Win
        if (players[currentPlayer].pos === 100) {
            showVictory(players[currentPlayer].name);
        } else {
            // Switch Turn
            // Extra roll rule? Standard usually implies turn switch unless roll is 6. 
            // We'll keep it simple: always switch for now.
            // If you want rule of 6: if (diceVal !== 6) currentPlayer = ...
            if (diceVal !== 6) {
                currentPlayer = currentPlayer === 1 ? 2 : 1;
            } else {
                messageBox.innerText = "Rolled a 6! Roll again.";
            }
            updatePlayerPositions();
        }

        isRolling = false;
        rollBtn.disabled = false;
    }

    function getDiceEmoji(num) {
        const emojis = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
        return emojis[num - 1] || num;
    }

    async function movePlayer(pId, steps) {
        let currentPos = players[pId].pos;
        let newPos = currentPos + steps;

        if (newPos > 100) {
            messageBox.innerText = "Need exact roll to finish!";
            return;
        }

        // Animate Step by Step? For now, instant jump to position, then snake/ladder logic
        players[pId].pos = newPos;
        updatePlayerPositions();

        // Check for Snake or Ladder
        await new Promise(r => setTimeout(r, 500)); // Short pause to see land

        if (snakes[newPos]) {
            messageBox.innerText = "Oh no! A Snake! 🐍";
            await new Promise(r => setTimeout(r, 800));
            players[pId].pos = snakes[newPos];
            updatePlayerPositions();
        } else if (ladders[newPos]) {
            messageBox.innerText = "Yay! A Ladder! 🪜";
            await new Promise(r => setTimeout(r, 800));
            players[pId].pos = ladders[newPos];
            updatePlayerPositions();
        }
    }

    function showVictory(name) {
        winnerTitle.innerText = `${name} Wins!`;
        victoryModal.classList.add('show');
    }

    function resetGame() {
        players[1].pos = 1;
        players[2].pos = 1;
        currentPlayer = 1;
        victoryModal.classList.remove('show');
        diceContainer.innerText = "🎲";
        messageBox.innerText = "";
        updatePlayerPositions();
    }

    // Bind Events
    rollBtn.addEventListener('click', rollDice);
    resetBtn.addEventListener('click', resetGame);
    newGameBtn.addEventListener('click', resetGame);

    // Initial Setup
    initBoard();
});
