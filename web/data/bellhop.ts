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
    profile_image_url: "src/assets/img/bellhops/eng.png",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: nanoid(),
    name: "Facilities",
    metadata: "",
    profile_image_url: "src/assets/img/bellhops/facilities.png",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: nanoid(),
    name: "Finance",
    metadata: "",
    profile_image_url: "src/assets/img/bellhops/finance.png",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: nanoid(),
    name: "Marketing",
    metadata: "",
    profile_image_url: "src/assets/img/bellhops/marketing.png",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: nanoid(),
    name: "Purchasing",
    metadata: "",
    profile_image_url: "src/assets/img/bellhops/purchasing.png",
    created_at: new Date(),
    updated_at: new Date(),
  },
]

export { initialBellhop, testingBellhopList }
