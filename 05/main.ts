type Dict = Record<number, number[]>;

function getMiddle(numbers: number[]) {
  return numbers[Math.floor(numbers.length / 2)];
}

function isRightOrder(values: number[], dict: Dict) {
  const seen = new Set();
  const numbersPresent = new Set(values);
  for (const value of values) {
    const before = dict[value];
    const valid = !before ||
      before.every((x) => !numbersPresent.has(x) || seen.has(x));
    if (!valid) {
      return false;
    }
    seen.add(value);
  }
  return true;
}

function parseDict(text: string): Dict {
  const lines = text.split("\n");
  const rules = lines.map((line) => line.split("|").map((x) => parseInt(x)));
  const dict: Dict = {};
  for (const rule of rules) {
    const [before, after] = rule;
    dict[after] = dict[after] ? [...dict[after], before] : [before];
  }
  return dict;
}

function parsePages(text: string): number[][] {
  const lines = text.split("\n");
  return lines.map((line) => line.split(",").map((x) => parseInt(x)));
}

if (import.meta.main) {
  const text = await Deno.readTextFile("./input.txt");
  const [ruleText, pageText] = text.split("\r\n\r\n");
  const dict = parseDict(ruleText);
  const pages = parsePages(pageText);
  const validPages = pages.filter((pageList) => isRightOrder(pageList, dict));
  const middleCount = validPages.reduce(
    (acc, pageList) => acc + getMiddle(pageList),
    0,
  );
  console.log("Part 1:", middleCount);
}
