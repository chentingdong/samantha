import { User } from "../src/models/interface"
import uuid from "uuid"

const initialUser: User = {
  id: uuid.v4(),
  name: "",
  email: "",
  isAuthenticated: false,
}
export { initialUser }
