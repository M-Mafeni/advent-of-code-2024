export function isSafe(arr: number[]): boolean {
  const [x, y] = arr.slice(0, 2);
  const isIncreasing = y > x;
  const initialDiff = Math.abs(y - x);
  if (1 > initialDiff || initialDiff > 3) {
    return false;
  }
  for (let i = 1; i < arr.length - 1; i++) {
    const [curr, next] = arr.slice(i, i + 2);

    if ((isIncreasing && curr > next) || (!isIncreasing && curr < next)) {
      return false;
    }
    const diff = Math.abs(next - curr);
    if (1 > diff || diff > 3) {
      return false;
    }
  }
  return true;
}

if (import.meta.main) {
  const text = await Deno.readTextFile("input.txt");
  const rows = text.split("\n").map(line => line.split(" ").map(x => parseInt(x)))
  const safeCount = rows.reduce((acc, row) => acc + (isSafe(row) ? 1 : 0), 0)
  console.log('Part 1 ', safeCount);
}
