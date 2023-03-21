# 🕹️ Awesome GPT Games🔥

[![Awesome](https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg)](https://github.com/sindresorhus/awesome)
[![Awesome GPT Games](https://img.shields.io/badge/Awesome-GPT%20Games-brightgreen.svg)](https://github.com/lwaekfjlk/awesome-gpt-games)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


🎆 EVERYONE CAN BE A GAME DEVELOPER WITH GPT!

<img src="./gifs/robot_game.png" width="800"  style="display: block; margin: 0 auto"/>

💥 GPT-4's incredible code generation capabilities enable game development using simple text prompts.

🎮 We try to gather all text prompts that can generate entertaining games in one shot.

🌟 Feel free to submit PRs. We need more cool game ideas!

🧪 Let's explore what is the boundary of GPT-4 for game development!



🚀 Supported games:

* [Zombie Shoot](#zombie-shoot)
* [Pacman](#pacman)
* [Tetris](#tetris)
* [Snake](#snake)
* [Gokomu](#gokomu)
* [Game of Life](#conway-s-game-of-life)
* [Pong](#pong)
* [Breakout Clone](#breakout-clone)

🔍 Discovered Tips:

* When writing prompts, more complicated games include more possibilities, which means that we need to generate multiple times using the prompt to get a correct game.
* When writing prompts, if the length of the code exceeds the limitation of one time generation, we just use "continue generating" to get the full code.
* Using GPT-4 to build the basic architecture and using cursor.so  to fill the details can be amazingly great.


### Zombie Shoot

contributed by **[Naruto9811](https://github.com/Naruto9811)** 

Prompt:

> As a professional game developer, your task is to create a complete code for a pixel-style shooting zombie game using Javascript, CSS, and HTML. The player's movement should be controlled by the WASD keys, while the spacebar is used to shoot and QE are used to switch weapons. However, the number of bullets in each weapon is limited. There are ten different types of weapons in the game: AK-47 assault rifle, MP5 submachine gun, Glock pistol, Remington 870 shotgun, Barrett M82A1 sniper rifle, RPG grenade launcher, Mossberg 500 shotgun, M249 light machine gun, M72 LAW rocket launcher, GAU-17/A machine gun. There are two types of zombies in the game: gray normal zombies and red demon zombies. The player will die if attacked by normal zombies ten times or demon zombies four times. Additionally, there will be randomly generated red squares on the field that can replenish the player's health and ammunition. Your response should include well-commented code that implements all of these features with attention to detail and accuracy. Please ensure that your code provides clear instructions on how to play the game and includes appropriate error handling measures.

Game Demo:

Amazing! Even support diverse weapon change. (Use GPT-4 + [cursor.so](https://www.cursor.so/))

<img src="./gifs/zombies.gif" width="400"  style="display: block; margin: 0 auto"/>



### Pacman

contributed by **[Jasonqi146](https://github.com/Jasonqi146)**

Prompt:

> You are a game developer. I want you to generate a simple code for a standard Pacman game that can run on the web page with HTML, CSS, and JS. Please also implement collision detection. The packman is a yellow icon, and its goal is to eat treats. Each treat gives the player 10 scores. Add walls to the map so that players should use extra moves to eat treat. I want 10 treats on the map. I also want a scoreboard that shows what score the player gets. The Pacman never stops moving but can be turned by the player. The key mapping will be: 'a' for turning left, 'd' for turning right, 'w' for turning up, and 'd' for turning down. The packman is chased by a red monster that follows it. If the red monster touches the packman, or the packman touches the border of the map, game over. Also, add a button for the player to start over. Each time starting over randomly regenerates walls and treats. Don't worry about exceeding the word limit, you can always pick up from where you left over. Generate the JS first.

Game Demo:

<img src="./gifs/pacman.gif" width="400"  style="display: block; margin: 0 auto"/>



### Tetris

contributed by **[Jasonqi146](https://github.com/Jasonqi146)**

Prompt: 

> You are a game developer. I want you to generate a simple code for a standard Tetris game that can run on the web page with HTML, CSS, and JS. Please also implement collision detection. When the piece touches the bottom, it stays there, and then another piece is generated. Please also implement the following game logic. Whenever a row is filled, this row is eliminated, and the player gets 100 scores. If x rows are eliminated together, the player gets x*x*100 scores for each row. The key listeners are written this way: ‘a’ for moving left, ‘d’ for moving right, ‘s’ for moving down, and ‘w’ for rotating. Please also implement a scoreboard that shows players their scores. I want random colors on pieces. Don't worry about exceeding the word limit, you can always pick up from where you left over. Generate the JS first.

Game Demo:

<img src="./gifs/tetris.gif" width="400"  style="display: block; margin: 0 auto"/>



### Snake

contributed by **[lwaekfjlk](https://github.com/lwaekfjlk)**

Prompt: 

> You are a game developer. I want you to generate a Snake-like game. Players can use the arrow keys to control the direction of the snake. Moreover, the snake is green and its food is red. The snake grows when it eats the food (red square) and dies if it hits the canvas boundaries or itself. At the beginning, the snake appears at the middle of the screen at the beginning.  Its food (red square) is randomly generated at first and continues generate when some of the food is eaten. You should make sure that there is always some food on the screen. Generate the JS file first.

Game Demo: 

<img src="./gifs/snake.gif" width="400"  style="display: block; margin: 0 auto"/>

### Gokomu

contributed by **[Naruto9811](https://github.com/Naruto9811)**

Prompt: 

> You are a game developer now. Generate a complete implement of the gokomu game for two player with HTML, CSS and Javascript. Players alternate turns placing a stone of their color on an empty intersection. Black plays first. The winner is the first player to form an unbroken line of five stones of their color horizontally, vertically, or diagonally. If the board is completely filled and no one can make a line of 5 stones, then it will result in a draw. The board size is 19 x 19. Please generate the code and the tree structure of the project.

Game Demo:

<img src="./gifs/gokomu.gif" width="400"  style="display: block; margin: 0 auto"/>



### Game of Life

contributed by **[lwaekfjlk](https://github.com/lwaekfjlk)**

Prompt: 

> You are a game developer, I want you to generate Conway's Game of Life that can run on the web page with HTML, CSS, and JS. I can use the mouse to set the initial positions of the cells in the game and press space to start or pause the game. The cells change their status every 0.5 seconds. Generate the JS file first. Generate HTML and CSS after that.

Game Demo:

<img src="./gifs/game_of_life.gif" width="400"  style="display: block; margin: 0 auto"/>



### Pong

contributed by **[lwaekfjlk](https://github.com/lwaekfjlk)**

Prompt: 

> You are a game developer. I want you to build a pong-like game that can run on the browser. People can control the position of the board.

Game Demo:

<img src="./gifs/pong.gif" width="400"  style="display: block; margin: 0 auto"/>

### Breakout Clone

contributed by **[lwaekfjlk](https://github.com/lwaekfjlk)**

Prompt:

> You are a game developer. You need to generate a Breakout clone game that can be run in the browser. You need to make sure that the speed of the ball is reasonable for players to catch. The player should move their mouse to control the board. I want the game to show restart automatically when we delete all the bricks or the ball drops. Generate the JS first.

Game Demo:

<img src="./gifs/breakout_clone.gif" width="400"  style="display: block; margin: 0 auto"/>

