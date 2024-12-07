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

function moveGuard(guard: Guard, grid: string[][]): [Guard[], Position[]] {
  const duplPositions: Position[] = [];
  const guardHistory: Guard[] = [];
  while (inRange(guard, grid)) {
    if (
      guardHistory.some((g) => equalPosition(g.position, guard.position))
    ) {
      duplPositions.push(guard.position);
    }
    guardHistory.push({ ...guard });
    grid[guard.position.x][guard.position.y] = "X";
    const nextPos = advance(guard);
    const { x, y } = nextPos;
    if (!(x >= 0 && x < grid.length && y >= 0 && grid[0].length)) {
      return [guardHistory, duplPositions];
    }
    if (grid[x][y] === "#") {
      const newDir = turnRight(guard.direction);
      guard.direction = newDir;
    } else {
      guard.position = nextPos;
    }
  }
  return [guardHistory, duplPositions];
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

function runPart2(
  history: Guard[],
  seenPositions: Position[],
) {
  let cycleCount = 0;
  for (const position of seenPositions) {
    // @ts-ignore it's not undefined
    const guard: Guard = history.find((g) =>
      equalPosition(g.position, position)
    );
    // Assume instead you turned right and advance one, Do you go to a previously seen position
    const newDir = turnRight(guard.direction);
    const newPos = advance({ ...guard, direction: newDir });
    const possCycle = history.some((g) => equalPosition(g.position, newPos) && newDir === g.direction)
    if (possCycle) {
      cycleCount++;
    }
  }
  return cycleCount;
}

if (import.meta.main) {
  const text = await Deno.readTextFile(import.meta.dirname + "/test.txt");
  const grid = text.split("\n").map((line) => line.split(""));
  const guard = getGuard(grid);
  const [guardHistory, duplPositions] = moveGuard(guard, grid);

  const posCount = grid.reduce(
    (acc, row) => acc + row.filter((v) => v === "X").length,
    0,
  );
  console.log("Part 1:", posCount);
  const cycleCount = runPart2(guardHistory, duplPositions);
  console.log("Part 2:", cycleCount)
}
