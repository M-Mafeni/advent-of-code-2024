function concatNumber(x: number, y: number): number {
  return parseInt(`${x}${y}`);
}

function isSolvableHelper(
  value: number,
  acc: number,
  numbers: number[],
  i: number,
  concatenation: boolean,
): boolean {
  if (i === numbers.length) {
    return value === acc;
  }

  const nextNumber = numbers[i];
  return isSolvableHelper(
    value,
    acc + nextNumber,
    numbers,
    i + 1,
    concatenation,
  ) ||
    isSolvableHelper(value, acc * nextNumber, numbers, i + 1, concatenation) ||
    (concatenation &&
      isSolvableHelper(
        value,
        concatNumber(acc, nextNumber),
        numbers,
        i + 1,
        concatenation,
      ));
}

function isSolvable(value: number, numbers: number[]): boolean {
  return isSolvableHelper(value, numbers[0], numbers, 1, false);
}

function isSolvable2(value: number, numbers: number[]): boolean {
  return isSolvableHelper(value, numbers[0], numbers, 1, true);
}

function parseLine(line: string): [number, number[]] {
  const [valueText, numbersText] = line.split(": ");
  const numbers = numbersText.split(" ").map((x) => parseInt(x));
  return [parseInt(valueText), numbers];
}

if (import.meta.main) {
  const text = await Deno.readTextFile(import.meta.dirname + "/input.txt");
  const eqns = text.split("\r\n").map(parseLine);
  const solvableEqns = [];
  const unsolvableEqns = [];

  for (const eqn of eqns) {
    const [value, rest] = eqn;
    if (isSolvable(value, rest)) {
      solvableEqns.push(eqn[0]);
    } else {
      unsolvableEqns.push(eqn);
    }
  }

  const sum = solvableEqns.reduce((acc, x) => acc + x, 0);
  console.log("Part 1:", sum);

  const concatEqns = unsolvableEqns.filter((values) => {
    const [value, rest] = values;
    return isSolvable2(value, rest);
  }).map((xs) => xs[0]);
  const concatSum = concatEqns.reduce((acc, x) => acc + x, 0);
  console.log("Part 2:", sum + concatSum);
}
