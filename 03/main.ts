if (import.meta.main) {
  const text = await Deno.readTextFile("input.txt");
  const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;
  const part1Result = text.matchAll(regex)?.reduce((acc, exprArr) => {
    const [x, y] = exprArr.slice(1).map((x) => parseInt(x));
    return acc + x * y;
  }, 0);

  console.log("Part 1:", part1Result);
}
