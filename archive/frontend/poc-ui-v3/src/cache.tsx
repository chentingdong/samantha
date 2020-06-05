import { InMemoryCache, ReactiveVar } from "@apollo/client"
import { User } from "./models/interface"

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        authUser: {
          merge(existing, incoming) {
            return authUserVar(incoming)
          },
          read() {
            return authUserVar()
          },
        },
      },
    },
  },
})

export const authUserVar: ReactiveVar<User> = cache.makeVar<User>({
  isAuthenticated: false,
})
