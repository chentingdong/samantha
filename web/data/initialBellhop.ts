import { Bellhop } from "../src/models/interface"
import { nanoid } from "nanoid"

const initialBellhop: Bellhop = {
  id: nanoid(),
  name: "",
  metadata: "",
  profile_image_url: "",
  created_at: new Date(),
  updated_at: new Date(),
}

const testingBellhopList: Bellhop[] = [
  {
    id: nanoid(),
    name: "Engineering & Product",
    metadata: "",
    profile_image_url: "/dist/eng.png",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: nanoid(),
    name: "Facilities",
    metadata: "",
    profile_image_url: "/dist/facilities.png",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: nanoid(),
    name: "Finance",
    metadata: "",
    profile_image_url: "/dist/finance.png",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: nanoid(),
    name: "Marketing",
    metadata: "",
    profile_image_url: "/dist/marketing.png",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: nanoid(),
    name: "Purchasing",
    metadata: "",
    profile_image_url: "/dist/purchasing.png",
    created_at: new Date(),
    updated_at: new Date(),
  },
]

export { initialBellhop, testingBellhopList }
