"use strict";

const gameOfLife = {
  rowHolder: document.getElementById('rowHolder'),
  rows: 35,
  cols: 35,
  density: 0.3,
  interval: 100,
  boardState: { lives: [] },
  heatMap: [],
  cellElements: [],
  animationFrameId: null,
  lastFrameTime: 0,

  start: function () {
    this.rows = parseInt(document.getElementById('rowsInput').value);
    this.cols = parseInt(document.getElementById('colsInput').value);
    this.density = parseFloat(document.getElementById('densityInput').value);
    this.interval = parseInt(document.getElementById('intervalInput').value);

    this.makeGrid(this.rows, this.cols);
    this.heatMap = Array.from({ length: this.rows }, () => Array(this.cols).fill(0));
    this.populateGrid(this.density);
    this.drawOnGrid();
    this.resume();
  },

  resume: function () {
    if (this.animationFrameId) {
      return;
    }

    const loop = (timestamp) => {
      if (!this.lastFrameTime || timestamp - this.lastFrameTime >= this.interval) {
        this.invokeGeneration();
        this.lastFrameTime = timestamp;
      }
      this.animationFrameId = requestAnimationFrame(loop);
    };

    this.animationFrameId = requestAnimationFrame(loop);
  },

  pause: function () {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
      this.lastFrameTime = 0;
    }
  },

  step: function () {
    this.invokeGeneration();
  },

  invokeGeneration: function () {
    const next = this.boardState.lives.map(row => [...row]);

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        const count = this.noOfAliveNeighbours(i, j);
        const alive = this.boardState.lives[i][j];
        const willLive = alive ? (count === 2 || count === 3) : (count === 3);

        next[i][j] = willLive;

        const cell = this.cellElements[i][j];
        if (willLive) {
          this.heatMap[i][j] = Math.min(this.heatMap[i][j] + 1, 255);
          cell.classList.add('alive');
          cell.style.backgroundColor = '#08C';
        } else {
          cell.classList.remove('alive');

          const intensity = this.heatMap[i][j] / 255;
          cell.style.backgroundColor = `rgba(255, 0, 0, ${intensity})`;
        }
      }
    }

    this.boardState.lives = next;
  },

  noOfAliveNeighbours: function (x, y) {
    let count = 0;
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        if (dx !== 0 || dy !== 0) {
          const i = (x + dx + this.rows) % this.rows;
          const j = (y + dy + this.cols) % this.cols;
          if (this.boardState.lives[i][j]) count++;
        }
      }
    }
    return count;
  },

  makeGrid: function (rows, cols) {
    this.rowHolder.innerHTML = '';
    this.boardState.lives = [];
    this.cellElements = [];

    for (let i = 0; i < rows; i++) {
      const rowEl = document.createElement('div');
      rowEl.className = 'row-format';
      const rowState = [];
      const cellRow = [];

      for (let j = 0; j < cols; j++) {
        const cell = document.createElement('div');
        cell.className = 'cell-format';
        cell.dataset.row = i;
        cell.dataset.col = j;
        cell.addEventListener('click', (e) => this.toggleCell(e));
        rowEl.appendChild(cell);
        rowState.push(false);
        cellRow.push(cell);
      }

      this.rowHolder.appendChild(rowEl);
      this.boardState.lives.push(rowState);
      this.cellElements.push(cellRow);
    }
  },

  populateGrid: function (density) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (Math.random() < density) {
          this.boardState.lives[i][j] = true;
        }
      }
    }
  },

  toggleCell: function (e) {
    const i = parseInt(e.target.dataset.row);
    const j = parseInt(e.target.dataset.col);
    this.boardState.lives[i][j] = !this.boardState.lives[i][j];
    if (this.boardState.lives[i][j]) {
      this.heatMap[i][j] = Math.min(this.heatMap[i][j] + 1, 255);
    }
    e.target.classList.toggle('alive');
    e.target.style.backgroundColor = `rgba(255, 0, 0, ${this.heatMap[i][j] / 255})`;
  },

  drawOnGrid: function () {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        const cell = this.cellElements[i][j];
        const isAlive = this.boardState.lives[i][j];
        cell.classList.toggle('alive', isAlive);
        const intensity = this.heatMap[i][j] / 255;
        cell.style.backgroundColor = `rgba(255, 0, 0, ${intensity})`;
      }
    }
  }
};
