export function add(a: number, b: number): number {
  return a + b;
}

function parseLists(text: string): [number[], number[]] {
  const pairs = text.split("\n");
  const list1 = [];
  const list2 = [];
  for (const line of pairs) {
    const [x, y] = line.split("  ").map((x) => parseInt(x));
    list1.push(x);
    list2.push(y);
  }
  return [list1, list2];
}

function calcSimilarityScore(line1: number[], line2: number[]): number {
  const freq = line2.reduce((acc, val) => {
    if (acc[val]) {
      return { ...acc, [String(val)]: acc[val] + 1 };
    } else {
      return { ...acc, [String(val)]: 1 };
    }
  }, {} as Record<number, number>);

  return line1.reduce((acc, val) => {
    const multiplier = freq[val] || 0;
    return acc += val * multiplier;
  }, 0);
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const text = await Deno.readTextFile("input.txt");
  const [line1, line2] = parseLists(text);
  line1.sort((a, b) => a - b);
  line2.sort((a, b) => a - b);
  let sum = 0;
  for (let i = 0; i < line1.length; i++) {
    const diff = Math.abs(line1[i] - line2[i]);
    sum += diff;
  }
  console.log(sum);
  console.log("part 2", calcSimilarityScore(line1, line2));
}
