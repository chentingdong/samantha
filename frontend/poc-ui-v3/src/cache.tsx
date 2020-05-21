import { InMemoryCache, ReactiveVar } from "@apollo/client"
import { User } from "./models/interface"

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        authenticatedUser: {
          read() {
            return authenticatedUserVar()
          },
        },
        isAuthenicated: {
          read() {
            return isAuthenticatedVar()
          },
        },
      },
    },
  },
})

export const authenticatedUserVar: ReactiveVar<User> = cache.makeVar<User>({})
export const isAuthenticatedVar: ReactiveVar<boolean> = cache.makeVar<boolean>(
  false
)
