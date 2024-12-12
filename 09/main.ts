export function decompress(diskMap: string): number[] {
  let fileFlag = true;
  let idCount = 0;
  const decompressed = [];
  for (const c of diskMap) {
    const count = parseInt(c);
    if (fileFlag) {
      const members = Array(count).fill(idCount);
      decompressed.push(...members);
      idCount += 1;
    } else {
      const members = Array(count).fill(-1);
      decompressed.push(...members);
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
  for (let i = arr.length - 1; i >= 0; i--) {
    if (isFile(arr[i])) {
      for (let j = 0; j < i; j++) {
        // Swap with freest available space
        if (isFreeSpace(arr[j])) {
          const temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
          break;
        }
      }
    }
  }
  return arr;
}

function swapWithFreeSpaceBlock(arr: number[], blockLength: number, blockStart: number) {
  for (let i = 0; i < blockStart; i++) {
    if (isFreeSpace(arr[i])) {
      let freeSpaceEnd = i;
      for (let j = i + 1; j < blockStart; j++) {
        if (!isFreeSpace(arr[j])) {
          freeSpaceEnd = j;
          break;
        }
      }
      const freeSpaceBlock = arr.slice(i, freeSpaceEnd);
      if (freeSpaceBlock.length >= blockLength) {
        // Do the swaps
        for (let k = 0; k < blockLength; k++) {
          const temp = arr[blockStart + k];
          arr[blockStart + k] = arr[i + k];
          arr[i + k] = temp;
        }
        break;
      }
    }
  } 
}

function reorder2(arr: number[]): number[] {
  for (let i = arr.length - 1; i >= 0; i--) {
    const value = arr[i];
    if (isFile(value)) {
      let start = i;
      while(arr[start] === arr[i]) {
        start--;
      }
      const block = arr.slice(start + 1, i + 1);
      swapWithFreeSpaceBlock(arr, block.length, start+1);
    }
  }

  return arr;
}

function validList(list: number[]): boolean {
  const freeSpaceCount = list.filter((x) => x === -1).length;
  const index = list.length - freeSpaceCount;
  const subList1 = list.slice(0, index);
  const subList2 = list.slice(index);
  return subList1.every(isFile) && subList2.every(isFreeSpace);
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
  const text = await Deno.readTextFile(import.meta.dirname + "/test.txt");
  const decompressed = decompress(text);
  const reordered = reorder(decompressed);
  const checkSum = calcCheckSum(reordered);

  console.log("Part 1:", checkSum);
  const reordered2 = reorder2(decompress(text));
  console.log(reordered2);
  const checkSum2 = calcCheckSum(reordered2);
  console.log("Part 2:", checkSum2);
}
