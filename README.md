# 🕹️ GPT4Game - Create 1⃣️ game in 1⃣️ prompt with GPT-4

🚀 GPT-4's incredible code generation capabilities enable game development using simple text prompts.

🎮 We try to gather all text prompts that can generate entertaining games in one shot.

🌟 Feel free to star, submit PRs, and contribute more engaging games to our collection.

😊 Let's explore what is the limitation of GPT-4 for game development!

### Tetris:

Prompt: 
> You are a game developer. I want you to generate a simple code for a standard Tetris game that can run on the web page with HTML, CSS, and JS. Please also implement collision detection. When the piece touches the bottom, it stays there, and then another piece is generated. Please also implement the following game logic. Whenever a row is filled, this row is eliminated, and the player gets 100 scores. If x rows are eliminated together, the player gets x*x*100 scores for each row. The key listeners are written this way: ‘a’ for moving left, ‘d’ for moving right, ‘s’ for moving down, and ‘w’ for rotating. Please also implement a scoreboard that shows players their scores. I want random colors on pieces. Don't worry about exceeding the word limit, you can always pick up from where you left over. Generate the JS first.

Game Demo:

![tetris](gifs/tetris.gif)


### Conway's Game of Life

Prompt: 
> You are a game developer, I want you to generate Conway's Game of Life that can run on the web page with HTML, CSS, and JS. I can use the mouse to set the initial positions of the cells in the game and press space to start or pause the game. The cells change their status every 0.5 seconds. Generate the JS file first. Generate HTML and CSS after that.

Game Demo:

![game_of_life](./gifs/game_of_life.gif)



### Pong

Prompt: 
> You are a game developer. I want you to build a pong-like game that can run on the browser. People can control the position of the board.

Game Demo:

![pong](./gifs/pong.gif)

### Snake

Prompt: 
> You are a game developer. I want you to generate a Snake-like game. Players can use the arrow keys to control the direction of the snake. Moreover, the snake is green and its food is red. The snake grows when it eats the food (red square) and dies if it hits the canvas boundaries or itself. At the beginning, the snake appears at the middle of the screen at the beginning.  Its food (red square) is randomly generated at first and continues generate when some of the food is eaten. You should make sure that there is always some food on the screen. Generate the JS file first.

Game Demo: 

![snake](./gifs/snake.gif)



