import { authUserVar } from "../../cache"

const setAuthUser = (incoming) => {
  const newAuthUser = { ...authUserVar(), ...incoming }
  authUserVar(newAuthUser)
}

export { setAuthUser }
