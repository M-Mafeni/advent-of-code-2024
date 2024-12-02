import { assert, assertFalse } from "jsr:@std/assert";
import { isSafe } from "./main.ts";

Deno.test("array is safe - decreasing", () => {
  assert(isSafe([7, 6, 4, 2, 1]));
});

Deno.test("array is safe - increasing", () => {
  assert(isSafe([1, 3, 6, 7, 9]));
});

Deno.test("array is unsafe - increase of 5", () => {
  assertFalse(isSafe([1, 2, 7, 8, 9]));
});

Deno.test("array is unsafe - decrease of 4", () => {
  assertFalse(isSafe([9, 7, 6, 2, 1]));
});

Deno.test("array is unsafe - mixed range", () => {
  assertFalse(isSafe([1, 3, 2, 4, 5]));
});
