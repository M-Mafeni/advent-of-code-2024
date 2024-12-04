function parseGrid(text: string): string[][] {
  return text.split("\r\n").map((line) => line.split(""));
}
const coords = [];

function getDownVertical(grid: string[][], row: number, col: number) {
  let word = "";
  for (let offset = 0; offset < 4; offset++) {
    if (row + offset >= grid.length) {
      return "";
    }
    word += grid[row + offset][col];
  }
  if (word === 'XMAS') {
    coords.push([row,])
  }
  return word;
}

function getUpVertical(grid: string[][], row: number, col: number) {
  let word = "";
  for (let offset = 0; offset < 4; offset++) {
    if (row - offset < 0) {
      return "";
    }
    word += grid[row - offset][col];
  }
  return word;
}

// row decr, col decr
function getDiag1(grid: string[][], row: number, col: number) {
  let word = "";
  for (let offset = 0; offset < 4; offset++) {
    if (row - offset < 0 || col - offset < 0) {
      return "";
    }
    word += grid[row - offset][col - offset];
  }
  return word;
}

// row decr, col incr
function getDiag2(grid: string[][], row: number, col: number) {
  let word = "";
  for (let offset = 0; offset < 4; offset++) {
    if (row - offset < 0 || col + offset >= grid[0].length) {
      return "";
    }
    word += grid[row - offset][col + offset];
  }
  return word;
}

// row incr, col decr
function getDiag3(grid: string[][], row: number, col: number) {
  let word = "";
  for (let offset = 0; offset < 4; offset++) {
    if (row + offset >= grid.length || col - offset < 0) {
      return "";
    }
    word += grid[row + offset][col - offset];
  }
  return word;
}

// row incr, col incr
function getDiag4(grid: string[][], row: number, col: number) {
  let word = "";
  for (let offset = 0; offset < 4; offset++) {
    if (row + offset >= grid.length || col + offset >= grid[0].length) {
      return "";
    }
    word += grid[row + offset][col + offset];
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
        console.log({forwards})
        const backwards = grid[row].filter((_, index) =>
          col <= index && index < col - 4
        ).join("");
        console.log({backwards})
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

if (import.meta.main) {
  const text = await Deno.readTextFile("C://Users//mafen//Documents//advent-of-code-2024//04//test.txt");
  const grid = parseGrid(text);
  const wordCount = wordSearch(grid);
  console.log("Part 1:", wordCount);
}