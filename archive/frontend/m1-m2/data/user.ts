import { User } from "../src/models/interface"
import { nanoid } from "nanoid"

const initialUser: User = {
  id: nanoid(),
  name: "",
  email: "",
  isAuthenticated: false,
}
export { initialUser }
