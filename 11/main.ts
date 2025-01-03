type StoneMap = Map<number, number>;

function blinkOnce(stones: number[]): number[] {
  return stones.flatMap((id) => {
    if (id === 0) {
      return [1];
    }
    const digits = String(id);
    if (digits.length % 2 === 0) {
      const num1 = Number(digits.substring(0, digits.length / 2));
      const num2 = Number(digits.substring(digits.length / 2));
      return [num1, num2];
    }
    return [id * 2024];
  });
}

function blink(stones: number[], n: number): number[] {
  let stonesOnce = stones;
  for (let i = 0; i < n; i++) {
    stonesOnce = blinkOnce(stonesOnce);
  }
  return stonesOnce;
}

function adjust(stoneMap: StoneMap, key: number, count: number) {
  const oldCount = stoneMap.get(key);
  const newCount = (oldCount || 0) + count;
  stoneMap.set(key, newCount);
}

function blinkOnceStoneMap(stoneMap: StoneMap): StoneMap {
  const stoneEntries = [...stoneMap.entries()];
  const newMap: StoneMap = new Map();

  for (const entry of stoneEntries) {
    const [stone, count] = entry;
    if (stone === 0) {
      adjust(newMap, 1, count);
    } else {
      const digits = String(stone);
      if (digits.length % 2 === 0) {
        const num1 = Number(digits.substring(0, digits.length / 2));
        const num2 = Number(digits.substring(digits.length / 2));
        adjust(newMap, num1, count);
        adjust(newMap, num2, count);
      } else {
        adjust(newMap, stone * 2024, count)
      }
    }
  }

  return newMap;
}

function blinkStoneMap(stoneMap: StoneMap, n: number): StoneMap {
  let stonesOnce = stoneMap;
  for (let i = 0; i < n; i++) {
    stonesOnce = blinkOnceStoneMap(stonesOnce);
  }
  return stonesOnce;
}

function getStoneMap(stones: number[]): Map<number, number> {
  const stoneMap = new Map();
  stones.forEach((stone) => {
    stoneMap.set(stone, 1);
  });
  return stoneMap;
}

if (import.meta.main) {
  const text = await Deno.readTextFile(import.meta.dirname + "/input.txt");
  const stones = text.split(" ").map((x) => parseInt(x));
  const stoneMap = getStoneMap(stones);
  const newStonesPart1 = blinkStoneMap(stoneMap, 25);
  const part1Sum = [...newStonesPart1.values()].reduce((acc, x) => acc + x);
  console.log("Part 1:", part1Sum);
  const newStonesPart2 = blinkStoneMap(stoneMap, 75);
  const part2Sum = [...newStonesPart2.values()].reduce((acc, x) => acc + x);
  console.log("Part 2:", part2Sum);
}
