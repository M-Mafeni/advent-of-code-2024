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

function equalPosition(p1: Position, p2: Position) {
  return p1.x === p2.x && p1.y === p2.y;
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
  const { x, y } = guard.position;
  switch (guard.direction) {
    case "up":
      return { x: x - 1, y };
    case "down":
      return { x: x + 1, y };
    case "left":
      return { x, y: y - 1 };
    case "right":
      return { x, y: y + 1 };
  }
}

function inRange(guard: Guard, grid: Grid) {
  const { x, y } = guard.position;
  return x >= 0 && x < grid.length && y >= 0 && y < grid[0].length;
}

function moveGuard(guard: Guard, grid: string[][]): Guard[] {
  const guardHistory: Guard[] = [];
  while (inRange(guard, grid)) {
    guardHistory.push({ ...guard });
    grid[guard.position.x][guard.position.y] = "X";
    const nextPos = advance(guard);
    const { x, y } = nextPos;
    if (!(x >= 0 && x < grid.length && y >= 0 && grid[0].length)) {
      return guardHistory;
    }
    if (grid[x][y] === "#") {
      const newDir = turnRight(guard.direction);
      guard.direction = newDir;
    } else {
      guard.position = nextPos;
    }
  }
  return guardHistory;
}

// @ts-ignore Guard is always defined
function getGuard(grid: string[][]): Guard {
  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[0].length; y++) {
      if (grid[x][y] === "^") {
        grid[x][y] = "X";
        return { position: { x, y }, direction: "up" };
      }
    }
  }
}

function moveGuard2(guard: Guard, grid: string[][]): Position | null {
  const guardHistory: Guard[] = [];
  const hasBeenSeen = (history: Guard[], g: Guard) =>
    history.some((g1) =>
      equalPosition(g.position, g1.position) && g.direction === g1.direction
    );

  while (inRange(guard, grid)) {
    if (hasBeenSeen(guardHistory, guard)) {
      return {...guard.position}
    }
    guardHistory.push ({ ...guard });
    grid[guard.position.x][guard.position.y] = "X";
    const nextPos = advance(guard);
    const { x, y } = nextPos;
    if (!(x >= 0 && x < grid.length && y >= 0 && grid[0].length)) {
      return null;
    }
    if (grid[x][y] === "#") {
      const newDir = turnRight(guard.direction);
      guard.direction = newDir;
    } else {
      guard.position = nextPos;
    }
  }
  return null;
}

function part2BruteForce(history: Guard[], text: string) {
  const obstaclePositions = [];
  for (let i = 1; i < history.length; i++) {
    const grid = text.split("\r\n").map((line) => line.split(""));
    const initGuard = {...history[0]};
    // Make position guard was at an obstacle
    const obstacle = history[i].position;
    grid[obstacle.x][obstacle.y] = '#';
    const cyclePos = moveGuard2(initGuard, grid);
    if (cyclePos) {
      obstaclePositions.push(obstacle);
    }
  }

  const withoutDuplicates: Position[] = [];
  for (const pos of obstaclePositions) {
    if (!withoutDuplicates.some(p => equalPosition(p, pos))) {
      withoutDuplicates.push(pos)
    }
  }

  return withoutDuplicates;
}

if (import.meta.main) {
  const text = await Deno.readTextFile(import.meta.dirname + "/input.txt");
  const grid = text.split("\r\n").map((line) => line.split(""));
  const guard = getGuard(grid);
  const guardHistory = moveGuard(guard, grid);

  const posCount = grid.reduce(
    (acc, row) => acc + row.filter((v) => v === "X").length,
    0,
  );
  console.log("Part 1:", posCount);
  const cyclePositions = part2BruteForce(guardHistory, text);
  console.log("Part 2:", cyclePositions.length);
}
