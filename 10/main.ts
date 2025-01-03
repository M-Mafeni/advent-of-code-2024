function runHelper(
  i: number,
  j: number,
  grid: number[][],
  positions: [number, number][],
) {
  if (grid[i][j] === 9) {
    const exists = positions.find((pos) => pos[0] === i && pos[1] === j);
    if (!exists) {
      positions.push([i, j]);
    }
    return;
  }

  const up = [i - 1, j];
  const down = [i + 1, j];
  const left = [i, j - 1];
  const right = [i, j + 1];
  const neighbours = [up, down, left, right];
  neighbours.forEach((pos) => {
    const [x, y] = pos;
    // Check in range
    if (x >= 0 && x < grid.length && y >= 0 && y < grid[0].length) {
      const value = grid[x][y];
      if (value - grid[i][j] === 1) {
        runHelper(x, y, grid, positions);
      }
    }
  });
}

function getTrailHeads(grid: number[][]) {
  const allPositions: [number, number][] = [];
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === 0) {
        const positions: [number, number][] = [];
        runHelper(i, j, grid, positions);
        allPositions.push(...positions);
      }
    }
  }
  return allPositions;
}

if (import.meta.main) {
  const text = await Deno.readTextFile(import.meta.dirname + "/input.txt");
  const grid = text.split("\n").map((line) =>
    line.split("").map((x) => parseInt(x, 10))
  );
  const positions = getTrailHeads(grid);
  console.log("Part 1:", positions.length);
}
