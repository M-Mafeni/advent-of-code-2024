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

if (import.meta.main) {
  const text = await Deno.readTextFile(import.meta.dirname + "/input.txt");
  const stones = text.split(" ").map((x) => parseInt(x));
  const newStones = blink(stones, 25);
  console.log(newStones.length);
}
