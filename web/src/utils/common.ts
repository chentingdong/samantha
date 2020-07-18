import stringHash from "string-hash"

const stringHashBucket = (str: string, N: number) => {
  return stringHash(str) % N
}

export { stringHashBucket }
