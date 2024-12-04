function parseGrid(text: string): string[][] {
  return text.split("\r\n").map((line) => line.split(""));
}

const coords: any[] = [];

function getDownVertical(grid: string[][], row: number, col: number) {
  let word = "";
  const partialCoords = [];
  for (let offset = 0; offset < 4; offset++) {
    if (row + offset >= grid.length) {
      return "";
    }
    partialCoords.push([row + offset, col]);
    word += grid[row + offset][col];
  }
  if (word === "XMAS") {
    coords.push(...partialCoords);
  }
  return word;
}

function getUpVertical(grid: string[][], row: number, col: number) {
  let word = "";
  const partialCoords = [];
  for (let offset = 0; offset < 4; offset++) {
    if (row - offset < 0) {
      return "";
    }
    partialCoords.push([row - offset, col]);
    word += grid[row - offset][col];
  }
  if (word === "XMAS") {
    coords.push(...partialCoords);
  }
  return word;
}

// row decr, col decr
function getDiag1(grid: string[][], row: number, col: number) {
  let word = "";
  const partialCoords = [];
  for (let offset = 0; offset < 4; offset++) {
    if (row - offset < 0 || col - offset < 0) {
      return "";
    }
    partialCoords.push([row - offset, col - offset]);
    word += grid[row - offset][col - offset];
  }
  if (word === "XMAS") {
    coords.push(...partialCoords);
  }
  return word;
}

// row decr, col incr
function getDiag2(grid: string[][], row: number, col: number) {
  let word = "";
  const partialCoords = [];
  for (let offset = 0; offset < 4; offset++) {
    if (row - offset < 0 || col + offset >= grid[0].length) {
      return "";
    }
    partialCoords.push([row - offset, col + offset]);
    word += grid[row - offset][col + offset];
  }
  if (word === "XMAS") {
    coords.push(...partialCoords);
  }
  return word;
}

// row incr, col decr
function getDiag3(grid: string[][], row: number, col: number) {
  let word = "";
  const partialCoords = [];
  for (let offset = 0; offset < 4; offset++) {
    if (row + offset >= grid.length || col - offset < 0) {
      return "";
    }
    partialCoords.push([row + offset, col - offset]);
    word += grid[row + offset][col - offset];
  }
  if (word === "XMAS") {
    coords.push(...partialCoords);
  }
  return word;
}

// row incr, col incr
function getDiag4(grid: string[][], row: number, col: number) {
  let word = "";
  const partialCoords = [];
  for (let offset = 0; offset < 4; offset++) {
    if (row + offset >= grid.length || col + offset >= grid[0].length) {
      return "";
    }
    partialCoords.push([row + offset, col + offset]);
    word += grid[row + offset][col + offset];
  }
  if (word === "XMAS") {
    coords.push(...partialCoords);
  }
  return word;
}

function wordSearch(grid: string[][]): number {
  let count = 0;
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      const char = grid[row][col];
      if (char === "X") {
        // Start search
        const forwards = grid[row].filter((_, index) =>
          col <= index && index < col + 4
        ).join("");
        if (forwards === "XMAS") {
          const partialCoords = [0, 1, 2, 3].map((val) => [row, col + val]);
          coords.push(...partialCoords);
        }
        const backwards = grid[row].filter((_, index) =>
          col - 4 < index && index <= col
        ).reverse().join("");
        if (backwards === "XMAS") {
          const partialCoords = [0, 1, 2, 3].map((val) => [row, col - val]);
          coords.push(...partialCoords);
        }
        const vertical1 = getUpVertical(grid, row, col);
        const vertical2 = getDownVertical(grid, row, col);
        const diag1 = getDiag1(grid, row, col);
        const diag2 = getDiag2(grid, row, col);
        const diag3 = getDiag3(grid, row, col);
        const diag4 = getDiag4(grid, row, col);
        const sum = [
          forwards,
          backwards,
          vertical1,
          vertical2,
          diag1,
          diag2,
          diag3,
          diag4,
        ].filter((val) => val === "XMAS").length;
        count += sum;
      }
    }
  }

  return count;
}

function safeIndex(grid: string[][], row: number, col: number) {
  if (row >= 0 && row < grid.length && col >= 0 && col < grid[0].length) {
    return grid[row][col];
  }
  return "";
}

function masSearch(grid: string[][]): number {
  let count = 0;
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      const char = grid[row][col];
      if (char === "A") {
        const mask = [
          safeIndex(grid, row - 1, col - 1),
          safeIndex(grid, row - 1, col + 1),
          safeIndex(grid, row + 1, col - 1),
          safeIndex(grid, row + 1, col + 1),
        ].join('');
        if (["MSMS","SSMM", "SMSM", "MMSS"].includes(mask)) {
          count += 1;
        }
      }
    }
  }
  return count;
}

function printGrid(grid: string[][]) {
  for (let i = 0; i < grid.length; i++) {
    let line = "";
    for (let j = 0; j < grid[0].length; j++) {
      const isLetter = coords.some((val) => {
        const [x, y] = val;
        return i === x && y === j;
      });
      line += isLetter ? grid[i][j] : ".";
    }
    console.log(line);
  }
}

if (import.meta.main) {
  const text = await Deno.readTextFile("input.txt");
  const grid = parseGrid(text);
  const wordCount = wordSearch(grid);
  console.log("Part 1:", wordCount);
  const xMASCount = masSearch(grid);
  console.log("Part 2:", xMASCount);
}
