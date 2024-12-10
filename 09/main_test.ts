import { decompress, reorder } from "./main.ts";
import { describe, it } from "@std/testing/bdd";
import { expect } from "jsr:@std/expect";

const simpleTestRepr = [
  0,
  -1,
  -1,
  1,
  1,
  1,
  -1,
  -1,
  -1,
  -1,
  2,
  2,
  2,
  2,
  2,
];

const exampleTestRepr = [
  0,
  0,
  -1,
  -1,
  -1,
  1,
  1,
  1,
  -1,
  -1,
  -1,
  2,
  -1,
  -1,
  -1,
  3,
  3,
  3,
  -1,
  4,
  4,
  -1,
  5,
  5,
  5,
  5,
  -1,
  6,
  6,
  6,
  6,
  -1,
  7,
  7,
  7,
  -1,
  8,
  8,
  8,
  8,
  9,
  9,
];

describe("decompress", () => {
  it("simple case", () => {
    expect(decompress("12345")).toEqual(simpleTestRepr);
  });

  it("test case", () => {
    expect(decompress("2333133121414131402")).toEqual(exampleTestRepr);
  });
});

describe("reorder", () => {
  const formatExpected = (val: string): number[] =>
    [...val].map((x) => (x === ".") ? -1 : parseInt(x));
  it("simple case", () => {
    expect(reorder(simpleTestRepr)).toEqual(formatExpected("022111222......"));
  });

  it("test case", () => {
    expect(reorder(exampleTestRepr)).toEqual(
      formatExpected("0099811188827773336446555566.............."),
    );
  });
});
