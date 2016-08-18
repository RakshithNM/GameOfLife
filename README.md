# Game-Of-Life

### Features, Rules

### Features :

* It is a Zero player game.
* Evolution is determined by its initial state requirring no further input.
* Only interaction with the game is when creating the initial configuration(randomised).
* From any random initial pattern of living cells on the grid, observers will find the population constantly changing as the   generations tick by.
* Small isolated subpatterns with no initial symmetry tend to become symmetrical. Once this happens, the symmetry may          increase in richness, but it cannot be lost unless a nearby subpattern comes close enough to disturb it. In a very few       cases the society eventually dies out, with all living cells vanishing, though this may not happen for a great many          generations. Most initial patterns eventually "burn out", producing either stable figures or patterns that oscillate         forever between two or more states.
* Undecidability - Many patterns in the game of life eventually become a combination of still lives, oscillators and           spaceships; other patterns may be called chaotic. A pattern may stay chaotic for a very long time until it eventually        settles to such a combination.

### Rules :

- The space of interest is an infinite(circularly connected) two-dimensional orthogonal grid of square cells, each of which is   in one of two possible states, alive or dead, or "populated" or "unpopulated".

- Every cell interacts with its eight neighbours, which are the cells that are horizontally, vertically, or diagonally         adjacent.

- At each step in time, the following transitions occur:
    1. Any live cell with fewer than two live neighbours dies, as if caused by under-population.
    2. Any live cell with two or three live neighbours lives on to the next generation.
    3. Any live cell with more than three live neighbours dies, as if by over-population.
    4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

- The initial pattern constitutes the seed of the system(random alive cells).

- The first generation is created by applying the above rules simultaneously to every cell in the seed—births and deaths       occur simultaneously, and the discrete moment at which this happens is sometimes called a tick (in other words, each         generation is a pure function of the preceding one).

- The rules continue to be applied repeatedly to create further generations.

### Algorithm :

1. Initialise two (present generation and next generation)empty two dimensional Array.
2. '0' and '1' represents a dead or live cell respectively.
3. Randomnly make a certain number of cells in the present array 'alive'.
4. A nested for-loop considers each element of the current array in turn, counting the live neighbours of each cell of the      present generation array to decide whether the corresponding element of the next generation array should be 0 or 1.
5. Based on the count of 'alive' cells in present array of a particular cell, the corresponding element of the array will be    made "alive" or "dead" in the next generation(in compliance with the rules of the game).
6. The next generation is made the present generation for the next iteration.
7. The present generation is displayed.

  When the active areas cross the boundary, left and right edges of the field and the top and bottom edges are considered to be stitched together, and the top and bottom edges also.



