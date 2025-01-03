interface Position {
  x: number;
  y: number;
}

type Graph = Record<string, Position[]>;

function getGraph(grid: string[][]): Graph {
  const graph: Graph = {};
  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[0].length; y++) {
      const plant = grid[x][y];
      // Search in graph for entry
      let id = 0
      let found = false;
      for (const key of Object.keys(graph)) {
        if (key.startsWith(plant)) {
          id++;
          const neighbours = graph[key];
          // Find out if positions have neighbours
          const suitable = neighbours.some((pos) => {
            const isHorizontal = Math.abs(pos.y - y) === 1 && pos.x === x;
            const isVertical = Math.abs(pos.x - x) === 1 && pos.y === y;
            return (isHorizontal || isVertical);
          });

          if (suitable) {
            graph[key] = [...graph[key], { x, y }];
            found = true;
            break;
          }
        }
      }
      // Suitable graph wasn't found. Start new one
      if (!found) {
        graph[`${plant}-${id}`] = [{ x, y }];
      }
    }
  }
  return graph;
}

function calcAreaAndPerimeter(positions: Position[]): [number, number] {
  const area = positions.length;
  let perimeter = 0;
  for (const pos of positions) {
    const sides = 4;
    const neighbours = positions.filter((p1) => {
      const isHorizontal = Math.abs(p1.y - pos.y) === 1 && p1.x === pos.x;
      const isVertical = Math.abs(p1.x - pos.x) === 1 && p1.y === pos.y;
      return (isHorizontal || isVertical) && !(isHorizontal && isVertical);
    });
    perimeter += sides - neighbours.length
  }
  return [area, perimeter]
}

function totalPrice(graph: Graph) {
  let total = 0;
  for (const key of Object.keys(graph)) {
    const [area, perimeter] = calcAreaAndPerimeter(graph[key])
    console.log({key, area, perimeter})
    total += area * perimeter
  }
  return total;
}

if (import.meta.main) {
  const text = await Deno.readTextFile(import.meta.dirname + "/test.txt");
  const grid = text.split("\n").map((line) => line.split(""));
  const graph = getGraph(grid);
  console.log(graph);
  const price = totalPrice(graph);
  console.log("Part 1:", price);
}
