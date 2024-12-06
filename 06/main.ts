type Direction = "up" | "down" | "left" | "right";
type Grid = string[][];

interface Position {
  x: number;
  y: number;
}

interface Guard {
  direction: Direction;
  position: Position;
}

function turnRight(direction: Direction): Direction {
  switch (direction) {
    case "up":
      return "right";
    case "down":
      return "left";
    case "left":
      return "up";
    case "right":
      return "down";
  }
}

function advance(guard: Guard): Position {
  const {x, y} = guard.position;
  switch (guard.direction) {
    case "up":
      return {x: x - 1, y};
    case "down":
      return {x :x + 1, y};
    case "left":
      return {x, y :y - 1};
    case "right":
      return {x, y :y + 1};
  }
}

function inRange(guard: Guard, grid: Grid) {
  const {x, y} = guard.position;
  return x >= 0 && x < grid.length && y >= 0 && grid[0].length;
}

function moveGuard(guard: Guard, grid: string[][]) {
  while (inRange(guard, grid)) {
    grid[guard.position.x][guard.position.y] = "X";
    const nextPos = advance(guard);
    const {x, y} = nextPos;
    if (!(x >= 0 && x < grid.length && y >= 0 && grid[0].length)) {
      return;
    }
    if (grid[x][y] === "#") {
      const newDir = turnRight(guard.direction);
      guard.direction = newDir;
    } else {
      guard.position = nextPos;
    }
  }
}

// @ts-ignore Guard is always defined
function getGuard(grid: string[][]): Guard {
  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[0].length; y++) {
      if (grid[x][y] === "^") {
        grid[x][y] = "X";
        return { position: {x, y}, direction: "up" };
      }
    }
  }
}

if (import.meta.main) {
  const text = await Deno.readTextFile(import.meta.dirname + "/input.txt");
  const grid = text.split("\n").map((line) => line.split(""));
  const guard = getGuard(grid);
  moveGuard(guard, grid);

  const posCount = grid.reduce(
    (acc, row) => acc + row.filter((v) => v === "X").length,
    0,
  );
  console.log("Part 1:", posCount);
}
