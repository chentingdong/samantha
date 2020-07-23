import stringHash from "string-hash"

const stringHashBucket = (str: string, N: number) => {
  return stringHash(str) % N
}

const dateFormat = "MMM DD, YYYY h:mma"
const dateFormatShort = "h:mma"

export { stringHashBucket, dateFormat, dateFormatShort }
