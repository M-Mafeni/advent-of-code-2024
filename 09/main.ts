export function decompress(diskMap: string): number[] {
  let fileFlag = true;
  let idCount = 0;
  const decompressed = [];
  for (const c of diskMap) {
    const value = parseInt(c);
    if (fileFlag) {
      // const id = String(idCount).repeat(value);
      const members = Array(value).fill(idCount);
      decompressed.push(...members)
      idCount += 1;
    } else {
      // const freeSpace = ".".repeat(value);
      const members = Array(value).fill(-1);
      decompressed.push(...members)
    }
    fileFlag = !fileFlag;
  }
  return decompressed;
}

function isFile(x: number) {
  return x >= 0;
}

function isFreeSpace(x: number) {
  return x === -1;
}

export function reorder(arr: number[]): number[] {
  let lastSeenLetter = arr.length - 1;
  let freestAvailableSpace = 0;
  while (freestAvailableSpace < lastSeenLetter) {
    for (let i = lastSeenLetter; i >= 0; i--) {
      if (isFile(arr[i])) {
        for (let j = freestAvailableSpace; j < arr.length; j++) {
          // Swap with freest available space
          if (isFreeSpace(arr[j])) {
            const temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
            freestAvailableSpace = j + 1;
            break;
          }
        }
        lastSeenLetter = i - 1;
        break;
      }
    }
  }
  return arr;
}

function calcCheckSum(reordered: number[]): number {
  let sum = 0;
  for (let i = 0; i < reordered.length; i++) {
    const val = reordered[i];
    if (isFreeSpace(val)) {
      break;
    }
    sum += val * i;
  }
  return sum;
}

if (import.meta.main) {
  const text = await Deno.readTextFile(import.meta.dirname + "/input.txt");
  const decompressed = decompress(text);
  const reordered = reorder(decompressed);
  const checkSum = calcCheckSum(reordered);

  // console.log("valid list", isSorted(reordered));
  console.log("Part 1:", checkSum);
}
