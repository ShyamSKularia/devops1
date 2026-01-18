# Snake & Ladders Ultimate 🐍🪜

A modern, interactive web version of the classic Snake and Ladders board game. Built with a Node.js backend and a polished, glassmorphism-inspired frontend.

## 🚀 Features
- **Interactive Gameplay**: Fully functional 2-player local multiplayer.
- **Dynamic Board**: 100-tile grid with visual indicators for snakes 🐍 and ladders 🪜.
- **Modern UI**: Stylish "Glassmorphism" design with smooth animations and responsive layout.
- **Roll the Dice**: Animated dice rolling mechanics.
- **Victory States**: Celebratory modal for the winner.

## 🛠️ Tech Stack
- **Frontend**: HTML5, CSS3 (Vanilla), JavaScript (ES6+)
- **Backend**: Node.js, Express.js

## 📦 Installation & Running

### Prerequisites
- Node.js installed on your machine.

### Steps
1. **Navigate into the backend directory**:
   ```bash
   cd backend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Server**:
   ```bash
   npm start
   ```
   You should see a message: `Server is running heavily on http://localhost:3000`

4. **Play the Game**:
   Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

## 📂 Project Structure
- `backend/` - Contains the Node.js Express server (`server.js`) and dependencies.
- `ui/` - Contains the game frontend components:
  - `index.html`: Main game structure.
  - `game.js`: Game logic (movement, dice, rules).
  - `style.css`: Visual styling and glassmorphism effects.

## 🎮 How to Play
1. **Roll the Dice**: Click the "ROLL DICE" button on your turn.
2. **Move**: Your token moves automatically.
3. **Snakes & Ladders**:
   - **Ladder 🪜**: Climb up to a higher position (Shortcuts!).
   - **Snake 🐍**: Slide down to a lower position (Watch out!).
4. **Win**: The first player to reach tile **100** wins the game! 🏆

---
*Happy Gaming!*
