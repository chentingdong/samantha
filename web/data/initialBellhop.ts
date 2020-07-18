import { Bellhop } from "../src/models/interface"
import { nanoid } from "nanoid"

const initialBellhop: Bellhop = {
  id: nanoid(),
  name: "",
  description: "",
  profile_image_url: "",
}

const testingBellhopList: Bellhop[] = [
  {
    id: nanoid(),
    name: "Engineering & Product",
    description: "This is a Engineering bellhop",
    profile_image_url: "/dist/eng.png",
  },
  {
    id: nanoid(),
    name: "Facilities",
    description: "This is a Facility bellhop",
    profile_image_url: "/dist/facilities.png",
  },
  {
    id: nanoid(),
    name: "Finance",
    description: "This is a Finance bellho",
    profile_image_url: "/dist/finance.png",
  },
  {
    id: nanoid(),
    name: "Marketing",
    description: "This is a Marketing bellhop",
    profile_image_url: "/dist/marketing.png",
  },
  {
    id: nanoid(),
    name: "Purchasing",
    description: "This is a Purchasing bellhop",
    profile_image_url: "/dist/purchasing.png",
  },
]

export { initialBellhop, testingBellhopList }
