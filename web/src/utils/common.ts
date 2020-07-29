import stringHash from "string-hash"

const stringHashBucket = (str: string, N: number) => {
  return stringHash(str) % N
}

const dateFormat = "MMM DD, YYYY h:mm a"
const dateFormatShort = "h:mm a"

export { stringHashBucket, dateFormat, dateFormatShort }
