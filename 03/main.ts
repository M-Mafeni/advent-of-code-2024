if (import.meta.main) {
  const text = await Deno.readTextFile("input.txt");
  const regex = /mul\((\d{1,3}),(\d{1,3})\)|do(n't)?\(\)/g;
  const matches = [...text.matchAll(regex)];
  const part1Result = matches.reduce((acc, exprArr) => {
    if (exprArr[0].startsWith("mul")) {
      const [x, y] = exprArr.slice(1).map((x) => parseInt(x));
      return acc + x * y;
    }
    return acc;
  }, 0);

  let enabled = true;
  let part2Result = 0;
  for (const exprArr of matches) {
    const term = exprArr[0];
    if (term.startsWith("mul") && enabled) {
      const [x, y] = exprArr.slice(1).map((x) => parseInt(x));
      part2Result += x * y;
    } else if (term === "do()") {
      enabled = true;
    } else if (term === "don't()") {
      enabled = false;
    }
  }

  console.log("Part 1:", part1Result);
  console.log("Part 2:", part2Result);
}
