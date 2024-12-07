type Operator = "+" | "*";

function isSolvableHelper(
  value: number,
  acc: number,
  numbers: number[],
  i: number,
): boolean {
  if (i === numbers.length) {
    return value === acc;
  }

  const nextNumber = numbers[i];
  return isSolvableHelper(value, acc + nextNumber, numbers, i + 1) ||
    isSolvableHelper(value, acc * nextNumber, numbers, i + 1);
}

function isSolvable(value: number, numbers: number[]): boolean {
  return isSolvableHelper(value, numbers[0], numbers, 1);
}

function parseLine(line: string): [number, number[]] {
  const [valueText, numbersText] = line.split(": ");
  const numbers = numbersText.split(" ").map((x) => parseInt(x))
  return [parseInt(valueText), numbers]
}

if (import.meta.main) {
  const text = await Deno.readTextFile(import.meta.dirname + "/input.txt");
  const eqns = text.split("\r\n").map(parseLine);
  const solvableEqns = eqns.filter((values) => {
    const [value, rest] = values;
    return isSolvable(value, rest);
  }).map((xs) => xs[0]);
  const sum = solvableEqns.reduce((acc, x) => acc + x, 0);
  console.log("Part 1:", sum);
}
