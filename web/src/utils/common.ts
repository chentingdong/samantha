import stringHash from "string-hash"
import moment from "moment"
/* card color bins */
const stringHashBucket = (str: string, N: number) => {
  return stringHash(str) % N
}

/* date */

const displayDate = (d: Date, style = "long"): string => {
  let dateFormat

  switch (style) {
    default:
    case "long":
      dateFormat = "MMM DD, YYYY h:mm a"
      break
    case "short":
      dateFormat = "h:mm a"
      break
  }
  return moment(d).format(dateFormat)
}

export { stringHashBucket, displayDate }
