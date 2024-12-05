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
  const invalidPages = [];
  const validPages = [];
  for (const pageList of pages) {
    if (isRightOrder(pageList, dict)) {
      validPages.push(pageList);
    } else {
      invalidPages.push(pageList);
    }
  }

  const middleCount = validPages.reduce(
    (acc, pageList) => acc + getMiddle(pageList),
    0,
  );
  console.log("Part 1:", middleCount);
  invalidPages.forEach((values) => {
    values.sort((a, b) => {
      const beforeA = dict[b];
      const beforeB = dict[a];
      if (beforeA?.includes(a)) {
        return -1;
      } else if (beforeB?.includes(b)) {
        return 1;
      }
      return 0;
    });
  });

  const invalidMiddleCount = invalidPages.reduce(
    (acc, pageList) => acc + getMiddle(pageList),
    0,
  );
  console.log("Part 2:", invalidMiddleCount)
}
