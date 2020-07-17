import { Bellhop } from "../src/models/interface"
import { nanoid } from "nanoid"

import imageEng from "assets/img/bellhops/eng.png"
import imageFacilities from "assets/img/bellhops/facilities.png"
import imageFinance from "assets/img/bellhops/finance.png"
import imageMarketing from "assets/img/bellhops/marketing.png"

const initialBellhop: Bellhop = {
  id: nanoid(),
  name: "",
  description: "",
  image: "",
}

const testingBellhopList: Bellhop[] = [
  {
    id: nanoid(),
    name: "Engineering & Product",
    description: "This is a Engineering bellhop",
    image: imageEng,
  },
  {
    id: nanoid(),
    name: "Facilities",
    description: "This is a Facility bellhop 2",
    image: imageFacilities,
  },
  {
    id: nanoid(),
    name: "Finance",
    description: "This is a Finance bellhop 2",
    image: imageFinance,
  },
  {
    id: nanoid(),
    name: "Marketing",
    description: "This is a Marketing bellhop 2",
    image: imageMarketing,
  },
]

export { initialBellhop, testingBellhopList }
