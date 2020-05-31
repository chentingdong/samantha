import { InMemoryCache, ReactiveVar } from "@apollo/client"
import { User, UiState } from "./models/interface"
import { EditMode, ItemType } from "./models/enum"

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
        uiState: {
          // merge(existing, incoming) {
          //   const result = { ...uiStateVar(), ...incoming }
          //   console.log(
          //     `uiState merge: uiStateVar(): ${JSON.stringify(
          //       uiStateVar()
          //     )}, existing: ${JSON.stringify(
          //       existing
          //     )}, incoming: ${JSON.stringify(
          //       incoming
          //     )}, result: ${JSON.stringify(result)}`
          //   )
          //   return uiStateVar(result)
          // },
          read() {
            // console.log(`uiState read: ${JSON.stringify(uiStateVar())}`)
            return uiStateVar()
          },
        },
      },
    },
  },
})

export const authUserVar: ReactiveVar<User> = cache.makeVar<User>({
  isAuthenticated: false,
})

export const uiStateVar: ReactiveVar<UiState> = cache.makeVar<UiState>({
  showEditor: false,
  editorMode: EditMode.Create,
  editingItemType: ItemType.Block,
})
