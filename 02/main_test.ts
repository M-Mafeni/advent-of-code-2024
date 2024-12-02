import { assert, assertFalse } from "jsr:@std/assert";
import { describe } from "jsr:@std/testing/bdd";

import { isSafe, isSafePart2 } from "./main.ts";

describe("part 1", () => {
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
});

describe("part 2", () => {
  Deno.test("array is safe - decreasing", () => {
    assert(isSafePart2([7, 6, 4, 2, 1]));
  });

  Deno.test("array is safe - increasing", () => {
    assert(isSafePart2([1, 3, 6, 7, 9]));
  });

  Deno.test("array is unsafe - regardless", () => {
    assertFalse(isSafePart2([1, 2, 7, 8, 9]));
  });

  Deno.test("array is unsafe - regardless 2", () => {
    assertFalse(isSafePart2([9, 7, 6, 2, 1]));
  });

  Deno.test("array is safe - remove 3", () => {
    assert(isSafePart2([1, 3, 2, 4, 5]));
  });

  Deno.test("array is safe - remove third 4", () => {
    assert(isSafePart2([8, 6, 4, 4, 1]));
  });
});
