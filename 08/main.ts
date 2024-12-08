interface Position {
  x: number;
  y: number;
}

interface Antenna {
  name: string;
  position: Position;
}

// Get distance of p2 from p1
function getDistances(p1: Position, p2: Position): [number, number] {
  return [p2.x - p1.x, p2.y - p1.y];
}

function inRange(pos: Position, max: Position) {
  return pos.x >= 0 && pos.x <= max.x && pos.y >= 0 && pos.y <= max.y;
}

function getAntinodes(antennas: Antenna[], max: Position): Position[] {
  const antiNodes: Position[] = [];
  for (let i = 0; i < antennas.length; i++) {
    const antenna = antennas[i];

    for (let j = 0; j < antennas.length; j++) {
      const other = antennas[j];
      if (i !== j && antenna.name === other.name) {
        const antennaPos = antenna.position;
        const [xDist, yDist] = getDistances(antennaPos, other.position);
        const antinode = { x: antennaPos.x - xDist, y: antennaPos.y - yDist };
        if (
          inRange(antinode, max) &&
          !antiNodes.some((p) => p.x === antinode.x && p.y === antinode.y)
        ) {
          antiNodes.push(antinode);
        }
      }
    }
  }
  return antiNodes;
}

function getAntennas(grid: string[][]): Antenna[] {
  const antennas = [];
  const isAntenna = (c: string) => c !== ".";
  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[0].length; y++) {
      const value = grid[x][y];
      if (isAntenna(value)) {
        antennas.push({ name: value, position: { x, y } });
      }
    }
  }
  return antennas;
}

if (import.meta.main) {
  const text = await Deno.readTextFile(import.meta.dirname + "/input.txt");
  const grid = text.split("\r\n").map((line) => line.split(""));
  const antennas = getAntennas(grid);
  const max = { x: grid.length - 1, y: grid[0].length - 1 };
  const antiNodes = getAntinodes(antennas, max);
  console.log("Part 1:", antiNodes.length);
}
